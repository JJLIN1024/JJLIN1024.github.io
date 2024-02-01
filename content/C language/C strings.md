---
title: C strings
date: 2023-05-02
lastmod: 2023-05-02
author: Jimmy Lin
tags: [""]
draft: false
---

-   C 語言規格中定義 string literals 會被分配於 “static storage” 當中 (C99 [6.4.5])，並說明如果程式嘗試修改 string literals 的內容，將會造成未定義行為
-   以 gcc 的 ELF target 來說，將 string literals 分配在 read-only data section 中 (當然包含 `\0` 結尾)
