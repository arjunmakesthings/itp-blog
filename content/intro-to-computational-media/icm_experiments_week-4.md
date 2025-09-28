---
date: 2025-09-27
tags:
  - lectures
noteOrder: "92"
draft: "false"
---
# output: 
i (joyfully) watched [[people/gabriel|gabriel]] get annoyed with bezier-curves. they've always seemed really pretty to me. 

i made a sketch that picks two random points on a grid, and draws a bezier curve between them (with a randomly allocated control point). in the process, i understood the math behind bezier curves too.

![[z_images/Screen Recording 2025-09-27 at 22.36.09.mov]]

code: 

``` js
//for the beauty of bezier curves; for gabriel; 27th september 2025.

/* ask: 
Our ability to see patterns is what makes us human. However we also see patterns where none exist because our brains are biased towards detecting certain kinds of patterns over others (e.g. faces). Create a pattern by making something with a lot of repetition.

...

Try creating an algorithmic design with simple parameters. 
*/

/*
i spent time talking to gabriel about bezier curves. he found them irritating, and i've always found them to be beautiful. 

i read up more about the math behind bezier curves. watched this: https://www.youtube.com/watch?v=pnYccz1Ha34

quadratic bezier curves are found via this formula: 
//     // Quadratic Bézier curve formula
//     let x = pow(1 - t, 2) * x0 + 2 * (1 - t) * t * x1 + pow(t, 2) * x2;
//     let y = pow(1 - t, 2) * y0 + 2 * (1 - t) * t * y1 + pow(t, 2) * y2;

where 0 is the start, 1 is the control and 2 is the end. 

*/

let x_posis = [],
  y_posis = [];
let gap = 5; //gap between grid-points.

let origin; //global variable to keep track of the origin point for starting a bezier curve.
let start, end; //global variable to keep track of start-point and end-point of the curve.
let x1, y1, x2, y2, x3, y3; //variables that keep track of the line we're making.

let t = 0; //we use this as a stepper of sorts in the bezier equation.

function setup() {
  createCanvas(800, 800);
  // background(0);
  noStroke();
  noFill();

  //convert canvas into a grid of x & y coordinates.
  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      x_posis.push(x);
      y_posis.push(y);
    }
  }

  background(0); //set the background to be black. we don't want to draw it over & over again.

  //when the sketch starts, pick one point to be the origin of the bezier curve.
  origin = int(random(0, x_posis.length));

  //then, find a new curve to draw:
  choose_curve();
}

function draw() {
  // background(0);

  /*
  the sketch is supposed to draw continuously by: 
  - find a random destination & control point from the pre-defined grid. 
  - draw a series of points forming bezier curves between them. 
  - when arrived, change origin to whatever the point is. 
  - repeat. 
  */

  // strokeWeight(1);
  stroke(255, 10);

  //this is actually a pretty cool discovery. instead of me drawing one path a time, if i draw 10 paths, then the motion is more fluid. 
  for (let i = 0; i < 10; i++) {
    if (t <= 1) {
      //this means that we're still drawing the curve.
      let x = pow(1 - t, 2) * x1 + 2 * (1 - t) * t * x2 + pow(t, 2) * x3;
      let y = pow(1 - t, 2) * y1 + 2 * (1 - t) * t * y2 + pow(t, 2) * y3;

      let d = dist(x, y, x3, y3);
      let st_weight = map(d, 0, width, 40, 0.5);

      let speed = 1 / 420; //speed = distance / time (where time is 60 frames for us).

      strokeWeight(st_weight);

      point(x, y);

      // //speed is distance / time.
      // let d = dist(x1, y1, x3, y3);
      // let speed = map(d, 0, width, 0.002, 0.02); // map distance to a usable t-step range

      t += speed; //increase the stepper.
    } else {
      //this means that t is greater than 1.
      origin = end; //the origin for the next curve is the end of the curve we were drawing.

      choose_curve(); //make new curve.
    }
  }
}

function choose_curve() {
  t = 0;

  start = origin;
  end = int(random(0, x_posis.length));
  control = int(random(0, x_posis.length));

  //draw the curve between these points:
  x1 = x_posis[start];
  y1 = y_posis[start];
  x2 = x_posis[control];
  y2 = y_posis[control];
  x3 = x_posis[end];
  y3 = y_posis[end];
}

/* 
  //every 5 seconds, do this:
  if (frameCount % 60 == 0) {
    let start = origin;
    let end = int(random(0, x_posis.length));
    let control = int(random(0, x_posis.length));

    //draw the curve between these points:
    let x1 = x_posis[start];
    let y1 = y_posis[start];
    let x2 = x_posis[control];
    let y2 = y_posis[control];
    let x3 = x_posis[end];
    let y3 = y_posis[end];

    for (let t = 0; t < 1; t += 0.01) {
      let x = pow(1 - t, 2) * x1 + 2 * (1 - t) * t * x2 + pow(t, 2) * x3;
      let y = pow(1 - t, 2) * y1 + 2 * (1 - t) * t * y2 + pow(t, 2) * y3;
      fill(255);
      circle(x, y, 10);
    }

    //make a new origin:
    origin = end;
  }
*/

```

