"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, Alert, FormControl, FormLabel, FormErrorMessage, Text, InputRightElement, InputGroup } from "@chakra-ui/react";

export default function Page() {
    // nextjs router
    const router = useRouter();

    // form state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    // clerk sign up hook
    const { isLoaded, signUp, setActive } = useSignUp();

    // email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // verify email format
    const isEmailValid = email.length === 0 || emailRegex.test(email);
  
    const backgroundImageURL = "https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png";

    // API call to handle signup using email, password, and username
    // If a user with matching email or username is found, an error is displayed
    const handleSignUp = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!isLoaded) {
            return;
        }

        if (!isEmailValid) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!isPasswordValid(password)) {
            setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        try {
            const signUpAttempt = await signUp.create({
                emailAddress: email,
                password: password,
                username: username,
            });
      
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.push('/');
            } else {
                console.log(signUpAttempt);
            }
          } catch (err: any) {
            // Display error if sign up fails
            console.error(JSON.stringify(err, null, 2));
            if (err.errors && err.errors[0].message) {
                setError(err.errors[0].message);
            } else {
                setError("An error occurred. Please try again.");
            }
          }
    }

    // Verify that the password and password confirmation match
    const passwordMatch = password === passwordConfirmation;

    // Password requirements
    const passwordRequirements = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

    // Verify that the password meets the following requirements:
    const isPasswordValid = (password: string) => {
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
    }

    // Verify that the form is valid and can be submitted (disable the submit button if the form is invalid)
    const formValid = isEmailValid && isPasswordValid(password) && passwordMatch;

    // Render the sign up form
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
                <FormControl className="flex flex-col gap-2" isRequired>
                    <FormLabel>Username:</FormLabel>
                    <Input type="text" value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />

                    <FormLabel>Email:</FormLabel>
                    <Input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} isInvalid={!isEmailValid}/>
                    {
                        isEmailValid ? null : <Text className="mt-2 text-red-600">Invalid email format</Text>
                    }

                    <FormLabel>Password:</FormLabel>
                    <InputGroup>
                        <Input type={show ? 'text' : 'password'} value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                            isInvalid={!isPasswordValid(password) && password.length > 0}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>            
                    {
                        isPasswordValid(password) ? null : <Text className="text-sm text-gray-500">{passwordRequirements}</Text>
                    }
                    <FormLabel>Confirm Password:</FormLabel>
                    <InputGroup>
                        <Input type={show ? 'text' : 'password'}
                            value={passwordConfirmation} onChange={(e) => {
                            setPasswordConfirmation(e.target.value);
                        }} isInvalid={!passwordMatch}/>
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {
                        passwordMatch ? null : <Text className="mt-2 text-red-600">Passwords do not match</Text>
                    }
                </FormControl>
                <Button colorScheme="brand" className="w-full min-w-10" onClick={handleSignUp} isDisabled={!formValid}>
                    Sign Up
                </Button>
                {
                    error !== "" ? <Alert className="mt-4" status="error">{error}</Alert> : null
                }
                <div className="text-md px-12 text-center mt-4 font-medium">
                  Create Mini Courses, Bridges Pages & much more.&nbsp;
                  <Link href="/sign-in" className="font-bold text-purple-600 hover:underline">Already a member? Login here.</Link>
                </div>
              </div>
                {/* <SignUp /> */}
            </div>
            <div className="max-w-lg mx-auto p-8 mt-2 text-center"><div className="font-bold text-sm text-white" style={{textShadow: "rgba(0, 0, 0, 0.1) 3px 3px 0px"}}>© 2024 ContentBlocks. All rights reserved.</div></div>
        </div>
    );
}