import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderComponent = ({ settings, data, loading }) => {
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="full-width-slider">
          <Slider {...settings} className="mb-5">
            {data &&
              data.map((item, index) => (
                <div key={index}>
                  {" "}
                  <img
                    src={
                      process.env.REACT_APP_API_URL + "/assets/" + item.image
                    }
                    alt={item.title}
                    className="banner-image"
                  />
                </div>
              ))}
          </Slider>
        </div>
      )}
    </>
  );
};
export default SliderComponent;
