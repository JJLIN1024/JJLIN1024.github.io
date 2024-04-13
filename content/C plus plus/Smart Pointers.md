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

### make_unique

A simple version of `make_unique`:

有用到 [[Templates]]、 [[universal reference]] 的概念。

```cpp
template<typename T, typename... Ts>
std::unique_ptr<T> make_unique(Ts&&... params)
{
	return std::unique_ptr<T>(new T(std::forward<Ts>(params)...));
}
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

Convert a unique pointer to shared pointer is easier than the other way around, so when not sure which to use, use unique pointer. If you change your mind later, it is easier to change your code base.

## shared_ptr
### Concept

![[Screenshot 2024-04-13 at 8.29.54 AM.png]]

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

盡量使用 `make_share` 來建立 shared pointer，因為使用 new 可能會有 memory leak，比如說就是當 new 的下一行程式碼是另一個會導致 exception 的 function call ，那就有可能會發生 share pointer 的 constructor 尚未被執行完成，就發生 exception。

第二個原因是因為 `make_share` 建立 share pointer 只需要一次 memory allocation call 就可以建立 object & control block（一塊連續的記憶體），但是使用 new 的話，這兩塊記憶體會是不連續的。

為什麼說盡量？因為有些情況不適合使用 `make_share`：

Situations where use of make functions is inappropriate includes:

1. the need to specify **custom deleters** 
2. the desire to pass **braced initializers**（see [[Braced Initialization(Uniform Initialization)]], since constructor with std::initializer_list will always has higher priority)
3. classes with custom memory management
4. systems with memory concerns, and a very large objects needs a `shared_ptr`, and `std::weak_ptr` that outlive the corresponding `std::shared_ptr`。 因為 make_share 會分配連續的兩塊記憶體給 object 和 control block，如果使用 new，very large object 佔用的記憶體在 share pointer 的 reference count 歸零後就被釋放，只剩下 weak_ptr 佔用的 control block 的 memory 尚未被釋放。但是若使用 make_share，兩塊記憶體是一體的，所以儘管 shared pointer 的 reference count 已經歸零，但是因為 weak pointer 還在使用 control block，因此整塊記體體都不能被釋放。

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

針對 double free problem，若一個 class 有需要回傳其 this pointer in a share pointer form，若直接將 this pointer 包裝成新的 share pointer，就可能會產生 double free。 

解決方法是使用 [std::enable_shared_from_this](https://en.cppreference.com/w/cpp/memory/enable_shared_from_this) 搭配 [shared_from_this()](https://en.cppreference.com/w/cpp/memory/enable_shared_from_this/shared_from_this) 。

```cpp
#include <iostream>
#include <memory>
 
struct Foo : public std::enable_shared_from_this<Foo>
{
    Foo() { std::cout << "Foo::Foo\n"; }
    ~Foo() { std::cout << "Foo::~Foo\n"; } 
    std::shared_ptr<Foo> getFoo() { return shared_from_this(); }
};
 
int main()
{
    Foo *f = new Foo;
    std::shared_ptr<Foo> pf1;
 
    {
        std::shared_ptr<Foo> pf2(f);
        pf1 = pf2->getFoo(); // shares ownership of object with pf2
    }
 
    std::cout << "pf2 is gone\n";   
}
/*
Foo::Foo
pf2 is gone
Foo::~Foo
*/
```

對照組是：

可看到 destructor 被呼叫了兩次，造成 double free。

```cpp
#include <iostream>
#include <memory>
 
struct Foo
{
    Foo() { std::cout << "Foo::Foo\n"; }
    ~Foo() { std::cout << "Foo::~Foo\n"; } 
    std::shared_ptr<Foo> getFoo() { 
      return std::shared_ptr<Foo>(this); 
    }
};
 
int main()
{
    Foo *f = new Foo;
    std::shared_ptr<Foo> pf1;
 
    {
        std::shared_ptr<Foo> pf2(f);
        pf1 = pf2->getFoo(); // shares ownership of object with pf2
    }
 
    std::cout << "pf2 is gone\n";   
}

/*
Foo::Foo
Foo::~Foo
pf2 is gone
Foo::~Foo
=================================================================
==80606==ERROR: AddressSanitizer: attempting double-free on 0x0001038006f0 in thread T0:
*/
```
### Thread Safety

對於多個指向同一個 object 的 `shared_ptr` 來說，他們對於共同的 control block 的讀和寫是 thread safe，但是對於這些 `shared_ptr` 指向的那個 object 來說，需要額外的同步機制去避免 data race。
## weak_ptr

use case: [[observer pattern]]。

可以將 weak pointer 看成是不會增加 reference count ，且不能被 dereference 或測試是否為 nullptr 的一種 share pointer，專門用來對付可能會 dangling 的 share pointer。

```
std::weak_ptr is a smart pointer that holds a non-owning ("weak") reference to an object that is managed by std::shared_ptr. It must be converted to std::shared_ptr in order to access the referenced object.
```
>  [std::weak_ptr](https://en.cppreference.com/w/cpp/memory/weak_ptr)


```cpp
#include <iostream>
#include <memory>
 
std::weak_ptr<int> gw;
 
void observe()
{
    std::cout << "gw.use_count() == " << gw.use_count() << "; ";
    // we have to make a copy of shared pointer before usage:
    if (std::shared_ptr<int> spt = gw.lock())
        std::cout << "*spt == " << *spt << '\n';
    else
        std::cout << "gw is expired\n";
}
 
int main()
{
    {
        auto sp = std::make_shared<int>(42);
        gw = sp;
 
        observe();
    }
 
    observe();
}
/*
gw.use_count() == 1; *spt == 42
gw.use_count() == 0; gw is expired
*/
```

## Reference
- [Back to Basics: C++ Smart Pointers - David Olsen - CppCon 2022](https://youtu.be/YokY6HzLkXs?si=aEHb_Gt6k0RuttHX)