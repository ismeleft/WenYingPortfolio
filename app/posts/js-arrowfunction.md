---
title: "【JS】箭頭函式 Arrow Function 學習筆記"
description: "箭頭函式這個主題雖然看起來不會太難，但我想說我就把一些東西整理下來，還有我腦袋裡想到的疑問記錄下來。"
date: "2024-3-10"
tags: ["javascript","arrowfunction","this"]
---

## 前言

箭頭函式這個主題雖然看起來不會太難，但我想說我就把一些東西整理下來，還有我腦袋裡想到的疑問記錄下來。

## 箭頭函式是什麼？

跟一般函式有哪些差異？

根據 MDN 文件上的說明：

箭頭函式沒有自己的 [this](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/this)、[arguments ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)、[super](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/super)、[new.target ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target) 等語法。本函式運算式適用於非方法的函式，但不能被用作建構式（constructor）。

1. 語法的不同

以下使用一個一樣意思的範例做一般函式與箭頭函式的比較。

```jsx
// 一般函式有兩種寫法
function hello(){
	console.log("Hi");
}

let hello = function(){
	console.log("Hi");
}

// 箭頭函式
const hello=()=>{
	console.log("Hi");
}
```

上面是常見的不同之處，差異不算太大，但就針對箭頭函式的寫法，也是有以下幾種，因為它還能再簡化。

這邊再用一個簡單的範例來說明：

```jsx
// 一般箭頭函式的寫法
// 以下方的例子來說，如果結果還有用變數包裝的話，這樣是無法再簡化的
const plusValue = (a,b)=>{
	let result= a+b;
	return result;
}

//所以，如果不用變數包裝，我們就能將大括號拿掉，甚至也可以不用寫return
const plusValue = (a,b)=> a+b;

--------再舉個不同的例子-------
// 如果是只有一個參數的話，甚至還能不寫小括號，但沒有參數的話，是一定要寫小括號

const sayHi=(someone)=> `我是${someone}`
console.log(sayHi("小明"))

//拿掉小括號
const sayHi = someone => `我是${someone}`
console.log(sayHi("小明"))

-----另外補充-----
如果有用大括號，就一定要return 回傳值，不然會變 undefined
```

1. 指向的 `this` 不同
    1. 一般函式指向的是取決於函式調用的方式
    2. 箭頭函式本身並沒有`this`，由上下文做定義，在函式定義時就已經確定。
    
    箭頭函式的這種特性使得它們在某些場景下特別有用，例如在事件處理函式中或在構造函式的方法中使用`this`時不需要手動綁定。

    
    **一般函式**中的`this`取決於函式被調用的方式:
    
    1. **作為一般函式調用**時,`this`指向全域物件(在瀏覽器中為`window`,在Node.js中則是`global`)。
    2. **作為物件的方法被調用**時,`this`指向該物件。
    3. **使用new關鍵字構造時**,`this`指向新創建的實例物件。
    4. **使用apply/call/bind**時,`this`由傳入的值決定。
    
    **箭頭函式**則是根據包含該箭頭函式的外圍函式或全域來決定`this`的值。箭頭函式本身沒有`this`值,它的`this`是由上下文中定義的。這意味著，箭頭函式內部的`this`與包含它的外圍函式中的`this`保持一致。
    
    這種行為對於處理事件回調或在內部函式中使用`this`來訪問外部函式的實例屬性時很有用，因為箭頭函式不會重新綁定`this`。
    
    舉個簡單的例子:
    
    ```jsx
    // 一般函式
    function Person() {
      this.name = 'John';
      this.age = 30;
      this.greet = function() {
        console.log('Hello, my name is ' + this.name);
      }
    }
    
    // 指向新創建的實例物件
    let person = new Person();
    person.greet(); // 輸出 "Hello, my name is John"
    
    ----------
    
    // 箭頭函式
    const Person = {
      name: 'John',
      age: 30,
      greet: () => {
        console.log('Hello, my name is ' + this.name); // this指向全域對象window/global
      }
    }
    
    Person.greet(); // 輸出 "Hello, my name is undefined"
    
    ```
    
    在上面的例子中，對於普通函式`greet()`而言,它的`this`指向實例化後的`person`對象。但是對於箭頭函式`greet()`而言，它的`this`指向了包含它的對象`Person`，也就是全域對象,所以輸出了`undefined`。
    
    總的來說,使用一般函式時需要注意`this`的指向問題；而箭頭函式的`this`則是由外圍作用域決定的，通常可以簡化`this`的使用。
    

補充:

