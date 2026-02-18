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

tried a random walker algorithm. it didn't work the way i thought it would ... it was too fast. 

![[vid260217.mp4]]

``` c
precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

//passed uniforms: 
uniform float u_time;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

//helper from stackoverflow to generate a random number between 0,1.
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

//helper for noise.
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {

    vec3 got_posis = position;

    float prob = noise(position.xy);
    //prob returns a float between 0,1. 

    // a vertex can move in 1 of 3 axes combinations: xy yz xz. 
    float step = 0.005;

    if(prob < 0.3) {
        //xy. 
        float movement_prob = random(position.xy + vec2(sin(u_time), cos(u_time)));

        if(movement_prob < 0.125) {
            got_posis.xy += vec2(-step, step); // top-left
        } else if(movement_prob < 0.250) {
            got_posis.xy += vec2(0.0, step); // top
        } else if(movement_prob < 0.375) {
            got_posis.xy += vec2(step, step); // top-right
        } else if(movement_prob < 0.500) {
            got_posis.xy += vec2(-step, 0.0);  // left
        } else if(movement_prob < 0.625) {
            got_posis.xy += vec2(step, 0.0);  // right
        } else if(movement_prob < 0.750) {
            got_posis.xy += vec2(-step, -step); // bottom-left
        } else if(movement_prob < 0.875) {
            got_posis.xy += vec2(0.0, -step); // bottom
        } else {
            got_posis.xy += vec2(step, -step); // bottom-right
        }
    } else if(prob < 0.6 && prob > 0.3) {
        float movement_prob = random(position.xy + vec2(sin(u_time), cos(u_time)));

        if(movement_prob < 0.125) {
            got_posis.yz += vec2(-step, step); // top-left
        } else if(movement_prob < 0.250) {
            got_posis.yz += vec2(0.0, step); // top
        } else if(movement_prob < 0.375) {
            got_posis.yz += vec2(step, step); // top-right
        } else if(movement_prob < 0.500) {
            got_posis.yz += vec2(-step, 0.0);  // left
        } else if(movement_prob < 0.625) {
            got_posis.yz += vec2(step, 0.0);  // right
        } else if(movement_prob < 0.750) {
            got_posis.yz += vec2(-step, -step); // bottom-left
        } else if(movement_prob < 0.875) {
            got_posis.yz += vec2(0.0, -step); // bottom
        } else {
            got_posis.yz += vec2(step, -step); // bottom-right
        }
    } else {
                //xz. 

        float movement_prob = random(position.xy + vec2(sin(u_time), cos(u_time)));

        if(movement_prob < 0.125) {
            got_posis.xz += vec2(-step, step); // top-left
        } else if(movement_prob < 0.250) {
            got_posis.xz += vec2(0.0, step); // top
        } else if(movement_prob < 0.375) {
            got_posis.xz += vec2(step, step); // top-right
        } else if(movement_prob < 0.500) {
            got_posis.xz += vec2(-step, 0.0);  // left
        } else if(movement_prob < 0.625) {
            got_posis.xz += vec2(step, 0.0);  // right
        } else if(movement_prob < 0.750) {
            got_posis.xz += vec2(-step, -step); // bottom-left
        } else if(movement_prob < 0.875) {
            got_posis.xz += vec2(0.0, -step); // bottom
        } else {
            got_posis.xz += vec2(step, -step); // bottom-right
        }
    }

    float angle = u_time * 0.3;

    mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cos(angle), -sin(angle), 0.0, sin(angle), cos(angle));

    mat3 rotY = mat3(cos(angle), 0.0, sin(angle), 0.0, 1.0, 0.0, -sin(angle), 0.0, cos(angle));

    mat3 rotZ = mat3(cos(angle), -sin(angle), 0.0, sin(angle), cos(angle), 0.0, 0.0, 0.0, 1.0);

    got_posis.xyz = rotZ * rotY * rotX * got_posis.xyz;

    vec4 model_position = vec4(got_posis, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * model_position;

    vUv = uv;
}
```


