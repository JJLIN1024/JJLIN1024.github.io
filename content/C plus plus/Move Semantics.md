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
- [Back to Basics: Move Semantics - Nicolai Josuttis - CppCon 2021](https://youtu.be/Bt3zcJZIalk?si=RA0erEiL_RkrCx1k)

## Without Move Semantics (C++03)

- unnecessary copies

```cpp
// Vector.hpp
template <typename T>
class Vector {
	public:
		...
		void push_back(const T& elem); 
		...
		void push_back(T&& elem);
};
```

```cpp
#include <utility> // std::move

std::vector<std::string> coll;
std::string s = getData();
...
coll.push_back(s); // void push_back(const T& elem) is called
coll.push_back(getData()); // temporary object, void push_back(T&& elem) is called
coll.push_back(s + s); // temporary object, void push_back(T&& elem) is called
coll.push_back(std::move(s)); // void push_back(T&& elem) is called
...

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

`std::move` does not move anything, it just cast the parameter into a r-value, so that it can be bound to a r-value reference.

## Class

- declare virtual destructor disable move semantics for all the members for this class


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

## Universal/forwarding Reference

因為 The use of a r-value reference is a l-value，所以 

```cpp
void call_foo(C&& x) {
	foo(std::move(x));
}
```

必須明確使用 `std::move(x)` 才能保持 move semantics。

也因此，我們使用 template 結合 forwarding 來自動達成這件事，因為當參數越來越多時，要手動對這些參數 call move 會很麻煩。

```cpp
#include <utility>
class C {};

void foo(const C& x) {};
void foo(C& x) {};
void foo(C&& x) {};

// void call_foo(const C& x) {
//     foo(x);
// }

// void call_foo(C& x) {
//     foo(x);
// }

// void call_foo(C&& x) {
//     foo(std::move(x));
// }

// Perfect Forwarding
template<typename T>
void call_foo(T&& x) {
    foo(std::forward<T>(x));
}


int main () {
    C c1;
    const C c2;

    call_foo(c1); // call foo(C&)
    call_foo(c2); // call foo(const C&)
    call_foo(C{}); // call foo(C&& x)
    call_foo(std::move(c1)); // call foo(C&& x)
    return 0;
}
```

這邊的 `T&& x` 並不是 r-value reference，而是 l-value, r-value reference 都可以對應，在上面的例子當中就是對應到三個不同的 `foo` function。

- [Universal References in C++11 -- Scott Meyers](https://isocpp.org/blog/2012/11/universal-references-in-c11-scott-meyers)
- auto &&

```cpp
// Perfect Forwarding
template<typename T>
void call_foo(T&& x) {
    foo(std::forward<T>(x));
}

```
