---
date: 2026-09-10
tags:
  - research
noteOrder: "454"
draft: "false"
---
strict theoretical research for cellular automata. does not include representations; simply theory. 

---

from cellular automata, 1968. 

neumann's rules: 

1. An infinite plane is divided up into squares.
2. Each square contains a copy of the same finite automaton (the square together with this automaton is called a cell).
3. Associated with each cell is its neighborhood, consisting of itself together with its four immediate, nondiagonal neighbors.
4. The state of a cell at time t + 1 is uniquely determined by its neighborhood state at time /, together with the transition function / of the finite automaton which is associated with every cell.
5. The finite automaton associated with each cell possesses a distinguished state v0 called the quiescent state, such that f(v09 v0,...9 v0) = v0.
6. At each time step all but a finite number of cells are in the quiescent state.
7. The number of distinct states for the finite automaton associated with each cell is 29.
8. A particular transition function / is specified and shown to yield certain computation and construction properties discussed below.

---

from [[shloka]]: https://www.cianlm.dev/blog/Fireflies_Magnets_and_Emergence

---

from [[history of automatons]]: 

- von neumann's 29 state cellular automaton: https://en.wikipedia.org/wiki/Von_Neumann_cellular_automaton
- nobili cellular automata: https://en.wikipedia.org/wiki/Nobili_cellular_automata
- ulam-warburton automaton: https://en.wikipedia.org/wiki/Ulam%E2%80%93Warburton_automaton

==automatons are 'computationally universal'==: i.e:they can be used to perform any computation that a normal computer is able to perform, assuming unlimited time & memory. 

> Stephen Wolfram independently began working on cellular automata in mid-1981 after considering how complex patterns seemed formed in nature in violation of the second law of thermodynamics.[29] His investigations were initially spurred by a desire to model systems such as the neural networks found in brains.[29] He published his first paper in Reviews of Modern Physics investigating elementary cellular automata (Rule 30 in particular) in June 1983.[2][29] The unexpected complexity of the behavior of these simple rules led Wolfram to suspect that complexity in nature may be due to similar mechanisms.[29] His investigations, however, led him to realize that ==cellular automata were poor at modelling neural networks.[29]==
> 
> from: https://en.wikipedia.org/wiki/Cellular_automaton#wolfram


classes, by wolfram: 

- Class 1: Nearly all initial patterns evolve quickly into a stable, homogeneous state. Any randomness in the initial pattern disappears.[32]
- Class 2: Nearly all initial patterns evolve quickly into stable or oscillating structures. Some of the randomness in the initial pattern may filter out, but some remains. Local changes to the initial pattern tend to remain local.[32]
- Class 3: Nearly all initial patterns evolve in a pseudo-random or chaotic manner. Any stable structures that appear are quickly destroyed by the surrounding noise. Local changes to the initial pattern tend to spread indefinitely.[32]
- Class 4: Nearly all initial patterns evolve into structures that interact in complex and interesting ways, with the formation of local structures that are able to survive for long periods of time.[33] Class 2 type stable or oscillating structures may be the eventual outcome, but the number of steps required to reach this state may be very large, even when the initial pattern is relatively simple. Local changes to the initial pattern may spread indefinitely. Wolfram has conjectured that many class 4 cellular automata, if not all, are capable of universal computation. This has been proven for Rule 110 and Conway's Game of Life.

---

from [[other automaton stuff]]: 

- golly: an application to explore game of life and other types of cellular automata: https://golly.sourceforge.io
- 'unconventional' computing shows an or gate built with dominoes: 

	- ![[alt-computing_wiki.webp|187]]


- collection of rules: 
Brian's Brain
Codd's cellular automaton
CoDi
Conway's game of life
Day and Night
Langton's ant
Langton's loops
Lenia
Nobili cellular automata
Rule 90
Rule 184
Seeds
Turmite
Von Neumann cellular automaton
Wireworld

^ from: https://en.wikipedia.org/wiki/Cellular_automaton

---

continuous spatial automatons: 

https://en.wikipedia.org/wiki/Continuous_spatial_automaton

> Unlike a cellular automaton, which has a discrete grid of states, a continuous spatial automaton has a continuum of locations in one or more dimensions.

