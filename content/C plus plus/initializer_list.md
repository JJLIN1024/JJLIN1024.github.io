---
title: initializer_list
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---

```cpp
// template<typename T>
// auto sum(const T& t) {
//     return t;
// }

// template<typename First, typename Second, typename ...T>
// auto sum(const First& first, const Second& second, const T& ...t) {
//     return first + sum(second, t...);
// }

#include <initializer_list>

template<typename First, typename Second, typename ...T>
auto sum(const First& first, const Second& second, const T& ...t) {
    auto result = first;
    (void)std::initializer_list<int>{(result += t, 0)...};
    return result;
}

int main() {
    auto S = sum(1.0, 2, 3000);
    return 0;
}
```