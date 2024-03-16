---
title: Remove Zero Sum Consecutive Nodes from Linked List
date: 2023-12-07
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
  - two_pointer
  - sliding_window
  - review
draft: false
sr-due: 2024-03-30
sr-interval: 14
sr-ease: 290
---

## Description

Given the `head` of a linked list, we repeatedly delete consecutive sequences of nodes that sum to `0` until there are no such sequences.

After doing so, return the head of the final linked list.  You may return any such answer.

(Note that in the examples below, all sequences are serializations of `ListNode` objects.)

**Example 1:**

**Input:** head = \[1,2,-3,3,1\]
**Output:** \[3,1\]
**Note:** The answer \[1,2,1\] would also be accepted.

**Example 2:**

**Input:** head = \[1,2,3,-3,4\]
**Output:** \[1,2,4\]

**Example 3:**

**Input:** head = \[1,2,3,-3,-2\]
**Output:** \[1\]

**Constraints:**

*   The given linked list will contain between `1` and `1000` nodes.
*   Each node in the linked list has `-1000 <= node.val <= 1000`.

## Code 

Time Complexity: $O(N^2)$, Space Complexity: $O(1)$

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
    ListNode* removeZeroSumSublists(ListNode* head) {
        ListNode** indirect = &head;

        while(*indirect) {
            ListNode* cur = *indirect;
            ListNode* runner = cur->next;
            int curSum = cur->val;
            while(runner && curSum != 0) {
                curSum += runner->val;
                runner = runner->next;
            }

            if(curSum == 0) {
                *indirect = runner;
            } else {
                indirect = &((*indirect)->next);
            }
        }

        return head;
    }
};
```

## Source
- [Remove Zero Sum Consecutive Nodes from Linked List - LeetCode](https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/description/)