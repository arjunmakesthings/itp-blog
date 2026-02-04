---
date: 2026-01-30
tags:
  - experiments
noteOrder: "223"
draft: "false"
---
# ask: 
Create a ==dynamic shader== effect on a ==live webcam== image.

Use p5.js and WebGL.
Your effect can be coded in the vertex or fragment unit of your shader (or both).
Your effect should be animated, either using a value that changes every frame (like the elapsed time), or using user input, or both.

---
# thought: 
to use random walkers, but not in the traditional way they're defined. 

a canvas is made of dots. the algorithm decides certain dots must move at certain durations of times. dots take up certain positions in the grid. 

colors of the dots are determined by the mesh they create from the camera. i think the overlapping of meshes could produce an interesting effect. 

### 0036: 
well, whatever 'thought' i had has gone to the shitter. i made whatever i made it. need more time to engage with this stuff. 

---

i spent time trying to understand shaders. 

learnt about uv coordinates: 

> The letters "U" and "V" denote the axes of the 2D texture because "X", "Y", and "Z" are already used to denote the axes of the 3D object in model space, while "W" (in addition to XYZ) is used in calculating quaternion rotations, a common operation in computer graphics.
> 
> [wikipedia](https://en.wikipedia.org/wiki/UV_mapping)

sort of (?) figured out how it all works? 

sent vector + uv coordinates; like so: 

``` js
    let cam_x = map(this.pos.x, 0, width, 0, cam.width);
    let cam_y = map(this.pos.y, 0, width, 0, cam.height);

    let norm_x = map(cam_x, 0, cam.width, 0, 1);
    let norm_y = map(cam_y, 0, cam.height, 0, 1);

    // norm_x-=noise(t*0.0000005); 
    // norm_y -= noise(t * 0.0000005); 

    vertex(this.pos.x, this.pos.y, 0, norm_x, norm_y); //pass coordinates (x,y,z) and uv coordinates (0,1).
```

manipulated positions like so: 

``` cpp
  // Copy the vec3 position into a vec4.
    vec4 position = vec4(aPosition, 1.0);

  // position.x += sin(u_time) / tan(u_time + aPosition.y * 0.05);
  position.x += 50. * tan(u_time + aPosition.x / 0.0005);

  // Move the shape for the origin in the center.
    position.xy -= u_res * 0.5;
```

also messed around with sin waves and colour; like so: 

``` cpp
    vec4 texColor = texture2D(u_tex, vTexCoord); 

    texColor.r *= 0.5 + sin(u_time + vTexCoord.x / 0.8);
    texColor.g *= sin(u_time + vTexCoord.x / 0.2);
    // texColor.b *= sin(u_time + vTexCoord.x / 0.05);
    gl_FragColor = texColor;
```

---

i don't know. my brain is too fried to process it. 

i made something. 

![[Screen Recording 2026-02-04 at 00.30.57.mp4]]

goodnight. 




