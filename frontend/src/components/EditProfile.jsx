import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    // profilePicture: user?.profilePicture,
    // bio: user?.bio,
    // gender: user?.gender,
    name: "",
    profilePicture: "",
    bio: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   console.log(user);
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
    }
  };
  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };
  const editProfileHandler = async () => {
    // console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePicture) {
      formData.append("profilePicture", input.profilePicture);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/user/profile/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.statusInfo == "success") {
        const updatedUserData = {
          ...user,
          name: res.data.data?.name,
          bio: res.data.data?.bio,
          profilePicture: res.data?.data?.profilePicture,
          gender: res.data?.data?.gender,
        };

        dispatch(setAuthUser(updatedUserData));
        toast.success(res.data.message, {
          position: "top-center",
        });
        navigate(`/profile/${user?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  // console.log(user);
  useEffect(() => {
    setInput({
      name: user?.name,
      profilePicture: user?.profilePicture,
      bio: user?.bio,
      gender: user?.gender,
    });
  }, []);
  return (
    <div className="flex max-w-2xl mx-auto md:pl-10s px-10">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback className={"bg-gray-200"}>
                {user?.username[0]}
              </AvatarFallback>
            </Avatar>

            <div className="w-full">
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600 ">{user?.name}</span>
              {/* <span className="text-gray-600 ">{user?.bio}</span> */}
            </div>
          </div>
          <input
            ref={imageRef}
            type="file"
            onChange={fileChangeHandler}
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current.click()}
            className="bg-[#0095F6] hover:bg-[#438dbe]  h-8"
          >
            Change photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Name</h1>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            className="w-full p-2 outline-none border rounded-md"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            name="bio"
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold mb-2">Gender</h1>

          <Select value={input?.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="w-fit bg-[#0095F6] hover:bg-[#438dbe] ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#0095F6] hover:bg-[#438dbe] "
            >
              Submit
            </Button>
          )}
        </div>
        <div>
          <ChangePassword />
        </div>
        <div>
          <DeleteAccount />
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
