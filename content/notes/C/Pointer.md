---
title: Pointer
date: 2023-04-27
lastmod: 2023-04-27
author: Jimmy Lin
tags: ["指標", "pointer"]
draft: false
---
```markdown
Array, function, and pointer types are collectively called derived declarator types. A declarator type derivation from a type T is the construction of a derived declarator type from T by the application of an array-type, a function-type, or a pointer-type derivation to T.
```
> 這句話很重要，貌似三個不相關的術語「陣列」、「函式」，及「指標」都歸類為 derived declarator types，讀到此處會感到驚訝者，表示不夠理解 C 語言
> 
> array function pointer其實是一樣的，重點都在位址

- `void *` 存在的目的就是為了強迫使用者使用 ==顯式轉型== 或是 ==強制轉型==，以避免 Undefined behavior 產生

- [[Hide data in pointer]]
- [[Pointer Arithmetic]]
- [[Function pointer]]


C array 大概是 C 語言中數一數二令人困惑的部分。根據你使用的地方不同，Array 會有不同的意義：

- 如果是用在 expression，array 永遠會被轉成一個 pointer
- 用在 function argument 以外的 declaration 中它還是一個 array，而且「不能」被改寫成 pointer
- function argument 中的 array 會被轉成 pointer

若現在這裡有一個全域變數 (global)

```c
char a[10];
```

在另一個檔案中，我不能夠用 `extern char *a` 來操作原本的 `a`，因為實際上會對應到不同的指令 (instruction)。但若你的 declaration 是在 function argument 中，那麼：

- `void function(char a[])` 與 `void function(char * const a)` 是等價的
- 而且，真實的型態會是 pointer

因此你不能用 `sizeof` 取得其佔用的空間！（array 是 unmodifiable l-value，所以除了被轉成 pointer，它還會是一個不能再被設定數值的指標，因此需要加上 `const` 修飾。）

## Function Designator
對應到 C99/C11 規格書 [ 6.5.3.2 ]，`&` 所能操作的 operand 只能是：

- function designator - 基本上就是 function name
- `[]` or `*` 的操作結果：跟這兩個作用時，基本上就是相消
    - `*` - operand 本身
    - `[]` - `&` 會消失，而 `[]` 會被轉換成只剩 `+` (註：原本 `[]` 會是 `+` 搭配 `*`)
        - 例如: `&(a[5]) == a + 5`
- 一個指向非 bit-field or register storage-class specifier 的 object 的 lvalue
    
    > [bit-field](https://hackmd.io/@sysprog/c-bitfield)：一種在 struct 或 union 中使用用來節省記憶體空間的物件;  
    > 特別的用途：沒有名稱的 bit-field 可以做為 padding
    

```
char str[123];
```

為何 `str == &str` 呢？

- 實際上左右兩邊的型態是不一樣的，只是值相同。
- 左邊的是 pointer to char：`char *`
    
    - 規格書中表示：除非遇到 sizeof 或是 & 之外，array of type (在這就是指 str) 都會被直接解讀成 pointer to type (在這就是 pointer to char)，而這個 type 是根據 array 的第一個元素來決定的
    
    > Except when it is the operand of the sizeof operator or the unary & operator, or is a string literal used to initialize an array, an expression that has type ‘‘array of type’’ is converted to an expression with type ‘‘pointer to type’’ that points to the initial element of the array object and is not an lvalue. (C99 6.3.2.1)
    
- 右邊的則是 pointer to an array： `char (*)[123]`
    
    - 上面提到：遇到 & 時，str 不會被解讀為 pointer to type，而是做為原本的 object，在這就是 array object，而 address of array object 也就是這個 array object 的起始位址，當然也就會跟第一個元素的位址相同
    - 除了用值相同來解釋外，規格書在提到 equality operators 時，也有說到類似情境
    
    > Two pointers compare equal if and only if both are null pointers, both are pointers to the same object (including a pointer to an object and a subobject at its beginning) or function (C99 6.5.9)
    
除了遇到 `[]` 或 `*` 外，使用 `&` 的結果基本上都是得到 pointer to the object 或是 function 的 address

## C 的 NULL 是什麼？C++ 的 NULL 又是什麼？

你可以在 stddef.h 標頭檔中找到這樣的定義，  
如果程式是 C++ 的話 `ifdef __cplusplus` 會成立，NULL 就定義成 0  
否則定義成 `void *`，而在 C 語言中 NULL 被定義為 `void *`，

也就是說 C++ 中的 NULL 就是 0，  

`stddef.h`

```c
#ifdef __cplusplus  
#define NULL 0
#else
#define NULL ((void *)0)
#endif
```

C++11 的 nullptr 解決什麼問題？

nullptr 出現解決上述討論的問題，nullptr 指的就是 null pointer，nullptr 可以視為指向所有型別的指標，不會再跟整數0搞混，nullptr 實際類型是 std::nullptr_t 定義在 c++config.h 裡，

- [空指標常數(null pointer constant) -- v2](https://www.ptt.cc/bbs/C_and_CPP/M.1461840781.A.192.html)
## Reference
- [你所不知道的C語言：指標篇](https://hackmd.io/@sysprog/c-pointer)
- [Array Name 其實就是 Pointer](https://haogroot.com/2021/03/07/array_name-is-a-pointer/)
- [C Traps and Pitfalls](http://www.literateprogramming.com/ctraps.pdf)
- [Everything you need to know about pointers in C](https://boredzo.org/pointers/)