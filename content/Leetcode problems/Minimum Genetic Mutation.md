---
title: Minimum Genetic Mutation
date: 2024-02-27
lastmod: 2024-02-27
author:
  - Jimmy Lin
tags:
  - graph
  - BFS
  - review
draft: false
sr-due: 2024-03-02
sr-interval: 4
sr-ease: 270
---

## Description

A gene string can be represented by an 8-character long string, with choices from `'A'`, `'C'`, `'G'`, and `'T'`.

Suppose we need to investigate a mutation from a gene string `startGene` to a gene string `endGene` where one mutation is defined as one single character changed in the gene string.

*   For example, `"AACCGGTT" --> "AACCGGTA"` is one mutation.

There is also a gene bank `bank` that records all the valid gene mutations. A gene must be in `bank` to make it a valid gene string.

Given the two gene strings `startGene` and `endGene` and the gene bank `bank`, return _the minimum number of mutations needed to mutate from_ `startGene` _to_ `endGene`. If there is no such a mutation, return `-1`.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

**Example 1:**

**Input:** startGene = "AACCGGTT", endGene = "AACCGGTA", bank = \["AACCGGTA"\]
**Output:** 1

**Example 2:**

**Input:** startGene = "AACCGGTT", endGene = "AAACGGTA", bank = \["AACCGGTA","AACCGCTA","AAACGGTA"\]
**Output:** 2

**Constraints:**

*   `0 <= bank.length <= 10`
*   `startGene.length == endGene.length == bank[i].length == 8`
*   `startGene`, `endGene`, and `bank[i]` consist of only the characters `['A', 'C', 'G', 'T']`.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$


```cpp
class Solution {
public:
    int minMutation(string start, string end, vector<string>& bank) {

        //st holds all valid mutations
        unordered_set<string> st{bank.begin(),bank.end()};
        //if end mutaion is not in list return -1;
        if(!st.count(end)) return -1;
        //start BFS by pushing the starting mutation
        queue<string> Q;
        Q.push(start);
        int steps=0,s;
        string cur,t;
        while(!Q.empty()){
            s=Q.size();
            while(s--){
                cur=Q.front();
                Q.pop();
                //If we reach end mutation
                if(cur==end) return steps;
                //We erase the cur mutation in order to avoid redundant checking
                st.erase(cur);
                //as the length of mutation is 8 and it can take A,C,G,T
                //at each index we check the possibility of mutation by replcaing it with A,C,G,T
                for(int i=0;i<8;i++){
                    t=cur;
                    t[i]='A';
                    if(st.count(t)) Q.push(t);
                    t[i]='C';
                    if(st.count(t)) Q.push(t);
                    t[i]='G';
                    if(st.count(t)) Q.push(t);
                    t[i]='T';
                    if(st.count(t)) Q.push(t);
                }
            }
            steps++;
        }
        return -1;
    }

};
```


```cpp
class Solution {
public:
    int minMutation(string startGene, string endGene, vector<string>& bank) {

        if(bank.empty()) return -1;

        bool valid = false;
        for(auto b: bank) {
            if(b == endGene)
                valid = true;
        }
        if(!valid) return -1;

        unordered_map<string, vector<string>> adj;
        bank.push_back(startGene);
        bank.push_back(endGene);

        for(int i = 0; i < bank.size(); i++) {
            for(int j = i + 1; j < bank.size(); j++) {
                if(can_mutate(bank[i], bank[j])) {
                    adj[bank[i]].push_back(bank[j]);
                    adj[bank[j]].push_back(bank[i]);
                }
            }
        }

        unordered_map<string, bool> visited;
        for(auto b: bank) {
            visited[b] = false;
        }

        queue<string> q;
        q.push(startGene);
        int level = -1;
        while(!q.empty()) {
            int s = q.size();
            level++;
            for(int i = 0; i < s; i++) {
                auto ss = q.front();
                q.pop();
                if(ss == endGene) {
                    return level;
                }
                visited[ss] = true;
                for(auto neighbor: adj[ss]) {
                    if(!visited[neighbor]) {
                        q.push(neighbor);
                    }
                }
            }
        }
        return -1;
    }

    bool can_mutate(string& gene1, string& gene2) {
        int differ = 0;
        for(int i = 0; i < 8; i++) {
            if(gene1[i] != gene2[i]) 
                differ++;
            if(differ > 1)
                return false;
        }
        return differ == 1;
    }
};
```

## Source
- [Minimum Genetic Mutation - LeetCode](https://leetcode.com/problems/minimum-genetic-mutation/description/?envType=study-plan-v2&envId=top-interview-150)