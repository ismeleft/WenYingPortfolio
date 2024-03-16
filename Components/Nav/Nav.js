"use client";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="z-10 sticky top-0 bg-yellow-50 bg-opacity-50 backdrop-blur-md ">
      <nav className=" mx-auto max-w-[1200px] px-8 py-3">
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
    </div>
  );
};
