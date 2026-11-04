---
date: 2026-11-03
tags:
  - experiments
noteOrder: "568"
draft: "false"
---
first sketch: 

![[IMG_8677.webp|331]]

i made a low fidelity prototype (think one face). 

![[IMG_8676.webp|422]]

the programming needs to be like so: 

``` cpp
/*
to flash on each board.
*/

int mic = A0; 
int speaker = 8; 

void setup() {
  Serial.begin(9600); 

  pinMode(A0, INPUT); 
  pinMode(8, OUTPUT); 
}

void loop() {
  listen(); 
}

void speak(){
  
}

void listen(){
//
}

```

since i didn't have time, i told claude to expose certain things from the listening, that i could then encode into the speaking: 

``` cpp
/*
nano 33 iot. sparkfun electret breakout (60x preamp, output biased
at vcc/2): vcc -> 3.3v, gnd -> gnd, AUD -> A0 directly (no series cap).
piezo on d8.

listen() fills a Features struct once per frame (~32ms).
decide() reads it and calls speak(). edit decide() and the tuning
constants; leave the rest alone.

quiet reads ~2048 (12-bit). if f.peak nears 2048 the preamp is clipping.
*/

#include <math.h>

const int MIC_PIN   = A0;
const int PIEZO_PIN = 8;

// sampling
const int   N        = 256;     // frame size, power of 2
const float TARGET_FS = 8000.0; // actual rate is measured per frame

// band edges (hz)
const float LOW_MAX = 300.0;
const float MID_MAX = 1500.0;

// onset / noise tuning
const float ONSET_RATIO   = 2.5;  // rms must exceed noise floor * this
const float ONSET_RISE    = 1.5;  // and exceed previous rms * this
const float FLOOR_RISE    = 0.002;// how fast the noise floor creeps up
const float FLOOR_FALL    = 0.2;  // how fast it drops to a quieter level
const float ENV_SMOOTH    = 0.3;  // 0..1, higher = snappier envelope
const int   ONSET_COOLDOWN_MS = 120;
const float MIN_PITCH_MAG = 15.0; // fft peak below this = "no pitch"
const int   ZC_HYST       = 20;   // zero-cross hysteresis (adc counts)

struct Features {
  // amplitude (adc counts, 12-bit)
  float dc;          // mean level
  float peak;        // max |sample - dc|
  float p2p;         // peak to peak
  float rms;
  float envelope;    // smoothed rms
  float noiseFloor;  // slow estimate of ambient rms
  float level;       // rms / noiseFloor, ~1 = silence

  // pitch
  float freq;        // dominant frequency (hz), 0 if none
  float freqMag;     // strength of that peak
  float zcFreq;      // zero-crossing frequency (hz), cheap/rough

  // spectrum
  float low, mid, high;   // band energy share, sums to ~1
  float centroid;         // spectral centroid (hz), "brightness"
  float flatness;         // 0 = tonal, 1 = noisy

  // events
  bool  onset;            // true on the frame a new sound starts
  int   onsetCount;       // total onsets since boot
  unsigned long sinceOnset;   // ms since last onset
  unsigned long sinceQuiet;   // ms since it was last quiet
  unsigned long ioi;          // ms between the last two onsets
  float bpm;                  // 60000 / ioi, 0 if unknown
  bool  quiet;
  bool  self;             // true if the piezo was sounding this frame

  float fs;               // measured sample rate
};

Features f;

float re[N], im[N];
float mag[N / 2];
unsigned long speakingUntil = 0;
unsigned long lastOnset = 0, lastQuiet = 0;

const unsigned long INIT_MIN_MS = 3000;   // random silence before starting a conversation
const unsigned long INIT_MAX_MS = 10000;
const int INIT_LOW_HZ  = 300;             // pitch range for a random opener
const int INIT_HIGH_HZ = 1500;

unsigned long lastActive = 0;  // last time anything was heard or said
unsigned long initAfter  = 0;

void setup() {
  Serial.begin(115200);
  pinMode(MIC_PIN, INPUT);
  pinMode(PIEZO_PIN, OUTPUT);

  analogReadResolution(12);
  analogRead(MIC_PIN);
  // faster adc clock so we can actually hit ~8khz
  ADC->CTRLA.bit.ENABLE = 0;
  while (ADC->STATUS.bit.SYNCBUSY);
  ADC->CTRLB.bit.PRESCALER = ADC_CTRLB_PRESCALER_DIV64_Val;
  ADC->CTRLA.bit.ENABLE = 1;
  while (ADC->STATUS.bit.SYNCBUSY);

  f.noiseFloor = 0;
  randomSeed(analogRead(A1));  // A1 left floating, so each unit differs
  initAfter = random(INIT_MIN_MS, INIT_MAX_MS);
}

void loop() {
  listen();
  decide();
  report();
}

// ---------------------------------------------------------------- rules

// your rules go here. everything you can sense is in f.
const int   SPEAK_MS   = 600;  // how long each reply lasts
const int   GAP_MS     = 300;  // silence after speaking, so units take turns
const float HEAR_LEVEL = 3.0;  // f.level needed to count a sustained tone as heard

void decide() {
  unsigned long now = millis();
  if (f.self) { lastActive = now; return; }  // don't react to our own voice
  if (now < speakingUntil + GAP_MS) return;  // taking turns

  bool heard = f.onset || f.level > HEAR_LEVEL;
  if (heard) lastActive = now;

  // answer what we hear an octave up
  if (heard && f.freq > 0) {
    float out = f.freq * 2;
    if (out > 2000) out = f.freq * 0.5;  // fold down, stay under nyquist / piezo range
    speak(out, SPEAK_MS);
    initAfter = random(INIT_MIN_MS, INIT_MAX_MS);
    return;
  }

  // nothing for a while: start a conversation
  if (now - lastActive > initAfter) {
    speak(random(INIT_LOW_HZ, INIT_HIGH_HZ), SPEAK_MS);
    lastActive = now;
    initAfter = random(INIT_MIN_MS, INIT_MAX_MS);
  }
}

// freq in hz, dur in ms. non-blocking.
void speak(float freq, int dur) {
  if (freq < 31) return;
  tone(PIEZO_PIN, (unsigned int)freq, dur);
  speakingUntil = millis() + dur + 40;  // +40 lets the ring die down
}

// ------------------------------------------------------------- sensing

void listen() {
  // 1. sample a frame
  unsigned long period = (unsigned long)(1000000.0 / TARGET_FS);
  unsigned long t0 = micros();
  unsigned long next = t0;
  for (int i = 0; i < N; i++) {
    while ((long)(micros() - next) < 0);
    re[i] = analogRead(MIC_PIN);
    next += period;
  }
  float elapsed = (micros() - t0) / 1e6;
  f.fs = N / elapsed;

  unsigned long now = millis();
  f.self = now < speakingUntil;

  // 2. amplitude
  float sum = 0;
  for (int i = 0; i < N; i++) sum += re[i];
  f.dc = sum / N;

  float mn = 1e9, mx = -1e9, sq = 0, pk = 0;
  for (int i = 0; i < N; i++) {
    re[i] -= f.dc;
    if (re[i] < mn) mn = re[i];
    if (re[i] > mx) mx = re[i];
    if (fabsf(re[i]) > pk) pk = fabsf(re[i]);
    sq += re[i] * re[i];
  }
  float prevRms = f.rms;
  f.peak = pk;
  f.p2p  = mx - mn;
  f.rms  = sqrtf(sq / N);
  f.envelope += ENV_SMOOTH * (f.rms - f.envelope);

  // 3. zero-crossing frequency (hysteresis so noise doesn't count)
  int crossings = 0;
  bool high = re[0] > 0;
  for (int i = 1; i < N; i++) {
    if (high && re[i] < -ZC_HYST) { high = false; crossings++; }
    else if (!high && re[i] > ZC_HYST) { high = true; crossings++; }
  }
  f.zcFreq = (crossings / 2.0) / elapsed;

  // 4. fft (hann window)
  for (int i = 0; i < N; i++) {
    re[i] *= 0.5 - 0.5 * cosf(2 * PI * i / (N - 1));
    im[i] = 0;
  }
  fft();
  float binHz = f.fs / N;

  float total = 0, lo = 0, mi = 0, hi = 0, wsum = 0, logsum = 0;
  int best = 1;
  for (int k = 1; k < N / 2; k++) {
    mag[k] = sqrtf(re[k] * re[k] + im[k] * im[k]) / (N / 2);
    float hz = k * binHz;
    float p = mag[k] * mag[k];
    total += p;
    wsum += p * hz;
    logsum += logf(p + 1e-9);
    if (hz < LOW_MAX) lo += p; else if (hz < MID_MAX) mi += p; else hi += p;
    if (mag[k] > mag[best]) best = k;
  }
  if (total > 0) {
    f.low = lo / total; f.mid = mi / total; f.high = hi / total;
    f.centroid = wsum / total;
    f.flatness = expf(logsum / (N / 2 - 1)) / (total / (N / 2 - 1) + 1e-9);
  } else {
    f.low = f.mid = f.high = f.centroid = f.flatness = 0;
  }

  // parabolic interpolation around the peak for sub-bin accuracy
  f.freqMag = mag[best];
  if (best > 1 && best < N / 2 - 1 && f.freqMag >= MIN_PITCH_MAG) {
    float a = mag[best - 1], b = mag[best], c = mag[best + 1];
    float d = a - 2 * b + c;
    float shift = (d != 0) ? 0.5 * (a - c) / d : 0;
    f.freq = (best + shift) * binHz;
  } else {
    f.freq = 0;
  }

  // 5. noise floor, quiet, level
  if (!f.self) {
    if (f.noiseFloor == 0) f.noiseFloor = f.rms;
    else if (f.rms < f.noiseFloor) f.noiseFloor += FLOOR_FALL * (f.rms - f.noiseFloor);
    else f.noiseFloor += FLOOR_RISE * (f.rms - f.noiseFloor);
  }
  f.level = f.noiseFloor > 0 ? f.rms / f.noiseFloor : 0;
  f.quiet = f.level < 1.5;
  if (f.quiet) lastQuiet = now;
  f.sinceQuiet = now - lastQuiet;

  // 6. onsets, rhythm
  f.onset = false;
  if (!f.self && f.level > ONSET_RATIO && f.rms > prevRms * ONSET_RISE &&
      now - lastOnset > ONSET_COOLDOWN_MS) {
    f.onset = true;
    f.onsetCount++;
    if (lastOnset > 0) {
      f.ioi = now - lastOnset;
      f.bpm = f.ioi > 0 ? 60000.0 / f.ioi : 0;
    }
    lastOnset = now;
  }
  f.sinceOnset = lastOnset > 0 ? now - lastOnset : 0;
}

// in-place radix-2 fft on re[] / im[]
void fft() {
  for (int i = 1, j = 0; i < N; i++) {
    int bit = N >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      float t = re[i]; re[i] = re[j]; re[j] = t;
      t = im[i]; im[i] = im[j]; im[j] = t;
    }
  }
  for (int len = 2; len <= N; len <<= 1) {
    float ang = -2 * PI / len;
    float wr = cosf(ang), wi = sinf(ang);
    for (int i = 0; i < N; i += len) {
      float cr = 1, ci = 0;
      for (int k = 0; k < len / 2; k++) {
        int a = i + k, b = i + k + len / 2;
        float xr = re[b] * cr - im[b] * ci;
        float xi = re[b] * ci + im[b] * cr;
        re[b] = re[a] - xr; im[b] = im[a] - xi;
        re[a] += xr;        im[a] += xi;
        float t = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = t;
      }
    }
  }
}

// csv for the serial plotter / monitor
void report() {
  Serial.print("rms:");      Serial.print(f.rms);
  Serial.print(",env:");     Serial.print(f.envelope);
  Serial.print(",floor:");   Serial.print(f.noiseFloor);
  Serial.print(",level:");   Serial.print(f.level);
  Serial.print(",freq:");    Serial.print(f.freq);
  Serial.print(",zc:");      Serial.print(f.zcFreq);
  Serial.print(",centroid:");Serial.print(f.centroid);
  Serial.print(",low:");     Serial.print(f.low);
  Serial.print(",mid:");     Serial.print(f.mid);
  Serial.print(",high:");    Serial.print(f.high);
  Serial.print(",onset:");   Serial.print(f.onset ? 1 : 0);
  Serial.print(",bpm:");     Serial.print(f.bpm);
  Serial.print(",fs:");      Serial.println(f.fs);
}


```

basic call & response:

![[IMG_8675.mp4]]

to actually make this, i'd need to figure out the electronics first — which i assume to be a simpler problem, and then write the software. this'll differ from the 2-d automata that i programmed in c earlier.