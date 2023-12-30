import React from "react";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="h-screen flex items-center justify-center" id="experience">
      <div className="text-center px-4 lg:px-20 py-10">
        <div>Explore My</div>
        <h1 className="text-4xl font-bold text-center">Experience</h1>
        <div className="flex flex-wrap gap-5 p-6 justify-center ">
          <div className="w-full sm:w-8/10 md:w-1/2 lg:w-2/5 xl:w-2/5 mx-auto border rounded-3xl border-black p-6 gap-3 text-center flex flex-col items-center">
            <Image
              src={"/coding.png"}
              width={30}
              height={30}
              alt="coding icon"
              className="m-2"
            ></Image>
            <h1 className="text-2xl font-bold ">Web Trainee</h1>
            <p>
              Jul 2023 - Dec 2023 <br />
              Wehelp Bootcamp 4th <br />
            </p>
          </div>
          <div className="w-full sm:w-8/10 md:w-1/2 lg:w-2/5 xl:w-2/5 mx-auto border rounded-3xl border-black p-6 gap-3 text-center flex flex-col items-center">
            <Image
              src={"/company.png"}
              width={30}
              height={30}
              alt="company icon"
              className="m-2"
            ></Image>
            <h1 className="text-2xl font-bold ">Sales Assistant</h1>
            <p>
              Jul 2018 - Nov 2023 <br />
              Max Vantage WH CO. LTD <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
