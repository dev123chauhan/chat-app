import { useChatStore } from "../../store/useChatStore";
import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../utils/formatMessageTime";
import ChatHeader from "./ChatHeader";
import MessageInput from "../Message/MessageInput";
import { Col } from "react-bootstrap";
import "../../styles/chatContainer.css";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    selectedRoom,
    subscribeToMessages,
    unsubscribeFromMessages,
    typingUser,
    setTypingUser
  } = useChatStore();

  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id, "user");
    } else if (selectedRoom) {
      getMessages(selectedRoom._id, "room");
      socket.emit("joinRoom", selectedRoom._id);
    }
    setTypingUser(null);
  }, [selectedUser, selectedRoom]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingUser]);

  if (!selectedUser && !selectedRoom) {
    return (
      <Col className="d-flex flex-column align-items-center justify-content-center text-muted flex-grow-1">
        <p>Select a user or room to start chat</p>
      </Col>
    );
  }

  if (isMessagesLoading) {
    return (
      <Col className="chat-container">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </Col>
    );
  }

  const getProfilePic = (message) => {
    if (selectedUser) {
      return message.senderId === authUser._id
        ? authUser.profilePic || "/avatar.png"
        : selectedUser.profilePic || "/avatar.png";
    }
    if (selectedRoom) {
      return message.sender?.profilePic || "/avatar.png";
    }
  };

  return (
    <Col className="chat-container">
      <ChatHeader />
      <div className="messages-wrapper">
        {messages.map((message) => {
          const isMyMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`message-row ${isMyMessage ? "my-message" : "other-message"}`}
              ref={messageEndRef}
            >
              <div className="message-avatar">
                <img
                  src={getProfilePic(message)}
                  alt="profile"
                  className="avatar-img"
                />
              </div>

              <div className="message-content-wrapper">
                <div className="message-time">
                  {formatMessageTime(message.createdAt)}
                </div>

                <div className={`message-bubble ${isMyMessage ? "my-bubble" : "other-bubble"}`}>
                  {message.image && (
                    <img
                      src={message.image}
                      className="message-image"
                      alt="attachment"
                    />
                  )}
                  {message.text && <p className="message-text">{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}

        {selectedUser && typingUser === selectedUser._id && (
          <div className="message-row other-message">
            <div className="message-avatar">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt="typing"
                className="avatar-img"
              />
            </div>

            <div className="message-content-wrapper">
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </Col>
  );
};

export default ChatContainer;