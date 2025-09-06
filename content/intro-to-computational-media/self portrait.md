---
date: 2025-09-05
tags:
  - experiments
noteOrder: "31"
draft: "true"
---
[[people/mimi yin|mimi yin]]'s brief in [[intro-to-computational-media/icm-class-1|icm-class-1]] was: 

> Create a <mark>"self" portrait</mark> using <mark>2D primitive shapes</mark>. Play with <mark>symmetry</mark> in your portrait. Shapes include – arc(), curve(), ellipse(), line(), point(), quad(), rect(), triangle() – and basic color functions – background(), colorMode(), fill(), noFill(), noStroke(), stroke(). Remember to use createCanvas() to specify the dimensions of your window and <mark>wrap all of your code inside a setup() function</mark>. Here's an example: [Zoog](https://editor.p5js.org/mimiyin/sketches/SiMFwzSGS)

i wanted to play. 

--- 
the world is made up of many points. 


---
# cool outputs during the process: 

![[z_images/vid.mov]]

![[z_images/Screenshot 2025-09-05 at 17.02.19.png]]

![[z_images/Screenshot 2025-09-05 at 17.02.31.png]]

![[z_images/Screenshot 2025-09-05 at 17.02.16.png]]

code: 

``` js
//self-portrait; september 05, 2025.

//use colours from my website:
let cols = [
  [253, 253, 253], //bg
  [60, 60, 60], //primary
  [120, 120, 120], //secondary
  [240, 240, 240], //tertiary
];

//the size of the world:
let world_width = 800;
let world_height = 800;

//the world is made up of many people:
let people = [];

//they're all of the same size:
const size = 4;

function setup() {
  //the world is born:
  createCanvas(world_width, world_height);

  //people are born in the world:
  const space = size * 2; // people give each other some space.
  for (let x = 0 + size; x <= world_width - size; x += space) {
    for (let y = 0 + 4; y <= world_height - 4; y += space) {
      people.push(new People(x, y));
    }
  }
}

function draw() {
  // background(cols[0]);

  //each person:
  for (person of people) {
    //exists:
    person.exist();
    //moves:
    person.move();
  }

  //people move to take someone's place, or be in someone's place.
  let moving_person = people[int(random(0, people.length))];
  let static_person = people[int(random(0, people.length))]; //sometimes, the moving and the stationary person are the same. this means you're happy where you are. that's humanely (and probabilistically) rare.

  moving_person.destination_x = static_person.x;
  moving_person.destination_y = static_person.y;
}

class People {
  constructor(x, y, col = 0) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;

    //people have temporary destinations:
    // but when they're born, those destinations don't exist.
    (this.destination_x = x), (this.destination_y = y);
  }

  exist() {
    strokeWeight(size);
    stroke(this.col);
    point(this.x, this.y);
  }

  move() {
    this.x = lerp(this.x, this.destination_x, 0.01);
    this.y = lerp(this.y, this.destination_y, 0.01);
  }
}

```