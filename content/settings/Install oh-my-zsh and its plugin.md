---
title: Untitled
date: 2024-04-13
lastmod: 2024-04-13
author: Jimmy Lin
tags: 
draft: false
---

## Install Oh my ZSH.

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
## Install plugins.

- autosuggesions plugin
	- `git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions`
- zsh-syntax-highlighting plugin
	- `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting`
- zsh-fast-syntax-highlighting plugin
	- `git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting`
- zsh-autocomplete plugin
	- `git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git $ZSH_CUSTOM/plugins/zsh-autocomplete`
## Enable plugins by adding them to .zshrc.

- Open .zshrc
	- `nvim ~/.zshrc`
- Find the line which says `plugins=(git)`.
- Replace that line with `plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting zsh-autocomplete)`

## Source
- [n1snt/Oh my ZSH with zsh-autosuggestions zsh-syntax-highlighting zsh-fast-syntax-highlighting and zsh-autocomplete.md](https://gist.github.com/n1snt/454b879b8f0b7995740ae04c5fb5b7df)