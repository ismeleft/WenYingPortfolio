import React from "react";
import Image from "next/image";
import Link from "next/link";

const TopSection = () => {
  return (
    <div className=" h-screen flex  items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
      <div className="flex flex-col gap-10 sm:flex-row items-center justify-evenly">
        <Image
          src={"/plumeria.png"}
          width={250}
          height={250}
          alt="flower"
          className="mb-4 sm:mb-0 mt-20"
        />
        <div className="profile flex flex-col items-center gap-4">
          <div className="text-lg sm:text-xl md:text-2xl">Hello, I am</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Wen Ying
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600">
            Frontend Developer
          </div>
          <div className="mt-2 flex  gap-4">
            <button className="border rounded-full border-black px-6 py-2 text-sm sm:text-base">
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1iPAS9KjpNqraeyJdMjzzNTC4X60VIRFE/view?usp=sharing"
              >
                Download CV
              </a>
            </button>
            <button className="border rounded-full border-black px-6 py-2 text-sm sm:text-base bg-black">
              <a href="#contact" className="text-white bg-transparent">
                Contact Info
              </a>
            </button>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/wen-ying-chen/"
              target="_blank"
            >
              <Image
                src={"/linkedin-logo.png"}
                alt="LinkedIn icon"
                width={30}
                height={30}
              />
            </a>
            <a href="https://github.com/ismeleft" target="_blank">
              <Image
                src={"/github-mark.png"}
                alt="GitHub icon"
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
