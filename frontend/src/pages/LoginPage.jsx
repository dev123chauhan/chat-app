import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/authPage.css";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const startTime = Date.now();
    
    await login(formData);
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(500 - elapsedTime, 0);
    
    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  };

  const loading = isLoggingIn || isLoading;

  return (
    <div className="auth-page">
      <Container fluid className="auth-container">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <div className="auth-card">
              <div className="auth-header">
                <div className="auth-icon-wrapper">
                  <div className="auth-icon">
                    <MessageSquare size={32} />
                  </div>
                </div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your account</p>
              </div>

              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="auth-form-group">
                  <Form.Label className="auth-label">Email</Form.Label>
                  <InputGroup className="auth-input-group">
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="auth-input"
                      disabled={loading}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="auth-form-group">
                  <Form.Label className="auth-label">Password</Form.Label>
                  <InputGroup className="auth-input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="auth-input with-toggle"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="spinner-icon me-2" />
                        Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Form>

              <div className="auth-footer">
                <p className="auth-footer-text">
                  Dont have an account?{" "}
                  <Link to="/signup" className="auth-link">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;