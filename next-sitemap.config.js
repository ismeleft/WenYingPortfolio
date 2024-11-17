module.exports = {
  siteUrl: "https://wen-ying-portfolio.vercel.app/",
  generateRobotsTxt: true,
  // 更改 sitemap 產生頻率
  changefreq: "daily",
  // 設定優先級
  priority: 0.7,
  // 排除不需要的頁面
  exclude: ["/admin/*", "/private/*"],
  // 產生額外的 sitemap
  additionalSitemaps: [
    "https://wen-ying-portfolio.vercel.app/server-sitemap.xml",
  ],
  // 自定義 robots.txt 內容
  robotsTxtOptions: {
    additionalSitemaps: ["https://wen-ying-portfolio.vercel.app/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private"],
      },
    ],
  },
  // 設定需要產生 sitemap 的路徑
  sitemapSize: 5000,
};
