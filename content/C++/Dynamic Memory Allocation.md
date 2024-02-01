---
title: Dynamic Memory Allocation
date: 2024-01-30
lastmod: 2024-01-30
author: Jimmy Lin
tags: 
draft: false
---
## using new and delete

- `new(std::nothrow)` 可以避免 memory 不夠時 `std::bad_alloc` exception 被丟出。我們只需要檢查得到的 pointer 是否為 `nullptr` 即可。

```cpp
#include <iostream>
class base {
    int* b;
    public:
    base();
    ~base();
};

base::base() {
    b = new(std::nothrow) int[10];
}

base::~base() {
    delete[] b;
}

int main()
{
    base* myBase = new(std::nothrow) base();
    delete myBase;

    int* a = new(std::nothrow) int(3);
    delete a;

    // terminate called after throwing an instance of 'std::bad_alloc'
    // what():  std::bad_alloc
    // Program terminated with signal: SIGSEGV
    // int* b = new int[100000000000];
    
    int* b = new(std::nothrow) int[100000000000];
    if(b == nullptr) {
        std::cout << "There is no enough memory!\n";
    }
    delete[] b;

    return 0;
}
```

## 比較
| new & delete | malloc() & free() |
| ---- | ---- |
| It is an operator. | It is a library function. |
| It (de)allocates the memory dynamically. | It create/destroys the memory at runtime. |
| It should only be used for deallocating the memory allocated either using the new operator or for a NULL pointer. | It should only be used for deallocating the memory allocated either using malloc(), calloc(), realloc() or for a NULL pointer. |
| This operator calls the destructor before it destroys the allocated memory. | This function only frees the memory from the heap. It does not call the destructor. |
| It is comparatively slower because it invokes the destructor for the object being deleted before deallocating the memory. | It is faster than delete operator. |
| new returns appropriate pointer | malloc returns void * and pointer needs to typecast to appropriate type. |

```cpp
#include <iostream>
class base {
    public:
    base();
    ~base();
};

base::base() {
    std::cout << "Constructor is called!\n";
}

base::~base() {
    std::cout << "Destructor is called!\n";
}

int main()
{
    base* myBase = new(std::nothrow) base();
    delete myBase;

    base* myBase2 = (base*) malloc(sizeof(base));
    free(myBase2);

    return 0;
}
```

Output:
```console
Constructor is called!
Destructor is called!
```

可看到使用 malloc 和 free 並不會 call class object 的 constructor 和 destructor。

## Constructor and Destructor on the stack

```cpp
#include <iostream>
class base {
    public:
    base();
    ~base();
};

base::base() {
    std::cout << "Constructor is called!\n";
}

base::~base() {
    std::cout << "Destructor is called!\n";
}

int main()
{
    base myBase;

    exit(0);
    // return 0;
}
```

當使用 exit(0) 時，只有 Constructor is called! 的 output，使用 return 0 時，Destructor is called! 也會被輸出。