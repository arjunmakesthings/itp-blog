---
date: 2026-01-23
tags:
  - experiments
noteOrder: "210"
draft: "false"
---
# ask: 
Using the random walker as a model, develop a ==sketch that experiments with motion== ... another way of thinking about the assignment is to ==apply the rules of motion to another medium of expression==: sound, color, number, scale ...

to see: 
- https://github.com/nature-of-code/noc-syllabus-modules/tree/main/module00-intro
- assignment page: https://github.com/lenincompres/noc-syllabus-s26/wiki/ITP-Assignment-1

# thought: 
a random walker can be applied to text too. heavily inspired by the nonsense laboratory by allison parrish, this sketch attempts to wonder — collectively with a human being — at what point does a typo become more than a typo? 

a keyboard is laid out like so: 

q w e r t y u i o p
a s d f g h j k l
z x c v b n m

each letter can be thought of as a point in two-dimensional space. going by the random walker algorithm, each letter has a maximum of 8 possibilities to move to, and a minimum of 1.

# output: 


---
read through the first chapter. i had already read it before. watched a video on [open simplex noise](https://thecodingtrain.com/tracks/noise/noise/open-simplex-noise).

---
working version to manipulate a word based on its neighbors: 

``` js
// at what point is a typo not a typo?
// arjun; january, 2026.

/*
ask: 
Using the random walker as a model, develop a ==sketch that experiments with motion== ... another way of thinking about the assignment is to ==apply the rules of motion to another medium of expression==: sound, color, number, scale ...
*/

/*
thought: 
a random walker can be applied to text too. heavily inspired by the nonsense laboratory by allison parrish, this sketch attempts to wonder — collectively with a human being — at what point does a typo become more than a typo? 

a keyboard is laid out like so: 

q w e r t y u i o p
a s d f g h j k l
z x c v b n m

each letter can be thought of as a point in two-dimensional space. going by the random walker algorithm, each letter has a maximum of 8 possibilities to move to, and a minimum of 1.
*/

let space = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

let str = "ketchup";

let prob_to_change = 0.1;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square to handle calculations better.
}

function draw() {
  background(0);

  //if i write a word, i want to have an iteration of the word with typos.
  let chars = Array.from(str); //returns all characters of that string into a new array.

  for (let i = 0; i < chars.length; i++) {
    let ch = chars[i];
    let neighbours = get_neighbours(ch);
    if (neighbours.length === 0) continue; //if there are no neighbours, move to the next iteration. although this isn't possible, but fail-safe.

    let n = random(1); //pick a random number.

    if (n > prob_to_change) {
      continue; //doesn't need to be changed.
    } else {
      //needs to be changed.
      chars[i] = neighbours[Math.floor(random(0, neighbours.length))];
    }
  }

  //change this into the string. 
  str = chars.join(""); 

  console.log(str);
  noLoop();
}

function get_new_word(){

}

//helper written by gpt to get neighbours of a particular character, based on the visual-representation i'd thought of. 
function get_neighbours(char) {
  if (!char || typeof char !== "string") return [];
  char = char.toLowerCase();

  // find letter position
  let pos = null;
  for (let r = 0; r < space.length; r++) {
    for (let c = 0; c < space[r].length; c++) {
      if (space[r][c] === char) {
        pos = { r, c };
        break;
      }
    }
    if (pos) break;
  }
  if (!pos) return [];

  // collect neighbours within +/-1 row and col (including diagonals)
  const neighbours = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // skip the letter itself
      const rr = pos.r + dr;
      const cc = pos.c + dc;
      if (rr < 0 || rr >= space.length) continue;
      if (cc < 0 || cc >= space[rr].length) continue;
      neighbours.push(space[rr][cc]);
    }
  }

  return neighbours;
}

```

i made a working base that incremented the word linearly. 

``` js
// at what point is a typo not just a typo?
// arjun; january, 2026.

/*
ask: 
Using the random walker as a model, develop a ==sketch that experiments with motion== ... another way of thinking about the assignment is to ==apply the rules of motion to another medium of expression==: sound, color, number, scale ...
*/

/*
thought: 
a random walker can be applied to text too. heavily inspired by the nonsense laboratory by allison parrish, this sketch attempts to wonder — collectively with a human being — at what point does a typo become more than a typo? 

a keyboard is laid out like so: 

q w e r t y u i o p
a s d f g h j k l
z x c v b n m

each letter can be thought of as a point in two-dimensional space. going by the random walker algorithm, each letter has a maximum of 8 possibilities to move to, and a minimum of 1.
*/

let space = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

let prob_to_change = 0.001; //start with a very low probability to change.

let str = "";

//html stuff: 
let content_p, form, input; //html variables.

function setup() {
  noCanvas(); 

  content_p  = document.getElementById("content"); 

  form = document.getElementById("input_form");
  input = document.getElementById("word_input");

  form.addEventListener("submit", handle_submit);
}

function handle_submit(e){
  //by default, the browser reloads when a form is submitted. we need to prevent that. 
  e.preventDefault(); 
  str = input.value.trim(); //take the value submitted, remove whitespace. 

  content_p.innerHTML = str; //show what has been typed. 
}

function draw() {
  if (frameCount % 60 === 0 ){
    //every 1 second. 

    str = get_new_word(); 
    content_p.innerHTML+=" " + str; 
    prob_to_change = 
  }
}

//helper to generate a new word based on whatever str is. 
function get_new_word() {
  let word; 

  //if i write a word, i want to have an iteration of the word with typos.
  let chars = Array.from(str); //returns all characters of that string into a new array.

  for (let i = 0; i < chars.length; i++) {
    let ch = chars[i];
    let neighbours = get_neighbours(ch);
    if (neighbours.length === 0) continue; //if there are no neighbours, move to the next iteration. although this isn't possible, but fail-safe.

    let n = random(1); //pick a random number. this returns a number like so: 0.9211030989418209. 

    console.log(n); 

    if (n > prob_to_change) {
      continue; //doesn't need to be changed.
    } else {
      //needs to be changed.
      chars[i] = neighbours[Math.floor(random(0, neighbours.length))];
    }
  }

  //change this into the string.
  word = chars.join("");
  return word;
}

//helper written by gpt to get neighbours of a particular character, based on the visual-representation i'd thought of. 
function get_neighbours(char) {
  if (!char || typeof char !== "string") return [];
  char = char.toLowerCase();

  // find letter position
  let pos = null;
  for (let r = 0; r < space.length; r++) {
    for (let c = 0; c < space[r].length; c++) {
      if (space[r][c] === char) {
        pos = { r, c };
        break;
      }
    }
    if (pos) break;
  }
  if (!pos) return [];

  // collect neighbours within +/-1 row and col (including diagonals)
  const neighbours = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // skip the letter itself
      const rr = pos.r + dr;
      const cc = pos.c + dc;
      if (rr < 0 || rr >= space.length) continue;
      if (cc < 0 || cc >= space[rr].length) continue;
      neighbours.push(space[rr][cc]);
    }
  }

  return neighbours;
}

```

now, i wanted the probability to change **not** linearly. so, i discovered [[euler's number]]. but i couldn't understand how to use it. 

so, i resorted to something simpler. 

every step, we want the probability to be a little more than what it was the last time. 

![[demo_260125.mp4]]

``` js
// at what point is a typo not just a typo?
// arjun; january, 2026.

/*
ask: 
Using the random walker as a model, develop a ==sketch that experiments with motion== ... another way of thinking about the assignment is to ==apply the rules of motion to another medium of expression==: sound, color, number, scale ...
*/

/*
thought: 
a random walker can be applied to text too. heavily inspired by the nonsense laboratory by allison parrish, this sketch attempts to wonder — collectively with a human being — at what point does a typo become more than a typo? 

a keyboard is laid out like so: 

q w e r t y u i o p
a s d f g h j k l
z x c v b n m

each letter can be thought of as a point in two-dimensional space. going by the random walker algorithm, each letter has a maximum of 8 possibilities to move to, and a minimum of 1.
*/

let space = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

let prob_to_change = 0.1; //start with a very low probability to change.
let rate_of_growth = 0.05;

let str = "";

//html stuff: 
let content_p, form, input; //html variables.

function setup() {
  noCanvas(); 

  content_p  = document.getElementById("content"); 

  form = document.getElementById("input_form");
  input = document.getElementById("word_input");

  form.addEventListener("submit", handle_submit);
}

function handle_submit(e){
  //by default, the browser reloads when a form is submitted. we need to prevent that. 
  e.preventDefault(); 
  str = input.value.trim(); //take the value submitted, remove whitespace. 

  content_p.innerHTML = str; //show what has been typed. 
}

function draw() {
  if (frameCount % 60 === 0 && str!=="" ){
    //every 1 second. 

    str = get_new_word(); 
    content_p.innerHTML+=" " + str; 

    //we want the probability to change exponentially. 
    prob_to_change *= 1 + rate_of_growth;
    prob_to_change = constrain(prob_to_change, 0, 1);

    console.log(prob_to_change); 
  }
}

//helper to generate a new word based on whatever str is. 
function get_new_word() {
  let word; 

  //if i write a word, i want to have an iteration of the word with typos.
  let chars = Array.from(str); //returns all characters of that string into a new array.

  for (let i = 0; i < chars.length; i++) {
    let ch = chars[i];
    let neighbours = get_neighbours(ch);
    if (neighbours.length === 0) continue; //if there are no neighbours, move to the next iteration. although this isn't possible, but fail-safe.

    let n = random(1); //pick a random number. this returns a number like so: 0.9211030989418209. 

    if (n > prob_to_change) {
      continue; //doesn't need to be changed.
    } else {
      //needs to be changed.
      chars[i] = neighbours[Math.floor(random(0, neighbours.length))];
    }
  }

  //change this into the string.
  word = chars.join("");
  return word;
}

//helper written by gpt to get neighbours of a particular character, based on the visual-representation i'd thought of. 
function get_neighbours(char) {
  if (!char || typeof char !== "string") return [];
  char = char.toLowerCase();

  // find letter position
  let pos = null;
  for (let r = 0; r < space.length; r++) {
    for (let c = 0; c < space[r].length; c++) {
      if (space[r][c] === char) {
        pos = { r, c };
        break;
      }
    }
    if (pos) break;
  }
  if (!pos) return [];

  // collect neighbours within +/-1 row and col (including diagonals)
  const neighbours = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // skip the letter itself
      const rr = pos.r + dr;
      const cc = pos.c + dc;
      if (rr < 0 || rr >= space.length) continue;
      if (cc < 0 || cc >= space[rr].length) continue;
      neighbours.push(space[rr][cc]);
    }
  }

  return neighbours;
}
```

but i realized that this wasn't accurate. when i take a messed up string and manipulate it, it goes further away from the original word. i should always manipulate the original word, 





