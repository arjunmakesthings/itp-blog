---
tags:
  - terms_and_concepts
draft: "false"
---
sometimes in programming, especially when comparing huge strings, it might be easier to operate on the raw bits than to do string operations. so, you use bitwise operations: 

https://en.wikipedia.org/wiki/Bitwise_operation

    0101 (decimal 5)
AND 0011 (decimal 3)
  = 0001 (decimal 1)
The operation may be used to determine whether a particular bit is set (1) or cleared (0). For example, given a bit pattern 0011 (decimal 3), to determine whether the second bit is set we use a bitwise AND with a bit pattern containing 1 only in the second bit:

    0011 (decimal 3)
AND 0010 (decimal 2)
  = 0010 (decimal 2)

learnt about while doing [[advent-of-code]] at the [[recurse-center]]. 

---

you basically use gates to: 

- find value of bit
- set bit value
- clear bit 
- toggle bit

more powerful thing is [[bit masking]]. 