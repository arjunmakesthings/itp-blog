---
date: 2026-10-16
tags:
  - experiments
noteOrder: "539"
draft: "false"
---
after [[making 1-d automata]]. 

---

[[james]] helped me figure out the idea of a 'diff-matrix' to capture changes, and then to update the main matrix. 

![[IMG_8536.webp|473]]


``` js
/*
advanced 2-d automata; october 17th, 2026.

given a set of cells & their initial state, form a temporary change set & then update the cells. 
*/

//definitions:
//a cell is an object with properties. currently: state.
class Cell {
  constructor(s) {
    this.state = s;
  }
}

//given the number of rows & columns, make a collection of cells.
function make_space(_r, _c) {
  let _sp = [];
  for (let i = 0; i < _r; i++) {
    const row = [];
    for (let j = 0; j < _c; j++) {
      //row.push(new Cell());
      row.push(
        new Cell(
          i === Math.floor(_r / 2) && j === Math.floor(_c / 2) ? 255 : 0,
        ),
      );
    }
    _sp.push(row);
  }
  return _sp;
}

//for everything below, we assume the space is global.

//given a space & position of cell in space, return all its neighbors:
function get_neighbors(_r, _c) {
  //wrapping:
  const at = (i, j) => [((i % r) + r) % r, ((j % c) + c) % c];

  return [
    //up_left: at(_r - 1, _c - 1),
    at(_r - 1, _c), //up.
    //up_right: at(_r - 1, _c + 1),
    at(_r, _c - 1), //left.
    at(_r, _c + 1), //right.
    //down_left: at(_r + 1, _c - 1),
    at(_r + 1, _c), //down.
    //down_right: at(_r + 1, _c + 1),
  ];
}

//render the global space.
function render() {
  for (let i = 0; i < space.length; i++) {
    let line = "";
    for (let j = 0; j < space[0].length; j++) {
      line += space[i][j].state + " ";
    }
    console.log(line);
  }
  console.log("");
}

//given a space, return a matrix of the same shape filled with zeroes.
function make_diff(_sp) {
  return _sp.map((row) => row.map(() => 0));
}

function automaton() {
  let diff_matrix = make_diff(space);

  const displacement = 1;

  //for every cell in the matrix, look at its neighbors & get the change:
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let cell = space[i][j];
      let neighbors = get_neighbors(i, j);

      //a cell can't give away more than it has:
      let has = cell.state;

      for (let n = 0; n < neighbors.length; n++) {
        //can't give more:
        if (has <= 0) break;

        //for each neighbor, if we have more than the neighbor, give to the neighbor at displacement-rate. else don't do anything.
        let neighbor = space[neighbors[n][0]][neighbors[n][1]];

        if (cell.state > neighbor.state) {
          diff_matrix[i][j] -= displacement;
          diff_matrix[neighbors[n][0]][neighbors[n][1]] += displacement;
          has -= displacement;
        }
      }
    }
  }

  //once all of that is done, we update the space.
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      space[i][j].state += diff_matrix[i][j];
    }
  }
}

//setup:
const r = 5;
const c = 5;

let space = make_space(r, c);

//show the starting state.
render();

//main loop:
let n = 50;
let counter = 0;
while (counter <= n) {
  automaton();
  render();
  counter++;
}

```

100x100 automaton behavior, when center cell has 100, and has to displace to all 8 neighbors: 

![[Screen Recording 2026-10-17 at 21.52.31.mp4]]

more complex behavior on a bigger canvas:

![[Screen Recording 2026-10-17 at 21.56.13.mp4]]

same ruleset: 

