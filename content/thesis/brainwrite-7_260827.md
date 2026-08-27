---
date: 2026-08-27
tags:
  - writings
noteOrder: "432"
draft: "false"
---
the phenomena of emergent complexity [^2], for a long time, has been artistically interesting to me. [^1]

one of the most basic representations of such phenomena is cellular-automata. for example, if i take a row of alternating 1s & 0s: 

`[0, 1, 0, 1, 0]`

<figcaption>^ (consider each item in this row a 'cell'). </figcaption>

and decide to generate these `i` times, such that each subsequent generation is dependent on a set of 'rules' that consider a character's immediate neighbor (left & right), you can get behavior like so: 

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

these (along with other automatons) have been extensively studied, visualized, and documented in [a new kind of science](https://www.wolfram-media.com/products/nks/), by stephen wolfram (released in 2002). 

![[wolfram-study.webp|475]]

<figcaption>explorations of 1-d automata (rulesets & starting conditions) by stephen wolfram.</figcaption>

wolfram' claim was that the world may be better understood as a complex emergent system, as opposed to models that relied on continuous mathematics, which had always been the norm till then. contrary to his belief, however, his stance made little scientific impact & was greatly opposed.  

what strikes me, however, about cellular-automata is its limited representation. currently, the way people study the behavior of these automatons is by watching pixels on a screen change color: 

![[game-of-life.gif]]

<figcaption>a configuration of 'game of life' —  a popular 2-dimensional cellular-automata.</figcaption>

while often limited to binary (0 & 1 -> black & white), there have been some studies of exploring color & degrees (not 0,1; but 0-255 or more). 

![[automaton-research-color.webp|465]]

even then, the expression of these rulesets have been restricted to static 2-dimensional grid of luminescent, little squares; and most similarities to the 'real' world, therefore, have been visual.

![[Screenshot 2026-08-27 at 16.52.09.webp|392]]


i argue that there is more. 

for example, the expression of an automaton in sound might reveal something else about the world (as opposed to seeing the image it produces). in fact, the very ability to foresee that an automaton *could* be expressed in sound opens up new ways of thinking about cells & rulesets. 

therefore, the thesis is an exploration of alternative paradigms for rule-based emergent systems to exist in, in the hope that they pave way for future explorations (and reveal new connections to the world). explorations may include:
- redefining what a pixel may be (for cellular automata)
- breaking away from the structure of a 2-dimensional grid
- removing assumptions such as positions of a 'pixel' being static or that a 'pixel' may only change its light (and color)
- that cellular automata must always be 'seen' (as opposed to 'felt'). 
- ... and so on.

i envision a collection of small prototypes (perhaps no bigger than handling 5x5 automata); each of which would be capable of 'running' any rule-based system in such a way that a person can compare the experience of the same automata on system-a versus system-b. 

---

# other notes: 

while arriving at this premise, i had a few preliminary thoughts on things i could explore. 

![[23_pixel-explorations.webp]]

there have been studies on alternative displays, such as: 
- physical pixels, by kelly heaton at mit. 
- electrostatic manipulation for voxels, by people at university of sussex, university of electrocommunications, japan & university of bristol.
- tangible bits at mit (to some extent). 

however, it is important to note a distinction between my area-of-study and theirs: for any 'display' research, the objective is to obtain a perceivable representation of an 'image'; with the gold-standard being accuracy of said representation. in my case, the object-of-interest is **not** an image — it is merely the expression of a ruleset (that can be defined in a structured way, regardless of the 'display' i am addressing). 

---

[^1]: "When I think about the world, I imagine a system — many organisms perpetually interact with one-another, each governed by its own set of rules, collectively unpredictable & complex; with the occasional sprinkle of universal noise. My artistic practice is wholly devoted towards the pursuit of understanding and representing this semi-ordered nature of the world." 
	
	from [itp personal statement, 2024](https://arjunmakesthings.github.io/notes/2024_itp-personal-statement/page.html).

[^2]: emergent complexity can be defined as the complexity that arises from a system composed of simple parts, where the collective behavior cannot be predicted by studying the individual parts. ref: the dynamics of complex systems, by yaneer-bar-yam.
