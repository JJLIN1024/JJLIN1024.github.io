---
title: bitwise operations
date: 2023-12-04
lastmod: 2023-12-04
author:
  - Jimmy Lin
tags: 
draft: false
---

- [位元旋轉實作和 Linux 核心案例](https://hackmd.io/@sysprog/bitwise-rotation#%E4%BD%8D%E5%85%83%E6%97%8B%E8%BD%89)
可移植性
bit field vs bit mask
嵌入式系統總是要用戶對變量或暫存器進行位操作。給定一個整型變量a，寫兩段代碼，第一個設置a的bit 3，第二個清除a 的bit 3。在以上兩個操作中，要保持其它位不變。
對這個問題有三種基本的反應
1)不知道如何下手。該被面者從沒做過任何嵌入式系統的工作。
2) 用bit fields。Bit fields是被扔到C語言死角的東西，它保證你的代碼在不同編譯器之間是不可移植的，同時也保證了的你的代碼是不可重用的。我最近不幸看到 Infineon為其較複雜的通訊晶片寫的驅動程序，它用到了bit fields因此完全對我無用，因為我的編譯器用其它的方式來實現bit fields的。從道德講：永遠不要讓一個非嵌入式的傢伙粘實際硬體的邊。
3) 用 `#defines` 和 bit masks 操作。這是一個有極高可移植性的方法，是應該被用到的方法。最佳的解決方案如下：

```c
#define BIT3 (0x1 << 3)
static int a;

void set_bit3(void)　
{
　　 a |= BIT3;
}

void clear_bit3(void)　
{
　　 a &= ~BIT3;
}
```



## Basics

### Set a bit
```c
unsigned char a |= (1 << n);
```

### Clear a bit
```c
 unsigned char b &= ~(1 << n);
```

### Toggle a bit
```c
unsigned char c ^= (1 << n);
```

### Test a bit
```c
unsigned char e = d & (1 << n); //d has the byte value.
```

### The right/left most byte

assuming 16 bit, 2-byte short integer:
```c
unsigned char right = val & 0xff; /* right most (least significant) byte */
unsigned char left = (val >> 8) & 0xff; /* left most (most significant) byte */
```

### get sign bit
assuming 16 bit, 2-byte short integer, two’s complement:

```c
bool sign = val & 0x8000; // sign bit
```
### 2 to the power x

```c
int num = 1 << x;
```
## Advance Technique

### arithmetic negation
- `~x + 1` is equal to `-x`
### clears lowest set bit in x
- `x &= (x - 1)`
### check if x and y have opposite signs
- `(x ^ y) < 0`: true if x and y have opposite signs
### The Magic of XOR
- `x ^ y <==> (~x & y) | (x & ~y)`
### Get Sign

`sign = -(int)((unsigned int)((int)v) >> (sizeof(int) * CHAR_BIT - 1)) ; / if v < 0 then -1, else 0.

`sign = +1 | (v >> (sizeof(int) * CHAR_BIT - 1));  // if v < 0 then -1, else +1

`sign = (v != 0) | -(int)((unsigned int)((int)v) >> (sizeof(int) * CHAR_BIT - 1));

`sign = 1 ^ ((unsigned int)v >> (sizeof(int) * CHAR_BIT - 1)); // if v < 0 then 0, else 1`
`

- 若 n 是有號 32-bit 整數，那麼 `n >> 31` 相當於 `n >= 0 ? 0 : -1`
- 若 n 是 32-bit 整數，那麼 `abs(n)` 等同於 `((n >> 31) ^ n) - (n >> 31)`
	- 當 n 是正數時
		- `n >> 31` 是 0; `n ^ 0` 仍是 n; `n - 0` 仍是 n
	- 當 n 是負數時
		- `n >> 31` 是 -1; `-1` 以 2 補數表示為 `0xFFFFFFFF`; `n ^ (-1)` 等同於 1 補數運算; 最後再減 `-1`，得到 2 補數運算的值

### Abs: Compute the integer absolute value (abs) without branching
```c
int v;           // we want to find the absolute value of v
unsigned int r;  // the result goes here 
int const mask = v >> sizeof(int) * CHAR_BIT - 1;

r = (v + mask) ^ mask;
```

Patented variation:
`r = (v ^ mask) - mask;`


### Compute the minimum (min) or maximum (max) of two integers without branching

```c
int x;  // we want to find the minimum of x and y
int y;   
int r;  // the result goes here 

