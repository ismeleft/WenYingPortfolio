---
title: "【TypeScript】Day2 閱讀和實作「原始資料型別」和「任意值」。"
description: "介紹 TypeScript 的原始資料型別，包括 number、string、boolean、null、undefined 和 symbol，並解釋 void 和 any 型別的特性及應用場景，強調 any 型別允許變數賦值為任何型別。"
date: "2025-01-23"
tags: ["frontend","typescript"]
---

## 原始資料型別

- JavaScript 的型別有哪些？
    - number、string、null、undefined、boolean、symbol
    - 以下為 ChatGPT 的範例
    
    ### 1. **number**
    
    代表數字（包括整數和浮點數）。
    
    ```tsx
    let age: number = 25; // 整數
    let price: number = 99.99; // 浮點數
    
    ```
    
    ### 2. **string**
    
    代表字串。
    
    ```tsx
    let name: string = "Tom";
    let greeting: string = `Hello, ${name}!`; // 使用模板字串
    
    ```
    
    ### 3. **boolean**
    
    代表布林值，只有 `true` 和 `false`。
    
    ```tsx
    let isDone: boolean = true;
    let isAdmin: boolean = false;
    
    ```
    
    ### 4. **null**
    
    代表「空值」，通常用來表示一個變數目前**沒有值**。
    
    ```tsx
    let empty: null = null;
    
    ```
    
    ### 5. **undefined**
    
    代表「未定義」，表示一個變數已經宣告但**還沒有被賦值**。
    
    ```tsx
    let notAssigned: undefined;
    console.log(notAssigned); // undefined
    
    ```
    
    ### 6. **symbol**
    
    代表唯一的值，用於建立物件的唯一屬性。
    
    ```tsx
    const uniqueKey: symbol = Symbol("key");
    
    ```
    

- JavaScript 沒有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示沒有任何返回值的函式：

```jsx
function alertName(): void {
    alert('My name is Tom');
}
```

宣告一個 `void` 型別的變數沒有什麼用，因為只能把它賦值為 `undefined` 和 `null`：

```tsx
let unusable: void = undefined; // 合法
// let unusable: void = 123; // 錯誤

```

**`undefined` 和 `null` 是所有型別的子型別**

這意味著，你可以將 `undefined` 或 `null` 賦值給其他型別的變數（但這取決於 TypeScript 的設定，例如 `strictNullChecks`）。

```tsx
let num: number = null; // 合法（如果 strictNullChecks 關閉）
let str: string = undefined; // 合法（如果 strictNullChecks 關閉）

```

---

## **任意值 (`any`)**

`any` 是 TypeScript 中一種特殊的型別，表示變數可以是任何型別。

如果是一個普通型別，在賦值過程中改變型別是不被允許的，但如果是 `any` 型別，則允許被賦值為任意型別。

變數如果在宣告的時候，未指定其型別，那麼它會被識別為任意值型別。

### 特性

1. **允許賦值為任何型別**

```tsx
let value: any = 42; // 數字
value = "Hello"; // 字串
value = true; // 布林值

```

1. **跳過型別檢查**

當你使用 `any` 型別時，TypeScript 不會對它進行型別檢查。

```tsx
let anything: any = "Hello";
console.log(anything.length); // 合法
anything = 42;
console.log(anything.length); // 不會報錯，雖然數字沒有 length 屬性

```

1. **未指定型別時，預設為 `any`**
如果變數在宣告時沒有指定型別，TypeScript 預設會將其視為 `any`：

```tsx
let something; // 預設為 any
something = "Hello";
something = 123;

```



### 範例比較

### 普通型別不允許改變型別

```tsx
let myString: string = "Hello";
// myString = 42; // 錯誤：不能將 number 賦值給 string

```

### 使用 `any` 型別可以改變型別

```tsx
let myValue: any = "Hello";
myValue = 42; // 合法
myValue = true; // 合法

```


### `any` 的應用場景

- 當你不確定變數的型別時。
- 當你需要處理第三方庫或舊版 JavaScript 程式碼時。