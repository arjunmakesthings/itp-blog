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

![[Screenshot 2026-11-14 at 21.30.38.webp]]