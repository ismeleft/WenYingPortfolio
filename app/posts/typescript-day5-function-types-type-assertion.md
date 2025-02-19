---
title: "【TypeScript】 Day5 閱讀和實作「物件的型別 —— 介面」和「陣列的型別」。"
description: "介紹 TypeScript 中函式的型別定義，包括型別推論和手動型別定義的差異，函式表達式與箭頭函式的比較，以及如何使用函式過載和型別斷言來提高型別安全性和代碼清晰度。"
date: "2025-01-27"
tags: ["frontend","typescript"]
---

## **函式的型別**

首先得要知道函式有兩種寫法，宣告式跟表達式，接下來可想而知的是，我們需要在 input 跟 output 定義型別，

例如：

```jsx
// 宣告式

function sum(x: number, y: number): number {
    return x + y;
}

// input 定義多少個參數，屆時呼叫函式，就必須填入幾個參數，否則會報錯。
```

```jsx
// 表達式

let mySum = function (x: number, y: number): number {
    return x + y;
};
```

```jsx
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

這兩者的差異我實在不太懂，於是請 ChatGPT 解釋，

讓我們用一個簡單的故事來幫助你理解這段內容。

### 故事背景

想像你是一家公司的經理，你正在招聘一個員工來負責「計算兩個數字的和」。公司有兩種方式可以聘用這個員工：

1. **直接看應聘者的能力，根據他能做什麼來推斷他的職位（型別推論）。**
2. **明確告訴應聘者，他的職位是「加法專家」，並檢查他的能力是否符合這個職位（手動型別定義）。**

### 方式 1：型別推論

你只看應聘者的工作內容，讓他直接開始工作。

這裡的應聘者是匿名函式，因為他沒有名字。

```tsx
let mySum = function (x: number, y: number): number {
    return x + y;
};

```

- **發生了什麼？**
    - 你告訴他：「你去幫我處理兩個數字的加法吧！」
    - TypeScript 自己推斷出 `mySum` 是一個「接受兩個數字，返回一個數字」的函式。
    - 這就像你根據員工做的事情，猜到他是一個「加法專家」。

### 方式 2：手動型別定義

這次，你在招聘時，直接在合同上寫明：「你是加法專家，必須接受兩個數字並返回一個數字。」

```tsx
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

```

- **發生了什麼？**
    - 你先定義清楚：「這個變數 `mySum` 是一個函式，必須符合 `(x: number, y: number) => number` 這個規範。」
    - 然後再檢查應聘者（匿名函式）的能力是否符合這個規範。
    - TypeScript 確保 `mySum` 的型別是完全正確的。
    

---

### TypeScript 的 `=>` 和 ES6 的 `=>`

這裡提到的「不要混淆 TypeScript 和 ES6 的 `=>`」，是因為這兩個符號的用途不同：

1. **TypeScript 中的 `=>`**
    
    用來表示「函式的型別定義」。
    
    例如：`(x: number, y: number) => number` 表示這是一個函式，接受兩個 `number`，返回一個 `number`。
    
2. **ES6 中的 `=>`**
    
    是箭頭函式的語法，用來定義函式的實現。
    
    例如：`(x, y) => x + y` 是一個簡潔的函式實現。
    

### 總結

- **型別推論**：TypeScript 可以根據函式的實現自動推斷變數的型別。
- **手動型別定義**：如果你想更明確地告訴 TypeScript 這個變數的型別，可以手動加上型別定義。
- **`=>` 的用途**：
    - TypeScript 的 `=>`：表示函式的型別。
    - ES6 的 `=>`：表示箭頭函式的語法。

講到這邊，我想知道**函式表達式跟箭頭函式之間的差異是什麼？**

**函式表達式（Function Expression）** 和 **箭頭函式（Arrow Function）** 不是完全相同的概念，但箭頭函式是一種函式表達式的形式。

### 什麼是函式表達式？

函式表達式是指將一個函式作為值賦給變數或常量。函式表達式通常使用 `function` 關鍵字來定義。以下是一個範例：

```tsx
const add = function (x: number, y: number): number {
    return x + y;
};

```

- **關鍵點**：
    - 函式是匿名的（沒有名稱）。
    - 它被賦值給變數 `add`。
    - 這是一個典型的函式表達式。

### 什麼是箭頭函式？

箭頭函式是一種簡潔的函式表達式，使用 `=>` 來定義。它可以用來取代傳統的函式表達式，尤其在簡單情況下更為簡潔。範例如下：

```tsx
const add = (x: number, y: number): number => x + y;

```

- **關鍵點**：
    - 它是函式表達式的一種語法糖。
    - 沒有自己的 `this`，會繼承外層作用域的 `this`。
    - 更加簡潔，適合簡單的函式。

### 兩者的區別

| **特點** | **函式表達式** | **箭頭函式** |
| --- | --- | --- |
| 語法 | 使用 `function` 關鍵字 | 使用 `=>` 語法 |
| `this` 行為 | 有自己的 `this` | 沒有自己的 `this`，繼承外層作用域的 `this` |
| 適用場景 | 適合需要顯式定義 `this` 的情況 | 適合簡單邏輯或需要繼承 `this` 的情況 |
| 簡潔性 | 相對冗長 | 更加簡潔，適合簡單邏輯 |

### 結論

- **函式表達式** 是一個更廣義的概念，指的是將函式作為值來使用。
- **箭頭函式** 是函式表達式的一種具體形式，它是語法更簡潔的函式表達式。

兩者的核心思想相同，但在語法和行為上有一些細微差異。

### **用介面定義函式的形狀**

```jsx
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

