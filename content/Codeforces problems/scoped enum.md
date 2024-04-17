---
title: scoped enum
date: 2024-04-10
lastmod: 2024-04-10
author:
  - Jimmy Lin
tags: 
draft: false
---
scoped enum 除了可以防止 namespace pollution 之外，還可以避免 enum 的成員被 implicitly convert to integer。

```cpp
#include <iostream>

int main() {
    enum class Number {zero, one, two, three};
    if(Number::zero < 3) { // error: no match for 'operator<' (operand types are 'main()::Number' and 'int')
        std::cout << "smaller!\n"; 
    } else {
        std::cout << "bigger!\n";
    }
}
```

對照 unscoped 的 enum：

```cpp
#include <iostream>

int main() {
    enum Number {zero, one, two, three};
    if(zero < 3) {
        std::cout << "smaller!\n";
    } else {
        std::cout << "bigger!\n";
    }
}
// output: smaller!
```

希望獲得列舉值的值時，將必須顯式的進行類型轉換，或是使用以下 template 去 overload `<<` operator。

```cpp
#include <iostream>

// template<typename T>
// std::ostream& operator<<(
//     typename std::enable_if<std::is_enum<T>::value,
//         std::ostream>::type& stream, const T& e)
// {
//     return stream << static_cast<typename std::underlying_type<T>::type>(e);
// }

enum class new_enum : unsigned int {
    value1,
    value2,
    value3 = 100,
    value4 = 100
};

int main() {
	 std::cout << new_enum::value3 << std::endl; // error: no match for 'operator<<' (operand types are 'std::ostream' {aka 'std::basic_ostream<char>'} and 'new_enum')

    std::cout << (int)new_enum::value3 << std::endl; // valid!
    

}

```