r = y ^ ((x ^ y) & -(x < y)); // min(x, y)
r = x ^ ((x ^ y) & -(x < y)); // max(x, y)
```

If you know that INT_MIN <= x - y <= INT_MAX, then you can use the following, which are faster because (x - y) only needs to be evaluated once.

```c
r = y + ((x - y) & ((x - y) >> (sizeof(int) * CHAR_BIT - 1))); // min(x, y)
r = x - ((x - y) & ((x - y) >> (sizeof(int) * CHAR_BIT - 1))); // max(x, y)
```


### Determining if an integer is a power of 2

unsigned int v; // we want to see if v is a power of 2
bool f;         // the result goes here 

f = (v & (v - 1)) == 0;

Note that 0 is incorrectly considered a power of 2 here. To remedy this, use:

f = v && !(v & (v - 1));

### Conditionally set or clear bits without branching

bool f;         // conditional flag
unsigned int m; // the bit mask
unsigned int w; // the word to modify:  if (f) w |= m; else w &= ~m; 

w ^= (-f ^ w) & m;

// OR, for superscalar CPUs:
w = (w & ~m) | (-f & m);

### Conditionally negate a value without branching

If you need to negate only when a flag is false, then use the following to avoid branching:

bool fDontNegate;  // Flag indicating we should not negate v.
int v;             // Input value to negate if fDontNegate is false.
int r;             // result = fDontNegate ? v : -v;

r = (fDontNegate ^ (fDontNegate - 1)) * v;

If you need to negate only when a flag is true, then use this:

bool fNegate;  // Flag indicating if we should negate v.
int v;         // Input value to negate if fNegate is true.
int r;         // result = fNegate ? -v : v;

r = (v ^ -fNegate) + fNegate;

### Merge bits from two values according to a mask

unsigned int a;    // value to merge in non-masked bits
unsigned int b;    // value to merge in masked bits
unsigned int mask; // 1 where bits from b should be selected; 0 where from a.
unsigned int r;    // result of (a & ~mask) | (b & mask) goes here

r = a ^ ((a ^ b) & mask);


### Counting bits set in 14, 24, or 32-bit words using 64-bit instructions

unsigned int v; // count the number of bits set in v
unsigned int c; // c accumulates the total bits set in v

// option 1, for at most 14-bit values in v:
c = (v * 0x200040008001ULL & 0x111111111111111ULL) % 0xf;

// option 2, for at most 24-bit values in v:
c =  ((v & 0xfff) * 0x1001001001001ULL & 0x84210842108421ULL) % 0x1f;
c += (((v & 0xfff000) >> 12) * 0x1001001001001ULL & 0x84210842108421ULL) 
     % 0x1f;

// option 3, for at most 32-bit values in v:
c =  ((v & 0xfff) * 0x1001001001001ULL & 0x84210842108421ULL) % 0x1f;
c += (((v & 0xfff000) >> 12) * 0x1001001001001ULL & 0x84210842108421ULL) % 
     0x1f;
c += ((v >> 24) * 0x1001001001001ULL & 0x84210842108421ULL) % 0x1f;

This method requires a 64-bit CPU with fast modulus division to be efficient. The first option takes only 3 operations; the second option takes 10; and the third option takes 15.
- [Best Algorithm for Bit Reversal ( from MSB->LSB to LSB->MSB) in C - Stack Overflow](https://stackoverflow.com/questions/746171/best-algorithm-for-bit-reversal-from-msb-lsb-to-lsb-msb-in-c)

## Reference
- [你所不知道的 C 語言：bitwise 操作](https://hackmd.io/@sysprog/c-bitwise)
- [Bit Twiddling Hacks](https://graphics.stanford.edu/~seander/bithacks.html)
- [C Bitwise Operators Quiz](http://doc.callmematthi.eu/C_Bitwise_Operators.html)
- [線上測驗](https://pconrad.github.io/old_pconrad_cs16/topics/bitOps/) (附上解答)
- [Bitwise Practice](https://web.stanford.edu/class/archive/cs/cs107/cs107.1202/lab1/practice.html)
- [what (r+1 + (r >> 8)) >> 8 does?](https://stackoverflow.com/questions/30237567/what-r1-r-8-8-does)