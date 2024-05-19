---
title: "【React】重新踏上React學習之路（八）：副作用是什麼"
description: "useEffect 這個 React Hook 基本上是剛接觸 React 的時候就一定會碰到的其中之一的觀念，我只記得當時的我只知道打 API 要用 useEffect ，至於具體觀念，大概知道有副作用，只是副作用是什麼，看過就忘記了。這次藉由讀書會的學習，重新認識副作用。"
date: "2024-5-18"
tags: ["react"]
---
本篇筆記為 React思維進化這本書 5-1~5-2 的讀書筆記。

## 前言

`useEffect` 這個 React Hook 基本上是剛接觸 React 的時候就一定會碰到的其中之一的觀念，我只記得當時的我只知道打 API 要用 `useEffect` ，至於具體觀念，大概知道有副作用，只是副作用是什麼，看過就忘記了。這次藉由讀書會的學習，重新認識副作用。

## React 中的副作用處理：effect 初探

> useEffect 不是 component function 的 生命週期 API



1. **Effect 的定義與影響**
    - 副作用（side effects）指的是影響外部世界或依賴於外部系統的操作，這些操作超出了當前函數執行環境的範圍。
    - 常見的副作用包括數據獲取、訂閱、手動更改 DOM 和定時器。
    
    老實說我還滿疑惑的，單純這麼定義副作用，但我卻覺得很模糊。所以我針對我的疑問詢問的 chatGPT
    

    1. 副作用是跟當前畫面無關的東西嗎？ 
        1. 副作用（side effects）在 React 中指的是那些不屬於純函數範疇的操作，這些操作可能會影響外部世界或依賴於外部系統。
            
            簡單來說，副作用是指那些在組件渲染過程中，需要與外部世界進行互動的操作。這些操作往往會超出 React 的渲染範圍，因此需要特別的處理。
            
        2. 副作用並不完全是與當前畫面無關的東西。實際上，許多副作用是為了更新畫面而存在的，比如數據獲取後需要更新 UI。但這些操作在 React 的函數組件中是需要特別處理的，因為它們不是純函數的行為。

        
    2. 非同步的互動都可以是副作用嗎？
        1. 大部分非同步的操作都可以視為副作用。這些操作通常包括數據獲取、訂閱事件、定時操作等。這些操作通常是異步的，因為它們需要等待外部系統的回應或操作完成。


    
    
2. **副作用帶來的挑戰**
    - 副作用可能降低預測性、增加測試難度、高耦合度，並使程式碼難以維護和理解。
    - 在 React component function 中，多次執行的副作用可能導致不可預測的結果，拖慢甚至阻塞函數的計算流程。


- 在 React 中的 hook api
    - `useEffect` 用來清除或逆轉副作用造成的影響
    
    ```jsx
    // syntax
    
    useEffect(effectFunction, dependencies);
    ```
    
    - 定義一個 effect 函式來處理副作用
    - cleanup 函式來清理副作用（如果有需要的話）
    - 指定 effect 函式的依賴陣列 → 跳過不必要的副作用處理
    - 依賴陣列決定 Effect 函數的執行時機：
        1. 沒有依賴陣列：每次重新渲染都會執行。
        2. 空陣列：只會在首次渲染時執行。
        3. 有依賴陣列：只有當依賴項發生變化時才會執行。
        
    


    ```markdown
    步驟：
    
    1. 首次 render : 以本次 render 的 props & state 產生對應的畫面結構
    如果非首次，還會以前一次 render 的 react element 進行新舊比較
    
    2. 瀏覽器完成實際畫面的 DOM 繪製
    
    3. 執行前一次 render 的 cleanup 函式（首次渲染會跳過）
    // 這邊清除的是前一次所「紀錄」的資料，每一次渲染的資料都是獨立的
    
    4. 執行本次 render 版本的 effect 函式
    ```
    


    ### 簡易範例
    
    ```jsx
    import React, { useState, useEffect } from 'react';
    
    function Counter() {
        const [count, setCount] = useState(0);
    
        // useEffect來處理副作用：更新網頁標題
        useEffect(() => {
            // 設置網頁標題為當前計數
            document.title = `You clicked ${count} times`;
    
            // Cleanup function
            return () => {
                // 在組件重渲染前或卸載前，執行清理操作
                console.log(`Cleaning up previous count: ${count}`);
            };
        }, [count]); // 依賴於count的變化
    
        return (
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
        );
    }
    
    export default Counter;
    
    ```
    
    ```jsx
    import React, { useEffect, useState } from 'react';
    
    function FetchDataComponent() {
        const [data, setData] = useState(null);
    
        useEffect(() => {
            fetch('https://api.example.com/data')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
        }, []); // 空陣列表示這個 effect 只會在組件首次渲染時執行
    
        return (
            <div>
                {data ? <p>{JSON.stringify(data)}</p> : <p>Loading data...</p>}
            </div>
        );
    }
    
    ```
    
    ```jsx
    import React, { useEffect, useState } from 'react';
    
    function SubscriptionComponent() {
        const [status, setStatus] = useState('Not connected');
    
        useEffect(() => {
            const eventListener = (event) => {
                setStatus('Connected');
            };
    
            window.addEventListener('connect', eventListener);
    
            // 清理函式
            return () => {
                window.removeEventListener('connect', eventListener);
            };
        }, []);
    
        return <p>Status: {status}</p>;
    }
    
    ```
    

### useEffect 其實不是 function component 的生命週期 API

again and again，作者再度提了這點 😆

本章講了滿多我以前的認知觀點，例如我以前認為「Dependencies 是用來控制執行時機」，但現在才知道原來不是。

- `useEffect` 是一種宣告式的同步化
- `useEffect` 的出現解決了以前 class component 常容易產生的 bug，因為生命週期會需要以指令式的概念去思考 `didMount`、`didUpdate`、`willUnmount`，如果漏了某個部分就很容易造成 bug，及記憶體洩漏的風險
- 根據 render 中的 props 和 state 資料來同步化那些與畫面無關的東西，也就是副作用的處理。
- **`useEffect`** 的依賴陣列主要用於效能優化，而非控制執行時機。即使沒有依賴陣列，畫面渲染也應該能正常執行。
- dependencies 為空陣列時 → 只有首次渲染會執行
    - 必須確認真的沒有任何依賴的時候才填寫為空陣列，不應該希望 effect 函式只執行一次而給空陣列。