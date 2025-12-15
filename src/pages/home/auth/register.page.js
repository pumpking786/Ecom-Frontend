import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth_svc } from "../../../services/auth.service"; // import your AuthService
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  let navigate = useNavigate();
  let defaultValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // ✅ add this
    role: "",
    status: "active",
    image: "",
    address: "",
  };

  let validate = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"), // ✅ match password
    role: Yup.string().required("Role is required"),
    status: Yup.string().default("active"),
    image: Yup.mixed().nullable(),
    address: Yup.string().nullable(),
  });

  let formik = useFormik({
    initialValues: defaultValue,
    validationSchema: validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          if (key === "image" && values.image) {
            formData.append(key, values.image);
          } else {
            formData.append(key, values[key]);
          }
        }

        const response = await auth_svc.register(formData); // we'll create this function
        console.log(response);

        toast.success(response.msg || "OTP sent. Check your email!");
        resetForm();
        navigate("/verify", { state: { email: values.email } });
      } catch (err) {
        toast.error(err.message || "Registration failed");
      }
    },
  });

  return (
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
              {" "}
              <Form.Label className="col-sm-3">
                Confirm Password:
              </Form.Label>{" "}
              <Col sm={9}>
                {" "}
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  size="sm"
                  value={formik.values.confirmPassword || ""}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.confirmPassword}
                />{" "}
                <Form.Control.Feedback type="invalid">
                  {" "}
                  {formik.errors?.confirmPassword}{" "}
                </Form.Control.Feedback>{" "}
              </Col>{" "}
            </Form.Group>
            <Form.Group className="row mb-3">
              <Form.Label className="col-sm-3">Address:</Form.Label>
              <Col sm={9}>
                <Form.Control
                  name="address"
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
              <Col sm={4}>
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
              <Col sm={2}>
                {formik.values.image ? (
                  <>
                    <img
                      src={URL.createObjectURL(formik.values.image)}
                      className="img img-fluid"
                    />
                  </>
                ) : (
                  <></>
                )}
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
  );
};
