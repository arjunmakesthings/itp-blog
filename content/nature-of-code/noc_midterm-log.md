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

made this: 

![[Screen Recording 2026-03-03 at 21.06.32.mp4]]

![[Screenshot 2026-03-03 at 21.08.33.webp]]

code: 

``` js
/* 
untitled; by arjun; march 2026. 
simple system: 

- there are beings the world.
- beings move, and stay on surface. 
- beings close together cluster together. 

*/

let beings = [];

let num = 100;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square to handle calculations better.

  for (let i = 0; i < num; i++) {
    beings.push(new Being(width / 2, height / 2));
  }

  //clear canvas with a black background.
  background(0);
}

function draw() {
  // background(0);
  for (let being of beings) {
    //being.show();
    being.move(time);
  }

  for (let i = 0; i < beings.length; i++) {
    for (let j = 0; j < beings.length; j++) {
      if (i === j) continue;

      strokeWeight(0.08);
      if ((i + j) % 2 === 0) {
        stroke(255, 100);
      } else {
        stroke(0, 100);
      }
      line(beings[i].pos.x, beings[i].pos.y, beings[j].pos.x, beings[j].pos.y);
    }
  }

  keep_time();
}

class Being {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.home = this.pos.copy();
    this.dest = this.home.copy();

    this.other_places = [createVector(random(0, width), random(0, height))];

    this.vel = createVector(0, 0);

    this.last_time = 0;

    this.pace = random(0.5, 2);
  }
  show() {
    noFill();
    stroke(255);
    circle(this.pos.x, this.pos.y, 20);

    //this.show_places();
  }
  show_places() {
    for (let i = 0; i < this.other_places.length; i++) {
      noFill();
      stroke(255, 0, 0);
      circle(this.other_places[i].x, this.other_places[i].y, 50);
    }
  }
  move(time) {
    let norm_time = Math.floor(map(time[1], 0, 30, 0, 24));

    noStroke();
    fill(255, 0, 0);
    text(norm_time, 50, 50);

    if (norm_time < 8) {
      this.dest.set(this.home);
    } else if (norm_time >= 8 && norm_time < 17) {
      this.dest.set(this.other_places[0]);
    } else if (norm_time >= 17 && norm_time < 20) {
      let n = Math.floor(random(this.other_places.length));
      this.dest.set(this.other_places[n]);
    } else {
      this.dest.set(this.home);
    }

    if (norm_time === 23 && this.last_time !== 23) {
      //new day:
      this.other_places.push(createVector(random(0, width), random(0, height)));
    }

    this.last_time = norm_time;

    // Calculate direction and distance
    let d = p5.Vector.sub(this.dest, this.pos);
    let distance = d.mag();

    // Slow down as you get close (max speed = this.pace, min speed = 0)
    let speed = map(distance, 0, 100, 0, this.pace); // 100 is the "slowing radius"
    speed = constrain(speed, 0, this.pace);

    if (distance > 1) {
      d.setMag(speed);
      this.vel = d;
    } else {
      this.vel.set(0, 0);
    }

    this.pos.add(this.vel);
    this.stay();
  }
  stay() {
    if (this.pos.x >= width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y >= height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }
}

//helper to keep time.
let day = 0;
let time = [0, 0, 0, 0]; //ms, seconds, minutes, hours.

function keep_time() {
  const ms = millis() - day;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  //one minute loop.
  if (seconds >= 30) {
    day = millis();
    time[0] = 0;
    time[1] = 0;
    time[2] = 0;
    time[3] = 0;
  } else {
    time[0] = Math.floor(ms);
    time[1] = seconds;
    time[2] = minutes;
    time[3] = hours;
  }
}
```

not particularly accurate in terms of what i wanted to get done. but it's ok. 

---

i realized that my thinking wasn't clear. i referenced [process compendium](https://github.com/REAS/studio/blob/master/ProcessCompendium.md) again. he had simple rules, such as: 

> B1: Move in a straight line
> B2: Constrain to surface 
> B3: Change direction while touching another Element

his thinking was very clear: 

