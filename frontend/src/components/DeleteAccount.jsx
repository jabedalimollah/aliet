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
const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseDialogBtn = () => {
    setOpen(false);
    setPassword("");
  };

  const handleInputChange = (e) => {
    // console.log([e.target.name]);
    setPassword(e.target.value);
  };
  const handleDeleteBtn = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API_KEY}/user/deleteprofile`,
        {
          data: {
            password: password,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
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
      setPassword("");
      setLoading(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white hover:text-white"
        >
          Delete Account
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
          <DialogTitle>Delete Your Account</DialogTitle>

          <DialogDescription>
            Deleting your account will permanently remove your profile and all
            associated data.
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
              value={password}
              onChange={handleInputChange}
              // defaultValue="Pedro Duarte"
              className="col-span-3"
              placeholder="Password"
            />
          </div>
        </div>
        <DialogFooter>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 animate-spin" /> Deleting
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleDeleteBtn}
              className={"bg-red-700"}
            >
              Delete Account
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
