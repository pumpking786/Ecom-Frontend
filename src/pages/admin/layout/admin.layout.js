import { Outlet } from "react-router-dom";
import "./admin.layout.css";
import "bootstrap";
import {
  AdminFooter,
  AdminSideNav,
  AdminTopNav,
} from "../../../components/admin/admin-partials.component";
const AdminLayout = () => {
  return (
    <>
      <AdminTopNav />
      <div id="layoutSidenav">
        <AdminSideNav />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <AdminFooter />
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      ></script>
      <script src="js/scripts.js"></script>
    </>
  );
};
export default AdminLayout;
