import React from "react";
import Image from "next/image";

const TopSection = () => {
  return (
    <>
      <div className="flex  items-center p-48 justify-evenly">
        <Image
          src={"/plumeria.png"}
          width={250}
          height={250}
          alt="flower"
        ></Image>
        <div className="profile flex flex-col items-center gap-4">
          <div className="text-xl">Hello, I am</div>
          <div className="text-5xl font-bold ">Wen Ying</div>
          <div className="text-3xl font-bold text-gray-600">
            Frontend Developer
          </div>
          <div className="mt-2 flex gap-4">
            <button className="border rounded-3xl border-black p-3">
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1Xd_iptntto2TkMnNcn7CSqdYilWsuS6c/view?usp=sharing"
              >
                Download CV
              </a>
            </button>
            <button className="border rounded-3xl border-black p-3 bg-black text-white">
              Contact Info
            </button>
          </div>
          <div className="flex gap-3">
            <div className="linkedinIcon ">
              <Image
                src={"/linkedin-logo.png"}
                alt="linkedin logo"
                width={30}
                height={30}
              ></Image>
            </div>
            <div className="gitHubIcon">
              <Image
                src={"/github-mark.png"}
                alt="github logo"
                width={30}
                height={30}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSection;
