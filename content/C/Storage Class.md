---
title: Storage Class
date: 2023-05-20
lastmod: 2023-05-20
author:
  - Jimmy Lin
tags:
  - memory
  - data
  - alignment
draft: false
---

![](https://i.imgur.com/5PXfWXI.png)
> data 段還有分可讀寫與唯讀的部分，可讀寫的部分稱為 read-write area，拿來存放一般變數，而唯讀區則稱為 read-only area，負責存放固定的常數。
> - [C 語言程式的記憶體組態概念教學](https://blog.gtwang.org/programming/memory-layout-of-c-program/)
> 

## Volatile

一個定義為volatile的變量是說這變量可能會被意想不到地改變，這樣，編譯器就不會去假設這個變量的值了。精確地說就是，優化器在用到這個變量時必須每次都小心地重新讀取這個變量的值，而不是使用保存在暫存器裡的備份。下面是volatile變量的幾個例子：  
1) 並行設備的硬體暫存器（如：狀態暫存器）  
2) 一個中斷服務子程序中會訪問到的非自動變量(Non-automatic variables)  
3) 多線程應用中被幾個任務共享的變量  
  
回答不出這個問題的人是不會被僱傭的。我認為這是區分C程序員和嵌入式系統程序員的最基本的問題。搞嵌入式的傢伙們經常同硬體、中斷、RTOS等等打交道，所有這些都要求用到volatile變量。不懂得volatile的內容將會帶來災難。  
假設被面試者正確地回答了這是問題（嗯，懷疑是否會是這樣），我將稍微深究一下，看一下這傢伙是不是直正懂得volatile完全的重要性。  
1)一個參數既可以是const還可以是volatile嗎？解釋為什麼。  
2)一個指針可以是volatile 嗎？解釋為什麼。  
3)下面的函數有什麼錯誤：  
  
int square(volatile int *ptr)  
{  
　　 return *ptr * *ptr;  
}  
  
下面是答案：  
1)是的。一個例子是只讀的狀態暫存器。它是volatile因為它可能被意想不到地改變。它是const因為程序不應該試圖去修改它。  
2)是的。儘管這並不很常見。一個例子是當一個中服務子程序修該一個指向一個buffer的指針時。  
3)這段代碼有點變態。這段代碼的目的是用來返指針*ptr指向值的平方，但是，由於*ptr指向一個volatile型參數，編譯器將產生類似下面的代碼：  
  
int square(volatile int *ptr)　  
{  
　　 int a,b;  
　　 a = *ptr;  
　　 b = *ptr;  
　　 return a * b;  
}  
  
由於*ptr的值可能被意想不到地該變，因此a和b可能是不同的。結果，這段代碼可能返不是你所期望的平方值！正確的代碼如下：  
  
long square(volatile int *ptr)　  
{  
　　 int a;  
　　 a = *ptr;  
　　 return a * a;  
}


## Const



## Reference
- [你所不知道的 C 語言：記憶體管理、對齊及硬體特性](https://hackmd.io/@sysprog/c-memory#%E4%BD%A0%E6%89%80%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84-C-%E8%AA%9E%E8%A8%80%EF%BC%9A%E8%A8%98%E6%86%B6%E9%AB%94%E7%AE%A1%E7%90%86%E3%80%81%E5%B0%8D%E9%BD%8A%E5%8F%8A%E7%A1%AC%E9%AB%94%E7%89%B9%E6%80%A7)
- [Linux核心-記憶體描述符（mm_struct）原始碼解析](https://zhuanlan.zhihu.com/p/579144065)
- [Placing const in Declarations](https://www.dansaks.com/articles/1998-06%20Placing%20const%20in%20Declarations.pdf)
- [What const Really Means](https://www.dansaks.com/articles/1998-08%20What%20const%20Really%20Means.pdf)
- [const T vs. T const ——Dan Saks 【翻譯】](https://b8807053.pixnet.net/blog/post/3610951)
- [Back to Basics: Const as a Promise - Dan Saks - CppCon 2019](https://youtu.be/NZtr93iL3R0?si=TkoU3jQ-l5ywAD5A)
- [Storage-class specifiers](https://en.cppreference.com/w/c/language/storage_duration)