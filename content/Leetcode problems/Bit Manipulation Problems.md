---
title: Bit Manipulation Problems
date: 2023-10-29
lastmod: 2023-10-29
author:
  - Jimmy Lin
tags: 
draft: false
---
## Tricks

- target the nth bit
	- `mask = 1 << n`
	- set：`n |= mask`
	- get：`n &= mask`
	- toggle：`n ^= mask`
	- erase：`n &= ~mask`
- 把最右邊的 1 bit 除掉：`n = n & (n - 1)`
- 得到最右邊的 1 bit：`n = n & (-n)`

- [[Number of 1 Bits]]
- [[Sum of Values at Indices With K Set Bits|Sum of Values at Indices With K Set Bits]]
- [[Reverse Bits]]
- [[Counting Bits]]
- [[Power of Two]]
- [[Power of Four]] 
- [[Missing Number]]
- [[Majority Element]] 
- [[Hamming Distance]]
- [[Sum of Two Integers]] 
- [[Pow(x, n)]]
- [[Divide Two Integers|Divide Two Integers]] 
- [[Bitwise AND of Numbers Range]] 
- [[Single Number]]
- [[Single Number II]]
- [[Single Number III]] 
- [[Repeated DNA Sequences]] 
- [[Total Hamming Distance|Total Hamming Distance]]
- [[Longest Nice Subarray|Longest Nice Subarray]] 
- [[Gray Code]]
- 
- [[Smallest Subarrays With Maximum Bitwise OR|Smallest Subarrays With Maximum Bitwise OR]]
- 
- [[Maximum XOR After Operations|Maximum XOR After Operations]] 
- [[Apply Operations on Array to Maximize Sum of Squares]]
- 
- [[Triples with Bitwise AND Equal To Zero|Triples with Bitwise AND Equal To Zero]] 


## Reference
- [[Bit Manipulation Tricks]]