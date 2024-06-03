"use client";

import { SignUp } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { Input, Button, Alert, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

export default function Page() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

  
    const backgroundImageURL = "https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png";
    return (
        <div className="p-12 bg-purple-600 min-h-screen"
            style={{ backgroundImage: `url("${backgroundImageURL}")`, backgroundSize: 'cover', }}
        >
            <div className="welcomeText max-w-lg mx-auto p-8 text-center mt-[120px]">
                <div className="font-bold text-4xl text-white" style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}>
                    Create Your Account
                </div>
            </div>
            <div className="signInBox max-w-lg mx-auto bg-white border-[2px] border-black p-8 rounded-md">
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <FormControl className="flex flex-col gap-2">
                    <FormLabel>Username:</FormLabel>
                    <Input type="text" value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                    <FormLabel>Email:</FormLabel>
                    <Input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <FormLabel>Password:</FormLabel>
                    <Input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <FormLabel>Confirm Password:</FormLabel>
                    <Input type="password" value={passwordConfirmation} onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                    }} />
                </FormControl>
                <Button className="w-full min-w-10">
                    Sign Up
                </Button>
                <div className="text-md px-12 text-center mt-4 font-medium">
                  Create Mini Courses, Bridges Pages & much more.&nbsp;
                  <Link href="/sign-in" className="font-bold text-indigo-500 hover:underline">Already a member? Login here.</Link>
                </div>
              </div>
            </div>
            <div className="max-w-lg mx-auto p-8 mt-2 text-center"><div className="font-bold text-sm text-white" style={{textShadow: "rgba(0, 0, 0, 0.1) 3px 3px 0px"}}>© 2024 ContentBlocks. All rights reserved.</div></div>
        </div>
    );
}