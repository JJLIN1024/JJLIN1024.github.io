---
title: Braced Initialization(Uniform Initialization)
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---
## Pitfalls

Uniform Initialization 代表通用，不管在哪裡使用都是對的。所以盡量使用 braced initialization。

braced initialization 還可以 prohibits implicit narrowing conversions among built-in types，考慮以下的例子：

```cpp

int main() {
    double a = 3.0, b = 2.3;
    int x {a + b}; // warning: narrowing conversion of '(a + b)' from 'double' to 'int' [-Wnarrowing]
}
```

不過使用 braced initialization 要小心，尤其是在 class 的 constructor 中有牽涉到 `std::initializer_list` 時，因為 compiler 除非真的沒辦法（無法做 conversion），要不然都會優先選擇去 match 有 `std::initializer_list` 的 constructor，然後才會考慮一般的 overload resolution 規則。 考慮以下例子：

```cpp
#include <initializer_list>

class Widget {
public:
	Widget(int i, bool b);
  	Widget(int i, double d);
  	Widget(std::initializer_list<long double> il);
  
};
int main()
{	
  Widget w{10, 1.0}; // 10 and 1.0 are converted to long double!
}
```

what to [compiler](https://cppinsights.io/) sees:

```cpp
#include <initializer_list>

class Widget
{
  
  public: 
  Widget(int i, bool b);
  
  Widget(int i, double d);
  
  Widget(std::initializer_list<long double> il);
  
};


int main()
{
  Widget w = Widget{std::initializer_list<long double>{10, static_cast<const long double>(1.0)}};
  return 0;
}
```

而且，braced initialization 如上所說，會幫我們做 narrowing conversion 的檢查：

```cpp
#include <initializer_list>

class Widget {
public:
	Widget(int i, bool b);
  	Widget(int i, double d);
	Widget(std::initializer_list<bool> il);
  
};
int main()
{	
  Widget w{10, 1.0}; //  error: constant expression evaluates to 10 which cannot be narrowed to type 'bool' [-Wc++11-narrowing]
}
```

真的沒辦法做 conversion 的 case：

```cpp
#include <initializer_list>
#include <string>

class Widget {
public:
	Widget(int i, bool b);
  	Widget(int i, double d);
	Widget(std::initializer_list<std::string> il);
  
};
int main()
{	
  Widget w{10, 1.0}; // Widget(int i, double d) is called!
}
```

## Braced Initialization on Vector

```cpp
#include <vector>

int main()
{	
  std::vector<int> V{20, 10}; // use constructor which has initializer_list! 
  std::vector<int> V2(20, 10); 
  return 0;
}
```
> V 是一個 size = 2 的 vector，而 V2 size = 20。