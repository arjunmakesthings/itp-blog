---
date: 2026-09-01
tags:
  - learning
noteOrder: "440"
draft: "false"
---
[[ken-perlin]] asked me to get familiar with 4x4 matrix math, matrix multiplication & using matrices to transform vectors. 

---

a matrix has rows & columns: 

``` txt
[2 3 4
 4 5 7]
```

therefore, 2x2 matrix (2r, 2c). this is the order of a matrix. 

---

addition, subtraction can be done with matrices that have the same order. it's pretty much like an array: 

$$
a =
\begin{bmatrix}
1 & 2\\
3 & 4
\end{bmatrix}
$$

$$
b =
\begin{bmatrix}
2 & 2\\
4 & 5
\end{bmatrix}
$$
so a + b: 

$$
A+B =
\begin{bmatrix}
1+2 & 2+2\\
3+4 & 4+5\\
\end{bmatrix}
$$

---

multiplication is a little more tricky. 

say you have matrices: 

$$
a =
\begin{bmatrix}
1 & 2 & 3\\
\end{bmatrix}
$$

$$
b=
\begin{bmatrix}
4 \\ 5\\6
\end{bmatrix}
$$

we have a 1x3 matrix and a 3x1 matrix. 

==to be able to multiply, the columns in matrix 1 needs to be the same as rows in the second.==  the order is determined the by the last two numbers. for example: 

``` txt

a. b is 1x3 matrix multiplied by 3x1 matrix. 

can be multipled; order of resulting matrix ab will be 1x1. 

```

therefore, ==order matters==. 

multiplication is row x column.

$$
BA =
\begin{bmatrix}
4\\
5\\
6
\end{bmatrix}
\begin{bmatrix}
1 & 2 & 3
\end{bmatrix}
$$

$$
(3\times1)(1\times3) = 3\times3
$$

$$
BA =
\begin{bmatrix}
4(1) & 4(2) & 4(3)\\
5(1) & 5(2) & 5(3)\\
6(1) & 6(2) & 6(3)
\end{bmatrix}
$$

$$
BA =
\begin{bmatrix}
4 & 8 & 12\\
5 & 10 & 15\\
6 & 12 & 18
\end{bmatrix}
$$

you can essentially use these to transform vectors. i mean this is what p5 `translate()` does. 

for example, rotation matrices can move a point in space. general formula: 

$$
r(a) = 
\begin{bmatrix}
cos(a) & -sin(a)\\
sin(a) & cos(a)
\end{bmatrix}
$$

reflection: move a point the same distance & same angle across a plane. this is simpler to do, just multiple by 1,0 for whatever needs to stay; and 0,-1 to flip. 

used organic chemistry tutor [videos](https://www.youtube.com/watch?v=vzt9c7iWPxs), and [this](https://www.youtube.com/watch?v=-pQtkHEoueE) for rotation & reflection. 

---

