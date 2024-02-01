---
title: calloc v.s. malloc
date: 2023-05-20
lastmod: 2023-05-20
author: Jimmy Lin
tags: ["memory allocation", "heap"]
draft: false
---

1. calloc 知道哪些 page 已經被 zero-out 過，因此不需要執行 `memset`，但是 malloc 不知道，因此每一次的 memset 都會被執行，造成約兩倍的執行速度。
2. calloc 使用 copy-on-write, 而 malloc + memset 每次都會需要真的去執行 write memory。當 request 來的 memory 不需要常常被寫入，或是只有少部分會需要被寫（例如：sparse matrix）時，calloc 的效能就會比 malloc + memset 好很多。可看底下結果，差異達到了無限多倍。

## zero-out && copy-on-write
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

const int LOOPS = 100;

float now() {
  struct timespec t;
  if (clock_gettime(CLOCK_MONOTONIC, &t) < 0) {
    perror("clock_gettime");
    exit(1);
  }
  return t.tv_sec + (t.tv_nsec / 1e9);
}

int main(int argc, char** argv) {
  float start = now();
  for (int i = 0; i < LOOPS; ++i) {
    free(calloc(1, 1 << 30));
  }
  float stop = now();
  printf("calloc+free 1 GiB: %0.2f ms\n", (stop - start) / LOOPS * 1000);

  start = now();
  for (int i = 0; i < LOOPS; ++i) {
    void* buf = malloc(1 << 30);
    memset(buf, 0, 1 << 30);
    free(buf);
  }
  stop = now();
  printf("malloc+memset+free 1 GiB: %0.2f ms\n", (stop - start) / LOOPS * 1000);
}
```

```sh
➜  c_playground gcc mem_benchmark.c -o mem.out && ./mem.out
calloc+free 1 GiB: 0.00 ms
malloc+memset+free 1 GiB: 91.25 ms
```


> So that's the first way that calloc cheats: when you call malloc to allocate a large buffer, then _probably_ the memory will come from the operating system and already be zeroed, so there's no need to call memset


3. calloc 會幫 programmer 做 request memory size 的檢查，malloc 不會（有可能 overflow）。

## Size check
```c
#include <errno.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) {
  size_t huge = INTPTR_MAX;

  void* buf = malloc(huge * huge);
  if (!buf)
    perror("malloc failed");
  printf("malloc(huge * huge) returned: %p\n", buf);
  free(buf);

  buf = calloc(huge, huge);
  if (!buf)
    perror("calloc failed");
  printf("calloc(huge, huge) returned: %p\n", buf);
  free(buf);
}
```

> So basically, `calloc` exists because it lets the memory allocator and kernel engage in a sneaky conspiracy to make your code faster and use less memory. You should let it! Don't use `malloc`+`memset`!




## Reference
- [Why does calloc exist?](https://vorpus.org/blog/why-does-calloc-exist/)