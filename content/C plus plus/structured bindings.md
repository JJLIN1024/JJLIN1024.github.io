---
title: structured bindings
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---
- Since C++17. 適用在各種 container 以及 object(class, struct) 上。
- Structured binding only works if the structure is **known at compile time**. This is not the case for the vector. 請見下方例子，當 array 被傳入到 function 中，若沒有提供長度參數，是不可能得知長度的，所以對 arr3 進行 structure binding 會導致 error。

```cpp
#include <iostream>
#include <tuple>
#include <map>
#include <array>

void f(std::array<int, 3> arr1, int (&arr2)[3], int (&arr3)[])
{
    auto [a1,b1,c1] = arr1;
    auto [a2,b2,c2] = arr2;
    auto [a3,b3,c3] = arr3; //  error: deduced type 'int []' for '<structured bindings>' is incomplete
};

int main() {
    std::tuple<int, double, int> t{1, 2.0, 1};
    auto [x, y, z] = t;
    std::cout << x << " " << y << " " << z << std::endl; // 1 2 1

    std::pair<int, int> p{1, 2};
    auto [p1, p2] = p;
    std::cout << p1 << " " << p2 << std::endl; // 1 2

    std::map<int, int> s;
    s[1] = 2;
    auto [key, value] = *s.begin();
    std::cout << key << " " << value << std::endl; // 1 2

    std::array<int, 3> arr1{1, 2, 3};
    auto [a1, b1, c1] = arr1;
    std::cout << a1 << " " << b1 << " " << c1 << std::endl; // 1 2 3

    int arr2[3]{1, 2 ,3};
    auto [aa, bb, cc] = arr2;
    std::cout << aa << " " << bb << " " << cc << std::endl;

    int arr3[] = {1, 2, 3};
    f(arr1, arr2, arr3);

}

```

```cpp
#include <map>
#include <string>
#include <iostream>

template <typename Key, typename Value, typename F>
void update(std::map<Key, Value>& m, F foo) {
    for(auto& [key, value] : m) {
        m[key] = foo(key);
    }
}
int main() {
    std::map<std::string, long long int> m {
        {"a", 1},
        {"b", 2},
        {"c", 3}
    };
    update(m, [](std::string key) {
        return std::hash<std::string>{}(key);
    });
    for (auto&& [key, value] : m)
        std::cout << key << ":" << value << std::endl;
}
```
## Reference
- [Structured binding declaration (since C++17)](https://en.cppreference.com/w/cpp/language/structured_binding)