---
title: Palindrome Linked List
date: 2023-01-30
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - slow_and_fast_pointer
  - stack
draft: false
---

## Description

Given the `head` of a singly linked list, return `true` _if it is a_

_palindrome_

_or_ `false` _otherwise_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

**Input:** head = \[1,2,2,1\]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

**Input:** head = \[1,2\]
**Output:** false

**Constraints:**

*   The number of nodes in the list is in the range `[1, 105]`.
*   `0 <= Node.val <= 9`

**Follow up:** Could you do it in `O(n)` time and `O(1)` space?

## Code 

看到 palindrome，第一直覺是使用 stack，第二直覺是使用 slow & fast pointer 來找出 linked list 的一半在哪邊。

### Stack + Slow & Fast Pointer

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        stack<int> st;
        ListNode* slow = head;
        ListNode* fast = head;
        while(fast && fast->next) {
            st.push(slow->val);
            slow = slow->next;
            fast = fast->next->next;
        }
        if(fast) {
            slow = slow->next;
        }
        while(slow && !st.empty()) {
            if(st.top() != slow->val) return false;
            else {
                st.pop();
                slow = slow->next;
            }
        }

        return true;


    }
};
```

### slow & fast pointer + reversed linked list
不使用 stack 的解法，一樣使用 slow fast pointer，並將後半段的 linked list 反轉。
Time Complexity: $O(N)$, Space Complexity: $O(1)$

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
bool isPalindrome(struct ListNode* head) {
   struct ListNode* slow = head;
   struct ListNode* fast = head;
   while(fast && fast->next) {
       slow = slow->next;
       fast = fast->next->next;
   } 

    // now slow is the middle node
    if(fast) {
        // number of nodes is odd
        // skip middle node
        slow = slow->next;
    }

    // now slow is the start of the second half
    struct ListNode* prev = NULL;
    while(slow) {
        struct ListNode* next = slow->next;
        slow->next = prev;
        prev = slow;
        slow = next;
    }
    // now prev is the start of the reversed second half
    while(prev && head) {
        if(prev->val != head->val) return false;
        prev = prev->next;
        head = head->next;
    }
    return true;
}
```
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while(fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        if(fast) {
            slow = slow->next;
        }

        // reverse the second half
        ListNode* prev = nullptr;
        while(slow) {
            ListNode* next = slow->next;
            slow->next = prev;
            prev = slow;
            slow = next;
        }
        // since while loop termination condition is while slow is not null
        slow = prev;
        while(slow) {
            if(slow->val != head->val) return false;
            slow = slow->next;
            head = head->next;
        }

        return true;


    }
};
```

## Source
- [Palindrome Linked List - LeetCode](https://leetcode.com/problems/palindrome-linked-list/description/)