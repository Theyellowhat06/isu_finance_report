"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as Icon from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../myToast";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const router = useRouter();

  const login = () => {
    setLoading(true);
    const t = toast.loading("Нэвтэрч байна...");
    axios
      .post(`${process.env.NEXT_PUBLIC_PATH_API}/user/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          const decoded = jwt.decode(response.data.token || "");
          if (typeof decoded !== "string") {
            localStorage.setItem("userId", `${decoded?.id}`);
            localStorage.setItem("exp", `${decoded?.exp}`);
            localStorage.setItem("token", `${response.data.token}`);
            toastSuccess(t, "Нэвтрэлт амжилттай");
            router.push(`${process.env.NEXT_PUBLIC_PATH_MANAGE}`);
          } else {
            toastError(t, "Token decode failed");
          }
        } else {
          toastError(t, response.data.msg || "Failed");
        }
        setLoading(false);
      })
      .catch((error) => {
        toastError(t, error.message || "Connection failed");
        setLoading(false);
      });
  };

  return (
    <div className="w-screen h-screen flex bg-blue-300">
      <div className="w-[calc(100%-600px)] bg-blue-300"></div>
      <div className="absolute">
        <img className="h-screen" src="/11.png"></img>
      </div>
      <div className="w-[600px] p-4 md:p-0">
        <Card className="h-full bg-white flex flex-col justify-center md:frounded-r-none">
          <div className="md:px-24 px-10 space-y-4">
            <Typography variant="h4" color="blue">
              Login
            </Typography>
            <Typography>You can sign in using registered account</Typography>
            <Input
              label="Username"
              onChange={(e: any) => setUsername(e.target.value)}
            ></Input>
            <Input
              label="Password"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            ></Input>
            <div className="flex items-center">
              <Checkbox label="Remember me" />
            </div>
            <div>
              <Button fullWidth onClick={login}>
                <div className="flex justify-center">
                  {loading && (
                    <Icon.ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Login
                </div>
              </Button>
            </div>
            <div className="text-red-500 flex justify-center">{errorMsg}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
