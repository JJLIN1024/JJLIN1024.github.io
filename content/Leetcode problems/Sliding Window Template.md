---
title: Sliding Window Template
date: 2023-10-10
lastmod: 2023-10-10
author:
  - Jimmy Lin
tags: 
draft: false
---

### Problems Solvable using this template

-   [3\. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/discuss/1499836/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [159\. Longest Substring with At Most Two Distinct Characters (Medium)](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/discuss/1499839/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [340\. Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/discuss/1499842/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [424\. Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/discuss/1499834/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [487\. Max Consecutive Ones II](https://leetcode.com/problems/max-consecutive-ones-ii/discuss/1499844/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [713\. Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/discuss/1501834/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [1004\. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/discuss/1504260/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [1208\. Get Equal Substrings Within Budget (Medium)](https://leetcode.com/problems/get-equal-substrings-within-budget/discuss/1529234/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [1493\. Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/discuss/1504267/C%2B%2B-Sliding-Window-(%2B-Cheat-Sheet))
-   [1695\. Maximum Erasure Value](https://leetcode.com/problems/maximum-erasure-value/discuss/1504271/C%2B%2B-Sliding-Window-(%2BCheat-Sheet))
-   [1838\. Frequency of the Most Frequent Element](https://leetcode.com/problems/frequency-of-the-most-frequent-element/discuss/1175088/C%2B%2B-Maximum-Sliding-Window-Cheatsheet-Template!)
-   [2009\. Minimum Number of Operations to Make Array Continuous](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/discuss/1470857/C%2B%2B-Sliding-Window)
-   [2024\. Maximize the Confusion of an Exam](https://leetcode.com/problems/maximize-the-confusion-of-an-exam/discuss/1499033/c-sliding-window-cheat-sheet)
-   1425.  [Constrained Subsequence Sum](https://leetcode.com/problems/constrained-subsequence-sum/discuss/597751/JavaC++Python-O(N)-Decreasing-Deque)
-   1358.  [Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/discuss/516977/JavaC++Python-Easy-and-Concise)
-   1248.  [Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/discuss/419378/JavaC%2B%2BPython-Sliding-Window-atMost(K)-atMost(K-1))
-   1234.  [Replace the Substring for Balanced String](https://leetcode.com/problems/replace-the-substring-for-balanced-string/discuss/408978/javacpython-sliding-window/367697)
-   930.  [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/discuss/186683/)
-   992.  [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/discuss/523136/JavaC%2B%2BPython-Sliding-Window)
-   904.  [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/discuss/170740/Sliding-Window-for-K-Elements)
-   862.  [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/discuss/143726/C%2B%2BJavaPython-O(N)-Using-Deque)
-   209.  [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/discuss/433123/JavaC++Python-Sliding-Window)

The following problems are also solvable using the shrinkable template with the ["At Most to Equal" trick](https://leetcode.com/problems/count-vowel-substrings-of-a-string/discuss/1563765/c-on-time-sliding-window/1141941)

-   [930\. Binary Subarrays With Sum (Medium)](https://leetcode.com/problems/binary-subarrays-with-sum/discuss/1513935/C%2B%2B-Prefix-State-Map-or-Sliding-Window)
-   [992\. Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/discuss/1499830/C%2B%2B-Sliding-Window)
-   [1248\. Count Number of Nice Subarrays (Medium)](https://leetcode.com/problems/count-number-of-nice-subarrays/discuss/1515501/C%2B%2B-Prefix-State-Map-Two-Pointers-Sliding-Window)
-   [2062\. Count Vowel Substrings of a String (Easy)](https://leetcode.com/problems/count-vowel-substrings-of-a-string/discuss/1563765/c-on-time-sliding-window/1141941)



### Template 1: Sliding Window (Shrinkable)

The best template I've found so far:

```cpp
int i = 0, j = 0, ans = 0;
for (; j < N; ++j) {
    // CODE: use A[j] to update state which might make the window invalid
    for (; invalid(); ++i) { // when invalid, keep shrinking the left edge until it's valid again
        // CODE: update state using A[i]
    }
    ans = max(ans, j - i + 1); // the window [i, j] is the maximum window we've found thus far
}
return ans;
```

Essentially, we want to **keep the window valid** at the end of each outer `for` loop.

**Solution for this question:**

1.  What should we use as the `state`? It should be the sum of numbers in the window
2.  How to determine `invalid`? The window is invalid if `(j - i + 1) * A[j] - sum > k`.

```cpp
// OJ: https://leetcode.com/problems/frequency-of-the-most-frequent-element/
// Author: github.com/lzl124631x
// Time: O(NlogN)
// Space: O(1)
class Solution {
public:
    int maxFrequency(vector<int>& A, int k) {
        sort(begin(A), end(A));
        long i = 0, N = A.size(), ans = 1, sum = 0;
        for (int j = 0; j < N; ++j) {
            sum += A[j];
            while ((j - i + 1) * A[j] - sum > k) sum -= A[i++];
            ans = max(ans, j - i + 1);
        }
        return ans;
    }
};
```

**FAQ**:

-   Why is the time complexity `O(NlogN)`?  
    The sorting takes `O(NlogN)`. The two pointer part only takes `O(N)` because both the pointers `i` and `j` traverse the array ONLY ONCE.
    
-   Why is `(j - i + 1) * A[j] - sum <= k` valid?  
    `(j - i + 1)` is the length of the window `[i, j]`. We want to increase all the numbers in the window to equal `A[j]`, the number of operations needed is `(j - i + 1) * A[j] - sum` which should be `<= k`. For example, assume the window is `[1,2,3]`, increasing all the numbers to `3` will take `3 * 3 - (1 + 2 + 3)` operations.
    

### Template 2: Sliding Window (Non-shrinkable)

```cpp
int i = 0, j = 0;
for (; j < N; ++j) {
    // CODE: use A[j] to update state which might make the window invalid
    if (invalid()) { // Increment the left edge ONLY when the window is invalid. In this way, the window GROWs when it's valid, and SHIFTs when it's invalid
        // CODE: update state using A[i]
        ++i;
    }
    // after `++j` in the for loop, this window `[i, j)` of length `j - i` MIGHT be valid.
}
return j - i; // There must be a maximum window of size `j - i`.
```

Essentially, we GROW the window when it's valid, and SHIFT the window when it's invalid.

Note that there is only a SINGLE `for` loop now!

**Solution for this question:**

```cpp
// OJ: https://leetcode.com/problems/frequency-of-the-most-frequent-element/
// Author: github.com/lzl124631x
// Time: O(NlogN)
// Space: O(1)
class Solution {
public:
    int maxFrequency(vector<int>& A, int k) {
        sort(begin(A), end(A));
        long i = 0, j = 0, N = A.size(), sum = 0;
        for (; j < N; ++j) {
            sum += A[j];
            if ((j - i + 1) * A[j] - sum > k) sum -= A[i++];
        }
        return j - i;
    }
};
```

### Apply these templates to other problems

#### [1493\. Longest Subarray of 1's After Deleting One Element (Medium)](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)

##### Sliding Window (Shrinkable)

1.  What's `state`? `cnt` as the number of `0`s in the window.
2.  What's `invalid`? `cnt > 1` is invalid.

```cpp
// OJ: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
// Author: github.com/lzl124631x
// Time: O(N)
// Space: O(1)
class Solution {
public:
    int longestSubarray(vector<int>& A) {
        int i = 0, j = 0, N = A.size(), cnt = 0, ans = 0;
        for (; j < N; ++j) {
            cnt += A[j] == 0;
            while (cnt > 1) cnt -= A[i++] == 0;
            ans = max(ans, j - i); // note that the window is of size `j - i + 1`. We use `j - i` here because we need to delete a number.
        }
        return ans;
    }
};
```

##### Sliding Window (Non-shrinkable)

```cpp
// OJ: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
// Author: github.com/lzl124631x
// Time: O(N)
// Space: O(1)
class Solution {
public:
    int longestSubarray(vector<int>& A) {
        int i = 0, j = 0, N = A.size(), cnt = 0;
        for (; j < N; ++j) {
            cnt += A[j] == 0;
            if (cnt > 1) cnt -= A[i++] == 0;
        }
        return j - i - 1;
    }
};
```

#### [3\. Longest Substring Without Repeating Characters (Medium)](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

##### Sliding Window (Shrinkable)

1.  `state`: `cnt[ch]` is the number of occurrence of character `ch` in window.
2.  `invalid`: `cnt[s[j]] > 1` is invalid.

```cpp
// OJ: https://leetcode.com/problems/longest-substring-without-repeating-characters/
// Author: github.com/lzl124631x
// Time: O(N)
// Space: O(1)
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int i = 0, j = 0, N = s.size(), ans = 0, cnt[128] = {};
        for (; j < N; ++j) {
            cnt[s[j]]++;
            while (cnt[s[j]] > 1) cnt[s[i++]]--;
            ans = max(ans, j - i + 1);
        }
        return ans;
    }
};
```

##### Sliding Window (Non-shrinkable)

Note that since the non-shrinkable window might include multiple duplicates, we need to add a variable to our state.

1.  `state`: `dup` is the number of different kinds of characters that has duplicate in the window. For example, if window contains `aabbc`, then `dup = 2` because `a` and `b` has duplicates.
2.  `invalid`: `dup > 0` is invalid

```cpp
// OJ: https://leetcode.com/problems/longest-substring-without-repeating-characters/
// Author: github.com/lzl124631x
// Time: O(N)
// Space: O(1)
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int i = 0, j = 0, N = s.size(), cnt[128] = {}, dup = 0;
        for (; j < N; ++j) {
            dup += ++cnt[s[j]] == 2;
            if (dup) dup -= --cnt[s[i++]] == 1;
        }
        return j - i;
    }
};
```

#### [713\. Subarray Product Less Than K (Medium)](https://leetcode.com/problems/subarray-product-less-than-k/)

##### Sliding Window (Shrinkable)

-   `state`: `prod` is the product of the numbers in window
-   `invalid`: `prod >= k` is invalid.

Note that since we want to make sure the window `[i, j]` is valid at the end of the `for` loop, we need `i <= j` check for the inner `for` loop. `i == j + 1` means this window is empty.

Each maximum window `[i, j]` can generate `j - i + 1` valid subarrays, so we need to add `j - i + 1` to the answer.

```cpp
// OJ: https://leetcode.com/problems/subarray-product-less-than-k/
// Author: github.com/lzl124631x
// Time: O(N)
// Space: O(1)
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& A, int k) {
        if (k == 0) return 0;
        long i = 0, j = 0, N = A.size(), prod = 1, ans = 0;
        for (; j < N; ++j) {
            prod *= A[j];
            while (i <= j && prod >= k) prod /= A[i++];
            ans += j - i + 1;
        }
        return ans;
    }
};
```

**The non-shrinkable template is not applicable here since we need to the length of each maximum window ending at each position**

___

Below is my original answer during contest. As you can see, if I don't use this template, the solution could be a bit complex.

## Solution 1. Sliding Window

Let two pointers `i, j` form a window `[i, j]`. The window is valid if `(j - i + 1) * A[j] - sum <= k`.

We keep increasing `j` to expand the window as much as possible. When the window becomes invalid, we increment `i`.

```cpp
// OJ: https://leetcode.com/problems/frequency-of-the-most-frequent-element/
// Author: github.com/lzl124631x
// Time: O(NlogN)
// Space: O(1)
class Solution {
public:
    int maxFrequency(vector<int>& A, int k) {
        sort(begin(A), end(A));
        long i = 0, j = 0, N = A.size(), ans = 1, sum = A[0];
        for (; i < N; ++i) {
            while (j < N && (j - i + 1) * A[j] - sum <= k) {
                ans = max(ans, j - i + 1);
                ++j;
                if (j < N) sum += A[j];
            }
            sum -= A[i];
        }
        return ans;
    }
};
```

## Source
- [C++ Maximum Sliding Window Cheatsheet Template! - Frequency of the Most Frequent Element - LeetCode](https://leetcode.com/problems/frequency-of-the-most-frequent-element/solutions/1175088/C++-Maximum-Sliding-Window-Cheatsheet-Template!/)
