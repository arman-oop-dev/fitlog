"use client";

import { PlanContext } from "@/app/ContextProvider/MyPlanContext";
import { Button } from "@heroui/react";
import { useContext } from "react";
import { CiCalendar } from "react-icons/ci";
import { WorkoutCard } from "./CardType";

interface AddToPlan {
  DetailContent: WorkoutCard;
}

const SaveToLaterButton = ({ DetailContent }: AddToPlan) => {
  const { savedPlan, setSavedPlan } = useContext(PlanContext);

  const handleAddtoPlan = () => {
    setSavedPlan([...savedPlan, DetailContent]);
  };

  return (
    <Button
      onClick={handleAddtoPlan}
      className="bg-transparent border border-white/15 text-white rounded-xl w-full sm:w-auto"
    >
      <CiCalendar />
      {`Add to today's plan`}
    </Button>
  );
};

export default SaveToLaterButton;
