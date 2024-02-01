---
title: Sort Characters By Frequency
date: 2023-04-06
lastmod: 2023-04-06
author: Jimmy Lin
tags: ["sorting", "heap"]
draft: false
---

## Description

Given a string `s`, sort it in **decreasing order** based on the **frequency** of the characters. The **frequency** of a character is the number of times it appears in the string.

Return _the sorted string_. If there are multiple answers, return _any of them_.

**Example 1:**

**Input:** s = "tree"
**Output:** "eert"
**Explanation:** 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

**Example 2:**

**Input:** s = "cccaaa"
**Output:** "aaaccc"
**Explanation:** Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.

**Example 3:**

**Input:** s = "Aabb"
**Output:** "bbAa"
**Explanation:** "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.

**Constraints:**

*   `1 <= s.length <= 5 * 105`
*   `s` consists of uppercase and lowercase English letters and digits.

## Code 

### Sorting

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    string frequencySort(string s) {
       unordered_map<char, int> m;
       for(auto c: s) {
           m[c]++;
       } 

       sort(s.begin(), s.end(), [&](const char& a, const char& b) {return m[a] == m[b] ? a < b : m[a] > m[b];});

       return s;
    }
};
```

frequency 相同時，字母順序沒有規定。

但是不能寫成以下的形式，反例：`s = "aaaolol"`，當 `o, l` 頻率相同時，下面的寫法就不會將他們交換位置，就會返回 `s = "aaaolol"`，但是我們期望的是 `s = "aaaooll"` 或是 `s = "aaalloo"`。

```cpp
sort(s.begin(), s.end(), [&](const char& a, const char& b) {return m[a] > m[b];});
```


### Sorting (Bucket Sort)

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    string frequencySort(string s) {
        int n = s.size();
        vector<vector<char>> bucket(n + 1);
        unordered_map<char, int> mp;
        for(auto ch: s) {
            mp[ch]++;
        }

        for(auto it = mp.begin(); it != mp.end(); it++) {
            bucket[it->second].push_back(it->first);
        }

        string answer = "";
        for(int freq = n; freq >= 1; freq--) {
            for(char c: bucket[freq]) {
                answer.append(freq, c);
            }
        }

        return answer;

    }
};
```

### Heap

類似 [[Top K Frequent Words|Top K Frequent Words]]、[[Top K Frequent Elements|Top K Frequent Elements]] 中的作法。

Time Complexity: $O(n) + O(k \log k)$, where $k$ is the number of distinct element.
`
```cpp
class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> mp;
        priority_queue<pair<char, int>, vector<pair<char, int>>, comp> pq;

        for(auto ch: s) {
            mp[ch]++;
        }

        for(auto it = mp.begin(); it != mp.end(); it++) {
            pq.push(make_pair(it->first, it->second));
        }

        string answer = "";
        while(!pq.empty()) {
            for(int i = 0; i < pq.top().second; i++)
                answer += pq.top().first;
            pq.pop();
        }

        return answer;

    }

private:
    struct comp {
        bool operator() (const pair<char, int>& p1, const pair<char, int>& p2) {
            if(p1.second != p2.second) return p1.second < p2.second;
            return p1.first > p2.first;
        }
    };
};
```

## Source
- [Sort Characters By Frequency - LeetCode](https://leetcode.com/problems/sort-characters-by-frequency/description/)