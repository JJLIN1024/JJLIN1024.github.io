---
title: Smart Pointers
date: 2024-01-30
lastmod: 2024-01-30
author:
  - Jimmy Lin
tags:
  - pointer
  - smart_pointer
  - c_plus_plus
draft: false
---
- [Smart pointers (Modern C++)](https://learn.microsoft.com/en-us/cpp/cpp/smart-pointers-modern-cpp?view=msvc-170)

## unique_ptr

### Concept
- [std::unique_ptr](https://en.cppreference.com/w/cpp/memory/unique_ptr)
`unique_ptr` 的概念如下（not a real implementation），重點在於：不具備 copy constructor & assignment operator 。

```cpp
template <typename T>
class unique_ptr {
  T* ptr;

 public:
  // constructor
  unique_ptr() noexcept : ptr(nullptr) {}
  explicit unique_ptr(T* p) noexcept : ptr(p) {}
  // destructor
  ~unique_ptr() noexcept : { delete ptr; }
  // copy constructor
  unique_ptr(unique_ptr const&) = delete;
  // move constructor
  unique_ptr(unique_ptr&& o) noexcept : ptr(std::exchange(o.ptr, nullptr)) {}
  // copy assignment operator
  unique_ptr& operator=(unique_ptr const&) = delete;
  // move assignment operator
  unique_ptr&(unique_ptr&& o) noexcept {
    delete ptr;
    ptr = o.ptr;
    o.ptr = nullptr;
    return *this;
  }
  // dereference operator
  T& operator*() const noexcept { return *ptr; }
  T* operator->() const noexcept { return ptr; }
  // release ownership
  T* release() noexcept {
    T* old = ptr;
    ptr = nullptr;
    return old;
  }
  void reset(T* p = nullptr) noexcept {
    delete ptr;
    ptr = p;
  }
  T* get() const noexcept { return ptr; }
  // explicit type conversion
  explicit operator bool() const noexcept { return ptr != nullptr; }
};

```

### Usage
Usage demo with [make_unique](https://learn.microsoft.com/en-us/cpp/standard-library/memory-functions?view=msvc-170#make_unique).

```cpp
#include <memory>
#include <iostream>

class B {
public:
    int value;
    B(){std::cout<< "B::Default Constructor\n";};
    B(int a): value(a) {std::cout<< "B::Constructor with value\n";}
    ~B() {std::cout<< "B::Default Destructor\n";}
};

int main() {
    // declare a unique_ptr 
    std::unique_ptr<B> b1 = std::make_unique<B>();
    std::cout << b1->value << std::endl; // 0

    // declare a unique_ptr with parameter
    std::unique_ptr<B> b2 = std::make_unique<B>(3);
    std::cout << b2->value << std::endl; // 3

    // declare a unique_ptr to an array of 5 Bs
    std::unique_ptr<B[]> b3 = std::make_unique<B[]>(5);
    for(int i = 0; i < 5; i++) {
        b3[i].value = i;
        std::cout << b3[i].value << " "; // 0 1 2 3 4
    }
    return 0;
}
```
### Double Free Problem
Make sure only one `unique_ptr` for a block of memory!  Don't create a `unique_ptr` from a pointer unless you know where the pointer came from and that it needs and owner!

```cpp
#include <memory>
#include <iostream>

class B {
public:
    B() {std::cout<< "B::Constructor\n";}
    ~B() {std::cout<< "B::Destructor\n";}
};

int main() {
    B* b = new B();
    std::unique_ptr<B> up1{b};
    std::unique_ptr<B> up2{b}; // free(): double free detected
    
	std::unique_ptr<B> up1 = std::make_unique<B>();
	std::unique_ptr<B> up2{up1.get()}; // free(): double free detected
    return 0;
}
```

### Dangling Problem

```cpp
#include <memory>
#include <iostream>

class B {
public:
    B() {std::cout<< "B::Constructor\n";}
    ~B() {std::cout<< "B::Destructor\n";}
};

int main() {
    B* b = nullptr;
    {
        std::unique_ptr<B> up1 = std::make_unique<B>();
        b = up1.get();
    }
    auto bad = *b; // undefined behavior, since up1 is out of scope
    return 0;
}
```

## shared_ptr

### Concept
![[截圖 2024-02-02 下午6.50.40.png]]
> A Control Block (the green one with count = 2) is always on the heap, and the count is a atomic type

![[Pasted image 20240202185228.png]]

關鍵在於：有 copy constructor and assignment operator，且沒有 `unique_ptr` 有的 `release` function，然後多了 `use_count` function（not thread-safe)。

```cpp
template <typename T>
class shared_ptr {
public:
  // ...
  shared_ptr() noexcept;  // constructor, no control block yet
  // starts managing an object, allocates a control block, 
  // set counter to 1 
  explicit shared_ptr(T* p); 
  // destructor, decrement counter by 1,
  // if counter is zero, cleanup objects and control block
  ~shared_ptr() noexcept; 

  // copy constructor: increment counter 
  shared_ptr(shared_ptr const&) noexcept;
  // move constructor: counter does not change
  shared_ptr(shared_ptr&&) noexcept;
  // transfer ownership from unique_ptr to shared_ptr
  // allocates a control block, set counter to 1
  // [info]: ownership can only be transfered in one direction,
  // not the other way around! Because the shared_ptr can never
  // be sure that he is the only owner!
  shared_ptr(unique_ptr<T>&&);

  // assignement operator behave just like the corresponding
  // construtor, but it effectively run the destructor first,
  // since it has to give up share ownership to whatever it previouly owned,
  // and then gain shared ownership to whatever passed in.
  shared_ptr& operator=(shared_ptr const&) noexcept;
  shared_ptr& operator=(shared_ptr&&) noexcept;
  shared_ptr& operator=(unique_ptr<T>&&);

  // ...
  // dereference operator
  T& operator*() const noexcept { return *ptr; }
  T* operator->() const noexcept { return ptr; }
  // ...
  void reset(T*);
  T* get() const noexcept;
  long use_count() const noexcept;
  explicit operator bool() const noexcept;
};
```

### Double Free Problem

To share ownership, additional `shared_ptr` objects must be created or assigned from an existing `shared_ptr`, not from the raw pointer!

```cpp
#include <memory>
#include <iostream>

class B {
public:
    int value;
    B(){std::cout<< "B::Default Constructor\n";};
    B(int a): value(a) {std::cout<< "B::Constructor with value\n";}
    ~B() {std::cout<< "B::Default Destructor\n";}
};

int main() {
    
//     B* b = new B();
//     std::shared_ptr<B> s1(b);
//     std::shared_ptr<B> s2(b); // free(): double free detected

//     B* b2 = new B();
//     std::shared_ptr<B> s3(b2);
//     std::shared_ptr<B> s4(s3.get()); // free(): double free detected

	// the correct way
    std::shared_ptr<B> s5 = std::make_shared<B>();
    std::shared_ptr<B> s6(s5);
    std::shared_ptr<B> s7;
    s7 = s5;
    return 0;
}
```

### Thread Safety

對於多個指向同一個 object 的 `shared_ptr` 來說，他們對於共同的 control block 的讀和寫是 thread safe，但是對於這些 `shared_ptr` 指向的那個 object 來說，需要額外的同步機制去避免 data race。

## Reference
- [Back to Basics: C++ Smart Pointers - David Olsen - CppCon 2022](https://youtu.be/YokY6HzLkXs?si=aEHb_Gt6k0RuttHX)