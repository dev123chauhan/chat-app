import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Dropdown from "../components/Dropdown/Dropdown";
import { Navbar, Container } from "react-bootstrap";
import { MessageSquare } from "lucide-react";
import "../styles/header.css";

const Header = () => {
  const { authUser } = useAuthStore();

  return (
    <Navbar fixed="top" className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand-custom">
          <div className="brand-icon">
            <MessageSquare size={24} />
          </div>
          <h1 className="brand-title">ChatApp</h1>
        </Link>

        <div className="d-flex align-items-center gap-2">
          {authUser && <Dropdown />}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;