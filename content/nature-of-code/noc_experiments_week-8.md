---
date: 2026-03-29
tags:
  - experiments
noteOrder: "293"
draft: "false"
---
# ask: 
to make a sketch with cellular automata / fractals. 

---
# thought: 
a c.a. has the following: 

> A cellular automaton (cellular automata plural, or CA for short) is a model of a system of cell objects with the following characteristics:

> - The cells live on a ==grid==. (I’ll include examples in both one and two dimensions in this chapter, though a CA can exist in any finite number of dimensions.)
> - Each cell has a ==state==, though a cell’s state can vary over time. The number of possible states is typically ==finite==. The simplest example has the two possibilities of 1 and 0 (otherwise referred to as on and off, or alive and dead).
> - Each cell has a ==neighborhood==. This can be defined in any number of ways, but it’s typically all the cells adjacent to that cell.
> 
> from [nature of code](https://natureofcode.com/cellular-automata/).

so, i'll make a simulation-system for cells sharing something on a grid, but do so with ping-ponging shader buffers. 

---
# outputs: 

---

spent time revising ping-pong buffering. made a p5 template for it: https://github.com/arjunmakesthings/p5-webgl_ping-pong-template

spent a long time on this algorithm, and realized that shaders can't read from other pixels in a pass. 

``` js
#ifdef GL_ES
precision mediump float;
#endif

//receive from vertex shader:
varying vec2 vTexCoord;

//custom uniforms:
uniform vec2 u_res;
uniform sampler2D u_prev;
uniform vec2 u_seed_coords; //passed in pixel-space. 
uniform float u_inject_toggle; 

//parameters:
float seed = 1.0;

float capacity = 1.0;
float rate = 0.01;

void main() {
    //globals:
    vec2 px_coord = vTexCoord * u_res;

    //local for calculations:
    float curr_self = texture2D(u_prev, vTexCoord).r;

    // 1) check for seed distribution. 
    float d = distance(px_coord, u_seed_coords);

    if(d < 10.0 && u_inject_toggle == 1.0) {
        //this is the seed one.
        curr_self = seed;
    }

    // 2) take half of what you have, and give it to your neighbours.
    float keep = curr_self;
    float received = 0.0;
    float offload = 0.0; 

    // if you have more than you can take, offload.
    if(curr_self > capacity) {
        offload = curr_self * rate;
        keep -= offload; //remove from what you are going to keep.
    } else if(curr_self < capacity) {
        //current self is less than what it can take. so we receive from neighbours.
        vec2 px = 1.0 / u_res; // 1px in uv-space. 

        //the g value contains offloads for each pixel.
        float neighbors[8];
        neighbors[0] = texture2D(u_prev, vTexCoord + vec2(0.0, px.y)).g;   // up
        neighbors[1] = texture2D(u_prev, vTexCoord + vec2(0.0, -px.y)).g;  // down
        neighbors[2] = texture2D(u_prev, vTexCoord + vec2(-px.x, 0.0)).g;  // left
        neighbors[3] = texture2D(u_prev, vTexCoord + vec2(px.x, 0.0)).g;   // right
        neighbors[4] = texture2D(u_prev, vTexCoord + vec2(-px.x, px.y)).g; // up-left
        neighbors[5] = texture2D(u_prev, vTexCoord + vec2(px.x, px.y)).g;  // up-right
        neighbors[6] = texture2D(u_prev, vTexCoord + vec2(-px.x, -px.y)).g; // down-left
        neighbors[7] = texture2D(u_prev, vTexCoord + vec2(px.x, -px.y)).g; // down-right

        for(int i = 0; i < 8; i++) {
            float n = neighbors[i];
            if(n > 0.0) {
                received += n/8.0; //add to my receivals. 
            }
        }
        received = min(received, rate); 
    }
    curr_self = keep + received; 
    //pass the thing:
    gl_FragColor = vec4(curr_self, offload, 0.0, 0.0);
}


```

reverted to simpler rules.

something interesting happened here: 

![[Screen Recording 2026-03-29 at 21.42.54.mp4]]

``` js
#ifdef GL_ES
precision mediump float;
#endif

//receive from vertex shader:
varying vec2 vTexCoord;

//custom uniforms:
uniform vec2 u_res;
uniform sampler2D u_prev;
uniform vec2 u_seed_coords; //passed in pixel-space. 
uniform float u_inject_toggle;

//local: 
float seed_amt = 1.0;
float capacity = 0.5;

float curr = 0.0;

float give = 0.0; 

//helpers: 

//to get neighbours:
/* usage: 

vec4 neighbours[8];
get_neighbours(u_prev, vTexCoord, u_res, neighbours);

*/
void get_neighbours(sampler2D tex, vec2 uv, vec2 res, out vec4 neighbours[8]) {
    vec2 px = 1.0 / res;

    neighbours[0] = texture2D(tex, uv + vec2(0.0, px.y));
    neighbours[1] = texture2D(tex, uv + vec2(0.0, -px.y));
    neighbours[2] = texture2D(tex, uv + vec2(-px.x, 0.0));
    neighbours[3] = texture2D(tex, uv + vec2(px.x, 0.0));
    neighbours[4] = texture2D(tex, uv + vec2(-px.x, px.y));
    neighbours[5] = texture2D(tex, uv + vec2(px.x, px.y));
    neighbours[6] = texture2D(tex, uv + vec2(-px.x, -px.y));
    neighbours[7] = texture2D(tex, uv + vec2(px.x, -px.y));
}

void inject() {
    curr = seed_amt;
}

void main() {
    //globals: 
    vec2 px_coord = vTexCoord * u_res; // convert to px space.
    //previous state:
    vec4 prev = texture2D(u_prev, vTexCoord);

    //inject seed: 
    if(u_inject_toggle == 1.0) {
        float d = distance(px_coord, u_seed_coords);
        if(d < 1.0) {
            inject();
        }
    } else {
        curr = prev.r;
    }

    //two simple rules: if you have more than you can take, share with neighbours. if you have less, take from neighbours.

    vec4 neighbours[8];
    get_neighbours(u_prev, vTexCoord, u_res, neighbours);

    if(curr > capacity) {
        float excess = curr - capacity;

        for(int i = 0; i < 8; i++) {
            float other = neighbours[i].r;
            give += excess / 8.0; //excess divided across all neighbours.
        }
        //we assume that all were given across all neighbours. so:
        curr -= give;
    } else if(curr < capacity) {
        //on the other hand, if your current value is less than your capacity, you seek:

        for(int i = 0; i < 8; i++) {
            float other_r = neighbours[i].r;
            float other_g = neighbours[i].g;

            if(other_g > 0.0) {
                //if they had something to give, take.
                curr += other_g;
            }
        }
    }
        //send out as rgba: 
    gl_FragColor = vec4(curr, give, 0.0, 1.0);
}

//     //send out as rgba: 
// gl_FragColor = vec4(curr, prev.r, 0.0, 1.0);

// else {
// vec4 neighbours[8];
// get_neighbours(u_prev, vTexCoord, u_res, neighbours);
// if(curr >= capacity) {
//             //you have more than you can take. share with neighbours.
// float amt_to_offload = curr - capacity;
// for(int i = 0;
// i < 8;
// i ++) {
// float n = neighbours[i].r;
// if(n < capacity) {
// give += amt_to_offload;
// }
// }
// } else if(curr < capacity) {
//             //you are needy. take from neighbours. 

// for(int i = 0;
// i < 8;
// i ++) {
// float n = neighbours[i].r;
// if(n > capacity) {
//                     //this means it has something to give.
// curr += n / 7.0;
// }
// }
//             // curr -= prev.g;
// }

// }

```


![[260329_vid.mp4]]

``` js
#ifdef GL_ES
precision mediump float;
#endif

//receive from vertex shader:
varying vec2 vTexCoord;

//custom uniforms:
uniform vec2 u_res;
uniform sampler2D u_prev;
uniform vec2 u_seed_coords; //passed in pixel-space. 
uniform float u_inject_toggle;

//local: 
float seed_amt = 1.0;
float capacity = 0.5;

float curr = 0.0;

float give = 0.0; 

//helpers: 

//to get neighbours:
/* usage: 

vec4 neighbours[8];
get_neighbours(u_prev, vTexCoord, u_res, neighbours);

*/
void get_neighbours(sampler2D tex, vec2 uv, vec2 res, out vec4 neighbours[8]) {
    // size of one pixel in UV space
    vec2 px = 1.0 / res;

    // axis-aligned neighbors
    neighbours[0] = texture2D(tex, uv + vec2(0.0, px.y));   // up
    neighbours[1] = texture2D(tex, uv + vec2(0.0, -px.y));  // down
    neighbours[2] = texture2D(tex, uv + vec2(-px.x, 0.0));  // left
    neighbours[3] = texture2D(tex, uv + vec2(px.x, 0.0));   // right

    // diagonal neighbors
    neighbours[4] = texture2D(tex, uv + vec2(-px.x, px.y));  // up-left
    neighbours[5] = texture2D(tex, uv + vec2(px.x, px.y));   // up-right
    neighbours[6] = texture2D(tex, uv + vec2(-px.x, -px.y)); // down-left
    neighbours[7] = texture2D(tex, uv + vec2(px.x, -px.y));  // down-right
}

void inject() {
    curr = seed_amt;
}

void main() {
    //globals: 
    vec2 px_coord = vTexCoord * u_res; // convert to px space.
    //previous state:
    vec4 prev = texture2D(u_prev, vTexCoord);

    //inject seed: 
    if(u_inject_toggle == 1.0) {
        float d = distance(px_coord, u_seed_coords);
        if(d < 1.0) {
            inject();
        } else {
            // curr = prev.r;
        }
    } else {
        curr = prev.r;
    }

    //two simple rules: if you have more than you can take, share with neighbours. if you have less, take from neighbours.

    vec4 neighbours[8];
    get_neighbours(u_prev, vTexCoord, u_res, neighbours);

    if(curr > capacity) {
        float excess = curr - capacity;

        for(int i = 0; i < 8; i++) {
            float other = neighbours[i].r;
            give += excess / 8.0; //excess divided across all neighbours.
        }
        //we assume that all were given across all neighbours. so:
        curr -= give;
    } else if(curr < capacity) {
        //on the other hand, if your current value is less than your capacity, you seek:
        for(int i = 0; i < 8; i++) {
            float other_r = neighbours[i].r;
            float other_g = neighbours[i].g;
                curr += other_g; 
            
        }
    }
        //send out as rgba: 
    gl_FragColor = vec4(curr, give, u_inject_toggle, 1.0);
}

// for(int i = 0;
// i < 8;
// i ++) {
// curr += neighbours[i].g * weights[i];
// }
```






