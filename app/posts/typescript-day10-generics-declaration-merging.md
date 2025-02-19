---
title: "【TypeScript】 Day10 閱讀和實作「泛型」和 「宣告合併」。"
description: "泛型是 TypeScript 的一個特性，允許函式、介面和類別適應多種型別，提高程式碼的靈活性和可重用性。宣告合併則允許同名的介面、命名空間和函式合併，方便擴充型別定義。"
date: "2025-02-02"
tags: ["frontend","typescript"]
---

## **泛型（Generics）**

泛型（Generics）是 TypeScript 提供的一種**讓函式、介面或類別能夠適應多種型別**的特性。它可以讓我們編寫**可重複使用**且**更靈活**的程式碼，而不必針對每個特定型別都寫一次。

> 泛型（Generics）是指在定義函式、介面或類別的時候，不預先指定具體的型別，而在使用的時候再指定型別的一種特性。
> 

### **1. 為什麼需要泛型？**

假設我們要寫一個函式來回傳輸入的值：

```tsx
function identity(value: any): any {
  return value;
}

let result = identity(10);
console.log(result.toUpperCase()); // ❌ 這裡會報錯，因為 TypeScript 無法知道 result 是 number

```

問題：

- `any` 型別**失去了型別保護**，TypeScript 無法知道 `result` 是什麼型別，所以我們可能會在 `number` 上錯誤地使用 `toUpperCase()`。

### **2. 泛型如何解決這個問題？**

泛型允許我們**保留型別資訊**，這樣 TypeScript 就能夠正確推斷型別。

### ✅ **使用泛型**

```tsx
function identity<T>(value: T): T {
  return value;
}

let result1 = identity<number>(10);  // result1 被推斷為 number
let result2 = identity<string>("Hello");  // result2 被推斷為 string

console.log(result1.toFixed(2));  // ✅ 正確，因為 TypeScript 知道 result1 是 number
console.log(result2.toUpperCase());  // ✅ 正確，因為 TypeScript 知道 result2 是 string

```

在函式名後添加了 `<T>`，其中 `T` 用來指代任意輸入的型別，在後面的輸入 `value: T` 和輸出 `Array<T>` 中即可使用了。

**泛型的優勢**

- **型別安全**：保留了輸入值的型別，避免 `any` 造成的型別錯誤。
- **靈活性**：可以適用於不同的型別，而不需要為每個型別都寫一個函式。

### **3. 泛型的應用**

**(1) 泛型函式**

泛型函式的寫法：

```tsx
function echo<T>(arg: T): T {
  return arg;
}

let str = echo("Hello"); // 推斷 T 為 string
let num = echo(100); // 推斷 T 為 number

```

TypeScript 會根據傳入的值自動推斷 `T` 的型別。

**(2) 泛型介面**

泛型也可以用在**介面**上，使其適用於多種型別：

```tsx
interface Box<T> {
  value: T;
}

let box1: Box<string> = { value: "TypeScript" };
let box2: Box<number> = { value: 123 };

console.log(box1.value.toUpperCase()); // ✅ 正確
console.log(box2.value.toFixed(2)); // ✅ 正確

```

**(3) 泛型類別**

泛型也可以應用在**類別**上：

```tsx
class Storage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  getItem(index: number): T {
    return this.data[index];
  }
}

let stringStorage = new Storage<string>();
stringStorage.addItem("Apple");
stringStorage.addItem("Banana");

let numberStorage = new Storage<number>();
numberStorage.addItem(42);
numberStorage.addItem(100);

```

- `Storage<string>` 只允許存放 `string`。
- `Storage<number>` 只允許存放 `number`。

**(4)多個型別引數**
定義泛型的時候，可以一次定義多個型別引數。

```tsx
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

**(5) 泛型約束（Constraints）**

有時候我們不希望 `T` 是任何型別，而是**具有某些特性**的型別，例如**一定要有 `length` 屬性**。

```tsx
interface 00 {
  length: number;
}

function logLength<T extends HasLength>(value: T): void {
  console.log(value.length);
}

logLength("Hello"); // ✅ 字串有 length
logLength([1, 2, 3]); // ✅ 陣列有 length
logLength({ length: 10 }); // ✅ 物件有 length
logLength(100); // ❌ 錯誤，number 沒有 length 屬性

