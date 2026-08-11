---
date: 2026-08-11
tags:
  - learning
noteOrder: "416"
draft: "false"
---
[[ben kallus]] showed me how to debug pcbs where you have no idea what's going on. 

he attempts to find the 'tx' pin, and then reads it via minicom because all of them send a signal when they boot up. he figures out the baud rate, and then finds the 'rx' pin (because it'll be next to it); to communicate with it. 