import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import "../../pages/home/home.page";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import { FaPhone, FaMapMarked } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
export const HeaderComponent = () => {
  let loggedUser = JSON.parse(localStorage.getItem("mern_user"));
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mern_token");
    localStorage.removeItem("mern_user");
    navigate("/login");
  };
  return (
    <>
      {/* Nav Section Start */}
      <Navbar bg="light" variant="light" style={{ maxHeight: "40px" }}>
        <Container>
          <Row>
            <Col className="py-2">
              <span className="me-3">
                <FaPhone /> 9841803301
              </span>
              <span>
                <FaMapMarked className="me-2" />
                Pramit Amatya
              </span>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img alt="Logo" src={Logo} className="img img-fluid logo-image" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/category" className="nav-link">
              Category
            </NavLink>
            <NavLink to="/products" className="nav-link">
              {" "}
              Products
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/cart" className="nav-link">
              Cart (0)
            </NavLink>
            {loggedUser ? (
              <>
                <NavLink to={"/" + loggedUser.role} className="nav-link">
                  {loggedUser.name}
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="nav-link"
                >
                  Log out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* Nav Section Ends */}
    </>
  );
};
export const FooterComponent = () => {
  return (
    <>
      {/* Footer Section Starts */}
      <footer className="bg-dark text-white">
        <Container>
          <Row>
            <Col sm={12} lg={3}>
              First
            </Col>
            <Col sm={12} lg={3}>
              Second
            </Col>
            <Col sm={12} lg={3}>
              Third
            </Col>
            <Col sm={12} lg={3}>
              Fourth
            </Col>
          </Row>
        </Container>
      </footer>
      {/* Footer Section Ends */}
    </>
  );
};
