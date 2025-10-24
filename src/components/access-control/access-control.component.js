import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminAccessControl = ({ Component }) => {
  let token = localStorage.getItem("_mern15_token");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      //API INTEGRATION FOR TOKEN VERIFICATION
      let user_detail = {
        result: {
          _id: 1,
          name: "Pramit Amatya",
          email: "pramit@gmail.com",
          role: "admin",
        },
      };
      if (user_detail.result.role !== "admin") {
        toast.warning("You donot have priviledge");
      }
      setLoading(false);
    }
  }, []);
  return loading ? <>Loading</> : Component;
};
