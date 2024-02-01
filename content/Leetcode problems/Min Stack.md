---
title: Min Stack
date: 2023-03-23
lastmod: 2023-12-02
author:
  - Jimmy Lin
tags:
  - stack
  - review
draft: false
sr-due: 2024-03-12
sr-interval: 48
sr-ease: 290
---

## Description

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:

*   `MinStack()` initializes the stack object.
*   `void push(int val)` pushes the element `val` onto the stack.
*   `void pop()` removes the element on the top of the stack.
*   `int top()` gets the top element of the stack.
*   `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

**Example 1:**

**Input**
\["MinStack","push","push","push","getMin","pop","top","getMin"\]
\[\[\],\[-2\],\[0\],\[-3\],\[\],\[\],\[\],\[\]\]

**Output**
\[null,null,null,null,-3,null,0,-2\]

**Explanation**
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

**Constraints:**

*   `-231 <= val <= 231 - 1`
*   Methods `pop`, `top` and `getMin` operations will always be called on **non-empty** stacks.
*   At most `3 * 104` calls will be made to `push`, `pop`, `top`, and `getMin`.

## Code 

解題關鍵都在於，只要在 push 每個 element 時紀錄好到此為止的 min element 是誰，則 pop 不影響紀錄好的結果。

若 pop 掉的剛好是 min element ，則結果就會換人。若 pop 掉的不是 min element，那結果就不變。
### using 2 stacks
Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class MinStack {
public:
    MinStack() {
        
    }
    
    void push(int val) {
        s1.push(val);
        if(s2.empty() || val <= getMin()) s2.push(val);
    }
    
    void pop() {
        if(s1.top() == getMin()) s2.pop();
        s1.pop();
    }
    
    int top() {
        return s1.top();
    }
    
    int getMin() {
        return s2.top();
    }   

private:
    stack<int> s1;
    stack<int> s2;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

### using vector<pair<int, int>>
Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class MinStack {
public:
    MinStack() {
        
    }
    
    void push(int val) {
        if(v.empty()) {
            v.push_back({val, val});
        } else {
            v.push_back({val, min(v.back().second, val)});
        }
    }
    
    void pop() {
        v.pop_back();
    }
    
    int top() {
        return v.back().first;
    }
    
    int getMin() {
        return v.back().second;
    }   

private:
    vector<pair<int, int>> v;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```


## Source
- [Min Stack - LeetCode](https://leetcode.com/problems/min-stack/description/)