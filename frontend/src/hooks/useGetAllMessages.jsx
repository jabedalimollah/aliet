import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessages = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/message/all/${
            selectedUser?._id
          }`,
          {
            withCredentials: true,
          }
        );
        if (res.data.statusInfo == "success") {
          // console.log(res.data);
          dispatch(setMessages(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessages();
  }, [selectedUser]);
};

export default useGetAllMessages;
