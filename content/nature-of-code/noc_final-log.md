---
date: 2026-04-05
tags:
  - experiments
noteOrder: "301"
draft: "false"
---
# ask: 
> The project should be a creative project that builds off or is inspired by the concepts we've covered this semester. You should feel free to think non-traditionally, projects do not need to be screen-based and there is no requirement to use a particular aspect of JavaScript or programming. Final projects can be collaborations with anyone in any class. Final projects can be one part of a larger project integrated with a different class.


---
# thought: 
wanted to make something that attempts to 'learn', being inspired from genetic algorithms in [[noc_class-10]]. 

thought it'd be nice to collaborate with someone; chose [[aram]] because of his interest in 'expressive-machines'. 

---
# outputs: 
wip. 

---

spent a little bit of time brainstorming. 

![[260405_noc-brainstorm.webp]]


was pretty sold on the idea that the computer needs to learn how to program. i'd be okay with it being a performative piece too — it has to teach itself to write a simple function of adding something. 

[[aram]] is more ambitious; while i'm more conservative (keeping in mind that i have a big build for [[sound-studio/index|sound-studio]]). 

![[260405_noc-sketch.webp]]

---

after a long session going back & forth, [[aram]] & i froze on our idea:

![[IMG_7745.webp]]

---

i then began to write simple programs to demonstrate the workings of the idea.

made the basic wordle algorithm + added a dictionary for dialogues for each stage (so that the bot can shuffle between dialogues). 

![[Screen Recording 2026-04-15 at 23.50.06.mp4]]

``` js
//260414; noc-final-wip.

let word;

/* 
we use the following states: 
generate -> await -> evaluate -> result -> if right: go to generate; else if wrong: go to wait.
*/
let state = "null";
let p_state = state;

//text to speech stuff:
let speech;

//dialogues are in key-value pairs.
let dialogues = {
  in_generate: [
    "guess this stupid word",
    "hey you — guess the word i'm thinking of",
  ],
  in_await: [],
  in_evaluate: [],
  all_correct: ["ok ... now"],
  some_correct: [
    "nooooo, try again",
    "ugh no you idiot",
    "god no",
    "close but not quite",
  ],
  all_wrong: [
    "god you're so dumb",
    "no you idiot",
    "stupid shit work ... try again and do better",
  ],
};

let input_str;

let result = [];

let attempts = [];

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square to handle calculations better.

  speech = new p5.Speech();

  //assign a random voice. we wait a little bit to run this block of code for it to get all the voices.
  // setTimeout(() => {
  //   let all_voices = speech.voices;
  //   let voice = Math.floor(random(all_voices.length));
  //   speech.setVoice(voice);
  //   console.log("current voice:", all_voices[voice].name);
  // }, 500);
}

function draw() {
  background(0);

  for (let i = 0; i < attempts.length; i++) {
    attempts[i].display();
  }

  if (state === "generate") {
    state = "temp-hold"; //temp state to avoid looping multiple times (because it's in draw).

    //clear previous attempts.
    attempts = []; 

    fetch_word().then((result) => {
      word = result;
      console.log("garbled word -> " + word);
    });

    //say dialogue:
    speech.speak(random(dialogues.in_generate));

    //state change:
    state = "await";

    //prepare input string:
    input_str = "";
  } else if (state === "await") {
    // state = "temp-hold"; //temp state to avoid looping multiple times (because it's in draw).

    show_typing(input_str);

    if (input_str.length === 5) {
      //when it is 5, go to evaluate.
      state = "evaluate";
    }
  } else if (state === "evaluate") {
    result = [];

    for (let i = 0; i < 5; i++) {
      let c = input_str[i];

      if (c === word[i]) {
        result[i] = "correct";
      } else if (word.includes(c)) {
        result[i] = "wrong-pos";
      } else {
        result[i] = "wrong";
      }
    }

    console.log(result);

    attempts.push(new Attempt(input_str, result));

    state = "result";
  } else if (state === "result") {
    let correct = result.filter((r) => r === "correct").length;
    let wrong_pos = result.filter((r) => r === "wrong-pos").length;
    let wrong_char = result.filter((r) => r === "wrong").length;

    let dominant = Math.max(correct, wrong_pos, wrong_char);

    if (dominant === correct) {
      speech.speak(random(dialogues.all_correct));
      state = "generate";
    } else if (dominant === wrong_char) {
      speech.speak(random(dialogues.all_wrong));
      state = "await";
    } else {
      speech.speak(random(dialogues.some_correct));
      state = "await";
    }

    //reset input.
    input_str = "";
  }

  //state change:
  if (state != p_state) {
    console.log("state -> " + state);
  }
  p_state = state;
}

//show what is being typed.
function show_typing(input_str) {
  textSize(24);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < input_str.length; i++) {
    fill(255);
    text(input_str[i], width / 2 - 100 + i * 50, height - 100);
  }
}

function mousePressed() {
  //text to speech needs a user-action to begin everything. so, we keep this to start.
  state = "generate";
}

function keyPressed() {
  if (state === "await") {
    input_str += key;
  }
}

async function fetch_word() {
  let res = await fetch("https://random-word-api.herokuapp.com/word?length=5");
  let data = await res.json();
  word = data[0];

  console.log("og word -> " + word);

  //garble the word:
  let chars = word.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

class Attempt {
  constructor(word, result) {
    this.word = word;
    this.result = result;
  }

  display() {
    let index = attempts.indexOf(this);
    let y = 100 + index * 60;

    textSize(32);
    textAlign(CENTER, CENTER);

    for (let i = 0; i < this.word.length; i++) {
      let x = width / 2 - 100 + i * 50;

      if (this.result[i] === "correct") fill(0, 255, 0);
      else if (this.result[i] === "wrong-pos") fill(255, 200, 0);
      else fill(80);

      text(this.word[i], x, y);
    }
  }
}
```

32 x 32 display matrix: https://cdn-learn.adafruit.com/downloads/pdf/32x16-32x32-rgb-led-matrix.pdf

got the display matrix to work, but it didn't line up well. 

![[IMG_7830.jpg]]

