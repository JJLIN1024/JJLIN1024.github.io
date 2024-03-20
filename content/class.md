---
title: class
date: 2024-03-19
lastmod: 2024-03-19
author:
  - Jimmy Lin
tags: 
draft: false
---
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
Multiple Inheritance can result in ambiguous function calls. For example, a BadDude class could inherit two quite different Draw() methods from a Gunslinger class and a PokerPlayer class.