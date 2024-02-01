---
title: Delete Columns to Make Sorted
date: 2023-01-03
lastmod: 2023-01-03
author: Jimmy Lin
tags: ["string", "hashmap"]
draft: false
---

## Code

Time Complexity: $O(N)$, Space Complexity: $O(1)$
```cpp
class Solution {
public:
    int minDeletionSize(vector<string>& strs) {
        int count = 0;
        for(int i = 0; i < strs[0].size(); i++) {
            for(int j = 1; j < strs.size(); j++) {
                if(strs[j-1][i] > strs[j][i]) {
                    count++;
                    break;  
                }
            }
        }
        return count;
    }
};
```

## Link
- [Delete Columns to Make Sorted](https://leetcode.com/problems/delete-columns-to-make-sorted/description/)
