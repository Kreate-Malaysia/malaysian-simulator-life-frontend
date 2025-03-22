"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import Stage1 from "../../components/stages/Stage1";
import Stage2 from "../../components/stages/Stage2";
import Stage3 from "../../components/stages/Stage3";

export default function Scenario() {
  const router = useRouter();
  const [stage, setStage] = useState(1);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [school, setSchool] = useState(""); // Added school for validation
  const [isInitialized, setIsInitialized] = useState(false);
  const [studentPath, setStudentPath] = useState("");

  useEffect(() => {
    // Only run this initialization once
    if (!isInitialized) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlStage = Number.parseInt(urlParams.get("stage") || "1");

      setStage(urlStage);

      setIsInitialized(true);
    }

    const handlePopState = (event) => {
      if (event.state && typeof event.state.stage === "number") {
        setStage(event.state.stage);
      } else {
        setStage(1);
      }
    };

    // ✅ Retrieve data from session storage for validation
    setGender(sessionStorage.getItem("gender"));
    setRace(sessionStorage.getItem("race"));

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isInitialized]);

  // Validation logic for Continue button
  const isContinueAllowed = () => {
    if (stage === 1) return !!gender && !!race; // Stage 1: Gender & Race must exist
    if (stage === 2) return !!school; // Stage 2: School must be selected
    return true; // Stage 3 has no additional validation
  };

  const goToStage = (nextStage) => {
    if (stage === 3) {
      sessionStorage.setItem("studentPath", studentPath); // ✅ Save student path to sessionStorage
      router.push("/start-game/scenario"); // Navigate to next page
      return;
    }
    if (isContinueAllowed()) {
      setStage(nextStage);
      window.history.pushState({ stage: nextStage }, "");
    } else {
      alert("Please complete the required steps before continuing.");
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <Stage1
            username={username}
            setUsername={setUsername}
            gender={gender}
            race={race}
          />
        );
      case 2:
        return <Stage2 setSchool={setSchool}/>;
      case 3:
        return <Stage3 setStudentPath={setStudentPath} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-2 pt-60 md:pt-52 flex flex-col gap-y-6">
      {renderStage()}
      <div className={"ml-auto"}>
        <Button
          variant={"continue"}
          className={`self-end ${
            !isContinueAllowed() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isContinueAllowed()} // Disable button when conditions are not met
          onClick={() => goToStage(stage + 1)}
        >
          CONTINUE...
        </Button>
      </div>
    </div>
  );
}
