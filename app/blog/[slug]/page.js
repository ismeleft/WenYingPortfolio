import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import MinimalBlogPost from "@/Components/Blog/MinimalBlogPost";

const postsDirectory = path.join(process.cwd(), "app/posts");

async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });
  const htmlContent = md.render(content);

  // 格式化日期
  const dateObj = new Date(data.date);
  const formattedDate = dateObj.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    ...data,
    date: formattedDate,
    content: htmlContent,
  };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPostData(slug);

  return <MinimalBlogPost post={post} />;
}
