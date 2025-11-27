import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { product_svc } from "./product.service";
import { useCallback, useEffect, useState } from "react";
import ProductForm from "./product-form.component";
const AdminProductEdit = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [detail, setDetail] = useState();
  const updateProduct = async (data) => {
    try {
      let form_data = new FormData();
      if (data.images) {
        data.images.forEach((item) => {
          if (typeof item === "object") {
            form_data.append("images", item, item.name);
          }
        });
        delete data.images;
      }
      Object.keys(data).forEach((key) => {
        form_data.append(key, data[key]);
      });
      let response = await product_svc.updateProduct(form_data, params.id);
      toast.success(response.msg);
      navigate("/admin/products");
    } catch (err) {
      toast.error(err);
    }
  };
  const getProductDetail = useCallback(async () => {
    try {
      let response = await product_svc.getDetailById(params.id);
      console.log(response);

      if (response.result) {
        let sel_cat = [];
        if (response.result?.category_id) {
          response.result.category_id.map((item) => {
            sel_cat.push({
              value: item._id,
              label: item.name,
            });
          });
        }
        let sel_brand = null;
        if (response.result.brand) {
          sel_brand = {
            value: response.result.brand._id,
            label: response.result.brand.title || response.result.brand.name,
          };
        }
        setDetail({
          name: response.result.name,
          category_id: sel_cat,
          brand: sel_brand,
          status: response.result.status,
          images: response.result.images,
          price: response.result.price,
          discount: response.result.discount,
          description: response.result.description,
          is_featured: response.result.is_featured ? 1 : 0,
          seller: response.result.seller,
        });
      }
      // console.log(response.result?.parent_id?._id);
    } catch (err) {
      console.log(err);
    }
  });
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Product Edit</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item active">
            <NavLink to="/admin/products">Product List</NavLink>
          </li>
          <li className="breadcrumb-item active">Product Edit</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Product Form
          </div>
          <div className="card-body">
            <ProductForm
              submitForm={updateProduct}
              defaultValue={detail}
              buttontext="Save"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminProductEdit;
