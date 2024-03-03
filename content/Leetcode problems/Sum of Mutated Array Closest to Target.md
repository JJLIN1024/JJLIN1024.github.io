---
title: Sum of Mutated Array Closest to Target
date: 2023-02-13
lastmod: 2023-02-13
author: Jimmy Lin
tags: ["Binary Search"]
draft: false
---

## Description

Given an integer array `arr` and a target value `target`, return the integer `value` such that when we change all the integers larger than `value` in the given array to be equal to `value`, the sum of the array gets as close as possible (in absolute difference) to `target`.

In case of a tie, return the minimum such integer.

Notice that the answer is not neccesarilly a number from `arr`.

**Example 1:**

**Input:** arr = \[4,9,3\], target = 10
**Output:** 3
**Explanation:** When using 3 arr converts to \[3, 3, 3\] which sums 9 and that's the optimal answer.

**Example 2:**

**Input:** arr = \[2,3,5\], target = 10
**Output:** 5

**Example 3:**

**Input:** arr = \[60864,25176,27249,21296,20204\], target = 56803
**Output:** 11361

**Constraints:**

*   `1 <= arr.length <= 104`
*   `1 <= arr[i], target <= 105`

## Code 

### Binary search

這題一看到的直覺就是 binary search，因為看到題目要求使 Sum「最接近」 target 的 **minimum Interger**。注意上下界分別設為 0 & `arr`中最大的元素，為何下界並非 `arr`中最小的元素呢？因為題目限制是當 `arr` 中元素大於該 interger 時，就會使用該 interger 的值來加總，因此該 interger 超過 `arr` 中最大的元素並沒有意義（都只是將 `arr` 加總而已），且不符合要尋找 minimum interger 的方向。但是小於`arr` 中最小元素就有其意義，因為當 target 較小時，就會需要一個比 `arr` 中最小的元素，使得 `sum` 會是此較小的值的幾倍數（因為當 `arr` 中元素大於此值，加總就都會是使用此值）。

至於為何 binary search 完後，解一定會是 `l` or `l-1` 呢？而非 `l+1` 呢？

因為我們的判斷式是 
```cpp
if(sum > target) r = mid;
else if(sum == target) return mid;
else l = mid + 1;
```

因為 `l = mid + 1`，因此有可能 `mid` 才是最佳解，只是因為 `sum < target`所以我們就將之 `+1`，得到新的 `mid`。雖然說用新的 `mid` 算出來的 `sum` 有可能跟舊的一樣好，但題目要求的是 minimum interger，因此必須考慮 `l - 1`。

```cpp
class Solution {
public:
    int findBestValue(vector<int>& arr, int target) {
        sort(arr.begin(), arr.end());
        int l = 0 , r = arr[arr.size() - 1]; // key
        while(l < r) {
            int mid = l + (r - l) / 2;
            int sum = 0;
            for(int i = 0; i < arr.size(); i++) {
                if(arr[i] <= mid) sum += arr[i];
                else sum += mid;
            }

            if(sum > target) r = mid;
            else if(sum == target) return mid;
            else l = mid + 1;
        }

        // the solution is either l or l - 1;
        // but why?
        int s1 = 0, s2 = 0;
        for(int i = 0; i < arr.size(); i++) {
            if(arr[i] <= l) s1 += arr[i];
            else s1 += l;
        }

        for(int i = 0; i < arr.size(); i++) {
            if(arr[i] <= l - 1) s2 += arr[i];
            else s2 += l - 1;
        }
        
        if(abs(s1-target) < abs(s2-target)) return l;
        
        return l-1;

    }
};
```

### Sort & Scan

- 當 target 很小時，最佳解就是 `target / len(arr)`。
- 當 target 很大時，最佳解就是 `arr[n-1]`，因為比 `arr[n-1]` 大的數字不會改變 `sum`。
- 剩下的 case 就是當最佳解落在中間（不一定是 `arr` 中的數字），但是這個 case 可以 reduce 成 case 1，及當 target 很小時。我們只需要先 sort 然後由小到大開始檢查，一個個扣掉 `arr[i]` 直到其右邊部分的 `arr` 滿足 case 1。

```cpp
class Solution {
public:
    int findBestValue(vector<int>& arr, int target) {
        sort(arr.begin(), arr.end());
        int i = 0, n = arr.size();
        while(i < n && target > arr[i] * (n - i)) {
            target -= arr[i];
            i++;
        }
        return i == n ? arr[n-1] : round((target - 0.0001) / (n - i));

    }
};
```

* (target - 0.0001) is done to consider the case where both lower ceiling and higher ceiling int is equally away from the target.

    Example: arr = [4,9,3], target = 10
    [3,3,3] sum 9 or [4,4,3] sum 11 are both 1 distance away from target 10.
    The exact answer is 3.5. But we need an int. Both int 3 or 4 works in the case but we need minimum number as the answer which is 3.
    So (target - 0.00001) is done to give the inclination to lower ceiling int (3 in the case) when using both higher and lower ceiling int can give the answer.
    In this case, target is 7 and len(arr) = 2 once we get out of the loop (try it) and 7 - 0.0001 =  6.9999 which then divided by 2 gives 3.49995. round(3.49995) is 3, our and.
    You can subtract any small fraction from target, doesn't necessarily have to b


## Source
- [Sum of Mutated Array Closest to Target - LeetCode](https://leetcode.com/problems/sum-of-mutated-array-closest-to-target/description/)