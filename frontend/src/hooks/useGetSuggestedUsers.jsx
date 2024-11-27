import { setSuggestedUsers } from "@/redux/authSlice";
import { setSuggestedUsersLoading } from "@/redux/loadingSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const token = localStorage.getItem("aliet");
const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      dispatch(setSuggestedUsersLoading(true));
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/user/suggested`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          //   console.log(res.data);
          dispatch(setSuggestedUsers(res.data.data));
          dispatch(setSuggestedUsersLoading(false));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSuggestedUsersLoading(false));
      }
    };
    fetchSuggestedUsers();
  }, []);
};

export default useGetSuggestedUsers;
