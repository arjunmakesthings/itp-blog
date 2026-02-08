---
date: 2026-02-07
tags:
  - experiments
noteOrder: "233"
draft: "true"
---
# ask: 
### assignment-1:
The Book of Shaders is one of the best references online for shader programming. Reading through it may help you understand concepts you are still having trouble with.

Read the sections on [Shapes](https://thebookofshaders.com/07/) and [Patterns](https://thebookofshaders.com/09/) and build a sketch that uses shaping functions to generate an interesting composition.

Use p5.js and WebGL.
Your effect should be coded in the fragment unit of your shader.
Your effect should not use any uniform textures as input.

### assignment-2:
Build a solar system with moons, planets, and a sun.

Use three.js and WebGL.
Use parent-child relationships when adding your meshes to the scene. Moons should orbit around planets, and planets should orbit around the sun.
You don’t need to use SphereGeometry for all the shapes. Try some of the other included geometries.
Re-use the same material for all planets and re-use the same material for all moons.

---

from the book of shaders: 

> In order to run in parallel every pipe, or thread, has to be independent from every other thread. We say the ==threads are blind to what the rest of the threads are doing.== This restriction implies that all data must flow in the same direction. So it’s impossible to check the result of another thread, modify the input data, or pass the outcome of a thread into another thread. Allowing thread-to-thread communications puts the integrity of the data at risk


> It's impossible for a thread to know what it was doing in the previous moment. It could be drawing a button from the UI of the operating system, then rendering a portion of sky in a game, then displaying the text of an email. Each thread is not just blind but also memoryless.

---
understood each line of a barebones shader program.

made a [template](https://github.com/arjunmakesthings/shader-time_sp26/tree/main/templates/weekly-sketch_p5-shader). 

---

>     In the same way GLSL gives us a default output, vec4 gl_FragColor, it also gives us a default input, vec4 gl_FragCoord, which holds the screen coordinates of the pixel or screen fragment that the active thread is working on. With vec4 gl_FragCoord, we know where a thread is working inside the billboard. In this case we don't call it uniform because it will be different from thread to thread, instead gl_FragCoord is called a varying.

![[Screenshot 2026-02-07 at 20.20.12.png]]

---

i decided to do something with light. since shaders interpolate colors between two vertices, i thought it would lead to an interesting output. 