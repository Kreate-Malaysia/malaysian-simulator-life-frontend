"use client";

import { useEffect, useState } from "react";
import Slot from "../../components/Slot";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function SelectEthnicityPage() {
  const router = useRouter();
  const [genderIndex, setGenderIndex] = useState(0);
  const [raceIndex, setRaceIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const genders = ["Male", "Female"];
  const races = ["Chinese", "Malay", "Indian"];

  useEffect(() => {
    // Randomize the final result for both slots
    const finalGenderIndex = Math.floor(Math.random() * genders.length);
    const finalRaceIndex = Math.floor(Math.random() * races.length);

    setTimeout(() => {
      setGenderIndex(finalGenderIndex); // Show gender result
    }, 2000); // Gender stops after 2 seconds

    setTimeout(() => {
      setRaceIndex(finalRaceIndex); // Show race result
      setShowContinue(true); // Show Continue button after race stops
    }, 4000); // Race stops after 4 seconds

    sessionStorage.setItem("gender", genders[finalGenderIndex]);
    sessionStorage.setItem("race", races[finalRaceIndex]);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-24 "
      style={{ backgroundImage: "url('/background.png')" }} // ✅ Add background here
    >
      <div className="w-full">
        <h2 className="text-xl text-[40px] flex justify-center items-center font-bold mb-4">
          You Born as a{" "}
        </h2>

        {/* SLOT MACHINE ANIMATION */}
        <div className="flex justify-center items-center gap-6 text-4xl font-bold my-8">
          <Slot items={genders} duration={2000} targetIndex={genderIndex} />
          <Slot items={races} duration={4000} targetIndex={raceIndex} />
        </div>
      </div>
      {/* CONTINUE BUTTON (BOTTOM RIGHT) */}
      {showContinue && (
        <Button
          variant="continue"
          className="lg:self-end self-center"
          onClick={() => router.push("/start-game")}
        >
          Continue...
        </Button>
      )}
    </div>
  );
}
