"use client";
import { useState } from "react";
import { characterData } from "../../../../data/characterData";
import Image from "next/image";

export default function End() {
  const [resultsView, setResultsView] = useState(false);
  const [characterType, setCharacterType] = useState("");
  const [characterImage, setCharacterImage] = useState("");
  const handleViewResult = () => {
    window.history.pushState({ section: "viewResult" }, "", "");
    setResultsView(true);
    //replace with api route
    setCharacterType("THE HEARTBROKEN");
    const character = characterData.find(
      (character) => character.characterName === "THE HEARTBROKEN"
    );
    setCharacterImage(character.characterImage);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 text-center">
      <div className={`${resultsView ? "hidden" : ""}`}>
        <h1 className="text-6xl md:text-8xl font-bold">THE END</h1>
        <button
          type="button"
          className="text-2xl md:text-[40px] hover:underline cursor-pointer bg-transparent border-none"
          onClick={handleViewResult}
        >
          VIEW RESULT
        </button>
      </div>

      {/* Hidden section for "VIEW RESULT" */}
      <div
        className={` p-6 w-4/5 md:w-3/5 flex flex-col text-center items-center justify-center gap-y-16 ${
          resultsView ? "" : "hidden"
        }`}
      >
        <h1 className="text-[40px] font-normal">IN THIS JOURNEY, YOU’RE A</h1>
        <h2 className="text-7xl font-bold">{characterType.toUpperCase()}</h2>
        {characterImage && (
          <Image
            src={characterImage}
            alt="Character"
            width={400}
            height={400}
          />
        )}
      </div>
    </div>
  );
}
