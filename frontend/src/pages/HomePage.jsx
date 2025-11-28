import ChatContainer from "../components/Chat/ChatContainer";
import NoChatSelected from "../components/NoChat/NoChatSelected";
import Sidebar from "../components/Sidebar/Sidebar";
import { useChatStore } from "../store/useChatStore";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/homePage.css"

const HomePage = () => {
  const { selectedUser, selectedRoom } = useChatStore();

  return (
    <div className="home-page">
      <Container fluid className="h-100 py-5 mt-5">
        <Row className="justify-content-center h-100">
          <Col xs={12} lg={11} xl={10} xxl={10}  className="h-100">
            <div className="chat-card h-100">
              <div className="chat-card-body">
                <Sidebar />
                {selectedUser || selectedRoom ? <ChatContainer /> : <NoChatSelected />}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;