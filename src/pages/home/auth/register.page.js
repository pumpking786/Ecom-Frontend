import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const RegisterPage = () => {
  let defaultValue = {
    name: "",
    email: "",
    password: "",
    role: "",
    status: "active",
    image: "",
    address: "",
  };
  let validate = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
    role: Yup.string().required(),
    status: Yup.string().default("active"),
    image: Yup.object().nullable(),
    address: Yup.string().nullable(),
  });
  let formik = useFormik({
    initialValues: defaultValue,
    validationSchema: validate,
    onSubmit: (values) => {
      console.log("Submit: ", values);
    },
  });
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4 className="text-center">Register </h4>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    size="sm"
                    required
                    onChange={formik.handleChange}
                  ></Form.Control>
                  <span className="text-danger">{formik.errors?.name}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    size="sm"
                    required
                    onChange={formik.handleChange}
                  ></Form.Control>
                  <span className="text-danger">{formik.errors?.email}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    size="sm"
                    required
                    onChange={formik.handleChange}
                  ></Form.Control>{" "}
                  <span className="text-danger">{formik.errors?.password}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Address:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="Address"
                    as={"textarea"}
                    placeholder="Enter your address"
                    rows={5}
                    required
                    onChange={formik.handleChange}
                  ></Form.Control>{" "}
                  <span className="text-danger">{formik.errors?.address}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Col sm={3}>Role</Col>
                <Col sm={9}>
                  <Form.Select
                    name="role"
                    size="sm"
                    required
                    onChange={formik.handleChange}
                  >
                    <option>--Select Any One--</option>
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                  </Form.Select>{" "}
                  <span className="text-danger">{formik.errors?.role}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let { files } = e.target;
                      let file = files[0];
                      let ext = file.name.split(".");
                      ext = ext.pop();
                      if (
                        ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(
                          ext.toLowerCase()
                        )
                      ) {
                        if (file.size <= 10000000) {
                          formik.setValues({
                            ...formik.values,
                            image: file,
                          });
                        } else {
                          formik.setErrors({
                            ...formik.errors,
                            image: "file size should be less than 10mb",
                          });
                        }
                      } else {
                        formik.setErrors({
                          ...formik.errors,
                          image: "file format not supported",
                        });
                      }
                    }}
                  ></Form.Control>{" "}
                  <span className="text-danger">{formik.errors?.image}</span>
                </Col>
              </Form.Group>
              <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                  <Button variant="danger" className="me-3" type="reset">
                    <i className="fa fa-trash"></i> Cancel
                  </Button>
                  <Button variant="success" className="me-3" type="submit">
                    <i className="fa fa-paper-plane"></i>Register
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
