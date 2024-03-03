---
title: ELF(Executable Linkable Format)
date: 2023-01-31
lastmod: 2023-01-31
author: Jimmy Lin
tags: ["OS"]
draft: false
---

![](https://i.imgur.com/QVi0DMV.png)

以 [[notes/C/預處理、編譯、彙編、連接]] 中的 `test.c`為例：

```sh
parallels@ubuntu-linux-20-04-desktop:~/C_playground$ file test.c
test.c: C source, ASCII text
parallels@ubuntu-linux-20-04-desktop:~/C_playground$ file test.i
test.i: C source, ASCII text
parallels@ubuntu-linux-20-04-desktop:~/C_playground$ file test.s
test.s: assembler source, ASCII text
parallels@ubuntu-linux-20-04-desktop:~/C_playground$ file test.o
test.o: ELF 64-bit LSB relocatable, ARM aarch64, version 1 (SYSV), not stripped
parallels@ubuntu-linux-20-04-desktop:~/C_playground$ file /bin/bash
/bin/bash: ELF 64-bit LSB shared object, ARM aarch64, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux-aarch64.so.1, BuildID[sha1]=19c1f2a28c01699ce7b04b4767027253c7316908, for GNU/Linux 3.7.0, stripped
```


![](https://i.imgur.com/5oULSpN.png)


```c
/* 
simpleSection.c
gcc -c simpleSection.c 
*/

int printf(const char *format, ...);

int global_var = 84;
int global_uninit_var;

void func1(int i)
{
    printf("%d\n", i);
}

int main(void)
{
    static int static_var = 85;
    static int static_var2;
    int a = 1;
    int b;

    func1(static_var + static_var2 + a + b);

    return a;
}

```

Run: `gcc -c test.c -o test.o` and `objdump -h test.o`

可以注意到 `.bss` 中沒有 `CONTENTS`，代表在實際的 ELF file 中這一段是不存在的。

```sh
test.o:     file format elf64-littleaarch64

Sections:
Idx Name          Size      VMA               LMA               File off  Algn
  0 .text         00000074  0000000000000000  0000000000000000  00000040  2**2
                  CONTENTS, ALLOC, LOAD, RELOC, READONLY, CODE
  1 .data         00000008  0000000000000000  0000000000000000  000000b4  2**2
                  CONTENTS, ALLOC, LOAD, DATA
  2 .bss          00000004  0000000000000000  0000000000000000  000000bc  2**2
                  ALLOC
  3 .rodata       00000004  0000000000000000  0000000000000000  000000c0  2**3
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  4 .comment      0000002c  0000000000000000  0000000000000000  000000c4  2**0
                  CONTENTS, READONLY
  5 .note.GNU-stack 00000000  0000000000000000  0000000000000000  000000f0  2**0
                  CONTENTS, READONLY
  6 .eh_frame     00000058  0000000000000000  0000000000000000  000000f0  2**3
                  CONTENTS, ALLOC, LOAD, RELOC, READONLY, DATA
```