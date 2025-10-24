import { Outlet } from "react-router-dom";
import {
  FooterComponent,
  HeaderComponent,
} from "../../components/home/header.component";

const HomePageLayout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};
export default HomePageLayout;
