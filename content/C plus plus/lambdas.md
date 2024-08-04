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
## Reference

- [Back to Basics: Lambdas from Scratch - Arthur O'Dwyer - CppCon 2019](https://youtu.be/3jCOwajNch0?si=dKEZl00OrQ5-HTj-)
- [Back to Basics: Lambdas - Nicolai Josuttis - CppCon 2021](https://youtu.be/IgNUBw3vcO4?si=7ZQMWtR1tCeP-9ro)
- [C++ Lambda Idioms - Timur Doumler - CppCon 2022](https://youtu.be/xBAduq0RGes?si=6HKfFHFKvfqZpmjj)
- [Back To Basics: Lambda Expressions - Barbara Geller & Ansel Sermersheim - CppCon 2020](https://youtu.be/ZIPNFcw6V9o?si=CffSaPgThvIl1U86)
- [C++ Weekly - Ep 332 - C++ Lambda vs std::function vs Function Pointer](https://youtu.be/aC-aAiS5Wuc?si=gMi50p6cUFzVuxqU)
## Lambdas is just a Class

Lambdas 的實現原理就是 compiler 幫你把他轉成一個 Class 而已，考慮以下的例子：

```cpp
auto foo = [g=10](){ return g + 1;};
```

我們可以用一個 class 做到完全相同的事情，這裡我們透過 [cppinsight](https://cppinsights.io/) 來觀察上面的 lambdas function 會被 compiler 轉換成什麼：

```cpp

class __lambda_1_12
{
  public: 
  inline /*constexpr */ int operator()() const
  {
    return g + 1;
  }
  
  private: 
  int g;
  
  public:
  __lambda_1_12(const int & _g)
  : g{_g}
  {}
  
};

__lambda_1_12 foo = __lambda_1_12{10};

```

可以看到 compiler 其實只是將 lambdas function 的 capture list 裡面的 variable 換成 class 的 private member variable，然後 overload `operator()` ，所以當 `__lambda_1_12{10}` 被建立出來並 assign 給 `foo` 後，若 `foo()` 被執行，其實就是呼叫了被 overload 的 `()` operator。

## Capture List

```cpp
#include <iostream>

int g = 10;
auto foo = [](){ return g + 1;};
auto bar = [g=g](){ return g + 1;};

int main() {
    g = 20;
    std::cout << foo() << std::endl; // 11
    std::cout << bar() << std::endl; // 21
    return 0;
}
```

為何一個會印出 11 一個則是 21？我們一樣透過  [cppinsight](https://cppinsights.io/) 來觀察：

```cpp
#include <iostream>

int g = 10;

class __lambda_4_12
{
  public: 
  inline /*constexpr */ int operator()() const
  {
    return g + 1;
  }
  
  using retType_4_12 = int (*)();
  inline constexpr operator retType_4_12 () const noexcept
  {
    return __invoke;
  };
  
  private: 
  static inline /*constexpr */ int __invoke()
  {
    return __lambda_4_12{}.operator()();
  }
  
  
  public:
  // /*constexpr */ __lambda_4_12() = default;
  
};

__lambda_4_12 foo = __lambda_4_12{};

class __lambda_5_12
{
  public: 
  inline /*constexpr */ int operator()() const
  {
    return g + 1;
  }
  
  private: 
  int g;
  
  public:
  __lambda_5_12(int & _g)
  : g{_g}
  {}
  
};

__lambda_5_12 bar = __lambda_5_12{g};

int main()
{
  g = 20;
  std::cout.operator<<(foo.operator()()).operator<<(std::endl);
  std::cout.operator<<(bar.operator()()).operator<<(std::endl);
  return 0;
}

```

可以觀察到 `bar` 在 class 被 initialize 時，global 的 `g` 有被當作參數傳進他的 constructor，而 `foo` 則沒有。

在 class `foo` 會在執行當下抓目前的 `g` 是多少，因此會抓到 `20`。
## Static Variable in lambdas

lambdas 的 static variable 和一般的 function static variable 不一樣！說到底還是因為 lambdas 的底層是 class！

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
  
	std::cout << c1() << c1() << c1() << "\n"; // 123
	std::cout << c2() << c2() << c2() << "\n"; // 456
}
```

因為 `i` 是同一個 class 的 static member，而 c1 & c2 是同一個 lambdas，因此對應到同一個 class。

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

## Lambdas is constexpr by default

```cpp
auto lam = [](int x) {return x + 1;};
static_assert(lam(42) == 43); // ok!
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

## "this" in lambda

In lambda, the **this** keyword does not mean the lambda itself, but whatever the lambda is used on. This is a designed choice: 

```cpp
class Widget {
	void work(int);
	void stnchronous_foo(int x) {
		this->work(x);
	}
	void asynchronous_foo(int x) {
		fire_and_forget([=]() {
			this->work(x);
		});
	}
}
```

In the above example, if **this** refers to the lambda itself, we're in trouble.