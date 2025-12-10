import { createSlice } from "@reduxjs/toolkit";

const CartSlicer = createSlice({
  name: "Cart",
  initialState: { cart: null },
  reducers: {
    addToCart: (state, action) => {
      //cart data fetch from localstorage
      let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
      let currentItem = action.payload;

      if (cart.length) {
        //not empty
        let index = null;
        cart.map((item, ind) => {
          if (item.product_id === currentItem.product_id) {
            index = ind;
          }
        });
        if (index === null) {
          cart.push(currentItem);
        } else {
          if (currentItem.qty <= 0) {
            cart.splice(index, 1);
          } else {
            cart[index].qty = currentItem.qty;
          }
        }
      } else {
        cart.push(currentItem);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      state.cart = cart;
    },
    initializeCart: (state, action) => {
      state.cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    },
  },
});
export const { addToCart, initializeCart } = CartSlicer.actions;
export default CartSlicer.reducer;
