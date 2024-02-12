"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 mx-auto max-w-[1200px] px-8 py-3">
      <div className="flex items-center justify-between">
        <h1 className="cursor-pointer">
          <Link href={"/"}>Yings</Link>
        </h1>
        <div>
          <button className="mr-4 text-xl cursor-pointer hover:text-red-600">
            <Link href={"/blog"}>Blog</Link>
          </button>
          <button className="text-xl cursor-pointer hover:text-red-600">
            <Link href={"/changelog"}>Changelog</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};
