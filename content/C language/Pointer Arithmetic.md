---
title: Pointer Arithmetic
date: 2023-05-01
lastmod: 2023-05-01
author: Jimmy Lin
tags: ["pointer"]
draft: false
---

Use `arr` directly instead of `arr_ptr` will cause error!!! why?

```c
#include <stdio.h>
int main()
{ 
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};

    printf("%d\n", *arr++);  // error: lvalue required as increment operand
    return 0;
}
```

array name 只有在兩種情況下會被轉成指向 array 第一個元素的 pointer：
1. 做為 function parameter 時：`int func(int arr[])` 等價於 `int func(int *arr)`
2. 做為 expression 時：`int *arr_ptr = arr;`

所以說，上例中的 `*arr++` 因為 `arr` 在此並非 expression 也非 function parameter，因此不會被轉成指向 array 第一個元素的 pointer，因此會出現 error。

Error message: [lvalue required as increment operand](https://stackoverflow.com/questions/3364445/lvalue-required-as-increment-operand) 在說的就是：在此 `arr` 為 pointer to a array(`arr`)，而非 pointer to the first element of arr(i.e. `arr[0]`)，又 `arr` 的 address 不能被更改，因此 `*arr++` 會產生 error。

使用 lldb(on MacOS M1 chip) 檢查可看出 `arr` 為 `int[4]` 而 `arr_ptr` 為 `int *`。

```terminal
(lldb) p arr
(int[4]) $0 = ([0] = 0, [1] = 0, [2] = -498728925, [3] = 2073223340)
(lldb) p arr_ptr
(int *) $1 = 0x000000010000c100
```


以下使用 `int* arr_ptr = arr` ，就不會有沒辦法被 convert 成 pointer 的問題。

需要特別注意的是 `*arr_ptr++` 系列，`++` 和 `*` 之間的先後作用關係。

```c
#include <stdio.h>

int main()
{ 
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    int* arr_ptr = arr;
    // dereferece and then increment the value pointed by arr_ptr
    printf("%p\n", arr);                    // 0x7fff3f86d430
    printf("%p\n", arr_ptr);                // 0x7fff3f86d430
    printf("%d\n", ++*arr_ptr);             // 2
    printf("%p\n", arr_ptr);                // 0x7fff3f86d430
    printf("%d\n", ++(*arr_ptr));           // 3
    printf("%p\n", arr_ptr);                // 0x7fff3f86d430
    printf("%d\n", ++*(arr_ptr));           // 4
    printf("%p\n", arr_ptr);                // 0x7fff3f86d430
    
    for(int i = 0; i < 9; i++) {
        printf("%d ", arr[i]);
    }
    // arr: [4 2 3 4 5 6 7 8 9]
    printf("\n");
    
	// move pointer to the next int position
	// but retern the old content
    printf("%d\n", *arr_ptr++);             // 4
    printf("%p\n", arr_ptr);                // 0x7fff3f86d434
    // arr_ptr is at 2, dereference it and then increment it(2 -> 3), 
    // but return the old content(2)
    printf("%d\n", (*arr_ptr)++);           // 2
    printf("%p\n", arr_ptr);                // 0x7fff3f86d434
    printf("%d\n", *(arr_ptr)++);           // 3
    printf("%p\n", arr_ptr);                // 0x7fff3f86d438
    
    for(int i = 0; i < 9; i++) {
        printf("%d ", arr[i]);
    }
    // 4 3 3 4 5 6 7 8 9
    printf("\n");
	// arr_ptr moves to the next int position
	// and then dereference it
    printf("%d\n", *++arr_ptr);             // 4
    printf("%p\n", arr_ptr);                // 0x7fff3f86d43c
    printf("%d\n", *++(arr_ptr));           // 5
    printf("%p\n", arr_ptr);                // 0x7fff3f86d440
    printf("%d\n", *(++arr_ptr));           // 6
    printf("%p\n", arr_ptr);                // 0x7fff3f86d444
    
    return 0;
}

```



## Reference
- [How to increment a pointer address and pointer's value?](https://stackoverflow.com/questions/8208021/how-to-increment-a-pointer-address-and-pointers-value/8208106#8208106)