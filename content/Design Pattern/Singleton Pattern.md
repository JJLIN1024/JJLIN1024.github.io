---
title: Singleton Pattern
date: 2024-07-27
lastmod: 2024-07-27
author:
  - Jimmy Lin
tags: 
draft: false
---
Singletons are basically complicated global objects in disguise. DO NOT USE IT!

```cpp
class Singleton {
private:
    static Singleton* instance;
    
    // Private constructor to prevent instantiation
    Singleton() {}

public:
    // Delete copy constructor and assignment operator
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    
    // Public method to get the instance
    static Singleton* getInstance() {
        if (instance == nullptr) {
            instance = new Singleton();
        }
        return instance;
    }
    
    // Example method
    void someMethod() {
        // Implementation here
    }
};

// Initialize the static member
Singleton* Singleton::instance = nullptr;
```

## Thread-safe Singleton
```cpp
X& myX()
{
    static X my_x {3};
    return my_x;
}
```

因為 thread 有自己的 stack，因此上面的 function 的 static variable 是 thread-safe。
## Reference
- [Singleton Pattern – Design Patterns (ep 6)](https://youtu.be/hUE_j6q0LTQ?si=gUuCT8pcVUajXUuy)