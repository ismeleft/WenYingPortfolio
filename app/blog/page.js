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
        slug: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-3" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="mt-10 p-6 h-screen shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="mt-3">
            <div className=" flex gap-3">
              <h3 className="">
                {post.createdAt &&
                  new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
              </h3>
              <h3 className="">{post.title}</h3>
            </div>
            {post.slug ? (
              <Link
                className=" hover:text-blue-600"
                href={`/blog/${post.slug}`}
              >
                Read more...
              </Link>
            ) : (
              <span className=" ">Unavailable</span>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
