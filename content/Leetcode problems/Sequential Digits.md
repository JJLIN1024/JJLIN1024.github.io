---
title: Sequential Digits
date: 2024-02-02
tags:
  - emunation
  - sliding_window
  - review
author:
  - Jimmy Lin
draft: false
---
## Description

An integer has _sequential digits_ if and only if each digit in the number is one more than the previous digit.

Return a **sorted** list of all the integers in the range `[low, high]` inclusive that have sequential digits.

**Example 1:**

```
<strong>Input:</strong> low = 100, high = 300
<strong>Output:</strong> [123,234]
```

**Example 2:**

```
<strong>Input:</strong> low = 1000, high = 13000
<strong>Output:</strong> [1234,2345,3456,4567,5678,6789,12345]
```

**Constraints:**

-   `10 <= low <= high <= 10^9`

## Code
### Sliding Window

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        string s = "123456789";
        int l = to_string(low).size(); // l contains number of digits in low 
        int h = to_string(high).size();// h contains number of digits in high
        vector<int>res;
        for (int width=l;width<=h;width++){// width : window size
            for(int j=0;j<=9-width;j++){
                int num=stoi(s.substr(j,width));
                if(num<=high && num>=low)
                    res.push_back(num);
            }
        }
        return res;
    }
};
```
### Enumeration
Time Complexity: $O(1)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        int len = log10(low) + 1, k = 1;
        long long num = 0, adder = 0;
        vector<int> res;
        for(int i=len-1; i>=0; i--){
            num += k*pow(10, i);
            adder += pow(10, i);
            k++;
            if(k == 10) return {};
        }
        
        long long temp = num;
        while(temp < low){
            temp += adder;
            if(temp < low && temp%10 == 9){
                if(k == 10) return {};
                num *= 10;
                num += k;
                adder *= 10;
                adder ++;
                k++;
                temp = num;
            }
        }
        
        
        while(temp <= high){
            if(temp%10 == 9){
                if(temp <= high) res.push_back(temp);
                if(k == 10) return res;
                num *= 10;
                num += k;
                adder *= 10;
                adder++;
                k++;
                temp = num;
            }
            else{
                res.push_back(temp);
                temp += adder;
            }
        }
        
        return res;
    }
};

```
## Source
- [Sequential Digits - LeetCode](https://leetcode.com/problems/sequential-digits/description)