import { Col, Container, Row, Card } from "react-bootstrap";
import SingleProductGrid from "../../common/single-product-grid.component";
import { useCallback, useEffect, useState } from "react";
import { home_svc } from "../../../services/home.service";
const ProductCardComponent = () => {
  let [product, setProduct] = useState();
  const getActiveProducts = useCallback(async () => {
    try {
      let response = await home_svc.listAllProducts();
      if (response) {
        setProduct(response);
      }
    } catch (err) {
      console.error(err);
    }
  });
  useEffect(() => {
    getActiveProducts();
  });
  return (
    <>
      <div>
        <Container className="bg-light">
          <Col className="px-3">
            <Row className="my-3 py-3">
              <Col>
                <h4 className="text-center">Products</h4>
              </Col>
            </Row>
            <hr />
            <Row xs={1} md={4} className="g-4">
              {product &&
                product.map((item, index) => (
                  <Col key={index}>
                    <SingleProductGrid product={item} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
};
export default ProductCardComponent;
