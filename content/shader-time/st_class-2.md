---
date: 2026-01-28
tags:
  - lectures
noteOrder: "221"
draft: "false"
---
# notes: 
- ==render a mesh using this shader program.==
- cpu runs sequentially, gpu runs in parallel. 

nice example to show cpu vs gpu 

<iframe width="560" height="315" src="https://www.youtube.com/embed/8_ZTvG1WQxM?si=U9AwCxm6GUS57r-N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- no order in how things are run in over the gpu. 

GLSL includes many variable types.

Scalars: float, int, bool
Vectors: vec2, vec3, vec4 — groups of values. (2 for 2d: x, y)
Matrices: mat3, mat4, mat3x4, … : a grid of values
Samplers: sampler2D, samplerCube, … : for textures (images)

Variables can also have qualifiers. These determine where their values come from and what their intended use is (their scope).

uniform: Shared data between all instances of the program (all vertices).
attribute: Vertex data that is specific to a single instance of the program (a vertex). comes in per instance from the cpu. 
varying: Data that is specific to a single instance and passed between different shaders in the pipeline.

vertex shader outputs a 4-d vector for position(x,y,z,1). 

aPosition is a p5 variable that stores coordinates for each p5.shape being drawn. 

glPosition accepts it in clip space (-1,1), and not canvas-space. 

in frag: 

precision is # of decimals in float. 

---



