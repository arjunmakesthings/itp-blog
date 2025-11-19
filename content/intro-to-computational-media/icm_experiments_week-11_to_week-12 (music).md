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
made a sequencer, inspired by [[people/luisa pereira|luisa pereira]]'s work somewhere (on the code of music): 

![[z_images/Screen Recording 2025-11-11 at 22.11.30.mov]]

``` js
//attempt to make a sequencer; november, 2025.

let cells = [];
let start_x, start_y;
let is_dragging = false;

let r_height = 20;

let player_x = 0;
let restart = false;

function setup() {
  createCanvas(400, 800);
}

function draw() {
  background(0);

  ui();

  for (let cell of cells) {
    cell.display();
  }

  //show preview for each rectangle being drawn:
  if (is_dragging) {
    noFill();
    stroke(255);
    rect(start_x, start_y, mouseX - start_x, r_height);
  }
  player();
}

function ui() {
  stroke(100);
  for (let x = 0; x <= width; x += 10) {
    line(x, 0, x, height);
  }
}

function player() {
  stroke(255);
  line(player_x, 0, player_x, height);
  player_x++;

  if (player_x >= width) {
    restart = true;
  }

  if (restart) {
    player_x = 0;
    restart = false;
  }

  for (let i = 0; i < cells.length; i++) {
    if (player_x >= cells[i].x && player_x <= cells[i].x + cells[i].w) {
      cells[i].c = 190;
      cells[i].sound();
    } else {
      cells[i].c = 255;
      cells[i].stop();
    }
  }
}

function mousePressed() {
  start_x = mouseX;
  start_y = mouseY;

  is_dragging = true;
}

function mouseReleased() {
  is_dragging = false;
  let end_x = mouseX;
  let w = end_x - start_x;

  let freq = constrain(map(mouseY, 0, height, 500, 40), 40, 500);

  cells.push(new Cell(start_x, start_y, w, freq));
}

class Cell {
  constructor(x, y, w, freq) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = r_height;
    this.c = 255;

    this.play = false;

    this.freq = freq;
    this.osc = new p5.Oscillator("sine");
    this.osc.freq(this.freq);
    this.osc.amp(0);
    this.osc.start();

    this.playing = false;
  }
  display() {
    noStroke();
    fill(this.c);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  sound() {
    this.playing = true;
    if (this.playing == true) {
      this.osc.amp(1, 0.1);
    }
    this.playing = false;
  }

  stop() {
    this.osc.amp(0, 0.1);
  }
}

```

---
### 251116: 
[[nnenna]] & i met, and spoke about what we were curious about: 

![[image-5.png]]