1. **箭頭函式沒有自己的`arguments`對象**
    - 箭頭函式內部無法直接訪問傳統的`arguments`對象，但可以透過`...`語法(剩餘參數)來訪問參數列表。

        在傳統的一般函式中，每個函式內部都有一個 `arguments` 對象，它是一個類似陣列的對象，包含了傳入該函式的所有參數值。舉例來說:
    
    ```jsx
    function myFunction() {
      console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
    }
    
    myFunction(1, 2, 3);
    
    ```
    
    然而，箭頭函式並沒有這個 `arguments` 對象。如果你在箭頭函式內部嘗試訪問 `arguments`，實際上會獲得箭頭函式外層作用域中的 `arguments` 值:
    
    ```jsx
    const myFunction = () => {
      console.log(arguments); // Uncaught ReferenceError: arguments is not defined
    }
    
    myFunction(1, 2, 3);
    
    ```
    
    這是因為箭頭函式本身沒有自己的 `this`、`arguments`、`super` 或 `new.target` 綁定,所以在箭頭函式內部無法直接訪問傳統的 `arguments` 對象。
    
    不過,你可以透過ES6引入的**剩餘參數語法**(`...`)來獲取箭頭函式的參數列表:
    
    ```jsx
    const myFunction = (...args) => {
      console.log(args); // [1, 2, 3]
    }
    
    myFunction(1, 2, 3);
    
    ```
    

2. **箭頭函式沒有原型(prototype)屬性**
    - 因此無法作為構造函式使用，也無法使用`new`關鍵字實例化對象。
3. **箭頭函式不能作為產生器(generator)使用**


    

---

以下是我想到的一些延伸問題，並都使用 Claude 3 這個 AI 工具協助回覆：

1. 為什麼 callback function 都是用箭頭函式？
    - Claude 回覆
        
        在JavaScript中，我們經常會在callback function中使用箭頭函式，主要有以下幾個原因:
        
        1. **簡潔的語法**
        箭頭函式語法比一般函式更簡潔，尤其在作為回調函式傳遞時非常方便。它們可以省去`function`關鍵字，並在只有一個參數時省略括號。
        2. **lexical `this` binding**
            
            一般函式中的`this`取決於調用方式，很容易發生`this`錯亂的情況。而箭頭函式的`this`是由外層作用域中的`this`決定的(lexical binding)，因此在作為回調時不會意外改變`this`的指向，避免了手動綁定`this`的需求。
            
        3. **無自身作用域**
        箭頭函式沒有自己的`this`、`arguments`、`super`或`new.target`，它們由包含箭頭函式的最內層非箭頭函式決定，這使得在回調中使用外層函式的`this`更加方便。
        4. **沒有構造器**
        箭頭函式不能作為構造器使用，並且沒有`prototype`屬性，這避免了在回調中意外調用構造函式。
        5. **非方法函式簡潔**
        由於箭頭函式通常不會作為方法使用，而主要作為簡潔的非方法回調，所以使用箭頭函式更加簡潔。
        
        舉一個簡單的示例:
        
        ```jsx
        const obj = {
          value: 'awesome',
          getValue: function() {
            // 傳統函式
            setTimeout(function() {
              console.log(this.value); // this指向window對象,輸出undefined
            }, 1000);
        
            // 箭頭函式
            setTimeout(() => {
              console.log(this.value); // this繼承外層getValue的this,輸出'awesome'
            }, 1000);
          }
        }
        
        obj.getValue();
        
        ```
        
  
        
2. 在 React 中，在寫 JSX 呼叫函式的時候，為什麼有時候是直接呼叫函式，有時候是寫 callback function?
    - Claude 回覆
        
        在 React 中使用 JSX 呼叫函式時，有直接呼叫和使用回調函式兩種情況，主要是根據該函式是否需要傳入參數來決定:
        
        1. **直接呼叫函式**
            - 當該函式不需要任何參數時，可以直接在 JSX 中呼叫它。
            - 例如一個簡單的按鈕點擊事件處理函式:
        
        ```jsx
        function handleClick() {
          console.log('Button clicked');
        }
        
        // 在 JSX 中直接呼叫
        <button onClick={handleClick}>Click Me</button>
        
        ```
        
        1. **使用回調函式**
            - 當該函式需要傳入參數時，我們通常會使用一個回調函式來傳遞這些參數。
            - 這是因為直接呼叫該函式會立即執行並使用預設參數值，而不是等待事件發生時再執行。
            - 例如一個按鈕點擊事件需要獲取事件對象:
        
        ```jsx
        function handleClick(event) {
          console.log('Button clicked'， event);
        }
        
        // 使用回調函式傳入參數
        <button onClick={(e) => handleClick(e)}>Click Me</button>
        
        ```
        
        在上面的例子中，如果直接寫 `onClick={handleClick(e)}`，那麼 `handleClick` 會在渲染時就執行一次，得到的 `event` 是 `undefined`。所以使用箭頭函式作為回調，只在事件發生時才會執行 `handleClick`。
        
        另外一個常見情況是傳遞一些額外的數據作為參數:
        
        ```jsx
        const products = [...];
        
        function buyProduct(id, event) {
          // 處理購買產品的邏輯
        }
        
        // 在 JSX 中傳入 id 參數
        {products.map(product => (
          <button onClick={(e) => buyProduct(product.id， e)}>
            Buy {product.name}
          </button>
        ))}
        
        ```
        
        總的來說,在 React 的 JSX 中:
        
        - 不需要參數就直接呼叫函式
        - 需要傳入參數則使用回調函式(通常是箭頭函式)來傳遞參數
        
        這種做法能確保在正確的時間點(即事件發生時)和正確的上下文中執行相應的事件處理程序。
        

---

參考資料：

[箭頭函式 - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)