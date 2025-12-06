import { useState } from "react";
import SliderComponent from "../slider.component";
import { useEffect } from "react";
import { home_svc } from "../../../services/home.service";

const HomeBannerComponent = () => {
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
      <SliderComponent data={banner} settings={settings} loading={false} />
    </>
  );
};
export default HomeBannerComponent;
