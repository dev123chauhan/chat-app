import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Container
      fluid
      className="py-4 text-center small text-muted"
    >
      © {new Date().getFullYear()} Chat App — All Rights Reserved.
    </Container>
  );
}

