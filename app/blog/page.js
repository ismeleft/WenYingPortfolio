import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MinimalBlogList from "@/Components/Blog/MinimalBlogList";

const postsDirectory = path.join(process.cwd(), "app/posts");

async function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const dateObj = new Date(data.date);
    data.date = dateObj.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return {
      slug,
      ...data,
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return <MinimalBlogList posts={posts} />;
}
