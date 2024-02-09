"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Post = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query;
    const fetchPost = async () => {
      if (slug) {
        const postDoc = doc(db, "posts", slug);
        const postData = await getDoc(postDoc);
        if (postData.exists()) {
          setPost({ id: postData.id, ...postData.data() });
        } else {
        }
      }
    };

    fetchPost();
  }, [router.query]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-8" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <p>{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
