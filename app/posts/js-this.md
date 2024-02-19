---
title: "【JS】this 學習筆記(一)：如何確認 this 的值"
description: "學習 JavaScript 的路上，有一大堆練習的時候沒用過，但是面試的時候會考的觀念，this 就是其中之一，與其每次看到題目要半用猜的，不如就真的嘗試把它弄懂吧。"
date: "2024-2-18"
tags: ["javascript","this"]
---

## 前言

學習 JavaScript 的路上，有一大堆練習的時候沒用過，但是面試的時候會考的觀念，this 就是其中之一，與其每次看到題目要半用猜的，不如就真的嘗試把它弄懂吧。

## 概述

要判斷 this 的值，可以分為幾個觀點下去看，

1. 全域
2. 函式
3. 嚴格模式(使用`use strict`)
4. 非嚴格模式
5. 物件調用

以下幾個範例：

1. 全域下的嚴格模式 → window
    
    ![全域下的嚴格模式](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/4d900551-f02c-4a13-9e3e-a2a0a24408f4)
    

2. 全域下的非嚴格模式 → window
    
    ![全域下的非嚴格模式](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/b7bafa92-1249-4e07-ad5d-dd15a89086d0)
    

3. 函式中的嚴格模式 → undefined

    ![函式中的嚴格模式](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/83a31f6e-5128-4fa6-89ce-614ab1658eaf)

4. 函式中的非嚴格模式 → window
    
    ![函式中的非嚴格模式](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/d1dffbd9-5eb2-48bc-b74d-be8d2ef6d9d4)
    
5. 嚴格模式的物件調用 →印出整個調用對象

    ![嚴格模式的物件調用](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/c82d4ee7-a0dd-4f35-80c1-069c2577b132)


6. 非嚴格模式的物件調用 →印出整個調用對象
    
    ![非嚴格模式的物件調用](https://github.com/ismeleft/WenYingPortfolio/assets/76611330/a6af414c-4ba7-4798-b699-ea318b2da3ee)
    
---

以下是我請 ChatGPT 調整面試題後出的題目，

```jsx
function foo() {
  console.log(this.a);
}

var obj1 = { a: 1, foo: foo };
var obj2 = { a: 2, foo: foo };

var a = 3;
let b = 4;

obj1.foo();        // 問題1
obj2.foo();        // 問題2

setTimeout(obj1.foo, 0);  // 問題3
setTimeout(function() { obj2.foo(); }, 0);  // 問題4

setTimeout(() => console.log(this.a), 0);  // 問題5
setTimeout(() => console.log(this.b), 0);  // 問題6
```

在這段代碼中，你需要考慮以下問題：

1. 問題1和問題2的`console.log(this.a);`會分別輸出什麼？為什麼？
2. 問題3的`setTimeout(obj1.foo, 0);`會輸出什麼？為什麼？
3. 問題4的`setTimeout(function() { obj2.foo(); }, 0);`會輸出什麼？這與問題3有什麼不同？
4. 問題5和問題6中的箭頭函數會輸出什麼？為什麼`this.a`和`this.b`的行為不同？

這個題目深入探討了如何通過不同方式引用和調用函數會如何影響`this`的指向，以及`var`和`let`聲明變量時作用域的差異如何影響`this`的解析。

歡迎先思考後再看下方的解答，這一樣是我每次遇到都要半猜測的題目。

---

解答：

1. 當`obj1.foo()`和`obj2.foo()`被調用時，`this`分別指向`obj1`和`obj2`，因此會輸出它們各自的`a`屬性值，即1和2。
2. `setTimeout`中傳遞的函數是直接引用`obj1.foo`，而當它被執行時，它已經脫離了`obj1`的上下文，因此此時的`this`在非嚴格模式下指向全局對象（在瀏覽器中是`window`），`var a = 3;`在全局作用域中聲明了`a`，因此輸出是3。
3. 這裡使用了一個匿名函數作為`setTimeout`的回調，這個匿名函數內部調用了`obj2.foo()`。由於`foo`是作為`obj2`的方法被調用，所以`this`指向`obj2`，因此會輸出`obj2`的`a`屬性值2。
4. 箭頭函數不綁定自己的`this`，它們捕獲它們被創建時的`this`值。在全局代碼中使用箭頭函數時，`this`指向全局對象（在瀏覽器中是`window`）。然而，關於`this.a`和`this.b`的輸出，有一些需要澄清的地方：
- 對於`this.a`，由於`a`是用`var`聲明的，它會成為全局對象的一個屬性，所以在箭頭函數中`this.a`會輸出3。
- 對於`this.b`，情況就有所不同。因為`b`是用`let`聲明的，它不會成為全局對象的屬性。因此，`this.b`會是`undefined`，而不是4。這顯示了`var`和`let`**在作用域和全局對象屬性方面的差異。

---

以上是我對本次段落的整理，歡迎一起討論：）