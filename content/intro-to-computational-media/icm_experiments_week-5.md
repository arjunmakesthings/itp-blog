---
date: 2025-10-03
tags:
  - experiments
noteOrder: "103"
draft: "false"
---
# ask: 
> Functions are the basic unit of labor in your code. ~~Take a sketch you’ve already done and re-organize the code into functional units of labor that you define~~. You can also conceive of an entirely new world of labor. What kinds of labor does it take to make your sketch run?

my [[conversation with mimi]] stayed with me. i decided to spend time exploring the concept at hand, and not making something just to fulfil the ask. 

---
# output: 
i made a sketch, that allows people to run a function via the browser. however, the function does not behave as expected. play with the sketch [here](https://arjunmakesthings.github.io/icm-2025/week-5_labour/index.html). firefox doesn't load .ttf files for some reason, so please (sadly) use google-chrome. i could've put the text as html text, but i don't have time at the moment.

![[z_images/Screen Recording 2025-10-04 at 21.49.46.mov]]

if a person types a for() loop, it produces pretty things.

![[z_images/Screen Recording 2025-10-04 at 21.56.33.mov]]

if a person tries to make a grid, their browser will crash. 

code: 

``` js
//the computer revolts; 251003.

// made for week 5; labour.

/*
ask: Functions are the basic unit of labor in your code. ~~Take a sketch you’ve already done and re-organize the code into functional units of labor that you define~~. You can also conceive of an entirely new world of labor. What kinds of labor does it take to make your sketch run?
*/

// thought: want to make a function that does not listen to its instructions.

//realised that i can call functions inside the browser. that makes it very interesting. a sketch can play, and a person can call a function that misbehaves. that's unexpected, atleast for a class learning how to code.

//for font: 
let font; 
function preload(){
font = loadFont("/week-5_labour/PTMono-Regular.ttf"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);

  textSize(16);
  fill(100);
  textFont(font); 
  text("open the console on your browser (cmd+shift+c or control + shift + c) to interact with this sketch.", 50, 50);

  noFill();

  console.log("this is a sketch that allows you to draw a point.");
  console.log("use draw_point(x,y), where x & y are numerical coordinates for your point.");
}

function draw() {
  //there is no draw.
}

let sw = 5; //variable for stroke_weight.

function draw_point(x, y, block_control = false) {
  //do what you're told.
  strokeWeight(sw);
  stroke(255);
  point(x, y);

  //then, give over control to the computer.
  if (block_control == false) {
    control(x, y);
  }

  return "oops"; //return this in the console instead of undefined.
}

let min_run = 5;
let max_run = 100;

function control(x, y) {
  let times_to_run = int(random(1, 1000));

  for (let i = 0; i < times_to_run; i++) {
    //syntax: setTimeout(function, delay, arg1, arg2, ...); (from: https://www.geeksforgeeks.org/javascript/how-to-delay-a-function-call-in-javascript/)
    let new_x = (x += random(-sw, sw));
    let new_y = (y += random(-sw, sw));
    setTimeout(() => {
      draw_point(new_x, new_y, true);
    }, i * 10); //make new point, but incrementally.
  }
}

// function windowResized() {
//   clear();
//   resizeCanvas(windowWidth, windowHeight);
//   setup();
// }


```

---
# log: 
i spent time understanding how functions work. i realised that i can't get a function to run over time (because it runs all at once). therefore, recursion, fails for animation. 

i tried a few things.

``` js
function make_rectangle(x, y, w, h) {
  //we only need two pairs of coordinates to make a rectangle.
  let x1 = x;
  let y1 = y;

  let x3 = x1 + w;
  let y3 = y1 + h;

  strokeWeight(2);
  stroke(255);

  // point(x1, y1);
  // point(x3, y3);
  point(x3, y1);
  point(x1, y3);

  if (x1<x3 || y1 < y3){
    x1+=1;
    y1 += 1;
    make_rectangle(x1, y1, w-1,h-1);
    return;
  }
}
```

return everything passed to it: 
``` js
function send(...args) {
  return args;
}
```

i wanted to call a function, but make it run only once. i realised that i can call functions from the browser-console to do so. 

![[z_images/251004_vid.mov]]

watched a video on arrow functions. 

https://www.youtube.com/watch?v=fRRRkognpOs

learnt about calling functions via timeout: 

https://www.geeksforgeeks.org/javascript/how-to-delay-a-function-call-in-javascript/