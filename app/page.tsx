"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
            <Input label="Username"></Input>
            <Input label="Password" type="password"></Input>
            <div className="flex items-center">
              <Checkbox label="Remember me" />
            </div>
            <div>
              <Link href={`${process.env.NEXT_PUBLIC_PATH_MANAGE}`}>
                <Button fullWidth>Login</Button>
              </Link>
            </div>
            {/* <div>
              <Link href={"/register"}>
                <Button color="deep-purple" variant="text" fullWidth>
                  Sign Up
                </Button>
              </Link>
            </div>
            <Typography variant="small">
              If you dont have any account to login you can register and use
              fresh new account
            </Typography> */}
          </div>
        </Card>
      </div>
    </div>
  );
}
