"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepProgressBar from "../../components/StepProgressBar";
import { Button } from "../../components/ui/button";

export default function Stage3({ setStudentPath }) {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    const savedPath = sessionStorage.getItem("selectedPath");
    console.log("🚀 Retrieved path from sessionStorage:", savedPath);
    if (savedPath) {
      setSelectedPath(savedPath);
    }
  }, []);
  const handlePathSelection = (path) => {
    setSelectedPath(path);
    setStudentPath(path);
  };

  return (
    <div className="flex flex-col items-center p-6 relative">
      {/* Header Section */}
      <div className="bg-brown w-full p-2 flex justify-between items-center z-20 relative">
        <span className="text-white font-bold">MALAYSIAN LIFE SIMULATOR</span>
        <span className="text-white">
          NAME: <span className="font-bold">HEROKA112</span>
        </span>
      </div>

      {/* Step Progress Bar (Properly Centered + Z-Index Fixed) */}
      <StepProgressBar currentStep={1} totalSteps={5} />

      {/* Study Section */}
      <div className="text-center mt-10 z-0">
        <h2 className="text-[40px] text-lg">DO YOU WANT TO STUDY?</h2>
        <img src="/book.png" alt="Book Icon" className="mx-auto w-70 h-70" />
        <h3 className="text-[40px]">CHOOSE YOUR PATH</h3>

        <div className="text-base md:text-[40px] flex flex-col md:flex-row gap-4 mt-4 justify-center">
          <Button
            variant={"choice"}
            className={`px-4 py-2 rounded-lg shadow md:border-4 border-2 w-full md:w-[410px] h-[64px] md:h-[84px] text-3xl md:text-[40px] ${
              selectedPath === "bad" ? "bg-gray-400" : "border-black"
            }`}
            onClick={() => handlePathSelection("bad")}
          >
            A. BAD STUDENT
          </Button>
          <Button
            variant={"choice"}
            className={`px-4 py-2 rounded-lg shadow md:border-4 border-2 w-full md:w-[410px] h-[64px] md:h-[84px] text-3xl md:text-[40px] ${
              selectedPath === "good" ? "bg-gray-400" : "border-black"
            }`}
            onClick={() => handlePathSelection("good")}
          >
            B. GOOD STUDENT
          </Button>
        </div>
      </div>
    </div>
  );
}
