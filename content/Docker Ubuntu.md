---
title: Docker Ubuntu
date: 2024-02-17
lastmod: 2024-02-17
author:
  - Jimmy Lin
tags: 
draft: false
---
from [Run x86 (Intel) and ARM based images on Apple Silicon (M1) Macs?](https://forums.docker.com/t/run-x86-intel-and-arm-based-images-on-apple-silicon-m1-macs/117123):

```console
$ docker run --rm -it --platform linux/amd64 rofrano/vagrant-provider:debian bash
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install gcc build-essential automake gcc-arm-linux-gnueabihf vim git wget python pkg-config zlib1g-dev libglib2.0-dev libpixman-1-dev tmux flex bison unzip libncurses5-dev bc -y

```

