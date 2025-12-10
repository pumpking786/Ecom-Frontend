import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { home_svc } from "../../../services/home.service";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SliderComponent from "../../../components/home/slider.component";
import "./productslider.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../reducers/cart.reducer";
import { toast } from "react-toastify";
const ProductDetail = () => {
  let params = useParams();
  const [detail, setDetail] = useState();
  const [slider, setSlider] = useState();
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  const getProductBySlug = useCallback(async () => {
    try {
      let response = await home_svc.getProductBySlug(params.slug);
      if (response) {
        setDetail(response.result);
        let images = response.result.images.map((item) => {
          return {
            image: item,
          };
        });
        setSlider(images);
      }
    } catch (err) {
      console.err(err);
    }
  }, []);

  useEffect(() => {
    getProductBySlug();
  }, [getProductBySlug]);

  const addToCartAction = (e) => {
    e.preventDefault();
    let currectCartItem = {
      product_id: detail._id,
      qty: qty,
    };
    dispatch(addToCart(currectCartItem));
    toast.success("Your cart has been updated");
  };
  return (
    <>
      <Container className="bg-light py-3 my-3">
        {detail && (
          <>
            <Row>
              <Col sm={12} md={6}>
                <div className="product-image-container">
                  <SliderComponent data={slider} loading={false} />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <h4>{detail.name}</h4>
                <hr />
                <Row>
                  <Col sm={12}>
                    {detail.category_id?.map((item) => item.name).join(", ")}
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>{detail.brand?.title}</Col>
                </Row>
                <Row>
                  <Col sm={12} className="text-danger">
                    Npr.{detail?.actual_price} &nbsp; &nbsp; &nbsp;
                    {detail.discount > 0 ? (
                      <>
                        <del>Npr. {detail.price}</del>(-{detail.discount}%)
                      </>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <Row>
                  <Form.Group className="row my-3">
                    <Col sm={12} md={4}>
                      <Form.Control
                        type="number"
                        name="qty"
                        min={0}
                        defaultValue={qty}
                        onChange={(e) => setQty(e.target.value)}
                        size={"sm"}
                        placeholder="Enter product Qty..."
                      ></Form.Control>
                    </Col>
                    <Col sm={12} md={4}>
                      <Button
                        variant="warning"
                        size="sm"
                        type="button"
                        onClick={addToCartAction}
                      >
                        Add to cart
                      </Button>
                    </Col>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
            <Row className="my-3">
              <Col sm="12">
                <h4> Description</h4>
              </Col>
              <Col
                sm="12"
                dangerouslySetInnerHTML={{ __html: detail.description }} //content editer ko lagi yesto garne
              ></Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
export default ProductDetail;
