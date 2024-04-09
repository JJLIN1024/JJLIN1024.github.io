---
title: variant
date: 2024-04-01
lastmod: 2024-04-01
author:
  - Jimmy Lin
tags: 
draft: false
---
From ChatGPT:

std::variant 是 C++17 中引入的一個範本類，用於表示可以儲存多種類型中的一種的值。它提供了一種類型安全的聯合（union）替代方案，避免了傳統聯合可能引發的未定義行為和類型不一致的問題。

- 主要特點和優勢
	- 類型安全：std::variant 在編譯時就會檢查可能儲存的所有類型，並確保對值進行訪問時類型是正確的，從而避免了執行階段錯誤。
	- 訪問和操作：可以使用`std::get`、`std::get_if`、`std::visit` 等函數來訪問和操作 `std::variant` 中的值，使得對聯合成員的處理變得更加方便。

```cpp

```

## Reference
- [std::variant](https://en.cppreference.com/w/cpp/utility/variant)
- [如何優雅的使用 std::variant 與 std::optional](https://zhuanlan.zhihu.com/p/366537214)
