import { setAllPostLoading } from "@/redux/loadingSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      dispatch(setAllPostLoading(true));
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/post/all`,
          {
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          //   console.log(res.data);
          dispatch(setPosts(res.data.data));
          dispatch(setAllPostLoading(false));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setAllPostLoading(false));
      }
    };
    fetchAllPost();
  }, []);
};

export default useGetAllPost;
