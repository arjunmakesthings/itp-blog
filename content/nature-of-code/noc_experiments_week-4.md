---
date: 2026-02-13
tags:
  - experiments
noteOrder: "240"
draft: "false"
---
# ask: 
use trigonometric functions and/or oscillating motion in a sketch. This is a very loose constraint and you should feel free to design your own exercise or pick from below.

---
# thought: 
eh. it feels like the book gets into some interesting things about rotation, but there was nothing conceptually exciting that i took away from my previous classes. 

even though i wanted to get into fourier series, i decided to finish the assignment and focus on [[shader-time/index|shader-time]] instead. 

---
# outputs: 

![[Screen Recording 2026-02-14 at 23.56.03.mp4]]

![[Screenshot 2026-02-14 at 23.56.19.webp]]

---
saw [[simple harmonic motion, by memo akten]]. read the chapter on oscillation in the book, and watched a video about [fourier series](https://www.youtube.com/watch?v=r6sGWTCMz2k).

the chapter in the book was dense. i dislike that we don't speak about the concept that we're supposed to explore in the coming week. i don't know why the structure is like that. 

anyway.

---

i used what i built in [[noc_class-4]] to visualize vectors.

![[Screenshot 2026-02-14 at 20.36.47.webp]]

made this: 

![[260214_vid.mp4]]

``` js
//untitled; arjun; month, 2026.

/*
ask: 
use trigonometric functions and/or oscillating motion in a sketch. This is a very loose constraint and you should feel free to design your own exercise or pick from below.
*/

/*
thought: 
i was inspired by the fourier series, and used this time to explore that. 
*/

let c;

let movers = [];
let num = 500;

let t = 0;

let margin = 100;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square to handle calculations better.

  for (let i = 0; i < num; i++) {
    movers.push(new Mover(random(margin, width - margin), random(margin, height - margin)));
  }

  background(0);
}

function draw() {
  background(0, 20);

  for (let mover of movers) {
    mover.complete();
    mover.show();
  }
}

class Mover {
  constructor(init_x, init_y) {
    this.pos = createVector(init_x, init_y);
    this.center = createVector(init_x, init_y);

    this.angle = 0;

    this.r = random(20, 100);
    this.init_r = this.r;

    this.t = 0;
    this.t_inc = random(0.04, 0);

    this.dir = random(1);
  }
  show() {
    noStroke();
    fill(255);
    if (this.t > 0.1) {
      circle(this.pos.x, this.pos.y, 2);
    }
  }
  complete() {
    if (this.dir < 0.5) {
      this.pos.x = this.center.x + this.r * cos(this.t);
      this.pos.y = this.center.y + this.r * sin(this.t);
    } else {
      this.pos.x = this.center.x - this.r * cos(this.t);
      this.pos.y = this.center.y - this.r * sin(this.t);
    }
    this.t += this.t_inc;

    this.r = noise(this.t) * this.init_r;

    if ((this.t % Math.PI) * 2 < 0.01) {
      this.find_new_pos();
    }
  }
  find_new_pos() {
    this.center.set(this.pos.x + noise(this.t) * 2, this.pos.y + noise(this.t) * 2);
    noFill();
    // this.pos.set(random(margin, width - margin));
  }
}

```

used my previous work on text, and applied the same movers to points inside letterforms. 

![[Screenshot 2026-02-14 at 23.56.19.webp]]

``` js
//untitled; arjun; month, 2026.

/*
ask: 
use trigonometric functions and/or oscillating motion in a sketch. This is a very loose constraint and you should feel free to design your own exercise or pick from below.
*/

/*
thought: 
i was inspired by the fourier series, and used this time to explore that. 
*/

let c;

let movers = [];
let num = 500;

let t = 0;

let margin = 100;

let t_points = [];
let font; 

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(windowWidth, windowHeight); //square to handle calculations better.

  //text:
  t_points = convert_text_to_points("you & i \n can only \n cause chaos", 0, 0, width, height, 2, 160, "serif", CENTER, CENTER);

  for (let i = 0; i < t_points.length; i++) {
    fill(255);
    // circle(t_points[i].x, t_points[i].y, 3);
    movers.push(new Mover(t_points[i].x, t_points[i].y));
  }

  background(0);
}

function draw() {
  background(0, 2);

  for (let mover of movers) {
    mover.complete();
    mover.show();
  }
}

class Mover {
  constructor(init_x, init_y) {
    this.starting_displacement = random(-6, 6);
    this.pos = createVector(init_x + this.starting_displacement, init_y + this.starting_displacement);
    this.center = createVector(init_x + this.starting_displacement, init_y + this.starting_displacement);

    this.angle = 0;

    this.r = random(2, 20);
    this.init_r = this.r;

    this.t = 0;
    this.t_inc = random(0.04, 0);

    this.dir = random(1);

    this.d = 1;
  }
  show() {
    noStroke();
    fill(255);
    if (this.t > 0.5) {
      circle(this.pos.x, this.pos.y, 0.5);
    }
  }
  complete() {
    if (this.dir < 0.5) {
      this.pos.x = this.center.x + this.r * cos(this.t);
      this.pos.y = this.center.y + this.r * sin(this.t);
    } else {
      this.pos.x = this.center.x - this.r * cos(this.t);
      this.pos.y = this.center.y - this.r * sin(this.t);
    }
    this.t += this.t_inc;

    this.r = noise(this.t * this.d) * this.init_r;

    if ((this.t % Math.PI) * 2 < 0.01) {
      this.find_new_pos();
    }
  }
  find_new_pos() {
    this.center.set(this.pos.x + noise(this.t) * 2, this.pos.y + noise(this.t) * 2);
    this.r += this.r * 0.2;
    this.int_r = this.r;
    this.d += this.d * 0.2;
    noFill();
  }
}
```

---
