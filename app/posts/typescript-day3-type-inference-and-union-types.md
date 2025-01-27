---
title: "【TypeScript】 Day3 閱讀和實作「型別推論」和「聯合型別」。"
description: "型別推論會自動推斷變數的型別，若未賦值則不會報錯；聯合型別允許變數為多種型別，但存取特定屬性時需注意，因為某些屬性並非所有型別共有。"
date: "2025-01-24"
tags: ["frontend","typescript"]
---

## **型別推論**

沒有定義型別，也會自動推論，例如:

```jsx
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

會被自動推論為字串，所以當再定義新的值時，會報錯。

但如果是原先沒賦值，就不會報錯，例如:

```jsx
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 聯合型別

可以為 A 型別或是 B 型別，用「|」分隔。

```jsx
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

**存取聯合型別的屬性或方法**

```jsx
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

報錯的原因是因為 something 如果是 number ，他就必定不會有 .length 的方法。

`length` 不是 `string` 和 `number` 的共有屬性，所以會報錯。

存取 `string` 和 `number` 的共同屬性是沒問題的，所以如果是使用 toString()，就不會報錯。