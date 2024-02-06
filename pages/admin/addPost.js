import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "../../styles/pages.module.css";

export default function AddPost() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      router.push("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="p-8">
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
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        ></textarea>
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
