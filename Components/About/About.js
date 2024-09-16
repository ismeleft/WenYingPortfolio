import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div id="about">
      <div className="text-center p-4">Get to know more</div>
      <h1 className="text-4xl font-bold text-center">About me</h1>
      <div>
        <p className="my-0 mx-auto p-8 w-4/5">
          With over five years of cross-domain experience as a sales assistant,
          I have honed my skills in solving complex problems. These experiences
          have laid a solid foundation for my journey into front-end
          development, especially in continuous learning and tackling
          technological challenges. Embracing the mantra stay hungry, stay
          foolish,I am constantly exploring new technologies, committed to
          ongoing growth in the tech field.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-6">
        <div className="border rounded-3xl border-black p-3 text-center flex flex-col items-center">
          <Image
            src={"/education.png"}
            width={30}
            height={30}
            alt="education icon"
            className="m-2"
          ></Image>
          <h1 className="text-xl font-bold ">Education</h1>
          <p className="leading-8 mt-5">
            Sep 2013 - June 2017 <br />
            Chung Yuan Christian University <br />
            Departmemt of Psychology
          </p>
        </div>
        <div className="border rounded-3xl border-black py-3 px-6 text-center flex flex-col items-center">
          <Image
            src={"/skills.png"}
            width={25}
            height={25}
            alt="skills icon"
            className="m-2"
          ></Image>

          <h1 className="text-xl font-bold text-center">Skills</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <h1 className="font-bold">Frontend</h1>
              <p>
                HTML <br />
                CSS <br />
                JavaScript <br />
                React.js <br />
                React Hook <br />
                React Context API <br />
                Next.js <br />
                Zustand <br />
                Axios <br />
                Tailwind CSS <br />
                Material UI <br />
                RWD <br />
              </p>
            </div>
            <div>
              <h1 className="font-bold">Backend</h1>
              <p>Python Flask</p>
              <p>MySQL</p>
              <p>AWS EC2</p>
              <p>Firebase</p>
            </div>
            <div>
              <h1 className="font-bold">Other</h1>
              <p>
                Git <br />
                GitHub
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
