---
title: Reverse Bits
date: 2023-01-31
lastmod: 2023-01-31
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Reverse bits of a given 32 bits unsigned integer.

**Note:**

*   Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
*   In Java, the compiler represents the signed integers using [2's complement notation](https://en.wikipedia.org/wiki/Two%27s_complement). Therefore, in **Example 2** above, the input represents the signed integer `-3` and the output represents the signed integer `-1073741825`.

**Example 1:**

**Input:** n = 00000010100101000001111010011100
**Output:**    964176192 (00111001011110000010100101000000)
**Explanation:** The input binary string **00000010100101000001111010011100** represents the unsigned integer 43261596, so return 964176192 which its binary representation is **00111001011110000010100101000000**.

**Example 2:**

**Input:** n = 11111111111111111111111111111101
**Output:**   3221225471 (10111111111111111111111111111111)
**Explanation:** The input binary string **11111111111111111111111111111101** represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is **10111111111111111111111111111111**.

**Constraints:**

*   The input must be a **binary string** of length `32`

**Follow up:** If this function is called many times, how would you optimize it?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

運算優先級：`>>` 優先於 `&`。
```c
uint32_t reverseBits(uint32_t n) {
    uint32_t reverse_n = 0;
    for (int i = 0; i < 32; i++) {
        reverse_n |= ( n >> ( ( 32 - 1 ) - i ) & 1 ) << i;
    }
    return reverse_n;

```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t reversed = 0;
        for(unsigned int i = 0, mask = 1; i < 32; i++, mask <<= 1) {
            if(n & mask)
                reversed |= (1 << (32 - 1 - i)); 
        }

        return reversed;
    }
};
```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t answer = 0;
        for(int i = 0; i < 32; i++) {
            answer = answer << 1;
            answer = answer ^ (n & 1);
            n = n >> 1;
        }

        return answer;
    }
};
```


Time Complexity: $O(\log n)$, Space Complexity: $O(n)$

運用到線性代數的觀念：$(AB)^T = B^TA^T$

以 4 位元來當例子：abcd -> cdab -> dcba。底下的 code 就是針對每一個 bit 去做同樣的事情。

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        n = (n >> 16) | (n << 16);
        n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8);
        n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4);
        n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2);
        n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1);
        return n;
    }
};
```

## Source
- [Reverse Bits - LeetCode](https://leetcode.com/problems/reverse-bits/description/)