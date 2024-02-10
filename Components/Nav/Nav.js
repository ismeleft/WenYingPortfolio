"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Nav = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="flex justify-center items-center h-12 p-3 mx-auto max-w-[1200px]">
      <div className="flex justify-between items-center w-full">
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
        } sm:flex flex-col sm:flex-row items-center gap-8 w-full sm:justify-end p-6 absolute sm:static top-12 left-0 sm:bg-transparent`}
      >
        <button className="hover:text-red-600">
          <Link href="/blog">
            <div className="text-xl cursor-pointer transition-all duration-300 ease-in-out">
              Blog
            </div>
          </Link>
        </button>
        <button className="hover:text-red-600">
          <Link href="/changelog">
            <div className="text-xl cursor-pointer transition-all duration-300 ease-in-out">
              Changelog
            </div>
          </Link>
        </button>
      </div>
    </nav>
  );
};
