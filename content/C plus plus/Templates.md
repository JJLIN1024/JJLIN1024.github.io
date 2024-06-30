---
title: Templates
date: 2024-03-19
lastmod: 2024-03-19
author:
  - Jimmy Lin
tags: 
draft: false
---
## Basics
```cpp
#include <iostream>
#include <string>

using namespace std;

struct Job {
    int salary;
    string employee;
};

template <typename T>
void Swap(T& a, T& b) {
    T tmp = a;
    a = b;
    b = tmp;
}

template void Swap<string>(string&, string&); // explicit instantiation

template <> void Swap<Job>(Job& j1, Job& j2) { // explicit specialization
    int tmp = j1.salary;
    j1.salary = j2.salary;
    j2.salary = tmp;
} 

int main() {
    
    // implicit instantiation for int
    int a = 10, b = 4;
    cout << a << " " << b << endl;
    Swap(a, b);
    cout << a << " " << b << endl;

    // explicit instantiation for string
    string sa = "jimmy";
    string sb = "lin";
    cout << sa << " " << sb << endl;
    Swap(sa, sb);
    cout << sa << " " << sb << endl;

    // use explicit specialization for struct Job
    struct Job j1 = {.salary = 100, .employee = "james"};
    struct Job j2 = {.salary = 200, .employee = "john"};
    cout << j1.employee << " " << j1.salary << endl;
    cout << j2.employee << " " << j2.salary << endl;
    Swap(j1, j2);  // use explicit specialization
    cout << j1.employee << " " << j1.salary << endl;
    cout << j2.employee << " " << j2.salary << endl;
    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

template <typename T>
T Add(T a, T b) {
    return a + b;
}

int main() {
    
    // implicit instantiation for int
    int a = 10, b = 4;
    cout << a << " " << b << endl;
    auto c = Add(a, b);
    cout << c << endl;

    // explicit instantiation of double
    double d = 4.56;
    auto e = Add<double>(a, d);
    cout << e << endl;
    return 0;
}
```
## Type Deduction

- [[template type deduction]]

## Variadic Template

- 參數展開的方式
	- 遞迴
		- 要寫 base case
		- C++17: using constexpr
	- [Fold expressions (since C++17)](https://en.cppreference.com/w/cpp/language/fold)

Recursion example:

```cpp
#include <iostream>

template<typename T0, typename ...T>
auto sum(T0 t0, T... t) {
    if constexpr (sizeof...(t) > 0)
        return t0 + sum(t...);
    return t0;
}

int main() {
    std::cout << sum(1, 2, 3, 2, 5) << std::endl;
}
```


Fold Expression example:

```cpp
#include <iostream>

template<typename ...T>
auto sum(T ...t) {
    return (t + ...);
}

template<typename ...T>
auto average(T ...t) {
    return (t + ...) / sizeof...(t);
}

int main() {
    std::cout << sum(1, 2, 3, 2.3, 5) << std::endl;
    std::cout << average(1, 2, 3, 2.3, 5) << std::endl;
}
```

## auto returned type (C++ 14)

```cpp
#include <concepts>

template<typename T1, typename T2>
auto myMax(T1 a, T2 b) {
    return a < b ? a : b;
}

int main() {
    auto m = myMax(1, 2);
    auto m2 = myMax(1, 2.9);
}
```

## auto as function parameters(c++20) & Concepts

Since C++20, we can use [[concepts]] to specify what we want with the template we defined.

[[auto]] 相較於傳統的 template，給了我們更多自由，但同時也會造成 ambiguity，所以需要配合 Concepts 去限制它。

下面的例子中，若不使用 `HasPushBack` ，就會造成 ambiguity，compiler 會不知道該 call 哪一個 add function。

```cpp
#include <concepts>
#include <set>
#include <vector>
#include <concepts> 

template<typename Container>
concept HasPushBack = requires (Container c, Container::value_type v) {
    c.push_back(v);
};

void add(HasPushBack auto& container, const auto& val) {
    container.push_back(val);
}

void add(auto& container, const auto& val) {
    container.insert(val);
}

int main() {
    std::vector<int> container1;
    std::set<int> container2;

    add(container1, 22);
    add(container2, 22);
}
```

配合 [[constexpr]]（compile-time if）以上的 code 可以進一步改寫成：

```cpp
#include <concepts>
#include <set>
#include <vector>
#include <concepts> 

void add(auto& container, const auto& val) {
    if constexpr (requires {container.push_back(val);})
        container.push_back(val);
    else
        container.insert(val);
}

int main() {
    std::vector<int> container1;
    std::set<int> container2;

    add(container1, 22);
    add(container2, 22);
}
```

## Reference
- [Back to Basics: Templates in C++ - Nicolai Josuttis - CppCon 2022](https://youtu.be/HqsEHG0QJXU?si=FfeTcQD80qgLvuP-)