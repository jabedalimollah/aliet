import { setAuthUser, setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const token = localStorage.getItem("aliet");
const useGetAuthUserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/user/getprofile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          // console.log(res.data.data);
          dispatch(setAuthUser(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthProfile();
  }, []);
};

export default useGetAuthUserProfile;
