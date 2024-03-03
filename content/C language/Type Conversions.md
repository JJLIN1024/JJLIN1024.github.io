---
title: Type Conversions
date: 2023-12-13
lastmod: 2023-12-13
author:
  - Jimmy Lin
tags: 
draft: false
---

# Chapter 4. Type Conversions

In C, operands of different types can be combined in one operation. For example, the following expressions are permissible:

```
    double dVar = 2.5;   // Define dVar as a variable of type double.
    dVar *= 3;           // Multiply dVar by an integer constant.
    if ( dVar &lt; 10L )    // Compare dVar with a long-integer constant.
      { /* ... */ }
```

When the operands have different types, the compiler tries to convert them to a uniform type before performing the operation. In certain cases, furthermore, you must insert type conversion instructions in your program. A type conversion yields the value of an expression in a new type, which can be either the type `void` (meaning that the value of the expression is discarded: see "[Expressions of Type void](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html#cinanut-CHP-2-SECT-6.2 "Expressions of Type void")" in [Chapter 2](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html "Chapter 2. Types")), or a scalar type—that is, an arithmetic type or a pointer. For example, a pointer to a structure can be converted into a different pointer type. However, an actual structure value cannot be converted into a different structure type.

The compiler provides _implicit_ type conversions when operands have mismatched types, or when you call a function using an argument whose type does not match the function’s corresponding parameter. Programs also perform implicit type conversion as necessary when initializing variables or otherwise assigning values to them. If the necessary conversion is not possible, the compiler issues an error message.

You can also convert values from one type to another _explicitly_ using the _cast operator_ (see [Chapter 5](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch05.html "Chapter 5. Expressions and Operators")):

```
    (<em class="replaceable"><code>type_name</code></em>) <em class="replaceable"><code>expression</code></em>
```

In the following example, the cast operator causes the division of one integer variable by another to be performed as a floating-point operation:

```
    int sum = 22, count = 5;
    double mean = (double)sum / count;
```

Because the cast operator has precedence over division, the value of `sum` in this example is first converted to type `double`. The compiler must then implicitly convert the divisor, the value of `count`, to the same type before performing the division.

You should always use the cast operator whenever there is a possibility of losing information, as in a conversion from `int` to `unsigned int`, for example. Explicit casts avoid compiler warnings, and also signpost your program’s type conversions for other programmers. For example, using an explicit cast to `void` when you discard the return value of a function serves as a reminder that you may be disregarding the function’s error indications.

To illustrate the implicit type conversions that the compiler provides, however, the examples in this chapter use the cast operator only when it is strictly necessary.

# Conversion of Arithmetic Types

Type conversions are always possible between any two arithmetic types , and the compiler performs them implicitly wherever necessary. The conversion preserves the value of an expression if the new type is capable of representing it. This is not always the case. For example, when you convert a negative value to an unsigned type, or convert a floating-point fraction from type `double` to the type `int`, the new type simply cannot represent the original value. In such cases the compiler generally issues a warning.

## Hierarchy of Types

When arithmetic operands have different types, the implicit type conversion is governed by the types’ _conversion rank_ . The types are ranked according to the following rules:

-   Any two unsigned integer types have different conversion ranks. If one is wider than the other, then it has a higher rank.
    
-   Each signed integer type has the same rank as the corresponding unsigned type. The type `char` has the same rank as `signed char` and `unsigned char`.
    
-   The standard integer types are ranked in the order:
    
    ```
        _Bool &lt; char &lt; short &lt; int &lt; long &lt; long long
    ```
    
-   Any standard integer type has a higher rank than an extended integer type of the same width. (Extended integer types are described in the section “Integer Types with Exact Width (C99)” in [Chapter 2](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html "Chapter 2. Types").)
    
-   Every enumerated type has the same rank as its corresponding integer type (see "[Enumerated Types](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html#cinanut-CHP-2-SECT-5 "Enumerated Types")" in [Chapter 2](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html "Chapter 2. Types")).
    
-   The floating-point types are ranked in the following order:
    
    ```
        float &lt; double &lt; long double
    ```
    
