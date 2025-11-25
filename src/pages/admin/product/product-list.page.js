import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { product_svc } from "./product.service";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import AdminActionBtn from "../../../components/admin/action-btn.component";
import LightBox from "../../../components/admin/lightbox.component";

const AdminProductList = () => {
  const deleteProduct = async (id) => {
    //api integration
    try {
      let response = await product_svc.deleteProductById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllProducts();
      } else {
        toast.error(response.msg);
      }
    } catch (err) {}
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) =>
        row.category_id ? (
          row.category_id.map((item) => item.name).join(",")
        ) : (
          <></>
        ),
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Featured",
      selector: (row) => (row.is_featured ? "Yes" : "No"),
    },

    {
      name: "Image",
      selector: (row) => (
        <>
          <LightBox image={row.image} />
        </>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <Badge bg={row.status === "active" ? "success" : "danger"}>
          {row.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <AdminActionBtn
            id={row._id}
            type={"product"}
            onDelete={deleteProduct}
          />
        </>
      ),
    },
  ];
  let [data, setData] = useState();
  const getAllProducts = useCallback(async () => {
    try {
      let result = await product_svc.listAllProducts();
      setData(result.result);
    } catch (except) {
      toast.warn(except.response.data.msg);
    }
  }, []);
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Products</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Products</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Product Listing
            <NavLink
              className="btn btn-sm btn-success float-end"
              to="/admin/product/create"
            >
              <i className="fa fa-plus"></i> &nbsp; Add Product
            </NavLink>
          </div>
          <div className="card-body">
            <DataTable columns={columns} data={data} pagination />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminProductList;
