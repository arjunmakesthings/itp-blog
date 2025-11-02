---
date: 2025-11-02
tags:
  - experiments
noteOrder: "165"
draft: "false"
---
[[people/cody|cody]] approached me with an idea for making a poster for the winter-show. we both shared mutual dislike for the [last few iterations](https://designlab.itp.io/Winter-Show-poster) of the winter-show poster. 

so, we teamed up and attempted to make a 'time-aquarium' to show the movement of itp-eers across time & space. 

![[image-2.png|593x224]]
<figcaption>time aquarium reference.</figcaption>

---

[[people/cody|cody]], [[people/matt|matt]] & i then sat down to program a time aquarium. 

![[z_images/cody and matt 251102.webp|520x292]]

i ended up writing the program that (sort-of) achieved this. 

![[frame.jpeg|521x782]]

code: 

``` js
//poster design with matt & cody, 251029.

//poster has to be in 20x30" (2:3).
//canvas:
let ch = 1000;
let cw = (ch * 2) / 3;

let bg_col = 0;

let margin = 100;
let sub_margin = margin / 3;

let people = [];

let x, y, z, box_x, box_y, box_z; //declare everything globally.

let world_map;
let ny_map;

let st_cols = [
  "#6929C4", // Purple 70
  "#1192E8", // Cyan 50
  "#005D5D", // Teal 70
  "#9F1853", // Magenta 70
  "#FA4D56", // Red 50
  "#570408", // Red 90
  "#198038", // Green 60
  "#002D9C", // Blue 80
  "#EE538B", // Magenta 50
  "#B28600", // Yellow 50
  "#009D9A", // Teal 50
  "#012749", // Cyan 90
  "#8A3800", // Orange 70
];

// Additional variables
let reps = 98*12; // Number of iterations for the flip motion
let dwell = 16; // Small vertical movement for the "dwell"
let rand_control = 3; // Random offset to give some natural variation

function preload() {
  world_map = loadImage("frame.jpeg");
  ny_map = loadImage("ny_transp.png");
}

function setup() {
  createCanvas(cw, ch, WEBGL);
  background(bg_col);
}

function draw() {
  // background(bg_col);

  push();
  //cube:
  cb_w = width / 3;
  box_x = -width / 2 + margin + cb_w / 2;
  box_y = 0;
  box_z = 0;

  box_w = width / 3;
  box_h = height - margin * 2;
  box_d = 100;

  make_cuboid(box_x, box_y, box_z, box_w, box_h, box_d);

  //make random points at base:
  for (let i = 0; i < 400; i++) {
    let px = random(-box_w / 2, box_w / 2);
    let py = box_h / 2;
    let pz = random(random(-box_d / 2, box_d / 2));
    people.push(new Person(px, py, pz));
  }

  for (let person of people) {
    person.display();
  }

  pop();

  noLoop(); // static composition
}

function make_cuboid(x, y, z, w, h, d) {
  translate(x, y, z);
  rotateY(42);

  noFill();
  stroke(255);
  strokeWeight(0.2);

  // Draw the box edges (wireframe)
  push();
  noFill();
  // box(w, h, d);
  pop();

  // Draw the bottom face with a map of New York City texture
  push();
  translate(0, h / 2, 0); // Move to bottom face position
  rotateX(-HALF_PI); // Rotate to make it horizontal and face the viewer
  scale(-1, 1); // Flip horizontally
  texture(world_map);
  noStroke();
  plane(w, d); // Draw textured plane
  pop();

  // Draw the bottom face with a map of New York City texture
  push();
  translate(0, h / 2.4, 0); // Move to bottom face position
  rotateX(-HALF_PI); // Rotate to make it horizontal and face the viewer
  scale(-1, 1); // Flip horizontally
  texture(ny_map);
  noStroke();
  plane(w, d); // Draw textured plane
  pop();
}

let st_weight = 0.6;
let st_alp = 100;

const itp_point = {
  x: box_x + 50,
  z: box_z + 50,
};

class Person {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.home_x = x;
    this.home_y = y;
    this.home_z = z;

    // About 2 inches = ~67 px for 1000px height canvas
    this.ny_y = y - 67;

    this.col = color(random(st_cols)); // Random color from the palette
  }

  display() {
    const inc = box_h / (reps * (reps * dwell));
    let flip = false;

    stroke(this.col, st_alp); // Set the stroke color only once
    this.col.setAlpha(st_alp); 
    strokeWeight(st_weight);

    line(this.x, this.home_y, this.z, itp_point.x, this.ny_y, itp_point.z);

    // starting Y for the flip motion
    let current_y = this.ny_y;

    for (let i = 0; i < reps; i++) {
      let new_y = current_y - inc;
      if (new_y <= -box_h / 2) break; // stop at top of cuboid

      if (flip) {
        // go toward itp_point
        line(this.x, current_y, this.z, itp_point.x, new_y, itp_point.z);
        // short dwell line upward
        line(itp_point.x, new_y, itp_point.z, itp_point.x, new_y - dwell, itp_point.z);
      } else {
        // go back to own column
        line(itp_point.x, current_y, itp_point.z, this.x, new_y, this.z);
        line(this.x, new_y, this.z, this.x, new_y - dwell, this.z);
      }

      current_y = new_y - dwell + random(-rand_control, rand_control);
      flip = !flip;
    }
  }
}

function make_text() {
  fill(255);
  text("ITP | IMA | LowRes", width / 3 + sub_margin, sub_margin);
}

function mousePressed(){
  save ("frame.jpeg"); 
}
```

[[people/cody|cody]] embraced llm-s, i resented them. 

---
i also did the graphic-design for this, and we submitted it. 

![[z_images/itp_winter_show_poster_2025.webp]]

