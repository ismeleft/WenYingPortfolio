import { useState } from "react";
import { useRouter } from "next/router";
import firebase from "../../lib/firebase/index";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 在 Firestore 中添加新文章
    await firebase.db.collection("posts").add({
      title,
      content,
      createdAt: new Date(),
    });
    // 提交後導航到文章列表或首頁
    router.push("/"); // 或其他頁面，如 `/posts`
  };

  return (
    <div>
      <h1>添加新文章</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="標題"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="內容"
          required
        ></textarea>
        <button type="submit">發布文章</button>
      </form>
    </div>
  );
}
