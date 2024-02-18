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
    

