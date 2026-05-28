---
date: 2026-05-28
tags:
  - lectures
noteOrder: "338"
draft: "false"
---
learnt about [[pigeonhole principle]]. 

an algorithm can be defined as a function that takes an input, and spits out the 'correct' output. you use inductive hypothesis to prove correctness: 

`p(n) is true for every natural number n`. 

> Mathematical induction proves that we can climb as high as we like on a ladder, by proving that we can climb onto the bottom rung (the basis) and that from each rung we can climb up to the next one (the step).

base case here would be n = 0; where the statement holds. second would be n = k, and then the statement would hold for n = k + 1 too. or k = k' (and k' + 1). 

perhaps i need to ==see some inductive proof reasoning.== 

for efficiency: measure operations, not time (because time depends on the implementation, machine-specs, et-cetera). 

https://www.geeksforgeeks.org/dsa/asymptotic-notation-and-analysis-based-on-input-size-of-algorithms/

`O (upperbound); omega (lowerbound); theta (both)`. 

model of computation: 

memory (ram) -> a long linear line of bits. 
cpu -> has address of bytes^, and can take in a word (like 64 bits) to perform operations on it. 

https://en.wikipedia.org/wiki/Word_(computer_architecture)

cpus right now can do 64-bits. which means a cpu can handle 64 bits at once. 



