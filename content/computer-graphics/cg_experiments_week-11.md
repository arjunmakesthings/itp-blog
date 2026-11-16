---
date: 2026-11-14
tags:
  - experiments
noteOrder: "580"
draft: "false"
---
# ask: 
> Computer graphics is fun, and it can also be beautiful, but it really becomes useful when it can be used to convey information. For that, you need text.
> 
> In the attached file I have implemented a text primitive for you, in the form of a texture image of a text font (font.png) and a new shape primitive Shape.text() which uses that font image to create textured meshes which form text messages.
> 
> I have also added a parameter uSheer which can be used to convert texture color into object transparency.
> 
> For this week's assignment, see if you can find interesting and creative uses for text in 3D graphics. For example, you can try to make interactive documents, text editors, or interactive buttons, sliders, trackpads or animated charts in the 3D space.
> 
> As a stretch goal, see if you can create a multi-line text primitive, one that allows you to add newline characters to your text message. You can also try to modify Shape.text() so it can create italic text (hint: use the value of v to modify the value of u). You can also try to create your own version of font.png, so that you can render a different font.
> 
> As usual, be creative, use your imagination, surprise me. :-)

---

i think [[ken-perlin]] is trying to complicate the assignments too fast — atleast — for me. i was happy to know that we learnt about textures, and wanted to implement that & spend this week cleaning up the library. 

but, now, we're asked to play with text (with even more stuff added to the library). 

---

i first spent time understanding his library, and then went on to slowly add the features he included to my library. 

modified library to make everything return the object itself, so that chaining like so could be possible: 

``` js
          //global transforms:
          m.identity().scale(canvas.height / canvas.width, 1, 1).perspective(10);

          m.scale(0.5).draw(shp, Material.red_plastic, m); 
          };
```

changes: 

``` js
  this.get = () => m[top].slice();
  this.set  = _m => { am[top] = _m.slice(); return this; }

  
  this.push = () => { m[top+1] = m[top].slice(); top++; return this; }
  this.pop  = () => { --top; return this; }

  this.identity = ()    => { m[top] = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ]; return this; }
  this.inverse = () => {
     let co = (c, r) => {
        let s = (i, j) => m[top][c+i & 3 | (r+j & 3) << 2];
        return (c+r & 1 ? -1 : 1) * ( (s(1,1) * (s(2,2) * s(3,3) - s(3,2) * s(2,3)))
                                    - (s(2,1) * (s(1,2) * s(3,3) - s(3,2) * s(1,3)))
                                    + (s(3,1) * (s(1,2) * s(2,3) - s(2,2) * s(1,3))) );
     }
     let d = [], e = 0;
     for (let n = 0 ; n < 16 ; n++) d.push(co(n >> 2, n & 3));
     for (let n = 0 ; n <  4 ; n++) e += m[top][n] * d[n << 2];
     for (let n = 0 ; n < 16 ; n++) m[top][n] = d[n] / e;
     return this;
  }
  this.move  = (x,y,z)  => { [x,y,z] = xyz(x,y,z); m[top] = mxm(m[top], [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]); return this; }
  this.perspective = fl => { m[top] = mxm(m[top], [1,0,0,0, 0,1,0,0, 0,0,1,-1/fl, 0,0,0,1]); return this; }
  this.scale = (x,y,z)  => { [x,y,z] = xyz(x,y,z); m[top] = mxm(m[top], [x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1]); return this; }
  this.rotate_x = t        => { m[top] = mxm(m[top], [1,0,0,0, 0,C(t),S(t),0, 0,-S(t),C(t),0, 0,0,0,1]); return this; }
  this.rotate_y = t        => { m[top] = mxm(m[top], [C(t),0,-S(t),0, 0,1,0,0, S(t),0,C(t),0, 0,0,0,1]); return this; }
  this.rotate_z = t        => { m[top] = mxm(m[top], [C(t),S(t),0,0, -S(t),C(t),0,0, 0,0,1,0, 0,0,0,1]); return this; }

  this.draw = (shape, material) => { draw(shape, material, this); return this; }

```

i then got claude to rewrite my original shapes library, to include uv coordinates & to include more shapes. so, now, each vertex has 8 attributes by default: 

