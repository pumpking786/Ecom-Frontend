import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { brand_svc } from "./brand.service";
import BrandForm from "./brand-form.component";
const AdminBrandCreate = () => {
  let navigate = useNavigate();
  const addBrand = async (data) => {
    try {
      let response = await brand_svc.addBrand(data);
      toast.success(response.msg);
      navigate("/admin/brand");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Brand Create</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/brand">Brand List</NavLink>
          </li>
          <li className="breadcrumb-item active">Brand Create</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Brand Form
          </div>
          <div className="card-body">
            <BrandForm submitForm={addBrand} buttontext="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminBrandCreate;
