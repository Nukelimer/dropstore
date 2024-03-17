"use client";
import Link from "next/link";
import ArrowIcon from "./framer/arrow";
import Image from "next/image";
function Hero() {
  return (
      <div className="flex flex-col lg:flex-row bg-[#fffefe] dark:bg-slate-900 text-white border-t-2 ">
      <div className="flex flex-col space-y-5  p-10   dark:bg-slate-800  dark:text-primary text-slate-900 ">
        <h1 className="text-5xl font-bold ">
          Welcome To <span className="">Dropstore</span>
        </h1>
        <p className="pb-20">
          Experience the ease and security of cloud storage with us. Store,
          access, and share your files effortlessly. Join our community and
          elevate your digital experience today!
        </p>

        <Link
          href={"/dashboard"}
          className="flex items-center text-center gap-2  bg-primary dark:bg-blue-500 text-white w-fit py-3 px-4">
          Join us now
          <ArrowIcon />
        </Link>
      </div>

      <div className="bg-[#1e1919] dark:bg-slate-800 p-10 space-y-5 ">
        <video autoPlay loop muted className="rounded-lg">
          <source
            src={
              "https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
            }
            type="video/mp4"
          />
          Your video does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Hero;
