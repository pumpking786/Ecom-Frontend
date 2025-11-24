import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { user_svc } from "./user.service";
const AdminUserChangePwd = () => {
  let navigate = useNavigate();
  let params = useParams();
  let validationSchema = Yup.object({
    newPassword: Yup.string().required().min(8),
    confirmPassword: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      try {
        let response = await user_svc.changePasswordByAdmin(data, params.id);
        toast.success(response.msg);
        navigate("/admin/users");
      } catch (err) {
        toast.error(err);
      }
      console.log(data);
    },
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Change Password</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/users">User List</NavLink>
          </li>
          <li className="breadcrumb-item active">Change Password</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            User Form
          </div>
          <div className="card-body">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">New Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="newPassword"
                    placeholder="Enter the new password"
                    required
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                  />
                  <span className="text-danger">
                    {formik.errors?.newPassword}
                  </span>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">Confirm Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="confirmPassword"
                    placeholder="Enter the new password again"
                    required
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <span className="text-danger">
                    {formik.errors?.confirmPassword}
                  </span>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3 row">
                <Col sm={{ offset: 3, span: 9 }}>
                  <Button
                    size="sm"
                    variant="danger"
                    type="reset"
                    className="me-3"
                  >
                    <i className="fa-solid fa-ban"></i> Cancel
                  </Button>
                  <Button size="sm" variant="success" type="submit">
                    <i className="fa fa-paper-plane"></i> Change Password
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminUserChangePwd;
