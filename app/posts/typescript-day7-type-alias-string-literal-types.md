---
title: "【TypeScript】 Day7 閱讀和實作「型別別名」和「字串字面量型別」。"
description: "型別別名用 type 定義，允許為型別取別名；字串字面量型別限制取值為特定字串。示例中展示了如何使用這兩種型別進行函數參數約束。"
date: "2025-01-29"
tags: ["frontend","typescript"]
---

## 型別別名

用 `type` 另取一個型別的代稱。

```tsx
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 字串字面量型別

字串字面量 (String Literal) 型別用來約束取值只能是某幾個字串中的一個。

```tsx
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 沒問題
handleEvent(document.getElementById('world'), 'dbclick'); // 報錯，event 不能為 'dbclick'

// index.ts(7,47): error TS2345: Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```

**型別別名與字串字面量型別都是使用 `type` 進行定義。**