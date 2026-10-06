---
date: 2026-10-04
tags:
  - experiments
noteOrder: "513"
draft: "false"
---
# ask:
> You assignment for next week is to create one or more ray traced scenes that contain quadric objects (that is, objects which have second-order surfaces like spheres, ellipsoids, cylinders, cones, etc).
> 
> For example, to create a unit cylinder, you can intersect a unit cylindrical tube in z with an unit infinite slab between z=-1 and z=+1. Then you can use matrix transformations to translate, rotate and scale those two quadric surfaces to render any cylinder.
> 
> As extra credit, see if you can also implement refraction by following the notes and using Snell's law.
> 
> Note that for this assignment and for all subsequent assignments, it is not permitted to use code written by others that you have found on-line. You need to write your own original code for all parts of the work that you hand in.

spent a lot of time studying the math. 

understood how one would ray trace to a polyhedron. 

learnt quadric surfaces; didn't even know that was a thing. hyperboloid, but space < 1. 


![[Screenshot 2026-10-05 at 19.27.01.webp|430]]

any quadratic surface can be represented with the matrix: 

$$
S = \begin{bmatrix}
a & 0 & 0 & 0 \\
b & e & 0 & 0 \\
c & f & h & 0 \\
d & g & i & j
\end{bmatrix}
$$

which expands to this: 

$$
\begin{bmatrix} x & y & z & 1 \end{bmatrix}
\begin{bmatrix}
a & 0 & 0 & 0 \\
b & e & 0 & 0 \\
c & f & h & 0 \\
d & g & i & j
\end{bmatrix}
\begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}
\longrightarrow
ax^2 + bxy + cxz + dx + ey^2 + fyz + gy + hz^2 + iz + j
$$

basically the coefficient relates to the term. 

so, like a hyperboloid can be defined by putting values for a, e, h. since everything needs to be compared against 0, we move the equation's term to the right as the constant. so, j would be -1 since hyperboloid is -x^2 + y^2 + z^2 = 1.