``` js
/*
advanced 2-d automata; october 17th, 2026.

given a set of cells & their initial state, form a temporary change set & then update the cells. 
*/

//definitions:
//a cell is an object with properties. currently: state.
class Cell {
  constructor(s) {
    this.state = s;
  }
}

//given the number of rows & columns, make a collection of cells.
function make_space(_r, _c) {
  let _sp = [];
  for (let i = 0; i < _r; i++) {
    const row = [];
    for (let j = 0; j < _c; j++) {
      let r = Math.random();

      if (r < 0.5) {
        row.push(new Cell(1000));
      } else {
        row.push(new Cell(0));
      }

      //row.push(
      //  new Cell(
      //    i === Math.floor(_r / 2) && j === Math.floor(_c / 2) ? 5000 : 0,
      //  ),
      //);
    }
    _sp.push(row);
  }
  return _sp;
}

//for everything below, we assume the space is global.

//given a space & position of cell in space, return all its neighbors:
function get_neighbors(_r, _c) {
  //wrapping:
  const at = (i, j) => [((i % r) + r) % r, ((j % c) + c) % c];

  return [
    at(_r - 1, _c - 1), //up-left.
    at(_r - 1, _c), //up.
    at(_r - 1, _c + 1), //up_right.
    at(_r, _c - 1), //left.
    at(_r, _c + 1), //right.
    at(_r + 1, _c - 1), //down_left:
    at(_r + 1, _c), //down.
    at(_r + 1, _c + 1), //down_right:
  ];
}

//render the global space.
function render() {
  for (let i = 0; i < space.length; i++) {
    let line = "";
    for (let j = 0; j < space[0].length; j++) {
      line += space[i][j].state + " ";
    }
    console.log(line);
  }
  console.log("");
}

//given a space, return a matrix of the same shape filled with zeroes.
function make_diff(_sp) {
  return _sp.map((row) => row.map(() => 0));
}

function automaton() {
  let diff_matrix = make_diff(space);

  const displacement = 2;

  //for every cell in the matrix, look at its neighbors & get the change:
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let cell = space[i][j];
      let neighbors = get_neighbors(i, j);

      //a cell can't give away more than it has:
      let has = cell.state;

      for (let n = 0; n < neighbors.length; n++) {
        //can't give more:
        if (has <= 0) break;

        //for each neighbor, if we have more than the neighbor, give to the neighbor at displacement-rate. else don't do anything.
        let neighbor = space[neighbors[n][0]][neighbors[n][1]];

        if (cell.state > neighbor.state) {
          const give = Math.min(displacement, has, cell.state - neighbor.state);
          diff_matrix[i][j] -= give;
          diff_matrix[neighbors[n][0]][neighbors[n][1]] += give;
          has -= give;
        }
      }
    }
  }

  //once all of that is done, we update the space.
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      space[i][j].state += diff_matrix[i][j];
    }
  }
}

//setup:
const r = 100;
const c = 100;

let space = make_space(r, c);

if (typeof window === "undefined") {
  //show the starting state.
  render();

  //main loop:
  let n = 10;
  let counter = 0;

  while (counter <= n) {
    automaton();
    render();
    counter++;
  }
}

```

achieved 2-d automata in cpp. 

``` cpp
#include <array>
#include <cmath>
#include <iostream>
using namespace std;

constexpr int r = 10;
constexpr int c = 10;
constexpr int max_run = 2;

class cell {
 public:
  int state;
  cell(int s = 0) : state(s) {}
};

struct pos {
  int x;
  int y;
};

cell space[r][c];

// change matrix; we only store integer values.

// helper to render:
void render() {
  // to render the space, we go through each item in the space.
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cout << space[x][y].state << " ";
    }
    // after a row:
    cout << "\n";
  }
}

// given # of rows & columns, make a space.
void make_space() {
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      // int val = (x + y) % 2;
      int val = (x == floor(r / 2) && y == floor(c / 2)) ? 255 : 0;
      space[x][y].state = val;
    }
  }
}

// for updation:
array<pos, 8> get_neighbors(int x, int y) {
  int up = (x - 1 + r) % r;
  int down = (x + 1) % r;
  int left = (y - 1 + c) % c;
  int right = (y + 1) % c;

  return {
      pos{up, left},     // up-left.
      pos{up, y},        // up.
      pos{up, right},    // up-right.
      pos{x, left},      // left.
      pos{x, right},     // right.
      pos{down, left},   // down-left.
      pos{down, y},      // down.
      pos{down, right},  // down-right.
  };
}

void update_space() {
  int diff[r][c] = {};
  const int displacement = 2;

  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cell& self = space[x][y];
      array<pos, 8> neighbors = get_neighbors(x, y);

      int has = self.state;

      for (int n = 0; n < 8; n++) {
        if (has <= 0) break;

        pos n_p = neighbors[n];
        cell& neighbor = space[n_p.x][n_p.y];

        if (self.state > neighbor.state) {
          int give = min({displacement, has, self.state - neighbor.state});
          // arduino has its own min function; hence the change:
          //int give = min(displacement, min(has, self.state - neighbor.state));
          diff[x][y] -= give;
          diff[n_p.x][n_p.y] += give;
          has -= give;
        }
      }
    }
  }

  // apply the change set to the space.
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      space[x][y].state += diff[x][y];
    }
  }
}

// automaton function:
int main() {
  int counter = 0;

  // make space; show it once:
  make_space();

  cout << "generation: " << counter << "\n";
  render();
  cout << "\n";
  while (counter < max_run) {
    update_space();
    counter++;

    cout << "generation: " << counter << "\n";
    render();
    cout << "\n";
  }

  return 0;
}


```

made it work with [[multi-actuator build]]. 

---

# 261023: 
need to have a way to have a bounded automata vs an infinite plane. i should be able to specify it when i make the space. 

first, added debug lines: 

