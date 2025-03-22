"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { badStudentData, goodStudentData } from "../../../data/scenarioData";

const testData = [
  {
    id: 1,
    description: "CIKGU FATIN SAYS THAT THIS YEAR'S SPM SEJARAH.",
    choices: [],
    isEnd: false,
  },
  {
    id: 2,
    description:
      "CIKGU FATIN SAYS THAT THIS YEAR'S SPM SEJARAH WILL BE MUCH HARDER COMPARED TO PAST YEARS..",
    choices: [
      {
        id: 1,
        description: "A. JOIN MULTIPLE TELEGRAM GROUPS FOR TIPS",
        nextScenarioId: 3,
      },
      {
        id: 2,
        description: "B. STUDY THE OLD FASHIONED WAY",
        nextScenarioId: 4,
      },
    ],
    isEnd: false,
  },
  {
    id: 3,
    description: "YOU JOINED MULTIPLE TELEGRAM GROUPS AND GOT A LOT OF TIPS!",
    choices: [],
    isEnd: true,
  },
  {
    id: 4,
    description: "YOU DECIDED TO STUDY HARD AND PREPARE YOURSELF.",
    choices: [],
    isEnd: true,
  },
];

export default function Scenario() {
  const router = useRouter();
  const [scenarioPath, setScenarioPath] = useState([]);
  const [fetchScenarioData, setFetchScenarioData] = useState({
    id: 0,
    description: "",
    choices: [],
    isEnd: false,
  });
  const [scenarioImage, setScenarioImage] = useState([]);
  const [currentScenarioId, setCurrentScenarioId] = useState(1);

  useEffect(() => {
    const studentPath = sessionStorage.getItem("studentPath");
    switch (studentPath) {
      case "bad":
        setScenarioPath(badStudentData);
        break;
      case "good":
        setScenarioPath(goodStudentData);
        break;
      default:
        setScenarioPath(badStudentData);
        break;
    }
  }, []);

  useEffect(() => {
    const fetchScenarioData = async () => {
      const data = testData[currentScenarioId];
      setFetchScenarioData(data);

      if (Array.isArray(scenarioPath)) {
        const checkPathHasImage = scenarioPath.find(
          (scenario) => scenario.scenarioId === data.id
        )?.image;

        if (checkPathHasImage) {
          setScenarioImage(checkPathHasImage);
        }
      }
    };

    fetchScenarioData();

    // Push state to history without changing the URL
    window.history.pushState({ scenarioId: currentScenarioId }, "");
  }, [currentScenarioId, scenarioPath]);

  // Handle choice selection
  const handleChoice = (nextScenarioId) => {
    setCurrentScenarioId(nextScenarioId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative pt-52">
      {/* Scenario Display */}
      <div className="text-center mt-10 z-0 flex flex-col items-center">
        <div className="flex">
          {scenarioImage?.map((image) => (
            <Image
              key={image}
              src={image}
              alt="Scenario"
              width={200}
              height={200}
            />
          ))}
        </div>
        <h2 className="text-[40px]">{fetchScenarioData.description}</h2>

        {/* Choices */}
        {fetchScenarioData.choices.length > 0 && (
          <div className="flex flex-col gap-4 mt-16">
            <div className="flex md:flex-row flex-col gap-4 justify-center items-stretch w-full">
              {fetchScenarioData.choices.map((choice) => (
                <Button
                  key={choice.id}
                  className="py-4 px-6 rounded-lg shadow border-2 md:border-4 h-full text-center text-lg md:text-xl lg:text-2xl break-words"
                  variant="choice"
                  onClick={() => handleChoice(choice.nextScenarioId)}
                >
                  {choice.description}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* End of Scenario */}
        {fetchScenarioData.isEnd && (
          <Button
            variant="continue"
            className="lg:self-end self-center mt-10"
            onClick={() => router.push("/start-game/scenario/end")}
          >
            Continue...
          </Button>
        )}
      </div>
    </div>
  );
}
