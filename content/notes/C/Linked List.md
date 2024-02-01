---
title: Linked List
date: 2023-05-02
lastmod: 2023-05-02
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---


## Merge Sort


## Intrusive Linked List

![](https://i.imgur.com/0wtVCgo.png)
![](https://i.imgur.com/34ZLah5.png)

> 好處在於，只要 `list_head` 納入新的結構體的一個成員，即可操作，且不用自行維護一套 doubly-linked list。
> 
> There is no data pointer, compared to the traditional linked list
> How to get the data ? Use `container_of`

## Why use intrusive linked lists?

There are two main reasons to use intrusive lists over non-intrusive linked lists:

- Fewer memory allocations.
	- With non-intrusive linked lists, creating a new object and adding it to a list requires two memory allocations: one for the object, and one for the list node. With intrusive linked lists, you only need to allocate one object (since the list node is embedded in the object). This means fewer errors to be handled, because there are half as many cases where memory allocation can fail.
- Less cache thrashing.
	- Intrusive linked lists also suffer less from cache thrashing. Iterating through a non-intrusive list node requires dereferencing a list node, and then dereferencing the list data. Intrusive linked lists only require dereferencing the next list node.

## Pointer to Pointer

Weird Bug
```c
/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <stdio.h>
#include <stddef.h>
#include <stdlib.h>
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
 
typedef struct ListNode {
    int val;
    struct ListNode *next;
}ListNode;
 
  
void deleteNode(ListNode* node) {
    ListNode** indirect = &node;
    ListNode* toBeFree = *indirect;
    *indirect = (*indirect)->next;
}


int main() {
    ListNode* l1 = malloc(sizeof(ListNode));
    ListNode* l2 = malloc(sizeof(ListNode));
    ListNode* l3 = malloc(sizeof(ListNode));
    l1->val = 1;
    l2->val = 2;
    l3->val = 3;
    l1->next = l2;
    l2->next = l3;
    l3->next = NULL;
    printf("before \n");
    printf("%p\n", l1);
    printf("%p\n", l2);
    printf("%p\n", l3);
    // deleteNode(l2);
    
    ListNode** indirect = &l2;
    *indirect = (*indirect)->next;
    
    ListNode* cur = l1;
    
    printf("after\n");
    printf("%p\n", l1);
    printf("%p\n", l2);
    printf("%p\n", l3);
    
    printf("%d\n", l1->val);
    printf("%d\n", l2->val);
    printf("%d\n", l3->val);
    
    printf("after ->next\n");
    printf("%p \n", l1->next);
    printf("%p \n", l2->next);
    printf("%p \n", l3->next);
    
    while(cur) {
    
        printf("%p \n", cur);
        cur = cur->next;
    }
}

```

- Linux linked list
	- [list.h](https://github.com/sysprog21/linux-list/blob/master/include/list.h)
	- [linux-list](https://github.com/sysprog21/linux-list/blob/master/examples/quick-sort.c)
	- 為何 Linux 核心採用 macro 來實作 linked list？一般的 function call 有何成本？macro 在編譯時期會被編譯器展開成實際的程式碼，這樣做的好處是不依賴編譯器最佳化。在進行函式呼叫時，我們除了需要把參數推入特定的暫存器或是堆疊，還要儲存目前暫存器的值到堆疊。在函式呼叫數量少的狀況，影響不顯著，但隨著數量增長，就會導致程式運作比用 macro 實作時慢。
	- Linux 應用 linked list 在哪些場合？使用 linked list 最大的好處是程式開發者不需要在撰寫程式之際就決定資料的長度。應用案例:Process Management、inode、Network File System (NFS)
## Reference
- [你所不知道的 C 語言: linked list 和非連續記憶體](https://hackmd.io/@sysprog/c-linked-list)
- [Intrusive linked lists](https://www.data-structures-in-practice.com/intrusive-linked-lists/)
- [Linux 核心原始程式碼巨集: container_of](https://hackmd.io/@sysprog/linux-macro-containerof)