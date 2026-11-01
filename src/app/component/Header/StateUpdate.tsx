import { PlanContext } from "@/app/ContextProvider/MyPlanContext";
import Link from "next/link";
import { useContext } from "react";

const StateUpdate = () => {
  const { addToPlan, savedPlan } = useContext(PlanContext);
  return (
    <nav className="order-2 flex items-center justify-end gap-3 md:order-3 md:col-span-3 md:justify-self-end">
      <Link
        href="/myplan"
        className="flex items-center gap-1.5 text-sm font-semibold text-white"
      >
        Plan
        <span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-[#C2F800] px-1 text-xs font-bold text-black md:h-7 md:min-w-7 md:text-sm">
          {addToPlan.length}
        </span>
      </Link>

      <div>
        <Link
          href="/myplan"
          className="flex items-center gap-1.5 text-sm font-semibold text-white"
        >
          Saved
          <span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-[#C2F800] px-1 text-xs font-bold text-black md:h-7 md:min-w-7 md:text-sm">
            {savedPlan.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default StateUpdate;
