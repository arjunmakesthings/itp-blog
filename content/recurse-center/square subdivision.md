---
date: 2026-06-08
tags:
  - experiments
noteOrder: "348"
draft: "false"
---
as part of math monday, [[patrick]], [[sam]] & i worked on penrose tilings. 

followed this: https://preshing.com/20110831/penrose-tiling-explained/; wrote this: 

``` js
//penrose:

let all_tris = [];

function setup() {
  createCanvas(1000, 1000);

  //draw first one:
  all_tris[0] = new Triangle(500, 50, 208, 950, 792, 950, 0);

  //subdivide:
  for (let i = 0; i < 5; i++) {
    all_tris = all_tris.map((t) => t.subdivide()).flat();
  }
}

function draw() {
  background(255);

  for (let tri of all_tris) {
    tri.display();
  }
}

class Triangle {
  constructor(x1, y1, x2, y2, x3, y3, col) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.col = col;
  }
  display() {
    if (this.col == 0) {
      fill(255, 0, 0);
    } else {
      fill(0, 0, 255);
    }
    noStroke();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);

    // this.subdivide();
  }
  subdivide() {
    //px = b / a+b * ax, and a / a + b * bx -> to find how far along you are on line ab.

    if (this.col == 0) {
      //red:

      let n = random();

      let [px, py] = [0, 0];

      if (n < 0.5) {
        [px, py] = find_p(this.x1, this.y1, this.x2, this.y2);

        return [
          new Triangle(this.x3, this.y3, px, py, this.x2, this.y2, 0),
          new Triangle(px, py, this.x1, this.y1, this.x3, this.y3, 1),
        ];
      } else {
        [px, py] = find_p(this.x1, this.y1, this.x3, this.y3);

        return [
          new Triangle(this.x2, this.y2, px, py, this.x3, this.y3, 0),
          new Triangle(px, py, this.x1, this.y1, this.x2, this.y2, 1),
        ];
      }
    } else {
      //blue:
      let n = random();

      if (n < 0.5) {
        let [qx, qy] = find_p(this.x2, this.y2, this.x1, this.y1);
        let [rx, ry] = find_p(this.x2, this.y2, this.x3, this.y3);

        return [
          new Triangle(qx, qy, this.x2, this.y2, rx, ry, 1),
          new Triangle(rx, ry, this.x1, this.y1, qx, qy, 0),
          new Triangle(rx, ry, this.x1, this.y1, this.x3, this.y3, 1),
        ];
      } else {
        let [qx, qy] = find_p(this.x3, this.y3, this.x1, this.y1);
        let [rx, ry] = find_p(this.x3, this.y3, this.x2, this.y2);

        return [
          new Triangle(qx, qy, this.x3, this.y3, rx, ry, 1),
          new Triangle(rx, ry, this.x1, this.y1, qx, qy, 0),
          new Triangle(rx, ry, this.x1, this.y1, this.x2, this.y2, 1),
        ];
      }
    }
  }
}

function find_p(ax, ay, bx, by) {
  let a_frac = (Math.sqrt(5) - 1) / 2;
  let b_frac = 1 - a_frac;
  let px = b_frac * ax + a_frac * bx;
  let py = b_frac * ay + a_frac * by;

  return [px, py];
}

```

[[patrick]] & [[sam]] were kind enough to let me program.

afterwards, i made a program that does this: 

![[frame-6.webp]]

``` js
//square subdivision.

//given a set of starting coordinates, draw yourself over & over again with shrinking widths & alternating colours; until you reach an end point.

let sw = false;

function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER, CENTER);
  background(255);
}

function draw() {
  draw_sq2(width / 2, height / 2, 700, 0);
  noLoop(); 
}

function draw_sq2(x, y, w, a, c_switch = true) {
  if (w < 1) return;

  let p1 = createVector(-w / 2, -w / 2);
  let p2 = createVector(w / 2, -w / 2);
  let p3 = createVector(w / 2, w / 2);
  let p4 = createVector(-w / 2, w / 2);

  let mult = 10;
  p1.add(random() * mult);
  p2.add(random() * mult);
  p3.add(random() * mult);
  p4.add(random() * mult);

  fill(c_switch ? 255 : 0);
  noStroke(); 

  push();
  translate(x, y);
  rotate(a);
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);
  endShape(CLOSE);
  pop();

  a += 0.015; 

  draw_sq2(x, y, w - 5, a, !c_switch);
}

function mousePressed(){
  save ("frame.webp"); 
}

```

same idea as the penrose tiling, recursively draw a square.

![[Screen Recording 2026-06-08 at 17.08.38.mp4]]

