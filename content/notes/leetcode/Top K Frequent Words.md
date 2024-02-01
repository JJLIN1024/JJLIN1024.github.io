---
title: Top K Frequent Words
date: 2023-04-05
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - heap
  - min_heap
  - max_heap
  - bucket_sort
  - sort
draft: false
---

## Description

Given an array of strings `words` and an integer `k`, return _the_ `k` _most frequent strings_.

Return the answer **sorted** by **the frequency** from highest to lowest. Sort the words with the same frequency by their **lexicographical order**.

**Example 1:**

```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.

```

**Example 2:**

```
Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.

```

**Constraints:**

-   `1 <= words.length <= 500`
-   `1 <= words[i].length <= 10`
-   `words[i]` consists of lowercase English letters.
-   `k` is in the range `[1, The number of **unique** words[i]]`

**Follow-up:** Could you solve it in `O(n log(k))` time and `O(n)` extra space?

## Code 

priority queue 的寫法和 [[K Closest Points to Origin|K Closest Points to Origin]] 一樣，要注意 `<, >`。

### Max heap

Time Complexity: $O(n \log k)$, Space Complexity: $O(k)$

```cpp
class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> mp;
        priority_queue<pair<string, int>, vector<pair<string, int>>, myComparoter> pq;

        for(auto &word: words) {
            mp[word]++;
        }

        for(auto it = mp.begin(); it != mp.end(); it++) {
            pq.push(make_pair(it->first, it->second));
        }

        vector<string> answer;
        for(int i = 0; i < k; i++) {
            answer.emplace_back(pq.top().first);
            pq.pop();
        }

        return answer;

    }

private:
    struct myComparoter {
        bool operator() (const pair<string, int>& p1, const pair<string, int>& p2) {
            if(p1.second != p2.second) return p1.second < p2.second;
            return p1.first > p2.first; 
        }
    };


};
```

### Min Heap

Time Complexity: $O(n \log k)$, Space Complexity: $O(k)$

```cpp
class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> mp;
        priority_queue<pair<string, int>, vector<pair<string, int>>, myComparoter> pq;

        for(auto &word: words) {
            mp[word]++;
        }

        for(auto it = mp.begin(); it != mp.end(); it++) {
            pq.push(make_pair(it->first, it->second));
            if(pq.size() > k) pq.pop();
        }

        vector<string> answer(k);
        k--;
        while(!pq.empty()) {
            answer[k--] = pq.top().first;
            pq.pop();
        }

        return answer;

    }

private:
    struct myComparoter {
        bool operator() (const pair<string, int>& p1, const pair<string, int>& p2) {
            if(p1.second != p2.second) return p1.second > p2.second;
            return p1.first < p2.first; 
        }
    };


};
```

### Bucket Sort

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

Use min heap in each bucket. Worst case is that all elements are in the same bucket, that will make time complexity $O(n \log n)$.

```cpp
class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> count;
        for(auto w: words) {
            count[w]++;
        }

        // min heap
        auto cmp = [](const string& s1, const string& s2){return s1 > s2;};
        using Heap = priority_queue<string, vector<string>, decltype(cmp)>;
        vector<Heap> bucket(words.size() + 1);
        for(auto it: count) {
            bucket[it.second].push(it.first);
        }

        vector<string> res;
        for(int i = bucket.size() - 1; i >= 0, k > 0; i--) {
            while(!bucket[i].empty() && k--) {
                auto s = bucket[i].top();
                bucket[i].pop();
                res.push_back(s);
            }
        }
        return res;

    }
};
```
## Source
- [Top K Frequent Words - LeetCode](https://leetcode.com/problems/top-k-frequent-words/description/)