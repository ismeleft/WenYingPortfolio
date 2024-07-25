---
title: "【React】重新踏上React學習之路（十一）：難道是完結篇"
description: "默默把 React思維進化這本書看到最後，簡直對我來說是不可思議，如果沒有讀書會可能無法堅持下去吧，身為前端菜鳥，有一路破解一些迷思，只能抱持著感恩的心，雖然說肯定是邊學邊忘，不過我覺得很有趣的點是，在寫程式的時候原本有一些自己錯誤的執念，現在會默默改進。"
date: "2024-7-5"
tags: ["react","hook"]
---
## 前言

默默把 React思維進化這本書看到最後，簡直對我來說是不可思議，如果沒有讀書會可能無法堅持下去吧，身為前端菜鳥，有一路破解一些迷思，只能抱持著感恩的心，雖然說肯定是邊學邊忘，不過我覺得很有趣的點是，在寫程式的時候原本有一些自己錯誤的執念，現在會默默改進。

## useCallback 與 useMemo 的使用時機

### useCallback

- 🧠 不是為了優化效能，反而有可能讓效能變低
- 

```jsx

// syntax
const cachedFn = useCallback(fn, dependencies)
```

- 存在的意義？
    - 去記憶函式及依賴項，讓本次 render 與上一次 render 進行比較，相同的話則會忽略
- 可以避免不必要的函式產生嗎？
    - 🤯 錯誤，每次 render 都會 inline 建立一個函式，然後才做為參數傳給 `useCallback`
- 搭配 `useEffect` 使用，提供正確的依賴項才有辦法優化效能

### useCallback 範例

假設有一個表單元件，其中包含一個輸入框和一個按鈕，每次輸入變化時，按鈕的點擊事件不應該重新生成：

```jsx
import React, { useState, useCallback } from 'react';

function Form() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 使用 useCallback 記憶按鈕點擊事件
  const handleButtonClick = useCallback(() => {
    console.log('Button clicked with input value:', inputValue);
  }, [inputValue]);

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
}

export default Form;
```

```jsx
import React, { useState, useEffect, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 記憶化 handleCountChange 函式
  const handleCountChange = useCallback(() => {
    console.log('Count has changed:', count);
  }, [count]);

  // 使用 useEffect 偵聽 count 的變化
  useEffect(() => {
    handleCountChange();
  }, [handleCountChange]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;

```

### memo

- 快取 component render 的畫面結果並重用以節省效能
- HOC (Higher Order Component)
- 如果在 re-render 的時候，props 內容與上一次相同的話，就會跳過本次的 render ，用上一次快取過的畫面
- 如果 props 是函式類型，每次 render 都會被視為是不同的 → 效能優化失敗
    - 搭配 `useCallback` 使用，可以達到優化效能

### memo 範例

假設有一個計數器元件，只有在計數值改變時才重新渲染：

```jsx

import React, { useState, memo } from 'react';

const Counter = memo(({ count }) => {
  console.log('Counter component rendered');
  return <div>Count: {count}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

export default App;
```

### useMemo

- 跟 `memo` 其實沒有關係
- 節省計算複雜資料的效能

### useMemo 範例

假設有一個元件需要計算一個大型陣列的總和，我們可以使用 `useMemo` 來記憶計算結果：

```jsx

import React, { useState, useMemo } from 'react';

function SumComponent() {
  const [count, setCount] = useState(0);
  const [numbers] = useState(() => Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000)));

  const total = useMemo(() => {
    console.log('Calculating total');
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  return (
    <div>
      <h1>Total: {total}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count: {count}</button>
    </div>
  );
}

export default SumComponent;
```

- 再來複習一次 useMemo v.s. memo
    
    ### `useMemo`
    
    `useMemo` 是一個 Hook，它的作用是記憶化函數的返回值，只有在依賴項改變時才會重新計算。它的主要用途是避免在每次渲染時都執行耗時的計算，從而提升性能。
    
    用法示例：
    
    ```jsx
    import React, { useMemo } from 'react';
    
    function MyComponent({ number }) {
        const squaredNumber = useMemo(() => {
            console.log('Calculating square');
            return number * number;
        }, [number]);
    
        return <div>Squared Number: {squaredNumber}</div>;
    }
    
    ```
    
    在這個例子中，`useMemo` 確保了只有在 `number` 改變時才會重新計算平方值，而不是每次組件重渲染時都計算。
    
    ### `memo`
    
    `memo` 是一個高階組件（Higher Order Component），它用於優化函數組件的渲染。`memo` 通過淺比較（shallow comparison）來檢查組件的 props 是否改變，只有當 props 改變時才重新渲染組件。如果 props 沒有改變，`memo` 會跳過重渲染，從而提升性能。
    
    用法示例：
    
    ```jsx
    import React from 'react';
    
    const MyComponent = React.memo(({ number }) => {
        console.log('Rendering component');
        return <div>Number: {number}</div>;
    });
    
    export default MyComponent;
    
    ```
    
    在這個例子中，只有當 `number` prop 改變時，`MyComponent` 才會重新渲染。如果 `number` 沒有改變，則跳過重渲染。
    
    ### `useMemo` vs `memo`
    
    - `useMemo` 是用來記憶化函數的返回值，從而避免不必要的重新計算。適用於需要在渲染過程中執行一些計算或創建一些對象的場景。
    - `memo` 是用來記憶化整個組件的渲染結果，從而避免不必要的重新渲染。適用於純函數組件，當組件的輸入（props）相同時，跳過重新渲染。
    
    簡單來說，`useMemo` 是優化內部計算，`memo` 是優化整個組件的重渲染。它們可以搭配使用，以達到更好的性能優化效果。
    
    例如：
    
    ```jsx
    import React, { useMemo, memo } from 'react';
    
    const MyComponent = memo(({ number }) => {
        const squaredNumber = useMemo(() => {
            console.log('Calculating square');
            return number * number;
        }, [number]);
    
        console.log('Rendering component');
        return <div>Squared Number: {squaredNumber}</div>;
    });
    
    export default MyComponent;
    
    ```
    
    在這個例子中，`useMemo` 用於記憶化平方值計算，`memo` 用於記憶化組件渲染，兩者結合使用達到最佳性能優化。
    

