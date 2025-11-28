import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { validateSignup } from "../utils/validators";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../styles/authPage.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateSignup(formData);
    
    if (isValid) {
      setIsLoading(true);
      
      const startTime = Date.now();
      
      await signup(formData);
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(500 - elapsedTime, 0);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }
  };

  const loading = isSigningUp || isLoading;

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
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Get started with your free account</p>
              </div>

              <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group className="auth-form-group">
                  <Form.Label className="auth-label">Full Name</Form.Label>
                  <InputGroup className="auth-input-group">
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="auth-input"
                      disabled={loading}
                    />
                  </InputGroup>
                </Form.Group>

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
                      <Loader2 size={20} className="spinner-icon" />
                      {" "}Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Form>

              <div className="auth-footer">
                <p className="auth-footer-text">
                  Already have an account?{" "}
                  <Link to="/login" className="auth-link">
                    Sign in
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

export default SignUpPage;