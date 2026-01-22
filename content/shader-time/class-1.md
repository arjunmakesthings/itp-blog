---
date: 2026-01-22
tags:
  - lectures
noteOrder: "207"
draft: "false"
---
dense class. 

# notes: 
- ==Getting graphics onto the screen is called rendering.==

> OpenGL Core (or simply OpenGL) is the original graphics library which runs on desktop computers.
> OpenGL ES is a variant specifically for embedded systems (e.g. mobile phones). The library is a subset of OpenGL Core. 
> WebGL is a variant specifically for web browsers, and is based on OpenGL ES.

- understood that ==transformation values are increments, not coordinates==. [[aditya]] mentioned this. 
- you can do ==multiple push-pops==. this is called ==stacking==. each 'layer' is additive without it. for example: 

``` js
translate (0,0,1)
//whatever

translate (1,1,0)
//this is actually the sum of both translates; i.e. the z is already translated by +1. 
```

- vertices can store multiple data. like, in [this](https://2x3sk.csb.app) sketch by [[elias (elie) zananiri]], each vertex for a triangle shape holds color information. pixels in between are linearly interpolated. 

[[elias (elie) zananiri]] then made us try to make quads with triangles, which was a bit of a pain to get working. 

