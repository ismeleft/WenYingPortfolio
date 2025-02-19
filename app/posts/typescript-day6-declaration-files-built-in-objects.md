---
title: "【TypeScript】 Day6 閱讀和實作「宣告檔案」和「內建物件」。"
description: "介紹宣告檔案的概念及其撰寫方法，並探討 ECMAScript 和 DOM/BOM 的內建物件，提供範例以展示如何在 TypeScript 中使用這些型別。"
date: "2025-01-27"
tags: ["frontend","typescript"]
---

## 前言

這邊開始就是個完全陌生的東西了，我打算就是閱讀過，知道有這個東西，如果之後有要用到應該就會比較有方向一點。

## 宣告檔案

### **什麼是宣告檔案？**

- **宣告檔案**（Declaration File）：描述 JavaScript 程式碼結構的 TypeScript 檔案，副檔名為 `.d.ts`。
- **作用**：提供型別資訊，讓 TypeScript 編譯器能正確檢查型別，並在開發時提供自動完成與提示功能。
- **特點**：
    - **僅包含型別資訊**，不包含實際程式碼。
    - 幫助 TypeScript 瞭解第三方函式庫的結構。

---

### **撰寫宣告檔案的情境與範例**

1. **全域變數**
    - **情境**：透過 `<script>` 標籤引入的函式庫。
    - **範例**：
        
        ```
        declare const globalLib: {
            version: string;
            doSomething(): void;
        };
        
        ```
        
    - **使用**：
        
        ```html
        <script src="global-lib.js"></script>
        <script>
            globalLib.doSomething();
        </script>
        
        ```
        
2. **npm 套件**
    - **情境**：函式庫以模組形式匯入，符合 ES6 規範。
    - **範例**：
        
        ```
        declare module 'my-library' {
            export function sayHello(name: string): string;
        }
        
        ```
        
    - **使用**：
        
        ```
        import { sayHello } from 'my-library';
        console.log(sayHello('TypeScript'));
        
        ```
        
3. **擴充全域變數**
    - **情境**：函式庫為現有的全域物件（如 `window`）添加屬性。
    - **範例**：
        
        ```
        interface Window {
            customProperty: string;
        }
        
        ```
        
    - **使用**：
        
        ```
        window.customProperty = 'Hello, TypeScript!';
        
        ```
        

---

### **如何撰寫宣告檔案？**

| 關鍵字 | 用途 | 範例 |
| --- | --- | --- |
| `declare var` | 定義全域變數 | `declare var jQuery: (selector: string) => any;` |
| `declare function` | 定義全域函式 | `declare function greet(name: string): void;` |
| `declare class` | 定義全域類別 | `declare class Animal {}` |
| `declare enum` | 定義外部列舉型別 | `declare enum Directions { Up, Down, Left, Right }` |
| `declare namespace` | 定義命名空間 | `declare namespace Utils {}` |
| `interface` | 定義物件結構 | `interface User { name: string; age: number; }` |
| `type` | 定義型別別名 | `type ID = string |

### **如何驗證宣告檔案？**

1. **使用 TypeScript 編譯器檢查型別**：
    - 在專案中執行 `tsc --noEmit`，檢查型別是否正確。
2. **實際使用測試**：
    - 在專案中引入宣告檔案，並嘗試使用函式庫功能，確認型別提示與檢查是否正常。

---

## 內建物件

### **ECMAScript 的內建物件**

ECMAScript 標準提供的內建物件有：

`Boolean`、`Error`、`Date`、`RegExp` 等。

我們可以在 TypeScript 中將變數定義為這些型別：

```tsx
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

### **DOM 和 BOM 的內建物件**

DOM 和 BOM 提供的內建物件有：

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

TypeScript 中會經常用到這些型別：

```tsx
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

### **TypeScript 核心函式庫的定義檔案**

[TypeScript 核心函式庫的定義檔案](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中定義了所有瀏覽器環境需要用到的型別，並且是預置在 TypeScript 中的。