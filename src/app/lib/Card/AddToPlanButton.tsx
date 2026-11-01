"use client";

import { PlanContext } from "@/app/ContextProvider/MyPlanContext";
import { Button } from "@heroui/react";
import { useContext } from "react";
import { CiCalendar } from "react-icons/ci";
import { WorkoutCard } from "./CardType";

interface AddToPlan {
  DetailContent: WorkoutCard;
}

const AddToPlanButton = ({ DetailContent }: AddToPlan) => {
  const { addToPlan, setAddToPlan } = useContext(PlanContext);

  const handleAddtoPlan = () => {
    setAddToPlan([...addToPlan, DetailContent]);
  };

  return (
    <Button
      onClick={handleAddtoPlan}
      className="bg-[#C2F800] text-black font-semibold rounded-xl w-full sm:w-auto"
    >
      <CiCalendar />
      {`Add to today's plan`}
    </Button>
  );
};

export default AddToPlanButton;
