"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Nav = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div className="navBar flex flex-col sm:flex-row p-8 items-center justify-between w-full">
      <div className="flex justify-between items-center w-full sm:w-auto">
        <div className="navBar-siteName text-3xl font-bold">
          <Link href={"/"}>
            <div className="cursor-pointer">Yings</div>
          </Link>
        </div>
        <button
          className="text-3xl sm:hidden"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          &#9776;
        </button>
      </div>
      <div
        className={`navItemList ${
          isNavExpanded ? "flex" : "hidden"
        } flex-col sm:flex sm:flex-row gap-8 w-full sm:w-auto`}
      >
        <Link href="#about">
          <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
            About
          </div>
        </Link>
        <Link href="#experience">
          <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
            Experience
          </div>
        </Link>
        <Link href="#projects">
          <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
            Projects
          </div>
        </Link>

        <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
          Blog
        </div>

        <Link href="#contact">
          <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};
