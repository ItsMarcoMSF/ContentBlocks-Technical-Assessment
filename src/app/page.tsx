"use client";

import Image from "next/image";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Home() {
  const backgroundImageURL = "https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png";

  return (
    <main className="p-12 bg-purple-600 min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url("${backgroundImageURL}")`, backgroundSize: 'cover', }}
    >
      <SignedOut>
        <div className="flex gap-4">
          User is not signed in
          <SignInButton/>
        </div>
        
      </SignedOut>
      <SignedIn>
        <div className="flex gap-4">
            User is signed in
            <UserButton />
        </div>
      </SignedIn>
    </main>
  );
}
