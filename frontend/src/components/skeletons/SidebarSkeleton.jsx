import { Users, Hash, Search } from "lucide-react";
import { Col, Badge } from "react-bootstrap";
import "../../styles/sidebarSkeleton.css";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(5).fill(null);
  const skeletonRooms = Array(3).fill(null);

  return (
    <Col xs={4} sm={3} lg={3} className="sidebar-skeleton-wrapper">
      <div className="skeleton-header">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Users className="header-icon" size={24} />
          <span className="header-title d-none d-lg-block">Contacts</span>
        </div>

        <div className="skeleton-search-wrapper d-none d-lg-block">
          <Search className="search-icon-skeleton" size={18} />
          <div className="skeleton-search-input" />
        </div>
      </div>

      <div className="skeleton-section-label d-none d-lg-block">
        <Users size={16} className="me-2" />
        Direct Messages
        <Badge bg="secondary" className="ms-auto">
          <div className="skeleton-badge" />
        </Badge>
      </div>

      <div className="skeleton-contacts-list">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="skeleton-contact-item">
            <div className="skeleton-contact-avatar">
              <div className="skeleton-circle-avatar" />
            </div>

            <div className="skeleton-contact-info d-none d-lg-block">
              <div className="skeleton-contact-name" />
              <div className="skeleton-contact-status" />
            </div>
          </div>
        ))}
      </div>

      <div className="skeleton-create-room d-none d-lg-block">
        <div className="skeleton-create-btn" />
      </div>

      <div className="skeleton-section-label d-none d-lg-block">
        <Hash size={16} className="me-2" />
        Rooms
        <Badge bg="secondary" className="ms-auto">
          <div className="skeleton-badge" />
        </Badge>
      </div>

      <div className="skeleton-rooms-list">
        {skeletonRooms.map((_, idx) => (
          <div key={idx} className="skeleton-room-item">
            <div className="skeleton-room-avatar">
              <div className="skeleton-room-icon" />
            </div>

            <div className="skeleton-room-info d-none d-lg-block">
              <div className="skeleton-room-name" />
              <div className="skeleton-room-members" />
            </div>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default SidebarSkeleton;