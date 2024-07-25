---
title: "【React】重新踏上React學習之路（十）：更加了解副作用！"
description: ""
date: "2024-6-8"
tags: ["react","hook"]
---

## React 18 的 effect 函式在 mount 時為何會執行兩次

> useEffect 的用途是將資料同步化到副作用處理
> 
- useEffect 的依賴項作為一種效能優化，其跳過副作用的行為不是邏輯保證的。

🧠 在 React18，即使依賴項是空陣列，effect 函式也可能被執行兩次

→ 只有在嚴格模式且為開發環境版本才有可能會發生。

→ 是為了幫助開發者檢查到不夠安全可靠的副作用處理。

以下為作者提供的範例

[QR code 5-3-6](https://codesandbox.io/p/sandbox/qr-code-5-3-6-74tldf?file=/src/App.jsx)

- Reusable state
    - component 必須要設計的有足夠的彈性來多次 mount 與 unmount 也不會壞掉
    - 在 CRA 或是 Next.js 有內建 Fast Refresh (hot module replacement)，當使用者一存檔的時候，瀏覽器就可以在不重新整理頁面的情況下即時套用 component 程式碼的變動。
    - 在未來版本的 React 中，從畫面移除 component 之後，仍然可以保留其 state 狀態以便需要時重新 mount 後再次還原 state。

## 副作用處理的常見情境設計技巧

- 副作用設計的問題
    - 疊加性質而非覆蓋性質的操作
        - 如果沒有適當的使用 clean up 函式來做相關的取消或逆轉處理，可能在多次重複執行後結果會不如預期。
    - Race condition （競態條件) 問題
        - 當副作用處理涉及與非同步的後續影響，副作用被多次執行的順序不一定與非同步事件的回應順序相同。
        - 解決這個問題的方式：
            1. 每次 render effect 函式都用一個變數(為布林值)來記憶
            2. 如果為 false 才繼續執行，否則就略過
            3. 建立 clean up 函式，將變數改回 true
            
            ```jsx
            // chatGPT 提供之範例
            import React, { useEffect, useState } from 'react';
            
            async function fetchData() {
              const response = await fetch('/api/data');
              const data = await response.json();
              return data;
            }
            
            function FetchComponent() {
              const [data, setData] = useState(null);
            
              useEffect(() => {
                let isActive = true;
            
                const fetchAndSetData = async () => {
                  const result = await fetchData();
                  if (isActive) {
                    setData(result);
                  }
                };
            
                fetchAndSetData();
            
                return () => {
                  isActive = false;
                };
              }, []);
            
              return <div>Data: {data}</div>;
            }
            
            export default FetchComponent;
            
            ```
            
            🌟 第三方套件：
            
            - React Query
            - SWR
            - React apollo
            
    - Memory leak 問題
        - 監聽或訂閱事件
            - `addEventListener`
            - `setTimeout`
            - `setInterval`
        - 正確解決方式：使用 cleanup 函式
            
            ```jsx
            // chatGPT 提供之範例
            import React, { useEffect } from 'react';
            
            function EventListenerComponent() {
              useEffect(() => {
                const handleResize = () => {
                  console.log('Window resized');
                };
            
                window.addEventListener('resize', handleResize);
            
                return () => {
                  window.removeEventListener('resize', handleResize);
                };
              }, []);
            
              return <div>Event Listener Component</div>;
            }
            
            export default EventListenerComponent;
            
            ```
            
        
    - 控制外部套件
        
        ```jsx
        // 初始化 －－ 書中範例
        // 以自己撰寫的邏輯去確保外部套件的初始化動作不會重複執行。
        // 即使這個 effect 函式被執行多次也不會因此壞掉。
        
        import {useEffect,useRef} from 'react';
        import {createMapManager} from 'fake-map-sdk';
        
        export default function App(){
        	const mapManagerRef =useRef(null);
        	
        	useEffect(()=>{
        		if(!mapManagerRef.current){
        			mapManagerRef.current = createMapManager();
        		}
        	},[])
        }
        ```
        
    
    - 不該是副作用處理：使用者的操作所觸發的事情
        
        🤯 這不是我嗎？
        
        ```jsx
        // 應該被寫在使用者所觸發的事件中，而不是隨著 render 自動執行的 effect 中
        // 不應該把 fetch api 的路徑、方法、body 請求體都放到 effect 函式中
        ```
        

### 既然我們不能保證 effect 函式被執行的次數，那我們在哪些情境下應該要避免使用 effect 函式？

- 當僅僅需要在使用者操作時觸發某些操作時。
- 當 effect 僅僅依賴於 component 本身的內部狀態且不涉及任何副作用時。
- 當需要在 component 每次渲染時執行相同的邏輯而不需要在 DOM 更新後執行某些操作時。