import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../services/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  rooms: [],
  selectedUser: null,
  selectedRoom: null,
  isUsersLoading: false,
  isRoomsLoading: false,
  isMessagesLoading: false,
  typingUser: null,

  setTypingUser: (id) => set({ typingUser: id }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getRooms: async () => {
    set({ isRoomsLoading: true });
    try {
      const res = await axiosInstance.get("/rooms");
      set({ rooms: res.data });
    } catch {
      toast.error("Failed to fetch rooms");
    } finally {
      set({ isRoomsLoading: false });
    }
  },

  getMessages: async (id, type = "user") => {
    set({ isMessagesLoading: true });
    try {
      const res =
        type === "user"
          ? await axiosInstance.get(`/messages/${id}`)
          : await axiosInstance.get(`/rooms/${id}`);

      set({ messages: res.data });
    } catch {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, selectedRoom, messages } = get();
    try {
      let res;

      if (selectedUser) {
        res = await axiosInstance.post(
          `/messages/send/${selectedUser._id}`,
          messageData
        );
      }

      if (selectedRoom) {
        res = await axiosInstance.post(
          `/rooms/${selectedRoom._id}`,
          messageData
        );
      }

      set({ messages: [...messages, res.data] });
    } catch {
      toast.error("Failed to send message");
    }
  },

  sendTypingStart: (receiverId, senderId) => {
    const socket = useAuthStore.getState().socket;
    socket.emit("typing-start", { senderId, receiverId });
  },

  sendTypingStop: (receiverId, senderId) => {
    const socket = useAuthStore.getState().socket;
    socket.emit("typing-stop", { senderId, receiverId });
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (msg) => {
      const { selectedUser, messages } = get();
      if (selectedUser && msg.senderId === selectedUser._id) {
        set({ messages: [...messages, msg] });
      }
    });

    socket.on("roomMessage", (msg) => {
      const { selectedRoom, messages } = get();
      if (selectedRoom && msg.roomId === selectedRoom._id) {
        set({ messages: [...messages, msg] });
      }
    });

    socket.on("typing-start", (senderId) => {
      set({ typingUser: senderId });
    });

    socket.on("typing-stop", () => {
      set({ typingUser: null });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("roomMessage");
    socket.off("typing-start");
    socket.off("typing-stop");
  },

  setSelectedUser: (user) =>
    set(() => ({
      selectedUser: user,
      selectedRoom: null,
      typingUser: null
    })),

  setSelectedRoom: (room) =>
    set(() => ({
      selectedRoom: room,
      selectedUser: null,
      typingUser: null
    })),
}));
