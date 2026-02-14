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


