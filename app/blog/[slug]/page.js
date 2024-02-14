import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const postsDirectory = path.join(process.cwd(), "app/posts");

async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const md = new MarkdownIt();
  const htmlContent = md.render(content);

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
      className="prose mx-auto max-w-[1200px] mt-10 w-10/12 p-8  "
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  );
}
