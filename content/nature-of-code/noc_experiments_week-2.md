---
date: 2026-01-30
tags:
  - experiments
noteOrder: "222"
draft: "false"
---
# ask: 
Try using vectors! Here are some suggestions:

Find any sketch you previously created in p5.js with separate x,y variables for elements on the sketch. Can you rewrite the sketch with createVector() for each of these pairs? For example, rework your sketch from week 1 and use vectors! Try incorporating the concept of acceleration. Can you create a methodology for calculating a dynamic acceleration, one that changes over time based on any number of factors? What is a random "acceleration" walk?

Zannah Marsh, illustrator for the Nature of Code book, created a guide to creature design with code. Consider creating your own creature design in p5.js and incorporating it into the Walker or Mover class from any of the examples.

essentially to just ==explore vectors.==

---
# thought: 
love is a vector in space. 

borrowed from the [red thread of fate](https://en.wikipedia.org/wiki/Red_thread_of_fate), people are born connected to one another, but they move about randomly. however, fate (or the algorithm of the universe) brings them closer together. some of them reach in time & accept, thereby being with each other. some of them don't, and die alone. 

---
# outputs: 

![[demo_260203.mp4]]

code: 

``` js
//love is a vector in space; arjun; february, 2026.

/*
ask: 
Try using vectors ... 
*/

/*
thought: 
love is a vector in space. 

borrowed from the 'red thread of fate', people are born connected to one another, but they move about randomly. however, fate (or the algorithm of the universe) brings them closer together. some of them reach in time & accept, thereby being with each other. some of them don't, and die alone. 
*/

let people = [];

let population = Math.floor(8272166038 / 100000000); //taken the actual population, but divided it to make it behave.

//people things:
const skins = [
  "#FFD1A3", // Fair
  "#F4A460", // Light
  "#D2691E", // Medium
  "#A0522D", // Olive
  "#704214", // Deep
  "#3E2723", // Dark
  "#8B4513", // Brown
  "#CD853F", // Peru
  "#DEB887", // Burlywood
];

let size_range = [2, 10]; //of a person.

//ui stuff:
let margin = 50;

function setup() {
  createCanvas(800, 800); //square to handle calculations better.

  for (let i = 0; i < population; i++) {
    people.push(new Person(random(margin, width - margin), random(margin, height - margin)));
  }

  //god (or the algorithm) assigns a partner to each person at birth.
  assign_partner();

  //white screen:
  background(255);
}

/* helper written by a llm to assign a partner to each person. */
function assign_partner() {
  let shuffled = people.slice().sort(() => Math.random() - 0.5); //shuffles the array.

  // Pair them up sequentially
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    shuffled[i].partner = shuffled[i + 1];
    shuffled[i + 1].partner = shuffled[i];
  }

  // If odd number of people, last person gets no partner
  if (shuffled.length % 2 === 1) {
    shuffled[shuffled.length - 1].partner = null;
  }
}

function draw() {
  background(255, 5);
  for (person of people) {
    person.red_line();
    person.display();
    person.move();
    person.die();
  }

  death_handler();
}

/* made a l.l.m. write this helper: */
let unpairedDeaths = [];

function death_handler() {
  // add newly dead to the queue
  unpairedDeaths.push(...people.filter((p) => p.dead));

  // remove dead from main array
  people = people.filter((p) => !p.dead);

  // remove dead partners
  for (let p of people) {
    if (p.partner && p.partner.dead) {
      p.partner = null;
    }
  }

  // while we have at least 2 unpaired deaths, make new pairs
  while (unpairedDeaths.length >= 2) {
    unpairedDeaths.splice(0, 2); // consume 2 dead

    // create two new people
    let newPerson1 = new Person(random(margin, width - margin), random(margin, height - margin));
    let newPerson2 = new Person(random(margin, width - margin), random(margin, height - margin));

    // pair them
    newPerson1.partner = newPerson2;
    newPerson2.partner = newPerson1;

    // add to population
    people.push(newPerson1);
    people.push(newPerson2);
  }
}

class Person {
  constructor(x, y) {
    this.pos = createVector(x, y);

    this.size = Math.floor(random(size_range[0], size_range[1]));

    this.skin_color = color(random(skins));

    this.pace = Math.floor(random(1, 3)); //each person moves at a different speed.

    this.starting_pace = this.pace;

    this.fate = 0;
    this.distance = 0; //from partner.

    this.vitality = 255; //everyone starts out strong.
    this.skin_color.setAlpha(this.vitality);

    this.dead = false;

    this.dying_rate = random(0.0005, 0.5);
  }

  display() {
    stroke(this.skin_color);
    strokeWeight(this.size);
    point(this.pos);
  }

  red_line() {
    if (this.partner && people.indexOf(this) < people.indexOf(this.partner)) {
      //if a partner exists and this person comes first in the array (to avoid duplicates):
      stroke(150, 0, 0);
      strokeWeight(map(this.distance, 0, width, 0.001, 0.05));
      line(this.pos.x, this.pos.y, this.partner.pos.x, this.partner.pos.y);
    }
  }

  move() {
    let movement = createVector(random(this.pace * -1, this.pace), random(this.pace * -1, this.pace)); //every frame we are set to move.

    //however, if i am destined a partner, fate comes into play.
    if (this.partner) {
      let to_partner = p5.Vector.sub(this.partner.pos, this.pos); //find the distance between the partner & myself. creates an arrow essentially.

      this.distance = to_partner.mag(); //just gives you the length, irrespective of direction.

      to_partner.normalize(); //scale magnitude to 1.

      //stronger pull when far, lesser when close.
      let attraction = to_partner.mult(this.fate * 0.8);

      // optional: fate grows slower if very far apart
      this.fate = min(this.fate + 0.0003, 1);

      movement.add(attraction); //my original random, but added with a little bit of fate.

      if (this.distance < 1) {
        this.pace = 0.5; //when they meet, life slows down.
      }
    }

    this.pos.add(movement);
  }

  die() {
    //every frame, we are dying. if each frame is a day, and our average lifespan is 73 years, each person dies in about 26000 frames.
      this.vitality = max(this.vitality - this.dying_rate, 0);

    // pace slows as vitality fades
    // this.pace = map(this.vitality, 0, 255, 0.1, this.starting_pace);

    // update opacity to match vitality
    this.skin_color.setAlpha(this.vitality);

    if (this.vitality < 2) {
      this.dead = true;
    }
  }
}
```

---
tried to make the sketch in 3-d, but it got too complicated for me too soon. 

``` js
//untitled; arjun; month, 2026.

/*
ask: 
Try using vectors ... 
*/

/*
thought: 
love is a vector in space. 

borrowed from the 'red thread of fate', people are born connected to one another, but they move about randomly. however, fate (or the algorithm of the universe) brings them closer together. some of them reach in time & accept, thereby being with each other. some of them don't, and die alone. 
*/

let people = [];

let population = Math.floor(8272166038 / 100000000); //taken the actual population, but divided it to make it behave.

//people things:
const skins = [
  "#FFD1A3", // Fair
  "#F4A460", // Light
  "#D2691E", // Medium
  "#A0522D", // Olive
  "#704214", // Deep
  "#3E2723", // Dark
  "#8B4513", // Brown
  "#CD853F", // Peru
  "#DEB887", // Burlywood
];

let size_range = [2, 10];

//ui stuff:
let margin = 50;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800, WEBGL); //square to handle calculations better.

  for (let i = 0; i < population; i++) {
    people.push(new Person(random(margin, width - margin), random(margin, height - margin), random(margin, width - margin)));
  }

  //god assigns a partner to each person at birth.
  assign_partner();

  //white screen:
  background(255);
}

/* helper written by a llm to assign a partner to each person. */
function assign_partner() {
  let shuffled = people.slice().sort(() => Math.random() - 0.5); //shuffles the array.

  // Pair them up sequentially
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    shuffled[i].partner = shuffled[i + 1];
    shuffled[i + 1].partner = shuffled[i];
  }

  // If odd number of people, last person gets no partner
  if (shuffled.length % 2 === 1) {
    shuffled[shuffled.length - 1].partner = null;
  }
}

function draw() {
  background(255);

  orbitControl();

  push();
  translate(-width / 2, -height / 2);
  for (person of people) {
    person.red_line();
    person.display();

    if (frameCount % 60 == 0){
      //every one second: 
      person.move(); 
    }
  }
  pop();
}

class Person {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);

    this.dest_pos = createVector(x, y, z);

    this.size = Math.floor(random(size_range[0], size_range[1]));

    this.skin_color = random(skins);

    this.prob = 0; 
  }

  display() {
    stroke(this.skin_color);
    strokeWeight(this.size);
    point(this.pos);

    this.pos.x = lerp(this.pos.x, this.dest_pos.x, 0.1);
    this.pos.y = lerp(this.pos.y, this.dest_pos.y, 0.1);
    this.pos.z = lerp(this.pos.z, this.dest_pos.z, 0.1);
  }

  red_line() {
    if (this.partner && people.indexOf(this) < people.indexOf(this.partner)) {
      //if a partner exists and this person comes first:
      stroke(255, 0, 0);
      strokeWeight(0.05);
      line(this.pos.x, this.pos.y, this.pos.z, this.partner.pos.x, this.partner.pos.y, this.partner.pos.z);
    }
  }

  move(){
    let step = createVector(random(-2, 2), random(-2, 2), random(-2, 2));
    this.dest_pos.add(step);
  }
}
```

so, i resorted back to 2-d. 

---




