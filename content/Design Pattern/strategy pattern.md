---
title: strategy pattern
date: 2024-03-30
lastmod: 2024-03-30
author:
  - Jimmy Lin
tags:
  - design-pattern
draft: false
---
- extracted implementation details(SRP)
- created opportunity for easy change and easy extension
- reduced duplication(DRY)
- Linux Virtual File System？

## Example 1

底下的例子中，SortingContext 為 client 端（在此為 main）的 interface，client 可使用不同的 SortingStrategy ，SortingStrategy 是可抽換的，其子類別為不同的 sorting algorithm，將子類別當作參數傳入 SortingContext 裡的 member function 是安全的，因為子類別 pointer 轉成其 parent 類別的 pointer 是安全的。

```cpp
#include <vector>
#include <memory>
#include <iostream>

class SortingStrategy 
{
public:

    SortingStrategy(){}
    virtual ~SortingStrategy(){}
    virtual void sort(std::vector<int>& A){}
};
 

class BubbleSortStrategy : public SortingStrategy 
{
public:
    void sort(std::vector<int>& A) override 
    {
        std::cout << "Sorting using Bubble Sort \n";
    }
};
 
class MergeSortStrategy : public SortingStrategy
{
public:
    void sort(std::vector<int>& A) override 
    {
        std::cout << "Sorting using Merge Sort \n";
    }
};

class SortingContext {
private:
    std::unique_ptr<SortingStrategy> sortingStrategy;
public:
    SortingContext(std::unique_ptr<SortingStrategy> strategy): 
        sortingStrategy(std::move(strategy)) {}

    void setSortingStrategy(std::unique_ptr<SortingStrategy> strategy) {
        this->sortingStrategy = std::move(strategy);
    }
    
    void performSort(std::vector<int>& array) {
        sortingStrategy.get()->sort(array);
    }
};

int main() {

    SortingContext* sortingContext = new SortingContext(std::make_unique<BubbleSortStrategy>());
    std::vector<int> array1 = {5, 2, 9, 1, 5};
    sortingContext->performSort(array1); 

    // Change strategy to MergeSortStrategy
    sortingContext->setSortingStrategy(std::make_unique<MergeSortStrategy>());
    std::vector<int> array2 = {8, 3, 7, 4, 2};
    sortingContext->performSort(array2); // Output: Sorting using Merge Sort
}
```

要注意這邊不能使用 `this->sortingStrategy.reset(strategy.get())` ，會造成 double free，因為上一個 strategy 因為本身就是 unique pointer，因此已經自動被 free 了。

```cpp
this->sortingStrategy = std::move(strategy);
```

## Example 2

```cpp
#include <memory>
#include <iostream>

class Shape {
public:
  Shape() = default;
  virtual ~Shape() = default;
  virtual void draw() = 0;
};

class DrawStrategy {
public:
  DrawStrategy(){}
  virtual ~DrawStrategy(){}
  virtual void draw(Shape& shape){};
};

class DrawSquareStrategy : public DrawStrategy
{
public:
  void draw(Shape& square) override 
  {
    std::cout << "Drawing an Circle! \n";
  }
};

class DrawCircleStrategy : public DrawStrategy
{
public:
  void draw(Shape& circle) override
  {
    std::cout << "Drawing an Square! \n";
  }
};

class Circle : public Shape
{
private:
  std::unique_ptr<DrawCircleStrategy> drawing;
public:
  Circle(std::unique_ptr<DrawCircleStrategy> strategy):
    drawing(std::move(strategy)) {}

  void draw() override {
    drawing->draw(*this);
  }
};

class Square : public Shape
{
private:
  std::unique_ptr<DrawSquareStrategy> drawing;
public:
  Square(std::unique_ptr<DrawSquareStrategy> strategy):
    drawing(std::move(strategy)) {}

  void draw() override {
    drawing->draw(*this);
  }
};


int main() {
  Square* s1 = new Square(std::make_unique<DrawSquareStrategy>());
  Circle* c1 = new Circle(std::make_unique<DrawCircleStrategy>());
  s1->draw();
  c1->draw();
}
```


- [Strategy Pattern – Design Patterns (ep 1)](https://youtu.be/v9ejT8FO-7I?si=Wmpkt-6A6rcqgMOn)
- [Back to Basics: Designing Classes (part 1 of 2) - Klaus Iglberger - CppCon 2021](https://youtu.be/motLOioLJfg?si=6sfMOHi5FP3W8yFR)