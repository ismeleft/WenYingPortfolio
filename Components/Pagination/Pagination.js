"use client";
import { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

const POSTS_PER_PAGE = 5;

function PaginatedPosts({ posts }) {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const displayedPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div>
      {displayedPosts.map((post) => (
        <div key={post.slug} className="mb-5 hover:shadow-lg p-2 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="mr-3">📌 {post.title}</h3>
            <div>🗓️ {post.date}</div>
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
      <Pagination
        count={Math.ceil(posts.length / POSTS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            href={`/blog?page=${item.page}`}
          />
        )}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
}

export default PaginatedPosts;
