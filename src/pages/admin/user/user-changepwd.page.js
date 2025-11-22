import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
const AdminUserChangePwd = () => {
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
            <Form>
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">New Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder="Enter the new password"
                    required
                  />
                  {/* <span className="text-danger">{formik.errors?.name}</span> */}
                </Col>
              </Form.Group>
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">Confirm Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder="Enter the new password again"
                    required
                  />
                  {/* <span className="text-danger">{formik.errors?.name}</span> */}
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
