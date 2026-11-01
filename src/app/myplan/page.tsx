import MyPlanCard from "./Card";

const page = () => {
  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black uppercase tracking-tight text-white">
          My Plan
        </h2>
        <p className="text-sm text-[#9CA3AF]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <MyPlanCard />
    </section>
  );
};

export default page;
