---
title: scoped enum
date: 2024-04-10
lastmod: 2024-04-10
author:
  - Jimmy Lin
tags: 
draft: false
---
scoped enum 除了可以防止 namespace pollution 之外，還可以避免 enum 的成員被 implicitly convert to integer。

```cpp
#include <iostream>

int main() {
    enum class Number {zero, one, two, three};
    if(Number::zero < 3) { // error: no match for 'operator<' (operand types are 'main()::Number' and 'int')
        std::cout << "smaller!\n"; 
    } else {
        std::cout << "bigger!\n";
    }
}
```

對照 unscoped 的 enum：

```cpp
#include <iostream>

int main() {
    enum Number {zero, one, two, three};
    if(zero < 3) {
        std::cout << "smaller!\n";
    } else {
        std::cout << "bigger!\n";
    }
}
// output: smaller!
```