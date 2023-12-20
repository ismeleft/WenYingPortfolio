import React from "react";
import Image from "next/image";

const Projects = () => {
  return (
    <div>
      <div className="text-center p-10" id="projects">
        <div>Browse My </div>
        <h1 className="text-4xl font-bold text-center">Projects</h1>
      </div>
      <div className="flex justify-center gap-5">
        <div className="border rounded-3xl border-black p-6 gap-3 w-1/3 text-center flex flex-col items-center">
          <Image
            src={"/1.png"}
            width={400}
            height={400}
            alt="coding icon"
            className="m-2"
          ></Image>
          <h1 className="text-2xl font-bold ">GratifyME</h1>
          <p>A Gratitude Journal Web Application</p>
          <div className="mt-2 flex gap-4">
            <button className="border rounded-3xl border-black p-3">
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1Xd_iptntto2TkMnNcn7CSqdYilWsuS6c/view?usp=sharing"
              >
                Live Demo
              </a>
            </button>
            <button className="border rounded-3xl border-black p-3 bg-black text-white">
              GitHub
            </button>
          </div>
        </div>
        <div className="border rounded-3xl border-black p-6 gap-3 w-1/3 text-center flex flex-col items-center">
          <Image
            src={"/2.png"}
            width={400}
            height={400}
            alt="coding icon"
            className="m-2"
          ></Image>
          <h1 className="text-2xl font-bold ">Taipei-Day-Trip</h1>
          <p>An e-commerce website about Taipei tourism.</p>
          <div className="mt-2 flex gap-4">
            <button className="border rounded-3xl border-black p-3">
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1Xd_iptntto2TkMnNcn7CSqdYilWsuS6c/view?usp=sharing"
              >
                Live Demo
              </a>
            </button>
            <button className="border rounded-3xl border-black p-3 bg-black text-white">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
