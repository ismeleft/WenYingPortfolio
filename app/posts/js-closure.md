---
title: "【JS】閉包 closure 學習筆記"
description: "根據之前看過幾個教學影片，只有理解到「函式包函式」就是閉包，除此之外，我好像沒有更深的理解。
這次跟朋友約了每週一起討論一個 JS 概念，想說順便也打成文章記錄下來。"
date: "2024-2-29"
tags: ["javascript","closure"]
---

### 前言

根據之前看過幾個教學影片，只有理解到「函式包函式」就是閉包，除此之外，我好像沒有更深的理解。

這次跟朋友約了每週一起討論一個 JS 概念，想說順便也打成文章記錄下來。

概念主要參照 Zet 的系列文，來進行學習。

[[Day 02] 學好 React 需要的前置基本功](https://ithelp.ithome.com.tw/articles/10292582)

首先，需要先了解閉包的定義：閉包的核心概念是關於函式與其周圍狀態（lexical environment）的關係，即內部函式即使在外部函式執行完畢後，仍然能夠訪問外部函式的變數。

由 MDN 範例，可以知道內部函式可以取到外部函式 `init`所宣告的變數。

比較特別的是，以下兩個範例看起來很相似，但有其不同之處。

```jsx
function init() {
  var name = "Mozilla"; // name 是個由 init 建立的局部變數
  function displayName() {
    // displayName() 是內部函式，一個閉包
    alert(name); // 使用了父函式宣告的變數
  }
  displayName();
}
init();
```

```jsx
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();

```

我請 ChatGPT 針對這兩個函式給了一個解釋。

這兩個JavaScript函式展示了閉包的基本概念，但它們展示這一概念的方式略有不同，也表達了，閉包可以透過返回值傳遞出來。

### 第一個函式：`init()`

- 此函式定義了一個局部變數`name`和一個內部函式`displayName()`。
- `displayName()`作為一個閉包，可以訪問外部函式`init()`中的變數`name`。
- `init()`函式在其內部直接調用了`displayName()`，然後函式執行完畢。
- 這裡的重點在於閉包`displayName()`是在其父函式`init()`內部被調用的。一旦`init()`函式執行完畢，除了`displayName()`在執行時對`name`變數的訪問，外部就無法再訪問`name`變數。

### 第二個函式：`makeFunc()`

- 與`init()`類似，`makeFunc()`函式也定義了一個局部變數`name`和一個內部函式`displayName()`。
- 不同之處在於`makeFunc()`不是直接調用`displayName()`，而是將`displayName()`作為一個函式返回值返回。
- 當`makeFunc()`被調用並將返回值賦給`myFunc`變數時，`myFunc`實際上就是一個引用了`displayName()`函式的變數。
- 這意味著即便`makeFunc()`函式執行完畢，我們仍然可以通過`myFunc()`來調用`displayName()`函式，並訪問在`makeFunc()`作用域中定義的`name`變數。

### 差異

- **調用方式的差異**：`init()`內部直接調用了`displayName()`，而`makeFunc()`則是返回了`displayName()`函式，允許外部通過另一個變數來調用它。
- **對外部訪問的控制**：`makeFunc()`通過返回函式，允許將內部函式的引用傳遞給外部作用域，從而在外部作用域中控制內部函式的調用和變數的訪問。而`init()`則限制了這種訪問僅在函式內部發生。

總之，這兩個例子都展示了閉包如何能夠記住和訪問其外部函式的變數，即使外部函式已經執行完畢。但它們在如何利用這一特性上有所不同，特別是在如何將閉包暴露給外部作用域方面。

---

### 閉包實際案例

MDN上舉的實際應用案例，是利用閉包的方式，讓使用者點選按鍵後調整字體大小，心得是「真的是漂亮的程式碼」！

我直接將連結放到底下

[閉包 - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures#實用的閉包)


另外，我也有從下方影片連結進行學習，

[谈谈闭包和闭包的应用场景,2周刷完前端面试题之JavaScript面试题-18_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV16D4y137QQ/?spm_id_from=333.337.search-card.all.click&vd_source=aecd133b2dec25a841454ca8cafd22f6)

影片中介紹三種閉包的使用內容：

1. 函式當作返回值傳回

```jsx

function fn(){
	const a=1;
	return function(){
	console.log(a);

}}

const a=3;
const result = fn();
result(); //1
```

這跟前面 MDN 網站中提到的內容一樣，也就是可以透過 `return` 將內部函式的值傳遞出來。

1. 函式當作參數傳遞
    
    ```jsx
    function fn(cb){
        const a= 100;
        cb();
    }
    const a=500;
    fn(function(){
        console.log(a); //500
    }) 
    ```
    

1. 立即執行函式
在這邊用一個簡單的demo，有四個按鈕，希望點選第一個按鈕印出0，點選第二個按鈕印出1，以此類推，下方程式碼會導致都印出4，因為是`var`迴圈執行會在內部資料還沒執行完就結束了，所以全部會印出4
    
    ```jsx
      <body>
        <button>0</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </body>
      <script>
        const Btn = document.getElementsByTagName("button");
        for (var i = 0; i < Btn.length; i++) {
          Btn[i].onclick = function () {
            console.log(i); //點每個按鈕都會印出4
          };
        }
      </script>
    
    ```
    
    有兩種解決方式，第一種是把`var` 改成`let` 那就可以直接解決，第二種就是使用閉包，
    
    ```jsx
      <body>
        <button>0</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </body>
      <script>
        const Btn = document.getElementsByTagName("button");
        for (var i = 0; i < Btn.length; i++) {
          (function (index) {
            Btn[i].onclick = function () {
              console.log(index);//印出0.1.2.3
            };
          })(i);
        }
      </script>
    
    ```


---

### 使用閉包的好處

1. 在專案變得龐大的時候，使用過多的全域變數容易造成不可預期的錯誤，例如變數名稱重複

[重新認識 JavaScript: Day 19  閉包 Closure - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://arc.net/l/quote/tyaavnka)

1. 閉包促進模組化和重用性
2. 增強程式碼安全性

以下是我請 ChatGPT 提供的範例：

```jsx
var createCounter = function() {
    var count = 0; // 私有變量

    return {
        increment: function() {
            count++;
            console.log(count);
        },
        decrement: function() {
            count--;
            console.log(count);
        },
        getCount: function() {
            return count; // 提供一個方法來讀取當前計數，但不允許直接修改
        }
    };
};

var counter1 = createCounter();
counter1.increment(); // 輸出：1
counter1.increment(); // 輸出：2
console.log(counter1.getCount()); // 輸出：2

var counter2 = createCounter();
counter2.decrement(); // 輸出：-1
console.log(counter2.getCount()); // 輸出：-1

```

---
    
### 閉包的性能考量
    
閉包可能帶來的性能考量，比如記憶體消耗。因為閉包可能會阻止垃圾收集器清理不再需要的變數，因此在一些性能敏感的應用中需要謹慎使用。