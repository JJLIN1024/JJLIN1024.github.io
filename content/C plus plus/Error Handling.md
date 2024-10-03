---
title: Error Handling
date: 2024-10-03
lastmod: 2024-10-03
author:
  - Jimmy Lin
tags: 
draft: false
---

Prefer using exceptions to signal an error, but not error code. Pair it with [[RAII (Resource Acquisition is Initialization)]] is ideal.

Since throwing exceptions will cause the stack to be unwind, and it will be propagated to the one with a try catch block. While error code must be handled at each function along the call stack.

```cpp
#include <iostream>
#include <stdexcept>

void level3() {
    throw std::runtime_error("Error at level 3");
}

void level2() {
    level3();
}

void level1() {
    level2();
}

int main() {
    try {
        level1();
    } catch (const std::exception& e) {
        std::cout << "Caught exception: " << e.what() << std::endl;
        std::cout << "This error originated in level3(), but was caught here in main()" << std::endl;
    }
    return 0;
}
```