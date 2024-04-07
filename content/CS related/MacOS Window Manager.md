---
title: MacOS Window Manager
date: 2024-04-06
lastmod: 2024-04-06
author:
  - Jimmy Lin
tags: 
draft: false
---
Yabai + Skhd

```console
# Hide Dock
defaults write com.apple.dock autohide -bool true && killall Dock
defaults write com.apple.dock autohide-delay -float 1000 && killall Dock
defaults write com.apple.dock no-bouncing -bool TRUE && killall Dock
```

 