import React from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="navBar flex  p-8 fixed items-center justify-evenly w-full">
      <div className="navBar-siteName text-3xl font-bold mr-6">
        <Link href={"/"}>Yings</Link>
      </div>
      <div className="navItemList flex gap-8">
        <Link href="#about">
          <div className="navItem text-xl">About</div>
        </Link>
        <Link href="#experience">
          <div className="navItem text-xl">Experience</div>
        </Link>
        <Link href="#projects">
          <div className="navItem text-xl">Projects</div>
        </Link>
        <Link href="#contact">
          <div className="navItem text-xl">Contact</div>
        </Link>
      </div>
    </div>
  );
};
