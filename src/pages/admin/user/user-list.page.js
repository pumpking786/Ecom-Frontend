import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useCallback, useEffect, useState } from "react";
import { user_svc } from "./user.service";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import AdminActionBtn from "../../../components/admin/action-btn.component";
import LightBox from "../../../components/admin/lightbox.component";

const AdminUserList = () => {
  const deleteUser = async (id) => {
    //api integration
    try {
      let response = await user_svc.deleteUserById(id);
      if (response.status) {
        toast.success(response.msg);
        getAllUsers();
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
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
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
          <NavLink
            to={"/admin/change-pwd/" + row._id}
            className="btn btn-sm btn-rounded btn-warning me-1"
          >
            <i className="fa fa-key text-white"></i>
          </NavLink>
          <AdminActionBtn id={row._id} type={"user"} onDelete={deleteUser} />
        </>
      ),
    },
  ];
  let [data, setData] = useState();
  const getAllUsers = useCallback(async () => {
    try {
      let result = await user_svc.listAllUsers();
      setData(result.result);
    } catch (except) {
      toast.warn(except.response.data.msg);
    }
  }, []);
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  return (
    <>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Users</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Users</li>
        </ol>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            User Listing
            <NavLink
              className="btn btn-sm btn-success float-end"
              to="/admin/user/create"
            >
              <i className="fa fa-plus"></i> &nbsp; Add User
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
export default AdminUserList;
