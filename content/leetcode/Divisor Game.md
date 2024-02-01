---
title: Divisor Game
date: 2023-01-02
lastmod: 2023-01-02
author: Jimmy Lin
tags: ["math", "game", "mathmetical induction"]
draft: false
---

## Code

關鍵在於奇數的因數不會有偶數！

```cpp
class Solution {
public:
    bool divisorGame(int n) {
        return n % 2 == 0;
    }
};
```

證明：

```markdown
If N is even.
We can choose x = 1.
The opponent will get N - 1, which is a odd.
Reduce to the case odd and he will lose.

If N is odd,
2.1 If N = 1, lose directly.
2.2 We have to choose an odd x.
The opponent will get N - x, which is a even.
Reduce to the case even and he will win.

So the N will change odd and even alternatively until N = 1.
```
> [reference](https://leetcode.com/problems/divisor-game/solutions/274606/java-c-python-return-n-2-0/?orderBy=most_votes)


## Link
- [Divisor Game](https://leetcode.com/problems/divisor-game/description/)
