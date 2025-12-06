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

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import HomeBannerComponent from "../../components/home/banner/home-banner.component";
import CategoryCardComponent from "../../components/home/category/category-card.component";
import BrandCardComponent from "../../components/home/brand/brand-card.component";
import ProductCardComponent from "../../components/home/product/product-card.component";

const HomePage = () => {
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

  return (
    <>
      {/* Slider Section Start */}
      <HomeBannerComponent />
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
      <CategoryCardComponent />
      {/* Category Section Ends */}
      {/* Brand Section Starts */}
      <BrandCardComponent />
      {/* Brand Section Ends */}
      {/* Product Section Starts */}
      <ProductCardComponent />
      {/* Product Section Ends */}
      {/* <Container>
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
      </Container> */}
    </>
  );
};
export default HomePage;