``` js
        //to make a scene now, we simply define a vertex map (where each thing is, and its size):
        this.vertex_size = 8;
        this.vertex_attributes = {
          a_pos: { size: 3, position: 0 },
          a_nor: { size: 3, position: 3 },
          a_uv: { size: 2, position: 6 },
        };
```

implemented basic cube:
![[Screenshot 2026-11-14 at 21.08.02.webp]]


text and image: 

![[Screenshot 2026-11-14 at 21.30.38.webp]]place text on the face of a cube: 

![[Screenshot 2026-11-16 at 10.35.45.webp|449]]

code (with global isometric rotation): 

``` js
          m.scale(0.08); 
          m.push(); 
            m.draw(make_cube(), Material.red_plastic, 0, 0.); 
          m.pop(); 
          m.push(); 
            m.move(-1., 0, 1)
            m.draw(make_text("t"), Material.red_plastic, 1, 1.); 
          m.pop(); 

```

morphed characters into cubes, and messed around with the mesh. 

![[Screen Recording 2026-11-16 at 15.01.53.mp4]]

``` html
<!-- multiple letters in cubes with light sources as themselves: -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>sketch</title>
  </head>
  <body bgcolor="black">
    <!--<canvas id="canvas" width="800" height="800"></canvas>-->
    <canvas id="canvas"></canvas>

    <!-- for debug: -->
    <style>
      canvas {
        /*border: 1px solid white;*/
        margin: 0;
        padding: 0;
        width: 99vw;
        height: 99vh;
        overflow: hidden;
      }
    </style>

    <!-- scripts: -->
    <script src="../assets/webgl-4.js"></script>
    <script src="../assets/library-1.4.js"></script>
    <script src="../assets/shapes-2.js"></script>
    <script src="../assets/materials.js"></script>
    <script src="../assets/noise.js"></script>

    <!-- webgl: -->
    <script>
      let checker = true;
      function Scene() {
        //to make a scene now, we simply define a vertex map (where each thing is, and its size):
        this.vertex_size = 8;
        this.vertex_attributes = {
          a_pos: { size: 3, position: 0 },
          a_nor: { size: 3, position: 3 },
          a_uv: { size: 2, position: 6 },
        };

        this.vertex_shader = `#version 300 es
        uniform mat4 u_mf, u_mi;
        in vec3 a_pos, a_nor;
        in  vec2 a_uv;
        out vec2 v_uv;
        out vec3 v_pos, v_nor;

        uniform float u_time; 

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
  
        void main(){
          //manipulations:
          vec3 p = a_pos;
          //p *= noise(p * 2. + u_time * 0.5);
          p.z *= noise(p.xyz) * 0.5 + 0.5 * sin(p.x + u_time);
          //p.x += noise(a_pos.xyz);  

          vec4 pos = u_mf * vec4(p, 1.);
          vec4 nor = vec4(a_nor, 0.) * u_mi;
          v_pos = pos.xyz / pos.w;
          v_pos.z *= -1.;
          v_nor = nor.xyz;
          v_nor+=sin(u_time); 
          v_uv = a_uv;

          ////v_pos += noise(pos.xyz)*0.01; 
          ////v_nor += noise(pos.xyz)*0.01; 

          //v_pos.z*=sin(noise(v_pos * u_time)); 
          ////v_uv += noise(pos.xyz)*0.01; 
          
          
          gl_Position = vec4(v_pos, 1.);

          // deform: push each point in or out, depending on noise at that point
          //p *= noise(p * 2. + u_time * 0.5);

          //vec4 pos = u_mf * vec4(p, 1.);
          //vec4 nor = vec4(a_nor, 0.) * u_mi;
          //v_pos = pos.xyz / pos.w;
          //v_pos.z *= -1.;
          //v_nor = nor.xyz;
          //v_uv = a_uv;
          //gl_Position = vec4(v_pos, 1.);
        }`;

        this.fragment_shader = `#version 300 es
        precision highp float;
  
        in  vec3 v_pos, v_nor;
        in  vec2 v_uv;
        out vec4 frag_col;
  
        uniform vec3 u_amb, u_diff; 
  
        uniform vec4 u_spec; 
  
        uniform float u_time; 

        uniform sampler2D u_sampler[16];
        uniform int u_texture;
        uniform float u_sheer; 

        //multiple lights: 
        uniform int num_lights;
        const int max_lights = 100; 
        uniform vec3 u_lights[max_lights];

        void main() {
          vec4 tex = vec4(1.);
          if (u_texture == 0) tex = texture(u_sampler[0], v_uv);
          if (u_texture == 1) tex = texture(u_sampler[1], v_uv);

          vec3 n = normalize(v_nor);
          vec3 v = vec3(0., 0., 1.);

          vec3 light = vec3(0.0001);

          for (int i = 0; i < num_lights; i++) {
            vec3 d = u_lights[i] - v_pos;
            float dist2 = dot(d, d);
            vec3 l_dir = d * inversesqrt(dist2);
            float att = 1. / (1. + 20. * dist2);

            vec3 ref = 2. * dot(n, l_dir) * n - l_dir;
            light += att * (u_diff * max(0., dot(n, l_dir))
                          + u_spec.rgb * pow(max(0., dot(ref, v)), u_spec.w));
        }

          frag_col = vec4(light * tex.rgb, 1. - tex.r * u_sheer);
}`;

        this.init = () => {
          set_uniform(
            "1iv",
            "u_sampler",
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          );
          load_texture(0, "../assets/textures/white.jpeg");
          load_texture(1, "../assets/textures/font.png");

          //position calculations for everything:
        };

        //define variables:
        let start_time = Date.now() / 1000;
        let m = new Matrix();

        this.update = () => {
          //resize to active canvas:
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);

          let st = `my words & your words; all mushed together; indiscernible; like our beings.`;

          //make lights first:
          let lights = [];

          let z_off = 0; 

          let t = Date.now() / 1000 - start_time;
          set_uniform("1f", "u_time", t);
          
            let y = 4; 
            let col = 0;
            for (let i = 0; i < st.length; i++) {
              if (st[i] === " ") { col++; continue; }
              if (st[i] === ";") { y -= 4; col = 0; continue; }
              lights.push(
                (-1.2 + 0.06 * col * 1.6) * canvas.height / canvas.width,
                0.15 + 0.06 * y, 
                //map(Math.sin(i + t * Math.sqrt(t % 60)), -1,1,-7,7)
                0
              );
              col+=1;
          }

          set_uniform("3fv", "u_lights", lights);
          set_uniform("1i", "num_lights", lights.length / 3);

          //global transforms:
          m.identity()
            .scale(canvas.height / canvas.width, 1, 1)
            .perspective(10);

          //all faces of a cube:
          const faces = [
            [0, 0], //f
            [0, Math.PI], //b
            [0, Math.PI / 2], //r
            [0, -Math.PI / 2], //l
            [-Math.PI / 2, 0], //t
            [Math.PI / 2, 0], //b
          ];

          //reset y & col from light positions:
          y = 4;
          col = 0;

          //global transform:
          m.move(-1.2, 0.15, 0); 

          for (let i = 0; i < st.length; i++) {
            if (st[i] === " ") {
              col++; 
              continue;
            }

            if (st[i] === ";") {
              y -= 4;
              col = 0;
              continue;
            }

              m.push();
                m.scale(0.07);
                //m.move(col * 1.6, y, map(Math.sin(i + t * Math.sqrt(t % 60)), -1,1,-7,7));
                m.move(col * 1.6, y, 0);
                m.rotate_y(i);
                m.rotate_x(t);

                m.push();
                  m.scale(0.8); 
                  m.draw(make_cube(), Material.silver, 0, 0.1);
                m.pop();

                let txt = make_text(st[i]);

                for (let [rx, ry] of faces) {
                  m.push();
                    m.rotate_x(rx);
                    m.rotate_y(ry);
                    m.move(-0.5, -0.08, 1.001);
                    m.draw(txt, Material.black, 1, 1.);
                  m.pop();
                }
              m.pop();
            col+=1;
          }

        };
      }

      gl_start(canvas, new Scene());

      //since i have frag in a different file:
      //let scene = new Scene();
      //fetch('./frag.frag').then(r => r.text()).then(src => {
      //  scene.fragment_shader = src;
      //  gl_start(canvas, scene);
      //});
    </script>
  </body>
</html>

```

