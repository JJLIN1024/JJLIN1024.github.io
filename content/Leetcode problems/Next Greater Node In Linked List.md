---
title: Next Greater Node In Linked List
date: 2023-03-25
lastmod: 2023-03-25
author: Jimmy Lin
tags: ["monotinic stack", "next greater element"]
draft: false
---

## Description

You are given the `head` of a linked list with `n` nodes.

For each node in the list, find the value of the **next greater node**. That is, for each node, find the value of the first node that is next to it and has a **strictly larger** value than it.

Return an integer array `answer` where `answer[i]` is the value of the next greater node of the `ith` node (**1-indexed**). If the `ith` node does not have a next greater node, set `answer[i] = 0`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/08/05/linkedlistnext1.jpg)

**Input:** head = \[2,1,5\]
**Output:** \[5,5,0\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/08/05/linkedlistnext2.jpg)

**Input:** head = \[2,7,4,3,5\]
**Output:** \[7,0,5,5,0\]

**Constraints:**

*   The number of nodes in the list is `n`.
*   `1 <= n <= 104`
*   `1 <= Node.val <= 109`

## Code 

same logic as [[Next Greater Element II]] & [[Daily Temperatures]]。只是 data structure 由 vector 改成 linked list 而已。

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
    vector<int> nextLargerNodes(ListNode* head) {
        stack<pair<int,int>> st;
        ListNode* curr = head;
        int index = 0;
        vector<int> answer;
        while(curr) {
            while(!st.empty() && st.top().second < curr->val) {
                answer[st.top().first] = curr->val;
                st.pop();
            }
            st.push({index, curr->val});
            answer.push_back(0);
            curr = curr->next;
            index++;
        }
        return answer;
    }
};
```

## Source
- [Next Greater Node In Linked List - LeetCode](https://leetcode.com/problems/next-greater-node-in-linked-list/description/)