---
date: 2026-01-22
tags:
  - experiments
noteOrder: "208"
draft: "false"
---
# ask: 

Create a reactive 3D mesh.

Use p5.js and WebGL.
Use the version of vertex() that includes the z parameter.
Use both position and color attributes.
Make your mesh react to user input. This can be using the mouse, keyboard, microphone, or any other input you can think of.

# output: 

---
i tried programming something very complex, and it got too complicated. 

``` js
//untitled; arjun; jan, 2026.

/*
ask: 
make a reactive mesh, with vertices that use the z-parameter. use position & colour. 
*/

/*
thought: 
every enclosed body is a mesh, with vertices inside. shape is affected by the topology. 

an enclosed body can be thought of as a group of similar colours. 
*/

let cam;

let vertices = [];

let col_similarity_threshold = 50;

function setup() {
  cam = createCapture(VIDEO, canv_to_asp);
  cam.hide();
}

//helper to convert canvas to aspect ratio. runs once.
function canv_to_asp() {
  let asp_ratio = cam.height / cam.width;

  let wh = windowWidth * asp_ratio;

  createCanvas(windowWidth, wh, WEBGL);
}

function draw() {
  background(0);
  push();
  //first flip
  scale(-1, 1);
  translate(-width, 0);

  translate(width / 2, -height / 2); //bring back to the center.

  assign_vertices();

  image(cam, 0, 0, width, height);
  pop();
}

let groups = [];

function assign_vertices() {
  cam.loadPixels();
  //now we get a cam.pixels array with rgba values for each pixel.

  /*
  algorithm: 
  - we go through every single x, y position on the screen. 
  - for each pixel, look at its neighbours (8).
  - if the colour of the neighbour is similar (under a certain threshold), accumulate them into an object. 
  - if the neighbour has been accumulated, don't look at it again. 
  */

  for (let x = 0; x < cam.width; x++) {
    for (let y = 0; y < cam.height; y++) {
      //we go through every single pixel.
      let n = get_pixel_index(x, y);

      //find neighbours in the pixel array:
      let neighbours = get_neighbours(x, y);

      //the above returns index values in cam.pixels array with neighbours.

      // for each neighbour, see if the rgba is under the threshold. if so, accumulate them into a group.
      for (let i = 0; i < neighbours.length; i++) {
        let ni = neighbours[i];

        // red
        if (cam.pixels[ni] < cam.pixels[n] - col_similarity_threshold) continue;
        if (cam.pixels[ni] > cam.pixels[n] + col_similarity_threshold) continue;

        // green
        if (cam.pixels[ni + 1] < cam.pixels[n + 1] - col_similarity_threshold) continue;
        if (cam.pixels[ni + 1] > cam.pixels[n + 1] + col_similarity_threshold) continue;

        // blue
        if (cam.pixels[ni + 2] < cam.pixels[n + 2] - col_similarity_threshold) continue;
        if (cam.pixels[ni + 2] > cam.pixels[n + 2] + col_similarity_threshold) continue;

        // neighbour is similar
        groups.push(ni);
      }
    }
  }
}

//helper to convert x,y coordinates to pixels index.
function get_pixel_index(x, y) {
  return (y * cam.width + x) * 4;
}

function get_neighbours(x, y) {
  let neighbours = [];
  const possible_neighbours = [
    [x - 1, y - 1], // top-left
    [x, y - 1], // top
    [x + 1, y - 1], // top-right

    [x - 1, y], // left
    [x + 1, y], // right

    [x - 1, y + 1], // bottom-left
    [x, y + 1], // bottom
    [x + 1, y + 1], // bottom-right
  ];

  for (const [dx, dy] of possible_neighbours) {
    if (dx >= 0 && dx < cam.width && dy >= 0 && dy < cam.height) {
      neighbours.push(get_pixel_index(dx, dy));
    }
  }

  return neighbours;
}
```

i decided to break it down into smaller chunks. 

when i did that, i realized that the computer was not able to convert all of the pixels and then render them as vertices. 

---


