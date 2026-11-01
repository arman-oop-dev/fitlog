import { Button } from "@heroui/react";

import Image from "next/image";
import Card from "./lib/Card/Card";
const Page = () => {
  return (
    <>
      <section className="container mx-auto mt-5 grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#222630] bg-[#15171D] px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:py-14">
        {/* Text content */}
        <div className="order-2 flex flex-col gap-3 text-center sm:gap-4 lg:order-1 lg:col-span-7 lg:text-left">
          <p className="text-xs font-semibold tracking-widest text-[#C2F800]">
            WORKOUT LIBRARY
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="mx-auto max-w-xl text-base text-[#9CA3AF] sm:text-lg lg:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Button className="mt-2 w-full bg-[#C2F800] px-6 py-3 text-black sm:w-auto sm:self-center lg:self-start">
            BROWSE WORKOUTS
          </Button>
        </div>

        {/* Banner image */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <Image
            src="/assets/banner.png"
            alt="banner"
            width={334}
            height={334}
            priority
            className="h-auto w-48 sm:w-64 lg:w-full lg:max-w-83.5"
          />
        </div>
      </section>

      <Card />
    </>
  );
};

export default Page;
