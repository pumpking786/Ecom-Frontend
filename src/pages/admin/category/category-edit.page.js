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
        let sel_brands = [];
        if (response.result?.brands) {
          response.result.brands.map((item) => {
            sel_brands.push({
              value: item._id,
              label: item.title,
            });
          });
        }
        setDetail({
          name: response.result.name,
          status: response.result.status,
          image: response.result.image,
          parent_id: response.result?.parent_id?._id,
          brands: sel_brands,
        });
      }
      console.log(response.result?.parent_id?._id);
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
