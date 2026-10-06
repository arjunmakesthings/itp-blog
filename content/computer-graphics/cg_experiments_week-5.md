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

---

spoke with [[ken-perlin]] to understand the math: 

![[IMG_8528.webp]]

---

wrote up a small file to segregate the three files, so that i can write starter templates. 

``` html

<!-- what:  -->

<body bgcolor="black">
  <canvas id="canvas" width="800" height="800"></canvas>

  <!-- scripts: -->
  <script src="../../assets/webgl.js"></script>
  <script src="../../assets/update-func.js"></script>

  <!-- webgl: -->
  <script>
    function Scene(vs, fs) {
      this.vertex_shader = vs;
      this.fragment_shader = fs;
  
      let start_time = Date.now() / 1000;
  
      this.update = () => {
        let t = Date.now() / 1000 - start_time;
        set_uniform("1f", "u_time", t);
      };
    }
  
    async function main() {
      const [vs, fs] = await Promise.all([
        fetch("./vert.vert").then((r) => r.text()),
        fetch("./frag.frag").then((r) => r.text()),
      ]);
      gl_start(canvas, new Scene(vs, fs));
    }
    main();
  </script>

</body>

```

all three cases for ray-tracing to a sphere: 

``` c
#version 300 es
precision highp float;
in vec3 v_pos;
out vec4 frag_col;

//focal length:
float f = 3.;

vec4 s = vec4(0.0, 0.0, -3.0, 0.75); 

//tracing a ray to a sphere: 
float ray_to_sphere(vec3 v, vec3 w, vec4 s) {
  v -= s.xyz; //position of camera relative to sphere. 
  float r = s.w; 

//need dot products for the equation (W•W) t2 + 2 (W•V) t + (V•V) - r2 = 0. 
//w is a unit length vector. 
  float vw = dot(v, w);
  float vv = dot(v, v); //length of itself. 

  float d = vw * vw - (vv - r * r);

  if(d < 0.) {
    return -1.0;
  } else {
    //hit the circle
    return -vw - sqrt(d);
  }
}

void main() {
  vec3 pos = v_pos;
  frag_col = vec4(vec3(0.0), 1.); 

  //parameters for ray:
  vec3 v = vec3(0.0);
  vec3 w = normalize(vec3(pos.xy, -f));
  float t = ray_to_sphere(v, w, s);

  if(t >= 0.0) {
    //inside the sphere:
    frag_col = vec4(1.0, 0.0, 0.0, 1.0);
  } else if(t <= 0.0) {
    // outside:
    frag_col = vec4(0.0, 1.0, 0.0, 1.0);
  } else if(t == 0.0) {
    // on the boundary:
    frag_col = vec4(0.0, 0.0, 1.0, 1.0);
  }
}

```







