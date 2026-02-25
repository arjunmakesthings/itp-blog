---
date: 2026-02-23
tags:
  - experiments
noteOrder: "251"
draft: "false"
---
# ask: 
> It is totally reasonable to simply refactor an assignment from previous weeks with new organization ideas (System class, inheritance, higher-order array functions, and more!). Some other ideas (along the lines of the visual design of a particle system) are below and, as usual, you are welcome to invent your own exercise inspired by this week's material!

---

i couldn't do much this week, because of my one-credit [[haptics/index|haptics]] class over the weekend (which ran for 12 hours or so). so, i made something & submitted it for the sake of submitting an assignment.

---

made a quick sketch to get the width of each letter. 

![[Screenshot 2026-02-23 at 22.42.52.webp]]

``` js
// a letter
class Letter {
  constructor(alphabet) {
    this.alphabet = alphabet;

    this.pos = createVector(random(0, width), random(0, height));

    this.w = textWidth(this.alphabet);
    this.h = textAscent() + textDescent();
  }
  display() {
    noStroke(); 
    fill(255);
    text(this.alphabet, this.pos.x, this.pos.y);

    noFill(); 
    stroke (255); 
    rect(this.pos.x, this.pos.y - textAscent(), this.w, this.h);
  }
}
```

lines between the same attract type: 

![[Screenshot 2026-02-24 at 22.20.49.webp]]

whatever. i can't think straight, and i didn't do a good job. but i was very occupied this week because of my one-credit [[haptics/index|haptics]] class. 

![[Screen Recording 2026-02-24 at 22.53.53.mp4]]