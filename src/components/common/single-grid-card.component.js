import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SingleGridComponent = ({ title, image, url }) => {
  return (
    <>
      <Card>
        <NavLink to={url}>
          <Card.Img
            variant="top"
            src={image}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </NavLink>
        <Card.Body>
          <Card.Title
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <NavLink to={url}>{title} </NavLink>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};
export default SingleGridComponent;
