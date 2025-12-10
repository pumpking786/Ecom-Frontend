import { Outlet } from "react-router-dom";
import {
  FooterComponent,
  HeaderComponent,
} from "../../components/home/header.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "../../reducers/user.reducer";
import { initializeCart } from "../../reducers/cart.reducer";

const HomePageLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedInUser({}));
    dispatch(initializeCart());
  }, []);
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};
export default HomePageLayout;
