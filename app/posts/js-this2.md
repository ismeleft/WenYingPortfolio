---
title: "【JS】this 學習筆記(二)：如何指定 this 的值"
description: "學完第一篇筆記差不多就有點暈頭轉向，希望過陣子回頭看的時候都還記得。如果有比較合適的 `this` 實作，也歡迎推薦給我。"
date: "2024-2-19"
tags: ["javascript","this"]
---


## 前言

學完第一篇筆記差不多就有點暈頭轉向，希望過陣子回頭看的時候都還記得。如果有比較合適的 `this` 實作，也歡迎推薦給我。

## 概述

如何指定 `this` 的值？有以下幾種方式，

1. 呼叫函式時指定
    1. call 
        
        ```jsx
        // 語法
        call(thisArg, arg1, arg2)
        
        // 範例
        function greet() {
          return `Hello, ${this.name}`;
        }
        const person = { name: 'Alice' };
        console.log(greet.call(person)); // "Hello, Alice"
        ```
        
    2. apply
        
        ```jsx
        // 語法
        apply(thisArg, argsArray)
        
        // 範例
        function introduce(language, hobby) {
          return `My name is ${this.name}, I love ${language} and ${hobby}.`;
        }
        const person = { name: 'Bob' };
        console.log(introduce.apply(person, ['JavaScript', 'cycling'])); 
        // "My name is Bob, I love JavaScript and cycling."
        ```
        
2. 創建函式時指定
    1. bind
    
        
        ```jsx
        function greet() {
          return `Hello, ${this.name}`;
        }
        const person = { name: 'David' };
        const greetDavid = greet.bind(person);
        console.log(greetDavid()); // "Hello, David"
        ```
        
    2. 箭頭函式
        
        ```jsx
        
        const food = {
                name: "蛋炒飯",
                eat() {
                  console.log(this); // food物件 
        					//一般函式 
                  setTimeout(function () {
                    console.log(this); //window
                  }, 1000);
                },
              };
              food.eat();
        
        const food = {
                name: "蛋炒飯",
                eat() {
                  console.log(this);// food物件 
                  setTimeout(() => {
                    console.log(this);// food物件 
                  }, 1000);
                },
              };
        ```
        

## 延伸：一般函式 vs. 箭頭函式

在普通函數中，this 的值取決於呼叫函數的方式。 如果直接呼叫函數（例如 myFunction()），this 通常會指向全域物件（在瀏覽器中是 window，在 Node.js 中是 global）。
如果函數作為某個物件的方法被調用，那麼 this 將指向那個物件。

箭頭函數不會建立自己的 this 上下文，因此它內部的 this 值與它被定義時的上下文中的 this 值相同。