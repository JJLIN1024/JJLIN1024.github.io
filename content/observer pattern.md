---
title: observer pattern
date: 2024-04-13
lastmod: 2024-04-13
author:
  - Jimmy Lin
tags: 
draft: false
---
注意 subject & observer 通通都是 shared pointer！不行使用 unique pointer，因為 `Subscribe` 和 `Unsubscribe` 都會需要用到 smart pointer 形式的 this pointer，會需要用到 `shared_from_this()`（詳見 [[Smart Pointers]] ），和 

```cpp
class Observer : public IObserver, public std::enable_shared_from_this<Observer> 
```

在 `Observer` 當中有個 private member `std::weak_ptr<Subject> subject_;`，用來追蹤 `Subject`(which is a shared pointer)，並判斷是否已經 subscribe & unsubscribe。

```cpp
#include <iostream>
#include <list>
#include <string>
#include <memory>

class IObserver {
 public:
  virtual ~IObserver(){};
  virtual void Update(const std::string &message_from_subject) = 0;
};

class ISubject {
 public:
  virtual ~ISubject(){};
  virtual void Attach(std::shared_ptr<IObserver> observer) = 0;
  virtual void Detach(std::shared_ptr<IObserver> observer) = 0;
  virtual void Notify() = 0;
};

class Subject : public ISubject {
 public:
  virtual ~Subject() {
    std::cout << "Goodbye, I was the Subject.\n";
  }

  void Attach(std::shared_ptr<IObserver> observer) override {
    list_observer_.push_back(observer);
  }
  void Detach(std::shared_ptr<IObserver> observer) override {
    list_observer_.remove(observer);
  }
  
  void Notify() override {
    std::cout << "Notify currently " << list_observer_.size() << " observers in the list\n";
    for (auto observer: list_observer_) {
      observer->Update(message_);
    }
  }

  void CreateMessage(std::string message = "Empty") {
    this->message_ = message;
    Notify();
  }

  /**
   * Usually, the subscription logic is only a fraction of what a Subject can
   * really do. Subjects commonly hold some important business logic, that
   * triggers a notification method whenever something important is about to
   * happen (or after it).
   */
  void SomeBusinessLogic() {
    this->message_ = "change message message";
    std::cout << "Some business logic has been implemented, a new message should be available for you all\n";
    Notify();
  }

 private:
  std::list<std::shared_ptr<IObserver>> list_observer_;
  std::string message_;
};

class Observer : public IObserver, public std::enable_shared_from_this<Observer>  {
 public:
  Observer() {
    std::cout << "Hi, I'm the Observer \"" << ++Observer::static_number_ << "\".\n";
    this->number_ = Observer::static_number_;
  }

  virtual ~Observer() {
    std::cout << "Goodbye, I was the Observer \"" << this->number_ << "\".\n";
  }
  
  void Subscribe(std::shared_ptr<Subject> subject) {
    if(auto s = subject_.lock()) {
        std::cout << "(Observer " << number_ << "): Already subscribed.\n";
    } else {
        subject_ = subject;
        subject->Attach(shared_from_this());
    }
  }

  void Unsubscribe(std::shared_ptr<Subject> subject) {
    if(auto s = subject_.lock()) {
        subject->Detach(shared_from_this());
        subject_.reset();
    } else {
        std::cout << "(Observer " << number_ << "): Already Unsubscribed.\n";
    }
  }

  void Update(const std::string &message_from_subject) override {
    message_from_subject_ = message_from_subject;
    PrintInfo();
  }

  void PrintInfo() {
    std::cout << "Observer \"" << this->number_ << "\": a new message is available --> " << this->message_from_subject_ << "\n";
  }

 private:
  std::string message_from_subject_;
  std::weak_ptr<Subject> subject_;
  static int static_number_;
  int number_;
};

int Observer::static_number_ = 0;

void ClientCode() {

  auto subject = std::make_shared<Subject>(); 
  auto observer1 = std::make_shared<Observer>();
  observer1->Subscribe(subject);
  auto observer2 = std::make_shared<Observer>();
  observer2->Subscribe(subject);
  auto observer3 = std::make_shared<Observer>();
  observer3->Subscribe(subject);
  
  subject->CreateMessage("Hello World! :D");
  observer3->Unsubscribe(subject);

  subject->CreateMessage("The weather is hot today! :p");
  
  auto observer4 = std::make_shared<Observer>();
  observer4->Subscribe(subject);
  auto observer5 = std::make_shared<Observer>();
  observer5->Subscribe(subject);

  subject->SomeBusinessLogic();

}

int main() {
  ClientCode();
  return 0;
}
```

## Reference
- [Observer](https://refactoring.guru/design-patterns/observer)