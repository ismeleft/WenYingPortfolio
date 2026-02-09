# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個使用 Next.js 14 建構的個人作品集與部落格網站，部署於 Vercel。

## 開發指令

```bash
# 開發環境
npm run dev

# 建置專案
npm run build

# 生產環境啟動
npm start

# 執行 ESLint 檢查
npm run lint

# 建置後生成 sitemap（自動執行）
npm run postbuild
```

## 架構說明

### 目錄結構

- `app/` - Next.js 14 App Router 主要應用程式目錄
  - `posts/` - 部落格文章 Markdown 檔案（使用 gray-matter 解析 frontmatter）
  - `blog/` - 部落格頁面
    - `page.js` - 部落格列表頁（含分頁功能）
    - `[slug]/page.js` - 動態部落格文章頁面
  - `page.js` - 首頁（作品集展示）
  - `layout.js` - 根佈局（包含 Nav 和 Footer）
  - `sitemap.js` - 動態 sitemap 生成
  - `changelog/page.js` - 更新日誌頁面
- `Components/` - React 元件目錄
  - `Nav/` - 導覽列
  - `Footer/` - 頁尾
  - `Pagination/` - 分頁元件
  - `TopSection/`, `About/`, `Experience/`, `Projects/`, `Contact/` - 首頁各區塊元件
- `public/` - 靜態資源（圖片等）

### 核心技術棧

- **框架**: Next.js 14 (App Router)
- **樣式**: Tailwind CSS + @tailwindcss/typography
- **UI 函式庫**: Material-UI (@mui/material) + Emotion
- **Markdown 處理**: gray-matter (frontmatter 解析) + markdown-it (渲染) + highlight.js (程式碼高亮)
- **SEO**: next-sitemap（自動生成 sitemap 和 robots.txt）

### 路徑別名

專案使用 `@/*` 作為路徑別名，指向專案根目錄（設定於 `jsconfig.json`）。

範例：
```javascript
import Nav from "@/Components/Nav/Nav";
import Footer from "@/Components/Footer/Footer";
```

### 部落格系統

部落格文章以 Markdown 格式儲存於 `app/posts/` 目錄，每篇文章需包含 frontmatter：

```markdown
---
title: "文章標題"
date: "YYYY-MM-DD"
---
```

文章處理流程：
1. 使用 `fs` 和 `path` 讀取 `app/posts/` 目錄中的 `.md` 檔案
2. 使用 `gray-matter` 解析 frontmatter 和內容
3. 使用 `markdown-it` 轉換 Markdown 為 HTML
4. 使用 `highlight.js` 為程式碼區塊提供語法高亮（主題：atom-one-dark）

### SEO 設定

- `next-sitemap` 會在建置後自動執行（postbuild hook）
- sitemap 設定檔位於 `next-sitemap.config.js`
- 網站 URL: https://wen-ying-portfolio.vercel.app/
- Google Search Console 驗證碼已設定於 `app/layout.js`

### Tailwind CSS 客製化

- 已擴展 `transitionProperty` 以支援 height、spacing 和 border 動畫
- 啟用 hover 狀態的 borderWidth 變化
- 整合 `@tailwindcss/typography` 外掛用於 Markdown 內容渲染

## 注意事項

- 部落格文章的日期格式會自動轉換為台灣繁體中文格式（zh-TW）
- 文章列表依日期降冪排序（最新文章在前）
- 專案使用 JavaScript 而非 TypeScript（但有 TypeScript 相關依賴用於型別檢查）
- Components 目錄位於專案根目錄而非 app 目錄內
