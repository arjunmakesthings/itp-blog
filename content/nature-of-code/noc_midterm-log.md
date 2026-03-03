---
date: 2026-02-27
tags:
  - experiments
noteOrder: "256"
draft: "false"
---
# ask: 
> This "mid-semester exercise" can be anything that builds off of or is inspired by the material from the motion and physics material. It does not need to be a "fully realized thing" -- it can be a visual experiment in progress or a piece of a larger project you are building for another context (thesis, another class, etc.).

---
# thought: 
i spent time getting reacquainted with the idea of 'rule-based art'. when i [taught computational-sketching](https://arjunmakesthings.github.io/teaching/2023_set-rules-make-art/page.html), i used examples of sol-lewitt and yoko-ono to introduce the idea of an 'algorithm' to students.

in [[noc_class-6]], we also watched casey reas's [process compendium](https://vimeo.com/22955812) together, which was built around the idea of emergence — put a few rules together, and see the outcome that emerges. 

i wanted to take the two lines — instructions & emergence — further. 

---

when you look at the *rules* of these 'programs', much of it seems arbitrarily decided. the process veers more towards cyberdelia — i discover myself through computational means.  

i wanted to be more intentional about the rules, and model them based on felt experience. therefore, the piece & the rules that make the piece become the ==emergent expression of a particular feeling.==

---
# outputs: 
yet to generate. 

---

i decided to derive rules based on social-exclusion. 

the first distinction i must make is that *my* definition of rules does not encompass the whole phenomenon. it is purely a projection of how *i* think the world works — how certain groups get ahead, and others die. 

the other thing i must accept is that i myself cannot know what this outcome will produce. i can simply develop the rules, and then come up interesting ideas for what is visually represented. 

so, the first step is the expression of the rules: 

---
# rules:
there is a world and there is a unit. 

![[IMG_7574.webp]]


![[2603_noc-rules-1.webp]]

---

i first tried to write a very complex program, and it did not work. 

``` js
//untitled; arjun; month, 2026.

/*
ask: 

*/

/*
thought: 

*/

//there is a world, and there are beings in the world.

let world;

let margin = 100;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square to handle calculations better.

  world = new World(width, height);

  world.big_bang();
}

function draw() {
  world.run();
}

class World {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.time = [0, 0, 0, 0];
    this.day = 0;

    this.beings = [];
  }
  big_bang() {
    this.beings.push(Being.birth(this.w / 2, this.h / 2));
    // this.beings.push(Being.birth(this.w / 2, this.h / 2));
  }
  run() {
    background(0);

    this.keep_time();

    for (let being of this.beings) {
      being.exist();
    }

    // //every x second, a new unit is added into space.
    if (frameCount % 60 == 0) {
      // this.units.push(Unit.birth(random(margin, this.w), random(margin,this.h)));
    }
  }
  keep_time() {
    const ms = millis() - this.day;
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));

    // When a minute passes, reset loopStart
    if (seconds >= 10) {
      this.day = millis();
      this.time[0] = 0;
      this.time[1] = 0;
      this.time[2] = 0;
      this.time[3] = 0;
    } else {
      this.time[0] = Math.floor(ms);
      this.time[1] = seconds;
      this.time[2] = minutes;
      this.time[3] = hours;
    }

    console.log(this.time); 
  }
}

class Being {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.home = this.pos;
    this.age = 1;
    this.aging_rate = 0.37;

    this.other_places = [this.home.add(random(20, 50))];
  }
  static birth(x, y) {
    return new Being(x, y);
  }
  exist() {
    this.show();
    this.grow();
    this.move();
  }
  show() {
    noFill();
    stroke(255);
    circle(this.pos.x, this.pos.y, 10);
  }
  grow() {
    const prev_age = Math.floor(this.age);
    this.age += this.aging_rate;
    const curr_age = Math.floor(this.age);

    if (curr_age > prev_age) {
      //happy birthday:
      this.other_places.push(random(width / 2, height / 2));
    }
  }
  move() {
    if (this.time )
  }
  static death() {}
}

```

there were too many variables for me to focus on. 

i think this is why ==generative art that focuses on emergence has a simpler set of rules.==

---






