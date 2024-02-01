---
title: int main() & void main()
date: 2023-04-27
lastmod: 2023-04-27
author: Jimmy Lin
tags: ["C", "main()"]
draft: false
---

在 [ISO/IEC 9899 (a.k.a C99 Standard)](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf) 中 5.1.2.2.1 內有提到 C Standard 要求 main 函數必須這樣寫 `int main(void) { /* ... */};`  或是`int main(int argc, char *argv[]) { /* ... */ };`。而 `void main()` 是不正確的。

```c
int main(void) {
    return 42;
}
```

compiles to 

### When void main() causes problems
```c

```


## Reference
- [你所不知道的 C 語言: 開發工具和規格標準](https://hackmd.io/@sysprog/c-standards)
- [void main(void) - the Wrong Thing](https://www.ty-penguin.org.uk/~auj/voidmain/)
- [C 語言中int main() 和void main() 有何區別？](https://www.zhihu.com/question/60047465)
