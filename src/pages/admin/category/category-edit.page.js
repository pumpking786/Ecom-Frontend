import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { category_svc } from "./category.service";
import { useCallback, useEffect, useState } from "react";
import CategoryForm from "./category-form.component";
const AdminCategoryEdit = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [detail, setDetail] = useState();
  const updateCategory = async (data) => {
    try {
      let response = await category_svc.updateCategory(data, params.id);
      toast.success(response.msg);
      navigate("/admin/category");
    } catch (err) {
      toast.error(err);
    }
  };
  const getCategoryDetail = useCallback(async () => {
    try {
      let response = await category_svc.getDetailById(params.id);
      if (response.result) {
        setDetail({
          name: response.result.name,
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
    getCategoryDetail();
  }, []);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Category Edit</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/category">Category List</NavLink>
          </li>
          <li className="breadcrumb-item active">Category Edit</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Category Form
          </div>
          <div className="card-body">
            <CategoryForm
              submitForm={updateCategory}
              defaultValue={detail}
              buttontext="Save"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminCategoryEdit;
