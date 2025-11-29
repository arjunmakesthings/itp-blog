---
date: 2025-11-13
tags:
  - experiments
noteOrder: "175"
draft: "false"
---
# ask: 
> Create a Digital Cornell Box. Think about the objects you place in your Cornell Box, what do these objects represent poetically, personally or metaphorically? How will you use animation, interactivity and real time environments to bring these objects to life? Will this be a screen based work? A mobile piece? A projected work? What sort of style or theme do you want your box to have? This piece is due in our final class week 14.
> 
> Your "Cornell Box" project should include at least (5) objects that you've collected / curated.  These objects can be videos, images, audio files, 3D models, text, etc.  You may present these in whichever form best supports your understanding of the collection.
> 
> Your box should include at least (3) points of interactivity.  This could include mouse-click, keypress interactivity, camera movement, spatial audio, proximity triggers. 

---

[[people/shloka|shloka]] & i decided to work together on this one, since we'll likely not have the same courses in the future. 

![[z_images/IMG_6911 2.webp]]

i came in not particularly excited by the idea of unity (i never was excited about 3-d world building), but thought that i could piggyback off [[people/shloka|shloka]]'s interest in storytelling with time-based media. but, i realised that they also had a lot on their plate (and couldn't focus on this). 

eventually, we arrived at an idea to show people what anxiety feels like by mapping the commute from the subway to the floor, and showing all the things we think about (and the decisions we make). 

![[z_images/IMG_6912.webp]]

---
### 251118: 
[[people/shloka|shloka]] had their own ideas that they were passionate about, and i didn't want to stop their curiosity. we failed to find a mutual overlap of interest, and, so, i decided to make my own project. 

i wanted to work with memory — especially what happens to memory when it isn't refreshed (and how we begin constructing versions of memories that, perhaps, weren't real). specifically: 

my father left me & my mother when i was 19. we haven't spoken in the last 5 years. 

i have media on my hard-drive that show me close to my father; but i can't recall those memories, because we are estranged in reality. as time passes, i'm beginning to forget what he looked like, how he talked and how he behaved. on one side, that's good — i'm finally beginning to let go. but on the other, as i've come to realise lately, parts of me would desperately like us to meet & for me to preserve those memories in their original shape. 

i wonder whether that's happening to him too — the removal of me from his existence, and from the memories of us. 

so, i collected old media from different time periods. 

![[Screenshot 2025-11-18 at 11.30.10.png]]

the idea was to use physical objects — such as a cube — to divide a space into two halves. 

![[z_images/image-9.webp|520x369]]

on the right side would be a memory that my father might have (with my face removed or in the process of being removed), while on the left, it would be the same memory with my side (father being blurred). 

![[z_images/image-10.webp|503x421]]

as they get closer, the blurriness would reduce. 

i thought about how i would detect the faces, and what i could do. it can't be a pre-created video (like runway), and it needs to detect the faces and blur / manipulate them, somehow, live. 

---
i spent time thinking of the algorithm; also spoke with [[people/mimi yin|mimi yin]]. 

![[z_images/251126.webp]]

i then used flora to create my video assets. 

![[z_images/Screenshot 2025-11-26 at 17.37.26.webp]]

i used a maximum value detection to keep track of the blobs. to make the media is controlled even with human-interaction, i need to make sure that the maximum value (whether colour, saturation, brightness — whatever) is emitted from my object and not from a person interacting with the object. 

![[z_images/Screen Recording 2025-11-26 at 17.36.20.mp4]]

``` js
//blob detection; november, 2025.

let cam;

let cw = 1280;
let ch = 720;

function setup() {
  cam = createCapture(VIDEO, {flipped:true}, make_canvas);
  cam.hide();

  pixelDensity(1);
  noStroke();
}
function make_canvas(){
  createCanvas(cam.width, cam.height); 
}


function draw() {
  background(0);

  cam.loadPixels();

  detect();

  tint(255,50); 
  image(cam, 0, 0);

   updatePixels();
}

let max_r = 0;
let max_r_index = 0;

let max_g = 0;
let max_g_index = 0; 

function detect() {
  //every frame, find the location of the highest colour values.

  max_r = 0;
  max_r_index = 0;
  max_g = 0;
  max_g_index = 0;
  
  for (let i = 0; i < cam.pixels.length; i += 4) {
    let r = cam.pixels[i]; 
    let g = cam.pixels[i+1]; 

    if (r>max_r){
      max_r = r; 
      max_r_index = i; 
    }

    if (g > max_g) {
      max_g = g;
      max_g_index = i;
    }
  }

  //draw rectangle wherever that is. 
  let pos = get_coordinates(max_r_index); 

  rect (pos.x, pos.y, 50,50); 

  console.log(max_r, max_g);
}

//helper to convert from pixels array to x, y.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

function get_coordinates(n) {
  let pixel_number = n / 4;

  let x = pixel_number % cam.width;
  let y = Math.floor(pixel_number / cam.width);

  return { x, y };
}

class Unit {}

```

