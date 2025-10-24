---
date: 2025-10-09
tags:
  - experiments
noteOrder: "122"
draft: "false"
---
in my [[hypercinema/conversation with aidan|conversation with aidan]], he mentioned that i should play around with a few generative tools — to see what's possible. i decided to do that. 

---
prompt:
> make an animated line drawing of a stick figure walking on a line and then falling to their death, and contorting all their parts as they do so.

result: 

![[z_images/Screenshot 2025-10-09 at 08\.52\.42.webp]]

it couldn't generate it, even if i tried multiple times. 

---
i thought it'd generate a sound effect. 

![[z_images/Screen Recording 2025-10-09 at 08.57.54.mov]]

so, generate 'audio' is really just generate text-to-speech. 

---
generate image from sketch: 

input: 

![[z_images/Screenshot 2025-10-09 at 08\.59\.53.webp]]

+make this realistic. 

output: 

![[z_images/Gen4 make this realistic 1505587402.webp]]

right. funny. he has his middle finger out — god knows up.

---
i think these justify melanie mitchell's stance in *Artificial Intelligence: A Guide for Thinking Humans*: 

> Above all, the take-home message from this book is that <mark>we humans tend to overestimate AI advances and underestimate the complexity of our own intelligence</mark>. 

---
i <mark>don't enjoy generative image-making</mark>. yes, in the past i've done so to <mark>automate mechanical tasks</mark> (such as <mark>prototype</mark> (images) of abstract ideas), or to generate <mark>fake, but real-looking</mark> objects (such as schools for a project). 

it <mark>takes out all the joy</mark> of the creative-practice, and is <mark>made for scenarios where you don't care about the craft</mark> (such as prototyping). 

