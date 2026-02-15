import React from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <div>
      <div className="text-center p-10 md:p-20" id="projects">
        <div>Browse My </div>
        <h1 className="text-2xl md:text-4xl font-bold text-center">Projects</h1>
      </div>
      <div className="p-6 flex flex-col md:flex-row justify-center gap-5 flex-wrap">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-3xl border-black p-4 md:p-6 gap-3 w-full md:w-1/3 text-center flex flex-col items-center"
          >
            <Image
              src={project.thumbnail}
              width={300}
              height={200}
              alt={`${project.title} screenshot`}
              className="m-2 rounded-xl object-cover"
            />
            <h1 className="text-xl md:text-2xl font-bold">{project.title}</h1>
            <p>{project.description}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs border border-black rounded-full px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-col md:flex-row gap-4">
              <button className="border rounded-3xl border-black p-2 md:p-3">
                <a target="_blank" href={project.liveDemo} rel="noopener noreferrer">
                  Live Demo
                </a>
              </button>
              <button className="border rounded-3xl border-black p-2 md:p-3 bg-black">
                <a
                  target="_blank"
                  href={project.github}
                  rel="noopener noreferrer"
                  className="text-white bg-transparent"
                >
                  GitHub
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