``` cpp
void update_space() {
  int diff[r][c] = {};
  const int displacement = 2;

  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cout << "cell: " << x << ", " << y << "\n";

      cell& self = space[x][y];
      array<pos, 8> neighbors = get_neighbors(x, y);

      int has = self.state;

      for (int n = 0; n < 8; n++) {
        //if (has <= 0) break;

        pos n_p = neighbors[n];

        cout << "neighbor n: " << n << "|" << "pos:" << n_p.x << ", " << n_p.y << "\n";

        // skip the ones off the plane:
        if (n_p.x < 0 || n_p.x >= r || n_p.y < 0 || n_p.y >= c) continue;

        cell& neighbor = space[n_p.x][n_p.y];

        if (self.state > neighbor.state) {
          int give = min({displacement, has, self.state - neighbor.state});
          // arduino has its own min function; hence the change:
          // int give = min(displacement, min(has, self.state -
          // neighbor.state));
          diff[x][y] -= give;
          diff[n_p.x][n_p.y] += give;
          has -= give;
        }
      }
    }
  }

  // apply the change set to the space.
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      space[x][y].state += diff[x][y];
    }
  }
}
```

finally reached a stable state automation machine; added parameters to control neighborhood type & whether it's an infinite plane or not. 

``` cpp
/*
2-d automata; advanced; with the option of being on a finite or infinite plane.
*/

#include <algorithm>
#include <array>
#include <cmath>
#include <iostream>
using namespace std;

constexpr int r = 10;
constexpr int c = 10;
constexpr int max_run = 50;

// neighbors stuff:
constexpr int neighborhood = 8;
constexpr bool infinite_plane = false;

class cell {
 public:
  int state;
  cell(int s = 0) : state(s) {}
};

struct pos {
  int x;
  int y;
};

cell space[r][c];

// change matrix; we only store integer values.

// helper to render:
void render() {
  // to render the space, we go through each item in the space.
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cout << space[x][y].state << " ";
    }
    // after a row:
    cout << "\n";
  }
}

// given # of rows & columns, make a space. this function also defines the seed.
void make_space() {
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      //int val = 1;
       int val = (x == floor(r / 2) && y == floor(c / 2)) ? 50 : 0;
      space[x][y].state = val;
    }
  }
}

// neighbors; wrapping on an infinite plane, not wrapping on a finite one:
array<pos, neighborhood> get_neighbors(int x, int y) {
  int up = 0;
  int down = 0;
  int left = 0;
  int right = 0;

  if (infinite_plane == true) {
    // infinite plane:
    up = (x - 1 + r) % r;
    down = (x + 1) % r;
    left = (y - 1 + c) % c;
    right = (y + 1) % c;
  } else {
    // finite plane:
    up = x - 1;
    down = x + 1;
    left = y - 1;
    right = y + 1;
  }

  if (neighborhood == 4) {
    // return von-neumann neighborhood.
    return {
        pos{up, y},     // up.
        pos{x, left},   // left.
        pos{x, right},  // right.
        pos{down, y},   // down.
    };
  } else {
    // return moore neighborhood.
    return {
        pos{up, left},     // up-left.
        pos{up, y},        // up.
        pos{up, right},    // up-right.
        pos{x, left},      // left.
        pos{x, right},     // right.
        pos{down, left},   // down-left.
        pos{down, y},      // down.
        pos{down, right},  // down-right.
    };
  }
}

// mutate the global space.
void update_space() {
  int diff[r][c] = {};  // temporary difference-matrix; starts at zero.

  const int displacement = 5;  // rate at which things are disseminated.
  const int capacity = 10;      // a cell can store a certain amount of energy.

  // go over each cell:
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cell& self = space[x][y];

      //cout << "cell(" << x << ", " << y << ")" << "\n";

      int has = self.state;

      if (has > capacity) {
        // we have stuff to give:

        // for each neighbor, go over them & decide displacement in diff_matrix.
        array<pos, neighborhood> neighbors = get_neighbors(x, y);

        for (int n = 0; n < neighborhood; n++) {
          pos n_p = neighbors[n];

          //cout << "neighbor being checked: " << n_p.x << ", " << n_p.y;

          // finite plane logic: skip neighbors off the edge.
          if (!infinite_plane &&
              (n_p.x < 0 || n_p.x >= r || n_p.y < 0 || n_p.y >= c)) {
            //cout << " -> " << "out of bounds" << "\n";
            continue;
          }

          // in bounds:
          cell& neighbor = space[n_p.x][n_p.y];

          //cout << " -> " << "valid neighbor: " << n_p.x << ", " << n_p.y << "\n";

          // cout << "neighbor(" << x << ", " << y << ")";

          if (self.state > neighbor.state) {
            // i have stuff to give:
            // arduino has its own two-value min; hence the nesting.
            int give = min(displacement, min(has, self.state - neighbor.state));
            diff[x][y] -= give;
            diff[n_p.x][n_p.y] += give;
            has -= give;
          }
        }
      }else{
        //have enough to keep.
        continue;
      }
    }
  }

  // apply the change, and mutate the space:
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      space[x][y].state += diff[x][y];
    }
  }
}

// automaton function:
int main() {
  int counter = 0;

  // make space; show it once:
  make_space();

  // for debug; single run:
  //update_space();

   cout << "generation: " << counter << "\n";
   render();
   cout << "\n";
   while (counter < max_run) {
     update_space();
     counter++;

    cout << "generation: " << counter << "\n";
    render();
    cout << "\n";
  }

  return 0;
}
```

expressed via [[multi-actuator build]]. 


