---
date: 2026-07-14
tags:
  - terms_and_concepts
  - learning
  - experiments
noteOrder: "388"
draft: "false"
---
a signed distance function essentially gets the orthogonal distance between a point on a surface & the boundary of a shape to determine whether the point is inside or outside the shape.

https://en.wikipedia.org/wiki/Signed_distance_function

inigo explains it well for a line segment: https://www.youtube.com/watch?v=PMltMdi1Wzg

---

for example, for a circle, the sdf is: 

``` glsl
float sd_circle(in vec2 p, in float r) {
    return length(p) - r;
}

```

so this: 

``` glsl
void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    
    vec2 pos = st;

    float d = sd_circle(pos, 0.25);

    vec3 col = vec3(d);

    gl_FragColor = vec4(col, 1.0);
}

```

would produce this: 

![[Screenshot 2026-07-14 at 18.35.22.webp|428]]

we can color correct firstly (because right now it's interpolating). 