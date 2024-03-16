---
title: Quick Sort
date: 2024-03-16
lastmod: 2024-03-16
author:
  - Jimmy Lin
tags:
  - Algorithm
draft: false
---

```cpp
#include <vector>
#include <iostream>

using namespace std;

int partition(int l, int r, vector<int>& nums) {
    int pivot = nums[r];
    int j = l - 1;
    for(int i = l; i < r; i++) {
        if(nums[i] < pivot) {
            j++;
            swap(nums[j], nums[i]);
        }
    }
    j++;
    swap(nums[j], nums[r]);
    return j;
}

void quick_sort(int l, int r, vector<int>& nums) {
    if(l >= r) return;
    int k = partition(l, r, nums);
    quick_sort(l, k - 1, nums);
    quick_sort(k + 1, r, nums);
}


int main() {
    vector<int> nums = {1, 4, 2, -1};
    int n = nums.size();
    quick_sort(0, n - 1, nums);

    for(auto n: nums) {
        cout << n << " ";
    }
    cout << endl;
}



```