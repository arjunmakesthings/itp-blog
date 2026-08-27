---
date: 2026-08-27
tags:
  - experiments
noteOrder: "431"
draft: "false"
---
made one-dimensional automata. first in js, that outputs onto the console: 

``` js
   1 │ //1-d automata; arjun; august, 2026.
   2 │
   3 │ //definition: given a starting condition, as a list of numbers [n], we compute subsequent generations i times for [n]*i.
   4 │
   5 │ let seed = [0, 1, 1, 0, 0];
   6 │ let i = 10;
   7 │
   8 │ //impl note: javascript keys have to be declared as a string.
   9 │ //definition: if neighbours were 0, produce 1; if neighbours were 1, produce 0.
  10 │ const rules = {
  11 │     "000": 1,
  12 │     "100": 0,
  13 │     "110": 0,
  14 │     "101": 0,
  15 │     "010": 1,
  16 │     "011": 0,
  17 │     "111": 0,
  18 │     "001": 0,
  19 │
  20 │     //left boundary:
  21 │     "b00": 1,
  22 │     "b10": 0,
  23 │     "b11": 0,
  24 │     "b01": 0,
  25 │
  26 │     //right boundary:
  27 │     "00b": 0,
  28 │     "10b": 0,
  29 │     "11b": 0,
  30 │     "01b": 0,
  31 │ };
  32 │
  33 │ function generate(s) {
  34 │     //given a sequence s, return new sequence s_n.
  35 │     let s_n = [];
  36 │
  37 │     for (let i = 0; i < s.length; i++) {
  38 │         const c = s[i];
  39 │         const left = i > 0 ? s[i - 1] : "b";
  40 │         const right = i < s.length - 1 ? s[i + 1] : "b";
  41 │
  42 │         const seq = `${left}${c}${right}`;
  43 │
  44 │         s_n.push(rules[seq]);
  45 │     }
  46 │     return s_n;
  47 │ }
  48 │
  49 │ function run() {
  50 │     let all = [];
  51 │     all.push(seed);
  52 │
  53 │     for (let n = 0; n < i; n++) {
  54 │         all.push(generate(all[n]));
  55 │     }
  56 │     console.log("js output: " + "\n" + all.join("\n"));
  57 │     return all;
  58 │ }
  59 │
  60 │ run();
```

and then to visualize it, i used the computed result from this, and visualized it as cells. 

``` js
   1 │ /*
   2 │ to visualize 1-d automata.
   3 │
   4 │ which is computed in ../ js.js.
   5 │ */
   6 │
   7 │ let cells = [];
   8 │
   9 │ function setup() {
  10 │     // createCanvas(1000, 562); //in 16:9 aspect ratio.
  11 │     createCanvas(800, 800); //square.
  12 │
  13 │     make_grid();
  14 │     frameRate(1);
  15 │ }
  16 │
  17 │ function make_grid() {
  18 │     let col_len = seed.length;
  19 │     let row_len = i + 1;
  20 │
  21 │     let w = floor(width / col_len);
  22 │     let h = floor(height / row_len);
  23 │
  24 │     stroke(0);
  25 │     fill(255);
  26 │
  27 │     let y = 0;
  28 │
  29 │     while (y < height) {
  30 │         let row = [];
  31 │
  32 │         for (let x = 0; x < width; x += w) {
  33 │             row.push(new Cell(x, y, w, h));
  34 │         }
  35 │
  36 │         cells.push(row);
  37 │         y += h;
  38 │     }
  39 │ }
  40 │
  41 │ let instr = -1;
  42 │
  43 │ let computed = run();
  44 │
  45 │ function draw() {
  46 │     instr++;
  47 │
  48 │     if (instr >= computed.length) {
  49 │         instr = -1;
  50 │         background(255);
  51 │     } else if (instr > -1){
  52 │         for (let j = 0; j < computed[instr].length; j++) {
  53 │             cells[instr][j].display(computed[instr][j]);
  54 │         }
  55 │     }
  56 │ }
  57 │
  58 │ class Cell {
  59 │     constructor(x, y, w, h) {
  60 │         this.x = x;
  61 │         this.y = y;
  62 │         this.w = w;
  63 │         this.h = h;
  64 │     }
  65 │     display(c) {
  66 │         stroke(0);
  67 │         strokeWeight(1);
  68 │         fill(c == 1 ? 255 : 0);
  69 │         rect(this.x, this.y, this.w, this.h);
  70 │     }
  71 │ }

```

i think there are more efficient ways to do this. i'll get there. 