---
title: Smart Pointer
date: 2024-01-30
lastmod: 2024-01-30
author: Jimmy Lin
tags: 
draft: false
---
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
