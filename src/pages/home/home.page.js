import {
  Tab,
  Accordion,
  Nav,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { users } from "../../mock/data";
import "./home.css";
import offer from "../../assets/image/offer.gif";
import cat1 from "../../assets/image/cat1.jpg";

import { HeaderComponent } from "../../components/home/header.component";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SliderComponent from "../../components/home/slider.component";
import { home_svc } from "../../services/home.service";

const HomePage = () => {
  let [banner, setBanner] = useState();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  // let data = users.result;

  // useEffect(() => {
  //   console.log("On first mount");
  //   setBanner([
  //     {
  //       _id: "",
  //       title: "Banner 1",
  //       image: Banner1,
  //       link: "",
  //     },
  //     {
  //       _id: "",
  //       title: "Banner 2",
  //       image: Banner1,
  //       link: "",
  //     },
  //     {
  //       _id: "",
  //       title: "Banner 3",
  //       image: Banner1,
  //       link: "",
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   console.log("Only on loading state");
  // }, [banner]);
  const getActiveBanners = async () => {
    try {
      let response = await home_svc.listAllBanners();
      setBanner(response);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getActiveBanners();
  }, []);
  return (
    <>
      {/* Slider Section Start */}
      <SliderComponent settings={settings} data={banner} loading={false} />
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
      <Container>
        <Row>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Accordion Item #1</Accordion.Header>
                          <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Accordion Item #2</Accordion.Header>
                          <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Accordion Item #1</Accordion.Header>
                          <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
