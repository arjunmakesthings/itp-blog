---
date: 2026-09-29
tags:
  - experiments
noteOrder: "499"
draft: "false"
---


ray trace with specular: 

``` html
<!-- base raytracing with specular:  -->

<body bgcolor="black">
  <canvas id="canvas" width="800" height="800"></canvas>
  <script src="../assets/webgl.js"></script>
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

            //light pos: 
            vec3 l_pos = vec3(-1.0, -1.0, -2.0); 

            //surface normal: 
            vec3 n = normalize(p - s.xyz); 

            //direction from point to light: 
            vec3 d = normalize(l_pos - p); 

            vec3 surface = vec3 (1., 0., 0.); 
            vec3 ambient = .1 * surface; 

            //lambert's cosine:
            float diffuse = max(0., dot(n,d));

            vec3 c = ambient + diffuse * surface; 

            //specular: 

            //for this, we first need a reflection of the light direction about the normal:
            vec3 reflected_light = 2. * dot(n, d) * n - d;
            
            float shininess = 20.0; 

            vec3 spec_col = vec3(1.0); 

            vec3 spec = pow(max(0., dot(-w, reflected_light)), shininess) * spec_col; 

            //if you don't take max, you get negative (powers turn negatives positive): 
            // vec3 spec = pow(dot(-w, reflected_light), shininess) * spec_col; 

            c+=spec; 

            frag_col = vec4(sqrt(c), 1.); 
            }
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

![[Screenshot 2026-09-29 at 19.17.52.webp]]specular highlights: 

ray trace to a half space: 

``` html
<!-- base cube:  -->

