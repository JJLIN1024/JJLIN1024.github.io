---
title: Function pointer
date: 2023-05-02
lastmod: 2023-05-02
author: Jimmy Lin
tags: ["function pointer", "function designator"]
draft: false
---

> C99 [ 6.3.2.1 ] A function designator is an expression that has function type
> 
> function returning type 只要不是遇到 `&` 和 `sizeof()` 這兩個 operator 就會自動轉成`pointer to function returning type`
>  
>  function designator - 基本上就是 function name
>  
>  `[]` or `*` 的操作結果：跟這兩個作用時，基本上就是相消
>  
> 除了遇到 [] 或 * 外，使用 & 的結果基本上都是得到 pointer to the object 或是 function 的 address


```c
#include <stdio.h>

void testfunc() { ; }
int main() {
  void (*funcPtr)() = &testfunc;
  printf("%p\n", testfunc);
  printf("%p\n", funcPtr);
  printf("%p\n", *funcPtr);
  printf("%p\n", ****funcPtr);
}

// 0x104c43f20
// 0x104c43f20
// 0x104c43f20
// 0x104c43f20
```

lldb output
```shell
(lldb) print testfunc
(void (*)()) $5 = 0x0000000100003f1c (test.out`testfunc at test.c:5:1)
(lldb) print funcPtr
(void (*)(...)) $6 = 0x000000010000dc20
(lldb) print ***testfunc
(void (*)()) $7 = 0x0000000100003f1c (test.out`testfunc at test.c:5:1)
(lldb) print ***funcPtr
(void (*)(...)) $8 = 0x000000010000dc20
```

To understand what is `int (*a[10])(int);`
```c
#include <stdio.h>
int a1(int);
int a2(int);
int a3(int);
int main()
{
	int (*a[3]) (int);
	a[0] = a1;
	a[1] = a2;
	a[2] = a3;
	int x1 = a[0](3);
	int x2 = a[1](4);
	int x3 = a[2](5);
	printf("x1 =%d\n",x1);
	printf("x2=%d\n",x2);
	printf("x3=%d\n",x3);
	return 0;
}
int a1(int x){
	printf ("這是a1,其中x的值為:%d\n",x);
	return x;
}
int a2(int x){
	printf("這是a2,其中x的值為:%d\n" ,x);
	return x;
}
int a3(int x){
	printf("這是a3,其中x的值為:%d\n",x);
	return x;
}
```


```c
(*(void(*)())0)();
```

等價於：
```c
typedef void (*funcptr)();
(* (funcptr) 0)();
```

可以解讀成：將 0 type cast 成一個 function pointer，這個 function pointer points to a function that takes arguments and return void。這步驟可以寫成 `(void(*)())0`。而有了這個 function pointer，就可以 dereference it, and then invoke the function，也就是 `(*(void(*)())0)()`。


A function pointer can be a return value:

```c
char *(*get_strcpy_ptr(void))(char *dst, const char *src);
```

which returns a pointer to a function of the form

```c
char *strcpy (char *dst, const char *src);
```

要將 `get_strcpy_ptr(void)` 看成和 function pointer 的 variable name 是同樣的東西，只是換了名字，也就是 `typedef char *(*strcpy_funcptr)(char *, const char *);` 在做的事情，在定義 `strcpy_funcptr` 會 return 什麼。

```c
#include <stdio.h>
#include <string.h>

/* An ordinary function declaration, for reference */

char *strcpy_like(char *dst, const char *src); 

/* The following declares "strcpy_funcptr". */

typedef char *(*strcpy_funcptr)(char *, const char *);

/* Declare a function which returns a pointer to a function. */

strcpy_funcptr get_strcpy_ptr (void);

/* This function takes a pointer to a function as an argument. */

void do_strcpy (strcpy_funcptr some_strcpy, char * dst, const char * src)
{
    /* Here is where we finally call the function. */
 
    (*some_strcpy) (dst, src);
}

#define str_length 18

int main ()
{
    char src[str_length] = "This is a string.";
    char dst[str_length];

    /* This declares "strcpy_ptr" using the above typedef. */

    strcpy_funcptr strcpy_ptr;

    /* Set the value of "strcpy_ptr" using "get_strcpy_ptr". */

    strcpy_ptr = get_strcpy_ptr ();

    /* Pass the pointer to "do_strcpy". */

    do_strcpy (strcpy_ptr, dst, src);

    printf ("dst = %s\n", dst);
}

strcpy_funcptr get_strcpy_ptr (void)
{
    return & strcpy_like;
}

char * strcpy_like(char * dst, const char * src)
{
    return strcpy (dst, src);
}

```

## Reference
- [你所不知道的C語言：指標篇](https://hackmd.io/@sysprog/c-pointer#Function-Pointer)
- [Pointers in C with examples](https://www.lemoda.net/c/boredzo-pointers/pointers.html#function_pointers)