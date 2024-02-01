---
title: Unique Binary Search Trees
date: 2023-01-02
lastmod: 2023-01-02
author: Jimmy Lin
tags: ["DP", "math"]
draft: false
---

## Code

### DP

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> DP(n + 1, 0);
        DP[0] = 1;
        DP[1] = 1;
        for(int i = 2; i <= n; i++) {
            for(int j = i - 1; j >= 0; j--) {
                DP[i] += DP[j] * DP[i - 1 - j];
            }
        }

        return DP[n];

    }
};
```

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numTrees(int n) {
        if(n <= 1) return 1;
        if(n == 2) return 2;
        int answer = 0;
        for(int i = 0; i < n; i++) {
            answer += numTrees(i) * numTrees(n - 1 - i);
        }
        return answer;
    }
};
```

### Catalan Number
- [Catalan Numbers](https://brilliant.org/wiki/catalan-numbers/)
Time Complexity: $O(1)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numTrees(int n) {
        return com(2*n, n) / (n+1);
    }
    
    long com(int a, int b) {
        long answer = 1;
        for(int i = 1; i <= b; i++) {
            answer *= a - i + 1;

            answer /= i;
        }
        return answer;
    }
    

};
```


## Link
- [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/description/)
