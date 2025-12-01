import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth_svc } from "../../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getLoggedInUser, setLoggedInUser } from "../../reducers/user.reducer";
export const AdminAccessControl = ({ Component, accessTo }) => {
  // let token = localStorage.getItem("mern_token");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const loggedInUser = useSelector((store) => {
    if (store.user.loggedInUser) {
      return store.user.loggedInUser;
    }
  });
  // const getUserDetail = useCallback(async () => {
  //   try {
  //     let response = await auth_svc.getLoggedInUser();
  //     //redux
  //     dispatch(
  //       setLoggedInUser({
  //         name: response.result.name,
  //         email: response.result.email,
  //         role: response.result.role,
  //         user_id: response.result.id,
  //       })
  //     );
  //     if (response.result.role === accessTo) {
  //       setLoading(false);
  //     } else {
  //       toast.warning(`You donot have access to ${accessTo} panel!`);
  //       navigate("/" + response.result.role);
  //     }
  //   } catch (error) {
  //     //
  //     console.error(error);
  //   }
  // }, [accessTo, navigate]);
  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.role === accessTo) {
        setLoading(false);
      } else {
        toast.warning(`You donot have access to ${accessTo} panel!`);
        navigate("/" + loggedInUser.role);
      }
    } else {
      navigate("/login");
    }
  }, [loggedInUser]);

  useEffect(() => {
    // setTimeout(() => {
    dispatch(getLoggedInUser());
    // getUserDetail();
    // }, 3000);
    // if (!token) {
    //   navigate("/login");
    // } else {
    //   //API INTEGRATION FOR TOKEN VERIFICATION

    //   setLoading(false);
    // }
  }, []);
  return loading ? (
    <>
      {" "}
      <ClipLoader
        color={"red"}
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "red",
        }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  ) : (
    Component
  );
};
