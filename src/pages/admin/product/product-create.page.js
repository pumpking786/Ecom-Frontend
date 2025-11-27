import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { product_svc } from "./product.service";
import ProductForm from "./product-form.component";
const AdminProductCreate = () => {
  let navigate = useNavigate();
  const addProduct = async (data) => {
    try {
      let form_data = new FormData();
      if (data.images) {
        data.images.forEach((item) => {
          form_data.append("images", item, item.name);
        });
        delete data.images;
      }
      Object.keys(data).forEach((key) => {
        form_data.append(key, data[key]);
      });
      let response = await product_svc.addProduct(form_data);
      toast.success(response.msg);
      navigate("/admin/products");
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Product Create</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/products">Product List</NavLink>
          </li>
          <li className="breadcrumb-item active">Product Create</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Product Form
          </div>
          <div className="card-body">
            <ProductForm submitForm={addProduct} buttontext="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminProductCreate;
