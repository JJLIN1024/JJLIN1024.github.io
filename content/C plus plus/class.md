---
title: class
date: 2024-03-19
lastmod: 2024-03-19
author:
  - Jimmy Lin
tags: 
draft: false
---
## Data Member Initialization
- The compiler generated default constructor
	- which initialize all data members of class (user-defined) type, but not the data member of fundamental type
- The best way is to define your own default constructor, properly initialize all data member
- Define and initialize member variables in the order of member declaration
	- 在下面的例子中，`i(42), s("Hello World"), ps(nullptr)` 的順序不能變，因為他們被 declare 的順序就是如此

```cpp
// bad
struct Widget {
  int i;
  std::string s;
  int* ps;
};
```

```cpp
// better
#include <string>
#include <iostream>

struct Widget {
  int i;
  std::string s;
  int* ps;

  Widget():
    i(42),
    s("Hello World"),
    ps(nullptr)
  {}
};

int main() {
  Widget w{};
  return 0;
}
```

若有多個不同的 constructor，可以使用 value initialization ，這樣每個 constructor 只需要專注在自己要 initialize 的部分即可，因為其他的都有 default。如此一來就避免了 duplication（兩個 constructor initialize 相同的東西）。

```cpp
// Bad! Duplication!
Widget():
    i(42),
    s("Hello World"),
    ps(nullptr)
{}

Widget(int j):
	i(j),
    s("Hello World"),
    ps(nullptr)
{}
```

```cpp
#include <string>
#include <iostream>

// even better
struct Widget {
  Widget(){}
  Widget(int j):
    i(j)
  {}

  int i{42};
  std::string s{"Hello World"};
  int* ps{};
};

int main() {
  Widget w{};
  return 0;
}
```

## Constructor with explicit keyword

- To prevent implicit conversion


## Const and Reference to Data Member 

- compiler 不知道該如何 initialize const data member
- reference 同理（reference to what?）
```cpp
struct Widget {
    int const i;
    double& d;
};

int main() {
    Widget w;
}
/*
note: 'Widget::Widget()' is implicitly deleted because the default definition would be ill-formed:x86-64 gcc 13.2 #Executor 1
error: uninitialized const member in 'struct Widget'x86-64 gcc 13.2 #Executor 1
error: uninitialized reference member in 'struct Widget'x86-64 gcc 13.2 #Executor 1
*/
```

對於 reference 而言，reference members can be stored as pointers:

```cpp
struct Widget {
private:
  double* pd_;
public:
  Widget(double& d):
    pd_(&d)
  {}
  double& get() noexcept {return *pd_;};
};

int main() {
  double d1 = 2.34;
  Widget w{d1};
  return 0;
}
```

## Accessibility v.s. Visibility

對於 compiler 來說，不論 private or public 都是可見的，所以會選擇要執行 `void doSomething(int d);`，然後才發現該 member function 為 private（accessibility），接著給出 error。

```cpp
struct Widget {
private:
  void doSomething(double d);
public:
  void doSomething(int d);
};

int main() {
  Widget w{};
  w.doSomething(1.0);
  return 0;
}
/*
<source>:10:16: error: 'void Widget::doSomething(double)' is private within this context
   10 |   w.doSomething(1.0);
      |   ~~~~~~~~~~~~~^~~~~
*/
```
## Operator Overload
```cpp
#include <iostream>
using namespace std;

class Box {
private:
    int width_;
    int height_;
public:
    Box();
    Box(int width, int height);
    Box& operator+(const Box& b);
    operator int() const;
    friend ostream & operator<<(ostream& os, const Box& b);
};

Box::Box(int width, int height) {
    width_ = width;
    height_ = height;
}

Box& Box::operator+(const Box& b) {
    this->width_ += b.width_;
    this->height_ += b.height_;
    return *this;
}

Box::operator int() const {
    return width_ + height_;
}

ostream & operator<<(ostream& os, const Box& b) {
    os << "width: " << b.width_ << " height: " << b.height_ << endl;
    return os;
}


// class Derived {
// private:

// public:
// };


/*
Conversion takes place for member function arguments, not for member function invokers.
The lesson here is that defining addition as a friend makes it easier for a 
program to accommodate automatic type conversions.The reason is that both 
operands become function arguments, so function prototyping comes into play 
for both operands.

The class may be implicityly convert to integer, and conversion happens only when it is function 
arguments, that's why friend function is better in this case
*/

int main() {
    
    Box box1 = {3, 5};
    Box box2 = {7, 9};
    int b_int = box1;
    cout << b_int << endl;

    // box1 = b_int + box2; 
    // error: no match for 'operator=' (operand types are 'Box' and 'int') box1 = b_int + box2;
    box1 = box1 + box2;
    cout << box1 << " " << box2 << endl;
    return 0;
}
```

## Rule of Three & Rule of Five

