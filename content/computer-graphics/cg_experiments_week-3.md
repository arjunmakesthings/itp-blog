---
date: 2026-09-19
tags:
  - experiments
noteOrder: "479"
draft: "false"
---
# ask: 
> Because ray tracing and the math behind it is still relatively new to you, I am not going to make you do anything too mathematically challenging in this next assignment. Instead I am going to invite you to do something fun.
> 
> In the attached zip file are the course notes that I showed in class (as index.html) and the implementation we developed in class for ray tracing to spheres (as raysphere.html).
> 
> Your assignment for this week is to create your own original animated scene made out of ray traced spheres. Try to make something cool and fun by varying the colors, sizes and positions of spheres, and animating those properties over time in interesting ways.
> 
> Maybe you can even make organic looking animated creatures, if you are feeling ambitious.

---

i connected work around sdfs that i explored in the summer with what we're doing in class. 

this: 

``` c
#version 300 es
         precision highp float;
         in  vec3 v_pos;
         out vec4 frag_col;

         uniform float u_time;

         float circle (vec3 p, float r){
          return length(p) - r; 
         }

         void main() {
          vec3 pos = v_pos; 
          frag_col = vec4(vec3(0.0), 1.0); 

          vec3 light_pos = vec3(-1.0, -1.0, 0.0);
          vec4 sphere = vec4 (vec3(0.0), 0.5); 

          if (circle(sphere.xyz - pos, sphere.a) < 0.0){
            frag_col = vec4(1.0);  
          }

```

uses the same logic to return distance of a point from the sphere. 

base ray tracing (without gamma correction): 

![[Screen Recording 2026-09-20 at 20.26.01.mp4]]

``` c
#version 300 es
         precision highp float;
         in  vec3 v_pos;
         out vec4 frag_col;

         uniform float u_time;

         //focal length: q

         float f = 3.; 

         vec4 s = vec4(0.0, 0.0, -3.0, 0.75); 

         //tracing a ray to a sphere: 
         float ray_to_sphere(vec3 v, vec3 w, vec4 s){
          v -= s.xyz; //position of camera relative to sphere. 
          float r = s.w; 

          //need dot products for the equation (W•W) t2 + 2 (W•V) t + (V•V) - r2 = 0. 
          //w is a unit length vector. 
          float vw = dot(v,w); 
          float vv = dot(v,v); //length of itself. 
          
          float d = vw * vw - (vv - r*r); 

          if (d < 0.){
            return -1.0;
          }else{
            //hit the circle. :
            return -vw - sqrt(d);
          }
         }

         void main() {
          vec3 pos = v_pos; 
          frag_col = vec4(vec3(0.0), 1.0);

          //ray from camera to this pixel: 

          vec3 v = vec3(0.0); //cam position. 
          vec3 w = normalize(vec3(v_pos.xy, -f)); 

          float t = ray_to_sphere(v,w,s); 

          if (t>=0.){
            frag_col = vec4(1.0); 

            //find the point on the sphere's surface: 
            vec3 p = v + t * w; 

            //surface normal: 
            vec3 n = normalize(p - s.xyz); 

            //color of light: 
            vec3 c = vec3(.2); 

            //light pos: 
            vec3 l_pos = vec3(cos(u_time), 1.0, sin(u_time)); 

            c+= .8 * max(0.0, dot(n, l_pos)) * c; 

            // frag_col = vec4 (sqrt(c), 1.); 
            frag_col = vec4 (c, 1.); 
            }
         }
```


