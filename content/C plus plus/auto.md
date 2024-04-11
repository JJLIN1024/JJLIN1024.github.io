---
title: auto
date: 2024-04-10
lastmod: 2024-04-10
author:
  - Jimmy Lin
tags: 
draft: false
---
## Type Deduction

C++ auto 的 type deduction 規則和 [[template type deduction]] ㄧ樣，應該說，完全就是一種 mapping，除了一個例外：

the only real difference between auto and template type deduction is that auto assumes that a braced initializer represents a `std::initializer_lis`t, but template type deduction doesn’t.

當牽涉到 `std::initializer_list` 時：

```cpp
int main() {
  auto x = {1, 2, 3}; // error: cannot deduce type of initializer list because std::initializer_list was not found; include <initializer_list>
  return 0;
}
```


```cpp
#include <initializer_list>
int main() {
  auto x = {1, 2, 3}; // success!
  return 0;
}
```

The [compiler](https://cppinsights.io/) sees it (`{1, 2, 3}`) as `std::initializer_list<T>`, and then try to deduce T, in this case, a int:

```cpp
#include <initializer_list>

int main()
{
  std::initializer_list<int> x = std::initializer_list<int>{1, 2, 3};
  return 0;
}

```

However, the following case failed, because the compiler fails to deduce type T:

```cpp
#include <initializer_list>

int main() {
  auto x = {1, 2, 3.23}; // error: deduced conflicting types ('int' vs 'double') for initializer list element type
  return 0;
}
```

另外一個要注意的點是：

auto in a **function return type** or a **lambda parameter** implies template type deduction, not auto type deduction.

所以

```cpp
#include <iostream>
#include <vector>
#include <initializer_list>

auto func2() {
  return {1, 2, 3};
};

int main()
{	
  std::vector<int> v{};
  auto func = [&v](const auto& V){v = V;};
  func({1,2,3}); // error: no matching function for call to object of type lambda
  
  auto x = func2(); // error: cannot deduce return type from initializer list
}
```