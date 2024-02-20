---
title: "【React】重新踏上React學習之路(一)：基本概念"
description: "因為在個人專案中使用的是 Next.js ，所以也想重新學習純 React 的相關知識點。這次是純粹使用 React 官方文件進行學習，如果有不足之處，我可能再找其他學習資源進行補充。
"
date: "2024-2-21"
tags: ["react"]
---

## 前言

因為在個人專案中使用的是 Next.js ，所以也想重新學習純 React 的相關知識點。
這次是純粹使用 React 官方文件進行學習，如果有不足之處，我可能再找其他學習資源進行補充。

## 概述

以下內容基本上是 React 官網擷取的內容，或者些微調整後的內容。

### 建立與嵌套的組件

React 元件是由 js function 所組成，元件必須以大寫開頭。

class 則需寫為 className。

舉例：

```jsx
MyButton元件創建後，嵌套至App中

function MyButton() {
  return (
    <div>
      <button>Here is a button.</button>
    </div>
  );
}

function App() {
  return (
    <div>
        <p>Hello World.</p>
        <MyButton />
    </div>
  );
}

export default App;
```

### JSX

必須要有一個共用的父層標籤，可以是<></> 或是<div></div>

書寫的方式與HTML相似

### 新增樣式

跟一般原生的 HTML CSS 類似

React 沒有規定如何新增 CSS 檔案。

在 JS 中新增 CSS 樣式，

```jsx
export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

`style={{}}`不是特殊的語法，而是JSX 大括號`{}`內的常規物件`style={ }`。

### 顯示數據

花括號「轉回」JavaScript，

```jsx
return (
  <h1>
    {user.name}
  </h1>
);
```

### 條件渲染

可以用 if 或是三元運算子。 三元運算子較為常見。

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);

或是

<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

→ 延伸補充：短路邏輯

```jsx
<div>
{isLoggedIn && <AdminPanel />}
</div>
```

在這個例子中， **`isLoggedIn`** 是一個布林值，可能是 **`true`** 或 **`false`**。這段代碼的意思是：

- 如果 **`isLoggedIn`** 為 **`true`**，則JavaScript的邏輯 **`&&`** 運算符的行為將評估並渲染  **`<AdminPanel />`** 組件。
- 如果  **`isLoggedIn`** 為 **`false`**，則由於JavaScript的邏輯短路行為， **`<AdminPanel />`** 組件不會被渲染，也就是說， **`&&`** 運算符後面的表達式（在這個案例中是  **`<AdminPanel />`**  組件）將不會被評估或渲染。

這種方式提供了一種非常簡潔的方法來在React中進行條件渲染，尤其是當你只需要在某個條件為真時渲染一個元素，而不需要在條件為假時渲染另一個元素（即沒有 **`else`** 分支）的時候。

### 渲染列表

常用 array.map() 的方式進行。

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

- key 屬性作為唯一識別，盡量不要以 index 進行，因為容易在做資料順序調整、刪減時，導致問題發生。

### **回應事件**

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### 狀態更新

範例為計數器。

```jsx
import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div>
      <button onClick={handleClick}>Clicked {count} times.</button>
    </div>
  );
}
```

元件的狀態並不會干擾其他元件，就算是同個元件重複引入，也不會互相影響。 →除非你要在元件中共享數據，就需要改為父層來管理狀態，再將 `props` 傳遞至子級。

![react-props](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/5985e4c2-ae6b-497e-805e-c20c41c2eb8a)

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

//傳遞下來的訊息稱為props。現在該MyApp元件包含count狀態和handleClick事件處理程序，並將它們作為 props 傳遞給每個按鈕。
```

```jsx
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

### 使用 Hooks

以 開頭的函數`use`稱為*Hooks*。