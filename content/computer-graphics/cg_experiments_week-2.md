---
date:
  "{ date }":
tags:
  - experiments
noteOrder: "467"
draft: "false"
---
# ask: 
> Your assignment for next week is to create your own examples of cool pixel shaders. Rather than doing more things with circular shapes, I encourage you to try other things, like polygons or letter forms or wave patterns, or any other cool visual or animated effect that you would like. This is an opportunity not just to learn about fragment shaders, but also to flex your artistic muscles.

---

i realized from the class sketch: 

``` html
<!-- from class:  -->

<body bgcolor=black>
    <canvas id=canvas width=800 height=800></canvas>
    <script src="./assets/webgl.js"></script>
    <script>
    
    function Scene() {
    
       this.vertex_shader = `#version 300 es
       in  vec3 a_pos;
       out vec3 v_pos;
       void main() {
          gl_Position = vec4(a_pos, 1.);
          v_pos = a_pos;
       }`;
    
       this.fragment_shader = `#version 300 es
       precision highp float;
       in  vec3 v_pos;
       out vec4 frag_col;
       void main() {
          frag_col = vec4(.5 + .5 * v_pos, 1.);
       }`;
    } 
    
    gl_start(canvas, new Scene());
    </script>
    

```

that we specify what the fragment shader outputs with: 

``` glsl
frag_col =  ... 

```

[[james]] then explained the whole dot product thing to me. 

so, a dot product of two vectors is a scalar quantity. 

``` txt

a = [x1, y1, z1]
b = [x2, y2, z2]

a.b = length of a * length of b * cos(q) between them.

```

if a vector is multiplied with itself, however, you basically get its length. 

``` txt
sqrt (a.a) => length of a (because cos(q) is 0). 
```

![[Screenshot 2026-09-13 at 18.05.38.webp|457]]

here's a small sketch that explains that: 

``` html
<!-- from class:  -->

<body bgcolor="black">
  <canvas id="canvas" width="800" height="800"></canvas>
  <script src="./assets/webgl.js"></script>
  <script>
    function Scene() {
      this.vertex_shader = `#version 300 es
         in  vec3 a_pos;
         out vec3 v_pos;
         void main() {
            gl_Position = vec4(a_pos, 1.);
            v_pos = a_pos;
         }`;

      this.fragment_shader = `#version 300 es
         precision highp float;
         in  vec3 v_pos;
         out vec4 frag_col;

         uniform float u_time; 
         void main() {
           float d = sqrt(1. - dot(v_pos, v_pos));
           float r = 0.0;
           float g = 0.0;
           float b = 0.0;

           float rad = sin (mod(u_time, 3.1));

           if (d>rad){
           r = d;
           }
           else{
           r = 1.0;
           g = 1.0;
           b = 1.0;
           }
           frag_col = vec4(r, g,b,1.0);
         }`;

      let start_time = Date.now() / 1000;

      this.update = () => {
        let t = Date.now() / 1000 - start_time;
        //   console.log(t % 1);
        set_uniform("1f", "u_time", t);
      };
    }
    gl_start(canvas, new Scene());
  </script>
</body>


```

here, d is the sqrt of 1 - dot product of v_pos, v_pos. so this goes from 0.0 to 1.0. 

i query that d variable, and if it's less than the radius, it is colored (within the circumference). 

translation: 

``` glsl
      #version 300 es
         precision highp float;
         in  vec3 v_pos;
         out vec4 frag_col;

         uniform float u_time; 
         void main() {
         vec3 pos = v_pos; 
            pos.x += 0.25; 
           float d = sqrt(1. - dot(pos, pos));
           float r = 0.0;
           float g = 0.0;
           float b = 0.0;

           float rad = sin (mod(u_time, 3.1));

           if (d>0.5){
            r = d;
           }
           else{
            r = 1.0;
            g = 1.0;
            b = 1.0;
           }
           frag_col = vec4(r, g,b,1.0);
         };

```

i played around a lot with the code files. it's just that this math is so damn new for me. it's so hard to visualize anything really. 