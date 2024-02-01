---
title: Merge k Sorted Lists
date: 2023-02-15
lastmod: 2023-12-03
author:
  - Jimmy Lin
tags:
  - divide_and_conquer
  - indirect_pointer
  - linked_list
draft: false
---

## Description

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

_Merge all the linked-lists into one sorted linked-list and return it._

**Example 1:**

**Input:** lists = \[\[1,4,5\],\[1,3,4\],\[2,6\]\]
**Output:** \[1,1,2,3,4,4,5,6\]
**Explanation:** The linked-lists are:
\[
  1->4->5,
  1->3->4,
  2->6
\]
merging them into one sorted list:
1->1->2->3->4->4->5->6

**Example 2:**

**Input:** lists = \[\]
**Output:** \[\]

**Example 3:**

**Input:** lists = \[\[\]\]
**Output:** \[\]

**Constraints:**

*   `k == lists.length`
*   `0 <= k <= 104`
*   `0 <= lists[i].length <= 500`
*   `-104 <= lists[i][j] <= 104`
*   `lists[i]` is sorted in **ascending order**.
*   The sum of `lists[i].length` will not exceed `104`.

## Code 

以下所有做法都符合 $T(n) = 2T(\frac{n}{2}) + O(n)$，因此

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$
### Divide and Conquer
以 [[Merge Two Sorted Lists|Merge Two Sorted Lists]] 為基礎，Divide and Conquer。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode* head;
    struct ListNode** indirect = &head;

    while(list1 && list2) {
        if(list1->val < list2->val) {
            *indirect = list1;
            list1 = list1->next;
        } else {
            *indirect = list2;
            list2 = list2->next;
        }
        indirect = &(*indirect)->next;
    }
    if(list1) {
       *indirect = list1;
    } else {
       *indirect = list2;
    }
    return head;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    
    if(!listsSize) return NULL; // edge case where lists is initially empty
    if(listsSize == 1) return *lists;

    int m = listsSize >> 1;
    struct ListNode* left = mergeKLists(lists, m);
    struct ListNode* right = mergeKLists(lists + m, listsSize - m);
    return mergeTwoLists(left, right);
}
```

### Iteratively merge head and tail

當合併完頭尾後，偶數長度會少一半，奇數長度則為 `(listsSize + 1) / 2`，奇數更新的方式也可以用在偶數長度上。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode* head;
    struct ListNode** indirect = &head;

    while(list1 && list2) {
        if(list1->val < list2->val) {
            *indirect = list1;
            list1 = list1->next;
        } else {
            *indirect = list2;
            list2 = list2->next;
        }
        indirect = &(*indirect)->next;
    }
    if(list1) {
       *indirect = list1;
    } else {
       *indirect = list2;
    }
    return head;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    
    if(!listsSize) return NULL; // edge case where lists is initially empty
    while(listsSize > 1) {
        for(int i = 0, j = listsSize - 1; i < j; i++, j--) {
            lists[i] = mergeTwoLists(lists[i], lists[j]);
        }
        listsSize = (listsSize + 1) / 2;
    }
    return lists[0];
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
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if(lists.empty()) return nullptr;

        int n = lists.size();
        while(n > 1) {
            for(int i = 0; i < n / 2; i++) {
                lists[i] = mergeTwoLists(lists[i], lists[n - 1 - i]);
            }
            n = (n + 1) / 2;
        }
        return lists[0];
    }

    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        while(list1 && list2) {
            if(list1->val < list2->val) {
                curr->next = new ListNode(list1->val);
                curr = curr->next;
                list1 = list1->next;
            } else {
                curr->next = new ListNode(list2->val);
                curr = curr->next;
                list2 = list2->next;
            }
        }

        if(list1) {
            curr->next = list1;
        } else if (list2) {
            curr->next = list2;
        }

        return dummy->next;
    }

};
```

### Iteratively merge through interval

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode* head;
    struct ListNode** indirect = &head;

    while(list1 && list2) {
        if(list1->val < list2->val) {
            *indirect = list1;
            list1 = list1->next;
        } else {
            *indirect = list2;
            list2 = list2->next;
        }
        indirect = &(*indirect)->next;
    }
    if(list1) {
       *indirect = list1;
    } else {
       *indirect = list2;
    }
    return head;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    
    if(!listsSize) return NULL; // edge case where lists is initially empty
    for(int interval = 1; interval < listsSize; interval *= 2) {
        for(int i = 0; i + interval < listsSize; i += interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
        }
    }
    return lists[0];
}



```
## Source
- [Merge k Sorted Lists - LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/description/)