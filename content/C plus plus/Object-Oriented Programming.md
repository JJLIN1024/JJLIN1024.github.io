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
	- Constructor Inheritance
	- Constructor Delegation
- Copy Constructor
	- The default one performs member-wise copy, which is not shallow copy nor deep copy! 
		- 對於 pointer 來說是 shallow copy 但是對於 string or vector 來說是 deep copy
- Constructor implicit casting
	- the explicit keyword
		- when to use the explicit keyword?
			- when the full state of the object being created is passed in to the constructor, for example, the string object. In contrast, the vector object is not, so the explicit keyword is used in its constructor
- Rule of Zero
	- When your class does not need any resource management
	- Use properly managed data members: std::string, std containers, std::unique_ptr, std::shared_ptr
- Rule of Three
	- When you need a destructor
	- Block the copy and assignment constructor first! And then check it you need to implement them
- Rule of Five
	- If you implement or block any of the five, you lose the defaults for the move operations
		- make sure to ask back for the defaults if they are fine(use the default keyword)
- Inheritance
- State Pattern
	- Encapsulate varying behavior based on object's state
	- ![[截圖 2024-02-10 上午10.40.09.png]]
		- Multiple Inheritance is tricky and prone to bugs!
	- ![[截圖 2024-02-10 上午10.40.24.png]]
		- Use State Pattern!
- Strategy Pattern
- Factory Method/ Abstract Factory Pattern







## Reference
- [Back to Basics: Object-Oriented Programming in C++ - Amir Kirsh - CppCon 2022 ](https://youtu.be/_go74QpFPAw?si=sYDRN0Qn8UUcSvxz)
