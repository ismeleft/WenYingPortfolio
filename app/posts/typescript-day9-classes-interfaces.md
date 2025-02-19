---
title: "【TypeScript】 Day9 閱讀和實作「類別」和「類別與介面」。"
description: "類別的概念在 TypeScript 中包括屬性、方法、繼承、存取修飾詞和靜態方法，並且可以通過介面實現共通特性。類別和介面的主要區別在於類別可以包含實作和存取修飾詞，而介面則用於定義物件的結構。"
date: "2025-02-02"
tags: ["frontend","typescript"]
---

## 前言

類別的概念對我來說著實是滿陌生的，以前學習 JavaScript 的時候有微微知道這個東西，但實作上是沒有的。就像後來開發都是用 React 但 React 現在也是 function component。所以 class 真的是知道但沒有用過的東西。

https://willh.gitbook.io/typescript-tutorial/advanced/class

## 類別

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/3c327e46-930d-49e6-b559-5e060650a1ac" />

### ES6 定義

- 屬性和方法
    - 
    
    ```jsx
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    
      greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
      }
    }
    
    const person1 = new Person("Alice", 25);
    person1.greet(); // Hello, my name is Alice and I am 25 years old.
    ```
    
    **說明：**
    
    - `constructor(name, age)` 是建構函式，在 `new Person()` 時被呼叫。
    - `greet()` 是類別的方法。
    - `this.name` 和 `this.age` 是物件的屬性。
    - 透過 `new` 產生新實例的時候，會自動呼叫建構函式。
- 類別的繼承
    - 使用 `extends` 關鍵字實現繼承，子類別中使用 `super` 關鍵字來呼叫父類別的建構函式和方法。
    - 
    
    ```jsx
    class Animal {
      constructor(name) {
        this.name = name;
      }
    
      makeSound() {
        console.log(`${this.name} makes a sound.`);
      }
    }
    
    class Dog extends Animal {
      constructor(name, breed) {
        super(name); // 呼叫父類別的 constructor
        this.breed = breed;
      }
    
      bark() {
        console.log(`${this.name} is barking!`);
      }
    }
    
    const myDog = new Dog("Buddy", "Golden Retriever");
    myDog.makeSound(); // Buddy makes a sound.
    myDog.bark(); // Buddy is barking!
    
    ```
    
    **說明：**
    
    - `extends` 用來繼承 `Animal` 類別。
    - `super(name)` 呼叫父類別的 `constructor`，確保 `this.name` 正確初始化。
    - 子類別 `Dog` 擁有 `Animal` 的所有方法，並新增 `bark()`。
- 存取器
    - 使用 getter 和 setter 可以改變屬性的賦值和讀取行為
    - 
    
    ```jsx
    class User {
      constructor(name) {
        this._name = name;
      }
    
      get name() {
        return this._name.toUpperCase(); // 讓名稱變成大寫
      }
    
      set name(newName) {
        if (newName.length > 2) {
          this._name = newName;
        } else {
          console.log("Name is too short!");
        }
      }
    }
    
    const user = new User("Alice");
    console.log(user.name); // ALICE（因為 getter 轉成大寫）
    user.name = "Bo"; // Name is too short!
    user.name = "Bob"; // ✅
    console.log(user.name); // BOB
    ```
    
    `get name()` 和 `set name(value)` 讓我們像存取變數一樣存取方法。
    
- 靜態方法（Static Methods）
    - 靜態方法屬於**類別本身**，而不是類別的實例
    - 
    
    ```jsx
    class MathUtils {
      static add(a, b) {
        return a + b;
      }
    }
    
    console.log(MathUtils.add(5, 3)); // 8
    // const math = new MathUtils();
    // math.add(5, 3); // ❌ 會報錯，因為 add() 不是實例的方法
    ```
    
    `static add()` 只能透過 `MathUtils.add()` 呼叫，而不能用 `new MathUtils()` 的方式來存取。
    

### ES7 定義

- 實例屬性
    - ES6 中實例的屬性只能透過建構函式中的 `this.xxx` 來定義，ES7 提案中可以直接在類別裡面定義：
    - 
        
        ```jsx
        class Animal {
            name = 'Jack';
        
            constructor() {
                // ...
            }
        }
        
        let a = new Animal();
        console.log(a.name); // Jack
        ```
        
- 靜態屬性
    - ES7 提案中，可以使用 `static` 定義一個靜態屬性：
    - 
        
        ```jsx
        class Animal {
            static num = 42;
        
            constructor() {
                // ...
            }
        }
        
        console.log(Animal.num); // 42
        ```
        

### TypeScript 中類別的方法

