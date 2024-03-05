---

title: Queue Problem

date: 2023-10-26

lastmod: 2023-10-26

author:

- Jimmy Lin

tags:

draft: false

---

In general, the following "prototype" problems can be solved by monotonic queue:

Any DP problem where `A[i] = min(A[j:k]) + C` where `j < k <= i`

or any time we want to find **running max(or min)**.

For example, with sliding window of fixed length 3,

> `A = [3, 1, 4, 3, 8] => monotonic queue is like [3], [3, 1], [4], [4, 3], [8]`

> when element `4` enters, we remove `[3, 1]` because they are on the left and smaller than `4`, no chance being chosen as the max element.


The head of the increasing queue is the **running max**!

- [[Implement Queue using Stacks|Implement Queue using Stacks]]
- [[Sliding Window Maximum]]
- [[Shortest Subarray with Sum at Least K|Shortest Subarray with Sum at Least K]]
- [[Constrained Subsequence Sum|Constrained Subsequence Sum]]
- [[Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit|Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit]]
- [[Continuous Subarrays|Continuous Subarrays]]
- [[Count Subarrays With Fixed Bounds|Count Subarrays With Fixed Bounds]]