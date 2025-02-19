---
title: "【TypeScript】 ChatGPT 出給我的考題"
description: "用 ai 工具邊學習實在是太方便了 🤓"
date: "2025-02-02"
tags: ["frontend","typescript"]
---

## **選擇題（單選）**

1. TypeScript 中 **哪種型別** 允許變數可以是 `string` 或 `number`？
    
    A) `any`
    
    B) `union`
    
    C) `tuple`
    
    D) `enum`
    
    `B`
    
2. 關於 **TypeScript 的介面（interface）**，以下敘述何者正確？
    
    A) 介面可以擴展（extend）其他介面
    
    B) 介面只能用來描述物件，不能用來描述函式型別
    
    C) 介面定義後不可變更
    
    D) 介面與類別完全相同
    
    `A`
    
3. `readonly` 關鍵字的作用是？
    
    A) 限制變數只能在類別內部使用
    
    B) 限制變數只能在類別外部使用
    
    C) 限制變數初始化後不能再被修改
    
    D) 讓變數能接受不同的型別
    
    `C`
    
4. 以下哪種 TypeScript 特性允許函式或類別接受不同型別的參數，但仍然保持型別安全？
    
    A) `union`
    
    B) `interface`
    
    C) `generics`
    
    D) `type alias`
    
    `C`
    

---

## **填空題**

1. TypeScript 提供了一種機制來確保變數的型別正確，這個機制稱為 **_______**。 `型別推論`
2. 使用 `________` 關鍵字可以強制 TypeScript 把某個值當作特定型別處理。`as 型別斷言`
3. 在 TypeScript 中，使用 `type` 關鍵字可以定義 **________**，讓開發者能夠為複雜的型別取別名。`型別別名`
4. 在類別中，如果想要讓某個屬性只能在該類別內部被存取，應該使用 **________** 修飾符。`private`
5. `enum` 是 TypeScript 提供的一種 **________**，可以用來定義一組具名的數值。`列舉`

---

## **程式實作題**

- **型別與介面**
    - 定義一個介面 `Person`，包含 `name`（string）和 `age`（number）。
    - 實作一個函式 `greet`，該函式接收 `Person` 物件作為參數，並回傳 `"Hello, my name is [name] and I am [age] years old."`。
    - 
    
    ```tsx
    interface Person {
    	name: string,
    	age: number
    }
    
    function greet(value:Person){
    	return `Hello, my name is ${value.name} and I am ${value.age} years old.`
    }
    ```
    

- **聯合型別與類型守衛**
    - 定義一個函式 `printId`，它接受一個 `id` 參數，該參數可以是 `string` 或 `number`。
    - 若 `id` 是 `string`，則輸出 `"The ID is a string: [id]"`。
    - 若 `id` 是 `number`，則輸出 `"The ID is a number: [id]"`。
    - 
        
        ```tsx
        function printId(id: string | number): string {
            if (typeof id === "string") {
                return `The ID is a string: ${id}`;
            }
            if (typeof id === "number") {
                return `The ID is a number: ${id}`;
            }
            return "Invalid ID type";
        }
        ```
        

- **泛型（Generics）**
    - 實作一個泛型函式 `reverseArray<T>`，接收一個陣列，並回傳該陣列的反轉版本。
    - 
        
        ```tsx
        function reverseArray<T>(value: T[]): T[] {
            return value.slice().reverse(); // 使用 slice() 以免修改原陣列
        }
        
        // 測試
        console.log(reverseArray([1, 2, 3])); // 👉 [3, 2, 1]
        console.log(reverseArray(["a", "b", "c"])); // 👉 ["c", "b", "a"]
        
        ```
        

- **類別與繼承**
    - 定義一個類別 `Animal`，包含 `name` 屬性和 `makeSound()` 方法（回傳 `"Some generic sound"`）。
    - 建立 `Dog` 類別，繼承 `Animal` 並覆寫 `makeSound()` 方法，使其回傳 `"Bark!"`。
    - 
        
        ```tsx
        class Animal {
            name: string;
            
            constructor(name: string) {
                this.name = name;
            }
        
            makeSound(): string {
                return "Some generic sound";
            }
        }
        
        class Dog extends Animal {
            makeSound(): string {
                return "Bark!";
            }
        }
        
        // 測試
        const myDog = new Dog("Buddy");
        console.log(myDog.name); // 👉 "Buddy"
        console.log(myDog.makeSound()); // 👉 "Bark!"
        
        ```