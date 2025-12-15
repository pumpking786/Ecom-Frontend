import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth_svc } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const VerifyTokenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email); // prefill email
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth_svc.verifyOtp({ email, otp });
      toast.success("Registration verified successfully! You can login now.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h4 className="text-center mb-3">
            Verify OTP (Refresh One time before verify OTP)
          </h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the OTP"
                value={otp}
                required
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Verify OTP
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
