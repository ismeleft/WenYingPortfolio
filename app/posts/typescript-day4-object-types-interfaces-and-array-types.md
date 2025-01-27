---
title: "【TypeScript】 Day4 閱讀和實作「物件的型別 —— 介面」和「陣列的型別」。"
description: "介紹 TypeScript 中的介面、任意屬性、唯讀屬性及陣列型別，並解釋如何使用 arguments 來存取函式參數及其限制，建議使用展開運算子作為替代方案。"
date: "2025-01-26"
tags: ["frontend","typescript"]
---

## 物件的型別—介面 interfaces

我對於介面的理解：

定義一個物件裡 key 的型別，任何要引用相同的物件，都必須要與該介面相同。

例如：

```json
interface Person:{
	age:number,
	gender:string
}

const Amy:Person{
	age:19,
	gender:female
}
```

多一個，少一個都不行。除非使用「 ? 」，也就是 optional 的意思。但也絕對不可以出現介面中沒有定義的屬性。

除非，使用了「任意屬性」。

### 任意屬性：

代表任何可能出現的屬性，**一旦定義了任意屬性，那麼確定屬性和可選屬性的型別都必須是它的型別的子集。**

老實說看這句話跟舉例我是不懂的，

舉例是這樣的，

```json
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

如果不看解釋，我會想說，看起來都很合理呀，哪裡錯了？

以下是 ChatGPT 的解釋，

在 TypeScript 中，「子集」的意思是**一種型別可以被另一種型別接受**，或者說**一種型別包含在另一種型別之中**。

讓我們用一個簡單的例子和故事來說明什麼是「子集」。

---

### 故事：水果籃

小明有一個水果籃，他的規定是：**籃子裡只能放水果**。

- **水果**包括蘋果、香蕉、橘子。
- 如果你放進去一顆「蘋果」，沒問題，因為蘋果是水果。
- 但是，如果你放進去一塊「蛋糕」，就不行，因為蛋糕不是水果。

在這個故事中，「蘋果」是「水果」的子集，因為蘋果是水果的一種。

---

### 在程式碼中的子集

在 TypeScript 中，「子集」的意思是型別 A 的值可以被型別 B 接受。例如：

```tsx
type Fruit = 'apple' | 'banana' | 'orange'; // 水果型別
type Apple = 'apple'; // 蘋果型別

let fruit: Fruit; // 可以是任何水果
let apple: Apple = 'apple'; // 只能是蘋果

fruit = apple; // 合法，因為 Apple 是 Fruit 的子集

```

這裡 `Apple` 是 `Fruit` 的子集，因為蘋果是水果的一種。

---

### 為什麼任意屬性要求型別是子集？

當你定義了一個索引簽名時，例如：

```tsx
interface Person {
    [propName: string]: string;
    name: string;
    age?: number;
}

```

索引簽名 `[propName: string]: string` 表示所有屬性的值必須是 `string`。這意味著：

- `name` 的型別是 `string`，符合任意屬性的規定（合法）。
- `age` 的型別是 `number`，但 `number` 不是 `string` 的子集（不合法）。

TypeScript 報錯的原因是：**`age` 的型別不屬於索引簽名型別的子集**。

---

## **唯讀屬性**

希望物件中的一些欄位只能在建立的時候被賦值，那麼可以用 `readonly` 定義唯讀屬性，也就是說如果再次賦值，就會報錯，並且，只能在物件中賦值，如果在此之外賦值，不管是否為首次，都會報錯。

```json
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

---

## 陣列的型別：

**最常見的是「型別 + 方括號」表示法，例如：**

```json
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

## **陣列泛型**

我們也可以使用陣列泛型（Array Generic） `Array<elemType>` 來表示陣列：

```
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

## **用介面表示陣列**

介面也可以用來描述陣列：

```
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

`NumberArray` 表示：只要索引的型別是數字時，那麼值的型別必須是數字。

## **類別陣列**

類別陣列（Array-like Object）不是陣列型別，比如 `arguments` 。

我有一些疑問，例如 `arguments` 是什麼 ？因為不知道這個，後面所有的舉例我都只能是一知半解的狀態。

ChatGPT 給了以下的解釋：

`arguments` 是 JavaScript 中的一個**特殊物件**，它在**函式內部**自動可用，用來存取函式的所有參數。

這不就是參數的意思嗎？


### 簡單解釋

當你呼叫一個函式時，`arguments` 就像一個**裝著所有參數的袋子**。

即使你沒有明確地定義參數名稱，你也可以透過 `arguments` 存取它們。



### 特性

1. **裝著函式的所有參數**
    
    不管函式定義了幾個參數，`arguments` 都會包含實際傳入的所有參數。
    
2. **類似陣列**
    - 可以用索引存取（例如 `arguments[0]`）。
    - 有 `length` 屬性，表示參數的數量。
    - 但它**不是真正的陣列**，所以沒有 `push`、`pop` 等方法。
3. **只能在函式內部使用**
    
    `arguments` 只存在於函式內，函式外部是無法使用的。
    



### 例子

### 1. 存取參數

```jsx
function example(a, b) {
    console.log(arguments[0]); // 10
    console.log(arguments[1]); // 20
    console.log(arguments.length); // 2
}

example(10, 20);

```

### 2. 傳入多個參數

即使函式只定義了一個參數，`arguments` 也會包含所有傳入的值。

```jsx
function example(a) {
    console.log(arguments[0]); // 10
    console.log(arguments[1]); // 20
    console.log(arguments[2]); // 30
}

example(10, 20, 30);

```

### 3. `arguments` 與參數的同步關係

在非嚴格模式下，`arguments` 和函式參數是同步的，改變其中一個會影響另一個：

```jsx
function example(a) {
    console.log(a); // 10
    arguments[0] = 20;
    console.log(a); // 20
}

example(10);

```

在嚴格模式下（`'use strict'`），`arguments` 和參數就不再同步了。

```jsx
'use strict';
function example(a) {
    console.log(a); // 10
    arguments[0] = 20;
    console.log(a); // 10
}

example(10);

```


### 使用限制

1. **不建議在新程式中使用**
    - 在 ES6 之後，有更好的方式來處理函式參數，例如**展開運算子**（`...`）。
    - `arguments` 是舊的語法，容易出錯。
2. **替代方式：展開運算子**
    
    使用展開運算子可以直接將參數存入一個陣列，取代 `arguments`：
    

```jsx
function example(...args) {
    console.log(args[0]); // 10
    console.log(args[1]); // 20
    console.log(args.length); // 2
}

example(10, 20);

```


### 總結

- `arguments` 是一個類似陣列的物件，用來存取函式的所有參數。
- 它是舊的語法，在現代 JavaScript 中，建議用展開運算子（`...args`）來取代。
- 它只能在函式內使用，並且沒有陣列的方法（如 `push`）。




```
function sum() {
    let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上例中，`arguments` 實際上是一個類別陣列，不能用普通的陣列的方式來描述，而應該用介面：

```
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

在這個例子中，我們除了約束當索引的型別是數字時，值的型別必須是數字之外，也約束了它還有 `length` 和 `callee` 兩個屬性。

事實上常用的類別陣列都有自己的介面定義，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```
function sum() {
    let args: IArguments = arguments;
}
```

其中 `IArguments` 是 TypeScript 中定義好了的型別，它實際上就是：

```
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

於是，最簡單的結論就是，類別陣列就是「像」陣列。但不是陣列，所以並不能用一般陣列的表示法，通常會使用介面來表示。

## **any 在陣列中的應用**

一個比較常見的做法是，用 `any` 表示陣列中允許出現任意型別：

```
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```