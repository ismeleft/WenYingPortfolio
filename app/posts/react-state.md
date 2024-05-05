---
title: "【React】重新踏上React學習之路（六）：state 的進擊之路"
description: "2-4 & 2-5 JSX的部分會與上一篇 React element 比較有關聯，因為現在我們都寫 JSX，所以反而會不知道它的背後邏輯運作。
"
date: "2024-4-27"
tags: ["react"]
---

本篇筆記為 React思維進化 3-1~3-4 筆記。

## 前言

3-1 及3-2，其實應該都有接觸過，只是沒感覺？3-3~3-4 其實之前已經有看過，是針對資料流的 immutable 做詳細的說明。

## 如何在子 component 裡觸發更新父 component 的資料

> React 不存在也不需要「針對子 component 向上溝通父 component 的專門機制 」
> 

在父 component 建立 state 後，當作 props 傳遞到子 component 。

→ 這樣的過程會讓子 component 的資料更新 → 觸發 父 component re-render → 子 component re-render。

```jsx
import React, { useState } from 'react';
import Child from './Child';

function Parent() {
    const [count, setCount] = useState(0); 
    
    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <Child onIncrement={incrementCount} />
        </div>
    );
}

export default Parent;

```

```jsx
import React from 'react';

function Child({ onIncrement }) {
    return (
        <button onClick={onIncrement}>Increment</button>
    );
}

export default Child;

```


💡 提升狀態（lifting state up）
其實我們滿常這樣做的？把狀態管理放到父組件，由父組件傳遞資料到子組件。
但如果是大型專案，會傾向使用狀態管理工具，避免props 的過度傳遞（prop drilling）。



## 深入理解 batch update 與 updater function

- batch update：簡單來說就是你呼叫多次的 `setState` ，只會記錄最後一次做渲染。
    - 防止半成品的資料狀態進行 render。
    
    ```jsx
    function Counter() {
      const [count, setCount] = useState(0);
    
      const incrementMultiple = () => {
        setCount(count + 1); 
        setCount(count + 1); 
        setCount(count + 1);  // 結果只紀錄最後一個
      };
    
      return (
        <div>
          <h1>Count: {count}</h1>
          <button onClick={incrementMultiple}>Increment</button>
        </div>
      );
    }
    ```
    
    - 如果有特殊需求想要 `setState` 方法的呼叫後立即觸發 re-render，並立刻觀察這次 re-render 所造成的實際 DOM 畫面的結果。可以用 `flushSync` 。
        
        使用 `flushSync` 的例子：
        
        假設有一個情況，你需要在狀態更新後立即測量某個DOM元素的尺寸，你可以使用`flushSync`來確保狀態更新和DOM更新立即發生，從而可以立即讀取新的DOM狀態。
        
        ```jsx
        import ReactDOM from 'react-dom';
        import { useState } from 'react';
        
        function MeasureExample() {
          const [height, setHeight] = useState(0);
          const divRef = useRef(null);
        
          const updateHeight = () => {
            setHeight(Math.random() * 100 + 100); // 隨機更新高度
          };
        
          const measureAndSetHeight = () => {
            // 強制立即更新狀態和DOM
            ReactDOM.flushSync(() => {
              updateHeight();
            });
        
            // 立即測量更新後的高度
            if (divRef.current) {
              console.log('Measured height:', divRef.current.clientHeight);
            }
          };
        
          return (
            <div>
              <div ref={divRef} style={{ height: `${height}px`, background: 'blue' }}>
                Some content
              </div>
              <button onClick={measureAndSetHeight}>Update and Measure Height</button>
            </div>
          );
        }
        
        ```
        
        **需要注意的地方**
        
        1. **性能影響**：使用`flushSync`會迫使React立即執行更新，這可能會影響到應用的整體性能，尤其是在高頻率更新的情境中。因此，除非真的有必要，通常不建議頻繁使用`flushSync`。
        2. **避免過度使用**：在很多情況下，異步更新是合理且有效的。通常，你應該讓React管理渲染的時機。只有在特定情況下，比如需要根據最新的DOM狀態執行後續計算或動畫時，才考慮使用`flushSync`。
        3. **代碼複雜性**：過度依賴`flushSync`可能會增加代碼的複雜性和難以維護。確保在使用之前評估是否有其他替代方法可以達到相同的目的。
        
- updater function：簡單來說是根據前一次的 `setState` 後的結果，做這一次的 `setState` 。
    
    ```jsx
    function Counter() {
      const [count, setCount] = useState(0);
    
      const incrementMultiple = () => {
        setCount(prevCount => prevCount + 1); // 第一次增加
        setCount(prevCount => prevCount + 1); // 第二次增加
        setCount(prevCount => prevCount + 1); // 第三次增加
      };
    
      return (
        <div>
          <h1>Count: {count}</h1>
          <button onClick={incrementMultiple}>Increment by 3</button>
        </div>
      );
    }
    
    ```
    

## 維持 React 資料流可靠性的重要關鍵：immutable state

我們不應該去讓原先的物件或陣列型別的資料變得可變動，而是產生新的物件或陣列去取代舊的。

→ 因為如果變得可變，會導致資料流的可靠性被破壞。

- 保持 state 的 immutable
    - 呼叫 setState 方法時的資料新舊檢查需求 （React 會用 `Object.is()` 檢查）
        
        →只會看既有資料跟新資料的參考是否相同，完全不會檢查物件或陣列中的內容細節是否改變。
        
        →如果用 mutate 的方式去修改 state 資料，那即便呼叫 setState 也不會有對應的畫面更新。
        
    - 過去 render 的舊 state 仍有被讀取的需求，功能上比如像是 undo/redo
    - React 效能優化機制的參考檢查需求
        - `useEffect`、`useCallback`、`useMemo`、`React.memo`
        

## Immutable update

以下是相關 immutable 的方式：

- **物件＆陣列**
    - 複製物件＆陣列的內容：利用spread （擴展運算符）
    - 解構賦值配合 rest 語法來剔除物件的特定屬性
    - 在陣列中插入新項目 → 用 slice()
    - 剔除陣列項目 → 用 filter()
    - 更新或取代陣列項目 →用 map()
    
    - 陣列排序的 sort().reverse() 是會影響既有陣列
    - 如果是巢狀結構，淺拷貝後只有複製第一層的屬性。
    

💡 Immutable 的重點並非在於要深度複製所有層級的資料，而是沿用沒有內容更新需求的參考，新建有內容更新需求的參考。


💡 常用 … 或是大量用 …容易導致結構變得複雜，作者在書中有提到常用的第三方套件，如 Immer 、ramda、lodash/fp

