---
title: lambdas
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---

- [Back to Basics: Lambdas from Scratch - Arthur O'Dwyer - CppCon 2019](https://youtu.be/3jCOwajNch0?si=dKEZl00OrQ5-HTj-)

## Lambdas is actually a Class

Lambdas 的背後其實就是 Class，考慮以下的例子：

```cpp
#include <iostream>

auto counter = [](){ static int i; return ++i;};

/*
class counter {
public:
	int operator() cosnt {
    	static int i; return ++i;
    }
}
*/

int main() {
  	auto c1 = counter;
  	auto c2 = counter;
  
	std::cout << c1() << c1() << c1() << "\n";
	std::cout << c2() << c2() << c2() << "\n";
}
```

Output 會是

123
456

因為 `i` 是同一個 class 的 static member。

使用 [cppinsights](https://cppinsights.io/) 觀察可以更加得清楚，底下是 compiler 針對上面的 code 所產生的。

```cpp
#include <iostream>

class __lambda_3_16
{
  public: 
  inline int operator()() const
  {
    static int i;
    return ++i;
  }
  
  using retType_3_16 = int (*)();
  inline constexpr operator retType_3_16 () const noexcept
  {
    return __invoke;
  }
  
  private: 
  static inline int __invoke()
  {
    return __lambda_3_16{}.operator()();
  }
  
  
  public:
  // /*constexpr */ __lambda_3_16() = default;
  
};

__lambda_3_16 counter = __lambda_3_16{};

int main()
{
  std::cout.operator<<(counter.operator __lambda_3_16::retType_3_16()).operator<<(std::endl);
  return 0;
}
```

注意到 compiler 會將 `operator()()` 設為 const！

```cpp
inline int operator()() const
{
	static int i;
    return ++i;
}
```

也因此，若想要改變 i 的值，就必須 specify `mutable`！

```cpp
#include <iostream>

auto counter = [i = 0]() mutable {return ++i;};

int main() {
  	auto c1 = counter;
  	auto c2 = counter;
  
	std::cout << c1() << c1() << c1() << "\n"; // 123
	std::cout << c2() << c2() << c2() << "\n"; // 123
}
```

## Generic Lambdas

Which is just templates under the hood.

```cpp
#include <iostream>

auto Plus = [value=1](auto x) {return x + value;};

int main() {
  
	std::cout << Plus(3) << "\n";
}
```

Using [cppinsights](https://cppinsights.io/) again, and there it is, the templates.

```cpp
#include <iostream>


class __lambda_3_13
{
  public: 
  template<class type_parameter_0_0>
  inline /*constexpr */ auto operator()(type_parameter_0_0 x) const
  {
    return x + value;
  }
  
  #ifdef INSIGHTS_USE_TEMPLATE
  template<>
  inline /*constexpr */ int operator()<int>(int x) const
  {
    return x + value;
  }
  #endif
  
  private: 
  int value;
  
  public:
  __lambda_3_13(const int & _value)
  : value{_value}
  {}
  
};

__lambda_3_13 Plus = __lambda_3_13{1};

int main()
{
  std::operator<<(std::cout.operator<<(Plus.operator()(3)), "\n");
  return 0;
}

```

