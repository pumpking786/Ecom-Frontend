import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { slider_svc } from "./slider.service";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import AdminActionBtn from "../../../components/admin/action-btn.component";
import LightBox from "../../../components/admin/lightbox.component";

const AdminSliderList = () => {
  const deleteSlider = async (id) => {
    //api integration
    try {
      let response = await slider_svc.deleteSliderById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllSliders();
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
      name: "Link",
      selector: (row) => row.link,
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
            type={"slider"}
            onDelete={deleteSlider}
          />
        </>
      ),
    },
  ];
  let [data, setData] = useState();
  const getAllSliders = useCallback(async () => {
    try {
      let result = await slider_svc.listAllBanners();
      setData(result.result);
    } catch (except) {
      toast.warn(except.response.data.msg);
    }
  }, []);
  useEffect(() => {
    getAllSliders();
  }, [getAllSliders]);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Slider Listing
            <NavLink
              className="btn btn-sm btn-success float-end"
              to="/admin/slider/create"
            >
              <i className="fa fa-plus"></i> &nbsp; Add Slider
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
export default AdminSliderList;
