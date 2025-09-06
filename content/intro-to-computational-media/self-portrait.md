---
date: 2025-09-05
tags:
  - experiments
noteOrder: "31"
draft: "false"
---
[[people/mimi yin|mimi yin]]'s brief in [[intro-to-computational-media/icm-class-1|icm-class-1]] was: 

> Create a <mark>"self" portrait</mark> using <mark>2D primitive shapes</mark>. Play with <mark>symmetry</mark> in your portrait. Shapes include – arc(), curve(), ellipse(), line(), point(), quad(), rect(), triangle() – and basic color functions – background(), colorMode(), fill(), noFill(), noStroke(), stroke(). Remember to use createCanvas() to specify the dimensions of your window and <mark>wrap all of your code inside a setup() function</mark>. Here's an example: [Zoog](https://editor.p5js.org/mimiyin/sketches/SiMFwzSGS)

i wanted to play. 

--- 
the world is made up of many (points). 

![[z_images/Screenshot 2025-09-06 at 18.19.03.png]]

``` js

//the size of the world:
let world_width = 800;
let world_height = 800;

//the world is made up of many people:
let people = [];

//they're all of the same size:
const size = 6;

function setup() {
  //the world is born:
  createCanvas(world_width, world_height);

  //people are born in the world:
  const space = size +1; // people give each other some space.
  for (let x = 0 + size; x <= world_width - size; x += space) {
    for (let y = 0 + 4; y <= world_height - 4; y += space) {
      people.push(new People(x, y));
    }
  }
}

function draw() {
  //each person:
  for (person of people) {
    //exists:
    person.exist();
  }
}
```

they move — often to take someone's place, or be in someone else's space. 

![[z_images/vid 1.mov]]

``` js
function draw() {
  background(cols[0]);

  //each person:
  for (person of people) {
    //exists:
    person.exist();
    //moves:
    person.move();
  }

  //people move to take someone's place, or be in someone's space.
  let moving_person = people[int(random(0, people.length))];
  let static_person = people[int(random(0, people.length))]; //sometimes, the moving and the stationary person are the same. this means you're happy where you are. that's humanely (and probabilistically) rare.

  moving_person.destination_x = static_person.x;
  moving_person.destination_y = static_person.y;
}

class People {
  constructor(x, y, col = [0, 0, 0, 255]) {
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

they're always moving, especially in new-york. it's chaotic. 

![[z_images/moving.mov]]

``` js
function draw() {
  // background(cols[0]);
}
```

somewhere between all this, is me. perhaps i am lost, in the movement of the crowd; or there are people who carry little parts of me in the world.

![[z_images/Screen Recording 2025-09-06 at 18.31.46.mov]]

either way — the parts of my 'self' are lost, inconsequential, and small; and i wait to be whole again. 

![[z_images/Screenshot 2025-09-06 at 18.16.52.png]]
<figcaption>ran for about a minute.</figcaption>

![[z_images/Screenshot 2025-09-06 at 18.35.01.png]]
<figcaption>ran for longer, while i packed up my bags from the dibner-library.</figcaption>

![[z_images/Screenshot 2025-09-06 at 18.36.16.png]]
<figcaption>more of what i was looking for. perhaps i'll do a black & white variant before class.</figcaption>

---
# new technical things: 
explored `img.get` vs `img.pixels` this time. `img.pixels` is faster, and used if the number of pixels are high. so, i'll use that. 

`img.pixels` is a one-dimensional array (to make it faster). this means that it's a giant array of rgba values of each pixel; i.e: 

``` js
// for the first pixel, where x=0, y=0: 
img.pixels[0]; //red value. 
img.pixels[1]; //green value. 
img.pixels[2]; //blue value. 
img.pixels[3]; //alpha value. 

img.pixels[4] //this would be the red value for the next pixel (1,0).
```

`img.loadPixels` must be called once, and then the colours can be assigned (in my use-case). i wrote a couple of helper functions to load colors, and then convert colors for an x, y coordinate.

![[z_images/Screenshot 2025-09-06 at 17.41.50.png]]


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


![[z_images/Screen Recording 2025-09-06 at 17.53.01.mov]]


![[z_images/Screenshot 2025-09-06 at 17.53.45.png]]

![[z_images/Screenshot 2025-09-06 at 17.54.52.png]]

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

let photograph; //to use picture later.

//to preload the image, through which people get colour:
function preload() {
  photograph = loadImage("/assets/passport-photograph.jpg");
}

function setup() {
  //the world is born:
  createCanvas(world_width, world_height);

  //get colours from the photograph once:
  get_colours_from_img(photograph);

  //people are born in the world:
  const space = size * 2; // people give each other some space.
  for (let x = 0 + size; x <= world_width - size; x += space) {
    for (let y = 0 + 4; y <= world_height - 4; y += space) {

      //i also want to push the colours of my image here. so:
      let col = convert_coordinates_to_colour(x,y,photograph)

      people.push(new People(x, y, col));
    }
  }
}

//helper function to get colours from an image in 'pixels' array.
function get_colours_from_img(img) {
  img.resize(0, width); //fit the width of the screen.
  image(img, 0, 0); //draw from the top-left.

  img.loadPixels();
}

//helper function to convert coordinates to colours, as passed down in setup.
function convert_coordinates_to_colour(x, y, img) {
  let index = (y * img.width + x) * 4;

  let r = img.pixels[index];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  let a = img.pixels[index + 3];

  return [r, g, b, a];
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
  constructor(x, y, col = [0, 0, 0, 0]) {
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