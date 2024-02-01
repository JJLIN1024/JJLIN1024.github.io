---
title: The Linux Kernel Module Programming Guide - Notes
date: 2023-12-16
lastmod: 2023-12-16
author:
  - Jimmy Lin
tags: 
draft: false
---

- 基本概念
	- [鳥哥私房菜: Linux 核心編譯與管理](http://linux.vbird.org/linux_basic/centos7/0540kernel.php)
	- 核心就是系統上面的一個檔案而已， 這個檔案包含了驅動主機各項硬體的偵測程式與驅動模組。
- How to build external module (not build-in)

```markdown
make -C $KDIR M=$PWD

-C $KDIR
The directory where the kernel source is located. "make" will actually change to the specified directory when executing and will change back when finished.

M=$PWD
Informs kbuild that an external module is being built. The value given to "M" is the absolute path of the directory where the external module (kbuild file) is located.
```
> [Building External Modules](https://docs.kernel.org/kbuild/modules.html)

- The `__init` and `__exit` macro
	- The `__init` macro causes the init function to be discarded and its memory freed once the init function finishes for built-in drivers, but not loadable modules
	- The `__exit` macro causes the omission of the function when the module is built into the kernel, and like __init , has no effect for loadable modules.
	- [Kernel modules init macro in C](https://stackoverflow.com/questions/48558460/kernel-modules-init-macro-in-c)
- [Linux 核心如何處理傳遞到核心模組的參數](https://hackmd.io/@Risheng/S10cihvt5)
	- `module_param(name, type, permission)`
	- `module_param_array(name, type, num, permission)`
		- `num` is pointer to the variable that will store the number of elements of the array initialized by the user at module loading time
	- [permission bits](https://www.gnu.org/software/libc/manual/html_node/Permission-Bits.html)
	- 傳遞 array 參數時的命令 (myintarray)
		- `sudo insmod helloWorld.ko mystring="haha" myshort=10 myintarray=23,34 mylong=10231`
- To prevent namespace pollution when writing kernel module (since module will be linked against the entire kernel)
	- declare all your variables as static
	- declare a symbol table and register it with the kernel
- Module shares kernel's memory space, so if module segfaults, kernel segfaults, because module shares kernel's codespace
	- true for monolithic kernel, but for microkernel like [GNU Hurd](https://www.gnu.org/software/hurd/) and the [Zircon kernel](https://fuchsia.dev/fuchsia-src/concepts/kernel) of Google Fuchsia, modules which get their own codespace
- major & minor number
	- The major number tells you which driver is used to access the hardware. Each driver is assigned a unique major number. All device files with the same major number are controlled by the same driver.
	- The minor number is used by the driver to distinguish between the various hardware it controls
- Devices are divided into two types: character devices and block devices
	- block devices have a buffer for requests, and can only accept input and return output in blocks (whose size can vary according to the device), whereas character devices are allowed to use as many or as few bytes as they like
	- 大部分 devices 都是 character device
	- Use `mknod` command to create a device
		- `mknod /dev/coffee c 12 2` 在 directory dev 底下建立了一個具有 major number 12 和 minor number 2 的 character device，名為 coffee
- 
```console
crw-rw----  1 root video   508,   0 Dec 19 16:50 media0
crw-rw----  1 root video   508,   1 Dec 19 16:50 media1
crw-rw----  1 root video   508,   2 Dec 19 16:50 media2
```

以上為 pi4 上 `ls -la /dev/` 的部分結果，可看到 media 的 major number 為 508，minor number 各為 0, 1, 2，且 media device 為 character device（最前面的 c）。
- character device 提供給外部的api都被定義在file_operations structs內在 [include/linux/fs.h](https://github.com/torvalds/linux/blob/master/include/linux/fs.h) 中： `struct file_operations`，裡面含有各個 api 的 function pointer（包括 read, write 等等）。
	- function 的實作後，放入 `struct file_operations fops` 中（通常命名為 `fops`。
- There are differences between different kernel versions, and if you want to support multiple kernel versions, you will find yourself having to code conditional compilation directives. The way to do this to compare the macro `LINUX_VERSION_CODE` to the macro `KERNEL_VERSION` . In version a.b.c of the kernel, the value of this macro would be $2^{16} a + 2^8 b + c$ .

## Reference
- [The Linux Kernel Module Programming Guide](https://sysprog21.github.io/lkmpg/)