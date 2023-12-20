import React from "react";
import Image from "next/image";
const Contact = () => {
  return (
    <div className="my-0 mx-auto p-10" id="contact">
      <div className="text-center">Get in Touch </div>
      <h1 className="text-4xl font-bold text-center">Contact Me</h1>
      <div className="border rounded-3xl border-black p-2 mt-10 gap-3 w-1/4 text-center flex justify-center  items-center my-0 mx-auto ">
        <Image
          src={"/email.png"}
          width={50}
          height={50}
          alt="email icon"
          className="m-2"
        ></Image>
        <p>leftleft0813@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;
