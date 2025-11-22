import { Form, Col, Button, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const UserForm = ({ submitForm, defaultValue, buttontext, isEdit = false }) => {
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    status: Yup.string().required(),
    role: Yup.string().required(),
    address: Yup.string().required(),
    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        }),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      address: "",
      status: "",
      image: null,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submitForm(values);
      console.log(values);
    },
  });
  useEffect(() => {
    if (defaultValue) {
      formik.setValues({
        ...defaultValue,
      });
    }
  }, [defaultValue]);
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              name="name"
              placeholder="Enter the user name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.name}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Email:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="email"
              name="email"
              placeholder="Enter the email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.email}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Address:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              name="address"
              placeholder="Enter the address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.address}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Role:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="role"
              required
              size="sm"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option>--Select Any One--</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </Form.Select>
            <span className="text-danger">{formik.errors?.role}</span>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Status:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="status"
              required
              size="sm"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option>--Select Any One--</option>
              <option value="active">Publish</option>
              <option value="inactive">Un-Publish</option>
            </Form.Select>
            <span className="text-danger">{formik.errors?.status}</span>
          </Col>
        </Form.Group>
        {!isEdit && (
          <>
            <Form.Group className="mb-3 row">
              <Form.Label className="col-sm-3">Password:</Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password || ""}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.password && !!formik.errors.password
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3 row">
              <Form.Label className="col-sm-3">Confirm Password:</Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formik.values.confirmPassword || ""}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Image:</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="file"
              name="image"
              // required={!formik.values.image ? true : false}
              accept="image/*"
              size="sm"
              onChange={(e) => {
                let file = e.target.files[0];
                let parts_arr = file.name.split(".");
                let ext = parts_arr.pop();

                if (
                  ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                    ext.toLowerCase()
                  )
                ) {
                  if (file.size <= 5000000) {
                    formik.setValues({
                      ...formik.values,
                      image: file,
                    });
                  } else {
                    formik.setErrors({
                      ...formik.errors,
                      image: "File size should be < 5mb",
                    });
                  }
                } else {
                  formik.setErrors({
                    ...formik.errors,
                    image: "Invalid File Format",
                  });
                }
              }}
            />
            <span className="text-danger">{formik.errors?.image}</span>
          </Col>
          <Col sm={2}>
            {formik.values.image ? (
              typeof formik.values.image === "object" ? (
                <Image fluid src={URL.createObjectURL(formik.values?.image)} />
              ) : (
                <Image
                  fluid
                  src={
                    process.env.REACT_APP_API_URL +
                    "/assets/" +
                    formik.values?.image
                  }
                />
              )
            ) : (
              <></>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button size="sm" variant="danger" type="reset" className="me-3">
              <i className="fa-solid fa-ban"></i> Cancel
            </Button>
            <Button size="sm" variant="success" type="submit">
              <i className="fa fa-paper-plane"></i> {buttontext}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
export default UserForm;
