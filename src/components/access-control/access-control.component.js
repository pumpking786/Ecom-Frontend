import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth_svc } from "../../services/auth.service";

export const AdminAccessControl = ({ Component, accessTo }) => {
  let token = localStorage.getItem("mern_token");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const getUserDetail = useCallback(async () => {
    try {
      let response = await auth_svc.getLoggedInUser();

      if (response.result.role === accessTo) {
        setLoading(false);
      } else {
        toast.warning(`You donot have access to ${accessTo} panel!`);
        navigate("/" + response.result.role);
      }
    } catch (error) {
      //
      console.error(error);
    }
  }, [accessTo, navigate]);
  useEffect(() => {
    getUserDetail();
    if (!token) {
      navigate("/login");
    } else {
      //API INTEGRATION FOR TOKEN VERIFICATION

      setLoading(false);
    }
  }, [getUserDetail]);
  return loading ? <>Loading</> : Component;
};