> The most important element of Process is the text. ==The text is the Process described in English, written with the intent to translate its content into software.== The Elements, Forms, and Behaviors referenced within the Process text are defined in the Library. The ==software interpretation is secondary to the text.== The text leaves many decisions open to the programmer, decisions that must be made using personal judgment. The ==act of translating the Process from English into a machine language interprets the text.== Process was implemented by into the language in . The hardware is inconsequential and in time it will fail. It was selected to be robust, but electronic devices are fragile. If a component of the hardware fails, it may be replaced without diminishing the work. Eventually, compatible components won't be available. When this happens, a new hardware system must be acquired and the software modified for the new platform.

> The Elements, Forms, and Behaviors referenced within the Processes are defined in the Library:

> Forms 
> F1: Circle 
> F2: Line 

> Behaviors
> B1: Move in a straight line
> B2: Constrain to surface 
> B3: Change direction while touching another Element
> B4: Move away from an overlapping Element 
> B5: Enter from the opposite edge after moving off the surface
> B6: Orient toward the direction of an Element that is touching 
> B7: Deviate from the current direction

> Elements
> E1: F1 + B1 + B2 + B3 + B4
> E2: F1 + B1 + B5
> E3: F2 + B1 + B3 + B5
> E4: F1 + B1 + B2 + B3
> E5: F2 + B1 + B5 + B6 + B7

---

# untitled: 
there is a world. a world keeps time, and runs on days. a day is 24-second long by human-time. 

a world is made of beings. 

base structure: 

``` js
/*
there is one world, and is created during the big-bang. 

the world has beings. beings do the following: 
- they are born. 
- they exist. 
- they die. 

*/

let world;

function setup() {
  createCanvas(1000, 1000);

  world = new World(0, 0);
  world.big_bang();
}
function draw() {
  world.run();
}

class World {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.beings = [];
  }
  big_bang() {
    let x = width / 2;
    let y = height / 2;
    this.beings.push(Being.birth(x, y));
  }
  run() {
    background(0);

    for (let being of this.beings) {
      being.live();
    }
  }
}

class Being {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
  static birth(x, y) {
    return new Being(x, y);
  }
  live() {
    this.show();
  }
  show() {
    noFill();
    stroke(255);
    circle(this.pos.x, this.pos.y, 20);
  }
  static death() {}
}

//helper to keep time.
let day = 0;
let time = [0, 0, 0, 0]; //ms, seconds, minutes, hours.

function keep_time() {
  const ms = millis() - day;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  //one minute loop.
  if (seconds >= 30) {
    day = millis();
    time[0] = 0;
    time[1] = 0;
    time[2] = 0;
    time[3] = 0;
  } else {
    time[0] = Math.floor(ms);
    time[1] = seconds;
    time[2] = minutes;
    time[3] = hours;
  }
}
```

---

rewrote the whole thing to a point where i was happy. 

