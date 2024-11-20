import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "axios";
const ChangePassword = ({ open, setOpen }) => {
  const [data, setData] = useState({
    password: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCloseDialogBtn = () => {
    setOpen(false);
    setData({
      password: "",
      newPassword: "",
    });
  };

  const handleInputChange = (e) => {
    // console.log([e.target.name]);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = async () => {
    if (data.newPassword.length < 3 || data.newPassword.trim() === "") {
      toast.error("New Password at least 3 characters", {
        position: "top-center",
      });
    } else {
      try {
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_APP_API_KEY}/user/changepassword`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        if (res.data.statusInfo == "success") {
          toast.success(res.data.message, {
            position: "top-center",
          });
          setOpen(false);
        }
      } catch (error) {
        //   console.log(error);
        toast.error(error.response.data.message, {
          position: "top-center",
        });
      } finally {
        setData({ password: "", newPassword: "" });
        setLoading(false);
      }
    }
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="w-[96%] md:w-[80%] lg:w-[40%]"
      >
        <div className="w-full flex justify-end">
          <Button
            variant={"outline"}
            onClick={handleCloseDialogBtn}
            className={"rounded-full p-3"}
          >
            <IoMdClose />
          </Button>
        </div>
        {/* <DialogContent className="sm:max-w-[425px]"> */}
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>

          <DialogDescription>
            Make changes to your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 justify-items-start items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              // defaultValue="Pedro Duarte"
              className="col-span-3"
              placeholder="Password"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 justify-items-start items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleInputChange}
              // defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 animate-spin" /> Saving
            </Button>
          ) : (
            <Button type="button" onClick={handlePasswordChange}>
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
