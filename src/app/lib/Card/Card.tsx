import Image from "next/image";
import Link from "next/link";
import { CiTimer } from "react-icons/ci";
import { MdOutlineStarOutline } from "react-icons/md";
import { SlPieChart } from "react-icons/sl";
import { WorkoutCard } from "./CardType";

const FetecData = async (): Promise<WorkoutCard[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};

const Card = async () => {
  const bookList = await FetecData();

  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      {/* Section heading */}
      <div className="mb-6 text-center sm:mb-8 sm:text-left">
        <h2 className="text-2xl font-bold sm:text-3xl">THE LIBRARY</h2>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {bookList.map((item) => (
          <Link
            href={`/workdetails/${item.id}`}
            key={item.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-transparent bg-[#20242E] transition-colors hover:border-[#C2F800]"
          >
            {/* Image with fixed aspect ratio */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex flex-wrap gap-2 text-xs font-bold text-black">
                {item.muscleGroups.map((muscle, index) => (
                  <span
                    className="rounded-2xl bg-[#C2F800] px-2.5 py-0.5"
                    key={index}
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div>
                <h5 className="text-base font-bold uppercase sm:text-lg">
                  {item.name}
                </h5>
                <p className="text-sm text-[#9CA3AF]">{item.equipment}</p>
              </div>

              <hr className="mt-auto border-[#2A2F3A]" />

              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-[#9CA3AF] sm:text-sm">
                <p className="flex items-center gap-1">
                  <CiTimer className="text-base" /> {item.duration} min
                </p>
                <p className="flex items-center gap-1">
                  <SlPieChart className="text-base" />
                  {item.caloriesBurned} kcal
                </p>
                <p className="flex items-center gap-1">
                  <MdOutlineStarOutline className="text-base" />
                  {item.rating}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Card;
