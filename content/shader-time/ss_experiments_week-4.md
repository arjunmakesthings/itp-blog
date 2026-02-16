---
date: 2026-02-13
tags:
  - experiments
noteOrder: "239"
draft: "true"
---
# ask: 
Create a ==looping animation using vertex displacement.==

Use ==three.js== and WebGL.
Your effect ==must be coded in the vertex unit== of your shader.
Your effect should be ==animated==, either using a ==value that changes== every frame (like the elapsed time), or using ==user input==, or both.
Add customizable parameters using lil-gui.

# thought: 
i wanted to start with the most basic geometry, and instead focus on doing stuff in the shader files (such as [shaping functions](https://thebookofshaders.com/05/), and sdf stuff). 

---
i first realized this: 

without a bundler, the browser loads files as a javascript module. but the server sends it as plain text. so you load them as plain text with `res.text()`. 

``` js
async function loadShader(url) {
  const res = await fetch(url);
  return await res.text();
}

const vert_shader = await loadShader("./vert.vert");
const frag_shader = await loadShader("./frag.frag");
```

---
made each pixel a unit on a checkerboard grid. 

![[Screenshot 2026-02-14 at 17.32.36.webp]]

``` c
precision mediump float;

varying vec2 vUv;

uniform vec2 u_resolution;

void main() {
    //since texture coords are called uv, we call normalized position values st.
    vec2 st = gl_FragCoord.xy / u_resolution;

    // float scale = u_resolution.x * u_resolution.y;

    vec2 grid = floor(st * u_resolution);

    float checker = mod(grid.x + grid.y, 2.0);

    vec3 col = vec3(checker);

    gl_FragColor = vec4(col, 1.0);
}

```

made this: 

![[Screen Recording 2026-02-14 at 17.45.53.mp4]]

``` c
precision mediump float;

varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    //since texture coords are called uv, we call normalized position values st.
    vec2 st = gl_FragCoord.xy / u_resolution;

    float scale = 1000.0;

    vec2 grid = floor(st * u_resolution);

    float checker = mod(grid.x + grid.y, 2.0);

    float speed = 3.0;
    float v = cos((grid.x * grid.y) + u_time * speed) / 1.0;

    vec3 col = vec3(v);

    gl_FragColor = vec4(col, 1.0);
}

```

i hate three.js. 

i also couldn't think of anything to make except messing around with  few parameters to make something that looks 'cool'. 

---
### 260216: 
i tried again. 

this time i had an idea about what i wanted to make. i wanted to do something with photographs, and manipulate them somehow. 

decided against it. the ask is to do vertex displacement. i'll keep the fragment as simple as possible, and see what i can do with vertices instead. 

![[Screen Recording 2026-02-16 at 18.46.22.mp4]]

i realized that i could make a random walker of sorts with each vertex on a geometry. 