``` js
/*
there is one world, and is created during the big-bang. 

the world has beings. beings do the following: 
- they are born. 
- they exist. 
- they die. 

the world keeps time. each day is day_length units long. 

*/

let world;

//time stuff:
let day_length = 24;
let day = 0;
let time = [0, 0, 0, 0]; //ms, seconds, minutes, hours.

function setup() {
  createCanvas(1000, 1000);

  world = new World(0, 0);
  world.big_bang();
}
function draw() {
  world.run();
}

class World {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.beings = [];

    this.time = 0;

    //helpers for calculations:
    this.prev_hour = -1;
  }
  big_bang() {
    // for (let i = 0; i<200; i++){
    //   let x = width / 2;
    //   let y = height / 2;
    //   this.beings.push(Being.birth(x, y));
    // }
    let x = width / 2;
    let y = height / 2;
    this.beings.push(Being.birth(x, y));
  }
  run() {
    background(0);
    this.time = keep_time();

    let hour = this.time[1];

    if (this.prev_hour != hour) {
      let n = Math.floor(random(0,2)); 

      for (let i = 0; i<n; ++i){
        this.beings.push(Being.birth(random(width), random(height)));
      }
    }

    this.prev_hour = hour;

    noStroke();
    fill(255, 0, 0);

    text("hour: " + this.time[1], 50, 50);

    //go backwards to not break the loop.
    for (let i = this.beings.length - 1; i >= 0; i--) {
      let being = this.beings[i];

      being.live(this.time);

      if (!being.alive) {
        this.beings.splice(i, 1);
      }
    }
  }
}

class Being {
  constructor(x, y) {
    //beings have positions in space.
    this.pos = createVector(x, y);
    this.vel = createVector(3, 0);

    //they have houses, and other destinations that they frequent.
    this.home = this.pos.copy();
    this.other_destinations = [];
    this.other_destinations.push({ x: this.home.x, y: this.home.y }); //the first position in other destinations is always home.

    //they live by a schedule.
    this.schedule = this.make_schedule();

    //they have a current-age.
    this.curr_age = 0;

    //they have a dying rate.
    this.dying_rate = 0;

    //they have a mass.
    this.mass = 1;

    //they have the probability to die.
    this.prob_to_die = 0;

    //they move at different speeds.
    this.speed = random(0, 2);

    this.alive = true;

    //helper variables to do calculations.
    this.current_hour = -1; //remember last hour to prevent jittering.
    this.new_pos = createVector(x, y);

    //helper allocations:
    this.other_destinations.push({ x: random(0, width), y: random(0, height) });
  }

  //constructor helper to make a schedule:
  make_schedule() {
    let f = 24;
    let segments = Math.floor(random(3, 9));
    let cuts = [0];

    for (let i = 0; i < segments - 1; i++) {
      let cut;
      do {
        cut = Math.floor(random(1, f));
      } while (cuts.includes(cut));
      cuts.push(cut);
    }
    cuts.push(f);

    // Sort cut points
    cuts.sort((a, b) => a - b);

    // Build segments as [start, end] pairs
    let schedule = [];
    for (let i = 0; i < cuts.length - 1; i++) {
      schedule.push([cuts[i], cuts[i + 1]]);
    }

    return schedule;
  }

  static birth(x, y) {
    return new Being(x, y);
  }

  live(t) {
    this.show();
    this.move(t);
    this.age();
    this.die();
  }

  show() {
    noFill();
    let c = map(this.curr_age, 0, 80, 255, 50);
    stroke(c);
    circle(this.pos.x, this.pos.y, this.mass);
  }

  move(t) {
    this.constrain();

    //t[0] comes as a 24 second loop.
    let hour = t[1];

    //only pick a new destination when the hour changes
    if (hour !== this.current_hour) {
      this.current_hour = hour;

      for (let i = 0; i < this.schedule.length; i++) {
        if (i !== hour) continue; //if we're not checking against the current time, we don't care.

        //if i is the current time:
        if (i % 2 == 0) {
          //starting number of a pair.
          let n = Math.floor(random(this.other_destinations.length));
          this.new_pos.set(this.other_destinations[n].x, this.other_destinations[n].y);
        } else {
          //ending number of a pair.
        }

        if (i === this.schedule.length - 1) {
          this.add_posis();
        }
      }
    }

    //move toward the chosen destination every frame
    let d = p5.Vector.sub(this.new_pos, this.pos);

    if (d.mag() > this.speed) {
      d.setMag(this.speed);
      this.pos.add(d);
    } else {
      this.pos = this.new_pos.copy();
    }
  }

  add_posis() {
    this.other_destinations.push({ x: random(0, width), y: random(0, height) });
  }

  constrain() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  age() {
    this.curr_age += this.dying_rate;

    this.dying_rate += abs(noise(frameCount) * 0.00005); //dying rate keeps changing between 0,1.

    this.mass+=this.curr_age; 

    // console.log(this.curr_age);
  }
  die() {
    //as beings get older, their probability to die increases. 
    this.prob_to_die = this.curr_age * 0.00005;

    //probability can never exceed 1. 
    this.prob_to_die = constrain(this.prob_to_die, 0, 1);

    let n = random();

    if (n < this.prob_to_die) {
      this.alive = false;
    }
  }
}

//helper to keep time.
function keep_time() {
  const ms = millis() - day;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  //one minute loop.
  if (seconds >= day_length) {
    day = millis();
    time[0] = 0;
    time[1] = 0;
    time[2] = 0;
    time[3] = 0;
  } else {
    time[0] = Math.floor(ms);
    time[1] = seconds;
    time[2] = minutes;
    time[3] = hours;
  }

  return time;
}
```

unintended output: 

![[Screen Recording 2026-03-11 at 00.15.43.mp4]]