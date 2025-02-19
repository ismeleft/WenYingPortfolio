---
title: "【TypeScript】 Day8 閱讀和實作「元組」和「列舉」。"
description: "元組合併不同型別的物件，長度和型別固定；數組合併相同型別的物件，長度不限制。列舉用於限制值範圍，支持基本、手動設定、異構、字串列舉等多種形式，並可使用 declare enum 進行類型提示。"
date: "2025-02-01"
tags: ["frontend","typescript"]
---

## 前言

## 元組

定義：數組合併了相同型別的物件，而元組（Tuple）合併了不同型別的物件。

乍看之下，我覺得非常難懂，所以請 ChatGPT 提供解釋跟舉例，

在 TypeScript（TS）中，**數組（Array）** 和 **元組（Tuple）** 的主要區別在於它們的型別約束方式：

### 1. **數組（Array）**

數組是一組**相同型別**的元素的集合。例如：

```tsx
let numbers: number[] = [1, 2, 3, 4]; // 數組中只有數字
let names: string[] = ["Alice", "Bob", "Charlie"]; // 數組中只有字串

```

即使使用泛型 `Array<T>`，數組的元素仍然是**相同型別**的：

```
let mixed: Array<number | string> = [1, "two", 3, "four"];

```

在這個例子中，數組允許 `number` 或 `string`，但它**並不要求**某個索引一定是特定型別，所有元素都是可變的。

### 2. **元組（Tuple）**

元組則是**一組不同型別的值**，並且它的**長度和每個索引的型別都是固定的**。例如：

```
let person: [string, number] = ["Alice", 25];

```

這個元組：

- **第一個元素** 必須是 `string`
- **第二個元素** 必須是 `number`

如果你試圖改變其中某個值的型別，TypeScript 會報錯：

```
person[0] = 30;  // ❌ 錯誤，因為第一個元素應該是 string
person[1] = "Alice";  // ❌ 錯誤，因為第二個元素應該是 number

```

但如果用數組，就不會有這種約束，例如 `Array<string | number>`，它不會限制某個索引的位置必須是特定型別。

### 3. **數組 vs 元組 匯合的概念**

你的問題提到：

> 數組合併了相同型別的物件，而元組合併了不同型別的物件。
> 

這指的是：

- **數組** 是一組**相同型別**的元素，比如 `string[]` 或 `number[]`。
- **元組** 是一組**不同型別**的元素，比如 `[string, number]`，每個位置的型別不同。

### ✅ 例子：

```tsx
// 數組：合併相同型別的物件
let users: { name: string; age: number }[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];  // 所有物件的型別都相同

// 元組：合併不同型別的物件
let userTuple: [string, number] = ["Alice", 25]; // 這是一組固定長度、不同型別的值

```

**總結**：

1. **數組適用於同型別的元素的集合**，元素的長度不限，型別一致。
2. **元組適用於不同型別的元素的組合**，長度固定，每個位置的型別不同。

所以，當元組中**的元素超過指定的長度組合，例如他在陣列中使用 push 方法，多出來的元素就會被限制為元組中每個型別的聯合型別。**

```tsx
let tuple: [string, number] = ["Alice", 25];

// 可以正常存取元組內的元素：
console.log(tuple[0]); // "Alice"
console.log(tuple[1]); // 25

// 超出元組長度時，TypeScript 限制新增的元素型別為 元組內型別的聯合型別
tuple.push("Hello");  // ✅ 允許，因為 "Hello" 屬於 (string | number)
tuple.push(42);       // ✅ 允許，因為 42 屬於 (string | number)

tuple.push(true);     // ❌ 錯誤，因為 boolean 不是 (string | number)

```

### **越界後的存取**

即使我們能用 `.push()` 新增元素，TypeScript **仍然不允許透過索引存取越界的元素**，因為元組的索引型別是固定的。

```

console.log(tuple[2]); // ❌ 報錯，因為 TypeScript 無法確認 tuple[2] 的型別
```

這是因為 TypeScript 仍然認為 `tuple` 應該是 `[string, number]`，而 `tuple[2]` 超出了定義範圍，所以會報錯。

如果要讓 TypeScript 允許動態存取，可以把元組變成普通數組：

```tsx

let dynamicTuple: (string | number)[] = tuple;  // 這樣就可以存取任意索引
console.log(dynamicTuple[2]);  // ✅ 不會報錯

```

---

## 列舉

列舉（Enum）型別用於取值被限定在一定範圍內的場景，比如一週只能有七天，顏色限定為紅綠藍等。

### 1. **基本列舉**

最基本的 `enum` 用法如下：

```tsx
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up);    // 0
console.log(Direction.Down);  // 1
console.log(Direction.Left);  // 2
console.log(Direction.Right); // 3

```

**說明：**

- `Direction.Up` 會被賦值 `0`，`Direction.Down` 是 `1`，依此類推。
- 預設情況下，第一個成員的值是 `0`，後續成員的值會自動遞增。

### 2. **手動設定值**

你可以手動指定成員的數值：

