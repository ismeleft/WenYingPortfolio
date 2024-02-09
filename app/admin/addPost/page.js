"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt();

export default function AddPost() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slugRef = doc(db, "posts", slug);
      const slugSnap = await getDoc(slugRef);

      if (slugSnap.exists()) {
        console.error("Slug already exists. Choose a different one.");
        return;
      }

      await setDoc(slugRef, {
        title,
        content,
        createdAt: new Date(),
      });

      router.push(`/blog/${slug}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setContent(text);
  };

  return (
    <div className="p-8 mx-auto max-w-[1200px]">
      <h1 className="text-3xl p-3">Add New Post 🙂</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="URL Slug"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <MdEditor
          value={content}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-black  rounded hover:bg-blue-700 transition-colors"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}
