---
title: Minimum Cost to Convert String I
date: 2024-07-27
lastmod: 2024-07-27
author:
  - Jimmy Lin
tags:
  - graph
  - floyd_warshall
draft: false
---

## Description

You are given two **0-indexed** strings `source` and `target`, both of length `n` and consisting of **lowercase** English letters. You are also given two **0-indexed** character arrays `original` and `changed`, and an integer array `cost`, where `cost[i]` represents the cost of changing the character `original[i]` to the character `changed[i]`.

You start with the string `source`. In one operation, you can pick a character `x` from the string and change it to the character `y` at a cost of `z` **if** there exists **any** index `j` such that `cost[j] == z`, `original[j] == x`, and `changed[j] == y`.

Return _the **minimum** cost to convert the string_ `source` _to the string_ `target` _using **any** number of operations. If it is impossible to convert_ `source` _to_ `target`, _return_ `-1`.

**Note** that there may exist indices `i`, `j` such that `original[j] == original[i]` and `changed[j] == changed[i]`.

**Example 1:**

**Input:** source = "abcd", target = "acbe", original = \["a","b","c","c","e","d"\], changed = \["b","c","b","e","b","e"\], cost = \[2,5,5,1,2,20\]
**Output:** 28
**Explanation:** To convert the string "abcd" to string "acbe":
- Change value at index 1 from 'b' to 'c' at a cost of 5.
- Change value at index 2 from 'c' to 'e' at a cost of 1.
- Change value at index 2 from 'e' to 'b' at a cost of 2.
- Change value at index 3 from 'd' to 'e' at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28.
It can be shown that this is the minimum possible cost.

**Example 2:**

**Input:** source = "aaaa", target = "bbbb", original = \["a","c"\], changed = \["c","b"\], cost = \[1,2\]
**Output:** 12
**Explanation:** To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 \* 4 = 12 is incurred.

**Example 3:**

**Input:** source = "abcd", target = "abce", original = \["a"\], changed = \["e"\], cost = \[10000\]
**Output:** -1
**Explanation:** It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.

**Constraints:**

*   `1 <= source.length == target.length <= 105`
*   `source`, `target` consist of lowercase English letters.
*   `1 <= cost.length == original.length == changed.length <= 2000`
*   `original[i]`, `changed[i]` are lowercase English letters.
*   `1 <= cost[i] <= 106`
*   `original[i] != changed[i]`

## Code 

Time Complexity: $O(V^3)$, Space Complexity: $O(V^3)$

和 [[Find the City With the Smallest Number of Neighbors at a Threshold Distance]] 一樣，用 DFS 可以解只是 time complexity 過高，所以要使用 floyd-warshall。

```cpp
class Solution {
public:
    long long minimumCost(string source, string target, vector<char>& original, vector<char>& changed, vector<int>& cost) {
        vector<vector<long long>> dp(26, vector<long long>(26, LONG_MAX));
        for(int i = 0; i < 26; i++) {
            dp[i][i] = 0;
        }
        for(int i = 0; i < original.size(); i++) {
            dp[original[i] - 'a'][changed[i] - 'a'] = min(dp[original[i] - 'a'][changed[i] - 'a'], (long long)cost[i]);
        }
        for(int k = 0; k < 26; k++) {
            for(int i = 0; i < 26; i++) {
                for(int j = 0; j < 26; j++) {
                    if(dp[i][k] != LONG_MAX && dp[k][j] != LONG_MAX && dp[i][j] > dp[i][k] + dp[k][j]) {
                        dp[i][j] = dp[i][k] + dp[k][j];
                    }
                }
            }
        }

        long long res = 0;
        for(int i = 0; i < source.length(); i++) {
            if(source[i] == target[i])
                continue;
            if(dp[source[i] - 'a'][target[i] - 'a'] != LONG_MAX)
                res += dp[source[i] - 'a'][target[i] - 'a'];
            else 
                return -1;
        }
        return res;





        
    }   

};
```

以下是 DFS 版本，會 Time Limit Exceed。會 TLE 的原因是因為 `visited.erase(source);`，會這樣設是因為我們不確定是否有別條路可以用更小的 cost 抵達已經 visit 過的 node，但這樣就會讓 DFS 的 time complexity 不再是 $O(V + E)$，可以考慮一個 fully connected 的 graph，time complexity 就有可能會是 $O(V^V)$，也就是每個 node 都 traverse 到其他 $V - 1$ 個 node。

```cpp
class Solution {
public:
    long long minimumCost(string source, string target, vector<char>& original, vector<char>& changed, vector<int>& cost) {
        // build graph
        unordered_map<char, vector<pair<char, int>>> adj;
        for(int i = 0; i < original.size(); i++) {
            adj[original[i]].push_back({changed[i], cost[i]});
        }

        long long res = 0;

        for(int i = 0; i < source.length(); i++) {
            unordered_set<char> visited;
            long long cost = LONG_MAX;
            canConvert(source[i], target[i], adj, visited, 0, cost);
            if(cost == LONG_MAX)
                return -1;
            res += cost;
        }
        return res;
    }   

    void canConvert(char& source, char& target, unordered_map<char, vector<pair<char, int>>>& adj, unordered_set<char>& visited, long long curCost, long long& minCost) {
        if(visited.find(source) != visited.end())
            return;
        if(source == target) {
            minCost = min(minCost, curCost);
            return;
        }
        visited.insert(source);
        if(adj.find(source) != adj.end()) {
            for(auto info: adj[source]) {
                char next = info.first;
                int cost = info.second;
                canConvert(next, target, adj, visited, curCost + cost, minCost);
            }
        }
        visited.erase(source);
    }
};
```
## Source
- [Minimum Cost to Convert String I - LeetCode](https://leetcode.com/problems/minimum-cost-to-convert-string-i/description/?envType=daily-question&envId=2024-07-27)