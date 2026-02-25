---
date: 2026-02-25
tags:
  - lectures
noteOrder: "254"
draft: "false"
---
particle methods (such as `sort`) create a new subset of the array. this is why you do: 

``` js
this.letters = this.letters.filter((letter) => letter.life >= 2);
```

but sort shuffles the original source array; such as so: 

``` js
particles.sort((a,b) => {
return a.vel.mag() - b.vel.mag(); 
})
```

discovered this: https://opentype.js.org. converts type into bezier forms. 