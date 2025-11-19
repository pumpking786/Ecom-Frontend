import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const AdminActionBtn = ({ id, type, onDelete }) => {
  const confirmDialog = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };
  return (
    <>
      <NavLink
        to={"/admin/" + type + "/" + id}
        className="btn btn-sm btn-success me-1 btn-rounded"
      >
        <i className="fa fa-pen"></i>
      </NavLink>
      <NavLink
        onClick={confirmDialog}
        to={"/admin/" + type + "/" + id}
        className="btn btn-sm btn-danger me-1 btn-rounded"
      >
        <i className="fa fa-trash"></i>
      </NavLink>{" "}
    </>
  );
};
export default AdminActionBtn;
