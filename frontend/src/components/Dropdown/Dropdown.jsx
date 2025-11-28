import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import "../../styles/dropdown.css";

const Dropdown = () => {
  const { logout, authUser } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropRef} className="dropdown-wrapper">
      <button
        className="dropdown-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="user-avatar-small">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt={authUser?.fullName}
            className="avatar-img-small"
          />
        </div>
        <span className="user-name-display d-none d-sm-inline">
          {authUser?.fullName}
        </span>
        <ChevronDown 
          size={16} 
          className={`chevron-icon ${open ? "open" : ""}`}
        />
      </button>

      {open && (
        <div className="dropdown-menu-custom">
          <div className="dropdown-header">
            <div className="dropdown-user-info">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName}
                className="dropdown-avatar"
              />
              <div className="dropdown-user-details">
                <p className="dropdown-user-name">{authUser?.fullName}</p>
                <p className="dropdown-user-email">{authUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <ul className="dropdown-list">
            <li className="dropdown-item">
              <Link
                to="/profile"
                className="dropdown-link"
                onClick={() => setOpen(false)}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </li>

            <li className="dropdown-item">
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="dropdown-link logout-btn"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;