---
date: 2026-03-04
tags:
  - lectures
  - thoughts
noteOrder: "271"
draft: "false"
---
the class time, for me, is terrible. it rarely starts on time, lacks structure, and leaves very little to take away. 

---
# physics engines: 
- does not calculate on the basis of time; but calculates in-betweens

matter classes: 
- `Engine` (world)
- `Bodies` (create objects)
- `Body` (methods to apply)
- `Composite` (relationships between objects & world)
- `Render` (draws to canvas)
- `Constrains` (attachments)

doing: 

``` js
const {Engine, Bodies, Composite, Body, Vector, Render} = Matter;
```

allows you to call stuff like `Engine.create()` which is the same as `Matter.Engine.create()`. 



