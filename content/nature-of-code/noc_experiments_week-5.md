---
date: 2026-02-23
tags:
  - experiments
noteOrder: "251"
draft: "true"
---
# ask: 
> It is totally reasonable to simply refactor an assignment from previous weeks with new organization ideas (System class, inheritance, higher-order array functions, and more!). Some other ideas (along the lines of the visual design of a particle system) are below and, as usual, you are welcome to invent your own exercise inspired by this week's material!


---
# thought: 



---
# outputs: 

---

made a quick sketch to get the width of each letter. 

![[Screenshot 2026-02-23 at 22.42.52.png]]

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