-   The lowest-ranked floating-point type, `float`, has a higher rank than any integer type.
    
-   Every complex floating-point type has the same rank as the type of its real and imaginary parts.
    

## Integer Promotion

In any expression, you can always use a value whose type ranks lower than `int` in place of an operand of type `int` or `unsigned int`. You can also use a bit-field as an integer operand (bit-fields are discussed in [Chapter 10](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch10.html "Chapter 10. Structures and Unions and Bit-Fields")). In these cases, the compiler applies _integer promotion_ : any operand whose type ranks lower than `int` is automatically converted to the type `int`, provided `int` is capable of representing all values of the operand’s original type. If `int` is not sufficient, the operand is converted to `unsigned int`.

Integer promotion always preserves the value of the operand. Some examples:

```
    char c = '?';
    unsigned short var = 100;

    if ( c &lt; 'A' )        // The character constant 'A' has type int: the value
                          // of c is implicitly promoted to int for the
                          // comparison.

      var = var + 1;      // Before the addition, the value of var is promoted
                          // to int or unsigned int.
```

In the last of these statements, the compiler promotes the first addend, the value of `var`, to the type `int` or `unsigned int` before performing the addition. If `int` and `short` have the same width, which is likely on a 16-bit computer, then the signed type `int` is not wide enough to represent all possible values of the `unsigned short` variable `var`. In this case, the value of `var` is promoted to `unsigned int`. After the addition, the result is converted to `unsigned short` for assignment to `var`.

## Usual Arithmetic Conversions

The _usual arithmetic conversions_ are the implicit conversions that are automatically applied to operands of different arithmetic types for most operators. The purpose of the usual arithmetic conversions is to find a _common real type_ for all of the operands and the result of the operation.

The usual arithmetic conversions are performed implicitly for the following operators:

-   Arithmetic operators with two operands: `*`, `/`, `%`, `+`, and `-`
    
-   Relational and equality operators: `<`, `<=`, `>`, `>=`, `==`, and `!=`
    
-   The bitwise operators, `&`, `|`, and `^`
    
-   The conditional operator, `?:` (for the second and third operands)
    

With the exception of the relational and equality operators, the common real type obtained by the usual arithmetic conversions is generally the type of the result. However, if one or more of the operands has a complex floating-point type, then the result also has a complex floating-point type.

The usual arithmetic conversions are applied as follows:

1.  If either operand has a floating-point type, then the operand with the lower conversion rank is converted to a type with the same rank as the other operand. Real types are converted only to real types, however, and complex types only to complex.
    
    In other words, if either operand has a complex floating-point type, the usual arithmetic conversion matches only the real type on which the actual type of the operand is based. Some examples:
    
    ```
        #include &lt;complex.h&gt;
        // ...
        short n = -10;
        double x = 0.5, y = 0.0;
        float _Complex f_z = 2.0F + 3.0F * I;
        double _Complex d_z = 0.0;
    
        y  = n * x;           // The value of n is converted to type double.
        d_z = f_z + x;        // Only the value of f_z is converted to
                              // double _Complex.
                              // The result of the operation also has type
                              // double _Complex.
    
        f_z = f_z / 3;        // The constant value 3 is converted to float.
        d_z = d_z − f_z;      // The value of f_z is converted to the type
                              // double _Complex.
    ```
    
2.  If both operands are integers, integer promotion is first performed on both operands. If after integer promotion the operands still have different types, conversion continues as follows:
    
    1.  If one operand has an _unsigned_ type _`T`_ whose conversion rank is at least as high as that of the other operand’s type, then the other operand is converted to type _`T`_.
        
    2.  Otherwise, one operand has a _signed_ type _`T`_ whose conversion rank is higher than that of the other operand’s type. The other operand is converted to type _`T`_ only if type _`T`_ is capable of representing all values of its previous type. If not, then both operands are converted to the unsigned type that corresponds to the signed type _`T`_.
        
    

The following lines of code contain some examples:

```
    int i = -1;
    unsigned int limit = 200U;
    long n = 30L;

    if ( i &lt; limit )
      x = limit * n;
```