later, i tried brightness detection too, but decided against it (since the maximum brightness p5 would give me was 100; which collided with reflections (and i was going to project media; so)). 

even with a red threshold of 200, it was still detecting other things from my video feed: 

![[z_images/Screen Recording 2025-11-26 at 18.55.05.mp4]]

``` js
//blob detection; november, 2025.

let cam;

let my_memories = [];
let dad_memories = [];

let units = []; //keep track of how many units are on the area.

function preload() {
  my_memories[0] = createVideo("./assets/media/my-memories/0.mp4");
  dad_memories[0] = createVideo("./assets/media/dad-memories/0.mp4");

  for (let i = 0; i < my_memories.length; i++) {
    my_memories[i].hide();
    dad_memories[i].hide();
  }
}

function setup() {
  cam = createCapture(VIDEO, { flipped: true }, make_canvas);
  cam.hide();

  pixelDensity(1);
}
function make_canvas() {
  createCanvas(cam.width, cam.height);
}

function draw() {
  background(0);

  cam.loadPixels();

  detect();

  //tint(255,20);  
  //image(cam, 0, 0);

  // updatePixels();

  for (let unit of units) {
    unit.show();
  }
}

let threshold = 200;

function detect() {
  for (let i = 0; i < cam.pixels.length; i+=4) {
    if (cam.pixels[i] > threshold) {
      let pos = get_coordinates(i);
      rect(pos.x, pos.y, 20, 20);
    }
  }
}

//helper to convert from pixels array to x, y.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

function get_coordinates(n) {
  let pixel_number = n / 4;

  let x = pixel_number % cam.width;
  let y = Math.floor(pixel_number / cam.width);

  return { x, y };
}

//each unit has a media file that it loops, a position on the screen

class Unit {
  constructor(x, y, file) {
    this.x = x;
    this.y = y;
    this.file = file;
  }

  show() {
    image(this.file, this.x, this.y, 50, 50);
  }
}

```

realised why. cleaned it up. 

---
watched shiffman's videos on computer vision [playlist](https://www.youtube.com/playlist?list=PLdmbLNqZRyTZuM2I9sggP3eSwMvB5df3d) to build a better blob detection algorithm. averaged positions, and so on: 

``` js
//blob detection; november, 2025.

let cam;
let col_to_detect = {
  r: 0,
  g: 0,
  b: 0,
};

let threshold = 10;

function setup() {
  cam = createCapture(VIDEO, { flipped: true }, make_canvas);
  cam.hide();

  pixelDensity(1);

  noStroke();
}
function make_canvas() {
  createCanvas(cam.width, cam.height);
}

function draw() {
  background(0);

  cam.loadPixels();

  detect();

  tint(255, 100);
  image(cam, 0, 0);
}

function detect() {
  let avg_x = 0;
  let avg_y = 0;
  let count = 0;

  for (let x = 0; x < cam.width; x++) {
    for (let y = 0; y < cam.height; y++) {
      let n = (y * cam.width + x) * 4;
      //go over every single pixel, and see if it matches colour.

      let pr = cam.pixels[n];
      let pg = cam.pixels[n + 1];
      let pb = cam.pixels[n + 2];

      //color difference:
      let dr = abs(pr - col_to_detect.r);
      let dg = abs(pg - col_to_detect.g);
      let db = abs(pb - col_to_detect.b);

      if (dr < threshold && dg < threshold && db < threshold) {
        //this means that this point is roughly the same colour.
        avg_x += x;
        avg_y += y;
        count++;
      }
    }
  }

  //when counting for all pixels is done, draw a point at the average location.
  strokeWeight(1);
  stroke(255);

  if (count > 0) {
    let x = avg_x / count;
    let y = avg_y / count;

    point(x, y);
  }
}

function mousePressed() {
  cam.loadPixels();
  let n = get_pixel_index(mouseX, mouseY);

  col_to_detect.r = cam.pixels[n];
  col_to_detect.g = cam.pixels[n + 1];
  col_to_detect.b = cam.pixels[n + 2];
}

// helpers:
//helper to convert from pixels array to x, y.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

//helper to convert from x, y to pixel index.
function get_coordinates(n) {
  let pixel_number = n / 4;

  let x = pixel_number % cam.width;
  let y = Math.floor(pixel_number / cam.width);

  return { x, y };
}

```

![[z_images/blob_251128.mp4]]

---
kinda works. 

![[z_images/Screen Recording 2025-11-28 at 12.37.03.mp4]]

this is enough for a minimum test with the projector, which i shall do today. then, i will resolve the multiple blob tracks, division of space (and subsequent allocation of video), and blurring between different videos (which i have cracked separately). 

---
# programming resources: 
- face detection (using blaze-face): https://www.youtube.com/watch?v=jovusqHNpRo

