import React from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="navBar flex  p-8  items-center justify-evenly w-full">
      <div className="navBar-siteName text-3xl font-bold mr-6">
        <Link href={"/"}>Yings</Link>
      </div>
      <div className="navItemList flex gap-8">
        <Link href="#about">
          <div className="navItem text-xl hover:underline decoration-2 decoration-transparent hover:decoration-black transition-decoration duration-500 ease-in-out">
            About
          </div>
        </Link>
        <Link href="#experience">
          <div className="navItem text-xl hover:underline decoration-2 decoration-transparent hover:decoration-black transition-decoration duration-500 ease-in-out">
            Experience
          </div>
        </Link>
        <Link href="#projects">
          <div className="navItem text-xl hover:underline decoration-2 decoration-transparent hover:decoration-black transition-decoration duration-500 ease-in-out">
            Projects
          </div>
        </Link>
        <Link href="#contact">
          <div className="navItem text-xl hover:underline decoration-2 decoration-transparent hover:decoration-black transition-decoration duration-500 ease-in-out">
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};
