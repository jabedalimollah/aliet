import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
const token = localStorage.getItem("aliet");
const CreatePost = ({ open, setOpen }) => {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const fileChangeHandler = async (e) => {
    const file = e.target?.files[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };
  const handeCancelBtn = () => {
    setOpen(false);
    setFile("");
    setCaption("");
    setImagePreview("");
    setLoading(false);
  };
  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) {
      formData.append("image", file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/post/addpost`,
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.statusInfo == "success") {
        dispatch(setPosts([...posts, res.data.data]));
        toast.success(res.data.message, {
          position: "top-center",
        });
        setOpen(false);
        setFile("");
        setCaption("");
        setImagePreview("");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          {/* <DialogContent onInteractOutside={handeClickDialogBox}> */}
          <DialogTitle className="hidden" />
          <DialogDescription className={"hidden"}></DialogDescription>
          {/* <div className="w-full flex justify-end">
            <Button
              onClick={() => setOpen(false)}
              className="bg-slate-200 hover:bg-red-600 text-black hover:text-white rounded-full py-2 px-3"
            >
              <IoMdClose />
            </Button>
          </div> */}
          <DialogHeader
            className={
              "w-full flex flex-row items-center justify-between text-centers font-semibold"
            }
          >
            <span>Create New Post</span>{" "}
            <Button
              onClick={() => setOpen(false)}
              className="bg-slate-200 hover:bg-red-600 text-black hover:text-white rounded-full py-2 px-3"
            >
              <IoMdClose />
            </Button>
          </DialogHeader>
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="image" />
              <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-xs">{user?.username}</h1>
              <span className="text-gray-600 text-xs">{user?.name}</span>
            </div>
          </div>
          <Textarea
            className="focus-visible:ring-transparent border-none"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          {imagePreview && (
            <div className="w-full h-64 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="preview_image"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={fileChangeHandler}
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="w-fit mx-auto bg-purple-500 hover:bg-purple-700"
          >
            Select Image
            {/* from computer */}
          </Button>
          <div className="w-full flex justify-between">
            {imagePreview && <Button onClick={handeCancelBtn}>Cancel</Button>}{" "}
            {imagePreview &&
              (loading ? (
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={createPostHandler}
                  className="bg-blue-500"
                >
                  Post
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePost;
