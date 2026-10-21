---
date: 2026-10-11
tags:
  - experiments
noteOrder: "524"
draft: "false"
---
# ask: 

> Your assignment, due in two weeks, is to play with the noise function in the fragment shader and create something cool and fun and interesting with it. It doesn't need to be a ray traced scene. If you would like, feel free to go back to the earlier assignments and add noise to one of those to make something cool and interesting and fun. Or you can try to create something completely new.

ken's noise function: 

``` js
   let defineNoise = fs => {           // KP: DEFINE NOISE FUNCTION WITHIN A FRAGMENT SHADER.
      let i = fs.indexOf(';') + 1;
      return fs.substring(0,i)+'vec3 _s(vec3 i){return cos(5.*(i+5.*cos(5.*(i.yzx+5.*cos(5.*(i.zxy+5.*cos(5.*i)))))));}float _t(vec3 i,vec3 u,vec3 a){return dot(normalize(_s(i+a)),u-a);}float noise(vec3 p){vec3 i=floor(p),u=p-i,v=2.*mix(u*u,u*(2.-u)-.5,step(.5,u));return mix(mix(mix(_t(i,u,vec3(0)),_t(i,u,vec3(1,0,0)),v.x),mix(_t(i,u,vec3(0,1,0)),_t(i,u,vec3(1,1,0)),v.x),v.y),mix(mix(_t(i,u,vec3(0,0,1)),_t(i,u,vec3(1,0,1)),v.x),mix(_t(i,u,vec3(0,1,1)),_t(i,u,vec3(1)),v.x),v.y),v.z);}'+fs.substring(i);
   }
```

[[ken-perlin]]'s derivation of noise (received via email): 

``` txt
It's pretty simple:

1 For any integer vertex I,j,k, find a hash function that converts those three integers into a pseudo-random direction vector.
 
2 as I briefly went over in class, at each of the eight cube corners, do the following 

2a evaluate the hash function at that corner of the unit cube to get a slope.

2b define a product of two functions : 1 a linear function with that pseudo hashed slope and whose value is zero at that corner point and 2 a smooth dropoff function centered on the corner point which drops off smoothly to zero after one unit in each direction.

2c evaluate the above function at your point and add it into the total value 

Your drop-off function can be very simple. It can be a product of three drop-off functions, one in each dimension, each of which is a cubic curve that rises smoothly from zero up to one and then drops back down smoothly from one down to zero. I sometimes use 3t^2 - 2t^3

```

first found a good explanation: https://www.youtube.com/watch?v=DxUY42r_6Cg

[[ken-perlin]]'s paper: https://mrl.cs.nyu.edu/~perlin/paper445.pdf

---

the following is my implementation: 

``` cpp
//noise: 
//given a set of 3 numbers, return a random set of 3. same input yields same output. hash is borrowed from ken.
vec3 hash(vec3 c) {
  return cos(5. * (c + 5. * cos(5. * (c.yzx + 5. * cos(5. * (c.zxy + 5. * cos(5. * c)))))));
}

//drop-off function. ranges from 0 to 1 as t goes from 0 to 1.
float drop(float t) {
  t = abs(t);
  return 1. - t * t * (3. - 2. * t);
}

float noise(vec3 p) {
  vec3 cell = floor(p); //find closest cube-corner in an infinite grid of cubes. 
  float sum = 0.;

//for each of the 8 corners of the cube: 
  for(int a = 0; a < 2; a++) {
    for(int b = 0; b < 2; b++) {
      for(int c = 0; c < 2; c++) {
        vec3 corner = cell + vec3(a, b, c);
        vec3 g = normalize(hash(corner));
        vec3 d = p - corner; //directional arrow from the corner to the point.
        float w = drop(d.x) * drop(d.y) * drop(d.z);
        sum += dot(g, d);
      }
    }
  }

  return sum;
}
```

if you don't use the drop off function, and simply return the dot product between point p & the 8 corners of the cube, you get sharp edges like these: 

![[Screenshot 2026-10-16 at 23.16.32.webp|490]]

but an eased drop off with `3t^2 - 2t^3`, implemented like so: 

``` cpp
//drop-off function. ranges from 0 to 1 as t goes from 0 to 1.
float drop(float t) {
  t = abs(t);
  return 1. - t * t * (3. - 2. * t);
}
```

will give you smoother interpolation between edges: 

![[Screenshot 2026-10-16 at 23.17.23.webp|480]]

did a few things afterwards: https://cs.nyu.edu/~ay3020/graphics/hw5/

tried changing geometry (visually) of the shape. got claude to build out a small list of equations for all possible quadric-shapes. 