i'd also spent some time explaining speed to [[people/aram|aram]] this week, and used that understanding to explore a little bit of speed too (i tried making it dynamic (according to the distance), but left it constant towards the end). 

---
# process + thinking: 
initially, i wanted to make an explainer for a for() loop, inspired by ben fry's [deprocess](https://www.benfry.com/deprocess/). i worked on it a little bit too, but it felt like i would use some of the same things i have in the past, and not learn anything new. 

``` js
//name; date.

/* ask: 
Our ability to see patterns is what makes us human. However we also see patterns where none exist because our brains are biased towards detecting certain kinds of patterns over others (e.g. faces). Create a pattern by making something with a lot of repetition.

...

Try creating an algorithmic design with simple parameters. 
*/

/*thought:
i spent a lot of time in the last week explaining for loops to many people who encountered it in the arduino labs. it wasn't introduced as a programming concept before they encountered it, and, hence, they struggled. 

i remember referring a lot of them to 'deprocess', by ben fry: https://www.benfry.com/deprocess/ — to see how pretty repetitions are. i wanted to do something similar — something that explains what a for loop is, live. 
*/

/*
i'm goingt to build a simple particle system that shows a pseudo (or real) for loop, and people can see each iteration of it happen live. 
*/

let line_num = 0; //we're going to have to keep track of the line being run.

//i don't want to change the frameRate for the program, to ensure that a smooth animation plays out.

let margin = 50;
let row_height = 50;
let padding = 10;

let usable_width, usable_height;

let grey_col = 230;

let display_text = `for (let i = 0; i<10; i++){
make_new_ball_with_number[i];
}`;

let font_size = 16;

let y_posis = []; //array for y positions of everything (since everything is in the same line);

let display_text_lines = 3;

function setup() {
  createCanvas(800, 800);

  usable_width = width - margin;
  usable_height = height - margin;

  //reset defaults.
  noStroke();
  noFill();

  //set the y positions for everything.
  for (let y = margin * 3; y <= usable_height; y += usable_height / display_text_lines) {
    y_posis.push(y);
  }
}

function draw() {
  background(255);

  interface();
}

function interface() {
  //the interface has rows.
  let line_num_show = 0;

  //use y_posis to draw lines and write line numbers.
  for (let y = 0; y <= y_posis.length; y++) {
    noStroke();
    noFill();

    rect(margin, y_posis[y], usable_width, row_height);
    fill(grey_col);
    line_num_show++;
    text(line_num_show, margin, y_posis[y]);

    strokeWeight(1);
    stroke(grey_col);
    line(margin, y_posis[y] + padding, usable_width, y_posis[y] + padding);
  }

  //text:
  noStroke();
  fill(0);
  text(`for (let i = 0; i<10; i++) {`, margin + font_size, y_posis[0]);
  text(`make_new_ball_with_number[i];`, margin + font_size, y_posis[1]);
  text(` };`, margin + font_size, y_posis[2]);

  //blinker:
  
}

function balls(reps, line_number){


}

class Ball {
  constructor(x,y){
    this.x = x; 
    this.y = y; 
  }
  display(){

  }
  move(){
    
  }
}

```

also, this week. [[people/aditya|aditya]] said that i always use objects (which he qualified as 'cheating'). so, i wanted to make a sketch that didn't use any objects. 

---
i thought about the things that happened during the week, and remembered that it was joyful for me to see [[people/gabriel|gabriel]] work with bezier curves. he thought they're annoying, but i've always thought that they're pretty. 

so, i wanted to take some time to understand the math behind bezier curves (and make a sketch around it). i think this approach worked well with me, and fits [[my approach to itp]] — learn a new thing that you want to, if you already know the thing that is meant to be explored that week. 

so, i looked at the math behind bezier curves; via this: https://www.youtube.com/watch?v=pnYccz1Ha34; and then began to program. 

---

made a program that finds two points at random on a grid, and draws a set of linearly interpolated points between them. 

![[z_images/Screen Recording 2025-09-27 at 21.17.44.mov]]

