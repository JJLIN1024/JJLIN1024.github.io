---
title: Git
date: 2024-03-21
lastmod: 2024-03-21
author:
  - Jimmy Lin
tags: 
draft: false
---

![[Pasted image 20240403095217.png]]

![[Pasted image 20240403094926.png]]
![[Pasted image 20240403094952.png]]

![[Pasted image 20240403095006.png]]


- git log -p
- git log --stat
- git log --pretty=oneline
- git log --pretty=format:"%h - %an, %ar : %s"
- git log --pretty=format:"%h %s" --graph
- git config --global alias.unstage 'reset HEAD --'
	- git unstage fileA 等價於 git reset HEAD -- fileA
## Git Internal

剛初始化的 .git 倉庫：

```console
[master][~/gitPractice/.git]$ ll
total 24
-rw-r--r--@  1 jimmy  staff    23B Apr  3 14:23 HEAD
-rw-r--r--@  1 jimmy  staff   137B Apr  3 14:23 config
-rw-r--r--@  1 jimmy  staff    73B Apr  3 14:23 description
drwxr-xr-x@ 16 jimmy  staff   512B Apr  3 14:23 hooks
drwxr-xr-x@  3 jimmy  staff    96B Apr  3 14:23 info
drwxr-xr-x@  4 jimmy  staff   128B Apr  3 14:23 objects
drwxr-xr-x@  4 jimmy  staff   128B Apr  3 14:23 refs
```

description 檔案僅供 GitWeb 程序使用，我們無需關心。 config 檔案包含項目特有的組態選項。 info 目錄包含一個全域性排除（global exclude）檔案， 用以放置那些不希望被記錄在 .gitignore 檔案中的忽略模式（ignored patterns）。 hooks 目錄包含客戶端或伺服器端的鉤子指令碼（hook scripts）， 在 Git 鉤子 中這部分話題已被詳細探討過。

剩下的四個條目很重要：HEAD 檔案、（尚待建立的）index 檔案，和 objects 目錄、refs 目錄。 它們都是 Git 的核心組成部分。 objects 目錄儲存所有資料內容；refs 目錄儲存指向資料（分支、遠端倉庫和標籤等）的提交對象的指針； HEAD 檔案指向目前被檢出的分支；index 檔案保存暫存區資訊。 我們將詳細地逐一檢視這四部分，來理解 Git 是如何運轉的。

```console
[master][~/gitPractice/.git]$ ls -la objects
total 0
drwxr-xr-x@ 4 jimmy  staff  128 Apr  3 14:23 .
drwxr-xr-x@ 9 jimmy  staff  288 Apr  3 14:23 ..
drwxr-xr-x@ 2 jimmy  staff   64 Apr  3 14:23 info
drwxr-xr-x@ 2 jimmy  staff   64 Apr  3 14:23 pack
```

在 Git 裡，有四個 很重要的物件，分別是 Blob 物件、Tree 物件、Commit 物件以及 Tag 物件。

![[截圖 2024-04-03 下午3.32.03.png]]
## Blob

Blob 物件的檔名是由 SHA-1 演算法決定，Blob 的內容則是壓縮演算法決定。

Blob 物件處理的是檔案內容。

`3b18e512dba79e4c8300dd08aeb37f8e728b8dad` 的前兩個 char 被用來當作目錄名稱。

```console
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) echo "hello world" > test.txt
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ✗ git add test.txt
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ✗ echo "hello world" | git hash-object --stdin
3b18e512dba79e4c8300dd08aeb37f8e728b8dad
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ✗ ls -la .git/objects
total 0
drwxr-xr-x   5 jimmy  staff  160 Apr  3 15:18 .
drwxr-xr-x  10 jimmy  staff  320 Apr  3 15:18 ..
drwxr-xr-x   3 jimmy  staff   96 Apr  3 15:18 3b
drwxr-xr-x   2 jimmy  staff   64 Apr  3 15:18 info
drwxr-xr-x   2 jimmy  staff   64 Apr  3 15:18 pack
```

`test.txt` 在被 git 開始追蹤後，是一個 blob(binary large object)。

```console
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ✗ git cat-file -t 3b18e512dba79e4c8300dd08aeb37f8e728b8dad
blob
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ✗ git cat-file -p 3b18e512dba79e4c8300dd08aeb37f8e728b8dad
hello world
```
## Tree

可看到在 commit 了 test.txt 後，多出了 8a 和 c3 兩個 object。

```console
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ✗ git commit -m "add test.txt"
[master (根提交) 8a504fa] add test.txt
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) ls -la .git/objects
total 0
drwxr-xr-x   7 jimmy  staff  224 Apr  3 15:24 .
drwxr-xr-x  12 jimmy  staff  384 Apr  3 15:24 ..
drwxr-xr-x   3 jimmy  staff   96 Apr  3 15:18 3b
drwxr-xr-x   3 jimmy  staff   96 Apr  3 15:24 8a
drwxr-xr-x   3 jimmy  staff   96 Apr  3 15:24 c3
drwxr-xr-x   2 jimmy  staff   64 Apr  3 15:18 info
drwxr-xr-x   2 jimmy  staff   64 Apr  3 15:18 pack
```

可看出 8a 為 commit，c3 為 tree object，c3 裡頭裝的正是 test.txt 這個 blob object。

```console
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) git cat-file -t 8a504fafbae5d5cd17dbf1913ee15ccf95291ec0
commit
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) git cat-file -p 8a504fafbae5d5cd17dbf1913ee15ccf95291ec0
tree c3b8bb102afeca86037d5b5dd89ceeb0090eae9d
author JJLIN1024 <linjimmy19981024@gmail.com> 1712129066 +0800
committer JJLIN1024 <linjimmy19981024@gmail.com> 1712129066 +0800

add test.txt
```

```console
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) git cat-file -t c3b8bb102afeca86037d5b5dd89ceeb0090eae9d
tree
➜ jimmy@linjiajiadeMacBook-Air  ~/gitPractice git:(master) git cat-file -p c3b8bb102afeca86037d5b5dd89ceeb0090eae9d
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad	test.txt
```

Commit 物件會指向某個 Tree 物件。Tree 物件的內容會指向某個或某些 Blob 物件，或是其它的 Tree 物件。除了第一個 Commit 物件以外，所有 Commit 物件都會指向它的前一次的 Commit 物件。