we both decided to experiment with messing up the microphone-input. i was inspired by [manaswi's work](https://manaswimishra.com/portfolio/fmdum-live-performing-indian-music-through-a-filter-of-foundation-models/).

---
### 251117: 
looked at parameters of a recorded sound file. 

![[Screenshot 2025-11-17 at 18.39.04.png]]

fft somehow doesn't take an audio file unless it plays. so, i kept getting zeroes.

``` js
//intent: take mic-input, analyse its frequency, and loop it for a certain duration of time.

let record_button;
let mic, recorder, recording_file;
let can_play = false;

let voices = [];

let fft; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio();

  record_button = createButton("record");
  record_button.position(width / 2, height / 2);

  record_button.mousePressed(begin);
  record_button.mouseReleased(end);

  mic = new p5.AudioIn();
  mic.start();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  recording_file = new p5.SoundFile();
  fft = new p5.FFT();

  frameRate(1);
}

function begin() {
  record_button.html("stop");

  recorder.record(recording_file);
}

function end() {
  record_button.html("record");

  recorder.stop();

  //perform fft analysis.
  fft.setInput(recording_file); 
  let frequencies = fft.analyze();

  console.log(max(frequencies)); 


  voices.push(new Voice(recording_file)); 
}

function draw() {
  background(0);

  for (let voice of voices){
    voice.display();
  }
}

class Voice {
  constructor(recording_file) {
    this.sound_file = recording_file;

    this.x = 50;
    this.y=height/2; 
  }

  display() {
    console.log(this.sound_file); 
    rect (this.x, this.y, this.sound_file.buffer.duration*10, 50); 
    noLoop();
  }
}

```

i then met with [[people/nnenna|nnenna]]. she had made slow progress, but wanted to do something with mapping voice to an oscillator. i went back home, and played around with the piece of code i'd written earlier. 

![[z_images/music performance.mp4]]

code: 

``` js
//intent: take mic-input, analyse its frequency, and loop it for a certain duration of time.

let record_button;
let mic, recorder, recording_file;
let can_play = false;

let voices = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio();

  record_button = createButton("record");
  record_button.position(width / 2, height / 2);

  record_button.mousePressed(begin);

  record_button.mouseReleased(end);

  mic = new p5.AudioIn();
  mic.start();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  recording_file = new p5.SoundFile();
}

function begin() {
  record_button.html("stop");

  let current_file = new p5.SoundFile();
  recorder.record(current_file);

  recording_file = current_file;
}

function end() {
  record_button.html("record");

  recorder.stop();

  setTimeout(() => {
    //fft needs you to play the recording first. so do that:
    recording_file.play();

    let fft = new p5.FFT();

    //once it ends, analyse the frequency:
    recording_file.onended(() => {
      fft.setInput(recording_file);
      let frequencies = fft.analyze();

      let maxAmp = 0;
      let maxIndex = 0;
      for (let i = 0; i < frequencies.length; i++) {
        if (frequencies[i] > maxAmp) {
          maxAmp = frequencies[i];
          maxIndex = i;
        }
      }

      let nyquist = sampleRate() / 2;
      let freqPerBin = nyquist / frequencies.length;
      let dominant_freq = maxIndex * freqPerBin;

      console.log("dominant frequency (hz):", dominant_freq);

      //now push into voices:
      voices.push(new Voice(recording_file, dominant_freq, 60));

      //set it to play on loop:
      // recording_file.loop();
    });
  }, 100); // small buffer to ensure recording buffer is ready
}

function draw() {
  background(0);

  for (let voice of voices) {
    voice.display();
    voice.update();
  }
}

class Voice {
  constructor(recording_file, dominant_freq, bpm) {
    this.sound_file = recording_file;
    this.freq = dominant_freq;

    this.x = voices.length * 20;
    this.y = map(this.freq, 75, 1200, height - 50, 50); //mapped to human vocal range: https://en.wikipedia.org/wiki/Vocal_range

    //got bpm stuff from chat-gpt.
    this.bpm = bpm;
    this.interval = 60 / this.bpm; // seconds per beat
    this.nextPlayTime = 0;
    this.isPlaying = false;

    this.harmonies = floor(map(this.freq, 75, 1200, 2, 20));
    this.oscs = [];
    this.delays = [];

    let scales = [1.0, 1.059, 1.122, 1.189, 1.26, 1.335, 1.414, 2.0]; //nnenna's scale.

    for (let i = 0; i < this.harmonies; i++) {
      let osc = new p5.Oscillator("sine");
      let n = floor(random(scales.length));
      osc.freq(this.freq * scales[n]);
      osc.amp(0);
      osc.start();

      this.oscs.push(osc);
      this.delays.push(random(0, 0.2)); // small stagger
    }
  }

  update() {
    let t = millis() / 1000; // current time in seconds

    if (t >= this.nextPlayTime) {
      if (!this.isPlaying) {
        // fade in oscillators with staggered delays
        for (let i = 0; i < this.oscs.length; i++) {
          let osc = this.oscs[i];
          let d = this.delays[i];
          setTimeout(() => {
            osc.amp(0.6, 0.15);
          }, d * 1000);
        }
        this.isPlaying = true;
      } else {
        // fade out all oscillators, but in the same way they were brought in. otherwise they create static.
        for (let i = 0; i < this.oscs.length; i++) {
          let osc = this.oscs[i];
          let d = this.delays[i];
          setTimeout(() => {
            osc.amp(0, 0.15);
          }, d * 1000);
        }
        this.isPlaying = false;
      }

      this.nextPlayTime = t + this.interval;
    }
  }

  display() {
    fill(this.isPlaying ? color(0, 255, 0) : color(255, 0, 0));
    rect(this.x, this.y, 50, 30);
  }
}
```



