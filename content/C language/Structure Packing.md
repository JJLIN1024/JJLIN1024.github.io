---
title: Structure Packing
date: 2023-05-01
lastmod: 2023-05-01
author: Jimmy Lin
tags: [""]
draft: false
---

- alignment is the reason why we can [[notes/C/Hide data in pointer]]
- In general, a struct instance will have the alignment of its widest scalar member.
```c
// assume 64-bit machine
struct foo1{
	char *p; // 8 bytes
	char c; // 1 bytes
	long x; // 8 bytes
}

// struct foo1{
	  char *p; // 8 bytes
	  char c; // 1 bytes
	  char pad[7]; // 7 bytes
	  long x; // 8 bytes
// }
```

- In C, there is no leading padding, but do has trailing padding
```c
// assume 64-bit machine
struct foo1{
	char *p; // 8 bytes
	char c; // 1 bytes
}

// struct foo1{
	  char *p; // 8 bytes
	  char c; // 1 bytes
	  char pad[7]; // 7 bytes
// }
```
- Inner struct padding
```c
struct foo5 {
    char c;
    struct foo5_inner {
        char *p;
        short x;
    } inner;
};

struct foo5 {
    char c;           /* 1 byte*/
    char pad1[7];     /* 7 bytes */
    struct foo5_inner {
        char *p;      /* 8 bytes */
        short x;      /* 2 bytes */
        char pad2[6]; /* 6 bytes */
    } inner;
};
```

- Save space via reorder
```c
#include <stdio.h>

typedef struct _foo{
    char x;
    struct _foo *p;
    short X;
} foo; 

typedef struct _foo2{
    struct _foo2 *p;
    short X;
    char x;
} foo2; 

int main() {
    foo myfoo;
    foo2 myfoo2;
    printf("%ld \n", sizeof(myfoo)); // 24
    printf("%ld \n", sizeof(myfoo2)); // 16
}

```

- 除了 reorder 讓 size 變小之外，還必須考慮 multithreading, 
cache-line bouncing，以及 code readability，所以不一定是 size 越小越好。

- Full Code

```c
#include <stdio.h>
#include <stdbool.h>
#include <stddef.h>

/* The expected sizes in these comments assime a 64-bit machine */

struct foo1 {
    char *p;
    char c;
    long x;
};

struct foo2 {
    char c;      /* 1 byte */
    char pad[7]; /* 7 bytes */
    char *p;     /* 8 bytes */
    long x;      /* 8 bytes */
};

struct foo3 {
    char *p;     /* 8 bytes */
    char c;      /* 1 byte */
};

struct foo4 {
    short s;     /* 2 bytes */
    char c;      /* 1 byte */
};

struct foo5 {
    char c;
    struct foo5_inner {
        char *p;
        short x;
    } inner;
};

struct foo6 {
    short s;
    char c;
    int flip:1;
    int nybble:4;
    int septet:7;
};

struct foo7 {
    int bigfield:31;
    int littlefield:1;
};

struct foo8 {
    int bigfield1:31;
    int littlefield1:1;
    int bigfield2:31;
    int littlefield2:1;
};

struct foo9 {
    int bigfield1:31;
    int bigfield2:31;
    int littlefield1:1;
    int littlefield2:1;
};

struct foo10 {
    char c;
    struct foo10 *p;
    short x;
};

struct foo11 {
    struct foo11 *p;
    short x;
    char c;
};

struct foo12 {
    struct foo12_inner {
        char *p;
        short x;
    } inner;
    char c;
};

int main(int argc, char *argv[])
{
    printf("sizeof(char *)        = %zu\n", sizeof(char *));
    printf("sizeof(long)          = %zu\n", sizeof(long));
    printf("sizeof(int)           = %zu\n", sizeof(int));
    printf("sizeof(short)         = %zu\n", sizeof(short));
    printf("sizeof(char)          = %zu\n", sizeof(char));
    printf("sizeof(float)         = %zu\n", sizeof(float));
    printf("sizeof(double)        = %zu\n", sizeof(double));
    printf("sizeof(struct foo1)   = %zu\n", sizeof(struct foo1));
    printf("sizeof(struct foo2)   = %zu\n", sizeof(struct foo2));
    printf("sizeof(struct foo3)   = %zu\n", sizeof(struct foo3));
    printf("sizeof(struct foo4)   = %zu\n", sizeof(struct foo4));
    printf("sizeof(struct foo5)   = %zu\n", sizeof(struct foo5));
    printf("sizeof(struct foo6)   = %zu\n", sizeof(struct foo6));
    printf("sizeof(struct foo7)   = %zu\n", sizeof(struct foo7));
    printf("sizeof(struct foo8)   = %zu\n", sizeof(struct foo8));
    printf("sizeof(struct foo9)   = %zu\n", sizeof(struct foo9));
    printf("sizeof(struct foo10)   = %zu\n", sizeof(struct foo10));
    printf("sizeof(struct foo11)   = %zu\n", sizeof(struct foo11));
    printf("sizeof(struct foo12)   = %zu\n", sizeof(struct foo12));

    if (sizeof(struct foo3) == 16) {
	puts("This looks like a 64-bit machine.");
    } else if (sizeof(struct foo3) == 6) {
	puts("This looks like a 32-bit machine.");
    } else {
	puts("Huh? The word size of this mahine is not obvious");
    }

    if ((offsetof(struct foo1, x) % sizeof(long)) == 0) {
	puts("Self-alignment seems to be required.");
    } else {
	puts("Self-alignment test of type long failed.");
    }
}
```

> sizeof(char *)        = 8
sizeof(long)          = 8
sizeof(int)           = 4
sizeof(short)         = 2
sizeof(char)          = 1
sizeof(float)         = 4
sizeof(double)        = 8
sizeof(struct foo1)   = 24
sizeof(struct foo2)   = 24
sizeof(struct foo3)   = 16
sizeof(struct foo4)   = 4
sizeof(struct foo5)   = 24
sizeof(struct foo6)   = 8
sizeof(struct foo7)   = 4
sizeof(struct foo8)   = 8
sizeof(struct foo9)   = 12
sizeof(struct foo10)   = 24
sizeof(struct foo11)   = 16
sizeof(struct foo12)   = 24
This looks like a 64-bit machine.
Self-alignment seems to be required.

## Reference
- [The Lost Art of Structure Packing](http://www.catb.org/esr/structure-packing/)