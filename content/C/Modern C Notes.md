---
title: Modern C Notes
date: 2023-12-19
lastmod: 2023-12-19
author:
  - Jimmy Lin
tags: 
draft: false
---

-  0 代表 logical false，其他值不等於 0 的 值都代表 logical true。
	- All scalar type (`size_t, bool, int, pointer,...`) has a truth value
- The type [size_t](https://en.cppreference.com/w/c/types/size_t) represents values in the range `[0, SIZE_MAX]`. `size_t` is the **unsigned integer type** of the result of sizeof ,` _Alignof(since C11)` and `offsetof`, depending on the data model
- [ptrdiff_t](https://en.cppreference.com/w/c/types/ptrdiff_t) is the **signed integer type** of the result of subtracting two pointers, it is used for pointer arithmetic and array indexing, if negative values are possible. Programs that use other types, such as int, may fail on, e.g. 64-bit systems when the index exceeds INT_MAX or if it relies on 32-bit modular arithmetic.
	- Use `ptrdiff_t` for large differences that bear a sign
- The comma (,) evaluates its operands in order, and the result is the value of the right operand. For example, (f(a), f(b)) first evaluates f(a) and then f(b); the result is the value of f(b)
- Function calls and most operators evaluate their operands in a nonspecific order. Only `&&`, `||`, and `?:` impose an ordering on the evaluation of their operands
	- 在 `printf ("%g  and %g\n", f(a), f(b));` 中，`f(a), f(b)` 誰會先被 evaluate 是不確定的
- 



## Reference
- [Modern C](https://gustedt.gitlabpages.inria.fr/modern-c/)