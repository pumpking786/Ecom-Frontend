import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const AdminTopNav = () => {
  let loggedUser = JSON.parse(localStorage.getItem("mern_user"));
  const navigate = useNavigate();
  useEffect(() => {
    let className = localStorage.getItem("sb|sidebar-toggle");
    if (className === "true") {
      document.body.classList.add("sb-sidenav-toggled");
    }
  }, []);
  const sidebarToggle = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("mern_token");
    localStorage.removeItem("mern_user");
    navigate("/login");
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <NavLink className="navbar-brand ps-3" to="/admin">
        Admin Panel
      </NavLink>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
        onClick={sidebarToggle}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <span style={{ color: "white" }}>{loggedUser.name}</span>
      </div>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Profile Update
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Change Password
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/login"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export const AdminSideNav = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Visit Site
            </NavLink>
            <NavLink className="nav-link" to="/admin/slider">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Slider Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Brand Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Category Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              User Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Product Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Order Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Review Manage
            </NavLink>
            <NavLink className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Transaction Manage
            </NavLink>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Start Bootstrap
        </div>
      </nav>
    </div>
  );
};
export const AdminFooter = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; Your Website 2023</div>
          <div>
            <a href="#">Privacy Policy</a>
            &middot;
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
