---
title: Templates
date: 2024-03-19
lastmod: 2024-03-19
author:
  - Jimmy Lin
tags: 
draft: false
---

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

- [[template type deduction]]
- 