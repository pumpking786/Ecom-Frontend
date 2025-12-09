import { Outlet } from "react-router-dom";
import {
  AdminFooter,
  AdminTopNav,
} from "../../../components/admin/admin-partials.component";
import CustomerSidebar from "../../../components/customer/customer-sidenav.component";

const CustomerLayout = () => {
  return (
    <>
      <AdminTopNav />
      <div id="layoutSidenav">
        <CustomerSidebar />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <AdminFooter />
        </div>
      </div>
    </>
  );
};
export default CustomerLayout;
