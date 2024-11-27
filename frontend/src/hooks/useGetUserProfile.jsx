import { setUserProfile } from "@/redux/authSlice";
import { setProfileLoading } from "@/redux/loadingSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const token = localStorage.getItem("aliet");
const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserProfile = async () => {
      dispatch(setProfileLoading(true));
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/user/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          // console.log(res.data);
          dispatch(setUserProfile(res.data.data));
          dispatch(setProfileLoading(false));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setProfileLoading(false));
      }
    };
    fetchUserProfile();
  }, [userId]);
};

export default useGetUserProfile;
