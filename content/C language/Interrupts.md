---
title: Interrupts
date: 2023-12-08
lastmod: 2023-12-08
author:
  - Jimmy Lin
tags: 
draft: false
---

11. 中斷是嵌入式系統中重要的組成部分，這導致了很多編譯開發商提供一種擴展—讓標準C支援中斷。具代表事實是，產生了一個新的關鍵字 __interrupt。下面的代碼就使用了__interrupt關鍵字去定義了一個中斷服務子程序(ISR)，請評論一下這段代碼的。  
  
```c
__interrupt double compute_area (double radius)　  
{  
　　 double area = PI * radius * radius;  
　　 printf("\nArea = %f", area);  
　　 return area;  
}  
  
```
這個函數有太多的錯誤了，以至讓人不知從何說起了：  
1)ISR 不能返回一個值。如果你不懂這個，那麼你不會被僱用的。  
2) ISR 不能傳遞參數。如果你沒有看到這一點，你被僱用的機會等同第一項。  
3) 在許多的處理器/編譯器中，浮點一般都是不可重入的。有些處理器/編譯器需要讓額處的暫存器入棧，有些處理器/編譯器就是不允許在ISR中做浮點運算。此外，ISR應該是短而有效率的，在ISR中做浮點運算是不明智的。  
4) 與第三點一脈相承，printf()經常有重入和性能上的問題。如果你丟掉了第三和第四點，我不會太為難你的。不用說，如果你能得到後兩點，那麼你的被僱用前景越來越光明了。
## Reference
