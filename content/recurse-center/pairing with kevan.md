---
date: 2026-06-25
tags:
  - learning
  - reflections
noteOrder: "367"
draft: "false"
---
paired with [[kevan]] on getting the dumas dutil message on a 96 x 38 led matrix. 

![[IMG_8103.mp4]]

we were writing one line of code to make the viewer bounce, and i realized how much more rigorous his programming was. instead of just throwing things around and considering them to be 'good enough', he was very focused on covering every single possibility; such as making sure the viewer's bouncing is all inclusive: 

```js
  constrain() {
    if (this.pos.x <= 0 || this.pos.x + 1 >= 127 * 6 - 96) {
      this.xspeed *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y + 1 >= 127 * 4 - 38) {
      this.yspeed *= -1;
    }
  }
```

he also wrote a very smart algorithm to derive the messages from [[blinry]]'s original image(s). 

``` js
  let pix = 0; // pixel index, not RGBA-value-index
  for (let row = 0; row < 4; row++) {
    // skip 72 rows
    pix += 72 * img.width;
    for (let i = 0; i < 127; i++) {
      for (let col = 0; col < 6; col++) {
        // skip 72 pix
        pix += 72;
        // read 1270 as 127
        for (let j = 0; j < 127; j++) {
          stripped_px.push(img.pixels[pix * 4]);
          pix += 10;
        }
        // skip 72
        pix += 72;
      }
      // skip 9.
      pix += 9 * img.width;
    }
    // skip 72 rows
    pix += 72 * img.width;
  }
```

