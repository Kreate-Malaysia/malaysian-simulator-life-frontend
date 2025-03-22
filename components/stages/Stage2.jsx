import Image from "next/image";
import { useEffect, useState } from "react";
import Slot from "../Slot";
import FeedbackButton from "../FeedbackButton";

export default function Stage2({ setSchool }) {
  const school = ["SJKC", "SK", "SMK"];
  const [schoolIndex, setSchoolIndex] = useState(0);

  useEffect(() => {
    const finalSchoolIndex = Math.floor(Math.random() * school.length);
    setTimeout(() => {
      setSchoolIndex(finalSchoolIndex);
      setSchool(school[finalSchoolIndex]);
      sessionStorage.setItem("school", school[finalSchoolIndex]);
    }, 2000);
  }, [setSchool]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 text-center w-full">
      <div className="flex flex-col gap-y-24">
        <h1 className="text-[40px]">
          YOU LEARNED HOW TO WALK, RUN, JUMP, TALK, AND SOME WORDS THEN
        </h1>
        <h2 className="text-[40px]">YOU GOT INTO...</h2>
        <FeedbackButton />
      </div>
      <Slot items={school} duration={2000} targetIndex={schoolIndex} />
    </div>
  );
}
