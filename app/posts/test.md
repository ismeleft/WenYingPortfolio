---
title: "Portfolio 網站技術要覽"
date: "2024-2-14"
tags: []
---
![Photo by Glenn Carstens-Peters on Unsplash](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/7f18b9c2-ad1f-4d01-b197-1080285a25da)

以下是有關這個網站的技術概覽：

- Next.js App Router
- Tailwind CSS


目前沒有仰賴任何 blog template，先嘗試手做看看！

原本打算做一個簡易的SPA網站，單純地像網頁版的履歷，後來想想如果可以把某些東西記錄下來，或是覺得比較有趣、想研究的部分整理起來分享出去，應該還不錯。

過去幾年，還沒有學習寫程式的時候我都是用 Ｗordpress作為我分享特定內容的渠道。

同時也因此依賴了 Wordpress提供的各式外掛，例如：SEO外掛、文章表格外掛等等，所以現在的我就想，如果可以自己做部落格，一樣分享文章，然後去了解前端工程與 SEO之間的關係，應該會滿有趣的。

離題了，總之，這是我的第一篇文章，如果之後有關這個網站的異動，都會更新在changelog上！


---
紀錄一下目前開發上遇到的難題：

1. 原本採用app/admin/addPost 搭配 `Firebase  FireStore` 來新增文章，但後來覺得在未設定好權限時，有機會被XSS攻擊，所以就義無反顧地將發布文章的方式改為本地md檔上傳。


2. `Markdown` 編輯後 md 檔上傳轉為HTML 並不會有對應的樣式，這點才是真的卡了很久。 因為不知道這點，還以為是轉換的套件問題，嘗試了`marked`、`MarkdownIt`，怎麼樣都沒有樣式，後來才在某個 youtube影片看到可以用 `@tailwindcss/typography`，完全是救了這個部落格一命。