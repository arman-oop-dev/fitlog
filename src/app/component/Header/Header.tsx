"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StateUpdate from "./StateUpdate";

const headerNav: string[][] = [
  ["Workout", "/"],
  ["My Plan", "/myplan"],
];

const Header = () => {
  const pathname = usePathname();

  return (
    <section className="border-b-[#1B1F28] sticky top-0 bg-[#0F1115] z-50">
      <header className="container mx-auto flex flex-wrap items-center justify-between gap-y-4 px-4 py-4 md:grid md:grid-cols-12 md:place-items-center md:py-6">
        {/* Logo */}
        <Link
          href="/"
          className="order-1 flex items-center gap-2 md:col-span-3 md:justify-self-start"
        >
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={28}
            height={28}
            className="h-6 w-6 md:h-7 md:w-7"
          />

          <p className="text-base font-black uppercase text-white md:text-lg">
            FITLOG
          </p>
        </Link>

        {/* Main Navigation */}
        <nav className="order-3 flex w-full items-center justify-center gap-2 text-white md:order-2 md:col-span-6 md:w-auto">
          {headerNav.map(([label, href]) => {
            const isActive =
              href === "/"
                ? pathname === "/" || pathname.startsWith("/workdetails")
                : pathname === href;

            return (
              <Link
                key={href + label}
                href={href}
                className={`rounded-2xl px-3 py-1.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#1A2312] text-[#C2F800]"
                    : "text-[#9CA3AF] hover:bg-[#15171D]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Plan and Saved Counter */}
        <StateUpdate />
      </header>
    </section>
  );
};

export default Header;
