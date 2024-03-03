---
title: C++ 考古題
date: 2023-12-22
lastmod: 2023-12-22
author:
  - Jimmy Lin
tags: 
draft: false
---

- const
	- In C++, **there is no const reference**
		- reference 本身就像是 const pointer，無需再用 const 去修飾
		- [Why no const reference in C++ just like const pointer?](https://stackoverflow.com/questions/59639756/why-no-const-reference-in-c-just-like-const-pointer)
	- Const objects (class) may not call non-const member functions
- `this` pointer
	- `this` 指針被隱含地聲明為: `ClassName *const this`，這意味著不能給 `this` 指針賦值；在 `ClassName` 類的 `const` 成員函數中，`this` 指針的類型為：`const ClassName* const`，這說明不能對 `this` 指針所指向的這種對像是不可修改的（即不能對這種對象的資料成員進行賦值操作
	- `this` 並不是一個常規變數，而是個 prvalue pointer，所以不能取得 `this` 的地址（不能 `&this`）
- Inline Function
	- class 的 member function 除了 virtual function 之外都會自動被轉成 inline function
		- [Are inline virtual functions really a non-sense?](https://stackoverflow.com/questions/733737/are-inline-virtual-functions-really-a-non-sense)
			-  虛擬函式可以是內嵌函式，內聯是可以修飾虛擬函式的，但是當虛擬函式表現多型性的時候不能內聯。
			-  內聯是在編譯期建議編譯器內聯，而虛擬函式的多型性在運行期，編譯器無法知道運行期呼叫哪個程式碼，因此虛擬函式表現為多型性時（運行期）不可以內聯。
			-  `inline virtual` 唯一可以內聯的時候是：編譯器知道所呼叫的對像是哪個類（如 `Base::who()`），這只有在編譯器具有實際對象而不是對象的指針或引用時才會發生。
```c
#include <iostream>  
using namespace std;
class Base
{
	public:
	inline virtual void who()
	{
		cout << "I am Base\n";
	}
	virtual ~Base() {}
};

class Derived : public Base
{
	public:
	inline void who()  // 不寫inline時隱式內聯
	{
		cout << "I am Derived\n";
	}
};

int main()
{
	// 此處的虛擬函式 who()，是通過類（Base）的具體對象（b）來呼叫的，編譯期間就能確定了，所以它可以是內聯的，但最終是否內聯取決於編譯器。 
	Base b;
	b.who();

	// 此處的虛擬函式是通過指針呼叫的，呈現多型性，需要在執行階段期間才能確定，所以不能為內聯。  
	Base *ptr = new Derived();
	ptr->who();

	// 因為Base有虛解構函式（virtual ~Base() {}），所以 delete 時，會先呼叫派生類（Derived）解構函式，再呼叫基類（Base）解構函式，防止記憶體洩漏。
	delete ptr;
	ptr = nullptr;
	
	system("pause");
	return 0;
} 
```

- volatile
	- Examples
		- 平行裝置的硬體暫存器(如：狀態暫存器)
		- 中斷服務子程序中會造訪的非自動變數
		- 多線程應用中被幾個任務共享的變數
	- 參數可以是const還可以是volatile嗎
		- 是的。一個例子是只讀的狀態暫存器。它是volatile因為它可能被意想不到地改變。它是const因為程式不應該試圖去修改它。
	- 一個指針可以是volatile嗎？解釋為什麼。
		- 是的。儘管這並不很常見。一個例子是當一個中服務子程式修該一個指向一個buffer的指針時
- [assert](https://en.cppreference.com/w/c/error/assert)
	- If `NDEBUG` is defined as a macro name at the point in the source code where `<assert.h>` is included, then assert does nothing (配合 `gcc -DNDEBUG ...`)
 - [`#pragma pack(n)`](https://learn.microsoft.com/zh-tw/cpp/preprocessor/pack?view=msvc-170)
	 - 設定結構體、聯合以及類成員變數以 n 位元組方式對齊
```c
#pragma pack(push)  // 保存對齊狀態
#pragma pack(4)     // 設定為 4 位元組對齊

struct test
{
    char m1;
    double m4;
    int m3;
};

#pragma pack(pop)   // 恢復對齊狀態
```

- union 
	- 聯合（union）是一種節省空間的特殊的類，一個 union 可以有多個資料成員，但是在任意時刻只有一個資料成員可以有值。當某個成員被賦值後其他成員變為未定義狀態。聯合有如下特點
		-   默認存取控制符為 public
		-   可以含有建構函式、解構函式
		-   不能含有引用類型的成員
		-   不能繼承自其他類，不能作為基類
		-   不能含有虛擬函式
		-   匿名 union 不能包含 protected 成員或 private 成員
		-   匿名 union 在定義所在範疇可直接訪問 union 成員
		-   全域匿名聯合必須是靜態（static）的
```c
#include<iostream>

union UnionTest {
    UnionTest() : i(10) {};
    int i;
    double d;
};

static union {
    int i;
    double d;
};

int main() {
    UnionTest u;

    union {
        int i;
        double d;
    };

    std::cout << u.i << std::endl;  // 輸出 UnionTest 聯合的 10

    ::i = 20;
    std::cout << ::i << std::endl;  // 輸出全域靜態匿名聯合的 20

    i = 30;
    std::cout << i << std::endl;    // 輸出局部匿名聯合的 30

    return 0;
}
```

- [How would one write object-oriented code in C?](https://stackoverflow.com/questions/351733/how-would-one-write-object-oriented-code-in-c/351745#351745)
	- When you 'inherit' from that class, you just change the pointers to point to your own functions
- explicit keyword
	- explicit 修飾建構函式時，可以防止隱式轉換和複製初始化
	- explicit 修飾轉換函數時，可以防止隱式轉換，但 [按語境轉換](https://zh.cppreference.com/w/cpp/language/implicit_conversion) 除外

```c
struct A
{
A(int) { }
operator bool() const { return true; }
};

struct B
{
explicit B(int) {}
explicit operator bool() const { return true; }
};

void doA(A a) {}

void doB(B b) {}

int main()
{
A a1(1);// OK：直接初始化
A a2 = 1;// OK：複製初始化
A a3{ 1 };// OK：直接列表初始化
A a4 = { 1 };// OK：複製列表初始化
A a5 = (A)1;// OK：允許 static_cast 的顯式轉換 
doA(1);// OK：允許從 int 到 A 的隱式轉換
if (a1);// OK：使用轉換函數 A::operator bool() 的從 A 到 bool 的隱式轉換
bool a6(a1);// OK：使用轉換函數 A::operator bool() 的從 A 到 bool 的隱式轉換
bool a7 = a1;// OK：使用轉換函數 A::operator bool() 的從 A 到 bool 的隱式轉換
bool a8 = static_cast<bool>(a1);  // OK ：static_cast 進行直接初始化

B b1(1);// OK：直接初始化
B b2 = 1;// 錯誤：被 explicit 修飾建構函式的對象不可以複製初始化
B b3{ 1 };// OK：直接列表初始化
B b4 = { 1 };// 錯誤：被 explicit 修飾建構函式的對象不可以複製列表初始化
B b5 = (B)1;// OK：允許 static_cast 的顯式轉換
doB(1);// 錯誤：被 explicit 修飾建構函式的對象不可以從 int 到 B 的隱式轉換
if (b1);// OK：被 explicit 修飾轉換函數 B::operator bool() 的對象可以從 B 到 bool 的按語境轉換
bool b6(b1);// OK：被 explicit 修飾轉換函數 B::operator bool() 的對象可以從 B 到 bool 的按語境轉換
bool b7 = b1;// 錯誤：被 explicit 修飾轉換函數 B::operator bool() 的對象不可以隱式轉換
bool b8 = static_cast<bool>(b1);  // OK：static_cast 進行直接初始化

return 0;
}
```

在 C++11 中，派生類能夠重用其直接基類定義的建構函式。

```c
class Derived : Base {
public:
    using Base::Base;
    /* ... */
};
```

如上 using 聲明，對於基類的每個建構函式，編譯器都生成一個與之對應（形參列表完全相同）的派生類建構函式。生成如下類型建構函式：

```c
Derived(parms) : Base(args) { }
```

#### using 指示

`using 指示` 使得某個特定命名空間中所有名字都可見，這樣我們就無需再為它們新增任何前綴限定符了。如：

```c
using namespace_name name;
```

#### 儘量少使用 `using 指示` 污染命名空間

> 一般說來，使用 using 命令比使用 using 編譯命令更安全，這是由於它**只匯入了指定的名稱**。如果該名稱與局部名稱發生衝突，編譯器將**發出指示**。using編譯命令匯入所有的名稱，包括可能並不需要的名稱。如果與局部名稱發生衝突，則**局部名稱將覆蓋名稱空間版本**，而編譯器**並不會發出警告**。另外，名稱空間的開放性意味著名稱空間的名稱可能分散在多個地方，這使得難以精準知道新增了哪些名稱。

using 使用

儘量少使用 `using 指示`

應該多使用 `using 聲明`

```c
int x;
std::cin >> x ;
std::cout << x << std::endl;
```

或者

```c
using std::cin;
using std::cout;
using std::endl;
int x;
cin >> x;
cout << x << endl;
```

### :: 範圍解析運算子

#### 分類

1.  全域範疇符（`::name`）：用於類型名稱（類、類成員、成員函數、變數等）前，表示範疇為全域命名空間
2.  類範疇符（`class::name`）：用於表示指定類型的範疇範圍是具體某個類的
3.  命名空間範疇符（`namespace::name`）:用於表示指定類型的範疇範圍是具體某個命名空間的

:: 使用

```c
int count = 11;         // 全域（::）的 count

class A {
public:
static int count;   // 類 A 的 count（A::count）
};
int A::count = 21;

void fun()
{
int count = 31;     // 初始化局部的 count 為 31
count = 32;         // 設定局部的 count 的值為 32
}

int main() {
::count = 12;       // 測試 1：設定全域的 count 的值為 12

A::count = 22;      // 測試 2：設定類 A 的 count 為 22

fun();        // 測試 3

return 0;
}
```

### enum 列舉類型

#### 限定範疇的列舉類型

```c
enum class open_modes { input, output, append };
```

#### 不限定範疇的列舉類型

```c
enum color { red, yellow, green };
enum { floatPrec = 6, doublePrec = 10 };
```

### decltype

decltype 關鍵字用於檢查實體的聲明類型或表示式的類型及值分類。語法：

decltype 使用

```c
// 尾置返回允許我們在參數列表之後聲明返回類型
template <typename It>
auto fcn(It beg, It end) -> decltype(*beg)
{
    // 處理序列
    return *beg;    // 返回序列中一個元素的引用
}
// 為了使用範本參數成員，必須用 typename
template <typename It>
auto fcn2(It beg, It end) -> typename remove_reference<decltype(*beg)>::type
{
    // 處理序列
    return *beg;    // 返回序列中一個元素的複製
}
```

### 引用

#### 左值引用

常規引用，一般表示對象的身份。

#### 右值引用

右值引用就是必須繫結到右值（一個臨時對象、將要銷毀的對象）的引用，一般表示對象的值。

右值引用可實現轉移語義（Move Sementics）和精確傳遞（Perfect Forwarding），它的主要目的有兩個方面：

-   消除兩個對象互動時不必要的對象複製，節省運算儲存資源，提高效率。
-   能夠更簡潔明確地定義泛型函數。

#### 引用摺疊

-   `X& &`、`X& &&`、`X&& &` 可摺疊成 `X&`
-   `X&& &&` 可摺疊成 `X&&`

### 宏

-   宏定義可以實現類似於函數的功能，但是它終歸不是函數，而宏定義中括弧中的“參數”也不是真的參數，在宏展開的時候對 “參數” 進行的是一對一的替換。

### 成員初始化列表

好處

-   更高效：少了一次呼叫默認建構函式的過程。
-   有些場合必須要用初始化列表：
    1.  常數成員，因為常數只能初始化不能賦值，所以必須放在初始化列表裡面
    2.  引用類型，引用必須在定義的時候初始化，並且不能重新賦值，所以也要寫在初始化列表裡面
    3.  沒有默認建構函式的類類型，因為使用初始化列表可以不必呼叫默認建構函式來初始化

### initializer\_list 列表初始化

用花括號初始化器列表初始化一個對象，其中對應建構函式接受一個 `std::initializer_list` 參數.

initializer\_list 使用

```c
#include <iostream>
#include <vector>
#include <initializer_list>
 
template <class T>
struct S {
    std::vector<T> v;
    S(std::initializer_list<T> l) : v(l) {
         std::cout << "constructed with a " << l.size() << "-element list\n";
    }
    void append(std::initializer_list<T> l) {
        v.insert(v.end(), l.begin(), l.end());
    }
    std::pair<const T*, std::size_t> c_arr() const {
        return {&v[0], v.size()};  // 在 return 語句中複製列表初始化
                                   // 這不使用 std::initializer_list
    }
};
 
template <typename T>
void templated_fn(T) {}
 
int main()
{
    S<int> s = {1, 2, 3, 4, 5}; // 複製初始化
    s.append({6, 7, 8});      // 函數呼叫中的列表初始化
 
    std::cout << "The vector size is now " << s.c_arr().second << " ints:\n";
 
    for (auto n : s.v)
        std::cout << n << ' ';
    std::cout << '\n';
 
    std::cout << "Range-for over brace-init-list: \n";
 
    for (int x : {-1, -2, -3}) // auto 的規則令此帶範圍 for 工作
        std::cout << x << ' ';
    std::cout << '\n';
 
    auto al = {10, 11, 12};   // auto 的特殊規則
 
    std::cout << "The list bound to auto has size() = " << al.size() << '\n';
 
//    templated_fn({1, 2, 3}); // 編譯錯誤！“ {1, 2, 3} ”不是表示式，
                             // 它無類型，故 T 無法推導
    templated_fn<std::initializer_list<int>>({1, 2, 3}); // OK
    templated_fn<std::vector<int>>({1, 2, 3});           // 也 OK
}
```

### 物件導向

物件導向程式設計（Object-oriented programming，OOP）是種具有對象概念的程序程式設計典範，同時也是一種程序開發的抽象方針。

[![物件導向特徵](https://camo.githubusercontent.com/4d8c9abfdf37d65480f76519cae5cc9a9f2823b607ab6c2c6137630a98d44aef/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545392539442541322545352539302539312545352541462542392545382542312541312545352539462542412545362539432541432545372538392542392545352542452538312e706e67)](https://camo.githubusercontent.com/4d8c9abfdf37d65480f76519cae5cc9a9f2823b607ab6c2c6137630a98d44aef/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545392539442541322545352539302539312545352541462542392545382542312541312545352539462542412545362539432541432545372538392542392545352542452538312e706e67)

物件導向三大特徵 —— 封裝、繼承、多型

### 封裝

把客觀事物封裝成抽象的類，並且類可以把自己的資料和方法只讓可信的類或者對象操作，對不可信的進行資訊隱藏。關鍵字：public, protected, private。不寫默認為 private。

-   `public` 成員：可以被任意實體訪問
-   `protected` 成員：只允許被子類及本類的成員函數訪問
-   `private` 成員：只允許被本類的成員函數、友元類或友元函數訪問

### 繼承

-   基類（父類）——> 派生類（子類）

### 多型

-   多型，即多種狀態（形態）。簡單來說，我們可以將多型定義為消息以多種形式顯示的能力。
-   多型是以封裝和繼承為基礎的。
-   C++ 多型分類及實現：
    1.  多載多型（Ad-hoc Polymorphism，編譯期）：函數多載、運算子多載
    2.  子類型多型（Subtype Polymorphism，運行期）：虛擬函式
    3.  參數多型性（Parametric Polymorphism，編譯期）：類範本、函數範本
    4.  強制多型（Coercion Polymorphism，編譯期/運行期）：基本類型轉換、自訂類型轉換

> [The Four Polymorphisms in C++](https://catonmat.net/cpp-polymorphism)

#### 靜態多型（編譯期/早繫結）

函數多載

```c
class A
{
public:
    void do(int a);
    void do(int a, int b);
};
```

#### 動態多型（運行期期/晚繫結）

-   虛擬函式：用 virtual 修飾成員函數，使其成為虛擬函式
-   動態繫結：當使用基類的引用或指針呼叫一個虛擬函式時將發生動態繫結

**注意：**

-   可以將派生類的對象賦值給基類的指針或引用，反之不可
-   普通函數（非類成員函數）不能是虛擬函式
-   靜態函數（static）不能是虛擬函式
-   建構函式不能是虛擬函式（因為在呼叫建構函式時，虛表指針並沒有在對象的記憶體空間中，必須要建構函式呼叫完成後才會形成虛表指針）
-   內嵌函式不能是表現多型性時的虛擬函式，解釋見：[虛擬函式（virtual）可以是內嵌函式（inline）嗎？](https://github.com/huihut/interview#%E8%99%9A%E5%87%BD%E6%95%B0virtual%E5%8F%AF%E4%BB%A5%E6%98%AF%E5%86%85%E8%81%94%E5%87%BD%E6%95%B0inline%E5%90%97)

動態多型使用

```c
class Shape                     // 形狀類
{
public:
    virtual double calcArea()
    {
        ...
    }
    virtual ~Shape();
};
class Circle : public Shape     // 圓形類
{
public:
    virtual double calcArea();
    ...
};
class Rect : public Shape       // 矩形類
{
public:
    virtual double calcArea();
    ...
};
int main()
{
    Shape * shape1 = new Circle(4.0);
    Shape * shape2 = new Rect(5.0, 6.0);
    shape1->calcArea();         // 呼叫圓形類裡面的方法
    shape2->calcArea();         // 呼叫矩形類裡面的方法
    delete shape1;
    shape1 = nullptr;
    delete shape2;
    shape2 = nullptr;
    return 0;
}
```

### 虛解構函式

虛解構函式是為瞭解決基類的指針指向派生類對象，並用基類的指針刪除派生類對象。

虛解構函式使用

```c
class Shape
{
public:
    Shape();                    // 建構函式不能是虛擬函式
    virtual double calcArea();
    virtual ~Shape();           // 虛解構函式
};
class Circle : public Shape     // 圓形類
{
public:
    virtual double calcArea();
    ...
};
int main()
{
    Shape * shape1 = new Circle(4.0);
    shape1->calcArea();    
    delete shape1;  // 因為Shape有虛解構函式，所以delete釋放記憶體時，先呼叫子類解構函式，再呼叫基類解構函式，防止記憶體洩漏。
    shape1 = NULL;
    return 0；
}
```

### 純虛擬函式

純虛擬函式是一種特殊的虛擬函式，在基類中不能對虛擬函式給出有意義的實現，而把它聲明為純虛擬函式，它的實現留給該基類的派生類去做。

### 虛擬函式、純虛擬函式

-   類裡如果聲明了虛擬函式，這個函數是實現的，哪怕是空實現，它的作用就是為了能讓這個函數在它的子類裡面可以被覆蓋（override），這樣的話，編譯器就可以使用後期繫結來達到多型了。純虛擬函式只是一個介面，是個函數的聲明而已，它要留到子類裡去實現。
-   虛擬函式在子類裡面可以不重寫；但純虛擬函式必須在子類實現才可以實例化子類。
-   虛擬函式的類用於 “實作繼承”，繼承介面的同時也繼承了父類的實現。純虛擬函式關注的是介面的統一性，實現由子類完成。
-   帶純虛擬函式的類叫抽象類，這種類不能直接生成對象，而只有被繼承，並重寫其虛擬函式後，才能使用。抽象類被繼承後，子類可以繼續是抽象類，也可以是普通類。
-   虛基類是虛繼承中的基類，具體見下文虛繼承。

> [CSDN . C++ 中的虛擬函式、純虛擬函式區別和聯絡](https://blog.csdn.net/u012260238/article/details/53610462)

### 虛擬函式指針、虛擬函式表

-   虛擬函式指針：在含有虛擬函式類的對象中，指向虛擬函式表，在執行階段確定。
-   虛擬函式表：在程序唯讀資料段（`.rodata section`，見：[目標檔案儲存結構](https://github.com/huihut/interview?tab=readme-ov-file#%E7%9B%AE%E6%A0%87%E6%96%87%E4%BB%B6%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84)），存放虛擬函式指針，如果派生類實現了基類的某個虛擬函式，則在虛表中覆蓋原本基類的那個虛擬函式指針，在編譯時根據類的聲明建立。

> [C++中的虛擬函式(表)實現機制以及用C語言對其進行的模擬實現](https://blog.twofei.com/496/)

### 虛繼承

虛繼承用於解決多繼承條件下的菱形繼承問題（浪費儲存空間、存在二義性）。

底層實現原理與編譯器相關，一般通過**虛基類指針**和**虛基類表**實現，每個虛繼承的子類都有一個虛基類指針（佔用一個指針的儲存空間，4位元組）和虛基類表（不佔用類對象的儲存空間）（需要強調的是，虛基類依舊會在子類裡面存在複製，只是僅僅最多存在一份而已，並不是不在子類裡面了）；當虛繼承的子類被當做父類繼承時，虛基類指針也會被繼承。

實際上，vbptr 指的是虛基類表指針（virtual base table pointer），該指針指向了一個虛基類表（virtual table），虛表中記錄了虛基類與本類的偏移地址；通過偏移地址，這樣就找到了虛基類成員，而虛繼承也不用像普通多繼承那樣維持著公共基類（虛基類）的兩份同樣的複製，節省了儲存空間。

### 虛繼承、虛擬函式

-   相同之處：都利用了虛指針（均佔用類的儲存空間）和虛表（均不佔用類的儲存空間）
-   不同之處：
    -   虛繼承
        -   虛基類依舊存在繼承類中，只佔用儲存空間
        -   虛基類表儲存的是虛基類相對直接繼承類的偏移
    -   虛擬函式
        -   虛擬函式不佔用儲存空間
        -   虛擬函式表儲存的是虛擬函式地址

### 類範本、成員範本、虛擬函式

-   類範本中可以使用虛擬函式
-   一個類（無論是普通類還是類範本）的成員範本（本身是範本的成員函數）不能是虛擬函式

### 抽象類、介面類、聚合類

-   抽象類：含有純虛擬函式的類
-   介面類：僅含有純虛擬函式的抽象類
-   聚合類：使用者可以直接訪問其成員，並且具有特殊的初始化語法形式。滿足如下特點：
    -   所有成員都是 public
    -   沒有定義任何建構函式
    -   沒有類內初始化
    -   沒有基類，也沒有 virtual 函數

### 記憶體分配和管理

#### malloc、calloc、realloc、alloca

1.  malloc：申請指定位元組數的記憶體。申請到的記憶體中的初始值不確定。
2.  calloc：為指定長度的對象，分配能容納其指定個數的記憶體。申請到的記憶體的每一位（bit）都初始化為 0。
3.  realloc：更改以前分配的記憶體長度（增加或減少）。當增加長度時，可能需將以前分配區的內容移到另一個足夠大的區域，而新增區域內的初始值則不確定。
4.  alloca：在棧上申請記憶體。程序在出棧的時候，會自動釋放記憶體。但是需要注意的是，alloca 不具可移植性, 而且在沒有傳統堆疊的機器上很難實現。alloca 不宜使用在必須廣泛移植的程序中。C99 中支援變長陣列 (VLA)，可以用來替代 alloca。

### delete this 合法嗎？

> [Is it legal (and moral) for a member function to say delete this?](https://isocpp.org/wiki/faq/freestore-mgmt#delete-this)

合法，但：

1.  必須保證 this 對像是通過 `new`（不是 `new[]`、不是 placement new、不是棧上、不是全域、不是其他對象成員）分配的
2.  必須保證呼叫 `delete this` 的成員函數是最後一個呼叫 this 的成員函數
3.  必須保證成員函數的 `delete this` 後面沒有呼叫 this 了
4.  必須保證 `delete this` 後沒有人使用了

### 如何定義一個只能在堆上（棧上）生成對象的類？

> [如何定義一個只能在堆上（棧上）生成對象的類?](https://www.nowcoder.com/questionTerminal/0a584aa13f804f3ea72b442a065a7618)

#### 只能在堆上

方法：將解構函式設定為私有

原因：C++ 是靜態繫結語言，編譯器管理棧上對象的生命週期，編譯器在為類對象分配棧空間時，會先檢查類的解構函式的訪問性。若解構函式不可訪問，則不能在棧上建立對象。

#### 只能在棧上

方法：將 new 和 delete 多載為私有

原因：在堆上生成對象，使用 new 關鍵詞操作，其過程分為兩階段：第一階段，使用 new 在堆上尋找可用記憶體，分配給對象；第二階段，呼叫建構函式生成對象。將 new 操作設定為私有，那麼第一階段就無法完成，就不能夠在堆上生成對象。

- [智慧型指標 (新式 C++)](https://learn.microsoft.com/zh-tw/cpp/cpp/smart-pointers-modern-cpp?view=msvc-170)
	- `#include <memory>`
	- C++ 98
		- `std::auto_ptr<std::string> ps (new std::string(str))；`
	- C++ 11
		- shared_ptr
		- unique_ptr
		- weak_ptr
		- auto_ptr（被 C++11 棄用）

-   Class shared\_ptr 實現共享式擁有（shared ownership）概念。多個智能指針指向相同對象，該對象和其相關資源會在 “最後一個 reference 被銷毀” 時被釋放。為了在結構較複雜的情景中執行上述工作，標準庫提供 weak\_ptr、bad\_weak\_ptr 和 enable\_shared\_from\_this 等輔助類。
-   Class unique\_ptr 實現獨佔式擁有（exclusive ownership）或嚴格擁有（strict ownership）概念，保證同一時間內只有一個智能指針可以指向該對象。你可以移交擁有權。它對於避免記憶體洩漏（resource leak）——如 new 後忘記 delete ——特別有用。

##### shared\_ptr

多個智能指針可以共享同一個對象，對象的最末一個擁有著有責任銷毀對象，並清理與該對象相關的所有資源。

-   支援定製型刪除器（custom deleter），可防範 Cross-DLL 問題（對像在動態連結庫（DLL）中被 new 建立，卻在另一個 DLL 內被 delete 銷毀）、自動解除互斥鎖

##### weak\_ptr

weak\_ptr 允許你共享但不擁有某對象，一旦最末一個擁有該對象的智能指針失去了所有權，任何 weak\_ptr 都會自動成空（empty）。因此，在 default 和 copy 建構函式之外，weak\_ptr 只提供 “接受一個 shared\_ptr” 的建構函式。

-   可打破環狀引用（cycles of references，兩個其實已經沒有被使用的對象彼此互指，使之看似還在 “被使用” 的狀態）的問題

##### unique\_ptr

unique\_ptr 是 C++11 才開始提供的類型，是一種在異常時可以幫助避免資源洩漏的智能指針。採用獨佔式擁有，意味著可以確保一個對象和其相應的資源同一時間只被一個 pointer 擁有。一旦擁有著被銷毀或程式設計 empty，或開始擁有另一個對象，先前擁有的那個對象就會被銷毀，其任何相應資源亦會被釋放。

-   unique\_ptr 用於取代 auto\_ptr

##### auto\_ptr

被 c++11 棄用，原因是缺乏語言特性如 “針對構造和賦值” 的 `std::move` 語義，以及其他瑕疵。

##### auto\_ptr 與 unique\_ptr 比較

-   auto\_ptr 可以賦值複製，複製複製後所有權轉移；unqiue\_ptr 無複製賦值語義，但實現了`move` 語義；
-   auto\_ptr 對象不能管理陣列（析構呼叫 `delete`），unique\_ptr 可以管理陣列（析構呼叫 `delete[]` ）；

### 強制類型轉換運算子

> [MSDN . 強制轉換運算子](https://msdn.microsoft.com/zh-CN/library/5f6c9f8h.aspx)

#### static\_cast

-   用於非多型類型的轉換
-   不執行執行階段類型檢查（轉換安全性不如 dynamic\_cast）
-   通常用於轉換數值資料類型（如 float -> int）
-   可以在整個類層次結構中移動指針，子類轉化為父類安全（向上轉換），父類轉化為子類不安全（因為子類可能有不在父類的欄位或方法）

> 向上轉換是一種隱式轉換。

#### dynamic\_cast

-   用於多型類型的轉換
-   執行行執行階段類型檢查
-   只適用於指針或引用
-   對不明確的指針的轉換將失敗（返回 nullptr），但不引發異常
-   可以在整個類層次結構中移動指針，包括向上轉換、向下轉換

#### const\_cast

-   用於刪除 const、volatile 和 \_\_unaligned 特性（如將 const int 類型轉換為 int 類型 ）

#### reinterpret\_cast

-   用於位的簡單重新解釋
-   濫用 reinterpret\_cast 運算子可能很容易帶來風險。 除非所需轉換本身是低等級的，否則應使用其他強制轉換運算子之一。
-   允許將任何指針轉換為任何其他指針類型（如 `char*` 到 `int*` 或 `One_class*` 到 `Unrelated_class*` 之類的轉換，但其本身並不安全）
-   也允許將任何整數類型轉換為任何指針類型以及反向轉換。
-   reinterpret\_cast 運算子不能丟掉 const、volatile 或 \_\_unaligned 特性。
-   reinterpret\_cast 的一個實際用途是在雜湊函數中，即，通過讓兩個不同的值幾乎不以相同的索引結尾的方式將值對應到索引。

#### bad\_cast

-   由於強制轉換為引用類型失敗，dynamic\_cast 運算子引發 bad\_cast 異常。

bad\_cast 使用

```c
try {  
    Circle& ref_circle = dynamic_cast<Circle&>(ref_shape);   
}  
catch (bad_cast b) {  
    cout << "Caught: " << b.what();  
} 
```

### 執行階段類型資訊 (RTTI)

#### dynamic\_cast

-   用於多型類型的轉換

#### typeid

-   typeid 運算子允許在執行階段確定對象的類型
-   type\_id 返回一個 type\_info 對象的引用
-   如果想通過基類的指針獲得派生類的資料類型，基類必須帶有虛擬函式
-   只能獲取對象的實際類型

#### type\_info

-   type\_info 類描述編譯器在程序中生成的類型資訊。 此類的對象可以有效儲存指向類型的名稱的指針。 type\_info 類還可儲存適合比較兩個類型是否相等或比較其排列順序的編碼值。 類型的編碼規則和排列順序是未指定的，並且可能因程序而異。
-   標頭檔：`typeinfo`

typeid、type\_info 使用

```c
#include <iostream>
using namespace std;

class Flyable                       // 能飛的
{
public:
    virtual void takeoff() = 0;     // 起飛
    virtual void land() = 0;        // 降落
};
class Bird : public Flyable         // 鳥
{
public:
    void foraging() {...}           // 覓食
    virtual void takeoff() {...}
    virtual void land() {...}
    virtual ~Bird(){}
};
class Plane : public Flyable        // 飛機
{
public:
    void carry() {...}              // 運輸
    virtual void takeoff() {...}
    virtual void land() {...}
};

class type_info
{
public:
    const char* name() const;
    bool operator == (const type_info & rhs) const;
    bool operator != (const type_info & rhs) const;
    int before(const type_info & rhs) const;
    virtual ~type_info();
private:
    ...
};

void doSomething(Flyable *obj)                 // 做些事情
{
    obj->takeoff();

    cout << typeid(*obj).name() << endl;        // 輸出傳入對象類型（"class Bird" or "class Plane"）

    if(typeid(*obj) == typeid(Bird))            // 判斷對象類型
    {
        Bird *bird = dynamic_cast<Bird *>(obj); // 對象轉化
        bird->foraging();
    }

    obj->land();
}

int main(){
Bird *b = new Bird();
doSomething(b);
delete b;
b = nullptr;
return 0;
}
```

## ⭐️ Effective

### Effective C++

1.  視 C++ 為一個語言聯邦（C、Object-Oriented C++、Template C++、STL）
2.  寧可以編譯器替換前置處理器（儘量以 `const`、`enum`、`inline` 替換 `#define`）
3.  儘可能使用 const
4.  確定對象被使用前已先被初始化（構造時賦值（copy 建構函式）比 default 構造後賦值（copy assignment）效率高）
5.  瞭解 C++ 默默編寫並呼叫哪些函數（編譯器暗自為 class 建立 default 建構函式、copy 建構函式、copy assignment 運算子、解構函式）
6.  若不想使用編譯器自動生成的函數，就應該明確拒絕（將不想使用的成員函數聲明為 private，並且不予實現）
7.  為多型基類聲明 virtual 解構函式（如果 class 帶有任何 virtual 函數，它就應該擁有一個 virtual 解構函式）
8.  別讓異常逃離解構函式（解構函式應該吞下不傳播異常，或者結束程序，而不是吐出異常；如果要處理異常應該在非析構的普通函數處理）
9.  絕不在構造和析構過程中呼叫 virtual 函數（因為這類呼叫從不下降至 derived class）
10.  令 `operator=` 返回一個 `reference to *this` （用於連鎖賦值）
11.  在 `operator=` 中處理 “自我賦值”
12.  賦值對象時應確保複製 “對象內的所有成員變數” 及 “所有 base class 成分”（呼叫基類複製建構函式）
13.  以對象管理資源（資源在建構函式獲得，在解構函式釋放，建議使用智能指針，資源取得時機便是初始化時機（Resource Acquisition Is Initialization，RAII））
14.  在資源管理類中小心 copying 行為（普遍的 RAII class copying 行為是：抑制 copying、引用計數、深度複製、轉移底部資源擁有權（類似 auto\_ptr））
15.  在資源管理類中提供對原始資源（raw resources）的訪問（對原始資源的訪問可能經過顯式轉換或隱式轉換，一般而言顯示轉換比較安全，隱式轉換對客戶比較方便）
16.  成對使用 new 和 delete 時要採取相同形式（`new` 中使用 `[]` 則 `delete []`，`new` 中不使用 `[]` 則 `delete`）
17.  以獨立語句將 newed 對象儲存於（置入）智能指針（如果不這樣做，可能會因為編譯器最佳化，導致難以察覺的資源洩漏）
18.  讓介面容易被正確使用，不易被誤用（促進正常使用的辦法：介面的一致性、內建類型的行為相容；阻止誤用的辦法：建立新類型，限制類型上的操作，約束對象值、消除客戶的資源管理責任）
19.  設計 class 猶如設計 type，需要考慮對象建立、銷毀、初始化、賦值、值傳遞、合法值、繼承關係、轉換、一般化等等。
20.  寧以 pass-by-reference-to-const 替換 pass-by-value （前者通常更高效、避免切割問題（slicing problem），但不適用於內建類型、STL迭代器、函數對象）
21.  必須返回對象時，別妄想返回其 reference（絕不返回 pointer 或 reference 指向一個 local stack 對象，或返回 reference 指向一個 heap-allocated 對象，或返回 pointer 或 reference 指向一個 local static 對象而有可能同時需要多個這樣的對象。）
22.  將成員變數聲明為 private（為了封裝、一致性、對其讀寫精確控制等）
23.  寧以 non-member、non-friend 替換 member 函數（可增加封裝性、包裹彈性（packaging flexibility）、機能擴充性）
24.  若所有參數（包括被this指針所指的那個隱喻參數）皆須要類型轉換，請為此採用 non-member 函數
25.  考慮寫一個不拋異常的 swap 函數
26.  儘可能延後變數定義式的出現時間（可增加程序清晰度並改善程序效率）
27.  儘量少做轉型動作（舊式：`(T)expression`、`T(expression)`；新式：`const_cast<T>(expression)`、`dynamic_cast<T>(expression)`、`reinterpret_cast<T>(expression)`、`static_cast<T>(expression)`、；儘量避免轉型、注重效率避免 dynamic\_casts、儘量設計成無需轉型、可把轉型封裝成函數、寧可用新式轉型）
28.  避免使用 handles（包括 引用、指針、迭代器）指向對象內部（以增加封裝性、使 const 成員函數的行為更像 const、降低 “虛吊號碼牌”（dangling handles，如懸空指針等）的可能性）
29.  為 “異常安全” 而努力是值得的（異常安全函數（Exception-safe functions）即使發生異常也不會洩露資源或允許任何資料結構敗壞，分為三種可能的保證：基本型、強列型、不拋異常型）
30.  透徹瞭解 inlining 的里奇外外（inlining 在大多數 C++ 程序中是編譯期的行為；inline 函數是否真正 inline，取決於編譯器；大部分編譯器拒絕太過複雜（如帶有循環或遞迴）的函數 inlining，而所有對 virtual 函數的呼叫（除非是最平淡無奇的）也都會使 inlining 落空；inline 造成的程式碼膨脹可能帶來效率損失；inline 函數無法隨著程序庫的升級而升級）
31.  將檔案間的編譯依存關係降至最低（如果使用 object references 或 object pointers 可以完成任務，就不要使用 objects；如果能夠，儘量以 class 聲明式替換 class 定義式；為聲明式和定義式提供不同的標頭檔）
32.  確定你的 public 繼承塑模出 is-a（是一種）關係（適用於 base classes 身上的每一件事情一定適用於 derived classes 身上，因為每一個 derived class 對象也都是一個 base class 對象）
33.  避免遮掩繼承而來的名字（可使用 using 聲明式或轉交函數（forwarding functions）來讓被遮掩的名字再見天日）
34.  區分介面繼承和實現繼承（在 public 繼承之下，derived classes 總是繼承 base class 的介面；pure virtual 函數隻具體指定介面繼承；非純 impure virtual 函數具體指定介面繼承及預設實現繼承；non-virtual 函數具體指定介面繼承以及強制性實現繼承）
35.  考慮 virtual 函數以外的其他選擇（如 Template Method 設計模式的 non-virtual interface（NVI）手法，將 virtual 函數取代為 “函數指針成員變數”，以 `tr1::function` 成員變數替換 virtual 函數，將繼承體系內的 virtual 函數取代為另一個繼承體系內的 virtual 函數）
36.  絕不重新定義繼承而來的 non-virtual 函數
37.  絕不重新定義繼承而來的預設參數值，因為預設參數值是靜態繫結（statically bound），而 virtual 函數卻是動態繫結（dynamically bound）
38.  通過復合塑模 has-a（有一個）或 “根據某物實現出”（在應用域（application domain），復合意味 has-a（有一個）；在實現域（implementation domain），復合意味著 is-implemented-in-terms-of（根據某物實現出））
39.  明智而審慎地使用 private 繼承（private 繼承意味著 is-implemented-in-terms-of（根據某物實現出），儘可能使用復合，當 derived class 需要訪問 protected base class 的成員，或需要重新定義繼承而來的時候 virtual 函數，或需要 empty base 最佳化時，才使用 private 繼承）
40.  明智而審慎地使用多重繼承（多繼承比單一繼承複雜，可能導致新的歧義性，以及對 virtual 繼承的需要，但確有正當用途，如 “public 繼承某個 interface class” 和 “private 繼承某個協助實現的 class”；virtual 繼承可解決多繼承下菱形繼承的二義性問題，但會增加大小、速度、初始化及賦值的複雜度等等成本）
41.  瞭解隱式介面和編譯期多型（class 和 templates 都支援介面（interfaces）和多型（polymorphism）；class 的介面是以簽名為中心的顯式的（explicit），多型則是通過 virtual 函數發生於運行期；template 的介面是奠基於有效表示式的隱式的（implicit），多型則是通過 template 具現化和函數多載解析（function overloading resolution）發生於編譯期）
42.  瞭解 typename 的雙重意義（聲明 template 類型參數是，前綴關鍵字 class 和 typename 的意義完全相同；請使用關鍵字 typename 標識巢狀從屬類型名稱，但不得在基類列（base class lists）或成員初值列（member initialization list）內以它作為 base class 修飾符）
43.  學習處理範本化基類內的名稱（可在 derived class templates 內通過 `this->` 指涉 base class templates 內的成員名稱，或藉由一個明白寫出的 “base class 資格修飾符” 完成）
44.  將與參數無關的程式碼抽離 templates（因類型範本參數（non-type template parameters）而造成程式碼膨脹往往可以通過函數參數或 class 成員變數替換 template 參數來消除；因類型參數（type parameters）而造成的程式碼膨脹往往可以通過讓帶有完全相同二進製表述（binary representations）的實現類型（instantiation types）共享實現碼）
45.  運用成員函數範本接受所有相容類型（請使用成員函數範本（member function templates）生成 “可接受所有相容類型” 的函數；聲明 member templates 用於 “泛化 copy 構造” 或 “泛化 assignment 操作” 時還需要聲明正常的 copy 建構函式和 copy assignment 運算子）
46.  需要類型轉換時請為範本定義非成員函數（當我們編寫一個 class template，而它所提供之 “與此 template 相關的” 函數支援 “所有參數之隱式類型轉換” 時，請將那些函數定義為 “class template 內部的 friend 函數”）
47.  請使用 traits classes 表現類型資訊（traits classes 通過 templates 和 “templates 特化” 使得 “類型相關資訊” 在編譯期可用，通過多載技術（overloading）實現在編譯期對類型執行 if...else 測試）
48.  認識 template 元程式設計（範本元程式設計（TMP，template metaprogramming）可將工作由運行期移往編譯期，因此得以實現早期錯誤偵測和更高的執行效率；TMP 可被用來生成 “給予政策選擇組合”（based on combinations of policy choices）的客戶定製程式碼，也可用來避免生成對某些特殊類型並不適合的程式碼）
49.  瞭解 new-handler 的行為（set\_new\_handler 允許客戶指定一個在記憶體分配無法獲得滿足時被呼叫的函數；nothrow new 是一個頗具侷限的工具，因為它只適用於記憶體分配（operator new），後繼的建構函式呼叫還是可能拋出異常）
50.  瞭解 new 和 delete 的合理替換時機（為了檢測運用錯誤、收集動態分配記憶體之使用統計資訊、增加分配和歸還速度、降低預設記憶體管理器帶來的空間額外開銷、彌補預設分配器中的非最佳齊位、將相關對象成簇集中、獲得非傳統的行為）
51.  編寫 new 和 delete 時需固守常規（operator new 應該內涵一個無窮循環，並在其中嘗試分配記憶體，如果它無法滿足記憶體需求，就應該呼叫 new-handler，它也應該有能力處理 0 bytes 申請，class 專屬版本則還應該處理 “比正確大小更大的（錯誤）申請”；operator delete 應該在收到 null 指針時不做任何事，class 專屬版本則還應該處理 “比正確大小更大的（錯誤）申請”）
52.  寫了 placement new 也要寫 placement delete（當你寫一個 placement operator new，請確定也寫出了對應的 placement operator delete，否則可能會發生隱微而時斷時續的記憶體洩漏；當你聲明 placement new 和 placement delete，請確定不要無意識（非故意）地遮掩了它們地正常版本）
53.  不要輕忽編譯器的警告
54.  讓自己熟悉包括 TR1 在內的標準程序庫（TR1，C++ Technical Report 1，C++11 標準的草稿檔案）
55.  讓自己熟悉 Boost（准標準庫）

### More Effective c++

1.  仔細區別 pointers 和 references（當你知道你需要指向某個東西，而且絕不會改變指向其他東西，或是當你實現一個運算子而其語法需求無法由 pointers 達成，你就應該選擇 references；任何其他時候，請採用 pointers）
2.  最好使用 C++ 轉型運算子（`static_cast`、`const_cast`、`dynamic_cast`、`reinterpret_cast`）
3.  絕不要以多型（polymorphically）方式處理陣列（多型（polymorphism）和指針算術不能混用；陣列對象幾乎總是會涉及指針的算術運算，所以陣列和多型不要混用）
4.  非必要不提供 default constructor（避免對象中的欄位被無意義地初始化）
5.  對定製的 “類型轉換函數” 保持警覺（單自變數 constructors 可通過簡易法（explicit 關鍵字）或代理類（proxy classes）來避免編譯器誤用；隱式類型轉換運算子可改為顯式的 member function 來避免非預期行為）
6.  區別 increment/decrement 運算子的前置（prefix）和後置（postfix）形式（前置式累加後取出，返回一個 reference；後置式取出後累加，返回一個 const 對象；處理使用者定製類型時，應該儘可能使用前置式 increment；後置式的實現應以其前置式兄弟為基礎）
7.  千萬不要多載 `&&`，`||` 和 `,` 運算子（`&&` 與 `||` 的多載會用 “函數呼叫語義” 取代 “驟死式語義”；`,` 的多載導致不能保證左側表示式一定比右側表示式更早被評估）
8.  瞭解各種不同意義的 new 和 delete（`new operator`、`operator new`、`placement new`、`operator new[]`；`delete operator`、`operator delete`、`destructor`、`operator delete[]`）
9.  利用 destructors 避免洩漏資源（在 destructors 釋放資源可以避免異常時的資源洩漏）
10.  在 constructors 內阻止資源洩漏（由於 C++ 只會析構已構造完成的對象，因此在建構函式可以使用 try...catch 或者 auto\_ptr（以及與之相似的 classes） 處理異常時資源洩露問題）
11.  禁止異常流出 destructors 之外（原因：一、避免 terminate 函數在 exception 傳播過程的棧展開（stack-unwinding）機制種被呼叫；二、協助確保 destructors 完成其應該完成的所有事情）
12.  瞭解 “拋出一個 exception” 與 “傳遞一個參數” 或 “呼叫一個虛擬函式” 之間的差異（第一，exception objects 總是會被覆制（by pointer 除外），如果以 by value 方式捕捉甚至被覆制兩次，而傳遞給函數參數的對象則不一定得複製；第二，“被拋出成為 exceptions” 的對象，其被允許的類型轉換動作比 “被傳遞到函數去” 的對象少；第三，catch 子句以其 “出現於原始碼的順序” 被編譯器檢驗對比，其中第一個匹配成功者便執行，而呼叫一個虛擬函式，被選中執行的是那個 “與對象類型最佳吻合” 的函數）
13.  以 by reference 方式捕獲 exceptions（可避免對象刪除問題、exception objects 的切割問題，可保留捕捉標準 exceptions 的能力，可約束 exception object 需要複製的次數）
14.  明智運用 exception specifications（exception specifications 對 “函數希望拋出什麼樣的 exceptions” 提供了卓越的說明；也有一些缺點，包括編譯器只對它們做局部性檢驗而很容易不經意地違反，與可能會妨礙更上層的 exception 處理函數處理未預期的 exceptions）
15.  瞭解異常處理的成本（粗略估計，如果使用 try 語句塊，程式碼大約整體膨脹 5%-10%，執行速度亦大約下降這個數；因此請將你對 try 語句塊和 exception specifications 的使用限制於非用不可的地點，並且在真正異常的情況下才拋出 exceptions）
16.  謹記 80-20 法則（軟體的整體性能幾乎總是由其構成要素（程式碼）的一小部分決定的，可使用程序分析器（program profiler）識別出消耗資源的程式碼）
17.  考慮使用 lazy evaluation（緩式評估）（可應用於：Reference Counting（引用計數）來避免非必要的對象複製、區分 operator\[\] 的讀和寫動作來做不同的事情、Lazy Fetching（緩式取出）來避免非必要的資料庫讀取動作、Lazy Expression Evaluation（表示式緩評估）來避免非必要的數值計算動作）
18.  分期攤還預期的計算成本（當你必須支援某些運算而其結構幾乎總是被需要，或其結果常常被多次需要的時候，over-eager evaluation（超急評估）可以改善程序效率）

### Google C++ Style Guide

-   英文：[Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
-   中文：[C++ 風格指南](https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/contents/)

### 其他

-   [Bjarne Stroustrup 的常見問題](http://www.stroustrup.com/bs_faq.html)
-   [Bjarne Stroustrup 的 C++ 風格和技巧常見問題](http://www.stroustrup.com/bs_faq2.html)

## 📦 STL

### STL 索引

[STL 方法含義索引](https://github.com/huihut/interview/tree/master/STL)

### STL 容器

| 容器 | 底層資料結構 | 時間複雜度 | 有無序 | 可不可重複 | 其他 |
| --- | --- | --- | --- | --- | --- |
| [array](https://github.com/huihut/interview/tree/master/STL#array) | 陣列 | 隨機讀改 O(1) | 無序 | 可重複 | 支援隨機訪問 |
| [vector](https://github.com/huihut/interview/tree/master/STL#vector) | 陣列 | 隨機讀改、尾部插入、尾部刪除 O(1)  
頭部插入、頭部刪除 O(n) | 無序 | 可重複 | 支援隨機訪問 |
| [deque](https://github.com/huihut/interview/tree/master/STL#deque) | 雙端佇列 | 頭尾插入、頭尾刪除 O(1) | 無序 | 可重複 | 一個中央控製器 + 多個緩衝區，支援首尾快速增刪，支援隨機訪問 |
| [forward\_list](https://github.com/huihut/interview/tree/master/STL#forward_list) | 單向鏈表 | 插入、刪除 O(1) | 無序 | 可重複 | 不支援隨機訪問 |
| [list](https://github.com/huihut/interview/tree/master/STL#list) | 雙向鏈表 | 插入、刪除 O(1) | 無序 | 可重複 | 不支援隨機訪問 |
| [stack](https://github.com/huihut/interview/tree/master/STL#stack) | deque / list | 頂部插入、頂部刪除 O(1) | 無序 | 可重複 | deque 或 list 封閉頭端開口，不用 vector 的原因應該是容量大小有限制，擴容耗時 |
| [queue](https://github.com/huihut/interview/tree/master/STL#queue) | deque / list | 尾部插入、頭部刪除 O(1) | 無序 | 可重複 | deque 或 list 封閉頭端開口，不用 vector 的原因應該是容量大小有限制，擴容耗時 |
| [priority\_queue](https://github.com/huihut/interview/tree/master/STL#priority_queue) | vector + max-heap | 插入、刪除 O(log<sub>2</sub>n) | 有序 | 可重複 | vector容器+heap處理規則 |
| [set](https://github.com/huihut/interview/tree/master/STL#set) | 紅黑樹 | 插入、刪除、尋找 O(log<sub>2</sub>n) | 有序 | 不可重複 |  |
| [multiset](https://github.com/huihut/interview/tree/master/STL#multiset) | 紅黑樹 | 插入、刪除、尋找 O(log<sub>2</sub>n) | 有序 | 可重複 |  |
| [map](https://github.com/huihut/interview/tree/master/STL#map) | 紅黑樹 | 插入、刪除、尋找 O(log<sub>2</sub>n) | 有序 | 不可重複 |  |
| [multimap](https://github.com/huihut/interview/tree/master/STL#multimap) | 紅黑樹 | 插入、刪除、尋找 O(log<sub>2</sub>n) | 有序 | 可重複 |  |
| [unordered\_set](https://github.com/huihut/interview/tree/master/STL#unordered_set) | 雜湊表 | 插入、刪除、尋找 O(1) 最差 O(n) | 無序 | 不可重複 |  |
| [unordered\_multiset](https://github.com/huihut/interview/tree/master/STL#unordered_multiset) | 雜湊表 | 插入、刪除、尋找 O(1) 最差 O(n) | 無序 | 可重複 |  |
| [unordered\_map](https://github.com/huihut/interview/tree/master/STL#unordered_map) | 雜湊表 | 插入、刪除、尋找 O(1) 最差 O(n) | 無序 | 不可重複 |  |
| [unordered\_multimap](https://github.com/huihut/interview/tree/master/STL#unordered_multimap) | 雜湊表 | 插入、刪除、尋找 O(1) 最差 O(n) | 無序 | 可重複 |  |

### STL 演算法

| 演算法 | 底層演算法 | 時間複雜度 | 可不可重複 |
| --- | --- | --- | --- |
| [find](http://www.cplusplus.com/reference/algorithm/find/) | 順序尋找 | O(n) | 可重複 |
| [sort](https://github.com/gcc-mirror/gcc/blob/master/libstdc++-v3/include/bits/stl_algo.h#L4808) | [內省排序](https://en.wikipedia.org/wiki/Introsort) | O(n\*log<sub>2</sub>n) | 可重複 |

## 〽️ 資料結構

### 順序結構

#### 順序棧（Sequence Stack）

[SqStack.cpp](https://github.com/huihut/interview/blob/master/DataStructure/SqStack.cpp)

順序棧資料結構和圖片

```c
typedef struct {
ElemType *elem;
int top;
int size;
int increment;
} SqStack;
```

[![](https://camo.githubusercontent.com/d50b9e7185747a5da71b6e785d59db086d142b895b164c97e1fe46b77e8e218b/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5371537461636b2e706e67)](https://camo.githubusercontent.com/d50b9e7185747a5da71b6e785d59db086d142b895b164c97e1fe46b77e8e218b/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5371537461636b2e706e67)

#### 佇列（Sequence Queue）

佇列資料結構

```c
typedef struct {
ElemType * elem;
int front;
int rear;
int maxSize;
}SqQueue;
```

##### 非循環佇列

非循環佇列圖片

[![](https://camo.githubusercontent.com/c785f40ef8d3e548fa6ab58e9be1346d8b4602a1fbfa353d379efbc6cfce13fc/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f537151756575652e706e67)](https://camo.githubusercontent.com/c785f40ef8d3e548fa6ab58e9be1346d8b4602a1fbfa353d379efbc6cfce13fc/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f537151756575652e706e67)

`SqQueue.rear++`

##### 循環佇列

循環佇列圖片

[![](https://camo.githubusercontent.com/081dbec06f9f696f00d4d591a28e1b4ccbaa1cf688251af48c1584dbb1837da6/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f53714c6f6f70537461636b2e706e67)](https://camo.githubusercontent.com/081dbec06f9f696f00d4d591a28e1b4ccbaa1cf688251af48c1584dbb1837da6/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f53714c6f6f70537461636b2e706e67)

`SqQueue.rear = (SqQueue.rear + 1) % SqQueue.maxSize`

#### 順序表（Sequence List）

[SqList.cpp](https://github.com/huihut/interview/blob/master/DataStructure/SqList.cpp)

順序表資料結構和圖片

```c
typedef struct {
ElemType *elem;
int length;
int size;
int increment;
} SqList;
```

[![](https://camo.githubusercontent.com/19af465e1eb4dbc7c7a2971cb4573023475b230308b4c3258f94f6f3cfb958ea/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f53714c6973742e706e67)](https://camo.githubusercontent.com/19af465e1eb4dbc7c7a2971cb4573023475b230308b4c3258f94f6f3cfb958ea/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f53714c6973742e706e67)

### 鏈式結構

[LinkList.cpp](https://github.com/huihut/interview/blob/master/DataStructure/LinkList.cpp)

[LinkList\_with\_head.cpp](https://github.com/huihut/interview/blob/master/DataStructure/LinkList_with_head.cpp)

鏈式資料結構

```c
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList; 
```

#### 鏈佇列（Link Queue）

鏈佇列圖片

[![](https://camo.githubusercontent.com/0e1f9ef6eb179d5580130242ac164ade2dbe6f038c6696153927ef51098a54d0/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4c696e6b51756575652e706e67)](https://camo.githubusercontent.com/0e1f9ef6eb179d5580130242ac164ade2dbe6f038c6696153927ef51098a54d0/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4c696e6b51756575652e706e67)

#### 線性表的鏈式表示

##### 單鏈表（Link List）

單鏈表圖片

[![](https://camo.githubusercontent.com/e638596bd6ba6c73a5f3e1c8e3039d61f943672b3d9a21ac837749357c76d1e1/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4c696e6b4c6973742e706e67)](https://camo.githubusercontent.com/e638596bd6ba6c73a5f3e1c8e3039d61f943672b3d9a21ac837749357c76d1e1/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4c696e6b4c6973742e706e67)

##### 雙向鏈表（Du-Link-List）

雙向鏈表圖片

[![](https://camo.githubusercontent.com/d18741503c3f21ae3310e5f5244afdcda251deb24b0203b351f932b3472e70a4/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f44754c696e6b4c6973742e706e67)](https://camo.githubusercontent.com/d18741503c3f21ae3310e5f5244afdcda251deb24b0203b351f932b3472e70a4/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f44754c696e6b4c6973742e706e67)

##### 循環鏈表（Cir-Link-List）

循環鏈表圖片

[![](https://camo.githubusercontent.com/db320b1b19128af592488f32ff87e48e39ee1db65d0717961647960397826c33/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4369724c696e6b4c6973742e706e67)](https://camo.githubusercontent.com/db320b1b19128af592488f32ff87e48e39ee1db65d0717961647960397826c33/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4369724c696e6b4c6973742e706e67)

### 雜湊表

[HashTable.cpp](https://github.com/huihut/interview/blob/master/DataStructure/HashTable.cpp)

#### 概念

雜湊函數：`H(key): K -> D , key ∈ K`

#### 構造方法

-   直接定址法
-   除留餘數法
-   數字分析法
-   摺疊法
-   平方取中法

#### 衝突處理方法

-   鏈地址法：key 相同的用單鏈錶鏈接
-   開放定址法
    -   線性探測法：key 相同 -> 放到 key 的下一個位置，`Hi = (H(key) + i) % m`
    -   二次探測法：key 相同 -> 放到 `Di = 1^2, -1^2, ..., ±（k)^2,(k<=m/2）`
    -   隨機探測法：`H = (H(key) + 偽隨機數) % m`

#### 線性探測的雜湊表資料結構

線性探測的雜湊表資料結構和圖片

```c
typedef char KeyType;

typedef struct {
KeyType key;
}RcdType;

typedef struct {
RcdType *rcd;
int size;
int count;
bool *tag;
}HashTable;
```

[![](https://camo.githubusercontent.com/16e447825a409675b525bc6b4855ef585db0b67227db0a0783427ff642c9891d/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f486173685461626c652e706e67)](https://camo.githubusercontent.com/16e447825a409675b525bc6b4855ef585db0b67227db0a0783427ff642c9891d/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f486173685461626c652e706e67)

### 遞迴

#### 概念

函數直接或間接地呼叫自身

#### 遞迴與分治

-   分治法
    -   問題的分解
    -   問題規模的分解
-   折半尋找（遞迴）
-   歸併排序（遞迴）
-   快速排序（遞迴）

#### 遞迴與迭代

-   迭代：反覆利用變數舊值推出新值
-   折半尋找（迭代）
-   歸併排序（迭代）

#### 廣義表

##### 頭尾鏈表儲存表示

廣義表的頭尾鏈表儲存表示和圖片

```c
// 廣義表的頭尾鏈表儲存表示
typedef enum {ATOM, LIST} ElemTag;
// ATOM==0：原子，LIST==1：子表
typedef struct GLNode {
    ElemTag tag;
    // 公共部分，用於區分原子結點和表結點
    union {
        // 原子結點和表結點的聯合部分
        AtomType atom;
        // atom 是原子結點的值域，AtomType 由使用者定義
        struct {
            struct GLNode *hp, *tp;
        } ptr;
        // ptr 是表結點的指針域，prt.hp 和 ptr.tp 分別指向表頭和表尾
    } a;
} *GList, GLNode;
```

[![](https://camo.githubusercontent.com/e51730f2511a4d5e513a6021d3e21edfef2ed573c743cc2e8a2d0a4cc093679a/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f47656e6572616c697a65644c697374312e706e67)](https://camo.githubusercontent.com/e51730f2511a4d5e513a6021d3e21edfef2ed573c743cc2e8a2d0a4cc093679a/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f47656e6572616c697a65644c697374312e706e67)

##### 擴展線性鏈表儲存表示

擴展線性鏈表儲存表示和圖片

```c
// 廣義表的擴展線性鏈表儲存表示
typedef enum {ATOM, LIST} ElemTag;
// ATOM==0：原子，LIST==1：子表
typedef struct GLNode1 {
    ElemTag tag;
    // 公共部分，用於區分原子結點和表結點
    union {
        // 原子結點和表結點的聯合部分
        AtomType atom; // 原子結點的值域
        struct GLNode1 *hp; // 表結點的表頭指針
    } a;
    struct GLNode1 *tp;
    // 相當於線性鏈表的 next，指向下一個元素結點
} *GList1, GLNode1;
```

[![](https://camo.githubusercontent.com/1d8950c5eb98417e93f87f9630442845bad7da242c1168a56843c9058ff6a04a/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f47656e6572616c697a65644c697374322e706e67)](https://camo.githubusercontent.com/1d8950c5eb98417e93f87f9630442845bad7da242c1168a56843c9058ff6a04a/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f47656e6572616c697a65644c697374322e706e67)

### 二元樹

[BinaryTree.cpp](https://github.com/huihut/interview/blob/master/DataStructure/BinaryTree.cpp)

#### 性質

1.  非空二元樹第 i 層最多 2<sup>(i-1)</sup> 個結點 （i >= 1）
2.  深度為 k 的二元樹最多 2<sup>k</sup> - 1 個結點 （k >= 1）
3.  度為 0 的結點數為 n<sub>0</sub>，度為 2 的結點數為 n<sub>2</sub>，則 n<sub>0</sub> = n<sub>2</sub> + 1
4.  有 n 個結點的完全二元樹深度 k = ⌊ log<sub>2</sub>(n) ⌋ + 1
5.  對於含 n 個結點的完全二元樹中編號為 i （1 <= i <= n） 的結點
    1.  若 i = 1，為根，否則雙親為 ⌊ i / 2 ⌋
    2.  若 2i > n，則 i 結點沒有左孩子，否則孩子編號為 2i
    3.  若 2i + 1 > n，則 i 結點沒有右孩子，否則孩子編號為 2i + 1

#### 儲存結構

二元樹資料結構

```c
typedef struct BiTNode
{
    TElemType data;
    struct BiTNode *lchild, *rchild;
}BiTNode, *BiTree;
```

##### 順序儲存

二元樹順序儲存圖片

[![](https://camo.githubusercontent.com/b7d8385824a82bb2b5aff26623118438005d9b30fafd649cf2b31c10ccd83278/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f537142696e617279547265652e706e67)](https://camo.githubusercontent.com/b7d8385824a82bb2b5aff26623118438005d9b30fafd649cf2b31c10ccd83278/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f537142696e617279547265652e706e67)

##### 鏈式儲存

二元樹鏈式儲存圖片

[![](https://camo.githubusercontent.com/b6033f4347bfd57e411667876e8f601d12577dabe6dc69b7aedb50557c22123b/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4c696e6b42696e617279547265652e706e67)](https://camo.githubusercontent.com/b6033f4347bfd57e411667876e8f601d12577dabe6dc69b7aedb50557c22123b/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4c696e6b42696e617279547265652e706e67)

#### 遍歷方式

-   先序遍歷
-   中序遍歷
-   後續遍歷
-   層次遍歷

#### 分類

-   滿二元樹
-   完全二元樹（堆）
    -   大頂堆：根 >= 左 && 根 >= 右
    -   小頂堆：根 <= 左 && 根 <= 右
-   二叉尋找樹（二叉排序樹）：左 < 根 < 右
-   平衡二元樹（AVL樹）：| 左子樹樹高 - 右子樹樹高 | <= 1
-   最小失衡樹：平衡二元樹插入新結點導致失衡的子樹：調整：
    -   LL型：根的左孩子右旋
    -   RR型：根的右孩子左旋
    -   LR型：根的左孩子左旋，再右旋
    -   RL型：右孩子的左子樹，先右旋，再左旋

### 其他樹及森林

#### 樹的儲存結構

-   雙親表示法
-   雙親孩子表示法
-   孩子兄弟表示法

#### 並查集

一種不相交的子集所構成的集合 S = {S1, S2, ..., Sn}

#### 平衡二元樹（AVL樹）

##### 性質

-   | 左子樹樹高 - 右子樹樹高 | <= 1
-   平衡二元樹必定是二叉搜尋樹，反之則不一定
-   最小二叉平衡樹的節點的公式：`F(n)=F(n-1)+F(n-2)+1` （1 是根節點，F(n-1) 是左子樹的節點數量，F(n-2) 是右子樹的節點數量）

平衡二元樹圖片

[![](https://camo.githubusercontent.com/5516caf28c3a94dd527a7c087361fbbc7337a04b0cb85be36f135907e6810010/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f53656c662d62616c616e63696e6742696e617279536561726368547265652e706e67)](https://camo.githubusercontent.com/5516caf28c3a94dd527a7c087361fbbc7337a04b0cb85be36f135907e6810010/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f53656c662d62616c616e63696e6742696e617279536561726368547265652e706e67)

##### 最小失衡樹

平衡二元樹插入新結點導致失衡的子樹

調整：

-   LL 型：根的左孩子右旋
-   RR 型：根的右孩子左旋
-   LR 型：根的左孩子左旋，再右旋
-   RL 型：右孩子的左子樹，先右旋，再左旋

#### 紅黑樹

[RedBlackTree.cpp](https://github.com/huihut/interview/blob/master/DataStructure/RedBlackTree.cpp)

##### 紅黑樹的特徵是什麼？

1.  節點是紅色或黑色。
2.  根是黑色。
3.  所有葉子都是黑色（葉子是 NIL 節點）。
4.  每個紅色節點必須有兩個黑色的子節點。（從每個葉子到根的所有路徑上不能有兩個連續的紅色節點。）（新增節點的父節點必須相同）
5.  從任一節點到其每個葉子的所有簡單路徑都包含相同數目的黑色節點。（新增節點必須為紅）

##### 調整

1.  變色
2.  左旋
3.  右旋

##### 應用

-   關聯陣列：如 STL 中的 map、set

##### 紅黑樹、B 樹、B+ 樹的區別？

-   紅黑樹的深度比較大，而 B 樹和 B+ 樹的深度則相對要小一些
-   B+ 樹則將資料都保存在葉子節點，同時通過鏈表的形式將他們連接在一起。

#### B 樹（B-tree）、B+ 樹（B+-tree）

B 樹、B+ 樹圖片

[![B 樹（B-tree）、B+ 樹（B+-tree）](https://camo.githubusercontent.com/5647969911d5ed0242a7c52f12d30ed7ee2eb9074004376b96e226226d432759/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f6c365579462e706e67)](https://camo.githubusercontent.com/5647969911d5ed0242a7c52f12d30ed7ee2eb9074004376b96e226226d432759/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f6c365579462e706e67)

##### 特點

-   一般化的二叉尋找樹（binary search tree）
-   “矮胖”，內部（非葉子）節點可以擁有可變數量的子節點（數量範圍預先定義好）

##### 應用

-   大部分檔案系統、資料庫系統都採用B樹、B+樹作為索引結構

##### 區別

-   B+樹中只有葉子節點會帶有指向記錄的指針（ROWID），而B樹則所有節點都帶有，在內部節點出現的索引項不會再出現在葉子節點中。
-   B+樹中所有葉子節點都是通過指針連接在一起，而B樹不會。

##### B樹的優點

對於在內部節點的資料，可直接得到，不必根據葉子節點來定位。

##### B+樹的優點

-   非葉子節點不會帶上 ROWID，這樣，一個塊中可以容納更多的索引項，一是可以降低樹的高度。二是一個內部節點可以定位更多的葉子節點。
-   葉子節點之間通過指針來連接，範圍掃描將十分簡單，而對於B樹來說，則需要在葉子節點和內部節點不停的往返移動。

> B 樹、B+ 樹區別來自：[differences-between-b-trees-and-b-trees](https://stackoverflow.com/questions/870218/differences-between-b-trees-and-b-trees)、[B樹和B+樹的區別](https://www.cnblogs.com/ivictor/p/5849061.html)

#### 八叉樹

八叉樹圖片

[![](https://camo.githubusercontent.com/5af6d02aa14a45f9d74646922e0e52a5af1fb817a6db0bda1fc9610defdada64/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f332f33352f4f6374726565322e706e672f34303070782d4f6374726565322e706e67)](https://camo.githubusercontent.com/5af6d02aa14a45f9d74646922e0e52a5af1fb817a6db0bda1fc9610defdada64/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f332f33352f4f6374726565322e706e672f34303070782d4f6374726565322e706e67)

八叉樹（octree），或稱八元樹，是一種用於描述三維空間（劃分空間）的樹狀資料結構。八叉樹的每個節點表示一個正方體的體積元素，每個節點有八個子節點，這八個子節點所表示的體積元素加在一起就等於父節點的體積。一般中心點作為節點的分叉中心。

##### 用途

-   三維電腦圖形
-   最鄰近搜尋

## ⚡️ 演算法

### 排序

| 排序演算法 | 平均時間複雜度 | 最差時間複雜度 | 空間複雜度 | 資料對象穩定性 |
| --- | --- | --- | --- | --- |
| [泡沫排序](https://github.com/huihut/interview/blob/master/Algorithm/BubbleSort.h) | O(n<sup>2</sup>) | O(n<sup>2</sup>) | O(1) | 穩定 |
| [選擇排序](https://github.com/huihut/interview/blob/master/Algorithm/SelectionSort.h) | O(n<sup>2</sup>) | O(n<sup>2</sup>) | O(1) | 陣列不穩定、鏈表穩定 |
| [插入排序](https://github.com/huihut/interview/blob/master/Algorithm/InsertSort.h) | O(n<sup>2</sup>) | O(n<sup>2</sup>) | O(1) | 穩定 |
| [快速排序](https://github.com/huihut/interview/blob/master/Algorithm/QuickSort.h) | O(n\*log<sub>2</sub>n) | O(n<sup>2</sup>) | O(log<sub>2</sub>n) | 不穩定 |
| [堆排序](https://github.com/huihut/interview/blob/master/Algorithm/HeapSort.cpp) | O(n\*log<sub>2</sub>n) | O(n\*log<sub>2</sub>n) | O(1) | 不穩定 |
| [歸併排序](https://github.com/huihut/interview/blob/master/Algorithm/MergeSort.h) | O(n\*log<sub>2</sub>n) | O(n\*log<sub>2</sub>n) | O(n) | 穩定 |
| [希爾排序](https://github.com/huihut/interview/blob/master/Algorithm/ShellSort.h) | O(n\*log<sup>2</sup>n) | O(n<sup>2</sup>) | O(1) | 不穩定 |
| [計數排序](https://github.com/huihut/interview/blob/master/Algorithm/CountSort.cpp) | O(n+m) | O(n+m) | O(n+m) | 穩定 |
| [桶排序](https://github.com/huihut/interview/blob/master/Algorithm/BucketSort.cpp) | O(n) | O(n) | O(m) | 穩定 |
| [基數排序](https://github.com/huihut/interview/blob/master/Algorithm/RadixSort.h) | O(k\*n) | O(n<sup>2</sup>) |  | 穩定 |

> -   均按從小到大排列
> -   k：代表數值中的 “數位” 個數
> -   n：代表資料規模
> -   m：代表資料的最大值減最小值
> -   來自：[wikipedia . 排序演算法](https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)

### 尋找

| 尋找演算法 | 平均時間複雜度 | 空間複雜度 | 尋找條件 |
| --- | --- | --- | --- |
| [順序尋找](https://github.com/huihut/interview/blob/master/Algorithm/SequentialSearch.h) | O(n) | O(1) | 無序或有序 |
| [二分尋找（折半尋找）](https://github.com/huihut/interview/blob/master/Algorithm/BinarySearch.h) | O(log<sub>2</sub>n) | O(1) | 有序 |
| [插值尋找](https://github.com/huihut/interview/blob/master/Algorithm/InsertionSearch.h) | O(log<sub>2</sub>(log<sub>2</sub>n)) | O(1) | 有序 |
| [斐波那契尋找](https://github.com/huihut/interview/blob/master/Algorithm/FibonacciSearch.cpp) | O(log<sub>2</sub>n) | O(1) | 有序 |
| [雜湊尋找](https://github.com/huihut/interview/blob/master/DataStructure/HashTable.cpp) | O(1) | O(n) | 無序或有序 |
| [二叉尋找樹（二叉搜尋樹尋找）](https://github.com/huihut/interview/blob/master/Algorithm/BSTSearch.h) | O(log<sub>2</sub>n) |  |  |
| [紅黑樹](https://github.com/huihut/interview/blob/master/DataStructure/RedBlackTree.cpp) | O(log<sub>2</sub>n) |  |  |
| 2-3樹 | O(log<sub>2</sub>n - log<sub>3</sub>n) |  |  |
| B樹/B+樹 | O(log<sub>2</sub>n) |  |  |

### 圖搜尋演算法

| 圖搜尋演算法 | 資料結構 | 遍歷時間複雜度 | 空間複雜度 |
| --- | --- | --- | --- |
| [BFS廣度優先搜尋](https://zh.wikipedia.org/wiki/%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2) | 鄰接矩陣  
鄰接鏈表 | O(|v|<sup>2</sup>)  
O(|v|+|E|) | O(|v|<sup>2</sup>)  
O(|v|+|E|) |
| [DFS深度優先搜尋](https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2) | 鄰接矩陣  
鄰接鏈表 | O(|v|<sup>2</sup>)  
O(|v|+|E|) | O(|v|<sup>2</sup>)  
O(|v|+|E|) |

### 其他演算法

| 演算法 | 思想 | 應用 |
| --- | --- | --- |
| [分治法](https://zh.wikipedia.org/wiki/%E5%88%86%E6%B2%BB%E6%B3%95) | 把一個複雜的問題分成兩個或更多的相同或相似的子問題，直到最後子問題可以簡單的直接求解，原問題的解即子問題的解的合併 | [循環賽日程安排問題](https://github.com/huihut/interview/tree/master/Problems/RoundRobinProblem)、排序演算法（快速排序、歸併排序） |
| [動態規劃](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92) | 通過把原問題分解為相對簡單的子問題的方式求解複雜問題的方法，適用於有重疊子問題和最優子結構性質的問題 | [背包問題](https://github.com/huihut/interview/tree/master/Problems/KnapsackProblem)、斐波那契數列 |
| [貪心法](https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E6%B3%95) | 一種在每一步選擇中都採取在當前狀態下最好或最優（即最有利）的選擇，從而希望導致結果是最好或最優的演算法 | 旅行推銷員問題（最短路徑問題）、最小生成樹、哈夫曼編碼 |

## ❓ Problems

### Single Problem

-   [Chessboard Coverage Problem（棋盤覆蓋問題）](https://github.com/huihut/interview/blob/master/Problems/ChessboardCoverageProblem)
-   [Knapsack Problem（背包問題）](https://github.com/huihut/interview/blob/master/Problems/KnapsackProblem)
-   [Neumann Neighbor Problem（馮諾依曼鄰居問題）](https://github.com/huihut/interview/blob/master/Problems/NeumannNeighborProblem)
-   [Round Robin Problem（循環賽日程安排問題）](https://github.com/huihut/interview/blob/master/Problems/RoundRobinProblem)
-   [Tubing Problem（輸油管道問題）](https://github.com/huihut/interview/blob/master/Problems/TubingProblem)

### Leetcode Problems

-   [Github . haoel/leetcode](https://github.com/haoel/leetcode)
-   [Github . pezy/LeetCode](https://github.com/pezy/LeetCode)

### 劍指 Offer

-   [Github . zhedahht/CodingInterviewChinese2](https://github.com/zhedahht/CodingInterviewChinese2)
-   [Github . gatieme/CodingInterviews](https://github.com/gatieme/CodingInterviews)

### Cracking the Coding Interview 程式設計師面試金典

-   [Github . careercup/ctci](https://github.com/careercup/ctci)
-   [牛客網 . 程式設計師面試金典](https://www.nowcoder.com/ta/cracking-the-coding-interview)

### 牛客網

-   [牛客網 . 線上程式設計專題](https://www.nowcoder.com/activity/oj)

## 💻 作業系統

### 處理程序與執行緒

對於有執行緒系統：

-   處理程序是資源分配的獨立單位
-   執行緒是資源調度的獨立單位

對於無執行緒系統：

-   處理程序是資源調度、分配的獨立單位

#### 處理程序之間的通訊方式以及優缺點

-   管道（PIPE）
    -   有名管道：一種半雙工的通訊方式，它允許無親緣關係處理程序間的通訊
        -   優點：可以實現任意關係的處理程序間的通訊
        -   缺點：
            1.  長期存於系統中，使用不當容易出錯
            2.  緩衝區有限
    -   無名管道：一種半雙工的通訊方式，只能在具有親緣關係的處理程序間使用（父子處理程序）
        -   優點：簡單方便
        -   缺點：
            1.  侷限於單向通訊
            2.  只能建立在它的處理程序以及其有親緣關係的處理程序之間
            3.  緩衝區有限
-   訊號量（Semaphore）：一個計數器，可以用來控制多個執行緒對共享資源的訪問
    -   優點：可以同步處理程序
    -   缺點：訊號量有限
-   訊號（Signal）：一種比較複雜的通訊方式，用於通知接收處理程序某個事件已經發生
-   消息佇列（Message Queue）：是消息的鏈表，存放在核心中並由消息佇列識別碼標識
    -   優點：可以實現任意處理程序間的通訊，並通過系統呼叫函數來實現消息傳送和接收之間的同步，無需考慮同步問題，方便
    -   缺點：資訊的複製需要額外消耗 CPU 的時間，不適宜於資訊量大或操作頻繁的場合
-   共用記憶體（Shared Memory）：對應一段能被其他處理程序所訪問的記憶體，這段共用記憶體由一個處理程序建立，但多個處理程序都可以訪問
    -   優點：無須複製，快捷，資訊量大
    -   缺點：
        1.  通訊是通過將共享空間緩衝區直接附加到處理程序的虛擬地址空間中來實現的，因此處理程序間的讀寫操作的同步問題
        2.  利用記憶體緩衝區直接交換資訊，記憶體的實體存在於電腦中，只能同一個電腦系統中的諸多處理程序共享，不方便網路通訊
-   套接字（Socket）：可用於不同電腦間的處理程序通訊
    -   優點：
        1.  傳輸資料為位元組級，傳輸資料可自訂，資料量小效率高
        2.  傳輸資料時間短，性能高
        3.  適合於客戶端和伺服器端之間資訊即時互動
        4.  可以加密,資料安全性強
    -   缺點：需對傳輸的資料進行解析，轉化成應用級的資料。

#### 執行緒之間的通訊方式

-   鎖機制：包括互斥鎖/量（mutex）、讀寫鎖（reader-writer lock）、自旋鎖（spin lock）、條件變數（condition）
    -   互斥鎖/量（mutex）：提供了以排他方式防止資料結構被併發修改的方法。
    -   讀寫鎖（reader-writer lock）：允許多個執行緒同時讀共享資料，而對寫操作是互斥的。
    -   自旋鎖（spin lock）與互斥鎖類似，都是為了保護共享資源。互斥鎖是當資源被佔用，申請者進入睡眠狀態；而自旋鎖則循環檢測保持者是否已經釋放鎖。
    -   條件變數（condition）：可以以原子的方式阻塞處理程序，直到某個特定條件為真為止。對條件的測試是在互斥鎖的保護下進行的。條件變數始終與互斥鎖一起使用。
-   訊號量機制(Semaphore)
    -   無名執行緒訊號量
    -   命名執行緒訊號量
-   訊號機制(Signal)：類似處理程序間的訊號處理
-   屏障（barrier）：屏障允許每個執行緒等待，直到所有的合作執行緒都達到某一點，然後從該點繼續執行。

執行緒間的通訊目的主要是用於執行緒同步，所以執行緒沒有像處理程序通訊中的用於資料交換的通訊機制

> 處理程序之間的通訊方式以及優缺點來源於：[處理程序執行緒面試題總結](http://blog.csdn.net/wujiafei_njgcxy/article/details/77098977)

#### 處理程序之間私有和共享的資源

-   私有：地址空間、堆、全域變數、棧、暫存器
-   共享：程式碼段，公共資料，處理程序目錄，處理程序 ID

#### 執行緒之間私有和共享的資源

-   私有：執行緒棧，暫存器，程序計數器
-   共享：堆，地址空間，全域變數，靜態變數

#### 多處理程序與多執行緒間的對比、優劣與選擇

##### 對比

| 對比維度 | 多處理程序 | 多執行緒 | 總結 |
| --- | --- | --- | --- |
| 資料共享、同步 | 資料共享複雜，需要用 IPC；資料是分開的，同步簡單 | 因為共享處理程序資料，資料共享簡單，但也是因為這個原因導致同步複雜 | 各有優勢 |
| 記憶體、CPU | 佔用記憶體多，切換複雜，CPU 利用率低 | 佔用記憶體少，切換簡單，CPU 利用率高 | 執行緒佔優 |
| 建立銷毀、切換 | 建立銷毀、切換複雜，速度慢 | 建立銷毀、切換簡單，速度很快 | 執行緒佔優 |
| 程式設計、偵錯 | 程式設計簡單，偵錯簡單 | 程式設計複雜，偵錯複雜 | 處理程序佔優 |
| 可靠性 | 處理程序間不會互相影響 | 一個執行緒掛掉將導致整個處理程序掛掉 | 處理程序佔優 |
| 分佈式 | 適應於多核、多機分佈式；如果一台機器不夠，擴展到多台機器比較簡單 | 適應於多核分佈式 | 處理程序佔優 |

##### 優劣

| 優劣 | 多處理程序 | 多執行緒 |
| --- | --- | --- |
| 優點 | 程式設計、偵錯簡單，可靠性較高 | 建立、銷毀、切換速度快，記憶體、資源佔用小 |
| 缺點 | 建立、銷毀、切換速度慢，記憶體、資源佔用大 | 程式設計、偵錯複雜，可靠性較差 |

##### 選擇

-   需要頻繁建立銷毀的優先用執行緒
-   需要進行大量計算的優先使用執行緒
-   強相關的處理用執行緒，弱相關的處理用處理程序
-   可能要擴展到多機分佈的用處理程序，多核分佈的用執行緒
-   都滿足需求的情況下，用你最熟悉、最拿手的方式

> 多處理程序與多執行緒間的對比、優劣與選擇來自：[多執行緒還是多處理程序的選擇及區別](https://blog.csdn.net/lishenglong666/article/details/8557215)

### Linux 核心的同步方式

#### 原因

在現代作業系統裡，同一時間可能有多個核心執行流在執行，因此核心其實像多處理程序多執行緒程式設計一樣也需要一些同步機制來同步各執行單元對共享資料的訪問。尤其是在多處理器系統上，更需要一些同步機制來同步不同處理器上的執行單元對共享的資料的訪問。

#### 同步方式

-   原子操作
-   訊號量（semaphore）
-   讀寫訊號量（rw\_semaphore）
-   自旋鎖（spinlock）
-   大核心鎖（BKL，Big Kernel Lock）
-   讀寫鎖（rwlock）
-   大讀者鎖（brlock-Big Reader Lock）
-   讀-複製修改(RCU，Read-Copy Update)
-   順序鎖（seqlock）

> 來自：[Linux 核心的同步機制，第 1 部分](https://www.ibm.com/developerworks/cn/linux/l-synch/part1/)、[Linux 核心的同步機制，第 2 部分](https://www.ibm.com/developerworks/cn/linux/l-synch/part2/)

### 死鎖

#### 原因

-   系統資源不足
-   資源分配不當
-   處理程序運行推進順序不合適

#### 產生條件

-   互斥
-   請求和保持
-   不剝奪
-   環路

#### 預防

-   打破互斥條件：改造獨佔性資源為虛擬資源，大部分資源已無法改造。
-   打破不可搶佔條件：當一處理程序佔有一獨佔性資源後又申請一獨佔性資源而無法滿足，則退出原佔有的資源。
-   打破佔有且申請條件：採用資源預先分配策略，即處理程序運行前申請全部資源，滿足則運行，不然就等待，這樣就不會佔有且申請。
-   打破循環等待條件：實現資源有序分配策略，對所有裝置實現分類編號，所有處理程序只能採用按序號遞增的形式申請資源。
-   有序資源分配法
-   銀行家演算法

### 檔案系統

-   Windows：FCB 表 + FAT + 點陣圖
-   Unix：inode + 混合索引 + 成組連結

### 主機位元組序與網路位元組序

#### 主機位元組序（CPU 位元組序）

##### 概念

主機位元組序又叫 CPU 位元組序，其不是由作業系統決定的，而是由 CPU 指令集架構決定的。主機位元組序分為兩種：

-   大端位元組序（Big Endian）：高序位元組儲存在低位地址，低序位元組儲存在高位地址
-   小端位元組序（Little Endian）：高序位元組儲存在高位地址，低序位元組儲存在低位地址

##### 儲存方式

32 位整數 `0x12345678` 是從起始位置為 `0x00` 的地址開始存放，則：

| 記憶體地址 | 0x00 | 0x01 | 0x02 | 0x03 |
| --- | --- | --- | --- | --- |
| 大端 | 12 | 34 | 56 | 78 |
| 小端 | 78 | 56 | 34 | 12 |

大端小端圖片

[![大端序](https://camo.githubusercontent.com/21069c41cedafbfd85ed73109d8d384c4342a0cd0a9dad3a02e8c66ecf642325/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4350552d4269672d456e6469616e2e7376672e706e67)](https://camo.githubusercontent.com/21069c41cedafbfd85ed73109d8d384c4342a0cd0a9dad3a02e8c66ecf642325/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4350552d4269672d456e6469616e2e7376672e706e67) [![小端序](https://camo.githubusercontent.com/28dad22a05f9fff596df190dcb7b0c43db7a4df4cbaa1ca8dc1708c081027e46/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4350552d4c6974746c652d456e6469616e2e7376672e706e67)](https://camo.githubusercontent.com/28dad22a05f9fff596df190dcb7b0c43db7a4df4cbaa1ca8dc1708c081027e46/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f4350552d4c6974746c652d456e6469616e2e7376672e706e67)

##### 判斷大端小端

判斷大端小端

可以這樣判斷自己 CPU 位元組序是大端還是小端：

```c
#include <iostream>
using namespace std;

int main()
{
int i = 0x12345678;

if (*((char*)&i) == 0x12)
cout << "大端" << endl;
else
cout << "小端" << endl;

return 0;
}
```

##### 各架構處理器的位元組序

-   x86（Intel、AMD）、MOS Technology 6502、Z80、VAX、PDP-11 等處理器為小端序；
-   Motorola 6800、Motorola 68000、PowerPC 970、System/370、SPARC（除 V9 外）等處理器為大端序；
-   ARM（默認小端序）、PowerPC（除 PowerPC 970 外）、DEC Alpha、SPARC V9、MIPS、PA-RISC 及 IA64 的位元組序是可組態的。

#### 網路位元組序

網路位元組順序是 TCP/IP 中規定好的一種資料表示格式，它與具體的 CPU 類型、作業系統等無關，從而可以保證資料在不同主機之間傳輸時能夠被正確解釋。

網路位元組順序採用：大端（Big Endian）排列方式。

### 頁面置換演算法

在地址對應過程中，若在頁面中發現所要訪問的頁面不在記憶體中，則產生缺頁中斷。當發生缺頁中斷時，如果作業系統記憶體中沒有空閒頁面，則作業系統必須在記憶體選擇一個頁面將其移出記憶體，以便為即將調入的頁面讓出空間。而用來選擇淘汰哪一頁的規則叫做頁面置換演算法。

#### 分類

-   全域置換：在整個記憶體空間置換
-   局部置換：在本處理程序中進行置換

#### 演算法

全域：

-   工作集演算法
-   缺頁率置換演算法

局部：

-   最佳置換演算法（OPT）
-   先進先出置換演算法（FIFO）
-   最近最久未使用（LRU）演算法
-   時鐘（Clock）置換演算法

## ☁️ 電腦網路

> 本節部分知識點來自《電腦網路（第 7 版）》

電腦網路體系結構：

[![電腦網路體系結構](https://camo.githubusercontent.com/ae61b7eaf557549d449c8658c14fd8917c22242dcdb50325b164896a0d7a709e/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545382541452541312545372541452539372545362539432542412545372542442539312545372542422539432545342542442539332545372542332542422545372542422539332545362539452538342e706e67)](https://camo.githubusercontent.com/ae61b7eaf557549d449c8658c14fd8917c22242dcdb50325b164896a0d7a709e/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545382541452541312545372541452539372545362539432542412545372542442539312545372542422539432545342542442539332545372542332542422545372542422539332545362539452538342e706e67)

### 各層作用及協議

| 分層 | 作用 | 協議 |
| --- | --- | --- |
| 物理層 | 通過媒介傳輸位元，確定機械及電氣規範（位元 Bit） | RJ45、CLOCK、IEEE802.3（中繼器，集線器） |
| 資料鏈路層 | 將位元組裝成幀和點到點的傳遞（幀 Frame） | PPP、FR、HDLC、VLAN、MAC（網橋，交換機） |
| 網路層 | 負責封包從源到宿的傳遞和網際互連（包 Packet） | IP、ICMP、ARP、RARP、OSPF、IPX、RIP、IGRP（路由器） |
| 運輸層 | 提供端到端的可靠報文傳遞和錯誤恢復（ 段Segment） | TCP、UDP、SPX |
| 會話層 | 建立、管理和終止會話（會話協議資料單元 SPDU） | NFS、SQL、NETBIOS、RPC |
| 表示層 | 對資料進行翻譯、加密和壓縮（表示協議資料單元 PPDU） | JPEG、MPEG、ASII |
| 應用層 | 允許訪問OSI環境的手段（應用協議資料單元 APDU） | FTP、DNS、Telnet、SMTP、HTTP、WWW、NFS |

### 物理層

-   傳輸資料的單位：位元
-   資料傳輸系統：源系統（源點、傳送器） --> 傳輸系統 --> 目的系統（接收器、終點）

通道：

-   單向通道（單工通道）：只有一個方向通訊，沒有反方向互動，如廣播
-   雙向交替通訊（半雙工通訊）：通訊雙方都可發消息，但不能同時傳送或接收
-   雙向同時通訊（全雙工通訊）：通訊雙方可以同時傳送和接收資訊

通道復用技術：

-   頻分復用（FDM，Frequency Division Multiplexing）：不同使用者在不同頻帶，所用使用者在同樣時間佔用不同頻寬資源
-   分時多工（TDM，Time Division Multiplexing）：不同使用者在同一時間段的不同時間片，所有使用者在不同時間佔用同樣的頻頻寬度
-   波分復用（WDM，Wavelength Division Multiplexing）：光的頻分復用
-   碼分復用（CDM，Code Division Multiplexing）：不同使用者使用不同的碼，可以在同樣時間使用同樣頻帶通訊

### 資料鏈路層

主要通道：

-   點對點通道
-   廣播通道

#### 點對點通道

-   資料單元：幀

三個基本問題：

-   封裝成幀：把網路層的 IP 資料報封裝成幀，`SOH - 資料部分 - EOT`
-   透明傳輸：不管資料部分什麼字元，都能傳輸出去；可以通過位元組填充方法解決（衝突字元前加逸出字元）
-   差錯檢測：降低誤位元率（BER，Bit Error Rate），廣泛使用循環冗餘檢測（CRC，Cyclic Redundancy Check）

點對點協議（Point-to-Point Protocol）：

-   點對點協議（Point-to-Point Protocol）：使用者電腦和 ISP 通訊時所使用的協議

#### 廣播通道

廣播通訊：

-   硬體地址（實體位址、MAC 地址）
-   單播（unicast）幀（一對一）：收到的幀的 MAC 地址與本站的硬體地址相同
-   廣播（broadcast）幀（一對全體）：傳送給本區域網路上所有站點的幀
-   多播（multicast）幀（一對多）：傳送給本區域網路上一部分站點的幀

### 網路層

-   IP（Internet Protocol，網際協議）是為電腦網路相互連接進行通訊而設計的協議。
-   ARP（Address Resolution Protocol，地址解析協議）
-   ICMP（Internet Control Message Protocol，網際控制報文協議）
-   IGMP（Internet Group Management Protocol，網際組管理協議）

#### IP 網際協議

IP 地址分類：

-   `IP 地址 ::= {<網路號>,<主機號>}`

| IP 地址類別 | 網路號 | 網路範圍 | 主機號 | IP 地址範圍 |
| --- | --- | --- | --- | --- |
| A 類 | 8bit，第一位固定為 0 | 0 —— 127 | 24bit | 1.0.0.0 —— 127.255.255.255 |
| B 類 | 16bit，前兩位固定為 10 | 128.0 —— 191.255 | 16bit | 128.0.0.0 —— 191.255.255.255 |
| C 類 | 24bit，前三位固定為 110 | 192.0.0 —— 223.255.255 | 8bit | 192.0.0.0 —— 223.255.255.255 |
| D 類 | 前四位固定為 1110，後面為多播地址 |  |  |  |
| E 類 | 前五位固定為 11110，後面保留為今後所用 |  |  |  |

IP 資料報格式：

[![IP 資料報格式](https://camo.githubusercontent.com/799b183aec03158794a80c4080d145997e069856955856d710ece35dd2ff8a05/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f49502545362539352542302545362538442541452545362538412541352545362541302542432545352542432538462e706e67)](https://camo.githubusercontent.com/799b183aec03158794a80c4080d145997e069856955856d710ece35dd2ff8a05/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f49502545362539352542302545362538442541452545362538412541352545362541302542432545352542432538462e706e67)

#### ICMP 網際控制報文協議

ICMP 報文格式：

[![ICMP 報文格式](https://camo.githubusercontent.com/92eefdfa074b4631ea492bdebbc09d34c45df29e0c1f5977fb4bdbf8c28a0350/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f49434d502545362538412541352545362539362538372545362541302542432545352542432538462e706e67)](https://camo.githubusercontent.com/92eefdfa074b4631ea492bdebbc09d34c45df29e0c1f5977fb4bdbf8c28a0350/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f49434d502545362538412541352545362539362538372545362541302542432545352542432538462e706e67)

應用：

-   PING（Packet InterNet Groper，分組網間探測）測試兩個主機之間的連通性
-   TTL（Time To Live，生存時間）該欄位指定 IP 包被路由器丟棄之前允許通過的最大網段數量

#### 內部閘道器協議

-   RIP（Routing Information Protocol，路由資訊協議）
-   OSPF（Open Sortest Path First，開放最短路徑優先）

#### 外部閘道器協議

-   BGP（Border Gateway Protocol，邊界閘道器協議）

#### IP多播

-   IGMP（Internet Group Management Protocol，網際組管理協議）
-   多播路由選擇協議

#### VPN 和 NAT

-   VPN（Virtual Private Network，虛擬專用網）
-   NAT（Network Address Translation，網路地址轉換）

#### 路由表包含什麼？

1.  網路 ID（Network ID, Network number）：就是目標地址的網路 ID。
2.  子網掩碼（subnet mask）：用來判斷 IP 所屬網路
3.  下一跳地址/介面（Next hop / interface）：就是資料在傳送到目標地址的旅途中下一站的地址。其中 interface 指向 next hop（即為下一個 route）。一個自治系統（AS, Autonomous system）中的 route 應該包含區域內所有的子網路，而默認閘道器（Network id: `0.0.0.0`, Netmask: `0.0.0.0`）指向自治系統的出口。

根據應用和執行的不同，路由表可能含有如下附加資訊：

1.  花費（Cost）：就是資料傳送過程中通過路徑所需要的花費。
2.  路由的服務質量
3.  路由中需要過濾的出/入連接列表

### 運輸層

協議：

-   TCP（Transmission Control Protocol，傳輸控制協議）
-   UDP（User Datagram Protocol，使用者資料報協議）

連接埠：

| 應用程式 | FTP | TELNET | SMTP | DNS | TFTP | HTTP | HTTPS | SNMP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 連接埠號 | 21 | 23 | 25 | 53 | 69 | 80 | 443 | 161 |

#### TCP

-   TCP（Transmission Control Protocol，傳輸控制協議）是一種面向連接的、可靠的、基於位元組流的傳輸層通訊協議，其傳輸的單位是報文段。

特徵：

-   面向連接
-   只能點對點（一對一）通訊
-   可靠互動
-   全雙工通訊
-   面向位元組流

TCP 如何保證可靠傳輸：

-   確認和超時重傳
-   資料合理分片和排序
-   流量控制
-   擁塞控制
-   資料校驗

TCP 報文結構

[![TCP 報文](https://camo.githubusercontent.com/c47b30002614e3d26fd64a02cadb9497bd51d3b8cae015ac58de93ef6d871e0f/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545362538412541352545362539362538372e706e67)](https://camo.githubusercontent.com/c47b30002614e3d26fd64a02cadb9497bd51d3b8cae015ac58de93ef6d871e0f/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545362538412541352545362539362538372e706e67)

TCP 首部

[![TCP 首部](https://camo.githubusercontent.com/c850dd8c5a34fa83b55d76d38847afffc520b69e5ea8d54cadc232092aecb608/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545392541362539362545392538332541382e706e67)](https://camo.githubusercontent.com/c850dd8c5a34fa83b55d76d38847afffc520b69e5ea8d54cadc232092aecb608/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545392541362539362545392538332541382e706e67)

TCP：狀態控制碼（Code，Control Flag），佔 6 位元，含義如下：

-   URG：緊急位元（urgent），當 `URG＝1` 時，表明緊急指針欄位有效，代表該封包為緊急封包。它告訴系統此報文段中有緊急資料，應盡快傳送(相當於高優先順序的資料)， 且上圖中的 Urgent Pointer 欄位也會被啟用。
-   ACK：確認位元（Acknowledge）。只有當 `ACK＝1` 時確認號欄位才有效，代表這個封包為確認封包。當 `ACK＝0` 時，確認號無效。
-   PSH：（Push function）若為 1 時，代表要求對方立即傳送緩衝區內的其他對應封包，而無需等緩衝滿了才送。
-   RST：復位位元(Reset)，當 `RST＝1` 時，表明 TCP 連接中出現嚴重差錯（如由於主機崩潰或其他原因），必須釋放連接，然後再重新建立運輸連接。
-   SYN：同步位元(Synchronous)，SYN 置為 1，就表示這是一個連接請求或連接接受報文，通常帶有 SYN 標誌的封包表示『主動』要連接到對方的意思。
-   FIN：終止位元(Final)，用來釋放一個連接。當 `FIN＝1` 時，表明此報文段的傳送端的資料已傳送完畢，並要求釋放運輸連接。

#### UDP

-   UDP（User Datagram Protocol，使用者資料報協議）是 OSI（Open System Interconnection 開放式系統互聯） 參考模型中一種無連接的傳輸層協議，提供面向事務的簡單不可靠資訊傳送服務，其傳輸的單位是使用者資料報。

特徵：

-   無連接
-   盡最大努力交付
-   面向報文
-   沒有擁塞控制
-   支援一對一、一對多、多對一、多對多的互動通訊
-   首部開銷小

UDP 報文結構

[![UDP 報文](https://camo.githubusercontent.com/4ae1964912958d058296c4b4b342d318fbfe701a743c8d480149cd3de5f51d61/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5544502545362538412541352545362539362538372e706e67)](https://camo.githubusercontent.com/4ae1964912958d058296c4b4b342d318fbfe701a743c8d480149cd3de5f51d61/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5544502545362538412541352545362539362538372e706e67)

UDP 首部

[![UDP 首部](https://camo.githubusercontent.com/aee3dc63567e825df9cfb9248db2b1a32a9b03475c4f4a9467ab87810fb305d8/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5544502545392541362539362545392538332541382e706e67)](https://camo.githubusercontent.com/aee3dc63567e825df9cfb9248db2b1a32a9b03475c4f4a9467ab87810fb305d8/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5544502545392541362539362545392538332541382e706e67)

> TCP/UDP 圖片來源於：[https://github.com/JerryC8080/understand-tcp-udp](https://github.com/JerryC8080/understand-tcp-udp)

#### TCP 與 UDP 的區別

1.  TCP 面向連接，UDP 是無連接的；
2.  TCP 提供可靠的服務，也就是說，通過 TCP 連接傳送的資料，無差錯，不丟失，不重複，且按序到達；UDP 盡最大努力交付，即不保證可靠交付
3.  TCP 的邏輯通訊通道是全雙工的可靠通道；UDP 則是不可靠通道
4.  每一條 TCP 連接只能是點到點的；UDP 支援一對一，一對多，多對一和多對多的互動通訊
5.  TCP 面向位元組流（可能出現黏包問題），實際上是 TCP 把資料看成一連串無結構的位元組流；UDP 是面向報文的（不會出現黏包問題）
6.  UDP 沒有擁塞控制，因此網路出現擁塞不會使源主機的傳送速率降低（對即時應用很有用，如 IP 電話，即時視訊會議等）
7.  TCP 首部開銷20位元組；UDP 的首部開銷小，只有 8 個位元組

#### TCP 黏包問題

##### 原因

TCP 是一個基於位元組流的傳輸服務（UDP 基於報文的），“流” 意味著 TCP 所傳輸的資料是沒有邊界的。所以可能會出現兩個封包黏在一起的情況。

##### 解決

-   傳送定長包。如果每個消息的大小都是一樣的，那麼在接收對等方只要累計接收資料，直到資料等於一個定長的數值就將它作為一個消息。
-   包頭加上包體長度。包頭是定長的 4 個位元組，說明了包體的長度。接收對等方先接收包頭長度，依據包頭長度來接收包體。
-   在封包之間設定邊界，如新增特殊符號 `\r\n` 標記。FTP 協議正是這麼做的。但問題在於如果資料正文中也含有 `\r\n`，則會誤判為消息的邊界。
-   使用更加複雜的應用層協議。

#### TCP 流量控制

##### 概念

流量控制（flow control）就是讓傳送方的傳送速率不要太快，要讓接收方來得及接收。

##### 方法

利用可變窗口進行流量控制

[![](https://camo.githubusercontent.com/324e35d7ee34eb9db9f3e5d14dc3d948849afa3e62a91c4a80db156e81c811b1/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545352538382541392545372539342541382545352538462541462545352538462539382545372541412539372545352538462541332545382542462539422545382541312538432545362542352538312545392538372538462545362538452541372545352538382542362545342542382542452545342542452538422e706e67)](https://camo.githubusercontent.com/324e35d7ee34eb9db9f3e5d14dc3d948849afa3e62a91c4a80db156e81c811b1/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545352538382541392545372539342541382545352538462541462545352538462539382545372541412539372545352538462541332545382542462539422545382541312538432545362542352538312545392538372538462545362538452541372545352538382542362545342542382542452545342542452538422e706e67)

#### TCP 擁塞控制

##### 概念

擁塞控制就是防止過多的資料注入到網路中，這樣可以使網路中的路由器或鏈路不致過載。

##### 方法

-   慢開始( slow-start )
-   擁塞避免( congestion avoidance )
-   快重傳( fast retransmit )
-   快恢復( fast recovery )

TCP的擁塞控製圖

[![](https://camo.githubusercontent.com/56f29286817e27ee1efe2254a6a22c78029342fc95a72fc3135b056f8a2231f9/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f54435025453625384225413525453525413125394525453725414125393725453525384625413363776e642545352539432541382545362538422541352545352541312539452545362538452541372545352538382542362545362539372542362545372539412538342545352538462539382545352538432539362545362538332538352545352538362542352e706e67)](https://camo.githubusercontent.com/56f29286817e27ee1efe2254a6a22c78029342fc95a72fc3135b056f8a2231f9/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f54435025453625384225413525453525413125394525453725414125393725453525384625413363776e642545352539432541382545362538422541352545352541312539452545362538452541372545352538382542362545362539372542362545372539412538342545352538462539382545352538432539362545362538332538352545352538362542352e706e67) [![](https://camo.githubusercontent.com/70d74d223b4590b707eea102b5daf4da51d744f99dab84a30a9a5e9000ba3c90/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545352542462541422545392538372538442545342542432541302545372541342542412545362538342538462545352539422542452e706e67)](https://camo.githubusercontent.com/70d74d223b4590b707eea102b5daf4da51d744f99dab84a30a9a5e9000ba3c90/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f2545352542462541422545392538372538442545342542432541302545372541342542412545362538342538462545352539422542452e706e67) [![](https://camo.githubusercontent.com/f504666f5fe6b73ffd665c24b7e6da8e43ef2aa80236b364b5b36ea2e1c67b74/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545372539412538342545362538422541352545352541312539452545362538452541372545352538382542362545362542352538312545372541382538422545352539422542452e706e67)](https://camo.githubusercontent.com/f504666f5fe6b73ffd665c24b7e6da8e43ef2aa80236b364b5b36ea2e1c67b74/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545372539412538342545362538422541352545352541312539452545362538452541372545352538382542362545362542352538312545372541382538422545352539422542452e706e67)

#### TCP 傳輸連接管理

> 因為 TCP 三次握手建立連接、四次揮手釋放連接很重要，所以附上《電腦網路（第 7 版）-謝希仁》書中對此章的詳細描述：[https://gitee.com/huihut/interview/raw/master/images/TCP-transport-connection-management.png](https://gitee.com/huihut/interview/raw/master/images/TCP-transport-connection-management.png)

##### TCP 三次握手建立連接

[![UDP 報文](https://camo.githubusercontent.com/02987d37d9ecf26ec08473c5b3f530836c490a06a598ee4b0d3cd6032e430513/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545342542382538392545362541432541312545362538462541312545362538392538422545352542422542412545372541422538422545382542462539452545362538452541352e706e67)](https://camo.githubusercontent.com/02987d37d9ecf26ec08473c5b3f530836c490a06a598ee4b0d3cd6032e430513/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545342542382538392545362541432541312545362538462541312545362538392538422545352542422542412545372541422538422545382542462539452545362538452541352e706e67)

【TCP 建立連接全過程解釋】

1.  客戶端傳送 SYN 給伺服器，說明客戶端請求建立連接；
2.  伺服器端收到客戶端發的 SYN，並回覆 SYN+ACK 給客戶端（同意建立連接）；
3.  客戶端收到伺服器端的 SYN+ACK 後，回覆 ACK 給伺服器端（表示客戶端收到了伺服器端發的同意報文）；
4.  伺服器端收到客戶端的 ACK，連接已建立，可以資料傳輸。

##### TCP 為什麼要進行三次握手？

【答案一】因為通道不可靠，而 TCP 想在不可靠通道上建立可靠地傳輸，那麼三次通訊是理論上的最小值。（而 UDP 則不需建立可靠傳輸，因此 UDP 不需要三次握手。）

> [Google Groups . TCP 建立連接為什麼是三次握手？{技術}{網路通訊}](https://groups.google.com/forum/#!msg/pongba/kF6O7-MFxM0/5S7zIJ4yqKUJ)

【答案二】因為雙方都需要確認對方收到了自己傳送的序列號，確認過程最少要進行三次通訊。

> [知乎 . TCP 為什麼是三次握手，而不是兩次或四次？](https://www.zhihu.com/question/24853633/answer/115173386)

【答案三】為了防止已失效的連接請求報文段突然又傳送到了伺服器端，因而產生錯誤。

> [《電腦網路（第 7 版）-謝希仁》](https://gitee.com/huihut/interview/raw/master/images/TCP-transport-connection-management.png)

##### TCP 四次揮手釋放連接

[![UDP 報文](https://camo.githubusercontent.com/209302157a20fd1f442f30199165650023d4c0815c31c9924df1ff2116ea9f1f/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545352539422539422545362541432541312545362538432541352545362538392538422545392538372538412545362539342542452545382542462539452545362538452541352e706e67)](https://camo.githubusercontent.com/209302157a20fd1f442f30199165650023d4c0815c31c9924df1ff2116ea9f1f/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545352539422539422545362541432541312545362538432541352545362538392538422545392538372538412545362539342542452545382542462539452545362538452541352e706e67)

【TCP 釋放連接全過程解釋】

1.  客戶端傳送 FIN 給伺服器，說明客戶端不必傳送資料給伺服器了（請求釋放從客戶端到伺服器的連接）；
2.  伺服器接收到客戶端發的 FIN，並回覆 ACK 給客戶端（同意釋放從客戶端到伺服器的連接）；
3.  客戶端收到伺服器端回覆的 ACK，此時從客戶端到伺服器的連接已釋放（但伺服器端到客戶端的連接還未釋放，並且客戶端還可以接收資料）；
4.  伺服器端繼續傳送之前沒發完的資料給客戶端；
5.  伺服器端傳送 FIN+ACK 給客戶端，說明伺服器端傳送完了資料（請求釋放從伺服器端到客戶端的連接，就算沒收到客戶端的回覆，過段時間也會自動釋放）；
6.  客戶端收到伺服器端的 FIN+ACK，並回覆 ACK 給伺服器端（同意釋放從伺服器端到客戶端的連接）；
7.  伺服器端收到客戶端的 ACK 後，釋放從伺服器端到客戶端的連接。

##### TCP 為什麼要進行四次揮手？

【問題一】TCP 為什麼要進行四次揮手？ / 為什麼 TCP 建立連接需要三次，而釋放連接則需要四次？

【答案一】因為 TCP 是全雙工模式，客戶端請求關閉連接後，客戶端向伺服器端的連接關閉（一二次揮手），伺服器端繼續傳輸之前沒傳完的資料給客戶端（資料傳輸），伺服器端向客戶端的連接關閉（三四次揮手）。所以 TCP 釋放連接時伺服器的 ACK 和 FIN 是分開傳送的（中間隔著資料傳輸），而 TCP 建立連接時伺服器的 ACK 和 SYN 是一起傳送的（第二次握手），所以 TCP 建立連接需要三次，而釋放連接則需要四次。

【問題二】為什麼 TCP 連接時可以 ACK 和 SYN 一起傳送，而釋放時則 ACK 和 FIN 分開傳送呢？（ACK 和 FIN 分開是指第二次和第三次揮手）

【答案二】因為客戶端請求釋放時，伺服器可能還有資料需要傳輸給客戶端，因此伺服器端要先響應客戶端 FIN 請求（伺服器端傳送 ACK），然後資料傳輸，傳輸完成後，伺服器端再提出 FIN 請求（伺服器端傳送 FIN）；而連接時則沒有中間的資料傳輸，因此連接時可以 ACK 和 SYN 一起傳送。

【問題三】為什麼客戶端釋放最後需要 TIME-WAIT 等待 2MSL 呢？

【答案三】

1.  為了保證客戶端傳送的最後一個 ACK 報文能夠到達伺服器端。若未成功到達，則伺服器端超時重傳 FIN+ACK 報文段，客戶端再重傳 ACK，並重新計時。
2.  防止已失效的連接請求報文段出現在本連接中。TIME-WAIT 持續 2MSL 可使本連接持續的時間內所產生的所有報文段都從網路中消失，這樣可使下次連接中不會出現舊的連接報文段。

#### TCP 有限狀態機

TCP 有限狀態機圖片

[![TCP 的有限狀態機](https://camo.githubusercontent.com/d69de597c215cce86bf9b74f81db6a7e3bde7faba8304dc0ed560d138f06ad18/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545372539412538342545362539432538392545392539392539302545372538412542362545362538302538312545362539432542412e706e67)](https://camo.githubusercontent.com/d69de597c215cce86bf9b74f81db6a7e3bde7faba8304dc0ed560d138f06ad18/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f5443502545372539412538342545362539432538392545392539392539302545372538412542362545362538302538312545362539432542412e706e67)

### 應用層

#### DNS

-   DNS（Domain Name System，域名系統）是網際網路的一項服務。它作為將域名和 IP 地址相互對應的一個分佈式資料庫，能夠使人更方便地訪問網際網路。DNS 使用 TCP 和 UDP 連接埠 53。當前，對於每一級域名長度的限制是 63 個字元，域名總長度則不能超過 253 個字元。

域名：

-   `域名 ::= {<三級域名>.<二級域名>.<頂級域名>}`，如：`blog.huihut.com`

#### FTP

-   FTP（File Transfer Protocol，檔案傳輸協議）是用於在網路上進行檔案傳輸的一套標準協議，使用客戶/伺服器模式，使用 TCP 資料報，提供互動式訪問，雙向傳輸。
-   TFTP（Trivial File Transfer Protocol，簡單檔案傳輸協議）一個小且易實現的檔案傳輸協議，也使用客戶-伺服器方式，使用UDP資料報，只支援檔案傳輸而不支援互動，沒有列目錄，不能對使用者進行身份鑑定

#### TELNET

-   TELNET 協議是 TCP/IP 協議族中的一員，是 Internet 遠端登陸服務的標準協議和主要方式。它為使用者提供了在本地電腦上完成遠端主機工作的能力。
    
-   HTTP（HyperText Transfer Protocol，超文字傳輸協議）是用於從 WWW（World Wide Web，全球資訊網）伺服器傳輸超文字到本地瀏覽器的傳送協議。
    
-   SMTP（Simple Mail Transfer Protocol，簡單郵件傳輸協議）是一組用於由源地址到目的地址傳送郵件的規則，由它來控制信件的中轉方式。SMTP 協議屬於 TCP/IP 協議簇，它幫助每台電腦在傳送或中轉信件時找到下一個目的地。
    
-   Socket 建立網路通訊連接至少要一對連接埠號（Socket）。Socket 本質是程式設計介面（API），對 TCP/IP 的封裝，TCP/IP 也要提供可供程式設計師做網路開發所用的介面，這就是 Socket 程式設計介面。
    

#### WWW

-   WWW（World Wide Web，環球資訊網，全球資訊網）是一個由許多互相連結的超文字組成的系統，通過網際網路訪問

##### URL

-   URL（Uniform Resource Locator，統一資源定位符）是網際網路上標準的資源的地址（Address）

標準格式：

-   `協議類型:[//伺服器地址[:連接埠號]][/資源層級UNIX檔案路徑]檔案名稱[?查詢][#片段ID]`

完整格式：

-   `協議類型:[//[訪問資源需要的憑證資訊@]伺服器地址[:連接埠號]][/資源層級UNIX檔案路徑]檔案名稱[?查詢][#片段ID]`

> 其中【訪問憑證資訊@；:連接埠號；?查詢；#片段ID】都屬於選填項  
> 如：`https://github.com/huihut/interview#cc`

##### HTTP

HTTP（HyperText Transfer Protocol，超文字傳輸協議）是一種用於分佈式、協作式和超媒體資訊系統的應用層協議。HTTP 是全球資訊網的資料通訊的基礎。

請求方法

| 方法 | 意義 |
| --- | --- |
| OPTIONS | 請求一些選項資訊，允許客戶端查看伺服器的性能 |
| GET | 請求指定的頁面資訊，並返回實體主體 |
| HEAD | 類似於 get 請求，只不過返回的響應中沒有具體的內容，用於獲取報頭 |
| POST | 向指定資源提交資料進行處理請求（例如提交表單或者上傳檔案）。資料被包含在請求體中。POST請求可能會導致新的資源的建立和/或已有資源的修改 |
| PUT | 從客戶端向伺服器傳送的資料取代指定的文件的內容 |
| DELETE | 請求伺服器刪除指定的頁面 |
| TRACE | 回顯伺服器收到的請求，主要用於測試或診斷 |

狀態碼（Status-Code）

-   1xx：表示通知資訊，如請求收到了或正在進行處理
    -   100 Continue：繼續，客戶端應繼續其請求
    -   101 Switching Protocols 切換協議。伺服器根據客戶端的請求切換協議。只能切換到更高級的協議，例如，切換到 HTTP 的新版本協議
-   2xx：表示成功，如接收或知道了
    -   200 OK: 請求成功
-   3xx：表示重新導向，如要完成請求還必須採取進一步的行動
    -   301 Moved Permanently: 永久移動。請求的資源已被永久的移動到新 URL，返回資訊會包括新的 URL，瀏覽器會自動定向到新 URL。今後任何新的請求都應使用新的 URL 代替
-   4xx：表示客戶的差錯，如請求中有錯誤的語法或不能完成
    -   400 Bad Request: 客戶端請求的語法錯誤，伺服器無法理解
    -   401 Unauthorized: 請求要求使用者的身份認證
    -   403 Forbidden: 伺服器理解請求客戶端的請求，但是拒絕執行此請求（權限不夠）
    -   404 Not Found: 伺服器無法根據客戶端的請求找到資源（網頁）。通過此程式碼，網站設計人員可設定 “您所請求的資源無法找到” 的個性頁面
    -   408 Request Timeout: 伺服器等待客戶端傳送的請求時間過長，超時
-   5xx：表示伺服器的差錯，如伺服器失效無法完成請求
    -   500 Internal Server Error: 伺服器內部錯誤，無法完成請求
    -   503 Service Unavailable: 由於超載或系統維護，伺服器暫時的無法處理客戶端的請求。延時的長度可包含在伺服器的 Retry-After 頭資訊中
    -   504 Gateway Timeout: 充當閘道器或代理的伺服器，未及時從遠端伺服器獲取請求

> 更多狀態碼：[菜鳥教學 . HTTP狀態碼](http://www.runoob.com/http/http-status-codes.html)

##### 其他協議

-   SMTP（Simple Main Transfer Protocol，簡單郵件傳輸協議）是在 Internet 傳輸 Email 的標準，是一個相對簡單的基於文字的協議。在其之上指定了一條消息的一個或多個接收者（在大多數情況下被確認是存在的），然後消息文字會被傳輸。可以很簡單地通過 Telnet 程序來測試一個 SMTP 伺服器。SMTP 使用 TCP 連接埠 25。
-   DHCP（Dynamic Host Configuration Protocol，動態主機設定協議）是一個區域網路的網路協議，使用 UDP 協議工作，主要有兩個用途：
    -   用於內部網路或網路服務供應商自動分配 IP 地址給使用者
    -   用於內部網路管理員作為對所有電腦作中央管理的手段
-   SNMP（Simple Network Management Protocol，簡單網路管理協議）構成了網際網路工程工作小組（IETF，Internet Engineering Task Force）定義的 Internet 協議族的一部分。該協議能夠支援網路管理系統，用以監測連接到網路上的裝置是否有任何引起管理上關注的情況。

## 🌩 網路程式設計

### Socket

> [Linux Socket 程式設計（不限 Linux）](https://www.cnblogs.com/skynet/archive/2010/12/12/1903949.html)

[![Socket 客戶端伺服器通訊](https://camo.githubusercontent.com/2bd973e33aa86e292ceadff0a7afa391e618d587a60a7d0e9d3b5fabd24bf794/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f736f636b65742545352541452541322545362538382542372545372541422541462545362539432538442545352538412541312545352539392541382545392538302539412545382541452541462e6a7067)](https://camo.githubusercontent.com/2bd973e33aa86e292ceadff0a7afa391e618d587a60a7d0e9d3b5fabd24bf794/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f736f636b65742545352541452541322545362538382542372545372541422541462545362539432538442545352538412541312545352539392541382545392538302539412545382541452541462e6a7067)

#### Socket 中的 read()、write() 函數

```c
ssize_t read(int fd, void *buf, size_t count);
ssize_t write(int fd, const void *buf, size_t count);
```

##### read()

-   read 函數是負責從 fd 中讀取內容。
-   當讀成功時，read 返回實際所讀的位元組數。
-   如果返回的值是 0 表示已經讀到檔案的結束了，小於 0 表示出現了錯誤。
-   如果錯誤為 EINTR 說明讀是由中斷引起的；如果是 ECONNREST 表示網路連線出了問題。

##### write()

-   write 函數將 buf 中的 nbytes 位元組內容寫入檔案描述符 fd。
-   成功時返回寫的位元組數。失敗時返回 -1，並設定 errno 變數。
-   在網路程序中，當我們向套接字檔案描述符寫時有倆種可能。
-   （1）write 的返回值大於 0，表示寫了部分或者是全部的資料。
-   （2）返回的值小於 0，此時出現了錯誤。
-   如果錯誤為 EINTR 表示在寫的時候出現了中斷錯誤；如果為 EPIPE 表示網路連線出現了問題（對方已經關閉了連接）。

#### Socket 中 TCP 的三次握手建立連接

我們知道 TCP 建立連接要進行 “三次握手”，即交換三個分組。大致流程如下：

1.  客戶端向伺服器傳送一個 SYN J
2.  伺服器向客戶端響應一個 SYN K，並對 SYN J 進行確認 ACK J+1
3.  客戶端再想伺服器發一個確認 ACK K+1

只有就完了三次握手，但是這個三次握手發生在 Socket 的那幾個函數中呢？請看下圖：

[![socket 中傳送的 TCP 三次握手](https://camo.githubusercontent.com/acd13227ae0680f7d15aeec2189c61128115ff8f57c593a93b7af9db4282adef/687474703a2f2f696d616765732e636e626c6f67732e636f6d2f636e626c6f67735f636f6d2f736b796e65742f3230313031322f3230313031323132323135373436373235382e706e67)](https://camo.githubusercontent.com/acd13227ae0680f7d15aeec2189c61128115ff8f57c593a93b7af9db4282adef/687474703a2f2f696d616765732e636e626c6f67732e636f6d2f636e626c6f67735f636f6d2f736b796e65742f3230313031322f3230313031323132323135373436373235382e706e67)

從圖中可以看出：

1.  當客戶端呼叫 connect 時，觸發了連接請求，向伺服器傳送了 SYN J 包，這時 connect 進入阻塞狀態；
2.  伺服器監聽到連接請求，即收到 SYN J 包，呼叫 accept 函數接收請求向客戶端傳送 SYN K ，ACK J+1，這時 accept 進入阻塞狀態；
3.  客戶端收到伺服器的 SYN K ，ACK J+1 之後，這時 connect 返回，並對 SYN K 進行確認；
4.  伺服器收到 ACK K+1 時，accept 返回，至此三次握手完畢，連接建立。

#### Socket 中 TCP 的四次握手釋放連接

上面介紹了 socket 中 TCP 的三次握手建立過程，及其涉及的 socket 函數。現在我們介紹 socket 中的四次握手釋放連接的過程，請看下圖：

[![socket 中傳送的 TCP 四次握手](https://camo.githubusercontent.com/2856bad1c794d5d0fb7bbfc25e73b36c5b0a01c85d33562749aa3128b2dc85d3/687474703a2f2f696d616765732e636e626c6f67732e636f6d2f636e626c6f67735f636f6d2f736b796e65742f3230313031322f3230313031323132323135373438373631362e706e67)](https://camo.githubusercontent.com/2856bad1c794d5d0fb7bbfc25e73b36c5b0a01c85d33562749aa3128b2dc85d3/687474703a2f2f696d616765732e636e626c6f67732e636f6d2f636e626c6f67735f636f6d2f736b796e65742f3230313031322f3230313031323132323135373438373631362e706e67)

圖示過程如下：

1.  某個應用處理程序首先呼叫 close 主動關閉連接，這時 TCP 傳送一個 FIN M；
2.  另一端接收到 FIN M 之後，執行被動關閉，對這個 FIN 進行確認。它的接收也作為檔案結束符傳遞給應用處理程序，因為 FIN 的接收意味著應用處理程序在相應的連接上再也接收不到額外資料；
3.  一段時間之後，接收到檔案結束符的應用處理程序呼叫 close 關閉它的 socket。這導致它的 TCP 也傳送一個 FIN N；
4.  接收到這個 FIN 的源傳送端 TCP 對它進行確認。

這樣每個方向上都有一個 FIN 和 ACK。

## 💾 資料庫

> 本節部分知識點來自《資料庫系統概論（第 5 版）》

### 基本概念

-   資料（data）：描述事物的符號記錄稱為資料。
-   資料庫（DataBase，DB）：是長期儲存在電腦內、有組織的、可共享的大量資料的集合，具有永久儲存、有組織、可共享三個基本特點。
-   資料庫管理系統（DataBase Management System，DBMS）：是位於使用者與作業系統之間的一層資料管理軟體。
-   資料庫系統（DataBase System，DBS）：是有資料庫、資料庫管理系統（及其應用開發工具）、應用程式和資料庫管理員（DataBase Administrator DBA）組成的儲存、管理、處理和維護資料的系統。
-   實體（entity）：客觀存在並可相互區別的事物稱為實體。
-   屬性（attribute）：實體所具有的某一特性稱為屬性。
-   碼（key）：唯一標識實體的屬性集稱為碼。
-   實體型（entity type）：用實體名及其屬性名集合來抽象和刻畫同類實體，稱為實體型。
-   實體集（entity set）：同一實體型的集合稱為實體集。
-   聯絡（relationship）：實體之間的聯絡通常是指不同實體集之間的聯絡。
-   模式（schema）：模式也稱邏輯模式，是資料庫全體資料的邏輯結構和特徵的描述，是所有使用者的公共資料檢視。
-   外模式（external schema）：外模式也稱子模式（subschema）或使用者模式，它是資料庫使用者（包括應用程式員和終端使用者）能夠看見和使用的局部資料的邏輯結構和特徵的描述，是資料庫使用者的資料檢視，是與某一應用有關的資料的邏輯表示。
-   內模式（internal schema）：內模式也稱為儲存模式（storage schema），一個資料庫只有一個內模式。他是資料物理結構和儲存方式的描述，是資料庫在資料庫內部的組織方式。

### 常用資料模型

-   層次模型（hierarchical model）
-   網狀模型（network model）
-   關係模型（relational model）
    -   關係（relation）：一個關係對應通常說的一張表
    -   元組（tuple）：表中的一行即為一個元組
    -   屬性（attribute）：表中的一列即為一個屬性
    -   碼（key）：表中可以唯一確定一個元組的某個屬性組
    -   域（domain）：一組具有相同資料類型的值的集合
    -   份量：元組中的一個屬性值
    -   關係模式：對關係的描述，一般表示為 `關係名(屬性1, 屬性2, ..., 屬性n)`
-   物件導向資料模型（object oriented data model）
-   對象關係資料模型（object relational data model）
-   半結構化資料模型（semistructure data model）

### 常用 SQL 操作

| 對象類型 | 對象 | 操作類型 |
| --- | --- | --- |
| 資料庫模式 | 模式 | `CREATE SCHEMA` |
| 基本表 | `CREATE SCHEMA`，`ALTER TABLE` |
| 檢視 | `CREATE VIEW` |
| 索引 | `CREATE INDEX` |
| 資料 | 基本表和檢視 | `SELECT`，`INSERT`，`UPDATE`，`DELETE`，`REFERENCES`，`ALL PRIVILEGES` |
| 屬性列 | `SELECT`，`INSERT`，`UPDATE`，`REFERENCES`，`ALL PRIVILEGES` |

> SQL 語法教學：[runoob . SQL 教學](http://www.runoob.com/sql/sql-tutorial.html)

### 關係型資料庫

-   基本關係操作：查詢（選擇、投影、連接（等值連接、自然連接、外連接（左外連接、右外連接））、除、並、差、交、笛卡爾積等）、插入、刪除、修改
-   關係模型中的三類完整性約束：實體完整性、參照完整性、使用者定義的完整性

#### 索引

-   資料庫索引：順序索引、B+ 樹索引、hash 索引
-   [MySQL 索引背後的資料結構及演算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html)

### 資料庫完整性

-   資料庫的完整性是指資料的正確性和相容性。
    -   完整性：為了防止資料庫中存在不符合語義（不正確）的資料。
    -   安全性：為了保護資料庫防止惡意破壞和非法存取。
-   觸發器：是使用者定義在關係表中的一類由事件驅動的特殊過程。

### 關係資料理論

-   資料依賴是一個關係內部屬性與屬性之間的一種約束關係，是通過屬性間值的相等與否體現出來的資料間相關聯絡。
-   最重要的資料依賴：函數依賴、多值依賴。

#### 範式

-   第一範式（1NF）：屬性（欄位）是最小單位不可再分。
-   第二範式（2NF）：滿足 1NF，每個非主屬性完全依賴於主鍵（消除 1NF 非主屬性對碼的部分函數依賴）。
-   第三範式（3NF）：滿足 2NF，任何非主屬性不依賴於其他非主屬性（消除 2NF 非主屬性對碼的傳遞函數依賴）。
-   鮑依斯-科得範式（BCNF）：滿足 3NF，任何非主屬性不能對主鍵子集依賴（消除 3NF 主屬性對碼的部分和傳遞函數依賴）。
-   第四範式（4NF）：滿足 3NF，屬性之間不能有非平凡且非函數依賴的多值依賴（消除 3NF 非平凡且非函數依賴的多值依賴）。

### 資料庫恢復

-   事務：是使用者定義的一個資料庫操作序列，這些操作要麼全做，要麼全不做，是一個不可分割的工作單位。
-   事物的 ACID 特性：原子性、一致性、隔離性、持續性。
-   恢復的實現技術：建立冗餘資料 -> 利用冗餘資料實施資料庫恢復。
-   建立冗餘資料常用技術：資料轉儲（動態海量轉儲、動態增量轉儲、靜態海量轉儲、靜態增量轉儲）、登記記錄檔。

### 並行控制

-   事務是並行控制的基本單位。
-   並行操作帶來的資料不一致性包括：丟失修改、不可重複讀、讀 “髒” 資料。
-   並行控制主要技術：封鎖、時間戳、樂觀控製法、多版本並行控制等。
-   基本封鎖類型：排他鎖（X 鎖 / 寫鎖）、共享鎖（S 鎖 / 讀鎖）。
-   活鎖死鎖：
    -   活鎖：事務永遠處於等待狀態，可通過先來先服務的策略避免。
    -   死鎖：事務永遠不能結束
        -   預防：一次封鎖法、順序封鎖法；
        -   診斷：超時法、等待圖法；
        -   解除：撤銷處理死鎖代價最小的事務，並釋放此事務的所有的鎖，使其他事務得以繼續運行下去。
-   可序列化調度：多個事務的並行執行是正確的，當且僅當其結果與按某一次序序列地執行這些事務時的結果相同。可序列性時並行事務正確調度的準則。

## 📏 設計模式

> 各大設計模式例子參考：[CSDN專欄 . C++ 設計模式](https://blog.csdn.net/liang19890820/article/details/66974516) 系列博文

[設計模式工程目錄](https://github.com/huihut/interview/blob/master/DesignPattern)

### 單例模式

[單例模式例子](https://github.com/huihut/interview/blob/master/DesignPattern/SingletonPattern)

### 抽象工廠模式

[抽象工廠模式例子](https://github.com/huihut/interview/blob/master/DesignPattern/AbstractFactoryPattern)

### 介面卡模式

[介面卡模式例子](https://github.com/huihut/interview/blob/master/DesignPattern/AdapterPattern)

### 橋接模式

[橋接模式例子](https://github.com/huihut/interview/blob/master/DesignPattern/BridgePattern)

### 觀察者模式

[觀察者模式例子](https://github.com/huihut/interview/blob/master/DesignPattern/ObserverPattern)

### 設計模式的六大原則

-   單一職責原則（SRP，Single Responsibility Principle）
-   裡氏替換原則（LSP，Liskov Substitution Principle）
-   依賴倒置原則（DIP，Dependence Inversion Principle）
-   介面隔離原則（ISP，Interface Segregation Principle）
-   迪米特法則（LoD，Law of Demeter）
-   開放封閉原則（OCP，Open Close Principle）

## ⚙️ 連結裝載庫

> 本節部分知識點來自《程式設計師的自我修養——連結裝載庫》

### 記憶體、棧、堆

一般應用程式記憶體空間有如下區域：

-   棧：由作業系統自動分配釋放，存放函數的參數值、局部變數等的值，用於維護函數呼叫的上下文
-   堆：一般由程式設計師分配釋放，若程式設計師不釋放，程序結束時可能由作業系統回收，用來容納應用程式動態分配的記憶體區域
-   可執行檔案映像：儲存著可執行檔案在記憶體中的映像，由裝載器裝載是將可執行檔案的記憶體讀取或對應到這裡
-   保留區：保留區並不是一個單一的記憶體區域，而是對記憶體中受到保護而禁止訪問的記憶體區域的總稱，如通常 C 語言講無效指針賦值為 0（NULL），因此 0 地址正常情況下不可能有效的訪問資料

#### 棧

棧保存了一個函數呼叫所需要的維護資訊，常被稱為堆疊幀（Stack Frame）或活動記錄（Activate Record），一般包含以下幾方面：

-   函數的返回地址和參數
-   臨時變數：包括函數的非靜態局部變數以及編譯器自動生成的其他臨時變數
-   保存上下文：包括函數呼叫前後需要保持不變的暫存器

#### 堆

堆分配演算法：

-   空閒鏈表（Free List）
-   點陣圖（Bitmap）
-   對象池

#### “段錯誤（segment fault）” 或 “非法操作，該記憶體地址不能 read/write”

典型的非法指針解引用造成的錯誤。當指針指向一個不允許讀寫的記憶體地址，而程序卻試圖利用指針來讀或寫該地址時，會出現這個錯誤。

普遍原因：

-   將指針初始化為 NULL，之後沒有給它一個合理的值就開始使用指針
-   沒用初始化棧中的指針，指針的值一般會是隨機數，之後就直接開始使用指針

### 編譯連結

#### 各平台檔案格式

| 平台 | 可執行檔案 | 目標檔案 | 動態庫/共享對象 | 靜態庫 |
| --- | --- | --- | --- | --- |
| Windows | exe | obj | dll | lib |
| Unix/Linux | ELF、out | o | so | a |
| Mac | Mach-O | o | dylib、tbd、framework | a、framework |

#### 編譯連結過程

1.  預編譯（預編譯器處理如 `#include`、`#define` 等預編譯指令，生成 `.i` 或 `.ii` 檔案）
2.  編譯（編譯器進行詞法分析、語法分析、語義分析、中間程式碼生成、目標程式碼生成、最佳化，生成 `.s` 檔案）
3.  彙編（彙編器把彙編碼翻譯成機器碼，生成 `.o` 檔案）
4.  連結（連接器進行地址和空間分配、符號決議、重定位，生成 `.out` 檔案）

> 現在版本 GCC 把預編譯和編譯合成一步，預編譯編譯程序 cc1、彙編器 as、連接器 ld

> MSVC 編譯環境，編譯器 cl、連接器 link、可執行檔案查看器 dumpbin

#### 目標檔案

編譯器編譯原始碼後生成的檔案叫做目標檔案。目標檔案從結構上講，它是已經編譯後的可執行檔案格式，只是還沒有經過連結的過程，其中可能有些符號或有些地址還沒有被調整。

> 可執行檔案（Windows 的 `.exe` 和 Linux 的 `ELF`）、動態連結庫（Windows 的 `.dll` 和 Linux 的 `.so`）、靜態連結庫（Windows 的 `.lib` 和 Linux 的 `.a`）都是按照可執行檔案格式儲存（Windows 按照 PE-COFF，Linux 按照 ELF）

##### 目標檔案格式

-   Windows 的 PE（Portable Executable），或稱為 PE-COFF，`.obj` 格式
-   Linux 的 ELF（Executable Linkable Format），`.o` 格式
-   Intel/Microsoft 的 OMF（Object Module Format）
-   Unix 的 `a.out` 格式
-   MS-DOS 的 `.COM` 格式

> PE 和 ELF 都是 COFF（Common File Format）的變種

##### 目標檔案儲存結構

| 段 | 功能 |
| --- | --- |
| File Header | 檔案頭，描述整個檔案的檔案屬性（包括檔案是否可執行、是靜態連結或動態連接及入口地址、目標硬體、目標作業系統等） |
| .text section | 程式碼段，執行語句編譯成的機器程式碼 |
| .data section | 資料段，已初始化的全域變數和局部靜態變數 |
| .bss section | BSS 段（Block Started by Symbol），未初始化的全域變數和局部靜態變數（因為預設值為 0，所以只是在此預留位置，不佔空間） |
| .rodata section | 唯讀資料段，存放唯讀資料，一般是程序裡面的唯讀變數（如 const 修飾的變數）和字串常數 |
| .comment section | 註釋資訊段，存放編譯器版本資訊 |
| .note.GNU-stack section | 堆疊提示段 |

> 其他段略

#### 連結的介面————符號

在連結中，目標檔案之間相互拼合實際上是目標檔案之間對地址的引用，即對函數和變數的地址的引用。我們將函數和變數統稱為符號（Symbol），函數名或變數名就是符號名（Symbol Name）。

如下符號表（Symbol Table）：

| Symbol（符號名） | Symbol Value （地址） |
| --- | --- |
| main | 0x100 |
| Add | 0x123 |
| ... | ... |

### Linux 的共享庫（Shared Library）

Linux 下的共享庫就是普通的 ELF 共享對象。

共享庫版本更新應該保證二進制介面 ABI（Application Binary Interface）的相容

#### 命名

`libname.so.x.y.z`

-   x：主版本號，不同主版本號的庫之間不相容，需要重新編譯
-   y：次版本號，高版本號向後相容低版本號
-   z：發佈版本號，不對介面進行更改，完全相容

#### 路徑

大部分包括 Linux 在內的開源系統遵循 FHS（File Hierarchy Standard）的標準，這標準規定了系統檔案如何存放，包括各個目錄結構、組織和作用。

-   `/lib`：存放系統最關鍵和最基礎的共享庫，如動態連結器、C 語言運行庫、數學庫等
-   `/usr/lib`：存放非系統執行階段所需要的關鍵性的庫，主要是開發庫
-   `/usr/local/lib`：存放跟作業系統本身並不十分相關的庫，主要是一些第三方應用程式的庫

> 動態連結器會在 `/lib`、`/usr/lib` 和由 `/etc/ld.so.conf` 組態檔案指定的，目錄中尋找共享庫

#### 環境變數

-   `LD_LIBRARY_PATH`：臨時改變某個應用程式的共享庫尋找路徑，而不會影響其他應用程式
-   `LD_PRELOAD`：指定預先裝載的一些共享庫甚至是目標檔案
-   `LD_DEBUG`：打開動態連結器的偵錯功能

#### so 共享庫的編寫

使用 CLion 編寫共享庫

建立一個名為 MySharedLib 的共享庫

CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.10)
project(MySharedLib)

set(CMAKE_CXX_STANDARD 11)

add_library(MySharedLib SHARED library.cpp library.h)
```

library.h

```c
#ifndef MYSHAREDLIB_LIBRARY_H
#define MYSHAREDLIB_LIBRARY_H

// 列印 Hello World!
void hello();

// 使用可變範本參數求和
template <typename T>
T sum(T t)
{
    return t;
}
template <typename T, typename ...Types>
T sum(T first, Types ... rest)
{
    return first + sum<T>(rest...);
}

#endif
```

library.cpp

```c
#include <iostream>
#include "library.h"

void hello() {
    std::cout << "Hello, World!" << std::endl;
}
```

#### so 共享庫的使用（被可執行項目呼叫）

使用 CLion 呼叫共享庫

建立一個名為 TestSharedLib 的可執行項目

CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.10)
project(TestSharedLib)

# C++11 編譯
set(CMAKE_CXX_STANDARD 11)

# 標頭檔路徑
set(INC_DIR /home/xx/code/clion/MySharedLib)
# 庫檔案路徑
set(LIB_DIR /home/xx/code/clion/MySharedLib/cmake-build-debug)

include_directories(${INC_DIR})
link_directories(${LIB_DIR})
link_libraries(MySharedLib)

add_executable(TestSharedLib main.cpp)

# 連結 MySharedLib 庫
target_link_libraries(TestSharedLib MySharedLib)
```

main.cpp

```c
#include <iostream>
#include "library.h"
using std::cout;
using std::endl;

int main() {

    hello();
    cout << "1 + 2 = " << sum(1,2) << endl;
    cout << "1 + 2 + 3 = " << sum(1,2,3) << endl;

    return 0;
}
```

執行結果

```
Hello, World!
1 + 2 = 3
1 + 2 + 3 = 6
```

### Windows 應用程式入口函數

-   GUI（Graphical User Interface）應用，連結器選項：`/SUBSYSTEM:WINDOWS`
-   CUI（Console User Interface）應用，連結器選項：`/SUBSYSTEM:CONSOLE`

\_tWinMain 與 \_tmain 函數聲明

```c
Int WINAPI _tWinMain(
    HINSTANCE hInstanceExe,
    HINSTANCE,
    PTSTR pszCmdLine,
    int nCmdShow);

int _tmain(
    int argc,
    TCHAR *argv[],
    TCHAR *envp[]);
```

| 應用程式類型 | 入口點函數 | 嵌入可執行檔案的啟動函數 |
| --- | --- | --- |
| 處理ANSI字元（串）的GUI應用程式 | \_tWinMain(WinMain) | WinMainCRTSartup |
| 處理Unicode字元（串）的GUI應用程式 | \_tWinMain(wWinMain) | wWinMainCRTSartup |
| 處理ANSI字元（串）的CUI應用程式 | \_tmain(Main) | mainCRTSartup |
| 處理Unicode字元（串）的CUI應用程式 | \_tmain(wMain) | wmainCRTSartup |
| 動態連結庫（Dynamic-Link Library） | DllMain | \_DllMainCRTStartup |

### Windows 的動態連結庫（Dynamic-Link Library）

> 部分知識點來自《Windows 核心程式設計（第五版）》

#### 用處

-   擴展了應用程式的特性
-   簡化了項目管理
-   有助於節省記憶體
-   促進了資源的共享
-   促進了本地化
-   有助於解決平台間的差異
-   可以用於特殊目的

#### 注意

-   建立 DLL，事實上是在建立可供一個可執行模組呼叫的函數
-   當一個模組提供一個記憶體分配函數（malloc、new）的時候，它必須同時提供另一個記憶體釋放函數（free、delete）
-   在使用 C 和 C++ 混編的時候，要使用 extern "C" 修飾符
-   一個 DLL 可以匯出函數、變數（避免匯出）、C++ 類（匯出匯入需要同編譯器，否則避免匯出）
-   DLL 模組：cpp 檔案中的 \_\_declspec(dllexport) 寫在 include 標頭檔之前
-   呼叫 DLL 的可執行模組：cpp 檔案的 \_\_declspec(dllimport) 之前不應該定義 MYLIBAPI

#### 載入 Windows 程序的搜尋順序

1.  包含可執行檔案的目錄
2.  Windows 的系統目錄，可以通過 GetSystemDirectory 得到
3.  16 位的系統目錄，即 Windows 目錄中的 System 子目錄
4.  Windows 目錄，可以通過 GetWindowsDirectory 得到
5.  處理程序的當前目錄
6.  PATH 環境變數中所列出的目錄

#### DLL 入口函數

DllMain 函數

```c
BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved)
{
    switch(fdwReason)
    {
    case DLL_PROCESS_ATTACH:
        // 第一次將一個DLL對應到處理程序地址空間時呼叫
        // The DLL is being mapped into the process' address space.
        break;
    case DLL_THREAD_ATTACH:
        // 當處理程序建立一個執行緒的時候，用於告訴DLL執行與執行緒相關的初始化（非主執行緒執行）
        // A thread is bing created.
        break;
    case DLL_THREAD_DETACH:
        // 系統呼叫 ExitThread 執行緒退出前，即將終止的執行緒通過告訴DLL執行與執行緒相關的清理
        // A thread is exiting cleanly.
        break;
    case DLL_PROCESS_DETACH:
        // 將一個DLL從處理程序的地址空間時呼叫
        // The DLL is being unmapped from the process' address space.
        break;
    }
    return (TRUE); // Used only for DLL_PROCESS_ATTACH
}
```

#### 載入解除安裝庫

LoadLibrary、LoadLibraryExA、LoadPackagedLibrary、FreeLibrary、FreeLibraryAndExitThread 函數聲明

```c
// 載入庫
HMODULE WINAPI LoadLibrary(
  _In_ LPCTSTR lpFileName
);
HMODULE LoadLibraryExA(
  LPCSTR lpLibFileName,
  HANDLE hFile,
  DWORD  dwFlags
);
// 若要在通用 Windows 平台（UWP）應用中載入 Win32 DLL，需要呼叫 LoadPackagedLibrary，而不是 LoadLibrary 或 LoadLibraryEx
HMODULE LoadPackagedLibrary(
  LPCWSTR lpwLibFileName,
  DWORD   Reserved
);

// 解除安裝庫
BOOL WINAPI FreeLibrary(
  _In_ HMODULE hModule
);
// 解除安裝庫和退出執行緒
VOID WINAPI FreeLibraryAndExitThread(
  _In_ HMODULE hModule,
  _In_ DWORD   dwExitCode
);
```

#### 顯示地連結到匯出符號

GetProcAddress 函數聲明

```c
FARPROC GetProcAddress(
  HMODULE hInstDll,
  PCSTR pszSymbolName  // 只能接受 ANSI 字串，不能是 Unicode
);
```

#### DumpBin.exe 查看 DLL 資訊

在 `VS 的開發人員命令提示符` 使用 `DumpBin.exe` 可查看 DLL 庫的匯出段（匯出的變數、函數、類名的符號）、相對虛擬地址（RVA，relative virtual address）。如：

```
DUMPBIN -exports D:\mydll.dll
```

#### LoadLibrary 與 FreeLibrary 流程圖

LoadLibrary 與 FreeLibrary 流程圖

##### LoadLibrary

[![WindowsLoadLibrary](https://camo.githubusercontent.com/667f33ba1c8467c8afc4bd572b931d4d3ff741d6076da8c3a00e52d39be5dc6f/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f57696e646f77734c6f61644c6962726172792e706e67)](https://camo.githubusercontent.com/667f33ba1c8467c8afc4bd572b931d4d3ff741d6076da8c3a00e52d39be5dc6f/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f57696e646f77734c6f61644c6962726172792e706e67)

##### FreeLibrary

[![WindowsFreeLibrary](https://camo.githubusercontent.com/ccc69f6ad27a616a88c976df09119430927014d438c14016dff7ce54fe91f00e/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f57696e646f7773467265654c6962726172792e706e67)](https://camo.githubusercontent.com/ccc69f6ad27a616a88c976df09119430927014d438c14016dff7ce54fe91f00e/68747470733a2f2f67697465652e636f6d2f6875696875742f696e746572766965772f7261772f6d61737465722f696d616765732f57696e646f7773467265654c6962726172792e706e67)

#### DLL 庫的編寫（匯出一個 DLL 模組）

DLL 庫的編寫（匯出一個 DLL 模組） DLL 標頭檔

```c
// MyLib.h

#ifdef MYLIBAPI

// MYLIBAPI 應該在全部 DLL 原始檔的 include "Mylib.h" 之前被定義
// 全部函數/變數正在被匯出

#else

// 這個標頭檔被一個exe原始碼模組包含，意味著全部函數/變數被匯入
#define MYLIBAPI extern "C" __declspec(dllimport)

#endif

// 這裡定義任何的資料結構和符號

// 定義匯出的變數（避免匯出變數）
MYLIBAPI int g_nResult;

// 定義匯出函數原型
MYLIBAPI int Add(int nLeft, int nRight);
```

DLL 原始檔

```c
// MyLibFile1.cpp

// 包含標準Windows和C執行階段標頭檔
#include <windows.h>

// DLL原始碼檔案匯出的函數和變數
#define MYLIBAPI extern "C" __declspec(dllexport)

// 包含匯出的資料結構、符號、函數、變數
#include "MyLib.h"

// 將此DLL原始碼檔案的程式碼放在此處
int g_nResult;

int Add(int nLeft, int nRight)
{
    g_nResult = nLeft + nRight;
    return g_nResult;
}
```

#### DLL 庫的使用（執行階段動態連結 DLL）

DLL 庫的使用（執行階段動態連結 DLL）

```c
// A simple program that uses LoadLibrary and 
// GetProcAddress to access myPuts from Myputs.dll. 
 
#include <windows.h> 
#include <stdio.h> 
 
typedef int (__cdecl *MYPROC)(LPWSTR); 
 
int main( void ) 
{ 
    HINSTANCE hinstLib; 
    MYPROC ProcAdd; 
    BOOL fFreeResult, fRunTimeLinkSuccess = FALSE; 
 
    // Get a handle to the DLL module.
 
    hinstLib = LoadLibrary(TEXT("MyPuts.dll")); 
 
    // If the handle is valid, try to get the function address.
 
    if (hinstLib != NULL) 
    { 
        ProcAdd = (MYPROC) GetProcAddress(hinstLib, "myPuts"); 
 
        // If the function address is valid, call the function.
 
        if (NULL != ProcAdd) 
        {
            fRunTimeLinkSuccess = TRUE;
            (ProcAdd) (L"Message sent to the DLL function\n"); 
        }
        // Free the DLL module.
 
        fFreeResult = FreeLibrary(hinstLib); 
    } 

    // If unable to call the DLL function, use an alternative.
    if (! fRunTimeLinkSuccess) 
        printf("Message printed from executable\n"); 

    return 0;
}
```

### 運行庫（Runtime Library）

#### 典型程式執行步驟

1.  作業系統建立處理程序，把控制權交給程序的入口（往往是運行庫中的某個入口函數）
2.  入口函數對運行庫和程式執行環境進行初始化（包括堆、I/O、執行緒、全域變數構造等等）。
3.  入口函數初始化後，呼叫 main 函數，正式開始執行程序主體部分。
4.  main 函數執行完畢後，返回到入口函數進行清理工作（包括全域變數析構、堆銷毀、關閉I/O等），然後進行系統呼叫結束處理程序。

> 一個程序的 I/O 指代程序與外界的互動，包括檔案、管程、網路、命令列、訊號等。更廣義地講，I/O 指代作業系統理解為 “檔案” 的事物。

#### glibc 入口

`_start -> __libc_start_main -> exit -> _exit`

其中 `main(argc, argv, __environ)` 函數在 `__libc_start_main` 裡執行。

#### MSVC CRT 入口

`int mainCRTStartup(void)`

執行如下操作：

1.  初始化和 OS 版本有關的全域變數。
2.  初始化堆。
3.  初始化 I/O。
4.  獲取命令列參數和環境變數。
5.  初始化 C 庫的一些資料。
6.  呼叫 main 並記錄返回值。
7.  檢查錯誤並將 main 的返回值返回。

#### C 語言運行庫（CRT）

大致包含如下功能：

-   啟動與退出：包括入口函數及入口函數所依賴的其他函數等。
-   標準函數：有 C 語言標準規定的C語言標準庫所擁有的函數實現。
-   I/O：I/O 功能的封裝和實現。
-   堆：堆的封裝和實現。
-   語言實現：語言中一些特殊功能的實現。
-   偵錯：實現偵錯功能的程式碼。

#### C語言標準庫（ANSI C）

包含：

-   標準輸入輸出（stdio.h）
-   檔案操作（stdio.h）
-   字元操作（ctype.h）
-   字串操作（string.h）
-   數學函數（math.h）
-   資源管理（stdlib.h）
-   格式轉換（stdlib.h）
-   時間/日期（time.h）
-   斷言（assert.h）
-   各種類型上的常數（limits.h & float.h）
-   變長參數（stdarg.h）
-   非局部跳轉（setjmp.h）

## 📚 書籍

> [huihut/CS-Books](https://github.com/huihut/CS-Books)：📚 Computer Science Books 電腦技術類書籍 PDF

### 語言

-   《C++ Primer》
-   《Effective C++》
-   《More Effective C++》
-   《深度探索 C++ 對象模型》
-   《深入理解 C++11》
-   《STL 原始碼剖析》

### 演算法

-   《劍指 Offer》
-   《程式設計珠璣》
-   《程式設計師面試寶典》

### 系統

-   《深入理解電腦系統》
-   《Windows 核心程式設計》
-   《Unix 環境高級程式設計》

### 網路

-   《Unix 網路程式設計》
-   《TCP/IP 詳解》

### 其他

-   《程式設計師的自我修養》

## 🔱 C/C++ 發展方向

> C/C++ 發展方向甚廣，包括不限於以下方向， 以下列舉一些大廠校招崗位要求。

### 後台/伺服器

【後台開發】

-   程式設計基本功紮實，掌握 C/C++/JAVA 等開發語言、常用演算法和資料結構；
-   熟悉 TCP/UDP 網路協議及相關程式設計、處理程序間通訊程式設計；
-   瞭解 Python、Shell、Perl 等指令碼語言；
-   瞭解 MYSQL 及 SQL 語言、程式設計，瞭解 NoSQL, key-value 儲存原理；
-   全面、紮實的軟體知識結構，掌握作業系統、軟體工程、設計模式、資料結構、資料庫系統、網路安全等專業知識；
-   瞭解分佈式系統設計與開發、負載平衡技術，系統容災設計，高可用系統等知識。

### 桌面客戶端

【PC 客戶端開發】

-   電腦軟體相關專業本科或以上學歷，熱愛程式設計，基礎紮實，理解演算法和資料結構相關知識；
-   熟悉 windows 作業系統的記憶體管理、檔案系統、處理程序執行緒調度；
-   熟悉 MFC/windows 介面實現機制，熟練使用 VC，精通 C/C++，熟練使用 STL，以及 Windows 下網路程式設計經驗；
-   熟練掌握 Windows 客戶端開發、偵錯，有 Windows 應用軟體開發經驗優先；
-   對於創新及解決具有挑戰性的問題充滿激情，具有良好的演算法基礎及系統分析能力。

### 圖形學/遊戲/VR/AR

【遊戲客戶端開發】

-   電腦科學/工程相關專業本科或以上學歷，熱愛程式設計，基礎紮實，理解演算法、資料結構、軟體設計相關知識；
-   至少掌握一種遊戲開發常用的程式語言，具 C++/C# 程式設計經驗優先；
-   具遊戲引擎（如 Unity、Unreal）使用經驗者優先；
-   瞭解某方面的遊戲客戶端技術（如圖形、音訊、動畫、物理、人工智慧、網路同步）者優先考慮；
-   對於創新及解決具有挑戰性的問題充滿激情，有較強的學習能力、分析及解決問題能力，具備良好的團隊合作意識；
-   具閱讀英文技術文件能力；
-   熱愛遊戲。

### 測試開發

【測試開發】

-   電腦或相關專業本科及以上學歷；
-   一至兩年的 C/C++/Python 或其他電腦語言的程式設計經驗；
-   具備撰寫測試計畫、測試用例、以及實現性能和安全等測試的能力；
-   具備實現自動化系統的能力；
-   具備定位調查產品缺陷能力、以及程式碼等級偵錯缺陷的能力；
-   工作主動積極，有責任心，具有良好的團隊合作精神。

### 網路安全/逆向

【安全技術】

-   熱愛網際網路，對作業系統和網路安全有狂熱的追求，專業不限；
-   熟悉漏洞挖掘、網路安全攻防技術，瞭解常見駭客攻擊手法；
-   掌握基本開發能力，熟練使用 C/C++ 語言；
-   對資料庫、作業系統、網路原理有較好掌握；
-   具有軟體逆向，網路安全攻防或安全系統開發經驗者優先。

### 嵌入式/物聯網

【嵌入式應用開發】

-   有良好的程式設計基礎，熟練掌握 C/C++ 語言；
-   掌握作業系統、資料結構等軟體開發必備知識；
-   具備較強的溝通理解能力及良好的團隊合作意識；
-   有 Linux/Android 系統平台的開發經驗者優先。

### 音視訊/串流媒體/SDK

【音視訊編解碼】

1.  碩士及以上學歷，電腦、訊號處理、數學、資訊類及相關專業和方向；
2.  視訊編解碼基礎紮實，熟常用的 HEVC 或 H264，有較好的數字訊號處理基礎；
3.  掌握 C/C++，程式碼能力強, 熟悉一種彙編語言尤佳；
4.  較強的英文文獻閱讀能力；
5.  學習能力強，具有團隊協作精神，有較強的抗壓能力。

### 電腦視覺/機器學習

【電腦視覺研究】

-   電腦、應用數學、模式識別、人工智慧、自控、統計學、運籌學、生物資訊、物理學/量子計算、神經科學、社會學/心理學等專業，圖像處理、模式識別、機器學習相關研究方向，本科及以上，博士優先；
-   熟練掌握電腦視覺和圖像處理相關的基本演算法及應用；
-   較強的演算法實現能力，熟練掌握 C/C++ 程式設計，熟悉 Shell/Python/Matlab 至少一種程式語言；
-   在電腦視覺、模式識別等學術會議或者期刊上發表論文、相關國際比賽獲獎、及有相關專利者優先。

## 💯 複習刷題網站

-   [cplusplus](http://www.cplusplus.com/)
-   [cppreference](https://zh.cppreference.com/w/%E9%A6%96%E9%A1%B5)
-   [runoob](http://www.runoob.com/cplusplus/cpp-tutorial.html)
-   [leetcode](https://leetcode.com/) | [leetcode-cn](https://leetcode-cn.com/)
-   [lintcode](https://www.lintcode.com/)
-   [nowcoder](https://www.nowcoder.net/)

## 📝 面試題目經驗

-   [牛客網 . 2020秋招面經大彙總！（崗位劃分）](https://www.nowcoder.com/discuss/205497)
-   [牛客網 . 【備戰秋招】2020屆秋招備戰攻略](https://www.nowcoder.com/discuss/197116)
-   [牛客網 . 2019校招面經大彙總！【每日更新中】](https://www.nowcoder.com/discuss/90907)
-   [牛客網 . 2019校招技術類崗位面經彙總【技術類】](https://www.nowcoder.com/discuss/146655)
-   [牛客網 . 2018校招筆試真題彙總](https://www.nowcoder.com/discuss/68802)
-   [牛客網 . 2017秋季校園招聘筆經面經專題彙總](https://www.nowcoder.com/discuss/12805)
-   [牛客網 . 史上最全2017春招面經大合集！！](https://www.nowcoder.com/discuss/25268)
-   [牛客網 . 面試題乾貨在此](https://www.nowcoder.com/discuss/57978)
-   [知乎 . 網際網路求職路上，你見過哪些寫得很好、很用心的面經？最好能分享自己的面經、心路歷程。](https://www.zhihu.com/question/29693016)
-   [知乎 . 網際網路公司最常見的面試演算法題有哪些？](https://www.zhihu.com/question/24964987)
-   [CSDN . 全面整理的C++面試題](http://blog.csdn.net/ljzcome/article/details/574158)
-   [CSDN . 百度研發類面試題（C++方向）](http://blog.csdn.net/Xiongchao99/article/details/74524807?locationNum=6&fps=1)
-   [CSDN . c++常見面試題30道](http://blog.csdn.net/fakine/article/details/51321544)
-   [CSDN . 騰訊2016實習生面試經驗（已經拿到offer)](http://blog.csdn.net/onever_say_love/article/details/51223886)
-   [cnblogs . C++面試集錦( 面試被問到的問題 )](https://www.cnblogs.com/Y1Focus/p/6707121.html)
-   [cnblogs . C/C++ 筆試、面試題目大彙總](https://www.cnblogs.com/fangyukuan/archive/2010/09/18/1829871.html)
-   [cnblogs . 常見C++面試題及基本知識點總結（一）](https://www.cnblogs.com/LUO77/p/5771237.html)
-   [segmentfault . C++常見面試問題總結](https://segmentfault.com/a/1190000003745529)


- [huihut/interview: 📚 C/C++ 技術面試基礎知識總結，包括語言、程序庫、資料結構、演算法、系統、網路、連結裝載庫等知識及面試經驗、招聘、內推等資訊。This repository is a summary of the basic knowledge of recruiting job seekers and beginners in the direction of C/C++ technology, including language, program library, data structure, algorithm, system, network, link loading library, interview experience, recruitment, recommendation, etc.](https://github.com/huihut/interview?tab=readme-ov-file#cc)