---
title: "【JS】陣列 / 物件的解構賦值、spread、rest、三元運算子、ES module & import / export 學習筆記"
description: "這次一樣是學習與 React 非常有關聯性的 JS 用法，在之前還沒有接觸 React的時候，學習 JS 還以為這些東西不常使用，殊不知在 React 就是很常用。"
date: "2024-3-30"
tags: ["javascript","react","Destructuring assignment","spread&rest"]
---
## 前言

這次一樣是學習與 React 非常有關聯性的 JS 用法，在之前還沒有接觸 React的時候，學習 JS 還以為這些東西不常使用，殊不知在 React 就是很常用。

## 陣列 / 物件的解構賦值、spread、rest

<aside>
💡 在 React 的使用場景：
1. 解構賦值：props 的傳遞，方便快速建立變數取值、state、從hooks 中取值

</aside>

```jsx
const person={
	name:'小明',
	age:20,
	description:'小明是一名大學生，主修資訊工程系',
	score:{
	英文:70,
	體育:85}
}

// 假設需要取值的時候可能會需要這樣
const name=person.name;
const description=person.description;

// 解構賦值的用法
const {name,description}=person;
```

➡️ React 實際上的運用

### 1. 解構 Props

當一個組件接收多個 props 時，使用解構賦值可以使代碼更清晰。

```jsx
function Welcome({ name, age }) {
  return <h1>歡迎{name}，你的年齡是{age}歲。</h1>;
}

// 使用組件時傳入props
<Welcome name="小明" age={20} />

```

### 2. 解構 State

使用 `useState` hook 時，我們通常會對返回的陣列使用解構賦值來獲取 state 變量和設置該變量的函數。

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你點擊了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        點擊我
      </button>
    </div>
  );
}

```

### 3. 解構 Context

當使用 React Context API 的 `useContext` hook 時，解構賦值可以幫助我們獲取上下文對象中的特定值。

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }} onClick={toggleTheme}>
      切換主題
    </button>
  );
}

```

### 4. 解構 Hooks 返回值

許多自定義 Hooks 或 React 內建 Hooks（例如 `useReducer`）會返回一個包含多個值的陣列或物件，解構賦值使得訪問這些返回值變得直接和方便。

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [{ count }, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      Count: {count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}

```

### 5. 解構事件對象

在處理事件時，如表單提交或鍵盤事件，經常需要從事件對象中解構出特定的屬性。

```jsx
function Form() {
  const handleSubmit = ({ target }) => {
    alert(`提交的名字是: ${target.name.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" />
      <button type="submit">提交</button>
    </form>
  );
}

```

---

### spread & rest

<aside>
💡 在 React 的使用場景：
1. spread & rest 這兩個用法在之前有提及過，主要是與維持資料的 immutable，所做的資料拷貝有關。

</aside>

兩個看似都是`…` 的語法，實際上代表的意思是不同的。

```jsx
// 使用spread運算符複製物件
const originalObj = { a: 1, b: 2 };
const copiedObj = { ...originalObj, c: 3 }; // { a: 1, b: 2, c: 3 }

// 使用rest運算符從物件中提取某些屬性
const { a, ...rest } = originalObj; // a = 1, rest = { b: 2 }
```

```jsx
// 在React組件中使用spread傳遞props
const Button = (props) => <button {...props}>Click me</button>;
const App = () => <Button onClick={() => alert('Clicked')} />;

```

## 三元運算子

1. 在一個條件後面會跟著一個問號 (`?`)，如果條件是 [truthy (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)，在冒號(`:`)前的表達式會被執行，如果條件是 [falsy (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)，在冒號後面的表達式會被執行，這個運算子常常被用來當作 `[if](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/if...else)` 的簡潔寫法

<aside>
💡 在 React 的使用場景：
1. 常在 JSX中使用，例如用有條件的渲染方式。

</aside>

```jsx
const isLoggedIn = true;
return (
  <div>
    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
  </div>
);

```

[條件運算子 - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## ES module & `import` / `export`

<aside>
💡 在 React 的使用場景：
常用於將元件、資料、hooks 做程式碼的區分管理，達到高複用性。

</aside>

### Export

### 默認導出（Default Export）

一個模塊只能有一個默認導出。這通常用於導出模塊的主要功能。

```jsx
// File: MyComponent.js
import React from 'react';

const MyComponent = () => {
  return <div>Hello, world!</div>;
};

export default MyComponent;

```

### 命名導出（Named Export）

一個模塊可以有多個命名導出。這適用於導出多個值（如函數、變量、組件等）。

```jsx
// File: utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

```

### Import

### 導入默認導出

使用默認導出時，你可以為導入的模塊指定任意名稱。

```jsx
// File: App.js
import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};

export default App;

```

### 導入命名導出

導入命名導出需要使用大括號`{}`指定正確的名稱。

```jsx
// File: App.js
import { add, subtract } from './utils';

console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3

```

### 導入全部命名導出

你也可以使用`*`導入一個模塊的所有命名導出。

```jsx
// File: App.js
import * as Utils from './utils';

console.log(Utils.add(2, 3)); // 5
console.log(Utils.subtract(5, 2)); // 3

```