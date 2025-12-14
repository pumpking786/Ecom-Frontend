import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { home_svc } from "../../../services/home.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initializeCart } from "../../../reducers/cart.reducer";
const Checkout = () => {
  let cart = useSelector((store) => {
    if (store.cart.cart) {
      return store.cart.cart;
    }
  });
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const createOrder = useCallback(async (cartdetail) => {
    try {
      let payload = {
        cart: cartdetail,
        discount: {
          discount_type: "percent",
          amount: 0,
        },
        service_charge: 0,
        delivery_charge: 0,
        is_paid: false,
        transaction_code: null,
      };
      let order_response = await home_svc.createOrder(payload);
      if (order_response) {
        // Trigger payemtn gateway

        toast.success(order_response.msg);
        localStorage.removeItem("cart");
        dispatch(initializeCart());
        navigate("/customer");
      } else {
        toast.error("Sorry! Your order could not be placed");
        navigate("/cart");
      }

      // response=> order Id
      //payment gateway=>Success url
      //from success response receive transaction_code
    } catch (err) {}
  }, []);
  useEffect(() => {
    if (cart && cart.length) {
      createOrder(cart);
    }
  }, [cart]);
  return <></>;
};
export default Checkout;
