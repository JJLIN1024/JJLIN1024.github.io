---
title: Delete the Middle Node of a Linked List
date: 2023-03-15
lastmod: 2023-03-15
author:
  - Jimmy Lin
tags:
  - slow_and_fast_pointer
  - indirect_pointer
  - linked_list
draft: false
---

## Description

You are given the `head` of a linked list. **Delete** the **middle node**, and return _the_ `head` _of the modified linked list_.

The **middle node** of a linked list of size `n` is the `⌊n / 2⌋th` node from the **start** using **0-based indexing**, where `⌊x⌋` denotes the largest integer less than or equal to `x`.

*   For `n` = `1`, `2`, `3`, `4`, and `5`, the middle nodes are `0`, `1`, `1`, `2`, and `2`, respectively.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/11/16/eg1drawio.png)

**Input:** head = \[1,3,4,7,1,2,6\]
**Output:** \[1,3,4,1,2,6\]
**Explanation:**
The above figure represents the given linked list. The indices of the nodes are written below.
Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
We return the new list after removing this node. 

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/11/16/eg2drawio.png)

**Input:** head = \[1,2,3,4\]
**Output:** \[1,2,4\]
**Explanation:**
The above figure represents the given linked list.
For n = 4, node 2 with value 3 is the middle node, which is marked in red.

**Example 3:**

![](https://assets.leetcode.com/uploads/2021/11/16/eg3drawio.png)

**Input:** head = \[2,1\]
**Output:** \[2\]
**Explanation:**
The above figure represents the given linked list.
For n = 2, node 1 with value 1 is the middle node, which is marked in red.
Node 0 with value 2 is the only node remaining after removing node 1.

**Constraints:**

*   The number of nodes in the list is in the range `[1, 105]`.
*   `1 <= Node.val <= 105`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

### Direct Pointer

使用 [[Middle of the Linked List|Middle of the Linked List]] 中的快慢指標技巧，找到中點，接著再刪除中點即可。

注意 edge case：當只有一個 node 的時候。

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
    ListNode* deleteMiddle(ListNode* head) {
        if(!head->next) {
            return nullptr;
        }
        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* prev = nullptr;
        while(fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        // now slow is the middle
        prev->next = slow->next;

        return head;
    }
};
```


### Pointer to pointer

利用 pointer to pointer (indirect pointer) 的技巧，可以避免掉 edge case 的處理。

用 `toBeFree` 去保存要被刪掉的 node 之 address，如此一來就可以在使用 `*indirect = (*indirect)->next;` 去修改 address 後，將原本的 address free 掉，避免 memory leak。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* deleteMiddle(struct ListNode* head) {
    struct ListNode** indirect = &head;
    struct ListNode* fast = head;
    while(fast && fast->next) {
        indirect = &(*indirect)->next;
        fast = fast->next->next;
    }
    struct ListNode* toBeFree = *indirect;
    *indirect = (*indirect)->next;
    free(toBeFree);
    return head;
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
    ListNode* deleteMiddle(ListNode* head) {
        ListNode** slow = &head;
        ListNode* fast = head;
        while(fast && fast->next) {
            slow = &((*slow)->next);
            fast = fast->next->next;
        }
        
        *slow = (*slow)->next;

        return head;
    }
};
```


## Source
- [Delete the Middle Node of a Linked List - LeetCode](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/description/)