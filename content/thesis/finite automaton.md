---
date: 2026-08-27
tags:
  - research
  - experiments
noteOrder: "430"
draft: "false"
---
typically, a 1-d automata is thought of as spanning an infinite grid, of which you see a subsection. 

therefore, the first cell in your finite representation is thought to have a neighbor of 0 (an off cell). i make a disagreement here, and think of an automaton as more 'intelligent'; thereby knowing its boundary. 

this is important to me, because representation needs to account for the fact that it is designed for a finite grid (and number of elements), and not for an infinite grid (because growth is not infinite, and, i believe, has a boundary). 

therefore the ruleset grows.

``` txt

no boundaries: 
2 ^ 3 -> 8. 

boundary on left & right: 
2 ^ 2 -> 4 + 2 ^ 2 -> 4 => 8. 

8 + 8 -> 16 (as opposed to 8). 

```


---

a paper that studies it, but is not relevant to me at the moment: 
https://arxiv.org/html/2406.06195v1