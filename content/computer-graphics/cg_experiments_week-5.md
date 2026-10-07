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

took me a long time to get even the slightest clue. i'm still a bit lost, and implemented what i could.

![[Screen Recording 2026-10-07 at 00.02.03.mp4]]

![[IMG_8529.webp]]

``` c
#version 300 es
precision highp float;
in vec3 v_pos;
out vec4 frag_col;

//focal length:
float f = 3.0;

uniform float u_time;

//to keep track of what was hit:
int hit_piece = 0; 

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

//to get coefficients, we need to solve for a, b, c from the matrix we define for the shape. so; helper:
vec2 ray_quadric(vec3 v, vec3 w, mat4 s) {
  vec4 v_4 = vec4(v, 1.0);
  vec4 w_4 = vec4(w, 0.0);

  float a = dot(w_4, s * w_4);
  float b = dot(v_4, s * w_4) + dot(w_4, s * v_4);
  float c = dot(v_4, s * v_4);

  //small check to avoid parallel ray:
  if(a == 0.0) {
    //ray runs parallel to this piece:
    if(c <= 0.0) {
      //inside:
      return vec2(-1000., 1000.);
    } else {
      //outside:
      return vec2(-1.);
    }
  }

  float touch = b * b - 4. * a * c;

  if(touch < 0.0) {
    //missed:
    return vec2(-1.);
  } else {
    //hit:
    float t1 = (-b - sqrt(touch)) / (2. * a);
    float t2 = (-b + sqrt(touch)) / (2. * a);
    return vec2(t1, t2);
  }
}

//generic ray-tracing function:
vec2 ray_shape(vec3 v, vec3 w, mat4 s[4], int intersections) {
  float enter = -1000.0;
  float exit = 1000.0;

  for(int i = 0; i < intersections; i++) {
    vec2 t = ray_quadric(v, w, s[i]);

    if(t.y < 0.0) {
      //ray missed the shape.
      return vec2(-1.0);
    }

    if(t.x > enter) {
      //take the last possible value:
      enter = t.x;
      hit_piece = i;
    }

    if(t.y < exit) {
      //take the first value:
      exit = t.y;
    }
  }

  if(enter > exit) {
    return vec2(-1.0);
  } else {
    return vec2(enter, exit);
  }

}

//helper to get normal:
vec3 get_normal(vec3 p, mat4 s) {
  vec4 n = (s + transpose(s)) * vec4(p, 1.0);
  return normalize(n.xyz);
}

//helper to shade:
vec3 shade(vec3 p, vec3 n, vec3 w, vec3 l_pos) {
  //direction from point to light:
  vec3 d = normalize(l_pos - p);

  vec3 surface = vec3(0.00007);
  vec3 ambient = sin(u_time) * surface * 2.0;

  //lambert's cosine:
  //float diffuse = max(0., dot(n, d));
  float diffuse = max(0., dot(n, d));

  vec3 c = ambient + diffuse * surface;

  //specular:
  //for this, we first need a reflection of the light direction about the normal:
  vec3 reflected_light = 2. * dot(n, d) * n - d;

  float shininess = 10.;

  vec3 spec_col = vec3(0.8);

  vec3 spec = pow(max(0., dot(-w, reflected_light)), shininess) * spec_col;
  c += spec;

  return c;
}

void main() {
  //hyperboloid:
  mat4 s[4];
  s[0] = mat4(0.75, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -0.09 + 0.4 * sin(u_time));
  s[1] = mat4(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -3);

  //ray stuff:
  vec3 v = vec3(0., 0., 10.);
  vec3 w = normalize(vec3(v_pos.xy, -f));

  //spin everything around the shape:
  float c = cos(u_time) * 0.8;
  float sn = 0.5 + 0.5 * sin(u_time) * 0.;

  //rot matrix:
  mat3 r = mat3(c, sn, 0, -sn, c, 0, 0, 0, 1);
  v = r * v;
  w = r * w;

  vec2 t = ray_shape(v, w, s, 2);

  frag_col = vec4(vec3(0.), 1.0);

  //light:
  vec3 l_pos = r * vec3(-1.0, 0.0, -5.0) * 0.5;

  //only look at entry:
  if(t.x > 0.0) {
    vec3 p = v + t.x * w;
    vec3 n = get_normal(p, s[hit_piece]);
    frag_col = vec4(sqrt(shade(p, n, w, l_pos)), 1.);
  }
}

```




