"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-3" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="p-6 h-screen bg-slate-50/50 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold bg-slate-50/50">Blog Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="p-8">
            <div>
              <p>
                {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
              <h3>{post.title}</h3>
            </div>
            <Link href={`/blog/${post.id}`}>Read more...</Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
