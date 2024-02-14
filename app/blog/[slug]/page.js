import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "app/posts");

async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = marked(content);

  return {
    ...data,
    content: htmlContent,
  };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPostData(slug);

  return (
    <div
      className="mx-auto max-w-[1200px] mt-20 w-10/12 p-8 h-screen"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  );
}