``` js
//for the beauty of bezier curves; for gabriel; 27th september 2025.

/* ask: 
Our ability to see patterns is what makes us human. However we also see patterns where none exist because our brains are biased towards detecting certain kinds of patterns over others (e.g. faces). Create a pattern by making something with a lot of repetition.

...

Try creating an algorithmic design with simple parameters. 
*/

/*
i spent time talking to gabriel about bezier curves. he found them irritating, and i've always found them to be beautiful. 
*/

let x_posis = [],
  y_posis = [];
let gap = 10; //gap between lines.

function setup() {
  createCanvas(800, 800);
  background(0);
  noStroke();
  noFill();

  //convert canvas into a grid of x & y coordinates.
  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      x_posis.push(x);
      y_posis.push(y);
    }
  }
}

function draw() {
  background(0);

  // let time = int(millis() / 1000); //get seconds.

  //display points:
  strokeWeight(2);
  stroke(255);
  for (let i = 0; i < x_posis.length; i++) {
    point(x_posis[i], y_posis[i]);
  }

  //pick points at random, and draw beziers between them.
  if (frameCount % 60 == 0) {
    let start = int(random(0, x_posis.length));
    let end = int(random(0, x_posis.length));

    let x1 = x_posis[start]; 
    let y1 = y_posis[start]; 
    let x2 = x_posis[end];
    let y2 = y_posis[end]; 

    for (let t = 0; t < 1; t += 0.01) {
      let x = (1 - t) * x1 + t * x2;
      let y = (1 - t) * y1 + t * y2;
      fill (255); 
      circle (x,y, 10); 
    }
  }
}
```

then, made a program that draws curves with a randomly chosen control point.

![[z_images/Screen Recording 2025-09-27 at 21.43.57.mov]]

``` js
//for the beauty of bezier curves; for gabriel; 27th september 2025.

/* ask: 
Our ability to see patterns is what makes us human. However we also see patterns where none exist because our brains are biased towards detecting certain kinds of patterns over others (e.g. faces). Create a pattern by making something with a lot of repetition.

...

Try creating an algorithmic design with simple parameters. 
*/

/*
i spent time talking to gabriel about bezier curves. he found them irritating, and i've always found them to be beautiful. 

i read up more about the math behind bezier curves. watched this: https://www.youtube.com/watch?v=pnYccz1Ha34

quadratic bezier curves are found via this formula: 
//     // Quadratic Bézier curve formula
//     let x = pow(1 - t, 2) * x0 + 2 * (1 - t) * t * x1 + pow(t, 2) * x2;
//     let y = pow(1 - t, 2) * y0 + 2 * (1 - t) * t * y1 + pow(t, 2) * y2;

where 0 is the start, 1 is the control and 2 is the end. 

*/

let x_posis = [],
  y_posis = [];
let gap = 5; //gap between grid-points.

let origin = 0;

function setup() {
  createCanvas(800, 800);
  // background(0);
  noStroke();
  noFill();

  //convert canvas into a grid of x & y coordinates.
  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      x_posis.push(x);
      y_posis.push(y);
    }
  }

  //when the sketch starts, pick one point to be the origin of the bezier curve.
  origin = int(random(0, x_posis.length));

  background(0);
}

function draw() {
  // background(0);

  /*
  the sketch is supposed to draw continuously by: 
  - find a random destination & control point from the pre-defined grid. 
  - draw a series of points forming bezier curves between them. 
  - when arrived, change origin to whatever the point is. 
  - repeat. 
  */

  strokeWeight(2);
  stroke(255);

  //every 5 seconds, do this:
  if (frameCount % 60 == 0) {
    let start = origin;
    let end = int(random(0, x_posis.length));
    let control = int(random(0, x_posis.length));

    //draw the curve between these points:
    let x1 = x_posis[start];
    let y1 = y_posis[start];
    let x2 = x_posis[control];
    let y2 = y_posis[control];
    let x3 = x_posis[end];
    let y3 = y_posis[end];

    for (let t = 0; t < 1; t += 0.01) {
      let x = pow(1 - t, 2) * x1 + 2 * (1 - t) * t * x2 + pow(t, 2) * x3;
      let y = pow(1 - t, 2) * y1 + 2 * (1 - t) * t * y2 + pow(t, 2) * y3;
      fill(255);
      circle(x, y, 10);
    }

    //make a new origin:
    origin = end;
  }
}

```

