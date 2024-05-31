import { SignIn } from "@clerk/nextjs";

export default function Page() {
    const backgroundImageURL = "https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png";
  
    return (
        <div className="min-h-screen flex items-center justify-center"
            style={{ backgroundImage: `url("${backgroundImageURL}")`, backgroundSize: 'cover', }}
        >
          <SignIn />
        </div>
    );
}