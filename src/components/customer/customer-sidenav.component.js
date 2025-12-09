import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CustomerSidebar = () => {
  let loggedInUser = useSelector((store) => {
    return store.user.loggedInUser;
    // console.log(state);
  });
  return (
    <>
      {" "}
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
                  <i className="fas fa-home"></i>
                </div>
                Visit Site
              </NavLink>
              <NavLink className="nav-link" to="/customer/order-history">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-home"></i>
                </div>
                Order History
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {loggedInUser.name}
          </div>
        </nav>
      </div>
      ;
    </>
  );
};
export default CustomerSidebar;
