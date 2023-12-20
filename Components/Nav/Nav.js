import React from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="navBar flex justify-evenly mt-8">
      <div className="navBar-siteName text-3xl font-bold">Ying's</div>
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
