---
title: Heap
date: 2023-05-20
lastmod: 2023-05-20
author: Jimmy Lin
tags: ["heap", "memory allocation"]
draft: false
---

- [[notes/C/calloc v.s. malloc]]

> free() 釋放的是 pointer 指向位於 heap 的連續記憶體，而非 pointer 本身佔有的記憶體 (*ptr)。 pointer 本身儲存在 stack 上，因此對其做 free() 會造成 error。

`free(NULL)` is essentially no-operation. If `p = NULL;` is missing, then the second `free(p)` will cause runtime error: `malloc: double free for ptr 0x130008800`

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) {
  int* p = malloc(1024);
  free(p);
  p = NULL;
  free(p); /* error: malloc: double free for ptr 0x130008800 */
  return 0;
}
```
> the pointer is allocated on the stack but the object that pointer points to is allocated on the heap.

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) {
  int* p = malloc(1024);
  free(p);
  int a = 3;
  p = &a;
  free(p); /*error*/
  return 0;
}
```
> error: malloc: *** error for object 0x16d89b0a4: pointer being freed was not allocated

## Reference

- [你所不知道的 C 語言：函式呼叫篇](https://hackmd.io/@sysprog/c-function#%E4%BD%A0%E6%89%80%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84-C-%E8%AA%9E%E8%A8%80%EF%BC%9A%E5%87%BD%E5%BC%8F%E5%91%BC%E5%8F%AB%E7%AF%87)
- [Does free(ptr) where ptr is NULL corrupt memory?](https://stackoverflow.com/questions/1938735/does-freeptr-where-ptr-is-null-corrupt-memory)
- 