In this example, to evaluate the comparison in the `if` condition, the value of `i`, −1, must first be converted to the type `unsigned int`. The result is a large positive number. On a 32-bit system, that number is 2<sup>32</sup> − 1, and on any system it is greater than `limit`. Hence, the `if` condition is false.

In the last line of the example, the value of `limit` is converted to `n`’s type, `long`, if the value range of `long` contains the whole value range of `unsigned int`. If not—for example, if both `int` and `long` are 32 bits wide—then both multiplicands are converted to `unsigned long`.

The usual arithmetic conversions preserve the operand’s value, except in the following cases:

-   When an integer of great magnitude is converted to a floating-point type, the target type’s precision may not be sufficient to represent the number exactly.
    
-   Negative values are outside the value range of unsigned types.
    

In these two cases, values that exceed the range or precision of the target type are converted as described under "[The Results of Arithmetic Type Conversions](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch04.html#cinanut-CHP-4-SECT-1.5 "The Results of Arithmetic Type Conversions"),” later in this chapter.

## Other Implicit Type Conversions

The compiler also automatically converts arithmetic values in the following cases:

-   In assignments and initializations, the value of the right operand is always converted to the type of the left operand.
    
-   In function calls, the arguments are converted to the types of the corresponding parameters. If the parameters have not been declared, then the _default argument promotions_ are applied: integer promotion is performed on integer arguments, and arguments of type `float` are promoted to `double`.
    
-   In `return` statements, the value of the `return` expression is converted to the function’s return type.
    

In a compound assignment, such as `x += 2.5`, the values of both operands are first subject to the usual arithmetic conversions, then the result of the arithmetic operation is converted, as for a simple assignment, to the type of the left operand. Some examples:

```
    #include &lt;math.h&gt;       // Declares the function double sqrt( double ).

    int   i = 7;
    float x = 0.5; // The constant value is converted from double to float.

    i = x;         // The value of x is converted from float to int.

    x += 2.5;      // Before the addition, the value of x is converted to
                   // double. Afterward, the sum is converted to float for
                   // assignment to x.

    x = sqrt( i ); // Calculate the square root of i:
                   // The argument is converted from int to double; the return
                   // value is converted from double to float for assignment to x.

    long my_func()
    {
      /* ... */
      return 0;    // The constant 0 is converted to long, the function's return
                   // type.
    }
```

## The Results of Arithmetic Type Conversions

Because the different types have different purposes, representational characteristics, and limitations, converting a value from one type to another often involves the application of special rules to deal with such peculiarities. In general, the exact result of a type conversion depends primarily on the characteristics of the target type.

### Conversions to \_Bool

Any value of any scalar type can be converted to `_Bool`. The result is 0—i.e., `false`—if the scalar value is equal to 0; and 1, or `true`, if it is nonzero. Because a null pointer compares equal to zero, its value becomes `false` on conversion to `_Bool`.

### Conversions to unsigned integer types other than \_Bool

Integer values are always preserved if they are within the range of the new unsigned type—in other words, if they are between 0 and `U`_`type`_`_MAX`, where `U`_`type`_`_MAX` is the greatest value that can be represented by `unsigned` _`type`_.

For values outside the new unsigned type’s range, the value after conversion is the value obtained by adding or subtracting (`U`_`type`_`_MAX` + 1) as many times as necessary until the result is within the range of the new type. The following example illustrates the assignment of a negative value to an unsigned integer type:

```
    #include &lt;limits.h&gt;       // Defines the macros USHRT_MAX, UINT_MAX, etc.
    unsigned short  n = 1000; // The value 1000 is within the range of unsigned
                              // short;
    n = -1;                   // the value -1 must be converted.
```

To adjust a signed value of −1 to the variable’s unsigned type, the program implicitly adds `USHRT_MAX` + 1 to it until a result within the type’s range is obtained. Because −1 + (`USHRT_MAX` + 1) = `USHRT_MAX`, the final statement in the previous example is equivalent to `n = USHRT_MAX;`.

For positive integer values, subtracting (`U`_`type`_`_MAX` + 1) as often as necessary to bring the value into the new type’s range is the same as the remainder of a division by (`U`_`type`_`_MAX` + 1), as the following example illustrates:

```
    #include &lt;limits.h&gt;       // Defines the macros USHRT_MAX, UINT_MAX, etc.
    unsigned short  n = 0;
    n = 0xFEDCBA;             // The value is beyond the range of unsigned
                              // short.
```

If `unsigned short` is 16 bits wide, then its maximum value, `USHRT_MAX`, is hexadecimal FFFF. When the value FEDCBA is converted to `unsigned short`, the result is the same as the remainder of a division by hexadecimal 10000 (that’s `USHRT_MAX` + 1), which is always FFFF or less. In this case, the value assigned to `n` is hexadecimal DCBA.

To convert a real floating-point number to an unsigned or signed integer type, the compiler discards the fractional part. If the remaining integer portion is outside the range of the new type, the result of the conversion is undefined. Example:

```
    double x = 2.9;

    unsigned long n = x;             // The fractional part of x is simply lost.

    unsigned long m = round(x);      // If x is non-negative, this has the
                                     // same effect as m = x + 0.5;
```

In the initialization of `n` in this example, the value of `x` is converted from `double` to `unsigned long` by discarding its fractional part, 0.9. The integer part, 2, is the value assigned to `n`. In the initialization of `m`, the C99 function `round()` rounds the value of `x` to the nearest integer value (whether higher or lower), and returns a value of type `double`. The fractional part of the resulting `double` value—3.0 in this case—is thus equal to zero before being discarded through type conversion for the assignment to `m`.

When a complex number is converted to an unsigned integer type, the imaginary part is first discarded. Then the resulting floating-point value is converted as described previously. Example:

```
    #include &lt;limits.h&gt;         // Defines macros such as UINT_MAX.
    #include &lt;complex.h&gt;        // Defines macros such as the imaginary
                                // constant I.

    unsigned int  n = 0;
    float _Complex  z = -1.7 + 2.0 * I;

    n = z;                      // In this case, the effect is the same as
                                // n = -1;
                                // The resulting value of n is UINT_MAX.
```

The imaginary part of `z` is discarded, leaving the real floating-point value −1.7. Then the fractional part of the floating-point number is also discarded. The remaining integer value, −1, is converted to `unsigned int` by adding `UINT_MAX` +1, so that the value ultimately assigned to `n` is equal to `UINT_MAX`.

### Conversions to signed integer types

The problem of exceeding the target type’s value range can also occur when a value is converted from an integer type, whether signed or unsigned, to a different, signed integer type; for example, when a value is converted from the type `long` or `unsigned int` to the type `int`. The result of such an overflow on conversion to a signed integer type, unlike conversions to unsigned integer types, is left up to the implementation.

Most compilers discard the highest bits of the original value’s binary representation and interpret the lowest bits according to the new type. As the following example illustrates, under this conversion strategy the existing bit pattern of an `unsigned int` is interpreted as a signed `int` value:

```
    #include &lt;limits.h&gt;         // Defines macros such as UINT_MAX
    int i = UINT_MAX;           // Result: i = -1 (in two's complement
                                // representation)
```

However, depending on the compiler, such a conversion attempt may also result in a signal being raised to inform the program of the value range overflow.

When a real or complex floating-point number is converted to a signed integer type, the same rules apply as for conversion to an unsigned integer type, as described in the previous section.

### Conversions to real floating-point types

Not all integer values can be exactly represented in floating-point types. For example, although the value range of the type `float` includes the range of the types `long` and `long long`, `float` is precise to only six decimal digits. Thus, some `long` values cannot be stored exactly in a `float` object. The result of such a conversion is the next lower or next higher representable value, as the following example illustrates:

```
    long  l_var = 123456789L;
    float f_var = l_var;           // Implicitly converts long value to float.

    printf("The rounding error (f_var - l_var) is %f\n", f_var - l_var);
```

Remember that the subtraction in this example, like all floating-point arithmetic, is performed with at least `double` precision (see "[Floating-Point Types](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html#cinanut-CHP-2-SECT-3 "Floating-Point Types")" in [Chapter 2](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html "Chapter 2. Types")). Typical output produced by this code is:

```
    The rounding error (f_var - l_var;) is 3.000000
```

Any value in a floating-point type can be represented exactly in another floating-point type of greater precision. Thus when a `double` value is converted to `long double`, or when a `float` value is converted to `double` or `long double`, the value is exactly preserved. In conversions from a more precise to a less precise type, however, the value being converted may be beyond the range of the new type. If the value exceeds the target type’s range, the result of the conversion is undefined. If the value is within the target type’s range, but not exactly representable in the target type’s precision, then the result is the next smaller or next greater representable value. The program in [Example 2-2](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html#cinanut-CHP-2-EX-2 "Example 2-2. Illustrating the precision of type float") illustrates the rounding error produced by such a conversion to a less-precise floating-point type.

When a complex number is converted to a real floating-point type, the imaginary part is simply discarded, and the result is the complex number’s real part, which may have to be further converted to the target type as described in this section.

### Conversions to complex floating-point types

When an integer or a real floating-point number is converted to a complex type, the real part of the result is obtained by converting the value to the corresponding real floating-point type as described in the previous section. The imaginary part is zero.

When a complex number is converted to a different complex type, the real and imaginary parts are converted separately according to the rules for real floating-point types.

```
    #include &lt;complex.h&gt;        // Defines macros such as the imaginary
                                // constant I
    double _Complex dz = 2;
    float _Complex fz = dz + I;
```

In the first of these two initializations, the integer constant 2 is implicitly converted to `double _Complex` for assignment to `dz`. The resulting value of `dz` is 2.0 + 0.0 × `I`.

In the initialization of `fz`, the two parts of the `double _Complex` value of `dz` are converted (after the addition) to `float`, so that the real part of `fz` is equal to `2.0F`, and the imaginary part `1.0F`.

# Conversion of Nonarithmetic Types

Pointers and the names of arrays and functions are also subject to certain implicit and explicit type conversions. Structures and unions cannot be converted, although pointers to them can be converted to and from other pointer types.

## Array and Function Designators

An array or function designator is any expression that has an array or function type. In most cases, the compiler implicitly converts an expression with an array type, such as the name of an array, into a pointer to the array’s first element. The array expression is _not_ converted into a pointer only in the following cases:

-   When the array is the operand of the `sizeof` operator
    
-   When the array is the operand of the address operator `&`
    
-   When a string literal is used to initialize an array of `char` or `wchar_t`
    

The following examples demonstrate the implicit conversion of array designators into pointers, using the conversion specification `%p` to print pointer values:

```
    #include &lt;stdio.h&gt;

    int *iPtr = 0;                      // A pointer to int, initialized with 0.
    int iArray[ ] = { 0, 10, 20 };       // An array of int, initialized.

    int array_length = sizeof(iArray) / sizeof(int); // The number of elements:
                                                     // in this case, 3.

    printf("The array starts at the address %p.\n", iArray);

    *iArray = 5;                      // Equivalent to iArray[0] = 5;

    iPtr = iArray + array_length - 1; // Point to the last element of iArray:
                                      // Equivalent to
                                      // iPtr = &amp;iArray[array_length-1];

    printf("The last element of the array is %d.\n", *iPtr);
```

In the initialization of `array_length` in this example, the expression `sizeof(iArray)` yields the size of the whole array, not the size of a pointer. However, the same identifier `iArray` is implicitly converted to a pointer in the other three statements in which it appears:

-   As an argument in the first `printf()` call.
    
-   As the operand of the dereferencing operator `*`.
    
-   In the pointer arithmetic operations and assignment to `iPtr` (see also "[Modifying and Comparing Pointers](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch09.html#cinanut-CHP-9-SECT-2.2 "Modifying and Comparing Pointers")" in [Chapter 9](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch09.html "Chapter 9. Pointers")).
    

The names of character arrays are used as pointers in string operations, as in this example:

```
    #include &lt;stdio.h&gt;
    #include &lt;string.h&gt;            // Declares size_t strlen( const char *s )

    char msg[80] = "I'm a string literal.";    // Initialize an array of char.
    printf("The string is %d characters long.\n", strlen(msg));
                                               // Answer: 21.
    printf("The array named msg is %d bytes long.\n", sizeof(msg));
                                               // Answer: 80.
```

In the function call `strlen(msg)` in this example, the array identifier `msg` is implicitly converted to a pointer to the array’s first element with the function parameter’s type, `const char *`. Internally, `strlen()` merely counts the characters beginning at that address until the first null character, the string terminator.

Similarly, any expression that designates a function, such as a function name, can also be implicitly converted into a pointer to the function. Again, this conversion does not apply when the expression is the operand of the address operator `&`. The `sizeof` operator cannot be used with an operand of function type. The following example illustrates the implicit conversion of function names to pointers. The program initializes an array of pointers to functions, then calls the functions in a loop.

```
    #include &lt;stdio.h&gt;
    void func0() { puts("This is the function func0(). "); }  // Two functions.
    void func1() { puts("This is the function func1(). "); }
    /* ... */
    void (*funcTable[2])(void) = { func0, func1 }; // Array of two pointers to
                                                   // functions returning void.
    for ( int i = 0; i &lt; 2; ++i )   // Use the loop counter as the array index.
       funcTable[i]();
```

## Explicit Pointer Conversions

To convert a pointer from one pointer type to another, you must usually use an explicit cast. In some cases the compiler provides an implicit conversion: these cases are described in "[Implicit Pointer Conversions](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch04.html#cinanut-CHP-4-SECT-2.3 "Implicit Pointer Conversions"),” later in this chapter. Pointers can also be explicitly converted into integers, and vice versa.

### Object pointers

You can explicitly convert an object pointer—that is, a pointer to a complete or incomplete object type—to any other object pointer type. In your program, you must ensure that your use of the converted pointer makes sense. An example:

```
    float  f_var = 1.5F;
    long *l_ptr = (long *)&amp;f_var;     // Initialize a pointer to long with
                                      // the address of f_var.
    double *d_ptr = (double *)l_ptr;  // Initialize a pointer to double with
                                      // the same address.

    // On a system where sizeof(float) equals sizeof(long):

    printf( "The %d bytes that represent %f, in hexadecimal: 0x%lX\n",
            sizeof(f_var), f_var, *l_ptr );

    // Using a converted pointer in an assignment can cause trouble:

    /*  *d_ptr = 2.5;  */   // Don't try this! f_var's location doesn't
                            // have space for a double value!
    *(float *)d_ptr = 2.5;  // OK: stores a float value in that location.
```

If the object pointer after conversion does not have the alignment required by the new type, the results of using the pointer are undefined. In all other cases, converting the pointer value back into the original pointer type is guaranteed to yield an equivalent to the original pointer.

If you convert any type of object pointer into a pointer to any `char` type (`char`, `signed char`, or `unsigned char`), the result is a pointer to the first byte of the object. The first byte is considered here to be the byte with the lowest address, regardless of the system’s byte order structure. The following example uses this feature to print a hexadecimal dump of a structure variable:

```
    #include &lt;stdio.h&gt;
    struct Data {
                  short id;
                  double val;
                };

    struct Data myData = { 0x123, 77.7 };          // Initialize a structure.

    unsigned char *cp = (unsigned char *)&amp;myData;  // Pointer to the first
                                                   // byte of the structure.

    printf( "%p: ", cp );                          // Print the starting
                                                   // address.

    for ( int i = 0; i &lt; sizeof(myData); ++i )     // Print each byte of the
      printf( "%02X ", *(cp + i) );                // structure, in hexadecimal.
    putchar( '\n' );
```

This example produces output like the following:

```
    0xbffffd70: 23 01 00 00 00 00 00 00 CD CC CC CC CC 6C 53 40
```

The output of the first two bytes, `23 01`, shows that the code was executed on a little-endian system: the byte with the lowest address in the structure `myData` was the least significant byte of the `short` member `id`.

### Function pointers

The type of a function always includes its return type, and may also include its parameter types. You can explicitly convert a pointer to a given function into a pointer to a function of a different type. In the following example, the `typedef` statement defines a name for the type “function that has one `double` parameter and returns a `double` value”:

```
    #include &lt;math.h&gt;                   // Declares sqrt() and pow().
    typedef double (func_t)(double);    // Define a type named func_t.

    func_t *pFunc = sqrt;               // A pointer to func_t, initialized with
                                        // the address of sqrt().

    double y = pFunc( 2.0 );            // A correct function call by pointer.
    printf( "The square root of 2 is %f.\n", y );

    pFunc = (func_t *)pow;              // Change the pointer's value to the
                                        // address of pow().
    /*  y = pFunc( 2.0 );  */           // Don't try this: pow() takes two
                                        // arguments.
```

In this example, the function pointer `pFunc` is assigned the addresses of functions that have different types. However, if the program uses the pointer to call a function whose definition does not match the exact function pointer type, the program’s behavior is undefined.

## Implicit Pointer Conversions

The compiler converts certain types of pointers implicitly. Assignments, conditional expressions using the equality operators `==` and `!=`, and function calls involve implicit pointer conversion in three kinds of cases, which are described individually in the sections that follow. The three kinds of implicit pointer conversion are:

-   Any object pointer type can be implicitly converted to a pointer to `void`, and vice versa.
    
-   Any pointer to a given type can be implicitly converted into a pointer to a more qualified version of that type—that is, a type with one or more additional type qualifiers.
    
-   A _null pointer constant_ can be implicitly converted into any pointer type.
    

### Pointers to void

Pointers to `void`—that is, pointers of the type `void *`—are used as “multipurpose” pointers to represent the address of any object, without regard for its type. For example, the `malloc()` function returns a pointer to `void` (see [Example 2-3](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch02.html#cinanut-CHP-2-EX-3 "Example 2-3. Using the type void")). Before you can access the memory block, the `void` pointer must always be converted into a pointer to an object.

[Example 4-1](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch04.html#cinanut-CHP-4-EX-1 "Example 4-1. A comparison function for qsort()") demonstrates more uses of pointers to `void`. The program sorts an array using the standard function `qsort()`, which is declared in the header file _stdlib.h_ with the following prototype:

```
    void qsort( void *<em class="replaceable"><code>array</code></em>, size_t <em class="replaceable"><code>n</code></em>, size_t <em class="replaceable"><code>element_size</code></em>,
                int (*<em class="replaceable"><code>compare</code></em>)(const void *, const void *) );
```

The `qsort()` function sorts the array in ascending order, beginning at the address _`array`_, using the quick-sort algorithm. The array is assumed to have _`n`_ elements whose size is _`element_size`_.

The fourth parameter, _`compare`_, is a pointer to a function that `qsort()` calls to compare any two array elements. The addresses of the two elements to be compared are passed to this function in its pointer parameters. Usually this comparison function must be defined by the programmer. It must return a value that is less than, equal to, or greater than 0 to indicate whether the first element is less than, equal to, or greater than the second.

Example 4-1. A comparison function for qsort()

```
#include &lt;stdlib.h&gt;
#define ARR_LEN 20

/*
 * A function to compare any two float elements,
 * for use as a call-back function by qsort().
 * Arguments are passed by pointer.
 *
 * Returns: -1 if the first is less than the second;
 *           0 if the elements are equal;
 *           1 if the first is greater than the second.
 */
int  floatcmp( const void* p1, const void* p2 )
{
  float x = *(float *)p1,
        y = *(float *)p2;

  return (x &lt; y) ? -1 : ((x == y) ? 0 : 1);
}

/*
 * The main() function sorts an array of float.
 */
int main()
{
  /* Allocate space for the array dynamically:  */
  float *pNumbers = malloc( ARR_LEN * sizeof(float) );

  /* ... Handle errors, initialize array elements ... */

  /* Sort the array: */
  qsort( pNumbers, ARR_LEN, sizeof(float), floatcmp );

  /* ... Work with the sorted array ... */

   return 0;
}
```

In [Example 4-1](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch04.html#cinanut-CHP-4-EX-1 "Example 4-1. A comparison function for qsort()"), the `malloc()` function returns a `void *`, which is implicitly converted to `float *` in the assignment to `pNumbers`. In the call to `qsort()`, the first argument `pNumbers` is implicitly converted from `float *` to `void *`, and the function name `floatcmp` is implicitly interpreted as a function pointer. Finally, when the `floatcmp()` function is called by `qsort()`, it receives arguments of the type `void *`, the “universal” pointer type, and must convert them explicitly to `float *` before dereferencing them to initialize its `float` variables.

### Pointers to qualified object types

The type qualifiers in C are `const`, `volatile`, and `restrict` (see [Chapter 11](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.htmlch11.html "Chapter 11. Declarations") for details on these qualifiers). For example, the compiler implicitly converts any pointer to `int` into a pointer to `const int` where necessary. If you want to remove a qualification rather than adding one, however, you must use an explicit type conversion, as the following example illustrates:

```
    int n = 77;
    const int *ciPtr = 0;   // A pointer to const int.
                            // The pointer itself is not constant!

    ciPtr = &amp;n;          // Implicitly converts the address to the type
                         // const int *.

    n = *ciPtr + 3;      // OK: this has the same effect as n = n + 3;

    *ciPtr *= 2;         // Error: you can't change an object referenced by
                         // a pointer to const int.

    *(int *)ciPtr *= 2;  // OK: Explicitly converts the pointer into a
                         // pointer to a nonconstant int.
```

The second to last statement in this example illustrates why pointers to `const`\-qualified types are sometimes called _read-only pointers_: although you can modify the pointers’ values, you can’t use them to modify objects they point to.

### Null pointer constants

A null pointer constant is an integer constant with the value 0, or a constant integer value of 0 cast as a pointer to `void`. The macro `NULL` is defined in the header files _stdlib.h_, _stdio.h_, and others as a null pointer constant. The following example illustrates the use of the macro `NULL` as a pointer constant to initialize pointers rather than an integer zero or a null character:

```
    #include &lt;stdlib.h&gt;
    long *lPtr = NULL;      // Initialize to NULL: pointer is not ready for use.

    /* ... operations here may assign lPtr an object address ... */

    if ( lPtr != NULL )
    {
      /* ... use lPtr only if it has been changed from NULL ... */
    }
```

When you convert a null pointer constant to another pointer type, the result is called a _null pointer_. The bit pattern of a null pointer is not necessarily zero. However, when you compare a null pointer to zero, to `NULL`, or to another null pointer, the result is always `true`. Conversely, comparing a null pointer to any valid pointer to an object or function always yields `false`.

## Conversions Between Pointer and Integer Types

You can explicitly convert a pointer to an integer type, and vice versa. The result of such conversions depends on the compiler, and should be consistent with the addressing structure of the system on which the compiled executable runs. Conversions between pointer and integer types can be useful in system programming, and necessary when programs need to access specific physical addresses, such as ROM or memory-mapped I/O registers.

When you convert a pointer to an integer type whose range is not large enough to represent the pointer’s value, the result is undefined. Conversely, converting an integer into a pointer type does not necessarily yield a valid pointer. A few examples:

```
    float x = 1.5F, *fPtr = &amp;x;                 // A float, and a pointer to it.

    unsigned int adr_val = (unsigned int)fPtr;  // Save the pointer value
                                                // as an integer.

    /*
     * On an Intel x86 PC in DOS, the BIOS data block begins at the
     * address 0x0040:0000.
     * (Compile using DOS's "large" memory model.)
     */
    unsigned short *biosPtr = (unsigned short *)= 0x400000L;
    unsigned short com1_io = *biosPtr;  // The first word contains the
                                        //  I/O address of COM1.
    printf( "COM1 has the I/O base address %Xh.\n", com1_io );
```

The last three statements obtain information about the hardware configuration from the system data table, assuming the operating environment allows the program to access that memory area. In a DOS program compiled with the large memory model, pointers are 32 bits wide and consist of a segment address in the higher 16 bits and an offset in the lower 16 bits (often written in the form _`segment`_:_`offset`_). Thus the pointer `biosPtr` in the prior example can be initialized with a long integer constant.

## Source
- [4. Type Conversions - C in a Nutshell [Book]](https://www.oreilly.com/library/view/c-in-a/0596006977/ch04.html)