```tsx
enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}

console.log(Status.Success);  // 200
console.log(Status.NotFound); // 404

```

這樣可以讓 `enum` 更加直觀地對應一些業務邏輯，比如 HTTP 狀態碼。

### 3. **異構列舉（混合數值 & 字串）**

`enum` 也允許數字和字串混合：

```
enum ResponseStatus {
  Success = 200,
  Error = "ERROR",
  NotFound = 404
}

console.log(ResponseStatus.Success); // 200
console.log(ResponseStatus.Error);   // "ERROR"

```

這種做法在大多數情況下不建議，因為它會讓列舉變得難以處理。

### 4. **字串列舉**

你可以使用字串列舉來確保值的唯一性，不會被數字隱式遞增影響：

```
enum Colors {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

console.log(Colors.Red);   // "RED"
console.log(Colors.Green); // "GREEN"
console.log(Colors.Blue);  // "BLUE"

```

字串列舉不會有數值型列舉的自動遞增行為，因此更加穩定。

### 5. **反向對應**

對於數字型 `enum`，TypeScript 會自動建立反向對應：

```
enum Role {
  User = 1,
  Admin = 2
}

console.log(Role.User);   // 1
console.log(Role[1]);     // "User"

```

**但對於字串型 `enum`，不會有反向映射！**

### 6. **常數列舉 (`const enum`)**

如果你不需要 `enum` 在編譯後還保留對象的形式，可以使用 `const enum` 來提升效能：

```
const enum Size {
  Small = 1,
  Medium = 2,
  Large = 3
}

console.log(Size.Small); // 1

```

**編譯後的結果：**

```
console.log(1 /* Small */);

```

它不會產生 `enum` 物件，而是直接內嵌數值，提高效能。

### 7.  `declare enum` 的用法

當你使用 `declare enum` 時，TypeScript 只會將其視為類型信息，而不會在編譯後生成真正的 `enum` 定義。例如：

```tsx
declare enum ExternalEnum {
  A = 1,
  B = 2,
  C = 3
}

let value: ExternalEnum = ExternalEnum.A;
console.log(value); // 這裡可以正常使用

```

**特點：**

- `declare enum` **不會被編譯成 JavaScript**，它只是用來告訴 TypeScript **這個 `enum` 已經存在**。
- 這通常用於描述**已經存在的 JavaScript 代碼**或**第三方庫提供的 `enum`**。

 **`declare enum` 在編譯後的行為**

假設我們有這個 `declare enum`：

```tsx
declare enum Colors {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

console.log(Colors.Red);

```

編譯後的 JavaScript 會變成：

```tsx
console.log(Colors.Red);
```

你會發現 `Colors` 並沒有被定義！

這是因為 `declare enum` **只在 TypeScript 內部提供類型提示**，但不會影響最終的 JavaScript 代碼。

**何時使用 `declare enum`？**

`declare enum` 通常用於：

- **對應 JavaScript 全局變數**：
    - 如果某個 `enum` 是從 JavaScript 文件或 `CDN` 加載的，你可以用 `declare enum` 讓 TypeScript 知道它的存在，但不會生成重複的定義。
- **與 `.d.ts` 聲明檔一起使用**：
    - 當你寫 TypeScript 的 `.d.ts` 聲明文件來描述一個 JavaScript 庫時，你可以使用 `declare enum` 來聲明 `enum`。

例如，假設有個 JavaScript 庫：

```tsx
var Status = {
  Success: 200,
  NotFound: 404
};

```

你可以寫一個 TypeScript 聲明檔：

```tsx
declare enum Status {
  Success = 200,
  NotFound = 404
}

```

這樣 TypeScript 在開發時會提供補全與類型檢查，但最終不會影響 JavaScript 代碼。

**`declare enum` vs `const enum`**

| 類型 | 作用 |
| --- | --- |
| `enum` | 會生成 JavaScript 物件 |
| `const enum` | **內嵌數值，不生成 `enum` 物件，提高效能** |
| `declare enum` | **不會生成 JavaScript 代碼，純類型提示** |

**示例對比**：

```tsx
enum NormalEnum {
  A = 1,
  B = 2
}

const enum ConstEnum {
  X = 10,
  Y = 20
}

declare enum DeclaredEnum {
  P = 100,
  Q = 200
}

console.log(NormalEnum.A);  // ✅ 會生成 JavaScript 物件
console.log(ConstEnum.X);   // ✅ 直接內嵌數值
console.log(DeclaredEnum.P); // ❌ 編譯後的 JS 可能會報錯，因為它沒有真正的定義

```

### **總結**

- `declare enum` **不會影響最終的 JavaScript 代碼**，它只是告訴 TypeScript **有這個 `enum` 存在**。
- 適用於 **聲明外部 JavaScript 庫** 或 **在 `.d.ts` 文件中使用**。
- 如果 `enum` 需要提升效能（消除 JavaScript 物件），使用 `const enum`。
- 如果 `enum` 需要完整保留，使用一般 `enum`。