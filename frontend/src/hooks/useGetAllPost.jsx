import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, []);
};

export default useGetAllPost;
