---
title: "【React】重新踏上React學習之路(二)：Thinking in React"
description: "因為在個人專案中使用的是 Next.js ，所以也想重新學習純 React 的相關知識點。這次是純粹使用 React 官方文件進行學習，如果有不足之處，我可能再找其他學習資源進行補充。
"
date: "2024-3-16"
tags: ["react"]
---

本篇為下方連結的學習，以及未清觀念的釐清與補充。

[Thinking in React – React](https://react.dev/learn/thinking-in-react)

這篇學習起來我覺得還滿不錯，主要有兩個觀念可以再次複習

1. `Props`
    1. 定義：**`props`** 用於傳達信息和回調函數給組件，使得組件可以動態地渲染數據或者根據這些數據執行某些操作。
    2. 單向數據流，由父層管理狀態傳遞到子層
    3. `Props`的用法
        1. 這邊我請ChatGPT提供一個範例
        
        ### 基本用法
        
        1. **傳遞數據**：你可以將 `props` 視為組件的配置參數，從父組件傳遞到子組件。子組件通過 `props` 接收從父組件傳來的數據。
            
            ```jsx
            function Welcome(props) {
              return <h1>Hello, {props.name}</h1>;
            }
            
            const element = <Welcome name="Sara" />;
            
            ```
            
            在這個例子中，`Welcome` 組件透過 `props` 接收了一個名為 `name` 的參數，並在渲染時使用它。
            
        2. **讀取 `props`**：組件內部可以通過 `props.屬性名` 的方式讀取傳遞給它的 `props` 值。`props` 是唯讀的，這意味著你不能修改一個組件接收到的 `props`。
        3. **傳遞函數**：`props` 不僅可以傳遞數據，還可以傳遞函數，允許子組件與父組件通信或在父組件中觸發某些動作。
            
            ```jsx
            function ChildComponent(props) {
              return <button onClick={props.handleClick}>Click me</button>;
            }
            ```
            
        
2. `useState`
    1. 哪邊要使用狀態管理
        
        文中描述了三點，如下：
        
        - 隨著時間的推移它會**保持不變嗎？**如果是這樣，那麼它就不是狀態。
        - 它是透過 props**從父級傳遞的**嗎？如果是這樣，那麼它就不是狀態。
        - 您可以根據組件中的現有狀態或道具來**計算它嗎？**如果是這樣，那不是狀態！
    2. 狀態管理應該要放在哪裡
        
        文中描述了三點，如下：
        
        - 通常，你可以直接將狀態放入它們的**共同父組件**中。
        - 你也可以將狀態放到某個位於它們共同父組件之上的組件中
        - 如果你找不到一個合適的組件來擁有這個狀態，那麼就創建一個新的組件專門用於持有這個狀態，並將其添加到層次結構中的共同父組件之上的某個位置。
        

---

在 React 實作 UI 通常會遵循五個步驟（主要用 google 翻譯，有點奇怪還請不要介意）：

1. 將 UI 分解為元件層次結構
2. 在 React 中建立靜態版本
3. 找出 UI 狀態中最小但完整的表示
4. 確定您的狀態應該放在哪裡
5. 新增逆向資料流