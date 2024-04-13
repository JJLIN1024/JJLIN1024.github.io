---
title: Concurrency
date: 2024-04-10
lastmod: 2024-04-10
author:
  - Jimmy Lin
tags: 
draft: false
---
See [std::thread](https://en.cppreference.com/w/cpp/thread/thread) and [Concurrency support library (since C++11)](https://en.cppreference.com/w/cpp/thread) for more detail.
## std::thread

```cpp
#include <thread>
#include <iostream>

int main()
{	
  std::thread t([](){
    std::cout<< "hello from thread!" << "\n";
  });
  t.join();
  return 0;
}
```

## thread_gaurd

[[RAII (Resource Acquisition is Initialization)]] 的展現，避免因為 exception 被丟出時的 stack unwinding 造成 thread t 沒能被 join。

```cpp
#include <thread>
#include <iostream>

class thread_guard 
{
  std::thread& t_;
public:
  explicit thread_guard(std::thread& t):
    t_(t)
  {}
  ~thread_guard() 
  {
    if(t_.joinable()) {
      std::cout << "join dangling thread t due to exception!" << "\n";
      t_.join();
    }
  }
  thread_guard(thread_guard const&)=delete; // copy constructor
  thread_guard& operator=(thread_guard const&)=delete; // copy assignment operator
};

int main()
{	
  std::thread t([](){
    throw std::runtime_error("error");
  });
  thread_guard g(t);
  return 0;
}
```

- 只有在 `t.joinable()` 傳回 true 時才能對 `std::thread` 物件呼叫 `t.detach()`
- 在 C++20 後，可以使用 [std::jthread](https://en.cppreference.com/w/cpp/thread/jthread)，即是 RAII 的 thread
## Pass arguments to thread's function

預設傳遞參數的方式是 pass-by-value，所以以下的 code 會 fail。

```cpp
#include <thread>
#include <iostream>

void func(int& n) {
  n++;
};

int main()
{	
  int x = 3;
  std::thread t(func, x); // error!
  // std::thread t(func, std::ref(x)); // the correct way to pass x's reference

  t.join();
  std::cout << x << "\n";
  return 0;
}
```

## mutex & lock_gaurd & jthread

```cpp
#include <iostream>
#include <mutex>
#include <string_view>
#include <thread>
 
volatile int g_i = 0;
std::mutex g_i_mutex;  // protects g_i
 
void safe_increment(int iterations)
{
  const std::lock_guard<std::mutex> lock(g_i_mutex);
  while (iterations-- > 0)
    g_i = g_i + 1;
  std::cout << "thread #" << std::this_thread::get_id() << ", g_i: " << g_i << '\n';
}
 
void unsafe_increment(int iterations)
{
  while (iterations-- > 0)
    g_i = g_i + 1;
  std::cout << "thread #" << std::this_thread::get_id()
    << ", g_i: " << g_i << '\n';
}
 
int main()
{
  auto test = [](std::string_view fun_name, auto fun)
  {
      g_i = 0;
      std::cout << fun_name << ":\nbefore, g_i: " << g_i << '\n';
      {
          std::jthread t1(fun, 1'000'000);
          std::jthread t2(fun, 1'000'000);
      }
      std::cout << "after, g_i: " << g_i << "\n\n";
  };
  test("safe_increment", safe_increment);
  test("unsafe_increment", unsafe_increment);
}
```

Output:

```console
safe_increment:
before, g_i: 0
thread #140458076403264, g_i: 1000000
thread #140458068010560, g_i: 2000000
after, g_i: 2000000

unsafe_increment:
before, g_i: 0
thread #140458068010560, g_i: 1360377
thread #140458076403264, g_i: 2000000
after, g_i: 2000000
```





## Reference
- [C++ Concurrency in Action (1/9)](https://hackmd.io/@ZGt0WcJQQ_enG8iTXTGNWw/SkWEUg14O)