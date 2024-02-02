---
title: Move Semantics
date: 2024-01-31
lastmod: 2024-01-31
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---
## The use of a r-value reference is a l-value

```cpp
#include <iostream>
void g(int&& x) {
    std::cout << x << "\n";
}

void f(int&& x) {
    g(x);
}
int main() {
    f(52); 
}
```

```console
<source>:8:7: error: cannot bind rvalue reference of type 'int&&' to lvalue of type 'int'
    8 |     g(x);
      |       ^
<source>:3:14: note:   initializing argument 1 of 'void g(int&&)'
    3 | void g(int&& x) {
      |        ~~~~~~^
```


## The source code of std::move

```cpp
template <class _Tp>
_LIBCPP_NODISCARD_EXT inline _LIBCPP_HIDE_FROM_ABI _LIBCPP_CONSTEXPR __libcpp_remove_reference_t<_Tp>&&
move(_LIBCPP_LIFETIMEBOUND _Tp&& __t) _NOEXCEPT {
  typedef _LIBCPP_NODEBUG __libcpp_remove_reference_t<_Tp> _Up;
  return static_cast<_Up&&>(__t);
}

template<class T>
constexpr remove_reference_t<T>&& move(T&& t) noexcept {
	return static_cast<remove_reference_t<T>&&> t;
}
```

std::move does not move anything, it just cast the parameter into a r-value, so that it can be bound to a r-value reference.

