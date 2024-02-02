---
title: API Design
date: 2024-02-02
lastmod: 2024-02-02
author:
  - Jimmy Lin
tags:
  - c_plus_plus
  - api
  - design
draft: false
---
## nodiscard

- [C++ attribute: nodiscard (since C++17)](https://en.cppreference.com/w/cpp/language/attributes/nodiscard)
- Used to indicate when it is an error to ignore a return value from a function, should be used extensively, any non-mutating(getter/accessor/const) function should be `[[nodiscard]]`

```cpp
[[nodiscard]] int get_value() {
    return 3;
}

int main() {
    get_value();
    return 0;
}
```

```console
Executor x86-64 gcc 13.2 (C++, Editor #1)
x86-64 gcc 13.2
Compiler stderr

<source>: In function 'int main()':
<source>:6:14: warning: ignoring return value of 'int get_value()', declared with attribute 'nodiscard' [-Wunused-result]
    6 |     get_value();
      |     ~~~~~~~~~^~
<source>:1:19: note: declared here
    1 | [[nodiscard]] int get_value() {
```

## noexcept

- [noexcept operator (since C++11)](https://en.cppreference.com/w/cpp/language/noexcept)
- `noexcept` notifies the user(and compiler) that a function may not throw an exception. If an exception is thrown from that function, terminate MUST be called.

```cpp
void foo() noexcept {
	// required to terminate the program
    throw 52;
}

int main() {
    try{
        foo();
    } catch(...) {
		// catch is irrelevant, `terminate` is called
    }
    return 0;
}
```

```console
Compiler stderr

<source>: In function 'void foo()':
<source>:2:5: warning: 'throw' will always call 'terminate' [-Wterminate]
    2 |     throw 52;
      |     ^~~~~~~~

Program returned: 139
Program stderr

terminate called after throwing an instance of 'int'
Program terminated with signal: SIGSEGV
```

