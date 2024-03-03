---
title: Maximum Score From Removing Stones
date: 2023-07-20
lastmod: 2023-07-20
author: Jimmy Lin
tags: [""]
draft: false
---

## Description

You are playing a solitaire game with **three piles** of stones of sizes `a`​​​​​​, `b`,​​​​​​ and `c`​​​​​​ respectively. Each turn you choose two **different non-empty** piles, take one stone from each, and add `1` point to your score. The game stops when there are **fewer than two non-empty** piles (meaning there are no more available moves).

Given three integers `a`​​​​​, `b`,​​​​​ and `c`​​​​​, return _the_ **_maximum_** _**score** you can get._

**Example 1:**

**Input:** a = 2, b = 4, c = 6
**Output:** 6
**Explanation:** The starting state is (2, 4, 6). One optimal set of moves is:
- Take from 1st and 3rd piles, state is now (1, 4, 5)
- Take from 1st and 3rd piles, state is now (0, 4, 4)
- Take from 2nd and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 6 points.

**Example 2:**

**Input:** a = 4, b = 4, c = 6
**Output:** 7
**Explanation:** The starting state is (4, 4, 6). One optimal set of moves is:
- Take from 1st and 2nd piles, state is now (3, 3, 6)
- Take from 1st and 3rd piles, state is now (2, 3, 5)
- Take from 1st and 3rd piles, state is now (1, 3, 4)
- Take from 1st and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 7 points.

**Example 3:**

**Input:** a = 1, b = 8, c = 8
**Output:** 8
**Explanation:** One optimal set of moves is to take from the 2nd and 3rd piles for 8 turns until they are empty.
After that, there are fewer than two non-empty piles, so the game ends.

**Constraints:**

*   `1 <= a, b, c <= 105`

## Code 

### Max Heap
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int maximumScore(int a, int b, int c) {
        priority_queue<int> max_heap;
        max_heap.push(a);
        max_heap.push(b);
        max_heap.push(c);
        int zero_count = 0;
        int res = 0;
        while(!max_heap.empty()) {
            auto n1 = max_heap.top();
            max_heap.pop();
            auto n2 = max_heap.top();
            max_heap.pop();
            if(--n1 != 0) max_heap.push(n1);
            else zero_count++;
            if(--n2 != 0) max_heap.push(n2);
            else zero_count++;

            res ++;
            if(zero_count >= 2) break;            
        }

        return res;
    }
};
```

### Math
Time Complexity: $O(1)$, Space Complexity: $O(1)$

和  [[Maximum Number of Weeks for Which You Can Work|Maximum Number of Weeks for Which You Can Work]] 類似。

```markdown
Reverse engineering, either 3 nums all become 0 or there are two 0’s

If all 3 nums become 0, then result is (a+b+c)/2
if 2 out of 3 are 0, it has to be sum of the minimum and middle one, so sum - max
```

```cpp
class Solution {
public:
    int maximumScore(int a, int b, int c) {
        int m = max(max(a, b), c);
        if(2 * m > a + b + c) return a + b + c - m;
        return (a + b + c) / 2;
    }
};
```

## Source
- [Maximum Score From Removing Stones - LeetCode](https://leetcode.com/problems/maximum-score-from-removing-stones/)