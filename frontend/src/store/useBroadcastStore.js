import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../services/axios";
import { useAuthStore } from "./useAuthStore";

export const useBroadcastStore = create((set) => ({
    broadcastMessages: [],
    isBroadcastLoading: false,
    isSendingBroadcast: false,
  
    getBroadcastMessages: async () => {
    set({ isBroadcastLoading: true });
    try {
      const res = await axiosInstance.get("/broadcast/messages");
      set({ broadcastMessages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch broadcasts");
    } finally {
      set({ isBroadcastLoading: false });
    }
  },

  sendBroadcastMessage: async (messageData) => {
    set({ isSendingBroadcast: true });
    try {
      const res = await axiosInstance.post("/broadcast/send", messageData);
      set((state) => ({
        broadcastMessages: [...state.broadcastMessages, res.data],
      }));
      toast.success("Broadcast sent to all users!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send broadcast");
    } finally {
      set({ isSendingBroadcast: false });
    }
  },

  markAsRead: async (messageId) => {
    try {
      await axiosInstance.put(`/broadcast/read/${messageId}`);
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  },

  subscribeToBroadcast: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.on("newBroadcastMessage", (newMessage) => {
      set((state) => ({
        broadcastMessages: [...state.broadcastMessages, newMessage],
      }));
      toast.success("New broadcast message received!");
    });
  },

  unsubscribeFromBroadcast: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;
    socket.off("newBroadcastMessage");
  },
}));