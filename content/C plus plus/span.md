---
title: span
date: 2024-04-01
lastmod: 2024-04-01
author:
  - Jimmy Lin
tags: []
draft: false
---
From ChatGPT：

`std::span` 是 C++20 中引入的一個範本類，用於表示一段連續的記憶體區域，類似於指針和長度的組合。它提供了對連續記憶體範圍的安全、簡潔的訪問和操作方式，避免了常見的指針錯誤和記憶體越界訪問。

主要特點和優勢包括：

1. **安全性和簡潔性**：`std::span` 在設計上避免了指針和長度分離帶來的潛在問題，提供了一種更安全、更簡潔的方式來表示和操作記憶體區域。
2. **零開銷**：`std::span` 是一個非擁有式的容器，它不擁有記憶體資源，只是對已存在的記憶體區域進行引用。因此，它幾乎沒有額外的記憶體開銷。
3. **範圍表示**：`std::span` 可以表示各種不同的記憶體範圍，包括陣列、標準容器、C 風格陣列等。
4. **靈活性**：`std::span` 可以用於函數參數、返回值、成員變數等多種場景，使得程式碼更加靈活、易於維護。

A simple example:

```cpp
#include <span>
#include <iostream>
#include <algorithm>

void print_array(std::span<int> S) {
    for(auto& n: S) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
}

int main() {
  int A[5] = {1, 2, 5, 4, 3};
  std::span A_span{A};
  std::sort(A_span.begin(), A_span.end());
  print_array(A_span);
  return 0;
}
```