### **可選引數**

用 `?` 表示可選的引數，可選引數必須接在必需引數後面，也就是可選引數後不可以再加上必須引數。

### **引數預設值**

在 ES6 中，我們允許給函式的引數新增預設值，**TypeScript 會將添加了預設值的引數識別為可選引數。**

```jsx
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom'); // 也會是'Tom Cat'（使用預設值）
```

### **剩餘引數**

rest 引數只能是最後一個引數。

### **過載 Function Overloading**

過載允許一個函式接受不同數量或型別的引數時，作出不同的處理。

我覺得只看例子有點難懂，所以請 ChatGPT 幫我解釋。

### 故事背景

想像你是家裡的「萬能管家」，有一個任務是幫忙反轉一些物品。這些物品可以是數字，也可以是字串。你需要根據物品的不同，做出不同的處理：

- **如果是數字**，你要把數字反轉，比如 123 變成 321。
- **如果是字串**，你要把字串反轉，比如 'hello' 變成 'olleh'。

你有一個函式 `reverse` 來幫忙完成這個任務。根據不同的物品，你希望它能有不同的行為。

### 1. 初始寫法（使用聯合型別）

首先，你決定讓 `reverse` 函式接受兩種不同的物品：數字和字串。你使用了 **聯合型別**（`number | string`）來表示它可以接受這兩種物品。

```tsx
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

```

這段程式碼的意思是：

- 如果 `x` 是數字，就將它轉成字串，反轉後再轉回數字。
- 如果 `x` 是字串，就直接反轉字串。

**問題**：雖然這樣可以工作，但有一個缺點：當你傳入數字時，TypeScript 不會特別提醒你輸入的是數字，輸出也應該是數字。它只知道 `x` 可能是數字或字串，但沒有辦法精確地告訴你輸入和輸出之間的關係。

### 2. 使用函式過載

為了解決這個問題，你決定使用 **函式過載**。過載允許你為同一個函式定義多種不同的型別，並且根據傳入的型別來決定返回的型別。

你這樣寫：

```tsx
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

```

這段程式碼的意思是：

1. **第一個定義**：如果 `x` 是數字，返回的結果也應該是數字。
2. **第二個定義**：如果 `x` 是字串，返回的結果也應該是字串。
3. **第三個定義**：這是函式的實現部分，處理了數字和字串的反轉邏輯。

### 如何運作

- 當你傳入數字時，TypeScript 知道你想要的輸出是數字：
    
    ```tsx
    let numResult = reverse(123);  // 返回 321，並且類型是 number
    
    ```
    
- 當你傳入字串時，TypeScript 知道你想要的輸出是字串：
    
    ```tsx
    let strResult = reverse('hello');  // 返回 'olleh'，並且類型是 string
    
    ```
    

### 為什麼這樣更好？

1. **精確的型別提示**：這樣寫後，當你傳入數字時，編輯器會提示你，這個函式返回的是數字；當你傳入字串時，返回的是字串。
2. **避免錯誤**：你不會再意外地將數字和字串搞混，因為 TypeScript 會根據過載的定義來確保輸入和輸出的一致性。

### 3. 函式過載的匹配規則

TypeScript 會根據你定義的過載順序來選擇最合適的匹配。**更精確的定義應該放在前面**，這樣 TypeScript 就能正確地理解你的意圖。

例如，如果你先寫了模糊的定義，再寫精確的定義，TypeScript 會優先選擇模糊的定義，這樣就可能導致錯誤。

### 總結

- **函式過載** 允許你定義同一個函式的多個版本，並根據不同的輸入型別來決定輸出的型別。
- 使用過載可以讓你的函式更加精確，並且 TypeScript 可以提供更好的型別檢查和提示。

---

## 型別的斷言

型別斷言（Type Assertion）可以用來手動指定一個值的型別。

```jsx
<型別>值
或是
值 as 型別 //在 tsx 語法（React 的 jsx 語法的 ts 版）中必須用這種。
```

```jsx
function getLength(something: string | number): number {
    if (something.length) {
        return something.length;
    } else {
        return something.toString().length;
    }
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// index.ts(3,26): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

因為無法得知引數是否絕對為 string ，所以會報錯。

所以解決方式就是，指定只有 string 時使用 `.length` 方法

```jsx
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

**型別斷言不是型別轉換，斷言成一個聯合型別中不存在的型別是不允許的。**

### 更簡單的解法：`typeof` 判斷

雖然類型斷言可以解決這個問題，但它有時候可能會讓程式碼顯得不夠清晰。另一個更常見的做法是使用 `typeof` 操作符來檢查 `something` 的具體型別，這樣 TypeScript 就能根據型別自動推斷出正確的屬性。

```tsx

function getLength(something: string | number): number {
    if (typeof something === 'string') {
        return something.length;  // 當 something 是 string 時，直接訪問 .length
    } else {
        return something.toString().length;  // 當 something 是 number 時，轉為字串再計算長度
    }
}

```