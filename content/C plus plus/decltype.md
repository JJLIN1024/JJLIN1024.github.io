---
title: decltype
date: 2024-04-10
lastmod: 2024-04-10
author:
  - Jimmy Lin
tags: 
draft: false
---
## decltype(auto)

decltype almost always yields the type of a variable or expression without any modifications.

考慮以下例子（C++ 14：function auto return type）：

```cpp
#include <vector>

template<typename Container, typename Index>
auto getter(Container& c, Index i)
{
  return c[i];
}

int main()
{	
  std::vector<int> A = {1, 2, 3};
  getter(A, 2) = 5; // error: expression is not assignable
}
```

[[auto]] 在推導 return type 時，如同 [[template type deduction]] 中的 case 1 說明的，會 ignore reference，所以在這裡 `getter(A, 2)` 回傳的是一個 r-value, which is not assignable。

要解決這個問題，要使用 decltype，如下，告訴 compiler， `c[i]` 原本的是什麼 type 就回傳什麼（即是 decltype 本身的功用）。

```cpp
#include <vector>

template<typename Container, typename Index>
decltype(auto) getter(Container& c, Index i)
{
  return c[i];
}

int main()
{	
  std::vector<int> A = {1, 2, 3};
  getter(A, 2) = 5; // valid!
}
```

我們可以進一步修改，使用 [[universal reference]] 和 [[forward]] 使這個 getter 更通用，具備處理 r-value reference 的能力：

```cpp
#include <vector>

template<typename Container, typename Index>
decltype(auto) getter(Container&& c, Index i)
{
  return std::forward<Container>(c)[i];
}

int main()
{	
  std::vector<int> A = {1, 2, 3};
  getter(A, 2) = 5; // valid
  getter(std::move(A), 2) = 4; // valid
}
```

## decltype on a l-value

 For lvalue expressions of type T other than names, decltype always reports a type of T&.

因為 (x) 為一個 l-value，所以f2() 會回傳 reference to local variable x！會導致 undefined behavior！

```cpp
decltype(auto) f1()
{
  int x = 2;
  return x;
}

decltype(auto) f2()
{
  int x = 2;
  return (x);
}

int main()
{	
  auto x1 = f1();
  auto x2 = f2();
}
```

what the [compiler](https://cppinsights.io/) sees:

```cpp
int f1()
{
  int x = 2;
  return x;
}

int & f2()
{
  int x = 2;
  return (x);
}

int main()
{
  int x1 = f1();
  int x2 = f2();
  return 0;
}
```