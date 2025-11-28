import { useState } from "react";
import { axiosInstance } from "../../services/axios";
import { useChatStore } from "../../store/useChatStore";
import { Modal as BsModal, Button, Form } from "react-bootstrap";
import { Hash, Users } from "lucide-react";
import "../../styles/modal.css";

const Modal = ({ onClose }) => {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getRooms } = useChatStore();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    setIsLoading(true);
    try {
      await axiosInstance.post("/rooms", {
        name: roomName,
        members: [],
      });

      await getRooms();
      onClose();
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleCreateRoom();
    }
  };

  return (
    <BsModal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      className="custom-modal"
    >
      <BsModal.Header closeButton className="modal-header-custom">
        <BsModal.Title className="modal-title-custom">
          <div className="modal-title-icon">
            <Hash size={24} />
          </div>
          <span>Create New Room</span>
        </BsModal.Title>
      </BsModal.Header>

      <BsModal.Body className="modal-body-custom">
        <div className="modal-info-box">
          <Users size={20} className="info-icon" />
          <p className="info-text">
            Create a room to start group conversations with your team
          </p>
        </div>

        <Form.Group className="modal-form-group">
          <Form.Label className="modal-label">Room Name</Form.Label>
          <div className="modal-input-wrapper">
            <Hash size={18} className="input-icon" />
            <Form.Control
              type="text"
              placeholder="Enter room name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="modal-input"
              autoFocus
              disabled={isLoading}
            />
          </div>
        </Form.Group>
      </BsModal.Body>

      <BsModal.Footer className="modal-footer-custom">
        <Button 
          variant="secondary" 
          onClick={onClose}
          className="modal-btn-cancel"
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button 
          onClick={handleCreateRoom}
          className="modal-btn-create"
          disabled={!roomName.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Creating...
            </>
          ) : (
            "Create Room"
          )}
        </Button>
      </BsModal.Footer>
    </BsModal>
  );
};

export default Modal;