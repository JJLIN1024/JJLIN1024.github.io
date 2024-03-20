---
title: Merge In Between Linked Lists
date: 2024-03-20
lastmod: 2024-03-20
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

You are given two linked lists: `list1` and `list2` of sizes `n` and `m` respectively.

Remove `list1`'s nodes from the `ath` node to the `bth` node, and put `list2` in their place.

The blue edges and nodes in the following figure indicate the result:

![](https://assets.leetcode.com/uploads/2020/11/05/fig1.png)

_Build the result list and return its head._

**Example 1:**

![](https://assets.leetcode.com/uploads/2024/03/01/ll.png)

**Input:** list1 = \[10,1,13,6,9,5\], a = 3, b = 4, list2 = \[1000000,1000001,1000002\]
**Output:** \[10,1,13,1000000,1000001,1000002,5\]
**Explanation:** We remove the nodes 3 and 4 and put the entire list2 in their place. The blue edges and nodes in the above figure indicate the result.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/05/merge_linked_list_ex2.png)

**Input:** list1 = \[0,1,2,3,4,5,6\], a = 2, b = 5, list2 = \[1000000,1000001,1000002,1000003,1000004\]
**Output:** \[0,1,1000000,1000001,1000002,1000003,1000004,6\]
**Explanation:** The blue edges and nodes in the above figure indicate the result.

**Constraints:**

*   `3 <= list1.length <= 104`
*   `1 <= a <= b < list1.length - 1`
*   `1 <= list2.length <= 104`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

照題目要求操作而已，沒啥難的。

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
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode** iter = &list1;
        for(int i = 0; i < a; i++) {
            iter = &(*iter)->next;
        }
        
        ListNode* next_iter =(*iter)->next;
        // connect to list2's start
        *iter = list2;

        for(int i = 0; i < b - a; i++) {
            next_iter = next_iter->next;
        }

        while(list2->next) {
            list2 = list2->next;
        }

        list2->next = next_iter;
        return list1;
    }
};
```

## Source
- [Merge In Between Linked Lists - LeetCode](https://leetcode.com/problems/merge-in-between-linked-lists/description/?envType=daily-question&envId=2024-03-20)