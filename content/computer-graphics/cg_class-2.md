---
date: 2026-09-13
tags:
  - lectures
noteOrder: "466"
draft: "false"
---
- fragment -> because something can be fractionally on a pixel (and not fully). 

cpu -> gpu (vertex data & fragment data).  

glsl doesn't do artificial matrix constructions like javascript. matrices go directly into the circuitry (hence the math is faster). 

![[IMG_8443.jpg]]

`#version` is a pragma. 

think of it as a pipeline -> things are fed into it via the cpu -> vertex takes in px positions; converts them to -1, 1 space; passes to fragment -> does manipulations and outputs a color for each pixel. 

uniform is same for each pixel. 

