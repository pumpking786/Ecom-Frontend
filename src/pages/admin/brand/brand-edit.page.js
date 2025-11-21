import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { brand_svc } from "./brand.service";
import { useCallback, useEffect, useState } from "react";
import BrandForm from "./brand-form.component";
const AdminBrandEdit = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [detail, setDetail] = useState();
  const updateBrand = async (data) => {
    try {
      let response = await brand_svc.updateBrand(data, params.id);
      toast.success(response.msg);
      navigate("/admin/brands");
    } catch (err) {
      toast.error(err);
    }
  };
  const getBrandDetail = useCallback(async () => {
    try {
      let response = await brand_svc.getDetailById(params.id);
      if (response.result) {
        setDetail({
          title: response.result.title,
          status: response.result.status,
          link: response.result.link,
          image: response.result.image,
        });
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  });
  useEffect(() => {
    getBrandDetail();
  }, []);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Brand Edit</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/brands">Brand List</NavLink>
          </li>
          <li className="breadcrumb-item active">Brand Edit</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Brand Form
          </div>
          <div className="card-body">
            <BrandForm
              submitForm={updateBrand}
              defaultValue={detail}
              buttontext="Save"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminBrandEdit;
