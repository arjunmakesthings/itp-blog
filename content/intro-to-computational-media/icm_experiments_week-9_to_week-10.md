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

