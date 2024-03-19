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



```cpp

```