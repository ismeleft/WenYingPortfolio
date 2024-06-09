"use client";

import React from "react";
import Image from "next/image";

const changelog = () => {
  return (
    <div className="mx-auto max-w-[1200px] p-3">
      <div className="p-6 h-screen bg-slate-50/50 shadow-lg rounded-lg text-gray-900">
        <Image src={"/book.png"} width={70} height={70} alt="book" />
        <h1 className="text-2xl font-bold mt-5">Changelog</h1>
        <p className="mt-3 mb-10 text-lg">以下是有關這個網站的更新紀錄 🙂 </p>
        <ul className="list-disc mt-3 flex flex-col gap-4">
          <h2 className="text-xl font-bold ">[v0.0.1] - 2024-02-07</h2>
          <li className="text-lg ml-5"> 更改網站 layout</li>
          <li className="text-lg ml-5"> 新增部落格以及 Changelog</li>
          <h2 className="text-xl font-bold">[v0.0.2] - 2024-04</h2>
          <li className="text-lg ml-5">利用 highlight.js 新增程式碼高亮功能</li>
          <h2 className="text-xl font-bold">[v0.0.3] - 2024-06</h2>
          <li className="text-lg ml-5">新增部落格文章分頁</li>
          <li className="text-lg ml-5">
            利用 material ui Pagination 作為分頁樣式
          </li>
        </ul>
      </div>
    </div>
  );
};

export default changelog;