## Hooks 的運作原理與設計思維

### Hooks 的資料存在哪裡？

- 儲存「最新資料狀態的畫面節點」 → fiber node
    - 在整個應用程式中只有一份，會不斷地被更新
    - 一個 component 實例就是指一個 fiber node

### 為什麼 hooks 的運作是依賴於固定的呼叫順序

- 我們在呼叫 `useState` 時只提供了唯一的一個參數，而沒有提供任何其他參數
- fiber node 會依 linked list 方式存放

→ 意味著如果在某次 render 跳過呼叫會導致後面呼叫的所有 hook 無法與前一次 render 時的 hook 做正確的對應

- 唯一合法的讓 hooks 不再運作的方式 → unmount 包含這些 hooks 的 component

### 為了解決鑽石問題

- 形成自然的樹狀
    - React 中的鑽石問題
        
        在軟體工程中，“鑽石問題”（Diamond Problem）通常是指在多重繼承中遇到的一個經典問題，尤其是在面向對象編程語言中。這個問題是由於多重繼承導致一個子類別從兩個不同的父類別繼承同一個祖先類別，從而產生模糊性和衝突。例如：
        
        ```
               A
              / \\
             B   C
              \\ /
               D
        
        ```
        
        在上面的結構中，類別 D 同時繼承了 B 和 C，而 B 和 C 又都繼承了 A。這會導致 D 無法確定應該繼承 A 的哪個版本。
        
        但是，在你的筆記上下文中提到的鑽石問題，應該與 React Hooks 的調用順序有關，而不是面向對象編程中的多重繼承問題。
        
        ### 在 React Hooks 中的 “鑽石問題”
        
        在 React 中，Hooks 必須按照相同的順序在每次渲染中被調用，這是因為 React 依賴調用順序來正確地關聯 Hook 狀態。如果某個條件分支或迴圈改變了 Hook 的調用順序，React 將無法正確地管理 Hook 狀態，導致應用錯誤。
        
        ### 範例說明
        
        以下是一個範例，說明如果 Hook 的調用順序被破壞會發生什麼：
        
        ```jsx
        import React, { useState, useEffect } from 'react';
        
        function ExampleComponent({ condition }) {
          // 正確的 Hook 調用順序
          const [count, setCount] = useState(0);
        
          if (condition) {
            // 錯誤的 Hook 調用順序：這裡的 useEffect 只有在 condition 為 true 時才會調用
            useEffect(() => {
              console.log('Condition is true');
            }, []);
          }
        
          // 這裡的 useEffect 調用順序可能會被破壞
          useEffect(() => {
            console.log('Count changed:', count);
          }, [count]);
        
          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
          );
        }
        
        ```
        
        在上面的範例中，如果 `condition` 為 `true`，則第二個 `useEffect` 的調用順序將會被破壞，因為 React 期望每次渲染中 Hook 的調用順序是一致的。
        
        ### 解決方案
        
        要避免這個問題，應該確保所有 Hook 都在組件頂層調用，不要放在條件分支或迴圈中。例如：
        
        ```jsx
        import React, { useState, useEffect } from 'react';
        
        function ExampleComponent({ condition }) {
          const [count, setCount] = useState(0);
        
          // 確保所有 Hook 都在組件頂層調用
          useEffect(() => {
            if (condition) {
              console.log('Condition is true');
            }
          }, [condition]);
        
          useEffect(() => {
            console.log('Count changed:', count);
          }, [count]);
        
          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
          );
        }
        
        ```
        
        這樣可以確保 Hook 的調用順序在每次渲染中都是一致的，從而避免鑽石問題或其他類似的問題。
        

### Hooks 運作原理範例

這個範例展示了在 React 中如何使用 Hooks 並解釋了它們的順序依賴性：

```jsx

import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Count has changed:', count);
  }, [count]);

  useEffect(() => {
    console.log('Text has changed:', text);
  }, [text]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

export default Counter;

```

在這個範例中，`useState` 和 `useEffect` 的呼叫順序是固定的。每次元件重新渲染時，React 會依照順序再次呼叫這些 Hooks。如果呼叫順序改變，React 會無法正確地對應之前和現在的 Hooks 狀態。