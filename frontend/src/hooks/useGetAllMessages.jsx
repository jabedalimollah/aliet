import { setMessages } from "@/redux/chatSlice";
import { setMessageLoading } from "@/redux/loadingSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const token = localStorage.getItem("aliet");
const useGetAllMessages = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllMessages = async () => {
      dispatch(setMessageLoading(true));
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/message/all/${
            selectedUser?._id
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          // console.log(res.data);
          dispatch(setMessages(res.data.data));
          dispatch(setMessageLoading(false));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setMessageLoading(false));
      }
    };
    fetchAllMessages();
  }, [selectedUser]);
};

export default useGetAllMessages;
