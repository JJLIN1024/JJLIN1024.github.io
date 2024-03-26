---
title: semaphore
date: 2024-03-26
lastmod: 2024-03-26
author:
  - Jimmy Lin
tags: 
draft: false
---

- [linux/semaphore.h](https://elixir.bootlin.com/linux/latest/source/include/linux/semaphore.h)
- [Linux 核心設計: 淺談同步機制](https://hackmd.io/@owlfox/SyVVY3EgI/https%3A%2F%2Fhackmd.io%2Fs%2FSJpp-bN0m#semaphore)


```c
/* Please don't access any members of this structure directly */
struct semaphore {
	raw_spinlock_t		lock;
	unsigned int		count;
	struct list_head	wait_list;
};

#define __SEMAPHORE_INITIALIZER(name, n)				\
{									\
	.lock		= __RAW_SPIN_LOCK_UNLOCKED((name).lock),	\
	.count		= n,						\
	.wait_list	= LIST_HEAD_INIT((name).wait_list),		\
}

/*
 * Unlike mutexes, binary semaphores do not have an owner, so up() can
 * be called in a different thread from the one which called down().
 * It is also safe to call down_trylock() and up() from interrupt
 * context.
 */
#define DEFINE_SEMAPHORE(_name, _n)	\
	struct semaphore _name = __SEMAPHORE_INITIALIZER(_name, _n)

```
