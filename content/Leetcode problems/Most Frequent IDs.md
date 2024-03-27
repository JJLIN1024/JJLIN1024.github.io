---
title: Most Frequent IDs
date: 2024-03-25
lastmod: 2024-03-25
author:
  - Jimmy Lin
tags:
  - heap
  - review
draft: false
sr-due: 2024-03-31
sr-interval: 4
sr-ease: 270
---

## Description

The problem involves tracking the frequency of IDs in a collection that changes over time. You have two integer arrays, `nums` and `freq`, of equal length `n`. Each element in `nums` represents an ID, and the corresponding element in `freq` indicates how many times that ID should be added to or removed from the collection at each step.

*   **Addition of IDs:** If `freq[i]` is positive, it means `freq[i]` IDs with the value `nums[i]` are added to the collection at step `i`.
*   **Removal of IDs:** If `freq[i]` is negative, it means `-freq[i]` IDs with the value `nums[i]` are removed from the collection at step `i`.

Return an array `ans` of length `n`, where `ans[i]` represents the **count** of the _most frequent ID_ in the collection after the `ith` step. If the collection is empty at any step, `ans[i]` should be 0 for that step.

**Example 1:**

**Input:** nums = \[2,3,2,1\], freq = \[3,2,-3,1\]

**Output:** \[3,3,2,2\]

**Explanation:**

After step 0, we have 3 IDs with the value of 2. So `ans[0] = 3`.  
After step 1, we have 3 IDs with the value of 2 and 2 IDs with the value of 3. So `ans[1] = 3`.  
After step 2, we have 2 IDs with the value of 3. So `ans[2] = 2`.  
After step 3, we have 2 IDs with the value of 3 and 1 ID with the value of 1. So `ans[3] = 2`.

**Example 2:**

**Input:** nums = \[5,5,3\], freq = \[2,-2,1\]

**Output:** \[2,0,1\]

**Explanation:**

After step 0, we have 2 IDs with the value of 5. So `ans[0] = 2`.  
After step 1, there are no IDs. So `ans[1] = 0`.  
After step 2, we have 1 ID with the value of 3. So `ans[2] = 1`.

**Constraints:**

*   `1 <= nums.length == freq.length <= 105`
*   `1 <= nums[i] <= 105`
*   `-105 <= freq[i] <= 105`
*   `freq[i] != 0`
*   The input is generated such that the occurrences of an ID will not be negative in any step.

## Code 

## Heap + Hashmap
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```
Use a max heap to store [freq, ID].

Also store the frequency of each ID in a map: cnt[ID] = freq

At each step i, update the frequency of nums[i] in cnt. Also put the new pair of [freq, ID] in the heap. We lazily update the heap, meaning at each step, we don't remove the stale pair in the heap, but when we look at the top of the heap for the max frequency, we ignore/pop the item if the frequency does not match what's stored in cnt. The pop operation can be amortized on each step of cnt update, so total amortized time is O(nlogn)
```

以 `nums = [2,3,2,1], freq = [3,2,-3,1]` 為例，前兩個 index 處理完後，輪到 index = 2，這時 2 的 frequency 會變成 0，但是原本 2 的 frequency 3 還在 max heap 當中，所以看 top 時要忽略且 pop 掉，同時檢查此時的 frequency，在這裏因為 frequency 為 0 ，因此不 push 新的 entry 到 max heap 中。

```cpp
class Solution {
public:
    vector<long long> mostFrequentIDs(vector<int>& nums, vector<int>& freq) {
        priority_queue<pair<long long, int>> max_heap; // <fre, n>
        unordered_map<int, long long> fre; // <n, fre>
        vector<long long> res;
        for(int i = 0; i < nums.size(); i++) {
            fre[nums[i]] += freq[i];
            max_heap.push({fre[nums[i]], nums[i]});

            while(!max_heap.empty()) {
                auto p = max_heap.top();
                auto f = p.first;
                auto n = p.second;
                if(fre[n] != f) {
                    max_heap.pop();
                    if(fre[n]) {
                        max_heap.push({fre[n], n});
                    }
                } else {
                    break;
                }
            }

            res.push_back(max_heap.top().first);
        }
        return res;
    }
};
```

## Source
- [Most Frequent IDs - LeetCode](https://leetcode.com/problems/most-frequent-ids/description/)