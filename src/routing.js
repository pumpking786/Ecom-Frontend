import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home/home.page";
import { LoginPage } from "./pages/home/auth/login.page";
import ErrorPage from "./pages/common/error.page";
import CategoryDetail from "./pages/home/category/category-detail.page";
import AdminLayout from "./pages/admin/layout/admin.layout";
import AdminDashboard from "./pages/admin/dashboard/admin-dashboard.page";
import { AdminAccessControl } from "./components/access-control/access-control.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterPage } from "./pages/home/auth/register.page";
import HomePageLayout from "./pages/home/home-page.layout";
import AdminSliderList from "./pages/admin/slider/slider-list.page";

const Routing = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="category/:id" element={<CategoryDetail />} />
            <Route path="search" element={<>Search Page</>} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminAccessControl
                accessTo="admin"
                Component={<AdminLayout />}
              />
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="slider" element={<AdminSliderList />} />
            <Route
              path="user"
              element={
                <>
                  User Outlet
                  <Outlet />
                </>
              }
            >
              <Route index element={<>Read</>} />
              <Route path="create" element={<>Create</>} />
              <Route path=":id/edit" element={<>Update</>} />
              <Route path=":id" element={<>Detail of users</>} />
              <Route path=":id/delete" element={<>Delete</>} />
            </Route>
          </Route>
          <Route
            path="/customer"
            element={
              <AdminAccessControl
                accessTo="customer"
                Component={<>Customer Dashboard</>}
              />
            }
          />
          <Route path="/customer/order" element={<>Customer Order</>} />
          <Route
            path="/customer/order/history"
            element={<>Customer Order History</>}
          />
          <Route path="*" element={<ErrorPage error={404} />} err />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Routing;
