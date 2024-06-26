import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

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

  return {
    ...data,
    content: htmlContent,
  };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPostData(slug);

  return (
    <div className="mx-auto max-w-[1200px] w-10/12 p-5">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-md text-gray-500 mb-8">{post.date}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
