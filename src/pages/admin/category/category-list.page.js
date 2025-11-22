import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { category_svc } from "./category.service";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import AdminActionBtn from "../../../components/admin/action-btn.component";
import LightBox from "../../../components/admin/lightbox.component";

const AdminCategoryList = () => {
  const deleteCategory = async (id) => {
    //api integration
    try {
      let response = await category_svc.deleteCategoryById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllCategories();
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
      name: "Parent",
      selector: (row) => row?.parent_id?.name,
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
            type={"category"}
            onDelete={deleteCategory}
          />
        </>
      ),
    },
  ];
  let [data, setData] = useState();
  const getAllCategories = useCallback(async () => {
    try {
      let result = await category_svc.listAllCategories();
      setData(result.result);
    } catch (except) {
      toast.warn(except.response.data.msg);
    }
  }, []);
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Categories</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Categories</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Category Listing
            <NavLink
              className="btn btn-sm btn-success float-end"
              to="/admin/category/create"
            >
              <i className="fa fa-plus"></i> &nbsp; Add Category
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
export default AdminCategoryList;
