---
title: Compare Strings by Frequency of the Smallest Character
date: 2023-07-16
lastmod: 2023-07-16
author: Jimmy Lin
tags: ["binary search", "prefix sum"]
draft: false
---

## Description

Let the function `f(s)` be the **frequency of the lexicographically smallest character** in a non-empty string `s`. For example, if `s = "dcce"` then `f(s) = 2` because the lexicographically smallest character is `'c'`, which has a frequency of 2.

You are given an array of strings `words` and another array of query strings `queries`. For each query `queries[i]`, count the **number of words** in `words` such that `f(queries[i])` < `f(W)` for each `W` in `words`.

Return _an integer array_ `answer`_, where each_ `answer[i]` _is the answer to the_ `ith` _query_.

**Example 1:**

**Input:** queries = \["cbd"\], words = \["zaaaz"\]
**Output:** \[1\]
**Explanation:** On the first query we have f("cbd") = 1, f("zaaaz") = 3 so f("cbd") < f("zaaaz").

**Example 2:**

**Input:** queries = \["bbb","cc"\], words = \["a","aa","aaa","aaaa"\]
**Output:** \[1,2\]
**Explanation:** On the first query only f("bbb") < f("aaaa"). On the second query both f("aaa") and f("aaaa") are both > f("cc").

**Constraints:**

*   `1 <= queries.length <= 2000`
*   `1 <= words.length <= 2000`
*   `1 <= queries[i].length, words[i].length <= 10`
*   `queries[i][j]`, `words[i][j]` consist of lowercase English letters.

## Code 

### Binary Search
基本概念同：[[Binary Search 101|Binary Search 101]]，這題講白了可以看成裝有數字的兩個 vector（frequency），要求第一個 vector 的數字在第二個 vector 中的 insert position，類似 [[Search Insert Position|Search Insert Position]]。找到 insert position 就可以知道第二個 vector 中有多少的數字比第一個 vector 中我們正在查詢的數字還要大。

Time Complexity: $O(n \log n + m \log m + n \log m)$, Space Complexity: $O(m + n)$

```cpp
class Solution {
public:
    vector<int> numSmallerByFrequency(vector<string>& queries, vector<string>& words) {
        int n = queries.size(), m = words.size();
        vector<int> queriesN(n, 0);
        vector<int> wordsN(m, 0);
        for(int i = 0; i < n; i++) {
            queriesN[i] = transform(queries[i]);
        }
        for(int i = 0; i < m; i++) {
            wordsN[i] = transform(words[i]);
        }

        sort(wordsN.begin(), wordsN.end());
        vector<int> res;
        for(auto q: queriesN) {
            res.push_back(find_bigger(q, wordsN));
        }

        return res;

    }

    int transform(string& word) {
        vector<int> fre(26, 0);
        for(int i = 0; i < word.size(); i++) {
            fre[word[i] - 'a']++;
        }

        for(int i = 0; i < 26; i++) {
            if(fre[i] != 0)
                return fre[i];
        }

        return -1;
    }

    int find_bigger(int n, vector<int>& nums) {
        int l = 0, r = nums.size();
        while(l < r) {
            int m = l + (r - l) / 2;
            if(nums[m] <= n)
                l = m + 1;
            else 
                r = m;
        }
        return nums.size() - l;
    }
};
```

### Prefix Sum

Time Complexity: $O(n + m)$, Space Complexity: $O(1)$

同 binary search 的解法，我們需要快速找出有多少個數字比 query 的數字大，這可藉由 prefix sum 達成。

```cpp
class Solution {
public:
    vector<int> numSmallerByFrequency(vector<string>& queries, vector<string>& words) {
        vector<int> frequency(12, 0);
        int f;
        for(int i = 0; i < words.size(); i++) {
            f = getFrequency(words[i]);
            frequency[f]++;
        }

        // prefix sum
        for(int i = 9; i >= 0; i--) {
            frequency[i] = frequency[i] + frequency[i+1];
        }

        vector<int> res;
        for(int i = 0; i < queries.size(); i++) {
            f = getFrequency(queries[i]);
            res.push_back(frequency[f+1]);
        }

        return res;

    }

    int getFrequency(string& word) {
        vector<int> fre(26, 0);
        for(int i = 0; i < word.size(); i++) {
            fre[word[i] - 'a']++;
        }

        for(int i = 0; i < 26; i++) {
            if(fre[i] != 0)
                return fre[i];
        }

        return -1;
    }
};
```


## Source
- [Compare Strings by Frequency of the Smallest Character - LeetCode](https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character/description/)