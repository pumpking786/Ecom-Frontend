import { useFormik } from "formik";
import { Button, Col, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { slider_svc } from "./slider.service";
const AdminSliderCreate = () => {
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    title: Yup.string().required().min(3),
    status: Yup.string().required(),
    link: Yup.string().url().nullable(),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      status: "",
      link: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let response = await slider_svc.addSlider(values);
        toast.success(response.msg);
        navigate("/admin/slider");
      } catch (err) {
        toast.error(err);
      }
      console.log(values);
    },
  });
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Slider Create</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/slider">Slider List</NavLink>
          </li>
          <li className="breadcrumb-item active">Slider Create</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Slider Form
          </div>
          <div className="card-body">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">Title:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="title"
                    placeholder="Enter the slider title"
                    required
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  <span className="text-danger">{formik.errors?.title}</span>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">Link(URL):</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="link"
                    placeholder="Enter the slider url"
                    required
                    value={formik.values.link}
                    onChange={formik.handleChange}
                  />
                  <span className="text-danger">{formik.errors?.link}</span>
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
              <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-3">Image:</Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="file"
                    name="image"
                    required
                    accept="image/*"
                    size="sm"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      let parts_arr = file.name.split(".");
                      let ext = parts_arr.pop();

                      if (
                        [
                          "jpg",
                          "jpeg",
                          "png",
                          "gif",
                          "bmp",
                          "webp",
                          "svg",
                        ].includes(ext.toLowerCase())
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
                    <Image
                      fluid
                      src={URL.createObjectURL(formik.values?.image)}
                    />
                  ) : (
                    <></>
                  )}
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
                    <i className="fa fa-paper-plane"></i> Submit
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
export default AdminSliderCreate;
