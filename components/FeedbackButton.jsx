import Image from "next/image";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "./ui/input";

export default function FeedbackButton({ scenarioId }) {
  const [feedback, setFeedback] = useState("");
  const handleFeedback = async () => {
    const response = await fetch(`/api/feedback/${scenarioId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scenarioId: scenarioId, feedback: feedback }),
    });

    if (response.ok) {
      alert("Feedback submitted!");
    } else {
      alert("Failed to submit feedback");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="absolute rounded-full md:right-10 right-4 self-start mr-10 bg-white p-2 shadow-md cursor-pointer"
        >
          <Image
            src="/feedback-btn.png"
            alt="Feedback Button"
            width={50}
            height={50}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback for this Scenario!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="feedback" className="text-right">
              Feedback
            </label>
            <Input
              id="feedback"
              value={feedback}
              className="col-span-4"
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleFeedback}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
