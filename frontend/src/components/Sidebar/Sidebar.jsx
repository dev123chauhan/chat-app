import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users, Hash, Plus } from "lucide-react";
import Modal from "../Modal/Modal";
import { Col, Button, Form, Badge } from "react-bootstrap";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const {
    getUsers,
    getRooms,
    users,
    rooms,
    selectedUser,
    selectedRoom,
    setSelectedUser,
    setSelectedRoom,
    isUsersLoading,
    isRoomsLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showRoomModal, setShowRoomModal] = useState(false);

  useEffect(() => {
    getUsers();
    getRooms();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading || isRoomsLoading) return <SidebarSkeleton />;

  return (
    <Col xs={4} sm={3} lg={3} className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Users className="header-icon" size={24} />
          <span className="header-title d-none d-lg-block">Contacts</span>
        </div>

        <div className="search-wrapper d-none d-lg-block">
          <Form.Control
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="section-label d-none d-lg-flex">
        <Users size={16} className="me-2" />
        Messages
        <div className="ms-auto">
          <Badge bg="success">{filteredUsers.length}</Badge>
        </div>
      </div>

      <div className="contacts-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`contact-item ${
              selectedUser && selectedUser._id === user._id ? "active" : ""
            }`}
          >
            <div className="contact-avatar-wrapper">
              <img
                src={user.profilePic || "/avatar.png"}
                className="contact-avatar"
                alt={user.fullName}
              />
              {onlineUsers.includes(user._id) && (
                <span className="online-badge"></span>
              )}
            </div>

            <div className="contact-info d-none d-lg-block">
              <div className="contact-name">{user.fullName}</div>
              <div className="contact-status">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="empty-state">No users found</div>
        )}
      </div>

      <div className="create-room-wrapper d-none d-lg-block">
        <Button
          className="create-room-btn"
          onClick={() => setShowRoomModal(true)}
        >
          <Plus size={18} className="me-2" />
          Create Room
        </Button>
      </div>

      <div className="section-label d-none d-lg-flex">
        <Hash size={16} className="me-2" />
        Rooms
        <div className="ms-auto">
          <Badge bg="success">{rooms.length}</Badge>
        </div>
      </div>

      <div className="rooms-list">
        {rooms.map((room) => (
          <button
            key={room._id}
            onClick={() => setSelectedRoom(room)}
            className={`room-item ${
              selectedRoom && selectedRoom._id === room._id ? "active" : ""
            }`}
          >
            <div className="room-avatar">
              <Hash size={20} />
            </div>

            <div className="room-info d-none d-lg-block">
              <div className="room-name">#{room.name}</div>
              <div className="room-members">{room.members.length} members</div>
            </div>
          </button>
        ))}

        {rooms.length === 0 && <div className="empty-state">No rooms yet</div>}
      </div>

      {showRoomModal && <Modal onClose={() => setShowRoomModal(false)} />}
    </Col>
  );
};

export default Sidebar;
