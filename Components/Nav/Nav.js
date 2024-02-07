"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Nav = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div className="flex justify-center h-12 p-3 mx-auto max-w-[1200px] relative">
      <div className="flex justify-between items-center w-full z-20">
        <Link href={"/"}>
          <div className="text-3xl font-bold cursor-pointer">Yings</div>
        </Link>
        <button
          className="text-3xl sm:hidden"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          &#9776;
        </button>
      </div>
      <div
        className={`${
          isNavExpanded ? "flex" : "hidden"
        } absolute sm:relative z-10 flex-col sm:flex sm:flex-row gap-8 p-6 w-full  sm:bg-transparent sm:h-auto top-12 left-0`}
      >
        <Link href="/blog">
          <div className="navItem text-xl cursor-pointer transition-all duration-300 ease-in-out">
            Blog
          </div>
        </Link>
        <Link href="/changelog">
          <div className="navItem text-xl cursor-pointer transition-all duration-300 ease-in-out">
            Changelog
          </div>
        </Link>
      </div>
    </div>
  );
};
