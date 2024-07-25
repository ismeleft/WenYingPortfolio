---
title: "【React】重新踏上React學習之路（九）：不要欺騙 hooks 的依賴項"
description: "useEffect 真的是一大學問，這就是本次言簡意賅的心得 🫠"
date: "2024-5-25"
tags: ["react","hook"]
---

## 前言

`useEffect` 真的是一大學問，這就是本次言簡意賅的心得 🫠

## 維護資料流的連動：不要欺騙 hooks 的 dependencies

🐛 欺騙依賴項會使得副作用明明有依賴到的資料發生更新時，卻錯誤跳過了應該要連動執行的同步化。

以下是書中的範例，並請 GPT 完整一下

```jsx
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []); // 錯誤：依賴項為空

  return <h1>{count}</h1>;
}

```

→ 你會發現數到 1 之後就停止了

原因是你欺騙 hooks 依賴項為空，讓它只在第一次渲染之後就停止了。

所以，我們想要如何修正？

```jsx
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [count]); // 正確：把會變化的數值放進依賴項

  return <h1>{count}</h1>;
}

```

🌟 每次渲染都會去比較依賴項的值是否相同，來決定是否執行副作用。

但是，把該依賴的值放進依賴項就夠了嗎？

當然不是。在這次的情境，每一秒都會重新渲染，這樣透過依賴項的比較其實是非常耗能的。

### 讓 effect 函式對於依賴的資料自給自足

💡我們希望讓 effect 函式不再依賴 count 的變化，避免 setInterval 頻繁的重新設定與清除

→ 利用 **updater function** 去記錄前一次的結果

```jsx
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prevCount => prevCount + 1); // 使用 updater function
    }, 1000);

    return () => clearInterval(id);
  }, []); // 正確：不依賴 count

  return <h1>{count}</h1>;
}

```

🧠 將資料本身的值與操作解耦

### 函式型別的依賴

💡 一般常見的誤解是依賴項不應該是函式。

```jsx
import { useState, useEffect } from 'react';

export default function SearchResults() {
  const [query, setQuery] = useState('react');

  async function fetchData() {
    const result = await fetch(`https://foo.com/api/search?query=${query}`);
    // 處理結果
  }

  useEffect(() => {
    fetchData();
  }, []); // 錯誤：依賴項不誠實，effect 函式使用到外部變數 query
}

```

那誠實之後呢？

```jsx
import { useState, useEffect } from 'react';

export default function SearchResults() {
  const [query, setQuery] = useState('react');

  async function fetchData() {
    const result = await fetch(`https://foo.com/api/search?query=${query}`);
    // 處理結果
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]); // 錯誤：fetchData 函式在每次 render 時都會產生新的函式
}

```

效能優化失敗，因為 fetchData 函式在每次 render 時都會產生新的函式，所以每次 render 的值不同。

💡改善方式一：

```jsx
import { useState, useEffect } from 'react';

// 將 fetchData 函式移到 component 外部
async function fetchData(query) {
  const result = await fetch(`https://foo.com/api/search?query=${query}`);
  // 處理結果
}

export default function SearchResults() {
  const [query, setQuery] = useState('react');

  useEffect(() => {
    fetchData(query); // 呼叫外部的 fetchData 函式
  }, [query]); // 在 query 改變時重新呼叫 fetchData
}

```

💡改善方式二：useCallback

```jsx
import { useState, useEffect, useCallback } from 'react';

export default function SearchResults() {
  const [query, setQuery] = useState('react');

  const fetchData = useCallback(async () => {
    const result = await fetch(`https://foo.com/api/search?query=${query}`);
    // 處理結果
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // 正確：使用 useCallback 包裝 fetchData 函式
}

```

如此一來只有在 query 改變時才會重新產生 fetchData 函式。

### 使用 linter 來輔助填寫 dependencies

- eslint-plugin-react-hooks
- ESLint

### Effect dependencies 常見的錯誤用法

> useEffect 的用途是將資料同步化到畫面渲染以外的副作用處理，而不是 function component 的生命週期 API。
> 

例如，我們用空陣列的依賴項，但其實不保證它只渲染一次。

🌟常見誤用一：在 function component 中模擬 ComponentDidMount

在 React 18 的嚴格模式且為開發環境的版本仍會被執行兩次。

以下示範也是請 GPT 提供的。

錯誤示範

```jsx
import { useEffect } from 'react';

export default function Component() {
  useEffect(() => {
    // 模擬 ComponentDidMount 的副作用
    console.log('Component mounted');
  }, []); // 錯誤：在 React 18 的嚴格模式下會執行兩次

  return <div>Component</div>;
}
```

正確示範

在開發模式下，React 18 的嚴格模式會導致 useEffect 執行兩次。為了確保僅在實際使用中執行一次，應該在 useEffect 中加上必要的清理或條件檢查。

```jsx
import { useEffect, useRef } from 'react';

export default function Component() {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      // 僅在初次渲染後執行一次
      console.log('Component mounted');
    }
  }, []); // 確保 effect 只執行一次

  return <div>Component</div>;
}

```

🌟常見誤用二：以 dependencies 來判斷副作用處理在特定資料發生更新時的執行時機

以下是書中的正確範例

![IMG_1285 JPG](https://github.com/user-attachments/assets/4e2609be-01b2-450a-9d7e-1a06b02fca39)