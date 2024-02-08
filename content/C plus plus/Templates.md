---
title: Templates
date: 2024-02-08
lastmod: 2024-02-08
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---
- Function templates are usually defined in header files, and they don't need inline
- [Constraints and concepts (since C++20)](https://en.cppreference.com/w/cpp/language/constraints)
- Don't use Class Template Argument Deduction(CTAD) unless deduction is obvious

```cpp
#include <iostream>
#include <vector>

#include <iostream>
#include <vector>
#include <concepts>
#include <functional>

// // C++20
// void printColl(const auto& coll) {
//     for(const auto& elem: coll) {
//         std::cout << elem << '\n';
//     }
// }

// C++ 17
template<typename T>
void printColl(const T& coll) {
    for(const auto& elem: coll) {
        std::cout << elem << '\n';
    }
}

// C++ 14
template<typename T>
auto mymax(T a, T b) {
    return b < a ? a : b;
}

// C++ 20: Concepts
template<typename T>
concept supportsLessThan = requires (T x) {x < x;};
template<typename T>
requires std::copyable<T> && supportsLessThan<T>
T mymax(T a, T b) {
    return b < a ? a : b;
}


int main() {
    std::vector<int> A = {1, 2, 3, 4, 5};
    printColl(A);

    // CTAD
    std::array B = {1, 2, 3};
    printColl(B);
    return 0;
}
```

## Variadic Template

必須要定義 `void print(){};`，用 recursion 的角度來思考，`print("hello", 7.5, 1000);` 相當於先 cout 出 hello，接著 call `print(7.5, 1000);`，以此類推，一直到最後會 call `print()`，這就是為何要定義  `void print(){};` 如果沒有定義的話會 compile error（`error: no matching function for call to 'print()'）。

```cpp
#include <iostream>

void print(){};

template<typename T, typename... Types>
void print(T firstArg, Types... args) {
    std:: cout << firstArg << '\n';
    print(args...);
}


int main() {
    print("hello", 7.5, 1000);
    return 0;
}
```

既然必須定義 `print()` 是因為 argument 數量為 0 導致的問題，那有沒有什麼可以讓我們檢查 argument 數量的方法呢？

```cpp
#include <iostream>

// void print(){};

// // error: no matching function for call to 'print()'
// template<typename T, typename... Types>
// void print(T firstArg, Types... args) {
//     std:: cout << firstArg << '\n';
//     if(sizeof...(args) > 0) // run-time if
//         print(args...);
// }

template<typename T, typename... Types>
void print(T firstArg, Types... args) {
    std:: cout << firstArg << '\n';
    if constexpr(sizeof...(args) > 0) // compile-time if
        print(args...);
}

int main() {
    print("hello", 7.5, 1000);
    return 0;
}
```
> 注意要使用 `constexpr` 來確保是 compile-time 就對 args 數量做檢查。

## constexpr (compilie-time) if check
```cpp
#include <iostream>
#include <concepts>
#include <vector>
#include <set>

// // C++ 20
// template<typename Coll>
// concept HasPushBack = requires (Coll c, Coll::value_type v) {
//     c.push_back(v);
// };

// void add(HasPushBack auto& coll, const auto& val) {
//     coll.push_back(val);
// }

// // error: ambiguous
// void add(auto& coll, const auto& val) {
//     coll.push_back(val);
// }

// void add(auto& coll, const auto& val) {
//     coll.insert(val);
// }

// C++20 + Compile-Time if check
void add(auto& coll, const auto& val) {
    if constexpr (requires {coll.push_back(val);}) {
        coll.push_back(val);
    } else {
        coll.insert(val);
    }
}

int main() {
    std::vector<int> coll1;
    std::set<int> coll2;

    add(coll1, 50);
    add(coll2, 51);
    return 0;
}
```
## Reference
- [Back to Basics: Templates in C++ - Nicolai Josuttis - CppCon 2022](https://youtu.be/HqsEHG0QJXU?si=bg9yjOyAtlpLdDuE)