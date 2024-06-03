"use client"

import { useState, useEffect } from "react";
import { Input, Button, Alert, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

import "./signin.scss";

export default function Page({ params }: { params: any }) {
    const backgroundImageURL = "https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png";

    const router = useRouter();

    // Retrieve the slug from the URL (optional slug parameter)
    const slug = params.slug || [];
    // Initialize the stage state with the first stage
    const [stage, setStage] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        // setStage based on slug
        if (slug[0] === "factor-one") {
            setStage(2);
        } else {
            setStage(1);
        }
    }, [slug]);

    const handleEmailSubmit = (e: any) => {
        e.preventDefault();

        router.push("/sign-in/factor-one");
    }

    const handleSignin = (e: any) => {
        e.preventDefault();
        router.push("/dashboard");
    }

    const emailStage = (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <FormControl isRequired>
                <FormLabel>Email address:</FormLabel>
                <Input type="email" placeholder="Email..." value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </FormControl>
            <Button className="w-full min-w-10" onClick={handleEmailSubmit}>
                Continue
            </Button>
            <div className="w-full flex items-center justify-center border-t-2 border-gray-500 mt-12"
                style={{ borderColor: "rgb(222, 231, 237)" }}
            >
                <h2 className="bg-white py-3 px-6 -mt-6 font-bold text-gray-400">
                    OR
                </h2>
            </div>
            <div className="mt-4 w-full">
                <div className="text-xl text-center font-bold mb-4">
                    Get Started with ContentBlocks
                </div>
                <Button className="w-full min-w-10" onClick={(e) => {
                    e.preventDefault();
                    router.push("/sign-up");
                }}>
                    Create Your Account
                </Button>
                <div className="text-md text-center mt-4 text-gray-600">Your first workspace is free!</div>
            </div>
        </div>
    );

    const passwordStage = (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </FormControl>
            <Button className="w-full min-w-10" onClick={handleSignin}>
                Sign In
            </Button>
        </div>
    );

    return (
        <div className="p-12 bg-purple-600 min-h-screen"
            style={{ backgroundImage: `url("${backgroundImageURL}")`, backgroundSize: 'cover', }}
        >
            <div className="welcomeText max-w-lg mx-auto p-8 text-center mt-[120px]">
                <div className="font-bold text-4xl text-white" style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}>
                    Welcome Back!
                </div>
            </div>
            <div className="signInBox max-w-lg mx-auto bg-white border-[2px] border-black p-8 rounded-md">
                {
                    stage === 1 && emailStage
                }
                {
                    stage === 2 && passwordStage
                }
                {/* <SignIn /> */}
            </div>
            <div className="max-w-lg mx-auto p-8 mt-2 text-center"><div className="font-bold text-sm text-white" style={{textShadow: "rgba(0, 0, 0, 0.1) 3px 3px 0px"}}>© 2024 ContentBlocks. All rights reserved.</div></div>
        </div>
    );
}