<body bgcolor="black">
  <canvas id="canvas" width="800" height="800"></canvas>
  <script src="../assets/webgl.js"></script>
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

         float ray_to_half_space(vec4 v, vec4 w, vec4 sp){
          //ax + by + cz + d < 0. 
          
          return (dot(v, sp) / dot(w,sp));  
         }

         void main() {
          vec3 pos = v_pos; 
          frag_col = vec4(vec3(0.0), 1.0);

          //ray from camera to this pixel: 
          vec4 v = vec4(0.0, 0.0, 0.0, 1.0); //cam position. 
          vec4 w = vec4(normalize(vec3(v_pos.xy, -f)), 0.0); 
          vec4 sp = vec4(0.0,1.0, 0.0, -.5); 

          // float t = ray_to_sphere(v,w,s);

          float t = ray_to_half_space(v,w,sp); 

          if (t>=0.){
            frag_col = vec4(1.0); 
            }
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

> To find where the ray enters the cube, you need to take the maximum t0 of the values of t for the half-spaces that the ray enters into.
> 
> To find where the ray emerges out of the cube, you need to take the minimum t1 of the values of t for the half-spaces that the ray emerges out of.

you have 6 infinite planes, and you're looking at all points it enters & exits. 

point on the surface of the plane the my ray hits: 

``` c
vec3 p = v.xyz + t * w.xyz; //ray on the surface:

frag_col = vec4(vec3(p), 1.0);
```


![[Screenshot 2026-09-29 at 21.52.05.webp|402]]

some cool stuff. 

![[Screen Recording 2026-09-29 at 23.55.10.mp4]]

![[Screen Recording 2026-09-29 at 23.56.05.mp4]]

``` html
<!-- many cubes: raytracing, shadows & reflections on many cubes & many light sources -->

<body bgcolor="black">
  <canvas id="canvas" width="800" height="800"></canvas>
  <script src="../assets/webgl.js"></script>
  <script>
    //helper to map:
    let map = (v, in_lo, in_hi, out_lo, out_hi) => {
      return out_lo + ((v - in_lo) / (in_hi - in_lo)) * (out_hi - out_lo);
    };

    //helper to normalize a 3d vector:
    let normalize = (v) => {
      let s = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [v[0] / s, v[1] / s, v[2] / s];
    };

    //every cube: xyz = center, w = half-size.
    let cubes = [];

    const ring_r = 0.5;
    const count = 20;

    for (let i = 0; i < count; i++) {
      let a = map(i, 0, count, 0, 2 * Math.PI);
      let x = ring_r * Math.cos(a);
      let y = ring_r * Math.sin(a);
      cubes.push(x, y, -3.0, a * 0.06);
    }

    const num_cubes = cubes.length / 4;
    const num_lights = 2;

    //diffuse color of each cube:
    let colors = [];
    for (let i = 0; i < num_cubes; i++) {
      let a = (2 * Math.PI * i) / num_cubes;
      colors.push(
        0.5 + 0.5 * Math.cos(a),
        0.5 + 0.5 * Math.cos(a + 2.1),
        0.5 + 0.5 * Math.cos(a + 4.2),
      );
    }

    //ambient and specular for each cube:
    let ambients = [];
    let speculars = [];
    for (let i = 0; i < num_cubes; i++) {
      ambients.push(0.2 * colors[3 * i], 0.2 * colors[3 * i + 1], 0.2 * colors[3 * i + 2]);
      speculars.push(0.5, 1, 1, 75);
    }

    //light dirs:
    let lights = [normalize([-1, 1, 0]), normalize([1, -1, 2.])].flat();

    //light colors (r, g, b), one entry per light:
    let light_cols = [1, 0.9, 0.8, 0.3, 0.4, 0.6];

    function Scene() {
      this.vertex_shader = `#version 300 es
         in  vec3 a_pos;
         out vec3 v_pos;
         void main() {
            gl_Position = vec4(a_pos, 1.);
            v_pos = a_pos;
         }`;

      //note: the \${...} values below are filled in by javascript before compiling.
      this.fragment_shader = `#version 300 es
         precision highp float;
         in  vec3 v_pos;
         out vec4 frag_col;

         uniform float u_time;

         //every cube: xyz = center, w = half-size.
         uniform vec4 u_cubes[${num_cubes}];

         //ambient, diffuse (surface) and specular color of every cube.
         //specular: rgb = highlight color, a = shininess power.
         uniform vec3 u_ambients[${num_cubes}];
         uniform vec3 u_diffuses[${num_cubes}];
         uniform vec4 u_speculars[${num_cubes}];

         //light directions:
         uniform vec3 u_lights[${num_lights}];

         //light colors:
         uniform vec3 u_light_cols[${num_lights}];

         //focal length:
         float f = 3.;

         //tracing a ray to a cube; returns xyz = surface normal, w = t (or -1. on a miss).
         vec4 ray_to_cube(vec3 v, vec3 w, vec4 c){
          float r = c.w;

          vec4 p[6];
          p[0] = vec4(-1.,  0.,  0.,  c.x - r); //xlo
          p[1] = vec4( 1.,  0.,  0., -c.x - r); //xhi
          p[2] = vec4( 0., -1.,  0.,  c.y - r); //ylo
          p[3] = vec4( 0.,  1.,  0., -c.y - r); //yhi
          p[4] = vec4( 0.,  0., -1.,  c.z - r); //zlo
          p[5] = vec4( 0.,  0.,  1., -c.z - r); //zhi

          float t0 = -1000.; //latest entry.
          float t1 = 1000.; //earliest exit.

          //normal:
          vec3 n = vec3(0.0);

          //v & w as vec4-s:
          vec4 v4 = vec4(v, 1.0);
          vec4 w4 = vec4(w, 0.0);

          for (int i = 0; i < 6; i++){
            float wp = dot(w4, p[i]);
            float t = -dot(v4, p[i]) / wp;

            if (wp < 0.) {
              //entering this half-space: keep the latest one.
              if (t > t0) {
                t0 = t;
                n = p[i].xyz;
              }
            }
            if (wp > 0.) {
              //exiting this half-space: keep the earliest one.
              t1 = min(t1, t);
            }
          }
          if (t0 < t1 && t0 > 0.) {
            return vec4(n, t0);
          }
          return vec4(0., 0., 0., -1.);
         }

         void main() {
          frag_col = vec4(0.);

          //ray from camera to this pixel:
          vec3 v = vec3(0.0); //cam position.
          vec3 w = normalize(vec3(v_pos.xy, -f));

          // float t_min = mix(2., 20., (0.5 + 0.5 * sin(u_time)) * 0.25);
          float t_min = 1000.0;
          for (int i = 0; i < ${num_cubes}; i++) {
            vec4 hit = ray_to_cube(v, w, u_cubes[i]);
            float t = hit.w;
            if (t >= 0. && t < t_min) {
              t_min = t;

              //point on the cube's surface:
              vec3 p = v + t * w;

              //surface normal (from whichever face we entered through):
              vec3 n = hit.xyz;

              //ambient:
              vec3 c = u_ambients[i];

              //add up the light from every light source:
              for (int j = 0; j < ${num_lights}; j++) {

                //direction from point to light:
                vec3 l = u_lights[j];

                //reflect the light direction around the normal:
                vec3 r = 2. * dot(n, l) * n - l;

                //lambert's cosine (diffuse) + specular.
                //specular: how closely the bounce lines up with the direction back to the camera.
                vec3 cj = .8 * max(0., dot(n, l)) * u_diffuses[i] * u_light_cols[j]
                        + pow(max(0., dot(-w, r)), u_speculars[i].a) * u_speculars[i].rgb * u_light_cols[j];

                //with shadows:

                //we throw a ray from this point, and see if it intersects with any other cube.
                vec3 ws = l;
                vec3 vs = p + .001 * l;

                for (int k = 0; k < ${num_cubes}; k++)
                  //if any cube is in front, this light is blocked:
                  if (ray_to_cube(vs, ws, u_cubes[k]).w > 0.)
                    cj = vec3(0.);

                c += cj;
              }

              //reflection per point:
              vec3 cr = vec3(0.);

              vec3 wr = w - 2. * dot(n, w) * n;
              vec3 vr = p + .001 * wr;

              //find the nearest cube the reflected ray hits:
              float tr_min = 1000.;
              for (int k = 0; k < ${num_cubes}; k++) {
                vec4 hitr = ray_to_cube(vr, wr, u_cubes[k]);
                float tr = hitr.w;
                if (tr >= 0. && tr < tr_min) {
                  tr_min = tr;

                  //if the reflected ray hits a cube, compute shading for that cube:
                  vec3 nr = hitr.xyz;

                  cr = u_ambients[k];
                  for (int j = 0; j < ${num_lights}; j++) {
                    vec3 l = u_lights[j];
                    vec3 r = 8. * dot(nr, l) * nr - l;
                    cr += .4 * max(0., dot(nr, l)) * u_diffuses[k] * u_light_cols[j]
                        + pow(max(0., dot(-wr, r)), u_speculars[k].a) * u_speculars[k].rgb * u_light_cols[j];
                  }
                }
              }

              c += .25 * cr;

              //gamma correction:
              frag_col = vec4(sqrt(c), 1.);
            }
          }
         }`;

      let start_time = Date.now() / 1000;

      this.update = () => {
        let t = Date.now() / 1000 - start_time;
        set_uniform("1f", "u_time", t);

        //rebuild for animation:
        cubes = [];
        for (let i = 0; i < count; i++) {
          let d = i * 0.01;
          let a = map(i, 0, count, 0, 2 * Math.PI);
          let x = ring_r * Math.cos(a / t) * Math.sin(t);
          let y = ring_r * Math.sin(a - t);
          // cubes.push(x, y, map(Math.sin(a + d), -1, 1, -6.0, -2.0), d);
          cubes.push(x,y,-a * 0.3, i * 0.03);
          // cubes.push(x,y,-a * 0.3, 0.1 * i *);
        }

        // for (let i = 0; i < count; i++) {
        //   let a = map(i, 0, count, 0, 2 * Math.PI);
        //   let x = ring_r * Math.cos(a - t);
        //   let y = ring_r * Math.sin(a + t) + 0.5 * Math.cos(t);
        //   let z = -2. - a * i * 0.2;          // from -3 back to about -4.1
        //   cubes.push(x, y, z, 0.1 + z * 0.000001);
        // }

        //send the arrays to the shader:
        set_uniform("4fv", "u_cubes", cubes);
        set_uniform("3fv", "u_ambients", ambients);
        set_uniform("3fv", "u_diffuses", colors);
        set_uniform("4fv", "u_speculars", speculars);
        set_uniform("3fv", "u_lights", lights);
        set_uniform("3fv", "u_light_cols", light_cols);
      };
    }
    gl_start(canvas, new Scene());
  </script>
</body>
```

