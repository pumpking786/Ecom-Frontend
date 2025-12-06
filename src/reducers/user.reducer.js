import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_svc } from "../services/auth.service";
export const getLoggedInUser = createAsyncThunk(
  "User/getLoggedInUser",
  async (data = {}, thunkAPI) => {
    //API TRIGGER
    let token = localStorage.getItem("mern_token") ?? null;
    if (token) {
      let auth_user = await auth_svc.getLoggedInUser();
      if (auth_user) {
        return auth_user.result;
      } else {
        throw null;
      }
      // console.log(auth_user);
    } else {
      throw null;
    }
    // return {};
  }
);
const UserSlicer = createSlice({
  name: "User",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      // console.log("Action: ", action);

      state.loggedInUser = action.payload;
      // console.log("UserReducer", action);
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("mern_token");
      state.loggedInUser = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
    builders.addCase(getLoggedInUser.rejected, (state, action) => {
      state.loggedInUser = null;
      // window.location.href = "/login";
    });
  },
});
export const { setLoggedInUser, logoutUser } = UserSlicer.actions;
export default UserSlicer.reducer;
