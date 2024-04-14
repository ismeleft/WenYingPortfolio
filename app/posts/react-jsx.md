---
title: "【React】重新踏上React學習之路(四)：JSX.單向資料流與一律重匯渲染策略"
description: "2-4 & 2-5 JSX的部分會與上一篇 React element 比較有關聯，因為現在我們都寫 JSX，所以反而會不知道它的背後邏輯運作。
"
date: "2024-4-13"
tags: ["react"]
---

本篇筆記為React思維進化這本書的2-4~2-6筆記。

## 前言

2-4 & 2-5 JSX的部分會與上一篇 React element 比較有關聯，因為現在我們都寫 JSX，所以反而會不知道它的背後邏輯運作。

## JSX

簡單來說，它是語法糖，因為設計方式讓它可以用類似 HTML 的寫法，而不是在 JS 中撰寫 HTML。

- 利用 Babel 這種轉譯器來讓 `JSX` 在 buildtime 的時候就能轉為 `React.createElement` 的寫法，然後在 runtime 就直接使用轉譯好的文件。
- 推薦回頭看p.63 的圖，從開發環境到瀏覽器環境 JSX 與 DOM 與 Virtual DOM的關係。

![1](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/a7027874-0052-4064-b531-49bfaec4c9dc)

### JSX語法規則與畫面渲染的實用技巧

- JSX 不像 HTML 具有容錯性，它需要有嚴格的標籤閉合，就算沒有子元素，至少也需要自我閉合
- JSX 中的表達式需要用 {} 包裹
    - 每個表達式都會被視為一個獨立的子元素
        - 好處是在進行 React elemnt 新舊比較差異時能進一步縮小操作的範圍
        
        
        ```jsx
        const buttonElement = (
        	<button onClick={handleButtonClick}>
        		數字變數:{number}，表達式:{number*99}
        	</button>
        );
        
        // 轉譯後
        const buttonElement =React.createElement(
        	'button',
        	{onClick:handleButtonClick},
        	'數字變數:',
        	nember,
        	'，表達式:',
        	number*99
        );
        
        // 取自本書 p.70 範例
        ```
        

- 畫面渲染邏輯
    - 動態列表渲染
        - Array.map
        
        
        ```jsx
        {items.map(item)=><li>我是{item}</li>}
        
        // 轉譯後
        items.map((item)=> React.createElement('li',null,'我是',item))
        ```
        
        - React 要求在每個 React Element 都需要有唯一、不重複的key屬性 →幫助React識別哪些項目已經改變、新增或是刪除，還能提升渲染效率和組件狀態的穩定性
    - 條件式判斷渲染
        - 常用 `&&` 運算子來進行條件渲染
            - 運算子左邊的值為 truthy 時，回傳運算子右邊的值
                - 
                
                ```jsx
                {isLoggedin && <h1>welcome!</h1>}
                ```
                
                
                💡 falsy value 有哪些？
                
                ![falsy value](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/e5ec226e-3028-4705-aa2e-8622f0a544c0)
                
                
                [假值 - MDN Web 文档术语表：Web 相关术语的定义 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)
                
        
        - 常用三元運算子來進行條件渲染
            - 
            
            ```jsx
            {isLoggedin?<h1>member</h1>:<h1>guest</h1>}
            ```
            
    - Fragment → 第一層只能有一個元素，為了避免產生多餘無意義的元素時可以使用
        - 通常用 `<> </>`

## 單向資料流與一律重繪渲染的策略

- 單向資料流：只有資料更新時才會更新畫面，並且不能逆向去修改資料的源頭
- React :
    - 首次渲染：完整產生 React element所對應全部的 DOM element
    - 更新畫面的渲染：重新渲染一版新的跟舊的比較後，再去操作對應的 DOM element