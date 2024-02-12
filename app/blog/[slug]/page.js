"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { marked } from "marked";

const Post = ({ params }) => {
  const [post, setPost] = useState(null);
  const { slug } = params;

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
  }, [slug]);

  const createMarkup = (markdownContent) => {
    return { __html: marked(markdownContent) };
  };

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
    <div
      className="post-content p-3 "
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "70%",
        lineHeight: "30px",
      }}
    >
      <div className="flex mt-20 items-center ">
        <h1 className="mr-3 ">{post.title}</h1>
        <h3>{post.createdAt.toLocaleDateString()}</h3>
      </div>
      <br />
      <div dangerouslySetInnerHTML={createMarkup(post.content)} />
    </div>
  );
};

export default Post;
