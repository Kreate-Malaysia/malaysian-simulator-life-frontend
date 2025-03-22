"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    signIn("google");
  };

  const handleSignIn = () => {
    setShowModal(true); // Show modal for username entry
  };

  const handleGuestSubmit = () => {
    if (username.trim()) {
      sessionStorage.setItem("username", username); // ✅ Save username to sessionStorage
      window.dispatchEvent(new Event("usernameChange")); // ✅ Trigger custom event for Navbar update
      setShowModal(false); // Close modal
      router.push("/select-ethnicity"); // Navigate to next page
    } else {
      alert("Please enter a valid username.");
    }
  };

  return (
    <>
      <div
        className="flex items-center flex-col text-center justify-center min-h-screen p-10"
        style={{ backgroundColor: "#C9A66B" }}
      >
        <Navbar username={username} />
        <div className="absolute top-0 w-full p-2 text-right" />
        <main className="relative">
          <div className="flex justify-center items-center gap-4">
            <Image src="/2.png" alt="moon and star" width={200} height={200} />
            <h1 className="text-black text-6xl font-black">
              Malaysian Life Simulator
            </h1>
            <Image
              src="/1.png"
              alt="Petronas Towers"
              width={200}
              height={200}
            />
          </div>

          <p className="text-black text-md mt-4">
            Make choices, navigate challenges, and shape your own unique story
            in this immersive life simulation!
            <br />
            Experience the journey of life in Malaysia...
          </p>

          <div className="flex justify-center gap-10 mt-4">
            <Image src="/4.png" alt="Hibiscus" width={200} height={200} />

            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={handleLogin}
                variant="normal"
                className="bg-[#DDF7E3] w-[379px] h-[86px] p-4 font-black text-2xl rounded-lg"
              >
                Login
              </Button>

              <Button
                onClick={handleSignIn}
                variant="normal"
                className="bg-[#A2BAB6] w-[379px] h-[86px] p-4 font-black text-2xl rounded-lg"
              >
                Play As Guest
              </Button>
            </div>

            <Image src="/3.png" alt="Hornbill" width={200} height={200} />
          </div>
        </main>

        {/* Username Entry Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[400px] text-center shadow-lg border-4 border-[#3E3E3E]">
              <h2 className="text-2xl font-bold mb-4">Enter Your Username</h2>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleGuestSubmit}
                  className="bg-[#DDF7E3] w-[150px] h-[50px] font-black rounded-lg"
                >
                  Confirm
                </Button>

                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-[#F2BAC9] w-[150px] h-[50px] font-black rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