- 存取修飾詞
    - TypeScript 提供 `public`、`private`、`protected` 修飾符來控制變數或方法的存取範圍：
    - `public`：預設值，所有地方都能存取。
    - `private`：只能在類別內部存取。
    - `protected`：只能在類別內部及子類別存取。
    - 
    
    ```jsx
    class Animal {
      public name: string;
      private age: number;
      protected type: string;
    
      constructor(name: string, age: number, type: string) {
        this.name = name;
        this.age = age;
        this.type = type;
      }
    
      public getAge(): number {
        return this.age;
      }
    }
    
    const animal = new Animal("Dog", 5, "Mammal");
    console.log(animal.name); // ✅ 可以存取
    console.log(animal.getAge()); // ✅ 可以存取
    // console.log(animal.age); ❌ 錯誤：'age' 是 private
    // console.log(animal.type); ❌ 錯誤：'type' 是 protected
    
    ```
    
    TypeScript 編譯之後的程式碼中，並沒有限制 `private` 屬性在外部的可及性。
    
- readonly
    - 只讀屬性關鍵字，只允許出現在屬性宣告或索引簽名中。
    - 
        
        ```tsx
        class Animal {
            readonly name;
            public constructor(name) {
                this.name = name;
            }
        }
        
        let a = new Animal('Jack');
        console.log(a.name); // Jack
        a.name = 'Tom';
        
        // index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
        ```
        
        注意如果 `readonly` 和其他訪問修飾符同時存在的話，需要寫在其後面。
        
        ```tsx
        class Animal {
            // public readonly name;
            public constructor(public readonly name) {
                this.name = name;
            }
        }
        ```
        

- 抽象類別
    - 如果一個類別不應該被直接實例化，而是作為基底類別使用，你可以使用 `abstract`：
    - 
    
    ```tsx
    abstract class Vehicle {
      constructor(public brand: string) {}
    
      abstract move(): void; // 抽象方法，子類別必須實作
    }
    
    class Car extends Vehicle {
      move(): void {
        console.log(`${this.brand} is moving on the road!`);
      }
    }
    
    const myCar = new Car("Toyota");
    myCar.move(); // Toyota is moving on the road!
    ```
    

- 類別的型別
    - 給類別加上 TypeScript 的型別很簡單，與介面類似：
    - 
        
        ```tsx
        class Animal {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
            sayHi(): string {
              return `My name is ${this.name}`;
            }
        }
        
        let a: Animal = new Animal('Jack');
        console.log(a.sayHi()); // My name is Jack
        ```
        

## 類別與介面

> 實現（implements）是面向物件中的一個重要概念。一般來講，一個類別只能繼承自另一個類別，有時候不同類別之間可以有一些共有的特性，這時候就可以把特性提取成介面（interfaces），用 `implements` 關鍵字來實現。
> 

- 類別實作介面（Implements）
    - 
        
        ```tsx
        interface Animal {
          name: string;
          makeSound(): void;
        }
        
        class Dog implements Animal {
          name: string;
        
          constructor(name: string) {
            this.name = name;
          }
        
          makeSound(): void {
            console.log(`${this.name} says Woof!`);
          }
        }
        
        const myDog = new Dog("Buddy");
        myDog.makeSound(); // Buddy says Woof!
        ```
        
        - `implements` 讓 `Dog` **必須** 實作 `Animal` 介面中的 `name` 和 `makeSound()`，否則會報錯。
- 介面的擴展（Extends）
    - 介面可以繼承其他介面
    - 
    
    ```tsx
    interface Animal {
      name: string;
      makeSound(): void;
    }
    
    interface Pet extends Animal {
      owner: string;
    }
    
    const myPet: Pet = {
      name: "Buddy",
      makeSound() {
        console.log("Woof!");
      },
      owner: "Alice",
    };
    
    console.log(myPet.owner); // Alice
    
    ```
    

- 介面繼承類別
    - 
        
        ```tsx
        class Point {
            x: number;
            y: number;
        }
        
        interface Point3d extends Point {
            z: number;
        }
        
        let point3d: Point3d = {x: 1, y: 2, z: 3};
        ```
        

**類別 vs. 介面（Class vs. Interface）**

| 比較 | **類別（Class）** | **介面（Interface）** |
| --- | --- | --- |
| **用途** | 用來建立物件（包含屬性 & 方法） | 用來定義物件的結構 |
| **可否包含實作？** | ✅ 可以 | ❌ 不能 |
| **可否繼承？** | ✅ 可用 `extends` 繼承 | ✅ 可用 `extends` 擴展 |
| **可否多重繼承？** | ❌ 不行（但可用介面解決） | ✅ 可以多重繼承 |
| **是否有存取修飾詞？** | ✅ `public` / `private` / `protected` | ❌ 只能定義結構 |