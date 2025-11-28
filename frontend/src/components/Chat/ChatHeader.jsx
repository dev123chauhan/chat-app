
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { Row, Col, Button } from "react-bootstrap";
import "../../styles/chatHeader.css";

const ChatHeader = () => {
  const {
    selectedUser,
    selectedRoom,
    setSelectedUser,
    setSelectedRoom,
    typingUser
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const isTyping = selectedUser && typingUser === selectedUser._id;

  if (selectedRoom) {
    return (
      <div className="chat-header">
        <Row className="align-items-center mx-0">
          <Col xs="auto" className="d-flex align-items-center gap-3">
            <div className="room-avatar">
              <span className="room-hash">#</span>
            </div>

            <div>
              <h3 className="chat-header-title">#{selectedRoom.name}</h3>
              <p className="chat-header-status">
                {selectedRoom.members?.length} members
              </p>
            </div>
          </Col>

          <Col xs="auto" className="ms-auto">
            <Button
              variant="link"
              className="close-btn"
              onClick={() => setSelectedRoom(null)}
            >
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  if (selectedUser) {
    return (
      <div className="chat-header">
        <Row className="align-items-center mx-0">
          <Col xs="auto" className="d-flex align-items-center gap-3">
            <div className="user-avatar-wrapper">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="user-avatar"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="online-indicator"></span>
              )}
            </div>

            <div>
              <h3 className="chat-header-title">{selectedUser.fullName}</h3>
              <p className={`chat-header-status ${isTyping ? 'typing-status' : ''}`}>
                {isTyping
                  ? "Typing..."
                  : onlineUsers.includes(selectedUser._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </Col>

          <Col xs="auto" className="ms-auto">
            <Button
              variant="link"
              className="close-btn"
              onClick={() => setSelectedUser(null)}
            >
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return null;
};

export default ChatHeader;