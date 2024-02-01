---
title: Permutation in String
date: 2024-01-10
lastmod: 2024-01-10
author: Jimmy Lin
tags:
  - sliding_window
  - review
draft: false
sr-due: 2024-02-05
sr-interval: 21
sr-ease: 290
---

## Description

Given two strings `s1` and `s2`, return `true` _if_ `s2` _contains a permutation of_ `s1`_, or_ `false` _otherwise_.

In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

**Example 1:**

**Input:** s1 = "ab", s2 = "eidbaooo"
**Output:** true
**Explanation:** s2 contains one permutation of s1 ("ba").

**Example 2:**

**Input:** s1 = "ab", s2 = "eidboaoo"
**Output:** false

**Constraints:**

*   `1 <= s1.length, s2.length <= 104`
*   `s1` and `s2` consist of lowercase English letters.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

Use one hashmap:

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        unordered_map<char, int> mp;
        for(auto c: s1) {
            mp[c]++;
        }
        
        int n = s2.length();
        vector<int> marked(n, 0);
        int j = 0;
        for(int i = 0; i < n; i++) {
            j = max(j, i); // s1 = "adc, s2 = "dcda"
            while(j < n && (mp.find(s2[j]) != mp.end())) {
                marked[j] = 1;
                mp[s2[j]]--;
                if(mp[s2[j]] == 0) {
                    mp.erase(s2[j]);
                }
                if(mp.empty()) return true;
                j++;
            }
            if(marked[i] == 1) mp[s2[i]]++;
        }
        return false;
    }
};
```

use one hashmap and without `mark`, instead, use `count`。上面的做法的問題在於，因為是用 hashmap size 是否為零來判斷是否為 anagram，所以在 sliding window 向右移動時，會無法分辨 `s2[i]` 是否是 `s1` 的一部分。而用 count 就可以避免我們把 key 從 hashmap 中刪除，因此就可以判斷 `s2[i]` 是否是 `s1` 的一部分，是的話就再將其值加回來。

還有 sliding window 移動的方式也不太一樣。要注意上面 `j = max(j, i)` 的用法。

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        unordered_map< char, int >mp;    //Use hashmap to store the frequencies of all the characters present in string s1.
        for(auto it : s1){
            mp[it]++;
        }
        int count = mp.size();         //Use the count variable to see if all of the characters in the map have the same frequency, indicating that an anagram has been found.
        int i = 0, j = 0;
        int k = s1.size();             //Window Size
        while(j < s2.size()){
            if(mp.find(s2[j]) != mp.end()){      //If a character is found that already exists in the map, reduce its frequency by one.
                mp[s2[j]]--;
                if(mp[s2[j]] == 0){     //If the frequency of a specific character on the map is 0, it means that all occurrences of that character is found inside the current window size.
                    count--;
                }
            }
            if(j-i+1 < k){
                j++;
            }
            else if(j-i+1 == k){
				if(count == 0){    //Anagram found 
					return true;  
				}
                if(mp.find(s2[i]) != mp.end()){  //Check if that character is present in the map while sliding the window, then increase its frequency by one, as we decreased its frequency when we first met it while crossing the window.
                    mp[s2[i]]++;
                    if(mp[s2[i]] == 1){
                        count++;
                    }
                }
                i++;
                j++;
            }
        }
        return false;
    }
};
```


Use two hashmap:

```cpp
class Solution {
    bool areVectorsEqual(vector<int> a, vector<int> b){
        for(int i=0; i<26; i++){
            if(a[i]!=b[i]) return false;
        }
        return true;
    }
public:
    bool checkInclusion(string s1, string s2) {
        if(s2.size()<s1.size()) return false;
        vector<int> freqS1(26, 0);
        for(char c: s1) freqS1[c-'a']++;
        
        vector<int> freqS2(26, 0);
        int i=0, j=0;
        
        while(j<s2.size()){
            freqS2[s2[j]-'a']++;
            
            if(j-i+1==s1.size()){
                if(areVectorsEqual(freqS1, freqS2)) return true;
            }
            
            if(j-i+1<s1.size()) j++;
            else{
                freqS2[s2[i]-'a']--;
                i++;
                j++;
            }
        }
        return false;
    }
};
```
## Source
- [Permutation in String - LeetCode](https://leetcode.com/problems/permutation-in-string/description/)