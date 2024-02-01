---
title: Reverse Nodes in Even Length Groups
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - review
draft: false
sr-due: 2024-01-30
sr-interval: 3
sr-ease: 250
---

## Description

You are given the `head` of a linked list.

The nodes in the linked list are **sequentially** assigned to **non-empty** groups whose lengths form the sequence of the natural numbers (`1, 2, 3, 4, ...`). The **length** of a group is the number of nodes assigned to it. In other words,

*   The `1st` node is assigned to the first group.
*   The `2nd` and the `3rd` nodes are assigned to the second group.
*   The `4th`, `5th`, and `6th` nodes are assigned to the third group, and so on.

Note that the length of the last group may be less than or equal to `1 + the length of the second to last group`.

**Reverse** the nodes in each group with an **even** length, and return _the_ `head` _of the modified linked list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/10/25/eg1.png)

**Input:** head = \[5,2,6,3,9,1,7,3,8,4\]
**Output:** \[5,6,2,3,9,1,4,8,3,7\]
**Explanation:**
- The length of the first group is 1, which is odd, hence no reversal occurs.
- The length of the second group is 2, which is even, hence the nodes are reversed.
- The length of the third group is 3, which is odd, hence no reversal occurs.
- The length of the last group is 4, which is even, hence the nodes are reversed.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/10/25/eg2.png)

**Input:** head = \[1,1,0,6\]
**Output:** \[1,0,1,6\]
**Explanation:**
- The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 1. No reversal occurs.

**Example 3:**

![](https://assets.leetcode.com/uploads/2021/11/17/ex3.png)

**Input:** head = \[1,1,0,6,5\]
**Output:** \[1,0,1,5,6\]
**Explanation:**
- The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 2. The nodes are reversed.

**Constraints:**

*   The number of nodes in the list is in the range `[1, 105]`.
*   `0 <= Node.val <= 105`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

類似 [[Reverse Nodes in k-Group]]。

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
    ListNode* reverseEvenLengthGroups(ListNode* head) {
        // Creating a dummy node to avoid adding checks for the first node
        ListNode* dummy = new ListNode();
        dummy->next = head;

        ListNode* prev = dummy;
        for(int len = 1; len < 1e5 && head; len++) {

            ListNode* end = head;
            ListNode* nextHead;
            int j = 1;
            while(j < len && end && end->next) {
                end = end->next;
                j++;
            }

            nextHead = end->next;
            if((j % 2) == 0) {
                end->next = NULL;
                prev->next = reverse(head);
                head->next = nextHead;
                prev = head;
                head = nextHead;
            } else {
                prev = end;
                head = nextHead;
            }
        }

        return dummy->next;
    }

    ListNode* reverse(ListNode* head) {
        if(!head) return head;
        ListNode* prev = NULL;
        while(head) {
            auto tmp = head->next;
            head->next = prev;
            prev = head;
            head = tmp;
        }
        return prev;
    }
};
```

## Source
- [Reverse Nodes in Even Length Groups - LeetCode](https://leetcode.com/problems/reverse-nodes-in-even-length-groups/description/)