import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PaginatedPosts from "../../Components/Pagination/Pagination";

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

  return (
    <div className="p-5 mx-auto max-w-[1200px] w-10/12">
      <h1 className="mb-3">Blog Posts</h1>
      <hr />
      <PaginatedPosts posts={posts} />
    </div>
  );
}
