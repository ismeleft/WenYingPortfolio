import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import styles from "../styles/pages.module.css";

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
    <div>
      <h1 className="p-8 text-2xl font-bold">Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="p-8">
          <div className={styles.postInfo}>
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
  );
};

export default Blog;
