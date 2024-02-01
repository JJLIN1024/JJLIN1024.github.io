---
title: House Robber III
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-02
sr-interval: 4
sr-ease: 270
---
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called `root`.

Besides the `root`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.

Given the `root` of the binary tree, return _the maximum amount of money the thief can rob **without alerting the police**_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/10/rob1-tree.jpg)

**Input:** root = [3,2,3,null,3,null,1]
**Output:** 7
**Explanation:** Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/10/rob2-tree.jpg)

**Input:** root = [3,4,5,1,3,null,1]
**Output:** 9
**Explanation:** Maximum amount of money the thief can rob = 4 + 5 = 9.

**Constraints:**

- The number of nodes in the tree is in the range `[1, 104]`.
- `0 <= Node.val <= 104`
## Code

Time Limit Exceed 版本，如果自己不選，就是取左右子節點的合，若有選自己，左右子節點就不能選，因此是自己的 value 再加上四個孫子節點的值。

```cpp
class Solution {
public:
    int rob(TreeNode* root) {
        if(!root) return 0;
        int sum = root->val;
        if(root->left) sum += (rob(root->left->right) + rob(root->left->left));
        if(root->right) sum += (rob(root->right->left) + rob(root->right->right));
        return max(sum, rob(root->left) + rob(root->right));
    }
};
```

加上 memoization，還是 Time Limit Exceed：

```cpp
class Solution {
public:
    int rob(TreeNode* root) {
        unordered_map<TreeNode*, int> money;
        return robSub(root, money);
    }
    int robSub(TreeNode* node, unordered_map<TreeNode*, int>& money) {
        if(!node) return 0;
        if (money.find(node) != money.end()) return money[node];
        
        int sum = node->val;
        if(node->left) sum += (rob(node->left->right) + rob(node->left->left));
        if(node->right) sum += (rob(node->right->left) + rob(node->right->right));
        int currSum = max(sum, rob(node->left) + rob(node->right));
        money[node] = currSum;
        return currSum;
    }
};
```

上面會 Time Limit Exceed 的原因是重複計算的 subproblem 太多（就算有用 memoization），因為對於每個 node 而言，必須 access hashMap 6 次，而會有這個情況的原因是因為我們沒有區分 return 回來的值是否有選擇當前這個 node。而下面這個寫法就是針對這點去做改進，用一個 vector 來記錄每個 node 的狀況，index 0 的值代表有包括當前的 node 的 maximum sum，index 0 則是不選擇當前的 node 的 maximum sum。
> 其實一開始有想到要區分，但是是嘗試用兩個不同的 `robSub` 去做到區分，沒有想到用 return  一個 size 為 2 的 vector 去做區分。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int rob(TreeNode* root) {
        auto money = robSub(root);
        return max(money[0], money[1]);
    }
    vector<int> robSub(TreeNode* node) {
        if(!node) return {0, 0};
        vector<int> moneySum(2);
        vector<int> left = robSub(node->left);
        vector<int> right = robSub(node->right);
        moneySum[0] = node->val + left[1] + right[1];
        moneySum[1] = max(left[0], left[1]) + max(right[0], right[1]);
        return moneySum;
    }
};
```

## Link
- [House Robber III](https://leetcode.com/problems/house-robber-iii/description/)
