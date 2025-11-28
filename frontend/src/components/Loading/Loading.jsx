import {  Loader2 } from "lucide-react";
import { Container } from "react-bootstrap";

export default function Loading() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <Loader2 className="animate-spin" size={40} />
    </Container>
  );
}
