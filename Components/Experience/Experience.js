import React from "react";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="text-center p-40" id="experience">
      <div>Explore My</div>
      <h1 className="text-4xl font-bold text-center">Experience</h1>
      <div className="flex gap-10 mt-10 justify-center">
        <div className="border rounded-3xl border-black p-6 gap-3 w-2/5 text-center flex flex-col items-center">
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
        <div className="border rounded-3xl border-black p-6 gap-3 w-2/5 text-center flex flex-col items-center">
          <Image
            src={"/company.png"}
            width={30}
            height={30}
            alt="company icon"
            className="m-2"
          ></Image>
          <h1 className="text-2xl font-bold ">Sales Assitant</h1>
          <p>
            Jul 2018 - Nov 2023 <br />
            Max Vantage WH CO. LTD <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
