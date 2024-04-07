---
title: "【React】重新踏上React學習之路(三)：DOM與Virtual DOM.React element"
description: "我在思考讀書筆記應該要怎麼撰寫會是比較好的方式，只列出重點的話好像不是太好的方式，因為書裡的內容應該全部都是重點了吧XD 所以我想把心得的部分也記錄一下。
"
date: "2024-4-7"
tags: ["react"]
---

本篇筆記為 React思維進化 2-1~2-3 學習筆記。

## DOM與Virtual DOM 到 建立React Element

直接操作DOM是非常耗費效能的，因為操作DOM會需要連動瀏覽器渲染重繪畫面。 

→ 所以 React 出現了 Virtual DOM 的機制，可以減少直接操作 DOM 的機會

→ 透過新舊Virtual DOM 的比較，將其差異之處才更新到 DOM

回到 Virtual DOM ， Virtual DOM 與 DOM 都是樹狀結構，其中組成 Virtual DOM 的元素就是 React element，所以它也是組成畫面的最小單位 ( ⚠️ 不是 component )

💡 在 React 中，Component 是建構界面的基本單位，它可以包含一個或多個 React element。Components 可以將 UI 拆分成獨立可複用的片段，進而以組合的方式構建複雜的 UI。



我們可以透過 `createElement` 來創建 React element，老實說，初學 React 的時候我印象我有看過這個寫法，但因為後來知道 JSX 可以直接寫得像 HTML ，我就完全忘記了。現在才知道原來這樣就是 React element。



```jsx
import React from 'react';

const buttonReactElement = React.createElement(
	'button', //元素類型
	{id:'foo-btn'} //屬性
	'I am a button' // 子元素
	);
	
	
	範例取自p.24
```

透過 React 轉換後自動產生對應瀏覽器 DOM 的畫面結果。

建立後的 React element 是不可以修改的，因為這會導致新舊Virtual DOM 的比較出現問題。

## 渲染 React Element

創建了 React element 之後，接下來將它渲染到瀏覽器的 DOM 中。

這是透過 `ReactDOM.render()` 方法完成的，

### 渲染流程

React 元素的渲染過程如下：

1. 創建一個輸出實際 DOM 結果的容器
2. 建立 root 並指定容器
3. 建立用來描述畫面的 React element (`React.createElement()` 或 JSX 來創建 React element)
4. 以建立好的 root 來將 React element 繪製成實際的 DOM element (`ReactDOM.render()`)

我請 ChatGPT 所提供的範例：

假設你的 HTML 文件有一個空的 `<div>` 元素，如下所示：

```html
<div id="app"></div>
```

你可以通過以下方式將創建的 React element 掛載到這個 `<div>`：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const buttonReactElement = React.createElement(
  'button',
  { id: 'foo-btn' },
  'I am a button'
);

ReactDOM.render(buttonReactElement, document.getElementById('app'));

```

通常我們使用 CRA 都已經寫好了，所以可能不太知道，實際的樣子。

下方是相關的截圖

![](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/ed12ec17-f28c-4b07-b0a1-7e413b94b721)
![](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/2975b6a3-7f24-49ab-b4a0-bdd6a508ec07)
![](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/82faae72-3152-46f7-896b-c70e3a11a678)

### 關鍵點

- **不可變性：** 一旦你創建了一個 React element，就不能再更改它。
如果你想更新界面，你需要創建一個新的 React element 並再次呼叫 `ReactDOM.render()`。
- **效能優化：** 在實際應用中，頻繁地呼叫 `ReactDOM.render()` 來更新整個應用是非常低效的。這就是為什麼在 React 中使用 state 和 Hooks來管理只更新需要更改的部分，而不是整個應用的原因。
- **JSX：** 在實際開發中，直接使用 `React.createElement()` 可能會讓代碼變得很冗長且難以閱讀。因此，大多數 React 開發者傾向於使用 JSX，這是一種看起來像 HTML 的 JavaScript 語法擴展。

---

## Reconciler 與 renderer

- Reconciler 定義以及管理畫面結構描述 → 在這邊會比較出新舊React element 之間的差異之處，再交給 renderer 處理
- renderer 將畫面結構的描述繪製成實際畫面成品 →用於瀏覽器環境就是 `react-dom`
- React 可以藉由替換 renderer 來管理並產生瀏覽器以外的其他環境的 UI 畫面