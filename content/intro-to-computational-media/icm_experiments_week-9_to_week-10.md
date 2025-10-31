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



