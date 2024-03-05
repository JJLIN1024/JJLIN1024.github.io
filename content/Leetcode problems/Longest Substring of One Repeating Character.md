---
title: Longest Substring of One Repeating Character
date: 2024-02-06
tags:
  - segment_tree
author:
  - Jimmy Lin
draft: false
---

## Description

You are given a **0-indexed** string `s`. You are also given a **0-indexed** string `queryCharacters` of length `k` and a **0-indexed** array of integer **indices** `queryIndices` of length `k`, both of which are used to describe `k` queries.

The `i<sup>th</sup>` query updates the character in `s` at index `queryIndices[i]` to the character `queryCharacters[i]`.

Return _an array_ `lengths` _of length_ `k` _where_ `lengths[i]` _is the **length** of the **longest substring** of_ `s` _consisting of **only one repeating** character **after** the_ `i<sup>th</sup>` _query_ _is performed._

**Example 1:**

```
<strong>Input:</strong> s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
<strong>Output:</strong> [3,3,4]
<strong>Explanation:</strong> 
- 1<sup>st</sup> query updates s = "<u>b<strong>b</strong>b</u>acc". The longest substring consisting of one repeating character is "bbb" with length 3.
- 2<sup>nd</sup> query updates s = "bbb<u><strong>c</strong>cc</u>". 
  The longest substring consisting of one repeating character can be "bbb" or "ccc" with length 3.
- 3<sup>rd</sup> query updates s = "<u>bbb<strong>b</strong></u>cc". The longest substring consisting of one repeating character is "bbbb" with length 4.
Thus, we return [3,3,4].
```

**Example 2:**

```
<strong>Input:</strong> s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]
<strong>Output:</strong> [2,3]
<strong>Explanation:</strong>
- 1<sup>st</sup> query updates s = "ab<strong>a</strong><u>zz</u>". The longest substring consisting of one repeating character is "zz" with length 2.
- 2<sup>nd</sup> query updates s = "<u>a<strong>a</strong>a</u>zz". The longest substring consisting of one repeating character is "aaa" with length 3.
Thus, we return [2,3].
```

**Constraints:**

-   `1 <= s.length <= 10<sup>5</sup>`
-   `s` consists of lowercase English letters.
-   `k == queryCharacters.length == queryIndices.length`
-   `1 <= k <= 10<sup>5</sup>`
-   `queryCharacters` consists of lowercase English letters.
-   `0 <= queryIndices[i] < s.length`
## Code

abbbbccc 的 segment tree 會長這樣：

![[Pasted image 20240206145807.png]]

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
#define left_child 2 * index + 1
#define right_child 2 * index + 2
class sgtree{
public:
    vector<int> maxConsecutive, start_from_right, start_from_left;
    vector<char> left_end_char, right_end_char; 
    int n;

    sgtree(string &s){
        n = s.size();
        maxConsecutive = vector<int>(4 * n, 0);
        start_from_right = vector<int>(4 * n, -1);
        start_from_left = vector<int>(4 * n, -1);
        left_end_char = vector<char>(4 * n, '*');
        right_end_char = vector<char>(4 * n, '*');
        build(0, s, 0, n - 1);
    }

    int getMax() {
        return maxConsecutive[0];
    }
    void build(int index, string &s, int l, int r){

        if(l == r){
            left_end_char[index] = right_end_char[index] = s[l];
            start_from_right[index] = l, start_from_left[index] = l; 
            maxConsecutive[index] = 1;
            return;
        }

        int m = (l + r) / 2;
        build(left_child, s, l, m); 
        build(right_child, s, m+1, r); 
        merge(index, l, m, r);
    }

    void merge(int index, int l, int m, int r){
        int max_ = 0;
        left_end_char[index] = left_end_char[left_child]; 
        right_end_char[index] = right_end_char[right_child];

        start_from_right[index] = start_from_right[left_child];
        start_from_left[index] = start_from_left[right_child];

        if(right_end_char[left_child] == left_end_char[right_child]){ 
            if(start_from_right[left_child] == m) start_from_right[index] = start_from_right[right_child];
            if(start_from_left[right_child] == m + 1) start_from_left[index] = start_from_left[left_child];
            max_ = start_from_right[right_child] - start_from_left[left_child] + 1;
        } 
        
        maxConsecutive[index] = max(max_, max(maxConsecutive[left_child], maxConsecutive[right_child]));
    }

    void update(int index,int l, int r, int j, char ch){
        if(j < l || j > r) return;
        if(j == l && j == r){
            left_end_char[index] = right_end_char[index] = ch;
            start_from_right[index] = l, start_from_left[index] = l; 
            maxConsecutive[index] = 1;
            return;
        }
        int m = (l + r) / 2;
        update(left_child, l, m, j, ch);
        update(right_child, m + 1, r, j, ch); 
        merge(index, l, m, r);
    }
};
class Solution {
public:
    vector<int> longestRepeating(string s, string q, vector<int>& in) {
        sgtree node(s);
        vector<int> res(q.size(),0);
        for(int i = 0; i < q.size(); ++i){
            node.update(0, 0, s.size()-1, in[i], q[i]);
            res[i] = node.getMax();
        }
        return res;
    }
};
```

## Source
- [Longest Substring of One Repeating Character - LeetCode](https://leetcode.com/problems/longest-substring-of-one-repeating-character/description/)