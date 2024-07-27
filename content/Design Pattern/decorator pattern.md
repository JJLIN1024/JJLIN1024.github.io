---
title: decorator pattern
date: 2024-04-13
lastmod: 2024-04-13
author:
  - Jimmy Lin
tags:
  - design-pattern
draft: false
---

The key point is: a decorator **is-a** component and **has-a** component.

```cpp
#include <iostream>

class Component {
public:
    virtual void Operation() = 0;
};

class ConcreteComponent : public Component {
public:
    void Operation() override {
        std::cout << "Concrete component operation\n";
    }
};

class Decorator : public Component {
protected:
    Component* component;
public:
    Decorator(Component* c) : component(c) {}
    void Operation() override {
	    std::cout << "Decorator\n";
        component->Operation(); // 呼叫被裝飾對象的操作
    }
};

class ConcreteDecoratorA : public Decorator {
public:
    ConcreteDecoratorA(Component* c) : Decorator(c) {}
    void Operation() override {
        component->Operation();
        // 新增額外責任
        std::cout << "Decorator A operation." << std::endl;
    }
};

class ConcreteDecoratorB : public Decorator {
public:
    ConcreteDecoratorB(Component* c) : Decorator(c) {}
    void Operation() override {
        component->Operation();
        // 新增額外責任 
        std::cout << "Decorator B operation." << std::endl;
    }
};

int main() {
    Component* core = new ConcreteComponent();
    Component* decorator1 = new ConcreteDecoratorA(core);
    Component* decorator2 = new ConcreteDecoratorB(decorator1);
    decorator2->Operation();
}

/*

Executor x86-64 gcc 13.2 (C++, Editor #1)
-std=c++20
Program returned: 0
Program stdout
Concrete component operation
Decorator A operation.
Decorator B operation.
*/
```

分析：

![[Decorator Pattern 1.png]]

With C++11, using `unique_ptr`:

```cpp
#include <iostream>
#include <memory>

class Component {
public:
    virtual void Operation() = 0;
};

class ConcreteComponent : public Component {
public:
    void Operation() override {
        std::cout << "Concrete component operation\n";
    }
};

class Decorator : public Component {
protected:
    std::unique_ptr<Component> component;
public:
    Decorator(std::unique_ptr<Component> c) : component(std::move(c)) {}
    void Operation() override {
        component->Operation();
    }
};

class ConcreteDecoratorA : public Decorator {
public:
    ConcreteDecoratorA(std::unique_ptr<Component> c) : Decorator(std::move(c)) {}
    void Operation() override {
        component->Operation();
         std::cout << "Decorator A operation." << std::endl;
    }
};

class ConcreteDecoratorB : public Decorator {
public:
    ConcreteDecoratorB(std::unique_ptr<Component> c) : Decorator(std::move(c)) {}
    void Operation() override {
        component->Operation();
        std::cout << "Decorator B operation." << std::endl;
    }
};

int main() {
    std::unique_ptr<Component> core = std::make_unique<ConcreteComponent>();
    std::unique_ptr<Component> decorator1 = std::make_unique<ConcreteDecoratorA>(std::move(core));
    std::unique_ptr<Component> decorator2 = std::make_unique<ConcreteDecoratorB>(std::move(decorator1));
    decorator2->Operation(); 
}
```

## Reference
- [Decorator in C++](https://refactoring.guru/design-patterns/decorator/cpp/example)
- [Decorator Pattern – Design Patterns (ep 3)](https://youtu.be/GCraGHx6gso?si=FNcyicOWjcP0I2he)