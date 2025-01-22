---
title: "【TypeScript】閱讀「什麼是 TypeScript」、「安裝 TypeScript」和「Hello TypeScript」。"
description: "決定重新開始是一件困難的事，去年花了一點時間稍微學了一點 TypeScript，但因為太零散了，確實知道某些用法，但要用的出來，用的好，我覺得還有一段距離，所以決定就像考前衝刺班一樣，一口氣，來天天學習之路。"
date: "2025-01-22"
tags: ["frontend","typescript"]
---

## 前言

決定重新開始是一件困難的事，去年花了一點時間稍微學了一點 TypeScript，但因為太零散了，確實知道某些用法，但要用的出來，用的好，我覺得還有一段距離，所以決定就像考前衝刺班一樣，一口氣，來天天學習之路。

這次的學習也是用 ChatGPT 幫我建立的學習計畫，依照的是 [https://willh.gitbook.io/typescript-tutorial](https://willh.gitbook.io/typescript-tutorial%EF%BC%8C%E6%88%91%E9%A0%90%E8%A8%88%E4%B9%9F%E6%9C%83%E5%86%8D%E4%BB%A5%E5%AE%98%E6%96%B9%E6%96%87%E4%BB%B6%E7%95%B6%E4%BD%9C%E6%98%AF%E5%AD%B8%E7%BF%92%E7%9A%84%E5%8F%83%E8%80%83%E3%80%82)，我預計也會再以官方文件當作是學習的參考。

## 我所略知的 TypeScript

簡單來說就是做型別的建立，無論是函式、變數等等，然後它是 JS 的超集。這是我目前對於 TS 的理解。

由於目前我們公司是用 PropTypes，也就是在 React 對 props 做型別的建立，沒有用 TS，所以我打算之後學習完會把這個部落格加上 TS，順便實作一下。

對於寫型別的好處，就我目前的理解是大型專案，並且需要持續維護的專案，它絕對有一定的好處，畢竟要是突然出了個錯，然後是型別問題，那一定非常難找！！！在幾千行程式碼裡面找錯，但一定是萬萬沒想到型別～～～

---

## 什麼是 TypeScript

TypeScript 是 JavaScript 的超集，主要增加了靜態型別的特性。它可以幫助開發者在編譯時發現潛在的問題，並提供更好的開發體驗。

### 主要特點

1. **靜態型別檢查**：
    - 在編譯時檢查型別錯誤，降低執行階段錯誤的可能性。
2. **提升可維護性**：
    - 尤其適用於大型專案，型別定義可以讓程式碼更容易閱讀和維護。
3. **豐富的工具支持**：
    - TypeScript 提供了強大的 IDE 支援，例如 Visual Studio Code，可以提供即時的型別檢查和自動補全。
4. **向後相容性**：
    - TypeScript 可以編譯為純 JavaScript，因此可以在任何支持 JavaScript 的環境中執行。

---

## 安裝 TypeScript

### 安裝指令

使用 npm 來安裝 TypeScript，可以選擇全局安裝或專案本地安裝。

### 全局安裝

```bash
npm install -g typescript

```

此方式會讓 `tsc`（TypeScript 編譯器）可用於全局命令。

### 本地安裝

```bash
npm install --save-dev typescript

```

此方式適合針對特定專案進行管理，並且不會影響全局環境。

### 驗證安裝

執行以下指令來檢查是否安裝成功：

```bash
tsc --version

```

---

## Hello TypeScript

### 建立第一個 TypeScript 檔案

1. 建立一個檔案，命名為 `hello.ts`。
2. 在檔案中新增以下內容：

```tsx
const message: string = "Hello, TypeScript!";
console.log(message);

```

### 編譯與執行

1. 使用 `tsc` 將 TypeScript 檔案編譯為 JavaScript：

```bash
tsc hello.ts

```

1. 執行產生的 JavaScript 檔案：

```bash
node hello.js

```

### 注意事項

- **靜態檢查**：
TypeScript 會在編譯時進行靜態檢查。如果檔案中存在型別錯誤，會提示錯誤訊息。
- **即使報錯仍可編譯**：
預設情況下，TypeScript 即使發現錯誤，仍然會產生對應的 JavaScript 檔案。

### 阻止錯誤時的輸出

如果希望在編譯時發現錯誤時終止輸出，可以設定 `tsconfig.json` 檔案中的 `noEmitOnError`：

```json
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}

```