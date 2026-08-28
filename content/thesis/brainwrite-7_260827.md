---
date: 2026-08-27
tags:
  - writings
noteOrder: "432"
draft: "false"
---
### edited: aug 28. 

---

in the [dynamics of complex systems](https://www.taylorfrancis.com/books/mono/10.1201/9780429034961/dynamics-complex-systems-yaneer-bar-yam), yaneer-bar-yam introduces the phenomenon of emergent-complexity: a system composed of simple parts, where the collective behavior is unpredictable, and cannot be predicted simply by studying the parts.  this, to me, has always been artistically interesting[^1] , and feels akin to my lived human-experience . 

one of the most basic representations of said phenomenon is cellular-automata:

for example, imagine a row `[n]` of cells containing 0s & 1s like so: 

``` txt
[0, 1, 0, 1, 0]
```

<figcaption>row [n] with 5 cells.</figcaption>

generate the next row by deciding the state (or value) of each cell based on its direct neighbors (left & right), according to a set of 'rules'. for example: 

``` txt
if the previous two neighbours were 0 or 1 or boundary, produce a 1. else produce a 0. 

these can be expressed like so ([l][c][r]: value of new cell); where l is left neighbour, c is the cell, and r is the right neighbour.

{
	"000": 1,
	"100": 0,
	"110": 0,
	"101": 1,
	"010": 1,
	"011": 0,
	"111": 1,
	"001": 0,

	//left boundary: 
	"b00": 1,
	"b10": 1,
	"b11": 0, 
	"b01": 0,

	//right boundary: 
	"00b": 1, 
	"10b": 0, 
	"11b": 0, 
	"01b": 1, 
};

```

multiple generations of these (with the same ruleset) can lead to interesting patterns. 

``` js
0,1,0,1,0
0,1,1,1,0
0,0,1,0,0
1,0,1,0,1
1,1,1,1,1
0,1,1,1,0
0,0,1,0,0
1,0,1,0,1
1,1,1,1,1
0,1,1,1,0
```

<figcaption>10 iterations.</figcaption>

these — called 1-d cellular automatons (along with other automatons) have been extensively studied, visualized, and documented in [a new kind of science](https://www.wolfram-media.com/products/nks/), by stephen wolfram (released in 2002). 

![[wolfram-study.webp|475]]

<figcaption>explorations of 1-d automata (rulesets & starting conditions) by stephen wolfram.</figcaption>

wolfram's claim was that the world may be better understood as a complex emergent system, as opposed to an elegantly defined model of continuous mathematics — which had been the norm till then. contrary to his belief, however, his stance made little scientific impact & was greatly opposed.  

what strikes me though about the study of cellular-automata is its limited representative scope. currently, more often than not, the behavior of automatons is studied by watching pixels on a screen change color. 

![[game-of-life.gif]]

<figcaption>a configuration of 'game of life' —  a popular 2-dimensional cellular-automata.</figcaption>

while often limited to binary (0 & 1 -> black & white), there have been some studies of exploring color & degrees (not 0,1; but 0-255 (or other higher-bounds)). 

![[automaton-research-color.webp|465]]

even then, the expression of work that involves rulesets like these have usually been restricted to a static 2-dimensional grid of luminescent, little squares; and, therefore, most similarities to the 'real' world have been thought of as 'visual'.

![[Screenshot 2026-08-27 at 16.52.09.webp|392]]


i argue that there is more. 

---

for example, the expression of an automaton in sound might reveal something else about the world (as opposed to seeing the image it produces). or expressing the same automaton in movement could reveal something else. in fact, the very ability to foresee that an automaton *could* be expressed in another paradigm that does not involve shifting-bits or coloring pixels opens up new ways of thinking about creating rule-based systems for the study of emergence.

therefore, the thesis is an exploration of alternative paradigms for these systems to exist in the hope that they pave way for future explorations (and reveal new connections to the world). explorations may include:
- redefining what a pixel may be (for cellular automata)
- breaking away from the structure of a 2-dimensional grid
- removing assumptions such as positions of a 'pixel' being static or that a 'pixel' may only change its light (and color)
- that cellular automata must always be 'seen' (as opposed to 'felt'). 
- ... and so on.

i envision a collection of small prototypes (perhaps no bigger than handling 5x5 automata); each of which would be capable of 'running' any rule-based system in such a way that a person can compare the experience of the same automata on `system-a` versus `system-b`. 

---

while i do so, it is important to note distinctions between this body of work and others done previously. studies such as: 
- physical pixels, by kelly heaton at mit. 
- electrostatic manipulation for voxels, by people at university of sussex, university of electrocommunications, japan & university of bristol.
- tangible bits at mit (to some extent). 

are considered alternative 'display' research. the objective there is to obtain the most accurate representation of an 'image' by means other than what we consider pixels today. in my case however, the object-of-interest is **not** an image — it is merely the expression of a ruleset in any way that a human may be able to perceive them (not necessarily sight). 

---

# other notes: 

while arriving at the premise, i had a few preliminary thoughts on things i could explore. storing them here:

![[23_pixel-explorations.webp]]

---

[^1]: "When I think about the world, I imagine a system — many organisms perpetually interact with one-another, each governed by its own set of rules, collectively unpredictable & complex; with the occasional sprinkle of universal noise. My artistic practice is wholly devoted towards the pursuit of understanding and representing this semi-ordered nature of the world." 
	
	from [itp personal statement, 2024](https://arjunmakesthings.github.io/notes/2024_itp-personal-statement/page.html).

[^2]: emergent complexity can be defined as the complexity that arises from a system composed of simple parts, where the collective behavior cannot be predicted by studying the individual parts. ref: the dynamics of complex systems, by yaneer-bar-yam.
