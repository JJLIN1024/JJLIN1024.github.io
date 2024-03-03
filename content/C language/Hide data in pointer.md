---
title: Hide data in pointer
date: 2023-05-01
lastmod: 2023-05-01
author: Jimmy Lin
tags: ["pointer"]
draft: false
---

`int pointer` 依照記憶體對齊的特性，一定會排在記憶體位置可被 4 整除的位置上（binary 最後兩位為 0)，所以可以在最後兩位儲存不大於 4 的資料。

```c
#include <stdio.h>
#include <assert.h>

int main() {
    assert(sizeof(int) == 4);    
    int x = 701;
    int x2 = 702;
    int x3 = 123;
    int *p = &x;
    int *p3 = &x3;
    int *p2 = &x2;

    printf("pointer 1: %p \n", p);
    printf("pointer 2: %p \n", p2);
    printf("pointer 3: %p \n", p3);
    // pointer 1: 0x16cfcaf5c 
    // pointer 2: 0x16cfcaf58 
    // pointer 3: 0x16cfcaf54 
    // c, 8, 4(hexidecimal) in binary all ends with at least two 0.
}

```


```c
#include <assert.h>
#include <stdio.h>

void put_data(int* ptr, unsigned int data) {
  assert(data < 4);
  *ptr |= data;
}

unsigned int get_data(int* ptr) {
  return (*ptr & 3);
}

void cleanse_pointer(int* ptr) {
  *ptr &= ~3;
}

int main() {
  int x = 701;
  int* x_addr = &x;

  printf("x's address: %p\n", x_addr);

  put_data(&x_addr, 3);
  printf("x's address after putting data in: %p\n", x_addr);

  printf("data stored in x's address: %d\n", get_data(&x_addr));

  cleanse_pointer(&x_addr);

  printf("Cleansed ptr: %p\n", x_addr);
  printf("Dereferencing cleansed ptr: %d\n", *x_addr);

  return 0;
}

/*
x's address: 0x16ba9b0e8
x's address after putting data in: 0x16ba9b0eb
data stored in x's address: 3
Cleansed ptr: 0x16ba9b0e8
Dereferencing cleansed ptr: 701
*/
```


- [linux rbtree_types.h](https://sbexr.rabexc.org/latest/sources/1f/5e3d2e6996c394.html)
```c
struct rb_node {
	unsigned long  __rb_parent_color;
	struct rb_node *rb_right;
	struct rb_node *rb_left;
} __attribute__((aligned(sizeof(long))));
/* The alignment might seem pointless, but allegedly CRIS needs it */

struct rb_root {
	struct rb_node *rb_node;
};
```

`__rb_parent_color` stores the parent's address.

- [linux rbtree.h](https://github.com/torvalds/linux/blob/master/include/linux/rbtree.h)
```
#define rb_parent(r)   ((struct rb_node *)((r)->__rb_parent_color & ~3))
```

技巧同上述的 `cleanse_pointer`，先將顏色去除，就可得到真正的 address。


## Reference
- [Hide data inside pointers](https://arjunsreedharan.org/post/105266490272/hide-data-inside-pointers)
