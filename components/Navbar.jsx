"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [username, setUsername] = useState("");

  // Load username from sessionStorage
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Listen for changes (in case username updates dynamically)
    const handleUsernameChange = () => {
      const updatedUsername = sessionStorage.getItem("username");
      setUsername(updatedUsername || "");
    };

    window.addEventListener("usernameChange", handleUsernameChange);

    // Cleanup the listener
    return () => {
      window.removeEventListener("usernameChange", handleUsernameChange);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#D37A3C] text-black shadow-md p-4 flex justify-between items-center border-b-4 border-[#3E3E3E]">
      <Link href="/" className="text-black font-bold text-lg md:text-xl ml-4">
        Malaysian Life Simulator
      </Link>

      <div className="flex items-center gap-2 mr-4">
        <span className="text-black font-medium">NAME:</span>
        <input
          type="text"
          value={username}
          readOnly
          className="bg-transparent border-b-2 border-black outline-none text-black"
        />
      </div>
    </header>
  );
}
