---
title: template type deduction
date: 2024-04-10
lastmod: 2024-04-10
author:
  - Jimmy Lin
tags: 
draft: false
---
## Case 1: ParamType is a Reference or Pointer, but not a Universal Reference

```cpp
template<typename T>
void func(T& param) {}

int main() {
  int x = 27;
  const int cx = x;
  const int& rx = x;
  func(x);
  func(cx);
  func(rx);
  return 0;
}
```

What the compiler sees(using [compiler insight](https://cppinsights.io/)):

- `func(x)` 則對應到 `int &`
- `func(cx), func(rx)` 都對應到 `const int &`，注意到 const 也被 type deduction 考慮進去
  
```cpp
template<typename T>
void func(T & param)
{
}

/* First instantiated from: insights.cpp:8 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<int>(int & param)
{
}
#endif


/* First instantiated from: insights.cpp:9 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<const int>(const int & param)
{
}
#endif


int main()
{
  int x = 27;
  const int cx = x;
  const int & rx = x;
  func(x);
  func(cx);
  func(rx);
  return 0;
}

```

若改成

```cpp
template<typename T>
void func(const T& param) {}
```

則 `func(x)` 對應到的就會變成 `const int &`，其他兩個因為本來就具有 const ，因此不變。
## Case 2: ParamType is a Universal Reference

- [[universal reference]]

```cpp
template<typename T>
void func(T&& param) {}

int main() {
  int x = 27;
  const int cx = x;
  const int& rx = x;
  func(x);  // l-value
  func(cx); // l-value
  func(rx); // l-value reference
  func(28); // r-value
  return 0;
}
```

當 universal reference 遇到 l-value 時，template type deduction 會推斷出 l-value reference 的結果，而遇到 r-value 時，就不做特別處理。

從 universal reference 本身的意義來想，這樣做也很自然。

What the compiler sees(using [compiler insight](https://cppinsights.io/)):

- `func(x)` 則對應到 `int &`
- `func(cx), func(rx)` 都對應到 `const int &`
- `func(28)` 對應到 `int &&`，因為 28 為 r-value

```cpp
template<typename T>
void func(T && param)
{
}

/* First instantiated from: insights.cpp:8 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<int &>(int & param)
{
}
#endif


/* First instantiated from: insights.cpp:9 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<const int &>(const int & param)
{
}
#endif


/* First instantiated from: insights.cpp:11 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<int>(int && param)
{
}
#endif


int main()
{
  int x = 27;
  const int cx = x;
  const int & rx = x;
  func(x);
  func(cx);
  func(rx);
  func(28);
  return 0;
}

```

## Case 3: ParamType is Neither a Pointer nor a Reference

```cpp
template<typename T>
void func(T param) {}

int main() {
  int x = 27;
  const int cx = x;
  const int& rx = x;
  func(x);
  func(cx);
  func(rx);
  func(28);
  return 0;
}
```


What the compiler sees(using [compiler insight](https://cppinsights.io/)):

- 全部都對應到 `int`，const (even volatile) 都會被 ignore，因為是 copy-by-value，所以 const、volatile 其實都沒什麼意義，因為 const 是要保證原本的值不會被修改，而不是用來保證原本的值的 copy 不會被更動。

```cpp
template<typename T>
void func(T param)
{
}

/* First instantiated from: insights.cpp:8 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<int>(int param)
{
}
#endif


int main()
{
  int x = 27;
  const int cx = x;
  const int & rx = x;
  func(x);
  func(cx);
  func(rx);
  func(28);
  return 0;
}

```

## Special Case: C-Style array / Function as function argument

Since we know that c array will decay to pointer to its first element, and function will also decay to pointer.

```cpp
template<typename T>
void func(T param) {}

void someFunc(int, double);

int main() {
  int arr[] = {1, 2, 3};
  func(arr);
  func(someFunc);
  return 0;
}
```

What the compiler sees(using [compiler insight](https://cppinsights.io/)):

As expected, the outcome is `int * param`, and a function pointer.

```cpp
template<typename T>
void func(T param)
{
}

/* First instantiated from: insights.cpp:8 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<int *>(int * param)
{
}
#endif


/* First instantiated from: insights.cpp:9 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<void (*)(int, double)>(void (*param)(int, double))
{
}
#endif


void someFunc(int, double);

int main()
{
  int arr[3] = {1, 2, 3};
  func(arr);
  func(someFunc);
  return 0;
}
```

However, when template argument is a reference:

```cpp
template<typename T>
void func(T& param) {}

void someFunc(int, double);

int main() {
  int arr[] = {1, 2, 3};
  func(arr);
  func(someFunc);
  return 0;
}
```

The outcome is a reference (`int (&param)[3]`/ `void (&param)(int, double)`) to the array(or function) passed in!

```cpp
template<typename T>
void func(T & param)
{
}

/* First instantiated from: insights.cpp:8 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<int[3]>(int (&param)[3])
{
}
#endif


/* First instantiated from: insights.cpp:9 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
void func<void (int, double)>(void (&param)(int, double))
{
}
#endif


void someFunc(int, double);

int main()
{
  int arr[3] = {1, 2, 3};
  func(arr);
  func(someFunc);
  return 0;
}
```