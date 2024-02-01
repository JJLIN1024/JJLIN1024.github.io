---
title: Insertion Sort List
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - sorting
draft: false
---

## Description

Given the `head` of a singly linked list, sort the list using **insertion sort**, and return _the sorted list's head_.

The steps of the **insertion sort** algorithm:

1.  Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
2.  At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
3.  It repeats until no input elements remain.

The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.

![](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/04/sort1linked-list.jpg)

**Input:** head = \[4,2,1,3\]
**Output:** \[1,2,3,4\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/04/sort2linked-list.jpg)

**Input:** head = \[-1,5,3,4,0\]
**Output:** \[-1,0,3,4,5\]

**Constraints:**

*   The number of nodes in the list is in the range `[1, 5000]`.
*   `-5000 <= Node.val <= 5000`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

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
    ListNode* insertionSortList(ListNode* head) {
       for(auto i = head; i; i = i->next) {
           for(auto j = head; j != i; j = j->next) {
               if(i->val < j->val) {
                   swap(i->val, j->val);
               }
           }
       }
       return head;
    }
};
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */


struct ListNode* insertionSortList(struct ListNode* head) {
    for(struct ListNode* cur = head; cur; cur = cur->next) {
        for(struct ListNode* j = head; j != cur; j = j->next) {
            if(j->val > cur->val) {
                int temp = j->val;
                j->val = cur->val;
                cur->val = temp;
            }
        }
    }
    return head;

}
```

## Source
- [Insertion Sort List - LeetCode](https://leetcode.com/problems/insertion-sort-list/description/)