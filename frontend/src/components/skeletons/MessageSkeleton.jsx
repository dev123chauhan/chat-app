import { Container } from "react-bootstrap";
import "../../styles/messageSkeleton.css";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <Container fluid className="messages-skeleton-wrapper">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`skeleton-message-row ${idx % 2 === 0 ? "skeleton-start" : "skeleton-end"}`}
        >
          <div className="skeleton-avatar">
            <div className="skeleton-circle" />
          </div>

          <div className="skeleton-content">
            <div className="skeleton-time" />
            <div className="skeleton-bubble" />
          </div>
        </div>
      ))}
    </Container>
  );
};

export default MessageSkeleton;