"use client";

import { WorkoutCard } from "@/app/lib/Card/CardType";
import React, { createContext, useState } from "react";

interface PlanContextType {
  addToPlan: WorkoutCard[];
  setAddToPlan: React.Dispatch<React.SetStateAction<WorkoutCard[]>>;
  savedPlan: WorkoutCard[];
  setSavedPlan: React.Dispatch<React.SetStateAction<WorkoutCard[]>>;
}

export const PlanContext = createContext<PlanContextType>({
  addToPlan: [],
  setAddToPlan: () => {},
  savedPlan: [],
  setSavedPlan: () => {},
});

const MyPlanContext = ({ children }: { children: React.ReactNode }) => {
  const [addToPlan, setAddToPlan] = useState<WorkoutCard[]>([]);
  const [savedPlan, setSavedPlan] = useState<WorkoutCard[]>([]);

  const shareData: PlanContextType = {
    addToPlan,
    setAddToPlan,
    savedPlan,
    setSavedPlan,
  };

  return (
    <PlanContext.Provider value={shareData}>{children}</PlanContext.Provider>
  );
};

export default MyPlanContext;
