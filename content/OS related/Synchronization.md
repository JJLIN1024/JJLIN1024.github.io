---
title: Synchronization
date: 2023-12-27
lastmod: 2023-12-27
author:
  - Jimmy Lin
tags: 
draft: false
---
 - Solution to Critical-Section Problem
	 - Mutual exclusion
	 - Progress
	 - Bound waiting
- Mutex V.S. Semaphore
	- trace the code
	- mutex
		- Linux kenrel 中的 mutex lock, <include/mutex.h>
	- semaphore
		- Linux kernel 中的 semaphore, <include/semaphore.h>
	- 30秒：最大的差異在於 Mutex 只能由上鎖的 thread 解鎖，而 Semaphore 沒有這個限制，可以由原本的 thread 或是另外一個 thread 解開。另外，Mutex 只能讓一個 thread 進入 critical section，Semaphore 的話則可以設定要讓幾個 thread 進入。這讓實際上使用 Mutex 跟 Semaphore 場景有很大的差別。
	- 60秒 (cont.)：舉例而言，Mutex 的兩個特性：一個是只能有持鎖人解鎖、一個是在釋放鎖之前不能退出的特性，讓 Mutex 叫常使用在 critical section 只能有一個 thread 進入，而且要避免 priority inversion 的時候；Semaphore 也能透過 binary semaphore 做到類似的事情，卻沒有辦法避免 priority inversion 出現。
	- 120秒 (cont.)：而 Semaphore 更常是用在同步兩個 thread 或功能上面，因為 Semaphore 實際上使用的是 signal 的 up 與 down，讓 Semaphore 可以變成是一種 notification 的作用，例如 A thread 執行到某個地方時 B thread 才能繼續下去，就可以使用  Semaphore 來達成這樣的作用。
- Spinlock
	- 和 mutex 不同的是會持續 spinning(blocking)，而 mutex 是 non-blocking
- Moniters
- class problems
	- Producer and Consumer problem
	- reader and writer problem
	- Philosophers Problem
	- Sleeping Barber Problem
- Peterson's solution — software solution

## Reference
- [Mutex, Semaphore, the difference, and Linux kernel](https://blog.louie.lu/2016/10/22/mutex-semaphore-the-difference-and-linux-kernel/)