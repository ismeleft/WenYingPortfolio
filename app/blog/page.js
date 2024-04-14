import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
      {posts.map((post) => (
        <div key={post.slug} className="mb-5 hover:shadow-lg p-2 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="mr-3">📌 {post.title}</h3>
            <div>
              🗓️
              {post.date}
            </div>
            <p>{post.description}</p>
          </div>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <div className="hover:text-blue-700 cursor-pointer">
              Read more ...
            </div>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
}
