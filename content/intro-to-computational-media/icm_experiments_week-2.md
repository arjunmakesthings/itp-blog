---
date: 2025-09-15
tags:
  - experiments
  - reading
noteOrder: "60"
draft: "false"
---
did [this](https://docs.google.com/document/d/1aeZIQwVhC5zcMJ047_Ai0hfWCi5asauM/edit?pli=1) assignment, and began to read about easing. 

https://www.youtube.com/watch?v=YJB1QnEmlTs

![[z_images/Screenshot 2025-09-15 at 20.55.33.webp]]

made this for one of the assignments:

![[z_images/Screen Recording 2025-09-15 at 20.56.10.mov]]

---
thought about the creative assignment.

[[people/mimi|mimi]]'s brief: 

> The world is defined through relationships and those relationships shape our perspectives. Use variables to build in some relationships between two or more elements in your sketch and think about how the perception of what’s happening is different depending on which element's perspective you take on.

i could go philosophically with this line of thought. i had an idea too. but, i was tired of putting in thought into every week's assignment. i decided to play instead. also watched [[daniel shiffman]]'s video on transformations. thought about rotating rectangles. 

i made a sketch that makes it difficult to understand whether the computer is drawing white rectangles or black. 

![[z_images/Screen Recording 2025-09-15 at 21.58.31.mov]]

i messed around for a bit, with a bunch of mathematical variations. but settled on the simplest one i'd explored. 

``` js
//eh, relationships; i guess; september, 2025.

/* ask: 
The world is defined through relationships and those relationships shape our perspectives. Use variables to build in some relationships between two or more elements in your sketch and think about how the perception of what’s happening is different depending on which element's perspective you take on.
*/

let s = 50;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);

  s = width * 0.05; //the person is 5% of the world.
  x = s * 1.5; //give it a margin of 1.5x its size.

  ground_y = height * 0.75; //make ground at 75% of height.
  y = ground_y - s / 2;
}

function draw() {
  background(0);

  w = map(mouseX, 0, width, 10,100);
  h = map(mouseY, 0, height, 10, 100);

  var my_over_mx = mouseY / mouseX; //ratio of x over y.

  // w = 10 + mouseX;
  // h = 0.01 * w + my_over_mx;

  // var x_gap = 1+ w;
  // var y_gap = h*1.5;

  for (let x = 0 + s; x <= width - s; x += w) {
    for (let y = 0 + s; y <= height - s; y += h) {
      push();
      rectMode(CENTER);
      translate(x, y);
      var pace = frameCount * 0.005;
      rotate(pace);
      noStroke();
      fill(255);
      rect(0, 0, w, h);
      pop();
    }
  }
}

```

