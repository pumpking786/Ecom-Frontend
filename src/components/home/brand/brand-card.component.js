import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import cat1 from "../../../assets/image/cat1.jpg";
import SingleGridComponent from "../../common/single-grid-card.component";
import { useCallback, useEffect, useState } from "react";
import { home_svc } from "../../../services/home.service";

const BrandCardComponent = () => {
  let [brand, setBrand] = useState();

  const getActiveBrands = useCallback(async () => {
    try {
      let response = await home_svc.listAllBrands();
      if (response) {
        setBrand(response);
      }
    } catch (err) {
      console.error(err);
    }
  });
  useEffect(() => {
    getActiveBrands();
  });
  return (
    <>
      {" "}
      <div>
        <Container className="bg-light mt-3">
          <Col className="px-3">
            <Row className="my-3 py-3">
              <Col>
                <h4 className="text-center">Brand</h4>
              </Col>
            </Row>
            <hr />
            <Row>
              {brand &&
                brand.map((item, index) => (
                  <Col key={index} sm={6} md={2}>
                    {" "}
                    {/* Adjusted to 6 columns with lg=2 */}
                    <SingleGridComponent
                      url={`/brand/${item.slug}`}
                      title={item.title}
                      image={
                        process.env.REACT_APP_API_URL + "/assets/" + item.image
                      }
                    />
                  </Col>
                ))}
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
};
export default BrandCardComponent;
