---
title: guaranteed copy elison
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags: 
draft: false
---
This is not a copy nor a move. (C++ 17)

```cpp
struct S {
    S() = default;
    S(S&&) = delete;
    S(const S&) = delete;
};

auto s_factory() {
    return S{};
}

int main() {
    return 0;
}
```