---
title: RAII (Resource Acquisition is Initialization)
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---

- `std::lock_guard`
- `std::unique_ptr`
- `std::shared_ptr`
- `std::unique_lock`
- `std::jthread`
- `std::fstream`

```cpp
#include <iostream>
#include <memory>

// // before C++ 20
// struct file_closer {
//     void operator()(FILE* stream) {fclose(stream);}
// };
// using cfile = std::unique_ptr<FILE, file_closer>;

// C++ 20
using cfile = std::unique_ptr<FILE, decltype([](FILE* stream){fclose(stream);})>;

auto make_cfile(char const* file_name, char const* mode) {
    FILE* stream{fopen(file_name, mode)};
    if(not stream) {
        throw std::runtime_error{"Failed to open file"};
    }
    return cfile{stream};
}

void fn() {
    auto file{make_cfile("file_name.txt", "w")};
    fprintf(file.get(), "data for the file");
}

int main() {
    fn();
    return 0;
}
```

## Reference
- [Back to Basics: RAII in C++ - Andre Kostur - CppCon 2022](https://youtu.be/Rfu06XAhx90?si=1q9-3ebl5z-WeG65)
- [Back to Basics: RAII and the Rule of Zero - Arthur O'Dwyer - CppCon 2019](https://youtu.be/7Qgd9B1KuMQ?si=_NLh-WNuDI6BP42r)