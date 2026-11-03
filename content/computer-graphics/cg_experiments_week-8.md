---
date: 2026-10-31
tags:
  - experiments
noteOrder: "563"
draft: "false"
---
# ask: 
> In class this week you worked on creating animated figures which use m.push() and m.pop() to create motion hierarchy. You also experienced how clunky it is when you need to explicitly declare every shape that you intend to render in a scene.
> 
> In the attached folder, I am giving you a more user-friendly way to create hierarchical animated figures. Rather than needing to explicitly list every object you intend to render, this modified approach lets you simply refer to any combination of shape + material + matrix at the moment that you wish to render it, by calling function draw().
> 
> Your assignment for next week is to create a hierarchical animated scene of your choice. Your animated object hierarchy can be a person, a horse, a car or electric motor or other machine, or any other thing with multiple moving parts that you find interesting. If you create a person or other creature, see if you can add secondary movements, like shoulder roll or hip sway, etc., to give your character personality (or multiple personalities).
> 
> In the included code I have also provided examples of how to use html buttons and sliders. I would like you to incorporate a set of buttons and sliders into your work, so that the user can manipulate those to vary the animated scene in interesting ways.
> 
> As usual, use your imagination, and have fun with it!

before i made anything, there was a lot of library-work work to do. 

first, i made a shapes library; so that i can define multiple shapes: 

``` js
//return a sphere with n-segments:
function make_sphere(n) {
  let vs = [];

  let point = (u, v) => {
    let theta = 2 * Math.PI * u;
    let phi = Math.PI * v - Math.PI / 2;
    let x = Math.cos(theta) * Math.cos(phi);
    let y = Math.sin(theta) * Math.cos(phi);
    let z = Math.sin(phi);
    return [x, y, z, x, y, z]; //unit sphere: normal is the same as position.
  };

  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      let u0 = i / n,
        u1 = (i + 1) / n;
      let v0 = j / n,
        v1 = (j + 1) / n;
      vs.push(
        ...point(u0, v0),
        ...point(u1, v0),
        ...point(u1, v1),
        ...point(u0, v0),
        ...point(u1, v1),
        ...point(u0, v1),
      );
    }

  return vs;
}

//return a unit-length cube;
function make_cube() {
  return [
    //+x face:
     1, -1,  1,    1,  0,  0,
     1,  1, -1,    1,  0,  0,
     1, -1, -1,    1,  0,  0,
     1, -1,  1,    1,  0,  0,
     1,  1, -1,    1,  0,  0,
     1,  1,  1,    1,  0,  0,

    //-x face:
    -1, -1,  1,   -1,  0,  0,
    -1,  1, -1,   -1,  0,  0,
    -1, -1, -1,   -1,  0,  0,
    -1, -1,  1,   -1,  0,  0,
    -1,  1, -1,   -1,  0,  0,
    -1,  1,  1,   -1,  0,  0,

    //+y face:
    -1,  1,  1,    0,  1,  0,
     1,  1, -1,    0,  1,  0,
    -1,  1, -1,    0,  1,  0,
    -1,  1,  1,    0,  1,  0,
     1,  1, -1,    0,  1,  0,
     1,  1,  1,    0,  1,  0,

    //-y face:
    -1, -1,  1,    0, -1,  0,
     1, -1, -1,    0, -1,  0,
    -1, -1, -1,    0, -1,  0,
    -1, -1,  1,    0, -1,  0,
     1, -1, -1,    0, -1,  0,
     1, -1,  1,    0, -1,  0,

    //+z face:
    -1,  1,  1,    0,  0,  1,
     1, -1,  1,    0,  0,  1,
    -1, -1,  1,    0,  0,  1,
    -1,  1,  1,    0,  0,  1,
     1, -1,  1,    0,  0,  1,
     1,  1,  1,    0,  0,  1,

    //-z face:
    -1,  1, -1,    0,  0, -1,
     1, -1, -1,    0,  0, -1,
    -1, -1, -1,    0,  0, -1,
    -1,  1, -1,    0,  0, -1,
     1, -1, -1,    0,  0, -1,
     1,  1, -1,    0,  0, -1,
  ];
}



```

[[ken-perlin]]'s library passes u, v coordinates for each shape too. but, since we don't use them at the moment, i decided against that. 

changed all operations to operate on a stack data-structure: 

