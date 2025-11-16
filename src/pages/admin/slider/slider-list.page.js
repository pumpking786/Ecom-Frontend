import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { slider_svc } from "./slider.service";
import { toast } from "react-toastify";
const AdminSliderList = () => {
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
      selector: (row) => row.image,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => "Edit/Delete",
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
