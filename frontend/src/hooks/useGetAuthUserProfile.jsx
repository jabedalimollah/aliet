import { setAuthUser, setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAuthUserProfile = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/user/${userId}/profile`,
          {
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          // console.log(res.data);
          dispatch(setAuthUser(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthProfile();
  }, [userId]);
};

export default useGetAuthUserProfile;
