---
title: Object-Oriented Programming
date: 2024-02-08
lastmod: 2024-02-08
author:
  - Jimmy Lin
tags:
  - c_plus_plus
  - OOP
draft: false
---
- Object size
	- includes the size of all its members
	- does not include functions
	- in case of inheritance: includes the size of its parent(s)
	- may include additional parts, e.g. pointer to vtable
	- may include padding
- [[This Pointer]]
- Constructor Initialization List
	- Use cases
		- efficiency, correctness, in some cases you MUST
	- MUST
		- contained object with no default constructor and no initialization on declaration
		- contained const data member
		- contained reference data member
		- base class with no default constructor








## Reference
- [Back to Basics: Object-Oriented Programming in C++ - Amir Kirsh - CppCon 2022 ](https://youtu.be/_go74QpFPAw?si=sYDRN0Qn8UUcSvxz)
