---
date: 2026-07-01
tags:
  - experiments
noteOrder: "375"
draft: "false"
---
[[ben kallus]] explained assembly code to us, and we wrote small programs to move a number into a register & make the process return with that as the error code. 

``` asm

.global _main

_main:
    ;move number into x0 register:
    mov x0,42
    ret
    
```


``` txt
Current executable set to '/Users/a/a.out' (arm64).
(lldb) r
Process 4625 launched: '/Users/a/a.out' (arm64)
Process 4625 exited with status = 42 (0x0000002a)
(lldb)

```