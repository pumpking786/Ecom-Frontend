import { Col, Container, Row } from "react-bootstrap";
import { HeaderComponent } from "../../components/home/header.component";

const ErrorPage = ({ error }) => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Row>
          <Col className="text-danger">
            {error === 404 ? "Resource not found" : "Server error"}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ErrorPage;
