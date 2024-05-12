---
title: "【React】重新踏上React學習之路（七)：class component 與 function component 的小故事 "
description: "原本想說 class component ，「蛤？」我有需要認識它嗎？現在也用不到了，不過仔細閱讀的時候覺得還滿有意思的，還有知道為什麼現在推薦使用 function component 的原因，我自己覺得感受上還不錯。知道原因之後更慶幸現在已經可以不用踩雷了？"
date: "2024-5-12"
tags: ["react"]
---

本篇為 React思維進化 4-1~4-3 的筆記。

## 前言

原本想說 class component ，「蛤？」我有需要認識它嗎？現在也用不到了，不過仔細閱讀的時候覺得還滿有意思的，還有知道為什麼現在推薦使用 function component 的原因，我自己覺得感受上還不錯。知道原因之後更慶幸現在已經可以不用踩雷了？

## Component 的生命週期

在面試的那時候也有準備了這部分的知識，有點像是知道組件從生到死的歷程。這部分的話現在的 function component 並沒有提供生命週期的 API。

### Mount：

首次渲染，React element 創建後放至到瀏覽器真實的 DOM 結構中。

### Update：

當 state 發起更新或是父 component 發生 re-render 觸發該 component re-render，執行 component function 產生新的 react element 進行新舊比較再對應至瀏覽器真實的 DOM 結構中。

### Unmount：

當該位置上 component 類型的 react element 在 re-render 後的新畫面不再出現時，React 會進行副作用的清理，並將 component 實例對應的實際 DOM element 從瀏覽器中清除。

```jsx
useEffect(() => {
  console.log('Component did mount');
  return () => {
    console.log('Component will unmount');
  };
}, []);

// useEffect 可以模仿出類似生命週期的效果，但他並不是生命週期的 API
```


---
## Function component 與 class component 的關鍵區別

### class component

簡單來說的話，就是在非同步的事件下， class component 因為資料流的緣故，會用到「`this.props`」，而這部分會導致資料更新變成 mutate 的，也會導致資料會被覆蓋掉。雖然這部分可以解決，但一不小心就會踩雷。

- 以 `this.props` 讀取 props 有可能打斷資料流的關聯性與可靠性。

### function component

會自動捕捉 render 時的資料，因為閉包的特性，所以 event handler 函式與該次 render 所取得的 state 與 props 進行綁定。

## 每次 render 都有自己的 props、state 與 event handler 函式

```jsx
const [count,setCount] = useState(0)

<p>{count}</p>
```

> {count} 的值從哪邊而來？

從useState中取出的值，並放到新宣告的 count 變數。

每次 render 都會傳入全新的 props 物件做參數，並預期它的內容是永遠不變的。

- React 不會去監聽資料的變化，必須主動呼叫 setState有資料需要更新並觸發 re-render。
- 每次 render 都會捕捉屬於自己版本的 props 與 state 值作為快照，這個值只存在該次 render 的常數，內容永遠不變。
- Immutable + Clousure → 資料更穩定