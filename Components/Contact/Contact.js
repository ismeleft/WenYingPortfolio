import React from "react";
import Image from "next/image";

const Contact = () => {
  return (
    <div className="my-0 mx-auto p-5 md:p-10" id="contact">
      {/* Responsive text size for the subheading */}
      <div className="text-center text-lg md:text-xl">Get in Touch </div>
      {/* Responsive text size and margin for the heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-2 md:mt-4">
        Contact Me
      </h1>
      {/* Responsive width, padding, and margin for the contact card */}
      <div className="border rounded-3xl border-black p-4 md:p-6 mt-8 md:mt-10 gap-3 w-3/4 md:w-1/2 lg:w-1/4 text-center flex justify-center items-center mx-auto">
        <a
          href="mailto:leftleft0813@gmail.com"
          className="flex justify-center items-center"
        >
          {/* Responsive image size */}
          <Image
            src={"/email.png"}
            width={40}
            height={40}
            alt="email icon"
            className="m-1 md:m-2"
          ></Image>
          {/* Responsive text size for the email */}
          <p className="text-sm md:text-base">leftleft0813@gmail.com</p>
        </a>
      </div>
    </div>
  );
};

export default Contact;
