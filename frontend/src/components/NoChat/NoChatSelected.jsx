import { MessageSquare } from "lucide-react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/noChatSelected.css";

const NoChatSelected = () => {
  return (
    <Container fluid className="no-chat-container">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className="no-chat-icon-wrapper">
            <div className="no-chat-icon">
              <MessageSquare strokeWidth={1.5} size={36} />
            </div>
          </div>

          <h2 className="no-chat-title">Welcome to ChatApp</h2>

          <p className="no-chat-subtitle">
            Select a conversation from the sidebar to start messaging
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NoChatSelected;