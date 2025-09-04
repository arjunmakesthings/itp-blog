---
date: 2025-09-03
tags:
  - lectures
noteOrder: "17"
draft: "false"
---
# notes: 
- programming is human-invented, and not a 'naturally-occurring' science. 
- discussed a [[intro-to-computational-media/a pretty definition of wonder|a pretty definition of wonder]]. 
- discussed how computer-science programs look at numbers for the sake of numbers (chasing efficiency), while art-school looks at what these numbers could mean for people (creative-potential). 
- mimi asked chat-gpt to draw a {adjective} rectangle. for example, a lonely rectangle. it failed, and becomes a data-point for my [[case against ai]]. 
- she discussed the process of writing code as: make something super specific > abstract > write it in code. for example: 
  ![[z_images/IMG_6106.jpg]]
  in this image, we realise that the most specific way to draw a rectangle is to give 8 coordinates (for all 4 points). however, you can abstract this specificity to give only the diagonal points (since a rectangle is a regular polygon). 
  
  i thought this 'workflow' would be quite helpful, even while thinking of more complicated things. 
- structure while defining a function does not matter. for example: 
  
    ``` js
  function draw(){
  background (220); 
  }
  
  function setup(){
  createCanvas (100,100); 
  }
  ```
  
  this, while looking unintuitive, does the same thing it would even if inverted. this is because p5 calls it in a sequence, and <mark>that's what matters — calling, and not defining</mark>. 
- 

---
# acknowledgements: 



