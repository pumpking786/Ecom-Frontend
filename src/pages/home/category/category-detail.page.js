import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { home_svc } from "../../../services/home.service";
import { Col, Container, Row } from "react-bootstrap";
import ProductCardComponent from "../../../components/home/product/product-card.component";
const CategoryDetail = () => {
  let params = useParams();
  let [category, setCategory] = useState();
  let [productList, setProductList] = useState();
  const getProductByCatSlug = useCallback(async () => {
    try {
      let res = await home_svc.productByCatSlug(params.slug);

      if (res.status) {
        setCategory(res.result.category);
        setProductList(res.result.products);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    getProductByCatSlug();
  }, [getProductByCatSlug]);
  return (
    <>
      <Container className="bg-light my-3 py-3">
        {category ? (
          <>
            <Row>
              <Col>
                <h4>
                  Category Detail of <em>"{category.name}"</em>
                </h4>
              </Col>
            </Row>
            <ProductCardComponent allProduct={productList} />
          </>
        ) : (
          <>....</>
        )}
      </Container>
    </>
  );
};
export default CategoryDetail;
