import React from "react";
import Image from "next/image";

const Projects = () => {
  return (
    <div>
      <div className="text-center p-10 md:p-20" id="projects">
        <div>Browse My </div>
        <h1 className="text-2xl md:text-4xl font-bold text-center">Projects</h1>
      </div>
      <div className="p-6 flex flex-col md:flex-row justify-center gap-5">
        <div className="border rounded-3xl border-black p-4 md:p-6 gap-3 w-full md:w-1/3 text-center flex flex-col items-center">
          <Image
            src={"/1.png"}
            width={300}
            height={300}
            alt="coding icon"
            className="m-2"
          ></Image>
          <h1 className="text-xl md:text-2xl font-bold ">GratifyME</h1>
          <p>A Gratitude Journal Web Application</p>
          <div className="mt-2 flex flex-col md:flex-row gap-4">
            <button className="border rounded-3xl border-black p-2 md:p-3">
              <a target="_blank" href="https://gratifyme.vercel.app/">
                Live Demo
              </a>
            </button>
            <button className="border rounded-3xl border-black p-2 md:p-3 bg-black">
              <a
                target="_blank"
                href="https://github.com/ismeleft/gratifyme"
                className="text-white bg-transparent"
              >
                GitHub
              </a>
            </button>
          </div>
        </div>

        <div className="border rounded-3xl border-black p-4 md:p-6 gap-3 w-full md:w-1/3 text-center flex flex-col items-center">
          <Image
            src={"/2.png"}
            width={300}
            height={300}
            alt="coding icon"
            className="m-2"
          ></Image>
          <h1 className="text-xl md:text-2xl font-bold">Taipei-Day-Trip</h1>
          <p>An e-commerce website about Taipei tourism.</p>
          <div className="mt-2 flex flex-col md:flex-row gap-4">
            <button className="border rounded-3xl border-black p-2 md:p-3">
              <a target="_blank" href="http://52.192.139.251:3000/">
                Live Demo
              </a>
            </button>
            <button className="border rounded-3xl border-black p-2 md:p-3 bg-black">
              <a
                target="_blank"
                href="https://github.com/ismeleft/taipei-day-trip"
                className="text-white bg-transparent"
              >
                GitHub
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
