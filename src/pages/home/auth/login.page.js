import { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth_svc } from "../../../services/auth.service";
import { toast } from "react-toastify";
export const LoginPage = () => {
  let [data, setData] = useState({
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let user = await auth_svc.login(data);
      toast.success(`Welcome to ${user.role} panel`);
      navigate("/" + user.role);
    } catch (error) {
      console.log("AxiosError", error);
      if (error?.response?.status === 400) {
        const msg = error.response.data.msg;

        // DETECT KEYWORDS
        if (msg.includes("Email")) {
          setErrors({ email: msg, password: "" });
        } else if (msg.includes("password")) {
          setErrors({ email: "", password: msg });
        } else if (msg.includes("Password")) {
          setErrors({ email: "", password: msg });
        } else {
          setErrors({ email: msg, password: "" });
        }
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("mern_token");
    let user = JSON.parse(localStorage.getItem("mern_user"));
    if (token) {
      navigate("/" + user.role);
    }
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4 className="text-center">Login </h4>
            <hr />
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Email: </Form.Label>
              <Col sm={9}>
                <Form.Control
                  //   defaultValue={data.username}
                  onChange={handleChange}
                  size="sm"
                  name="email"
                  placeholder="Enter your email "
                  value={data.email}
                  isInvalid={!!errors.email}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Password: </Form.Label>
              <Col sm={9}>
                <Form.Control
                  //   defaultValue={data.password}
                  onChange={handleChange}
                  type="password"
                  size="sm"
                  name="password"
                  placeholder="Enter your password "
                  value={data.password}
                  isInvalid={!!errors.password}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
              <Col sm={{ offset: 3, span: 9 }}>
                <Button
                  //   defaultValue={data.password}
                  variant="danger"
                  type="reset"
                  size="sm"
                  className="me-1"
                >
                  <i className="fa fa-trash"></i> &nbsp; Cancel
                </Button>
                <Button
                  //   defaultValue={data.password}
                  varient="success"
                  type="submit"
                  size="sm"
                >
                  <i className="fa fa-paper-plane"></i>
                  Login
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
};