- [Back to Basics: The Rule of Five in C++ - Andre Kostur - CppCon 2023](https://youtu.be/juAZDfsaMvY?si=wRiP8DbNKhPrNj4Z)
- [The rule of three/five/zero](https://en.cppreference.com/w/cpp/language/rule_of_three)

對於 String class 而言，如果不 implement copy constructor，`s1 = s2` 就會造成兩個 String 具有相同的 `char* str` （shallow copy），destructor 就會 delete 同一個 pointer 兩次，造成 error。

```cpp
#include <iostream>
#include <cstring>

class String {
private:
    char *str;
    int len;
    static const int CINLIMIT = 80;
public:
    String(); // default constructor
    String(const char *s); // constructor
    ~String(); // destructor
    String(const String& s); // copy constructor
    int length() const {return len;};

    String& operator=(const String& s); // copy assignment operator
    String& operator=(const char *s); // copy assignment operator
    
    char& operator[](int i);
    const char& operator[](int i) const;

    operator int() const {return len;};

    friend bool operator<(const String& s1, const String& s2);
    friend bool operator>(const String& s1, const String& s2);
    friend bool operator==(const String& s1, const String& s2);
    friend std::ostream& operator<<(std::ostream& os, const String& s);
    friend std::istream& operator>>(std::istream& is, const String& s);
};

String::String() {
    len = 0;
    str = nullptr;
}

String::String(const char* s) {
    len = std::strlen(s);
    str = new char[len + 1];
    std::strcpy(str, s);
}

String::~String() {
    len = 0;
    delete [] str;
}

String::String(const String& s) {
    len = s.len;
    str = new char[len + 1];
    std::strcpy(str, s.str);
}


String& String::operator=(const String& s) {
    if(this == &s) {
        return *this;
    }

    delete [] str;
    len = s.len;
    str = new char[len + 1];
    std::strcpy(str, s.str);
    return *this;

}

String& String::operator=(const char *s) {
    delete [] str;
    len = std::strlen(s);
    str = new char[len + 1];
    std::strcpy(str, s);
    return *this;
}

char& String::operator[](int i) {
    return str[i];
}

// read-only access
const char& String::operator[](int i) const {
    return str[i];
}

// operator int() const;

bool operator<(const String& s1, const String& s2) {
    return (std::strcmp(s1.str, s2.str) < 0);
}

bool operator>(const String& s1, const String& s2) {
    return s2 < s1;
}

bool operator==(const String& s1, const String& s2) {
    return (std::strcmp(s1.str, s2.str) == 0);
}

std::ostream& operator<<(std::ostream& os, const String& s) {
    os << s.str;
    return os;
}

int main() {
    String s1 = "Jimmy Lin";
    String s2 = s1;
    std::cout << s1 << " " << s2 << std::endl;

    
    return 0;
}
```

下列的 `SString` class 當中，使用 `unique_ptr` 當作 data structure，因為 `unique_ptr` 自己知道如何 `move` 以及釋放記憶體，所以我們不需要 implement move constructor、 move assignment operator 以及 destructor，但是因為 `unique_ptr` 不知道該如何 copy 自己，所以我們要 implement copy constructor & copy assignment operator，但是又因為 Rule of Five，因此 compiler 就不會提供 default move constructor、 move assignment operator 以及 destructor 給我們了，解決的方式是使用 `~SString() = default; // default destructor` 去告訴 compiler 我們想要使用 default。

lesson learned：如果能夠全部都使用 default（Rule of Zero）那是最好，不需要自己 implement（you probably will mess up something）。如果不行，就按照 rule of three or five 搭配 default keyword。

```cpp
#include <iostream>
#include <cstring>
#include <memory>

class SString {
private:
    std::unique_ptr<char[]> str;
public:

    ~SString() = default; // default destructor
    // constructor
    SString(const char * cp) : str(new char[std::strlen(cp) + 1]) {
        std::strcpy(str.get(), cp);
    }
    // copy constructor
    SString(const SString& s): str(new char[std::strlen(s.str.get()) + 1]) {
        std::strcpy(str.get(), s.str.get());
    }

    // copy assignment operator
    SString& operator=(const SString& s) {
        str.reset(new char[std::strlen(s.str.get()) + 1]);
        std::strcpy(str.get(), s.str.get());
        return *this;
    }
    // move constructor
    SString(SString&& s) = default;
    // move assignment operator
    SString& operator=(SString&& s) = default;
    
    char& operator[](int i) {
        return str.get()[i];
    }

    friend std::ostream& operator<<(std::ostream& os, const SString& s) {
        os << s.str.get();
        return os;
    }
};


int main() {
    SString s1 = "Jimmy Lin";
    SString s2 = s1;
    s2[2] = 'g';

    std::cout << s1 << std::endl;
    std::cout << s2 << std::endl;

    return 0;
}
```

## Multiple Inheritance

Multiple Inheritance can result in ambiguous function calls. For example, a BadDude class could inherit two quite different Draw() methods from a Gunslinger class and a PokerPlayer class.

## Design Principles
- Single-Responsibility Principle
	- Separation of Concerns
	- High cohesion / low coupling
	- Orthogonality
- Open-Closed Principle
	- prefer design by simplified the extension by types or operations
- Don't Repeat Yourself(DRY)
- [[strategy pattern]]
- 