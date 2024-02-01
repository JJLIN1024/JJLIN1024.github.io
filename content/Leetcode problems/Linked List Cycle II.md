---
title: Linked List Cycle II
date: 2023-02-03
lastmod: 2023-12-03
author:
  - Jimmy Lin
tags:
  - linked_list
  - cycle_detection
  - slow_and_fast_pointer
draft: false
---

## Description

Given the `head` of a linked list, return _the node where the cycle begins. If there is no cycle, return_ `null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to (**0-indexed**). It is `-1` if there is no cycle. **Note that** `pos` **is not passed as a parameter**.

**Do not modify** the linked list.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

**Input:** head = \[3,2,0,-4\], pos = 1
**Output:** tail connects to node index 1
**Explanation:** There is a cycle in the linked list, where tail connects to the second node.

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)

**Input:** head = \[1,2\], pos = 0
**Output:** tail connects to node index 0
**Explanation:** There is a cycle in the linked list, where tail connects to the first node.

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)

**Input:** head = \[1\], pos = -1
**Output:** no cycle
**Explanation:** There is no cycle in the linked list.

**Constraints:**

*   The number of the nodes in the list is in the range `[0, 104]`.
*   `-105 <= Node.val <= 105`
*   `pos` is `-1` or a **valid index** in the linked-list.

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

一脈相承 [[Linked List Cycle|Linked List Cycle]]。找 Cycle 起點可參考 [[notes/algorithm/Floyd’s Cycle Finding Algorithm|Floyd’s Cycle Finding Algorithm]]。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode *detectCycle(struct ListNode *head) {
   struct ListNode* slow = head;
   struct ListNode* fast = head;
   while(slow && fast && fast->next) {
       slow = slow->next;
       fast = fast->next->next;
       if(slow == fast) {
           slow = head;
           while(slow != fast) {
               slow = slow->next;
               fast = fast->next;
           }
           return slow;
       }
   } 
   return NULL;

}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        bool flag = false;
        while(slow && fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if(slow == fast) {
                flag = true;
                break;
            }
        }
        if(!flag) return nullptr;
        slow = head;
        while(slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        return slow;
    }
};
```

## Source
- [Linked List Cycle II - LeetCode](https://leetcode.com/problems/linked-list-cycle-ii/)
- [Floyd’s Cycle detection](https://en.wikipedia.org/wiki/Cycle_detection)
- [龜兔賽跑演算法（Floyd判圈演算法](https://www.w3help.cc/a/202107/321380.html)
- [Floyd’s Cycle Finding Algorithm](https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/)