while programming, i made a cool discovery. <mark>instead of drawing one shape per run (60 times a second), if i draw 10 shapes (in the same position), the motion feels more fluid</mark> (and faster for some reason, i don't get this yet). 

![[z_images/Screen Recording 2025-09-27 at 22.30.32.mov]]

``` js
//for the beauty of bezier curves; for gabriel; 27th september 2025.

/* ask: 
Our ability to see patterns is what makes us human. However we also see patterns where none exist because our brains are biased towards detecting certain kinds of patterns over others (e.g. faces). Create a pattern by making something with a lot of repetition.

...

Try creating an algorithmic design with simple parameters. 
*/

/*
i spent time talking to gabriel about bezier curves. he found them irritating, and i've always found them to be beautiful. 

i read up more about the math behind bezier curves. watched this: https://www.youtube.com/watch?v=pnYccz1Ha34

quadratic bezier curves are found via this formula: 
//     // Quadratic Bézier curve formula
//     let x = pow(1 - t, 2) * x0 + 2 * (1 - t) * t * x1 + pow(t, 2) * x2;
//     let y = pow(1 - t, 2) * y0 + 2 * (1 - t) * t * y1 + pow(t, 2) * y2;

where 0 is the start, 1 is the control and 2 is the end. 

*/

let x_posis = [],
  y_posis = [];
let gap = 5; //gap between grid-points.

let origin; //global variable to keep track of the origin point for starting a bezier curve.
let start, end; //global variable to keep track of start-point and end-point of the curve.
let x1, y1, x2, y2, x3, y3; //variables that keep track of the line we're making.

let t = 0; //we use this as a stepper of sorts in the bezier equation.

function setup() {
  createCanvas(800, 800);
  // background(0);
  noStroke();
  noFill();

  //convert canvas into a grid of x & y coordinates.
  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      x_posis.push(x);
      y_posis.push(y);
    }
  }

  background(0); //set the background to be black. we don't want to draw it over & over again.

  //when the sketch starts, pick one point to be the origin of the bezier curve.
  origin = int(random(0, x_posis.length));

  //then, find a new curve to draw:
  choose_curve();
}

function draw() {
  // background(0);

  /*
  the sketch is supposed to draw continuously by: 
  - find a random destination & control point from the pre-defined grid. 
  - draw a series of points forming bezier curves between them. 
  - when arrived, change origin to whatever the point is. 
  - repeat. 
  */

  // strokeWeight(1);
  stroke(255, 10);

  //this is actually a pretty cool discovery. instead of me drawing one path a time, if i draw 10 paths, then the motion is more fluid. 
  for (let i = 0; i < 10; i++) {
    if (t <= 1) {
      //this means that we're still drawing the curve.
      let x = pow(1 - t, 2) * x1 + 2 * (1 - t) * t * x2 + pow(t, 2) * x3;
      let y = pow(1 - t, 2) * y1 + 2 * (1 - t) * t * y2 + pow(t, 2) * y3;

      let d = dist(x, y, x3, y3);
      let st_weight = map(d, 0, width, 50, 0.5);

      let speed = 1 / 120; //speed = distance / time (where time is 60 frames for us).

      strokeWeight(st_weight);

      point(x, y);

      // //speed is distance / time.
      // let d = dist(x1, y1, x3, y3);
      // let speed = map(d, 0, width, 0.002, 0.02); // map distance to a usable t-step range

      t += speed; //increase the stepper.
    } else {
      //this means that t is greater than 1.
      origin = end; //the origin for the next curve is the end of the curve we were drawing.

      choose_curve(); //make new curve.
    }
  }
}

function choose_curve() {
  t = 0;

  start = origin;
  end = int(random(0, x_posis.length));
  control = int(random(0, x_posis.length));

  //draw the curve between these points:
  x1 = x_posis[start];
  y1 = y_posis[start];
  x2 = x_posis[control];
  y2 = y_posis[control];
  x3 = x_posis[end];
  y3 = y_posis[end];
}

/* 
  //every 5 seconds, do this:
  if (frameCount % 60 == 0) {
    let start = origin;
    let end = int(random(0, x_posis.length));
    let control = int(random(0, x_posis.length));

    //draw the curve between these points:
    let x1 = x_posis[start];
    let y1 = y_posis[start];
    let x2 = x_posis[control];
    let y2 = y_posis[control];
    let x3 = x_posis[end];
    let y3 = y_posis[end];

    for (let t = 0; t < 1; t += 0.01) {
      let x = pow(1 - t, 2) * x1 + 2 * (1 - t) * t * x2 + pow(t, 2) * x3;
      let y = pow(1 - t, 2) * y1 + 2 * (1 - t) * t * y2 + pow(t, 2) * y3;
      fill(255);
      circle(x, y, 10);
    }

    //make a new origin:
    origin = end;
  }
*/

```

---
i've been feeling very anxious (see [[anxiety]]), not getting enough sleep, and unable to focus. this week's experiment allowed me to rekindle with my relationship to programming — i sat in a quiet room, had a vague idea to execute; studied, made, failed, discovered; lost track of time; and made something that gives me joy. 

i <mark>need to do my icm-assignments alone</mark>, and in the night. the loudness & chaos of the floor is not something that i can handle. i work best in quiet environments — this week's experiments are testament. 