```

- `T extends HasLength` 限制 `T` 必須要有 `length` 屬性，這樣我們才能安全地存取 `value.length`。

**(6) 泛型引數的預設型別**

可以先預設泛型的型別，從實際值引數中也無法推測出時，這個預設型別就會起作用。

```tsx
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

### **4. 總結**

- 泛型讓函式、介面和類別能適用於不同型別，提高靈活性和可重用性。
- 泛型可以自動推斷型別，讓 TypeScript 提供更好的型別安全性。
- 可以使用 `extends` 限制泛型的型別範圍，確保型別符合某些條件。

TypeScript **沒有強制規定** 泛型參數的名稱，但有一些**常見的命名習慣**：

| 符號 | 代表的意思 | 常見用途 |
| --- | --- | --- |
| `T` | Type（型別） | 泛型的預設命名 |
| `K` | Key（鍵） | 代表鍵的型別，例如物件的 `key` |
| `V` | Value（值） | 代表值的型別，例如 `Map<K, V>` |
| `E` | Element（元素） | 代表陣列或集合中的元素 |
| `U` | 另一個 Type | 當泛型有多個型別參數時 |

## **宣告合併**

如果定義了兩個相同名字的函式、介面或類別，那麼它們會合併成一個型別。

### 1. **介面 (Interface) 合併**

當多個**同名介面**出現在同一個作用域時，TypeScript 會將它們**合併為單一介面**，並將所有屬性合併在一起。

### 🔹 範例：介面合併

```tsx
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// 最終合併結果：
const p: Person = {
  name: "Alice",
  age: 25,
};

```

這兩個 `Person` 介面會被 TypeScript 合併，形成一個同時包含 `name` 和 `age` 屬性的介面。

**合併的屬性的型別必須是唯一的，如果重複但型別一致不會報錯，如果不一致會報錯。**

### 2. **命名空間 (Namespace) 合併**

如果**多個相同名稱的命名空間 (namespace) 出現在同一個作用域**，它們的內容會被合併。

### 🔹 範例：命名空間合併

```tsx
namespace Animal {
  export function sayHello() {
    console.log("Hello from Animal!");
  }
}

namespace Animal {
  export function sayGoodbye() {
    console.log("Goodbye from Animal!");
  }
}

// 最終 Animal 內有兩個函式
Animal.sayHello();  // "Hello from Animal!"
Animal.sayGoodbye(); // "Goodbye from Animal!"

```

這裡 `Animal` 命名空間內的 `sayHello` 和 `sayGoodbye` 來自不同的區塊，但最後會被合併在一起。

### 3. **函式 (Function) 合併**

TypeScript 不允許**同名函式的多個實作**，但**函式與命名空間可以合併**。

### 🔹 範例：函式與命名空間合併

```
function greet(name: string) {
  return `Hello, ${name}`;
}

namespace greet {
  export function shout(name: string) {
    return `HELLO, ${name.toUpperCase()}!`;
  }
}

console.log(greet("Alice"));        // "Hello, Alice"
console.log(greet.shout("Alice"));  // "HELLO, ALICE!"

```

這裡 `greet` 既是函式，也是命名空間，因此 `greet.shout` 也可以被呼叫。

### 4. **類別 (Class) 與命名空間合併**

類別 (class) 不能與類別合併，但**可以與命名空間合併**，這樣可以為類別額外擴充靜態方法或屬性。

### 🔹 範例：類別與命名空間合併

```
class Car {
  model: string;
  constructor(model: string) {
    this.model = model;
  }
}

namespace Car {
  export function createTesla() {
    return new Car("Tesla Model S");
  }
}

const myCar = Car.createTesla();
console.log(myCar.model); // "Tesla Model S"

```

這裡 `Car` 類別和 `Car` 命名空間合併，讓 `Car.createTesla()` 成為該類別的靜態方法。

### **總結**

| 宣告類型 | 可合併嗎？ | 合併方式 |
| --- | --- | --- |
| **介面 (Interface)** | ✅ 可以 | 屬性會合併 |
| **命名空間 (Namespace)** | ✅ 可以 | 內容會合併 |
| **函式 (Function)** | ❌ 不能 | 但可以與命名空間合併 |
| **類別 (Class)** | ❌ 不能 | 但可以與命名空間合併 |

這種**宣告合併**的特性在**擴充現有的型別定義 (如第三方函式庫的類型擴充)** 非常有用。