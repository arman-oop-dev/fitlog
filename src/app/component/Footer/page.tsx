import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[#222630] bg-[#0B0D12]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 py-7 sm:px-6 md:flex-row">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/assets/logo.png"
            alt="Fitlog logo"
            width={32}
            height={32}
            className="h-7 w-7 object-contain"
          />

          <span className="text-lg font-black tracking-wider text-white">
            FIT<span className="text-[#C2F800]">LOG</span>
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-xs leading-6 text-[#858C9B] sm:text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-white">Fitlog</span> — Workout
          Library.
          <span className="ml-1 text-[#C2F800]">Train hard, log honest.</span>
        </p>

        {/* Back to Top */}
        <Link
          href="#top"
          className="text-xs font-semibold text-[#9299A8] transition-colors hover:text-[#C2F800]"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
