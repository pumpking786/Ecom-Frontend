import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import cat1 from "../../../assets/image/cat1.jpg";
import SingleGridComponent from "../../common/single-grid-card.component";
import { useCallback, useEffect, useState } from "react";
import { home_svc } from "../../../services/home.service";

const CategoryCardComponent = () => {
  let [category, setCategory] = useState();

  const getActiveCats = useCallback(async () => {
    try {
      let response = await home_svc.listAllcategories();
      if (response) {
        setCategory(response);
      }
    } catch (err) {
      console.error(err);
    }
  });
  useEffect(() => {
    getActiveCats();
  });
  return (
    <>
      {" "}
      <div className="bg-light">
        <Container className="mt-3">
          <Row>
            <Col>
              <h4 className="text-center">Category</h4>
            </Col>
          </Row>
          <Row>
            {category &&
              category.map((item, index) => (
                <Col key={index} sm={6} md={2} className={"my-3"}>
                  {" "}
                  {/* Adjusted to 6 columns with lg=2 */}
                  <SingleGridComponent
                    url={`/category/${item.slug}`}
                    title={item.name}
                    image={
                      process.env.REACT_APP_API_URL + "/assets/" + item.image
                    }
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default CategoryCardComponent;
