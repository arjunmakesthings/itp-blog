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
- she discussed the process of writing code as: <mark>make something super specific > abstract > write it in code</mark>. for example: 
  ![[z_images/IMG_6106.jpg]]
  in this image, we realise that the most specific way to draw a rectangle is to give 8 coordinates (for all 4 points). however, you can abstract this specificity to give only the diagonal points (since a rectangle is a regular polygon). 
  
  i thought this 'workflow' would be quite helpful, even while trying to solve more complicated problems. 
- structure while defining a function does not matter. for example: 
  
``` js
  function draw(){
  background (220); 
  }
  
  function setup(){
  createCanvas (100,100); 
  }

```

- this, while looking unintuitive, does the same thing it would even if inverted. this is because p5 calls it in a sequence, and <mark>that's what matters — calling, and not defining</mark>. 

- think of setup as setting up an environment — <mark>what variables in my environment must remain constant?</mark> 

---
# note on formatting-difference from the rest of the posts: 
for some reason, markdown converts my list above (of bullet points) to text, every time i add an image / code block. hence the formatting-difference. i might just move to paragraphs as the standard now. 