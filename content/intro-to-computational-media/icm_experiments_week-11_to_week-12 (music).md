---
date: 2025-11-07
tags:
  - experiments
noteOrder: "172"
draft: "false"
---
became interested in fft (fast-fourier transform). watched [this](https://www.youtube.com/watch?v=FOOQrrOo-II). 

---

saw [it's gonna rain](https://www.youtube.com/watch?v=X1zuX6nRHNk&list=RDX1zuX6nRHNk&start_radio=1), based on [[people/mimi yin|mimi yin]]'s prompt of repeating words becomes music: https://www.theverge.com/2018/6/8/17443170/repeating-words-sound-to-song-auditory-illusion

this argued that brains are pattern-recognition machines.

---
timed beeping program: 

``` js
//music; nov-8th, 2025.

//idea: make oscillators play frequencies over time, in arrangement with each other.

let oscs = [];

function setup() {
  createCanvas(400, 400);

  //ref of waveforms: oscillation takes the form of a sinusoidal shape ('sine'). Additional types include 'triangle', 'sawtooth' and 'square'. The frequency defaults to 440 oscillations per second (440Hz, equal to the pitch of an 'A' note).
  for (let i = 0; i < 3; i++) {
    oscs.push(new p5.Oscillator("sine")); //3 voices / mids.
  }

  oscs[oscs.length] = new p5.Oscillator("triangles"); //bass / low.

  oscs[oscs.length] = new p5.Oscillator("sawtooth"); //synth / highs.

  for (let osc of oscs){
    osc.start(); 
    osc.amp(0); 
  }
}

function draw() {
  background(0);

  let t = int(millis() / 1000);

  console.log(t); 

  if (t%4==0){
    oscs[0].freq(440); 
    oscs[0].amp(1); 
  }
  else{
    oscs[0].amp(0); 
  }
}

```

interesting layers: 

``` js
let oscs = [];

let mid_base = 256; // freq for C4
let low_base = mid_base / 4;
let high_base = mid_base * 6;

let voices = 20;

let scale_multipliers = [1, 1.125, 1.25, 1.33, 1.5, 1.66, 1.875, 2];

function setup() {
  createCanvas(400, 400);

  // mid voices
  for (let i = 0; i < voices; i++) {
    oscs.push(new p5.Oscillator("sine"));
  }

  oscs.push(new p5.Oscillator("triangle")); // bass
  oscs.push(new p5.Oscillator("sawtooth")); // high

  for (let osc of oscs) {
    osc.start();
    osc.amp(0);
  }
}

function draw() {
  background(0);

  let t = int(millis() / 1000);

  if (t % 4 === 0) {
    // staggered mid voices
    for (let i = 0; i < voices; i++) {
      let n = floor(random(scale_multipliers.length));
      oscs[i].freq(mid_base * scale_multipliers[n], 0.5);

      // stagger amplitude with setTimeout
      setTimeout(() => {
        oscs[i].amp(0.5, 0.2);
      }, i * 20); // 100ms delay per oscillator
    }
  } else if (t % 2 === 0) {
    // bass / low voices
    for (let i = 0; i < floor(voices / 2); i++) {
      let n = floor(random(scale_multipliers.length));
      oscs[i].freq(low_base * scale_multipliers[n], 0.25);

      setTimeout(() => {
        oscs[i].amp(0.5, 0.2);
      }, i * 100); // 100ms delay per oscillator
    }
  } else {
    // fade out all
    for (let i = 0; i < oscs.length; i++) {
      oscs[i].amp(0, 50);
    }
  }
}

function mousePressed() {
  userStartAudio();
}

```

made this to experiment with echoed oscillators: https://editor.p5js.org/arjuncodes/sketches/T4kVIhYf4

---
