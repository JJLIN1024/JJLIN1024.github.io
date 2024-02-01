---
title: Stack
date: 2023-05-20
lastmod: 2023-05-20
author: Jimmy Lin
tags: ["stack"]
draft: false
---


```c
#include <stdio.h>
int funcB(int a) {
    return a + 1;
}

int funcA(int b) {
    return funcB(b);
}
int main(int argc, char* argv[]) {
    int a = funcA(1);
    return 0;
}
```
> Test program for call stack

gdb tracing.

```sh
(gdb) disas main
Dump of assembler code for function main:
   0x0000000000400578 <+0>:     stp     x29, x30, [sp, #-48]!
   0x000000000040057c <+4>:     mov     x29, sp
   0x0000000000400580 <+8>:     str     w0, [sp, #28]
   0x0000000000400584 <+12>:    str     x1, [sp, #16]
   0x0000000000400588 <+16>:    mov     w0, #0x1                        // #1
   0x000000000040058c <+20>:    bl      0x40055c <funcA>
   0x0000000000400590 <+24>:    str     w0, [sp, #44]
   0x0000000000400594 <+28>:    mov     w0, #0x0                        // #0
   0x0000000000400598 <+32>:    ldp     x29, x30, [sp], #48
   0x000000000040059c <+36>:    ret
End of assembler dump.
(gdb) disas funcA
Dump of assembler code for function funcA:
   0x000000000040055c <+0>:     stp     x29, x30, [sp, #-32]!
   0x0000000000400560 <+4>:     mov     x29, sp
   0x0000000000400564 <+8>:     str     w0, [sp, #28]
   0x0000000000400568 <+12>:    ldr     w0, [sp, #28]
   0x000000000040056c <+16>:    bl      0x400544 <funcB>
   0x0000000000400570 <+20>:    ldp     x29, x30, [sp], #32
   0x0000000000400574 <+24>:    ret
End of assembler dump.
(gdb) disas funcB
Dump of assembler code for function funcB:
   0x0000000000400544 <+0>:     sub     sp, sp, #0x10
   0x0000000000400548 <+4>:     str     w0, [sp, #12]
   0x000000000040054c <+8>:     ldr     w0, [sp, #12]
   0x0000000000400550 <+12>:    add     w0, w0, #0x1
   0x0000000000400554 <+16>:    add     sp, sp, #0x10
   0x0000000000400558 <+20>:    ret
End of assembler dump.
```

```shell
Breakpoint 1, main (argc=1, argv=0xffffffffefd8) at test.c:12
12          int a = funcA(1);
(gdb) si
0x000000000040058c      12          int a = funcA(1);
(gdb) p $sp
$4 = (void *) 0xffffffffee50
(gdb) si
funcA (b=65535) at test.c:8
8       int funcA(int b) {
(gdb) p $sp
$5 = (void *) 0xffffffffee50
(gdb) si
0x0000000000400560      8       int funcA(int b) {
(gdb) p $sp
$6 = (void *) 0xffffffffee30
(gdb) si
0x0000000000400564      8       int funcA(int b) {
(gdb) p $sp
$7 = (void *) 0xffffffffee30
(gdb) si
9           return funcB(b);
(gdb) p $sp
$8 = (void *) 0xffffffffee30
(gdb) si
0x000000000040056c      9           return funcB(b);
(gdb) p $sp
$9 = (void *) 0xffffffffee30
(gdb) si
funcB (a=65535) at test.c:4
4       int funcB(int a) {
(gdb) p $sp
$10 = (void *) 0xffffffffee30
(gdb) si
0x0000000000400548      4       int funcB(int a) {
(gdb) p $sp
$11 = (void *) 0xffffffffee20
(gdb) si
5           return a + 1;
(gdb) p $sp
$12 = (void *) 0xffffffffee20
(gdb) si
0x0000000000400550      5           return a + 1;
(gdb) p $sp
$13 = (void *) 0xffffffffee20
(gdb) si
6       }
(gdb) p $sp
$14 = (void *) 0xffffffffee20
(gdb) si
0x0000000000400558      6       }
(gdb) p $sp
$15 = (void *) 0xffffffffee30
(gdb) si
funcA (b=1) at test.c:10
10      }
(gdb) p $sp
$16 = (void *) 0xffffffffee30
(gdb) si
0x0000000000400574      10      }
(gdb) p $sp
$17 = (void *) 0xffffffffee50
(gdb) si
0x0000000000400590 in main (argc=1, argv=0xffffffffefd8) at test.c:12
12          int a = funcA(1);
(gdb) p $sp
$18 = (void *) 0xffffffffee50
```

## Reference
- [Journey to the Stack, Part I](https://manybutfinite.com/post/journey-to-the-stack/)
- [Epilogues, Canaries, and Buffer Overflows](https://manybutfinite.com/post/epilogues-canaries-buffer-overflows/)
- [Anatomy of a Program in Memory](https://manybutfinite.com/post/anatomy-of-a-program-in-memory/)