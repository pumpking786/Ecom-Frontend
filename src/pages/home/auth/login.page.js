import { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  let [data, setData] = useState({
    email: null,
    password: null,
  });
  let navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let user_detail = {
      result: {
        user: { _id: 123, name: "", email: "", role: "admin" },
        token: "jwttoken",
      },
    };
    localStorage.setItem(
      "_mern15_user",
      JSON.stringify(user_detail.result.user)
    );
    localStorage.setItem("_mern15_token", user_detail.result.token);
    // sessionStorage.setItem("_mern15_user", JSON.stringify(user_detail));
    // let local_store_user = localStorage.getItem("_mern15_user");
    // localStorage.clear();
    // localStorage.removeItem("_mern15_user");
    navigate("/" + user_detail.result.user.role);
  };

  useEffect(() => {
    let token = localStorage.getItem("_mern15_token");
    let user = JSON.parse(localStorage.getItem("_mern15_user"));
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
              <Form.Label className="col-sm-3">Username: </Form.Label>
              <Col sm={9}>
                <Form.Control
                  //   defaultValue={data.username}
                  onChange={handleChange}
                  size="sm"
                  name="username"
                  placeholder="Enter your username "
                ></Form.Control>
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
                ></Form.Control>
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