---
at this point, i wanted to stray away from 'generative' media, and do something else. the previous night, i read [[complete minimal poems, by aram saroyan]] (given by [[people/allison parrish|allison parrish]]), and wished to do something with letters (also inspired by [rabbit](https://www.youtube.com/watch?v=iYAixjN9BQg)).

but, i didn't want to jump on ideas. so, i reflected (slowly) on the ask and other shared material over the course of hypercinema:

> **brief a:** 
> 
> Choose a film genre and create a <mark>short (less than 2 minutes) video story</mark> in this genre using synthetic media to augment your film in a way impossible with your current budget or available resources.
> 
> **brief b:**
> 
> Create a short (less than 2 minutes) video in which animation is overlaid onto video to <mark>present a speculative future</mark>.
> 
> from the [syllabus](https://docs.google.com/document/d/1q3FwfW1CQ-lesglrc4TPhsskkKoRgaAwVat77XK4CIU/edit?pli=1&tab=t.0).

>the brief is simply a 'jumping off' point. the ask is to make <mark>a piece that interacts with people over time</mark>. 
>
>from [[hypercinema/conversation with aidan|conversation with aidan]]

> This assignment is <mark>about experimentation, not about doing this correctly</mark>. It’s alright to go down a path that doesn’t work as long as you show documentation and explain the intent behind your concept and the thinking that brought you there. 
> 
> from the [syllabus](https://docs.google.com/document/d/1q3FwfW1CQ-lesglrc4TPhsskkKoRgaAwVat77XK4CIU/edit?pli=1&tab=t.0).

> <mark>a medium</mark> is not something neutral. It <mark>does something to people</mark>. It takes hold of them, it rubs them up, it massages them, it bumps them around.
> 
> from [the medium is the massage](https://www.themediumisthemassage.com/and-so-the-title-is-intended-to-draw-attention-to-the-fact-that-a-medium-is-not-something-neutral-it-does-something-to-people-it-takes-hold-of-them-it-rubs-them-up-it-massages-them-it-bumps-them/), by marshall mcluhan.

> “<mark>Everything happens at once</mark>. There’s no continuity, there’s no connection, there’s no follow through. <mark>It’s just all now</mark>.
> 
> marshall mcluhan.

the idea then became about: 

express the <mark>vision of a personal future</mark>, between you & i, in a time-based-experience; where <mark>you are in control of the time</mark>. <mark>you choose to let the story go ahead, to pause it, or to walk away</mark>. 

i also leveraged the fact that my work is <mark>bound to have an audience</mark>, given the premise of the class. so, i wanted to experiment and <mark>find out how people perceive my thought</mark>.

visually, the project would feel similar to: 
- [aram saroyan's minimalist poems](https://teachingpoetryandart.weebly.com/aram-saroyan.html)
- [tiny love letters](https://arjunmakesthings.github.io/projects/2023-25_tiny-love-letters/page.html); me, 2023-25.
- [dear delhi](https://arjunmakesthings.github.io/projects/2021_dear-delhi/page.html); me, 2021.

---
next, i proceeded to think about the arc of my piece / the story i want to tell. 

![[z_images/IMG_6651.webp]]

realised i needed to see the actual thing — to decide the storytelling. 

fought against this urge. i want to tell a story.

---
the story is that <mark>the world will be dominated by numbers & algorithms</mark>, while <mark>you & i will have <i>some</i> humanity left</mark>. we'll <mark>find each other in moments of time, but never be with each other</mark> (because of the pace of the world). 

we'll <mark>always be dominated by numbers & algorithms</mark>.

each frame will be a-5 in size. that gives me enough space to play with.

---
did type tests: 

![[z_images/Screenshot 2025-10-11 at 23\.09\.34.webp]]

sadly, a lot of monospaced-fonts don't have a plain zero. they either have a dot or a slash. the dots look like eyes though, so i might keep them.

there are inconsistencies in sizing too.

![[z_images/Screenshot 2025-10-11 at 23\.12\.12.webp]]
<figcaption>both at 16pts.</figcaption>

ratio that works is 16:13.2419; normal:medium.

used chatgpt to generate many, many 0s & 1s. maybe later, i might hide messages via binary in my film (or whatever this is going to turn out to become).

![[z_images/Screenshot 2025-10-11 at 23\.14\.59.webp]]

tried runway to generate reference images.

![[z_images/Screenshot 2025-10-11 at 23\.29\.26.webp]]

i then made a frame on illustrator, and then tried to animate it with runway.

![[z_images/frame.webp]]
<figcaption>frame fed to runway.</figcaption>

prompt: 
> can you animate the 1s and 0s on this? to make them always change? 
> 
> i just need the 1s and 0s to keep swapping between 1s and 0s, nothing else.
> 
> don't touch anything else.

output:

![[z_images/Screen Recording 2025-10-11 at 23.50.57.mov]]

prompt 2:

> in this image, animate the 1s and 0s to keep swapping between 1 and 0. 
> 
> don't touch anything else, and don't add any extra movement.

i can't even. what?!

output:
![[z_images/Gen-4 in this image, animate the 1s and 0s to keep swapping between 1 and 0 don't touch anything else, and don't add any extra movement 3430377497.mp4]]

---
i think i need to make a video with 0s and 1s flipping, and use those as a mask everywhere. 

---
i printed out the sheets to test the typography.

![[z_images/IMG_6672.webp]]

i'm convinced with using cheap printer paper (perhaps cardstock later), a6; and make them many flipbooks. 

i wrote a piece of code: 

``` js
//0s and 1s to print on a6 sheets.

//a6 at 300 dpi.
let pw = 298;
let ph = 420;

let side_margins = 30;
let edge_margins = 100;

//font sizes:
const foreground = 10;
const max_background = 4.5;

//font variables:
let serif; //noto.
let mono; // source.

//colour variables:
let red = "#c02126";
let grey = "#bcbec0";
let bg = 255;
let black = 0;

let binaries = [];

let pdf; 

function preload() {
  serif = loadFont("./noto-serif-hebrew_regular.ttf");
  mono = loadFont("./source-code-pro_medium.ttf");
}

function setup() {
  createCanvas(pw, ph);

  //set defaults:
  noStroke();

  //create binaries:
  for (let x = side_margins; x <= width - side_margins; x += max_background) {
    for (let y = edge_margins; y <= height - edge_margins; y += max_background) {
      binaries.push(new Binary(x, y));
    }
  }

  pdf = createPDF(); 
  pdf.beginRecord(); 
}

function draw() {
  background(bg);

  //display all binaries:
  for (let binary of binaries) {
    binary.display();
  }
  pdf.save(); 
  noLoop(); 
}

class Binary {
  constructor(x, y, w, h) {
    //construction is the same as a rectangle.
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.t = random(["0", "1"]);
  }
  display() {
    // push();

    //set defaults:
    textAlign(LEFT, TOP);

    fill(grey);

    textFont(mono);
    textSize(max_background);
    text(this.t, this.x, this.y);

    // pop();
  }
}
```

and then exported it as a pdf and printed it. but the size / resolution weren't proper because of the ppi conversion. 

![[z_images/IMG_6673.webp]]

so, i figured out that when i do `pdf.save()`, i need to open it with the system dialogue otherwise it auto-scales the work.

![[z_images/IMG_6674.webp]]

so, i figured out the ideal print settings. 

it's to multiply everything by 2, and then scale it back 50% using the print dialogue. that gives me a high resolution to print.

![[z_images/IMG_6683 1.webp]]

code: 

``` js
//0s and 1s to print on a6 sheets.

//a6 at 300 dpi.
let pw = 298 * 2;
let ph = 420 * 2;

let side_margins = 30 * 2;
let edge_margins = 100 * 2;

//font sizes:
const foreground = 10 * 2;
const max_background = 4.5 * 2;

//font variables:
let serif; //noto.
let mono; // source.

//colour variables:
let red = "#c02126";
let grey = "#bcbec0";
let bg = 255;
let black = 0;

let binaries = [];

let pdf;

function preload() {
  serif = loadFont("./noto-serif-hebrew_regular.ttf");
  mono = loadFont("./source-code-pro_medium.ttf");
}

function setup() {
  createCanvas(pw, ph);

  //set defaults:
  noStroke();

  //create binaries:
  for (let x = side_margins; x <= width - side_margins; x += max_background) {
    for (let y = edge_margins; y <= height - edge_margins; y += max_background) {
      binaries.push(new Binary(x, y));
    }
  }

  pdf = createPDF();
  pdf.beginRecord();
}

function draw() {
  background(bg);

  //frame:
  push();
  stroke(190);
  rect(0, 0, width, height);
  pop();

  //display all binaries:
  for (let binary of binaries) {
    binary.display();
  }
  // pdf.save();

  noLoop();
}

class Binary {
  constructor(x, y, w, h) {
    //construction is the same as a rectangle.
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.t = random(["0", "1"]);
  }
  display() {
    // push();

    //set defaults:
    textAlign(LEFT, TOP);

    fill(grey);

    textFont(mono);
    textSize(max_background);
    text(this.t, this.x, this.y);

    // pop();
  }
}
```

this will waste a little bit of paper though. let's see. i'm going to now work on the code to animate the frames.

as i began to program, i realised that the story i wanted to tell was that of numbers & data standing in the way of us meeting.

this is also programmatically nicer to achieve. 

![[z_images/Screen Recording 2025-10-15 at 20.58.51.mov]]

i need to now write a scaffold, and then use that to generate 'scenes'. i know i can do better — in terms of storytelling, and visual-design, but it's an interesting line of enquiry — and i *just* want to explore that for now.

now i have a scaffold. i can just make the background & foreground characters. 

``` js
//0s and 1s to print on a6 sheets.

//a6 at 72*2 dpi.
let pw = 298 * 2;
let ph = 420 * 2;

let side_margins = 30 * 2;
let edge_margins = 100 * 2;

//font sizes:
const foreground = 10 * 2;
const max_background = 4.5 * 2;

//font variables:
let serif; //noto.
let mono; // source.

//colour variables:
let red = "#c02126";
let grey = "#bcbec0";
let bg = 255;
let black = 0;

let binaries = [];
let characters = [];

let pdf;
let pdf_shit = false; //change this to save as pdf.

function preload() {
  serif = loadFont("./noto-serif-hebrew_regular.ttf");
  mono = loadFont("./source-code-pro_medium.ttf");
}

function setup() {
  createCanvas(pw, ph);

  frameRate(12);

  //set defaults:
  noStroke();

  make_binaries();
  make_characters();

  if (pdf_shit == true) {
    pdf = createPDF();
    pdf.beginRecord();
  }
}

//binary-constructor(x, y, w, h).
function make_binaries() {
  for (let x = side_margins + foreground; x <= width - side_margins - foreground; x += max_background) {
    let y_pos = random(edge_margins, height - edge_margins);
    for (let y = y_pos; y <= height - edge_margins; y += max_background) {
      binaries.push(new Binary(x, y));
    }
  }
}

//character-constructor: constructor(x, y, t, t_size).
function make_characters() {
  characters[0] = new Character(side_margins, height - edge_margins - foreground, "i", foreground);
  characters[1] = new Character(width - side_margins, height - edge_margins - foreground, "u", foreground);
}

function draw() {
  background(bg);
  //frame:
  // push();
  // stroke(190);
  // noFill();
  // rect(0, 0, width, height);
  // pop();

  //display all binaries:
  for (let binary of binaries) {
    binary.display();
  }

  //display characters:
  for (let character of characters) {
    character.display();
  }

  if (pdf_shit == true) {
    pdf.save();
  }

  // noLoop();
}

class Binary {
  constructor(x, y) {
    //construction is the same as a rectangle.
    this.x = x;
    this.y = y;


    this.t = random(["0", "1"]);
  }
  display() {
    push();

    //set defaults:
    textAlign(LEFT, TOP);

    fill(grey);

    textFont(mono);
    textSize(max_background);
    text(this.t, this.x, this.y);
    this.t = random(["0", "1"]);

    pop();
  }
}

class Character {
  constructor(x, y, t, t_size) {
    //construction is the same as a rectangle.
    this.x = x;
    this.y = y;

    this.t = t;
    this.t_size = t_size;
  }
  display() {
    push();

    //set defaults:
    textAlign(LEFT, TOP);

    fill(red);

    textFont(serif);
    textSize(this.t_size);
    text(this.t, this.x, this.y);

    pop();
  }
}

```

---

i'm sleepy. 

so, i thought to use chatgpt to see if it could take my structure and then make objects as i tell it to. this was my prompt to it:

![[z_images/Screenshot 2025-10-15 at 23\.30\.18.webp]]

this was my first prompt: 

> i want the binaries like buildings, between the two characters. so, make rectangles of varying heights (not actual rectangles, but from the binaries) between them.

after some modifications and re-prompting, i have this: 

![[z_images/Screen Recording 2025-10-15 at 23.39.23.mov]]

i think my outcome is going to be a <mark>clean webpage</mark>, with these <mark>sketches that look different every time</mark> you load the webpage, and <mark>each communicating a single message about the future between u & i</mark>.


![[z_images/Screen Recording 2025-10-15 at 23.47.58.mov]]

---
next prompt: 

> now, i want you to create a sort of phone signal that goes from character[0] to character [1]. 
> 
> a phone signal is made up of a certain number of binaries (you decide that / make it random based on some range). it's a line of binaries of a certain length. this line bounces across the screen to eventually reach the other character. all the bouncing happens above the characters of course (much like phone waves). 
> 
> once it reaches the second character (say character [1]), then a new phone signal from that character is produced which goes to the other character (character[0]). 
> 
> at any given point in time, there is only one phone signal visible. it's like ping-pong. 

it broke then. 

![[z_images/Screenshot 2025-10-15 at 23\.54\.40.webp]]

![[z_images/Screenshot 2025-10-15 at 23\.57\.01.webp]]
<figcaption>do you though?</figcaption>

eeeeeeek, i'm so happy with this one!

![[z_images/vid 3.mov]]

i think the <mark>project can be called future meanderings</mark> — a series of speculations about a data-driven (?) world. 

---
i wrote a bunch of drafts for phrases in a short poem. i didn't do a good job. i don't have a lot of time.

![[z_images/Screenshot 2025-10-20 at 20\.07\.11.webp]]

i have the kernel of a finished idea. i'm going to try. 

i now have to make visuals for these lines: 

> all i see are numbers on the street. 
> 
> sometimes, i catch a speck of u.
> 
> my speaking never reaches u.
> 
> are we the only ones stuck with humanity? 

they are four visual poems. each line has layers — but i'll see if the audience can grasp them. or have i become too abstract? i'll see.

i then thought that it would be an interesting workflow, if i could give an engine an image reference, describe something, give it my code structure (like i gave chatgpt), and make it generate that visual.

![[z_images/Screenshot 2025-10-20 at 20\.23\.19.webp]]

![[z_images/Screenshot 2025-10-20 at 20\.35\.42.webp]]

i then resorted back to gpt. i gave it a visual reference.

![[z_images/Screenshot 2025-10-20 at 20\.39\.31.webp]]

we're kind to each other: 

![[z_images/Screenshot 2025-10-20 at 20\.50\.18.webp]]

i realise that with repeated commands, it freezes sometimes — and loses context then. <mark>maybe chatgpt has a very short-duration context grasp</mark> (which it stores during conversation, and maintains a flow) but then later, it starts a new (or from a saved state). 

great. i have all the frames. they're all git branches. i should've probably made them different sketches, to be able to view them individually. 

i'll do that now.

![[z_images/Screenshot 2025-10-20 at 21\.21\.49.webp]]

i have all the frames. now i'm going to mess around with the thought i had earlier. 

![[z_images/Screen Recording 2025-10-20 at 21.56.38.mov]]

---
i'm going to give the first frame of each sketch to runway, and describe the idea that i want elaborately. i'm going to follow the same structure for my commands to runway for each frame. by runway, i mean aleph. 

i know from my past experience that it's going to give me bullshit — and that it's going to 'creatively' reinterpret my instructions. i'll actually deliberately not be insanely-precise, and be more conceptual; as per aidan's advice of "make something ugly". 

then, i'm going to make a website titled: dear runway, i wanted to make a simple film with you. 

on the website, i'm going to lay out both videos — one of my canvas (perhaps the canvas itself), and the one that runway generated; with a small text to see the prompt below the generated video. in the center is going to be my thought for that frame.

here goes: 

---
i first read about what runway [shares](https://help.runwayml.com/hc/en-us/articles/43277392678803-Aleph-Prompting-Guide) about prompting aleph: 

> There are <mark>no strict rules</mark> for prompting with Aleph, but <mark>simplicity works best</mark>. 
> 
> source: https://help.runwayml.com/hc/en-us/articles/43277392678803-Aleph-Prompting-Guide

> An action verb that describes what you want to do (such as add, remove, change, replace, re-light, and re-style)
> 
> A description of your desired transformation
> 
> source: https://help.runwayml.com/hc/en-us/articles/43277392678803-Aleph-Prompting-Guide

> Upload an image and draft your prompt in the text box. See our Gen-4 Prompting Guide for a comprehensive overview of prompting.
> 
> Your text prompts should focus on describing the desired motion. You do not need to describe the contents of the image.
> 
> source: https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video

> Rather than starting with an overly complex prompt, we recommend <mark>beginning your session with a simple prompt, and iterating by adding more details as needed</mark>.
> 
> https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide

but that's counterintuitive. i'm going to voluntarily break this. 

# important: 
a person, when using an ai-tool, uses it to give form to their imagination. their imagination doesn't come in doses — it contains a full idea, often with an image in their head. the job of the tool (as portrayed) is to, somehow, magically bring the thought-vision to life (without ever having direct interaction with the vision).  

crap, i've been using runway wrong all along. i wonder why we were never told this. anyway, i'll *pretend* i didn't see this (not everyone who uses runway is going to browse through their documentation at 2300hrs.). 

![[z_images/Screenshot 2025-10-20 at 22\.18\.54.webp]]

---
# prompts, inputs & outputs: 
experiment ran at 2220, 251020. 

image: 

![[z_images/frame-1.webp]]

text: 

> this is a story about two characters — u & i. this is the first shot. i assume you don't need context of the story, and just care about the shot. 
> 
> here, i want the 0s and 1s to simply alternate between 0 & 1; as if a building of data separates the two characters. 

output: 
![[z_images/frame-1_output_runway.mp4]]

---

image: 

![[z_images/frame-2.webp]]


prompt: 

> i want the 1s and 0s to walk by the "i", as if the "i" is standing in the middle of a very crowded street (say, in new york). 
> 
> the shot is in one-point perspective, but only in pseudo-perspective (since the "i" is as is"). the horizon is at the top of the screen.

output: 

![[z_images/Gen-4 i want the 1s and 0s to walk by the i, as if the i is standing in the middle of a very crowded street (say, in new york) the shot is in one-point perspective, but only in pseudo-perspective (si.mp4]]

---
image: 

![[z_images/frame-3.webp]]

prompt: 

> this is "i" looking out the window, and catching a speck of "u" sometimes.
> 
> make the 1s & 0s alternate between 1 & 0. after every second, replace the u with a 1 / 0, and make the u go to a different position. 

output: 

![[z_images/frame-3_output_runway.mp4.mp4]]

---
image: 

![[z_images/frame-4.webp]]

prompt: 

> this is "i" sending phone signals to "u", but they never reaching "u". 
> 
> after every second, make a new phone signal composed of 0s & 1s that start from "i", and bounce around the room but never reach "u". 

output: 

![[z_images/frame-4_output_runway.mp4]]

---
image: 

![[z_images/frame-5.webp]]

prompt: 

> this is "i" and "u" wondering whether they're the only ones stuck with humanity, in a world of binaries.
> 
> simply make the 1s and 0s alternate between 1 and 0. don't change anything else.

output: 

![[z_images/frame-5_output_runway.mp4]]

---
great. now, i'll make the website. 

i spent time thinking about the structure, programmed it, and then served it via github-pages. [[people/james|james]] helped me with correcting my link paths, because my fonts & stuff weren't loading. 

my outcome is available here: https://arjunmakesthings.github.io/hypercinema_2510/. repo is here: https://github.com/arjunmakesthings/hypercinema_2510

a video is below: 

![[z_images/hypercinema_midterm_scroll.mp4]]

---
# with aidan; 251021: 

images from comfyui contain metadata, which can be uploaded to comfyui (and it shows the workflow). 


https://comfyanonymous.github.io/ComfyUI_examples/

https://comfyui-wiki.com/en/tutorial/advanced/video/wan2.1/wan2-1-video-model#11-download-wan21-text-to-video-workflow-file

https://comfyanonymous.github.io/ComfyUI_examples/wan/




















