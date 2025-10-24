import { Nav, Container, Row, Col, Card } from "react-bootstrap";
import { users } from "../../mock/data";
import "./home.css";
import Banner1 from "../../assets/image/banner1.jpg";
import offer from "../../assets/image/offer.gif";
import cat1 from "../../assets/image/cat1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeaderComponent } from "../../components/home/header.component";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  let [banner, setBanner] = useState();
  let [loading, setLoading] = useState(true);
  let data = users.result;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  useEffect(() => {
    console.log("On first mount");
    setBanner([
      {
        _id: "",
        title: "Banner 1",
        image: Banner1,
        link: "",
      },
      {
        _id: "",
        title: "Banner 2",
        image: Banner1,
        link: "",
      },
      {
        _id: "",
        title: "Banner 3",
        image: Banner1,
        link: "",
      },
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Only on loading state");
  }, [loading, banner]);
  return (
    <>
      {/* Slider Section Start */}
      {loading ? (
        "Loading..."
      ) : (
        <Slider {...settings} className="mb-5">
          {banner &&
            banner.map((item, index) => (
              <div key={index}>
                {" "}
                <img
                  src={item.image}
                  alt={item.title}
                  className="banner-image"
                />
              </div>
            ))}
        </Slider>
      )}
      {/* Slider Section End */}
      {/* Offer Section Starts */}
      <Container>
        <Row>
          <Col>
            <Nav.Link href="/">
              <img className="img img-fluid" src={offer} />
            </Nav.Link>
          </Col>
        </Row>
      </Container>
      {/* Offer Section Ends */}

      {/* Category Section Starts */}
      <div className="bg-light">
        <Container className="mt-3">
          <Row>
            <Col>
              <h4 className="text-center">Category</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              {" "}
              {/* Adjusted to 6 columns with lg=2 */}
              <Card>
                <NavLink to="/category/1">
                  <Card.Img variant="top" src={cat1} />
                </NavLink>
                <Card.Body>
                  <Card.Title>
                    <NavLink to="/category/1">Headphone </NavLink>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2}>
              <Card>
                <Card.Img variant="top" src={cat1} />
                <Card.Body>
                  <Card.Title>Headphone</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2}>
              <Card>
                <Card.Img variant="top" src={cat1} />
                <Card.Body>
                  <Card.Title>Headphone</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2}>
              <Card>
                <Card.Img variant="top" src={cat1} />
                <Card.Body>
                  <Card.Title>Headphone</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2}>
              <Card>
                <Card.Img variant="top" src={cat1} />
                <Card.Body>
                  <Card.Title>Headphone</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2}>
              <Card>
                <Card.Img variant="top" src={cat1} />
                <Card.Body>
                  <Card.Title>Headphone</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Category Section Ends */}
    </>
  );
};
export default HomePage;
