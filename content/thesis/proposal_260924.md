---
date: 2026-09-24
tags:
  - writings
  - thesis
noteOrder: "491"
draft: "false"
---
> when i think about the world, i imagine a system — many organisms perpetually interact with one-another, each governed by its own set of rules, collectively unpredictable & complex; with the occasional sprinkle of universal noise. my artistic practice is wholly devoted towards the pursuit of understanding and representing this semi-ordered nature of the world.

<figcaption>from <a href = "https://arjunmakesthings.github.io/notes/2024_itp-personal-statement/page.html" target = "_blank">itp personal statement</a>, 2024.</figcaption>

---

in the [dynamics of complex systems](https://www.taylorfrancis.com/books/mono/10.1201/9780429034961/dynamics-complex-systems-yaneer-bar-yam), yaneer-bar-yam introduces the phenomenon of emergent-complexity: a system composed of simple parts, where the collective behavior cannot be predicted simply by studying the individual parts. this, to me, has always been artistically interesting, and feels akin to my lived human-experience. 

the simplest example of emergent-complexity is one-dimensional cellular automata: 

imagine a row of `[n]`cells containing 0s & 1s, like so: 

``` txt
[0, 1, 0, 1, 0]
```

<figcaption>row [n] with 5 cells.</figcaption>

a subsequent row `[n']`can be generated with the imposition of a simple ruleset, where each cell looks at its neighbors in the previous generation `[n]` to determine its state in `[n']`. 

``` txt
rules: 

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

generating multiple rows would produce interesting patterns like these: 

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

stephen wolfram, in *[a new kind of science](https://www.wolfram-media.com/products/nks/) (2002)*, visualizes & studies many such systems & generations, motivated by the proposal that the world may be better understood as complex emergent systems, as opposed to elegantly defined models of continuous mathematics[^1].   

![[wolfram-study.webp|475]]

<figcaption>explorations of 1-d automata (rulesets & starting conditions) by stephen wolfram.</figcaption>

what strikes me, however, about cellular automata (and, more broadly, rule-based-systems) is the limited paradigm that they have been expressed & perceived in.

---

traditionally automata-cells have two states (0 & 1), which can be represented as binary color (black & white). 

![[game-of-life.gif]]

<figcaption>a configuration of 'game of life' —  a popular 2-dimensional cellular-automata.</figcaption>

on modern displays, a cell can have more than two states (255-degrees of freedom for 3 channels of color). 

![[automaton-research-color.webp|342]]

but that's it — the expression of rule-based systems is largely restricted to a two-dimensional-light-emitting paradigm that computer screens can afford us. to see, via pixels, is the only accessible way for us to perceive the computational execution of a rule-based-system. 

my thesis explores alternatives. 

---

the objective of a display-system composed of pixels (including research on 'alternative' display systems [^2]) has always been to accurately represent a computed image. this brings with itself certain restrictions: for example, pixels must be next to each other on a fixed 2-d grid. a 'display' for a rule-based system, however, doesn't need to subscribe to that limitation. 

previous research on computer-generated music is a good example. the same rule based system (cellular automata) that can be seen: 

![[wolfram-study.webp|475]]

can also be heard: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/Mg4c5bKj9jc?si=RcaC9waLf6-wUHcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

perhaps can also be felt; sensed; et-cetera. 

on the other hand, pixels do not need to merely represent images, but can be used to encode & express a ruleset: 

![[Screenshot 2026-09-21 at 19.05.42.webp|414]]

<figcaption>work by kelly heaton & contributors for a set of 'networked' pixels.</figcaption>

---

the question then becomes: what do these alternative displays enable a person to do? i hypothesize the following: 

by breaking the rigidity of a 2-d-grid display, new programmers may let go of the pursuit of an image (because the structure of the display can be reconfigured), and merely focus on the encoding of interesting rule-sets. this, i believe, is more in line with the beauty that programming & emergence initially promised. 

by allowing a cell the ability to change its physical state in the physical world (and not just its representation on a screen), perhaps new parallels to computational-systems & the natural world around us may be born.

finally, simply introducing a new paradigm — the fact that you don't have program thinking in x, y, z — may result in new ideas of rule-based systems; for computational art or natural-science. 

if many of these are built — which i propose as my itp-thesis — a person could take the same ruleset and perceive it in different ways in an instant, which makes it an incredibly powerful prototyping tool. 

---

related research is here: 

- [[alternative display research]]
- [[automata research]]
- [[perception of emergence research]]

---

[^1]: this was, however, opposed by the general scientific community.

[^2]:  see [survey of alternative displays](https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/overview); [physical pixels](https://alumni.media.mit.edu/~kelly/physPix/heatonThesis.pdf) by kelly heaton at mit; and physical pixel explorations by danny rozin at nyu-itp.
