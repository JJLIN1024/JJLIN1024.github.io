---
title: Singleton Pattern
date: 2024-07-27
lastmod: 2024-07-27
author:
  - Jimmy Lin
tags: 
draft: false
---
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
## Reference
- [Singleton Pattern – Design Patterns (ep 6)](https://youtu.be/hUE_j6q0LTQ?si=gUuCT8pcVUajXUuy)