"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Nav = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div className="flex justify-center w-full fixed top-0 left-0 h-12">
      <div
        className="navBar flex flex-col sm:flex-row p-3 items-center justify-between"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        <div className="flex justify-between items-center w-full">
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
          } flex-col sm:flex sm:flex-row gap-8 pt-3 sm:pt-0`}
        >
          <Link href="/blog">
            <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
              Blog
            </div>
          </Link>
          <Link href="/Changelog">
            <div className="navItem hover-underline-offset text-xl cursor-pointer transition-all duration-300 ease-in-out">
              Changelog
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
