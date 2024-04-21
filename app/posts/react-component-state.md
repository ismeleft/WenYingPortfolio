---
title: "【React】重新踏上React學習之路（五)：Component 與初探 State"
description: "就算 Component 、 State 這種老熟的好朋友，就像太久沒見面，一看想說：嗯？你居然是個充滿細節的人。這是我讀完這幾個小單元的心得。"
date: "2024-4-20"
tags: ["react"]
---

本篇為 React思維進化這本書的2-7~2-9筆記。

## 前言

就算 Component 、 State 這種老熟的好朋友，就像太久沒見面，一看想說：嗯？你居然是個充滿細節的人。這是我讀完這幾個小單元的心得。

## Component 元件

- 抽象化、重用
- component function : 首字大寫 → 一段產生特定結構的 React element 的流程
    - 首字大寫的原因是為了滿足 JSX 轉譯的需求，也是符合 React 社群開發上的命名慣例

(JSX語法轉譯後createReactElement() → component function 的回傳值就是 React element )

- React element 的類型也可以是自定義的 component
- 藍圖 → 實例(instance) (舉例是配方，以及用配方調製出的飲料，飲料間是各自獨立）
- Import & Export component
    - default export
        
        ```jsx
        1. export default Mycomponent 
        2. export default function Mycomponent
        
        ->
        
        import Mycomponent from "./Mycomponent"
        ```
        
    - named export
        
        ```jsx
        在同一個檔案中可以
        export function componentA
        export function componentB
        
        然後要引入的時候
        import {componentA,componentB} from './Mycomponents'
        ```
        
- Props：component 的屬性 （舉例：飲料配方的props → 甜度、冰塊）
    - 呼叫 component 時傳入 props
        - props 會自動被打包成一個 JS 物件，並會在實際執行 component function時作為函式的參數導入
            
            
            💡 component 像是殼，props 則是資料。
            
            
            
        - props 的資料型別，React 沒有限制。
            
            
            💡 開發中通常使用 **`PropTypes`** 或 TypeScript 來對 props 進行類型檢查。
            
            
        - 有兩種寫法
            - 傳入的時候直接寫props
            - 傳入的時候直接解構
                
                ```jsx
                // Welcome.js
                
                // 引入 React 庫
                import React from 'react';
                
                // 定義一個函數組件 Welcome
                function Welcome(props) {
                  // 從 props 中取出 name 並顯示
                  return <h1>Hello, {props.name}!</h1>;
                }
                
                export default Welcome;
                
                或是
                // 定義一個函數組件 Welcome
                function Welcome({name}) {
                  // 從 props 中取出 name 並顯示
                  return <h1>Hello, {name}!</h1>;
                }
                
                ========
                
                // App.js
                
                import React from 'react';
                import Welcome from './Welcome'; // 引入 Welcome 組件
                
                function App() {
                  return (
                    <div>
                      {/* 將 name prop 傳遞給 Welcome 組件 */}
                      <Welcome name="Alice" />
                      <Welcome name="Bob" />
                    </div>
                  );
                }
                
                export default App;
                
                	
                
                ```
                
        - props 是唯讀，且不可被修改 （為了維護單向資料流的可靠性）
            
            💡 開發環境版本的 React 會把 props 物件先以 object.freeze(props) 凍結起來
            
            
        
        - 修改 props 但無法被 React 偵測到的危害範例 (p.125)
        - 特殊的 prop: `children`
            - children 的 props 通常寫在開標籤和閉標籤之間
            
            ```jsx
            <div>{props.children}</div>
            
            // 可以透過 props.children 來取得 children prop 的值
            ```
            
            ```jsx
            // Container.js
            
            import React from 'react';
            
            function Container(props) {
              return (
                <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                  {props.children}
                </div>
              );
            }
            
            export default Container;
            
            // App.js
            
            import React from 'react';
            import Container from './Container'; // 引入 Container 組件
            
            function App() {
              return (
                <div>
                  <Container>
                    <h1>Welcome to My App</h1>
                    <p>This is a simple example of using the children prop.</p>
                  </Container>
                  <Container>
                    <img src="https://example.com/photo.png" alt="Example" />
                  </Container>
                </div>
              );
            }
            
            export default App;
            
            ```
            
            - 常用於設計「畫面容器型」的 component
            - 有點像 Next.js 專案中寫道的 `{children}`
                - 在 Next.js 的項目中，**`children`** 通常用於創建布局組件，這些組件包裹著每個頁面的特定內容。這種方式允許開發者在整個應用中重用相同的布局結構，同時可以在不同的頁面中嵌入特定的內容。

## State

1. 什麼是 state ?
    1. 需要一種臨時可更新的資料來記憶應用程式當下的狀態，並且在資料發生更新時也去更動對應的畫面。
2. 更新 state 資料的動作作為發起重繪機制的啟動點。
3. state 必須要依附在 component內才能記憶並維持狀態資料，發起重繪的時候，只會重繪 component 內的畫面 （包含子孫代 cpmponent )
4. useState 的初探
    1. 語法
    
    ```jsx
    const [state,setState]=useState(initialState);
    
    // state 代表該次渲染當前的值，setState 則是用來更新 state 的函式
    ```
    
    → 資料改變 → re-render
    
    > 這邊的re-render，並不是渲染實際的 HTML DOM，而是重新執行一次 component function 來產生一份新版的 react element。
    > 
    
    > 呼叫 setState 方法後 React 並不會立即觸發 re-render，而會等正在執行的事件內的所有程式後都結束後才會觸發 re-render，這也是為什麼很常聽到 setState 方法是非同步的由來。
    > 
    
    📌  如果不透過 setState 來更新 state，而是直接去修改值，會導致不會產生對應的畫面。 
    

## Reconciliation

小複習：

![Untitled](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/9f0ce5ce-65bd-4d7d-b4ae-a1f411ffdcb9)

跟之前書中提到的Reconciler 基本上是一樣的東西，而是把流程講得更加詳細

呼叫 setState → React 會以 Object.is()去判斷新舊 state 是否相同

- 相同 → 中斷流程
- 不同 → 觸發 component re-render →產生新的一版 React element → 新舊差異比較 →渲染到實際的 HTML DOM
    - 常會連帶觸發子 component