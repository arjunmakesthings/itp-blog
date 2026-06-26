---
date: 2026-06-12
tags:
noteOrder: "352"
draft: "false"
---
i attended advent of code with [[kevan]] and a few other recursers. 

these are essentially puzzles; but really well crafted. 

we did this one: https://adventofcode.com/2018/day/23

``` js
/*
[[x,y,z,r][x,y,z,r]]
*/

let posis = [
  [0, 0, 0, 4],
  [1, 0, 0, 1],
  [4, 0, 0, 3],
  [0, 2, 0, 1],
  [0, 5, 0, 3],
  [0, 0, 3, 1],
  [1, 1, 1, 1],
  [1, 1, 2, 5],
  [1, 3, 1, 1],
];

//find largest:
function get_max() {
  let max_posis_index = 0;
  for (let i = 0; i < posis.length; i++) {
    if (posis[i][3] > posis[max_posis_index][3]) {
      max_posis_index = i;
    }
  }
  return max_posis_index;
}

let max_r_index = get_max();

let in_range = solve(); 

console.log(in_range); 

function solve() {
  let count = 0;

  for (let i = 0; i < posis.length; i++) {
    let md = manhattan_distance(posis[i], posis[max_r_index]);

    if (md <= posis[max_r_index][3]){
        count++; 
    }
  }
  return count;
}
//p2 is the reference point.
function manhattan_distance(p1, p2) {
  let d = 0;
  for (let i = 0; i < p1.length - 1; i++) {
    let difference = p2[i] - p1[i];
    d += Math.abs(difference);
  }
  return d;
}

```

---

it made me want to do these puzzles more, and use this as a way to get deeper into the nooks of programming.

solutions to puzzles done during my batch are on this repo: https://github.com/arjunmakesthings/advent-of-code
