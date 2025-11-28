import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { Row, Col, Form } from "react-bootstrap";
import "../../styles/messageInput.css";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    sendMessage,
    sendTypingStart,
    sendTypingStop,
    selectedUser,
    selectedRoom
  } = useChatStore();

  const { authUser } = useAuthStore();

  let typingTimeout;

  const handleTyping = (e) => {
    setText(e.target.value);

    if (authUser) {
      if (selectedUser) {
        sendTypingStart(selectedUser._id, authUser._id);
      } else if (selectedRoom) {
        sendTypingStart(selectedRoom._id, authUser._id);
      }

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        if (selectedUser) {
          sendTypingStop(selectedUser._id, authUser._id);
        } else if (selectedRoom) {
          sendTypingStop(selectedRoom._id, authUser._id);
        }
      }, 700);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (selectedUser) {
      sendTypingStop(selectedUser._id, authUser._id);
    } else if (selectedRoom) {
      sendTypingStop(selectedRoom._id, authUser._id);
    }

    await sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="message-input-wrapper">
      {imagePreview && (
        <div className="image-preview-container">
          <div className="image-preview-box">
            <img
              src={imagePreview}
              alt="Preview"
              className="preview-image"
            />
            <button
              type="button"
              onClick={removeImage}
              className="remove-image-btn"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <Form onSubmit={handleSend}>
        <Row className="g-2 align-items-center mx-0">
          <Col xs={11} className="d-flex gap-2">
            <Form.Control
              type="text"
              value={text}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="message-text-input"
            />

            <Form.Control
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="d-none"
            />

            <button
              type="button"
              className="attach-btn d-none d-sm-flex"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
          </Col>

          <Col xs={1} className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={!text.trim() && !imagePreview}
              className="send-btn"
            >
              <Send size={20} />
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MessageInput;