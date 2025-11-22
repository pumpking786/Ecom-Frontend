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
import AdminSliderCreate from "./pages/admin/slider/slider-create.page";
import AdminSliderEdit from "./pages/admin/slider/slider-edit.page";
import AdminBrandList from "./pages/admin/brand/brand-list.page";
import AdminBrandCreate from "./pages/admin/brand/brand-create.page";
import AdminBrandEdit from "./pages/admin/brand/brand-edit.page";
import AdminCategoryList from "./pages/admin/category/category-list.page";
import AdminCategoryCreate from "./pages/admin/category/category-create.page";
import AdminCategoryEdit from "./pages/admin/category/category-edit.page";
import AdminUserList from "./pages/admin/user/user-list.page";
import AdminUserCreate from "./pages/admin/user/user-create.page";
import AdminUserEdit from "./pages/admin/user/user-edit.page";
import AdminUserChangePwd from "./pages/admin/user/user-changepwd.page";
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
            <Route path="sliders" element={<AdminSliderList />} />
            <Route path="slider/create" element={<AdminSliderCreate />} />
            <Route path="slider/:id" element={<AdminSliderEdit />} />
            <Route path="brands" element={<AdminBrandList />} />
            <Route path="brand/create" element={<AdminBrandCreate />} />
            <Route path="brand/:id" element={<AdminBrandEdit />} />
            <Route path="categories" element={<AdminCategoryList />} />
            <Route path="category/create" element={<AdminCategoryCreate />} />
            <Route path="category/:id" element={<AdminCategoryEdit />} />

            <Route path="users" element={<AdminUserList />} />
            <Route path="user/create" element={<AdminUserCreate />} />
            <Route path="user/:id" element={<AdminUserEdit />} />
            <Route path="change-pwd/:id" element={<AdminUserChangePwd />} />
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
