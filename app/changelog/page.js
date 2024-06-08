"use client";

import React from "react";

const changelog = () => {
  return (
    <div className="mx-auto max-w-[1200px] p-3">
      <div className="p-6 h-screen bg-slate-50/50 shadow-lg rounded-lg">
        <ul className="list-disc mt-3 flex flex-col gap-2">
          <li>2024-2-7 Change Website Layout</li>
          <li>2024-2 預計2月完成blog功能最簡易的layout</li>
          <li>2024-4 新增 syntax highlighting --highlight.js</li>
          <li>2024-6 新增部落格文章分頁</li>
        </ul>
      </div>
    </div>
  );
};

export default changelog;
