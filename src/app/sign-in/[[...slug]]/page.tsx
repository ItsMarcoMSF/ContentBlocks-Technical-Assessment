"use client"
import { useState } from "react";
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { signin } from "../../../lib/utils";

import "./signin.scss";

export default function Page({ params }: { params: any }) {
    const backgroundImageURL = "https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png";

    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();
    // Initialize the stage state with the first stage
    // Stage 1: Email
    // Stage 2: Password
    // Stage 3 (optional): Login Link Sent
    const [stage, setStage] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // API call to handle signin using email
    // If a user with matching email is found, the user goes to the next stage
    // If no user is found, an error message is displayed
    const handleEmailSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // verify email format
        if (!email || email.length === 0 || !emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!isLoaded) {
            return;
        }
        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
              identifier: email,
            });
        
            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'needs_first_factor') {
              setStage(2);
            } else {
              console.log(signInAttempt);
            }
          } catch (err: any) {

            // Set error message is login attempt was unsuccessful
            console.error(JSON.stringify(err, null, 2));
            if (err.errors && err.errors[0].message) {
                setError(err.errors[0].message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    // API call to handle signin using password (after email is submitted)
    // If the password is correct, the user is signed in
    const handleSignin = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!isLoaded) {
            return;
        }
        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
              identifier: email,
              password: password,
            });
        
            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
              await setActive({ session: signInAttempt.createdSessionId });
              router.push('/');
            } else {
              console.log(signInAttempt);
            }
          } catch (err: any) {

            // Set error message is login attempt was unsuccessful
            console.error(JSON.stringify(err, null, 2));
            if (err.errors && err.errors[0].message) {
                setError(err.errors[0].message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }

    };

    const handleSendLink = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!isLoaded) {
            return;
        }
        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
              identifier: email,
              strategy: 'email_link',
              redirectUrl: 'http://localhost:3000/',
            });
        
            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'needs_first_factor') {
              setStage(3);
            } else {
              console.log(signInAttempt);
            }
          } catch (err: any) {

            // Set error message is login attempt was unsuccessful
            console.error(JSON.stringify(err, null, 2));
            if (err.errors && err.errors[0].message) {
                setError(err.errors[0].message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    const emailStage = (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <FormControl isRequired isInvalid={error !== ""}>
                <FormLabel>Email address:</FormLabel>
                <Input type="email" placeholder="Email..." value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                {
                    error !== "" ? <FormErrorMessage className="mt-2">{error}</FormErrorMessage> : null
                }
            </FormControl>
            <Button className="w-full min-w-10" onClick={handleEmailSubmit}
                isDisabled={email === ""}
            >
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
            <FormControl isRequired isInvalid={error !== ""}>
                <FormLabel>Password:</FormLabel>
                <Input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                {
                    error !== "" ? <FormErrorMessage className="mt-2">{error}</FormErrorMessage> : null
                }
            </FormControl>
            <Button className="w-full min-w-10" onClick={handleSignin}>
                Sign In
            </Button>
            <div className="w-full flex items-center justify-center border-t-2 border-gray-500 mt-12"
                style={{ borderColor: "rgb(222, 231, 237)" }}
            >
                <h2 className="bg-white py-3 px-6 -mt-6 font-bold text-gray-400">
                    FORGOT YOUR PASSWORD?
                </h2>
            </div>
            <div className="w-full">
                <div className="text-md px-12 text-center mt-4 font-medium">
                    Get a onetime login link sent to your email&nbsp;
                    <Button className="font-bold hover:underline"
                        colorScheme="purple"
                        variant="link"
                        onClick={handleSendLink}
                    >
                        here.
                    </Button>
                </div>
            </div>

        </div>
    );

    const linkSentStage = (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="font-bold text-2xl">Login Link Sent to your email</div>
            <div className="text-lg font-medium">Go Check Email for Login Link.</div>
            <div className="text-lg font-medium mt-3 pt-3 border-t-2 border-gray-200">
                If you can't find it ... check the spam! Email will be from notifications@contentblocks.com
            </div>
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
                {
                    stage === 3 && linkSentStage
                }
                {/* <SignIn /> */}
            </div>
            <div className="max-w-lg mx-auto p-8 mt-2 text-center"><div className="font-bold text-sm text-white" style={{textShadow: "rgba(0, 0, 0, 0.1) 3px 3px 0px"}}>© 2024 ContentBlocks. All rights reserved.</div></div>
        </div>
    );
}