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

``` glsl
vec3 col = (d < 0.0) ? vec3(0.0) : vec3(1.0); 

```

makes: 

![[Screenshot 2026-07-14 at 18.37.58.webp|429]]

next, the problem seems similar to that of p5.js, where the origin of the circle seems to be different. 

doing this: 

``` glsl
    pos.x -=0.5; 
    pos.y -=0.5;

```

would fix that: 

![[Screenshot 2026-07-14 at 18.40.11.webp|428]]

but that's not efficient, because the shape won't resize well. 

``` glsl
vec2 pos = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

```

doing this would fix it because it doubles the coordinates / divides by resolution height — thereby keeping aspect ratio.

with hermite interpolation:

![[Screenshot 2026-07-14 at 18.44.11.webp|435]]

