---
title: concepts
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags: 
draft: false
---
```cpp
#include <iostream>

auto is_even(std::integral auto n) {
    return n % 2 == 0;
}

int main() {
    std::cout << is_even(30000000000000);
}
```
