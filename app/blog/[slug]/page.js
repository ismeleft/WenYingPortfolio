"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Post = ({ params }) => {
  // 接收 params prop
  const [post, setPost] = useState(null);
  const { slug } = params; // 從 params 解構 slug

  useEffect(() => {
    const fetchPost = async () => {
      console.log("Slug from props:", slug);
      if (slug) {
        const postDoc = doc(db, "posts", slug);
        const postData = await getDoc(postDoc);
        if (postData.exists()) {
          const data = postData.data();
          setPost({
            id: postData.id,
            ...data,
            createdAt: data.createdAt.toDate(),
          });
        } else {
          console.log("No such document!");
          setPost(null);
        }
      }
    };

    fetchPost();
  }, [slug]); // 依賴 slug 變化

  if (!post)
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>Loading...</div>
    );
  if (!post.title || !post.content) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        Post not found or is missing some information.
      </div>
    );
  }

  return (
    <div className="p-8" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <p>{post.createdAt && post.createdAt.toLocaleDateString()}</p>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
