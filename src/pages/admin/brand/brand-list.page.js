import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { brand_svc } from "./brand.service";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import AdminActionBtn from "../../../components/admin/action-btn.component";
import LightBox from "../../../components/admin/lightbox.component";

const AdminBrandList = () => {
  const deleteBrand = async (id) => {
    //api integration
    try {
      let response = await brand_svc.deleteBrandById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllBrands();
      } else {
        toast.error(response.msg);
      }
    } catch (err) {}
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
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
          <AdminActionBtn id={row._id} type={"brand"} onDelete={deleteBrand} />
        </>
      ),
    },
  ];
  let [data, setData] = useState();
  const getAllBrands = useCallback(async () => {
    try {
      let result = await brand_svc.listAllBrands();
      setData(result.result);
    } catch (except) {
      toast.warn(except.response.data.msg);
    }
  }, []);
  useEffect(() => {
    getAllBrands();
  }, [getAllBrands]);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Brands</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Brands</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Brand Listing
            <NavLink
              className="btn btn-sm btn-success float-end"
              to="/admin/brand/create"
            >
              <i className="fa fa-plus"></i> &nbsp; Add Brand
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
export default AdminBrandList;
