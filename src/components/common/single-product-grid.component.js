import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dummyimage from "../../assets/image/imgnotfound.jpg";

const SingleProductGrid = ({ product }) => {
  let navigate = useNavigate();

  const goToProduct = (e) => {
    navigate("/product-detail/" + product.slug);
  };
  const handleErr = (e) => {
    e.target.src = dummyimage;
  };
  return (
    <>
      <Card onClick={goToProduct} style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={process.env.REACT_APP_API_URL + "/assets/" + product.images[0]}
          onError={handleErr}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text as="div">
            <p className="text-success">Npr. {product.actual_price}</p>
            {product.discount ? (
              <>
                <del className="text-danger">Npr. {product.price}</del> &nbsp; -
                {product.discount}%
              </>
            ) : (
              <></>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default SingleProductGrid;
