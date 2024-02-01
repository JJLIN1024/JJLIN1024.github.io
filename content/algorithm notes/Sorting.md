---
title: Sorting
date: 2022-12-14
author: Jimmy Lin
tags: [""]
draft: false
---

## Randomize Quicksort note from CLRS
### Randomize Quick sort average case run time analysis
* Assume that all **input permutation** are equally likely.
![](https://i.imgur.com/qHBmgnF.png)
![](https://i.imgur.com/YOYduL6.png)
![](https://i.imgur.com/izXYSxs.png)
* 數學證明
![](https://i.imgur.com/jyPsORr.png)
![](https://i.imgur.com/ocWniCf.png)
![](https://i.imgur.com/QUX7COF.png)

### Randomize quick sort "worst" run time analysis
![](https://i.imgur.com/E5hSzJ1.png)
![](https://i.imgur.com/Aa31Cn2.png)
![](https://i.imgur.com/0IobRym.png)
* best case 
![](https://i.imgur.com/2Sdaoo4.png)
![](https://i.imgur.com/Ze4J2qC.png)

### Randomize quick sort "expected" run time analysis
* key point: 相較於average case分析中，假設任何input permutation出現的機率是相同的，在這裡我們直接對input進行permutation（我們來選擇pivot, randomly）
* key point：partition只會被call n次，而每一對element都只會互相比較1次
![](https://i.imgur.com/eZBsiQa.png)
* O(n + 全部partition過程中比較的次數)
![](https://i.imgur.com/qtEtTGk.png)
![](https://i.imgur.com/sUe5iNP.png)
![](https://i.imgur.com/OQ44q8v.png)
![](https://i.imgur.com/z5NUq2q.png)

## Order Statistics


### Selection in Expected Linear Time

### Selection in Worst-case Linear Time

Selection in Worst-case Linear Time can ensure QuickSort runs in worst-case nlgn

![](https://i.imgur.com/qGQwfB4.png)
> 上圖中灰色區域 node 數量至少為：$3(\lceil\frac{1}{2}\lceil\frac{n}{5} \rceil\rceil - 2)$，減掉的 2 分別為自己和有可能多出來的那一組（圖中 x 那組，以及最右邊只有2 個node的那一組）。

![](https://i.imgur.com/UNH2F9D.png)

如果今天不是切成五個五個一組，而是三個三個的話，同樣的灰色區域 node 數量會大於等於 $2(\lceil\frac{1}{2}\lceil\frac{n}{3} \rceil\rceil - 2) \ge \frac{n}{3} - 4$，非灰色區域的數量就會是 $\frac{n}{3} + 4$，所以遞迴式子會是：$T(n) = T(\lceil\frac{n}{3}\rceil) + T(\frac{2n}{3}) + O(n) \Rightarrow T(n) = O(n \lg n)$


## Average vs Expected complexity
### Average - 只有特定input
The __average-case__ running time  ==not  guarantee== for the worst- case
>i.e. it only applies to a specific input distribution

- the probability is taken over the random choices over an __input distribution.__
### Expected - 所有input
The __expected__ running time  ==guarantee== (in expectation) for ++every input++.
- probability is taken over the random choices made by __the algorithm.__

![](https://i.imgur.com/YXRDrz2.png)

## MIT QUIZ

###### tags: `select`,`partition`
![](https://i.imgur.com/D4VDcpn.png)
![](https://i.imgur.com/ZRo3AGF.png)

![](https://i.imgur.com/3uRpJ36.png)

## Sort multiset 
###### tags: `multiset`
![](https://i.imgur.com/Ny8Cppd.png)

:::success
# Merge Sort
:::
## [Counting Inversion](https://people.cs.umass.edu/~sheldon/teaching/mhc/cs312/2013sp/Slides/Slides13%20-%20Counting%20Inversions.pdf)

## Very Similar Process of Merge Sort

![](https://i.imgur.com/rCyxWmX.png)
![](https://i.imgur.com/PAQE3Su.png)



## [Merge k sorted array each with $\frac{n}{k}$ elements](https://hackmd.io/s/BJFV17Tf4#Builind-Block-Merge-k-sorted-array-each-with-fracnk-elements)

## [c-Merge Sort](https://hackmd.io/s/BJFV17Tf4#c-Merge-Sort) : $T(n)=cT(\frac{n}{c})+O(n\log c)$==$O(n\log c*\log_cn)$== 
:::info
with the help of min-heap
:::


## Merge Sort + Insrtion Sort - $T(n)=n\log \frac{n}{k}+O(kn)$
$T(n)=2T(\frac{n}{2})+O(n),n > k$
$\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ O(nk)\ \ \ \ \ \ ,n \leq k$
### 當size很小的時候，用insertion sort會比較快
![](https://i.imgur.com/hraPNIc.png)
![](https://i.imgur.com/1GqWq0s.png)
![](https://i.imgur.com/j7C0qh2.png)
![](https://i.imgur.com/cayYtBv.png)
#### Similar Analysis
###### tags: `base case complexity`
![](https://i.imgur.com/rscdwI8.png)

![](https://i.imgur.com/zQcSuVD.png)

:::success
# Insertion Sort
:::
:::info
感覺如果數列具有某種程度上的整齊度，可以使用heap+insertion sort
:::

## For sorted data : ==$\Omega(n)$==
## Suitable for almost sorted data


### Example 1 
![](https://i.imgur.com/EGEPQcU.png)
Complexity analysis
>$\sum_{k=1}^{n-1} lglgk =$==$O$==$(nlglgn)=$==$o$==$(nlgn)$
#### [Improvement]Using Heap
好像不太行，因為距離（$lglgn$）並非固定的，Example 2 就是固定的。
### Example 2
Given an array of n elements, where each element is at most k away from its target position, devise an algorithm that sorts in __O(nlog k)__ time
>Insertion sort : ==$O(nk)$==
>Heap : Complexity = $O(k) + O((n-k)logk)=$==$O(nlogk)$==

 
### Which Permutation cause most inversion
### Insertion Sort Complexity - ==$O(n+I)$==
> $I$ : number of inversion
### Insertion Sort with $k$ from original position - ==$O(nk)$==

### Insertion Sort with $k$ from original position - ==$O(n\log k)$==

## ==Binary== Insertion Sort
>找的的確變快了，但是還是要一個個swap到那個位置。
with binary search ：$O(lgk)+O(k)$
without binary search : $O(k)+O(k)$

![](https://i.imgur.com/MeNrz0t.png)


## Pseudo-Time Compexity
![](https://i.imgur.com/ybkh0nG.png)
## If input is not intger

為啥不直接用 hashmap ->$\sqrt n \lg \sqrt n$
###### tags: `multi-set`
> Build a auxiliary array, and use that auxiliary array's location as coutning sort data
> 剛好這題的不同數字的數目很少

![](https://i.imgur.com/5Oz1ybK.png)
![](https://i.imgur.com/x32qCMc.png)
![](https://i.imgur.com/ftOBXYP.png)

:::success
# Radix Sort 
:::
## 已經限定是binary representation了，所以不能利用radix sort的優勢 => 更改base
![](https://i.imgur.com/bvKO4Zg.png)

## Max set for the same set
###### tags: `bit vector`
![](https://i.imgur.com/r6NT5Qj.png)
## Delete Duplicate
:::info
感覺消除duplicate時可以考慮用radix sort
:::
>此題結合物不少觀念
>1. 平移range
>2. 資料為tuple


![](https://i.imgur.com/GsHoVNr.png)

## [Sort n numbers in range from 0 to $n^2$ – 1 in linear time](https://www.geeksforgeeks.org/sort-n-numbers-range-0-n2-1-linear-time/)
#### ==在sorting的時候，不妨可以看看數字的range，不一定要直接用quicksort/merger/heap sort等等algorithm。使用radix sort說不定可以達到O(n)的速度。==


## ==When radix sort will run in linear? $n^d$ and $d$ is constant==
![](https://i.imgur.com/BFMtcds.png)

## Radix Sort - Closest Number
![](https://i.imgur.com/q1MZi2g.png)
## Radix Sort – All input orderings give the ==worst-case== running time
![](https://i.imgur.com/5HgW8rj.png)
## ==Radix Sort–tuple== 
###### tags: `tuple`

### Each different size
![](https://i.imgur.com/QkgiKQh.png)
### Each same size
![](https://i.imgur.com/ETO3PAh.png)

## Radix Sort – lexically less than
![](https://i.imgur.com/mJzDfYs.png)


:::success
# Sorting Under Different Scenario
:::
![](https://i.imgur.com/6gO6EFr.png)
## Scenario 1
![](https://i.imgur.com/dGHKfJa.png)
## Scenario 2
![](https://i.imgur.com/Dcaukur.png)
## Scenario 3
![](https://i.imgur.com/j2whUCk.png)
## Scenario 4
![](https://i.imgur.com/yddhhUQ.png)
## Randomized Quicksort / Bucket Sort
![](https://i.imgur.com/sZYTcrh.png)
## Randomized Select / Worst Case Linear Time Select
![](https://i.imgur.com/5zwjF02.png)

## Radix Sort vs Counting Sort
![](https://i.imgur.com/Nhdf0dR.png)

 番外篇
 ![](https://i.imgur.com/NAije9g.png)
