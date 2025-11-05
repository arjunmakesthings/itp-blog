---
date: 2025-10-24
tags:
  - experiments
  - reading
noteOrder: "147"
draft: "false"
---
watched this: https://radiolab.org/podcast/211119-colors

> The German philologist Lazarus Geiger [2] reviewed evidence from even older sources: the Hindu Veda hymns of India, the Zend-Avesta books of the Parsees, and the Old Testament of the Bible, as well as ancient Greek and Roman sources. Geiger argued that color lexicons progressed over time from a BLACK-and-WHITE system to a BLACK-and-RED system (where RED was his term for white or warm colors), then differentiating YELLOW, then adding GREEN, then BLUE.
> 
> from: https://sites.socsci.uci.edu/~kjameson/ECST/Brown_ColorDictionariesAndCorpora.pdf

the podcast argued that people couldn't name the colour they saw, because they hadn't associated the object with the word (see [this study by jules davidoff](https://languagelog.ldc.upenn.edu/nll/?p=17970)). 

> When shown a circle with 11 green squares and one blue, they could not pick out which one was different from the others — or those who could see a difference took much longer and made more mistakes than would make sense to us, who can clearly spot the blue square.
> 
> But the Himba have more words for types of green than we do in English.  When looking at a circle of green squares with only one slightly different shade, they could immediately spot the different one.
> 
> ![[z_images/image-1.webp]]
> 
> Davidoff says that without a word for a color, without a way of identifying it as different, it is much harder for us to notice what is unique about it — even though our eyes are physically seeing the blocks it in the same way.
> 
> ![[z_images/image-2.webp|245x245]]

---

wrote a script to center video feed, and flip it: 

``` js
//pixels ; october 31st, 2025.

let cam;

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();
}

function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh);
}

function draw() {
  background (0); 
  push();
  scale (-1,1); 
  translate (-width, 0); 
  image(cam, 0, 0, width, height);
  pop(); 
}

```

---
i then realised that nested push-loops don't work:

``` js
//pixels ; october 31st, 2025.

let cam;

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();

  pixelDensity(1);
  noStroke();
}

function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh);
}

function draw() {
  background(0);

  push();
  scale(-1, 1);
  translate(-width, 0);
  //flip the camera; get the values:

  cam.loadPixels();
  push();
  scale(1, 1);
  translate(0, 0);
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      //go every 10 pixels:
      let i = cam.pixels[get_pixel_index(x, y)];

      //when you display, flip the camera again:

      textSize(6);
      fill(255);
      text(i, x, y);
    }
  }
  pop();
  pop();
}

function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

```

---
sketch title: am i just a number to the computer? 

![[z_images/Screen Recording 2025-10-31 at 14.46.31.mp4]]

code: 
``` js
//pixels ; october 31st, 2025.

let cam;

let rs = [];
let gs = [];
let bs = [];
let aps = [];

let pixelation = 10;

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();

  pixelDensity(1);
  noStroke();
}

function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh);
}

function draw() {
  background(0);

  push();

  //flip the video:
  scale(-1, 1);
  translate(-width, 0);

  //draw the video:
  image(cam, 0, 0, width, height);

  loadPixels();

  //get rgb values:
  for (let x = 0; x < width; x += pixelation) {
    for (let y = 0; y < height; y += pixelation) {
      let i = get_pixel_index(x, y);

      //push rgb values:
      rs.push(pixels[i]);
      gs.push(pixels[i + 1]);
      bs.push(pixels[i + 2]);
      aps.push(pixels[i + 3]);
    }
  }
  pop();

  //apply another transformation to draw the rgb values:
  background(0);

  let index = 0;
  for (let x = 0; x < width; x += pixelation) {
    for (let y = 0; y < height; y += pixelation) {
      //pick a random rgba value to display.
      let n = noise(1);
      let t = 0;
      if (n < 0.2) {
        t = rs[index];
      } else if (n > 0.2 && n < 0.4) {
        t = gs[index];
      } else if (n > 0.4 && n < 0.6) {
        t = bs[index];
      } else {
        t = aps[index];
      }
      fill(255);
      let ts = pixelation - 5;
      textSize(ts);
      text(t, x, y);
      index++;
    }
  }
  //reset the arrays storing values.
  rs = [];
  gs = [];
  bs = [];
  aps = [];
}

function get_pixel_index(x, y) {
  return (y * width + x) * 4;
}

```

---
i then met with [[elisa]]. she made a few sketches as starting points, and then we tried to combine our interests. 

![[z_images/image-3.webp]]

i then had a vague idea of what her interpretation of the brief was, and how i could combine it with my own curiosity. 

---
here i realised that pixels works in screen-space coordinates. 

![[z_images/Screenshot 2025-11-02 at 19.22.05.webp|422x609]]

chatgpt said; 

> pixels[] operates on the main canvas pixel array, which is not affected by WEBGL transforms.
> 
> In WEBGL mode, loadPixels() and updatePixels() work in screen-space coordinates, but any prior scale or translate does not affect the pixels array.

``` js
let cam;

let rs = [];
let gs = [];
let bs = [];
let aps = [];

let pixelation = 10;

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();

  pixelDensity(1);
  noStroke();
}

function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

function draw() {
  background(255);

  push();
  //to flip the video, we'll do a bit of funny math: 
  scale(-1, 1); //first flip. 
  translate(-width / 2 + (width - cam.width) / 2, -height / 2 + (height - cam.height) / 2);

  cam.loadPixels(); //load the pixels array of the camera. this is from the dom element

  image(cam, 0, 0);

  fill (0); 
  //top-left is cam.width-part_w, top right is 0. 
  rect(cam.width-10, 0, 10, 10);

  pop();

    loadPixels(); 
  push(); 
  //the default translation applies here. meaning: 0,0 is in the center of the screen.
  fill ('red');
  pixels[0] = 255; 
  rect (0,0,10,10); 
  pop(); 
  updatePixels(); 
}

//helper to get index of pixel array from x, y coordinate.
function get_pixel_index(x, y) {
  return (y * width + x) * 4;
}
```

---
so, i realised that my cam.pixels array is starting from the top right. 

![[z_images/Screenshot 2025-11-02 at 19.26.54.webp|444x641]]

it was getting too complicated. so i decided to leave the flip for now.

---
stumbled upon something fucking awesome!

![[z_images/sketch_251102.mp4]]

also, i'm exploring 3-d because of my work this past week: [[itp-winter-show-2025 poster design]]. 

code:

``` js
let cam;

let gap = 4;

let cols = []; 

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();

  pixelDensity(1);
  noStroke();
}

function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

function draw() {
  // background(0);

  cam.loadPixels();

  // push();
  // translate(-cam.width / 2, -cam.height / 2, 0);
  // image (cam, 0,0); //for debug; video layer.
  // pop();

  for (let x = 0; x <= cam.width; x += gap) {
    for (let y = 0; y <= cam.height; y += gap) {
      let i = get_pixel_index(x, y);
      let c = color(cam.pixels[i], cam.pixels[i + 1], cam.pixels[i + 2], cam.pixels[i + 3]);
      
      noStroke();
      fill(c); //colour it with what the thing actually is. 
      
      let z = map(hue(c), 0, 360, 0, width);
      push();
      translate(-cam.width / 2, -cam.height / 2, z);
      rect(x, y, gap, gap );
      pop();
    }
  }

  cols = []; //clear cols array.
}

//helper to get index of pixel array from x, y coordinate.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}
```

---
title: disappearance 

![[z_images/Screen Recording 2025-11-03 at 21.20.52.mp4]]

code: 
``` js
let cam;

let gap = 4;

let cols = [];

let movement = 0;

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();

  pixelDensity(1);

  background(0);

  colorMode (HSB); 
}

//helper to make canvas based on camera input.
function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

function draw() {
  // background (0); 
  cam.loadPixels();

  movement = sin(frameCount * 0.05);

  // rotateY (movement); 

  // rotate(movement);

  for (let x = 0; x <= cam.width; x += gap) {
    for (let y = 0; y <= cam.height; y += gap) {
      let i = get_pixel_index(x, y);
      let c = color(cam.pixels[i], cam.pixels[i + 1], cam.pixels[i + 2], cam.pixels[i + 3]); //get a colour object here.

      //get hue, sat, brightness for same pixel: 
      let h = hue(c); 
      let s = saturation(c); 
      let br = brightness(c); 

      //keep shifting hue:
      let new_h = map(h+movement, 0+movement, 360+movement, 0, 360);


      //get all values:


      stroke(new_h, 255, 255); //colour it with what the thing actually is.

      let z_min = map(movement, 0, 1, -height, height/2);
      let z_max = map(movement, 0, 1, height/2, -height);

      let z = map(hue(c), 0, 360, z_min, z_max);
      push();
      translate(-cam.width / 2, -cam.height / 2, 0);
      strokeWeight(gap * movement);
      point(x, y);

      pop();
    }
  }
}

//helper to get index of pixel array from x, y coordinate.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

```

getting lost in the pixels: 

![[z_images/new_251103.mp4]]

``` js
let cam;

let gap = 4;

let cols = [];

let movement = 0;

function setup() {
  createCanvas(100,100, WEBGL);  //somehow i have to create a dummy-canvas first to be able to rotate in 3-dimensional space (otherwise rotateY wasn't working). 
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();

  pixelDensity(1);

  background(0);

  colorMode (HSB); 
}

//helper to make canvas based on camera input.
function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

const randomness_range = 10;

function draw() {
  // background (0); 
  cam.loadPixels();

  movement = sin(frameCount * 0.05);

  rotateZ (frameCount*0.03); 

  // rotate(movement);

  for (let x = 0; x <= cam.width; x += gap) {
    for (let y = 0; y <= cam.height; y += gap) {
      let i = get_pixel_index(x, y);
      let c = color(cam.pixels[i], cam.pixels[i + 1], cam.pixels[i + 2], cam.pixels[i + 3]); //get a colour object here.

      //get hue, sat, brightness for same pixel: 
      let h = hue(c); 
      let s = saturation(c); 
      let b = brightness(c); 

      //keep shifting hue:
      let new_h = constrain(map(h - movement, 0, 360, 0, 360), 0, 360);


      //get all values:


      stroke(new_h, s ,b); //colour it with what the thing actually is.

      let z_min = map(movement, 0, 1, -height/2, height/2);
      let z_max = map(movement, 0, 1, height/2, -height/2);

      let z = map(hue(c), 0, 360, z_min, z_max);
      push();
      translate(-cam.width / 2, -cam.height / 2, z+random(-randomness_range, randomness_range));
      strokeWeight(gap/2);
      point(x, y);

      pop();
    }
  }
}

//helper to get index of pixel array from x, y coordinate.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}
```

[[people/elisa|elisa]] & i then sat down, and i tried to understand the things she tried to do with the piece of code that i had shared. 

then, i sat down and thought critically about every single line of our new sketch. i reflected on the ask, and tied it to the manipulations we did. 

this is a performance of the same: 

![[z_images/icm_performance_nov-4.mp4]]

this is the code: 

``` js
//pixels; arjun & elisa. november 4th, 2025.

/*
ask: 
Manipulate an image or video at the pixel level* to create an alternative reality to the one depicted in the original image. No sound. The image should change over the course of the minute. What is revealed? What is lost? Use the properties of color to focus our attention.
*/

/*
thought(s): 
we had words to unite the two of us, in our interpretation of the brief: 
  for elisa: 
  - alternate reality
  - mutation
  - different from original (via colour, scale, rotation)
  - something with colour (because that is less 'depressing')
  - parallel universe
  - 'dislocated' reality.

  for arjun: 
    - difference (between how a computer sees & how a human sees)
*/

let cam;
let mic;

let gap = 4; //i look at pixel values for each pixel. this sets the gap between them.

let movement = 0; //define an empty variable & change its value over time later.

function setup() {
  createCanvas(100, 100, WEBGL); //somehow i have to create a dummy-canvas first to be able to rotate in 3-dimensional space (otherwise rotateY wasn't working).
  cam = createCapture(VIDEO, { flipped: true }, canv_to_asp); //by default, we get flipped video. mimi showed me this.
  cam.hide();

  pixelDensity(1); //lowering this also gives something cool.

  colorMode(HSB);

  //to get audio:
  mic = new p5.AudioIn();
  mic.start();

  background(0);
}

//helper to make canvas based on camera-input-size (same aspect ratio).
function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

// const randomness_range = 20; //we aren't using this as of right now. but, this is good to break the predictability. right now, there's too much going on.

function draw() {
  //elisa's background attempts. i couldn't find a way to include them:
  // background (0);
  //background((frameCount * 0.5) % 360, 100, 100);
  //background((frameCount * 0.5) % 360, 80, 40, 0.2);

  let vol = mic.getLevel() * 10; //elisa added this. this gives us mic input. change the multiplication to whatever fetches breathing levels (to then use for manipulation later).
  // console.log(vol); //see how much noise is in the room & adjust multiplication post.

  movement = sin(frameCount * 0.05) + vol * 10; //this is what we use for consistent movement.
  // console.log(movement); //to check movement. it returns a value between -1,1.

  cam.loadPixels();

  //   rotateZ (frameCount*0.03);
  // rotateZ(frameCount * 0.03 + vol);
  // rotate(movement);

  for (let x = 0; x <= cam.width; x += gap) {
    for (let y = 0; y <= cam.height; y += gap) {
      //iterate through every single pixel of the camera (with the gap).

      let i = get_pixel_index(x, y);
      let c = color(cam.pixels[i], cam.pixels[i + 1], cam.pixels[i + 2], cam.pixels[i + 3]); //get a colour object here. this is returned as rgb; i believe.

      //get hue, sat, brightness for same pixel :
      let h = hue(c);
      let s = saturation(c);
      let b = brightness(c);

      //keep shifting hue:
      let new_h = constrain(map(h * movement * 0.5, 0, 360, 0, 360), 0, 360); //i also want the colour to map slower than z-rotation, otherwise it looks like they're coupled together.

      // new_h = (new_h + frameCount * 0.3) % 360; //this was elisa's line. i added h * movement above by looking at this. we both want the colour to keep shifting; so we get that here.

      stroke(new_h, s, b); //colour it with what the thing actually is.

      let z_min = map(movement, -1, 1, -height * 2, height * 2);
      let z_max = map(movement, -1, 1, height * 2, -height * 2);

      let z = map(hue(c), 0, 360, z_min, z_max);

      // z -= vol; //elisa added this. however, i moved this change to movement. that way, the colour changes when noise is generated.

      push();
      translate(-cam.width / 2, -cam.height / 2, z);

      strokeWeight(gap / 2);
      point(x, y);

      pop();
    }
  }
}

//helper to get index of pixel array from x, y coordinate.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}
```

final sketch to play with is available here: https://arjunmakesthings.github.io/icm-2025/week-8_and_9_pixels/index.html

---
i am happy with the progress i made on this. i <mark>worked deliberately with code</mark> — and knew what everything was doing. this was a new feeling of empowerment even though i've put in a lot of time in the past playing around with code.

it was difficult to be more critical with the outcome, when working with another person. deliberate thought is difficult when you're still grappling with a medium — and i don't think i did [[people/elisa|elisa]] justice by making the sketch in 3-d. 

i also experienced and heard experiences about people using chat-gpt. even elisa did at one point, and i couldn't understand her sketch(es). she told me it was because she 'needed a thing but she wasn't able to make it herself'. 

i think [[cody]] & i also spoke about this — he struggled with the same, with his partner.

with chat-gpt, it's become so easy to enter 'producer' mode; instead of staying in 'student' mode. producer mode cares about getting it done no matter what — and with the current technology, it's 'easy' (apparently) to do so. but that sucks for you as a student, because you don't understand how the thing was made. you have an amazing project, but you can't build it from scratch (or reapply it in another context). 

i think i want to work more with people who want to <mark>make work as a student — and not as a producer</mark>. i know most people in my cohort won't share the same point-of-view, and would argue that getting the thing made is more important than learning. i would respectfully disagree, and remind them that they're graduate students who enrolled in a class to learn how to code (and not how to make things with chat-gpt-generated-code). 

i want my experiments & explorations to be done like a student. sometimes, i'm going to make shit-quality work. and that's okay — i am learning. 