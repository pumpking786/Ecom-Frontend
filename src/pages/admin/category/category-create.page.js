import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { category_svc } from "./category.service";
import CategoryForm from "./category-form.component";
const AdminCategoryCreate = () => {
  let navigate = useNavigate();
  const addCategory = async (data) => {
    try {
      let response = await category_svc.addCategory(data);
      toast.success(response.msg);
      navigate("/admin/categories");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Category Create</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/categories">Category List</NavLink>
          </li>
          <li className="breadcrumb-item active">Category Create</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Category Form
          </div>
          <div className="card-body">
            <CategoryForm submitForm={addCategory} buttontext="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminCategoryCreate;
