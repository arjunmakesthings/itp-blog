---
date: 2025-10-03
tags:
  - experiments
noteOrder: "103"
draft: "false"
---
# ask: 
> Functions are the basic unit of labor in your code. ~~Take a sketch you’ve already done and re-organize the code into functional units of labor that you define~~. You can also conceive of an entirely new world of labor. What kinds of labor does it take to make your sketch run?

my [[conversation with mimi]] stayed with me. i decided to spend time exploring the concept at hand, and not making something just to fulfil the ask. 

---
i spent time understanding how functions work. i realised that i can't get a function to run over time (because it runs all at once). therefore, recursion, fails for animation. 

i tried a few things.

``` js
function make_rectangle(x, y, w, h) {
  //we only need two pairs of coordinates to make a rectangle.
  let x1 = x;
  let y1 = y;

  let x3 = x1 + w;
  let y3 = y1 + h;

  strokeWeight(2);
  stroke(255);

  // point(x1, y1);
  // point(x3, y3);
  point(x3, y1);
  point(x1, y3);

  if (x1<x3 || y1 < y3){
    x1+=1;
    y1 += 1;
    make_rectangle(x1, y1, w-1,h-1);
    return;
  }
}
```

return everything passed to it: 
``` js
function send(...args) {
  return args;
}
```

i wanted to call a function, but make it run only once. i realised that i can call functions from the browser-console to do so. 

![[z_images/251004_vid.mov]]

watched a video on arrow functions. 

https://www.youtube.com/watch?v=fRRRkognpOs