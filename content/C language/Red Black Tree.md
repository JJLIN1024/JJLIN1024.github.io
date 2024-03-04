---
title: Red Black Tree
date: 2024-03-02
lastmod: 2024-03-02
author:
  - Jimmy Lin
tags:
  - binary_tree
  - balanced_binary_tree
  - linux_kernel
draft: false
---

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

- [[Hide data in pointer]]
## Reference
- [Trees II: red-black trees](https://lwn.net/Articles/184495/)
- [Linux 紅黑樹探討](https://hackmd.io/@steven1lung/linux-rbt)
- [linux/rbtree_types.h](https://elixir.bootlin.com/linux/latest/source/include/linux/rbtree_types.h)
- [linxu/compiler.h](https://elixir.bootlin.com/linux/latest/source/tools/include/linux/compiler.h#L192)
- [linux/rbtree.h](https://elixir.bootlin.com/linux/latest/source/include/linux/rbtree.h)
- [linux/rbtree.c](https://elixir.bootlin.com/linux/v6.7.8/source/lib/rbtree.c)
- [linux/rbtree_augmented.h](https://elixir.bootlin.com/linux/v6.7.8/source/include/linux/rbtree_augmented.h)
  