``` js
  //implement a stack:
  let m = [[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]],
    top = 0;

  //operations:
  this.get = () => m[top].slice();
  this.set = (_m) => (m[top] = _m.slice());

  
  this.push = () => { m[top+1] = m[top].slice(); top++; }
  this.pop  = () => --top;

  this.identity = ()    => m[top] = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];
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
  }
  this.move  = (x,y,z)  => { [x,y,z] = xyz(x,y,z); m[top] = mxm(m[top], [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]); }
  this.perspective = fl => m[top] = mxm(m[top], [1,0,0,0, 0,1,0,0, 0,0,1,-1/fl, 0,0,0,1]);
  this.scale = (x,y,z)  => { [x,y,z] = xyz(x,y,z); m[top] = mxm(m[top], [x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1]); }
  this.rotate_x = t        => m[top] = mxm(m[top], [1,0,0,0, 0,C(t),S(t),0, 0,-S(t),C(t),0, 0,0,0,1]);
  this.rotate_y = t        => m[top] = mxm(m[top], [C(t),0,-S(t),0, 0,1,0,0, S(t),0,C(t),0, 0,0,0,1]);
  this.rotate_z = t        => m[top] = mxm(m[top], [C(t),S(t),0,0, -S(t),C(t),0,0, 0,0,1,0, 0,0,0,1]);
};
```

simple joint movement: 

![[261101_1.mp4]]

``` js
        //global transforms:
        m.identity();
        m.perspective(10);

        m.push();
        m.move(0., .2, 0.);
        m.scale(0.1, 0.2, 0.1);
        draw(sphere, Material.red_plastic, m);
        m.pop();

        m.push();
        m.move(0., 0., 0.);
        //m.rotate_z(Math.PI + Math.cos(t) / 2);
        let a = map(Math.sin(t), -1., 1., 0., 1.); 
        m.rotate_z(a + Math.PI); 
        m.move(0., .2, 0.);
        m.scale(0.1, 0.2, 0.1);   // stretch first, then rotate
        draw(sphere, Material.blue_plastic, m);
        m.pop();

```

order of operations is very important. 

``` js
        m.push(); 
        m.scale(0.1, 0.2, 0.1); 
        m.move(0., -4., 0.); 
        draw(sphere, Material.red_plastic, m); 
        m.pop(); 

```

---

manual branching: 

``` js
      //this.update = () => {
      //  let t = Date.now() / 1000 - start_time;
        
      //  //global transforms:
      //  m.identity();
      //  //m.perspective(10);

      //  let bl = 0.09; 
      //  let bw = 0.05; 

      //  //set origin to base top:
      //  m.move(0., -1. + bl + (bl * 0.2) ,0.); 

      //  //base:
      //  m.push(); 
      //    m.scale(bw, bl, 0.1); 
      //    draw(sphere, Material.red_plastic, m); 
      //  m.pop();

      //  //branch:
      //  for (let y_off = 0.; y_off < 1.2; y_off+=bl * 2.){
      //    for (let i = 0; i<2; i++){
      //      m.push(); 
      //        let a = (i < 1)? 0.2 : -0.2;
      //        m.rotate_z(a * y_off);
      //        m.move(0., bl * 2 + y_off, 0.); 
      //        m.scale(bw, bl, 0.1); 
      //        draw(sphere, Material.blue_plastic, m); 
      //      m.pop();
      //    }
      //  }
      //}

```

i implemented a recursive l-systems algorithm: 



```js
        let branch = (angle, l, w, max_depth) => {
          if (max_depth < 0) return;
            m.push();
              m.rotate_z(angle);
              m.move(0., l, 0.); //move to the center of this branch.

                m.push(); //scale only drawing; not transformations.
                  m.scale(w, l, bw);
                  //let mat = Material.rand; 
                  draw(shp, Material.shiny_purp, m);
                //  if (checker == true){
                //  console.log(mat); 
                //  checker = false;
                //}
                m.pop();

                //let z_displace = map(noise.simplex2(w + t * 0.2,l), -1.,1.,-0.005,0.005)
                let z_displace = 0.021; 

                //console.log(noise.simplex2(w,l)); 

              m.move(0., l, z_displace); //move to tip of the branch.
              m.rotate_x(l * Math.sin(t)); 
              branch(angle_dev, l * scale_dev, w * scale_dev, max_depth - 1); //left:
              branch(-angle_dev, l * scale_dev, w * scale_dev, max_depth - 1); //right.
            m.pop();
        };
```

![[l-systems.mp4]]