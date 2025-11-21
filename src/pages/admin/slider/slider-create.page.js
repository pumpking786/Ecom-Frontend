import { Button, Col, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { slider_svc } from "./slider.service";
import SliderForm from "./slider-form.component";
const AdminSliderCreate = () => {
  let navigate = useNavigate();
  const addSlider = async (data) => {
    try {
      let response = await slider_svc.addSlider(data);
      toast.success(response.msg);
      navigate("/admin/sliders");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Slider Create</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/sliders">Slider List</NavLink>
          </li>
          <li className="breadcrumb-item active">Slider Create</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Slider Form
          </div>
          <div className="card-body">
            <SliderForm submitForm={addSlider} buttontext="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSliderCreate;
