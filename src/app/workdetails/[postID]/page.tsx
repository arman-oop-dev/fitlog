import AddToPlanButton from "@/app/lib/Card/AddToPlanButton";
import { WorkoutCard } from "@/app/lib/Card/CardType";
import SaveToLaterButton from "@/app/lib/Card/SaveToLaterButton";
import Image from "next/image";

interface Workdetails {
  details: WorkoutCard[];
  params: Promise<{ postID: string }>;
}

const FetecData = async (): Promise<WorkoutCard[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};

const page = async ({ params }: Workdetails) => {
  const details = await FetecData();
  const { postID } = await params;

  const DetailContent = details.find((item) => {
    return postID === item.id.toString() ? true : false;
  });

  if (DetailContent) {
    const detailDes: (string | number)[][] = [
      ["equipment", DetailContent?.equipment],
      ["difficulty", DetailContent?.difficulty],
      ["sets", DetailContent?.sets],
      ["reps", DetailContent?.reps],
      ["duration", `${DetailContent?.duration} min`],
      ["calories", `${DetailContent?.caloriesBurned} kcal`],
      ["rating", DetailContent?.rating],
    ];

    return (
      <>
        <section className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-6 md:gap-10 container mx-auto mt-5 px-4 sm:px-6 lg:px-8 pb-10">
          {/* Image card */}
          <div className="md:sticky md:top-5 md:self-start overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={DetailContent?.image}
              alt={DetailContent?.name}
              width={1080}
              height={1920}
              className="w-full h-auto aspect-4/5 object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              {DetailContent.name}
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed">
              {DetailContent.description}
            </p>

            <div className="flex flex-wrap gap-2 text-[#0F1115] text-xs font-medium">
              {DetailContent.muscleGroups.map((item, index) => {
                return (
                  <span
                    className="bg-[#C2F800] px-2.5 py-0.5 rounded-full"
                    key={index}
                  >
                    {item}
                  </span>
                );
              })}
            </div>

            {/* Stats table */}
            <div className="rounded-xl border border-white/10 bg-white/3 overflow-hidden">
              {detailDes.map((item, index) => {
                return (
                  <div
                    className="flex flex-row items-center justify-between gap-4 px-4 py-2.5 border-b border-white/10 last:border-b-0"
                    key={index}
                  >
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">
                      {item[0]}
                    </p>
                    <p className="text-sm font-medium text-right">{item[1]}</p>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="flex flex-col gap-2 mt-2">
              <h5 className="text-sm font-bold uppercase tracking-wide">
                Instructions
              </h5>
              {DetailContent.instructions.map((item, index) => {
                return (
                  <p className="text-sm text-gray-400 flex gap-2" key={index}>
                    <span>{index + 1}.</span>
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <AddToPlanButton DetailContent={DetailContent} />
              <SaveToLaterButton DetailContent={DetailContent} />
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default page;
