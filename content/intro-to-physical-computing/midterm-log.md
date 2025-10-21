---
date: 2025-10-02
tags:
  - writings
  - experiments
noteOrder: "105"
draft: "false"
---
# ask: 
> show that you can make a simple <mark>interactive system with physical controls</mark>, and that you can <mark>keep a <strike>user</strike> person engaged</mark> with your system. 
> 
> **sub asks:** 
> On a technical level, though, your project should show that you <mark>understand digital input and output, analog input and output, serial communication, and good physical interaction design principles</mark>. On a conceptual level, your project should <mark>help people to enjoy</mark> whatever setting it is designed for.
> 
> source: https://itp.nyu.edu/physcomp/syllabus/assignments/#Midterm_Project

---
# thought: 
> dahiya tore-down my burgeoning prejudice against recent forms of first word art: when i tried to criticise AR/VR, he cut me off, pointed at a light-switch, and wondered how <mark>‘flicking a mechanical switch to fire electrons that illuminate a bulb far away’ is no less crazy than ‘wearing a virtual-reality headset’</mark>.
> 
> from [stockholm:life, by shobhan](https://www.setwrite.in/activities/201907-stockholm-life.html)

we frequently interact with electricity, but its magic is too quick to comprehend. there is a lot that we *still* don't understand [^1], but that doesn't stop us from consuming 24,398,000,000,000,000 watt-hours of electrical-energy every year[^2] . 

the idea was to communicate this magic — borrowed from dahiya's humility, coupled with my own curiosity — by showing how much laborious work electrons do, to turn on a simple led. 

| ![[z_images/IMG_6445.jpg]] | ![[z_images/IMG_6489.jpg]] |
| -------------------------- | -------------------------- |
|                            |                            |
<figcaption>thought-maps to arrive at this line of thought. </figcaption>

---
# study: 
this line of enquiry originally began with reading [[intro-to-physical-computing/practical electronics for inventors|practical electronics for inventors]], as i realised that electrons flow opposite to the direction of conventional current flow. 

i then saw more videos, this one being one the clearest ones about the topic: https://www.youtube.com/watch?v=3KePcASD0NQ

---
# thinking-through + prototyping:
i wanted to do this project well. [[intro-to-fabrication]] taught me the importance of spending more time thinking through the thing i'm making than making it. so, i applied that:

on <mark>first glance</mark>, it was meant to look <mark>simple & neat</mark>. the person should <mark>know how to interact with it</mark>. via said interaction, a person should be able to <mark>leave with a sense of appreciation</mark> for all the electrical-hardwork around them. 

i first thought about the components & their layout. i've now grown up to understand that tiny choices compound to bigger outcomes. 

![[z_images/IMG_6576.jpg]]

![[z_images/IMG_6577.jpg]]

i chose to lay out components straight, as opposed to the conventional circle to communicate flow, since the 'electrons' have to be pushed into the next component. i also added the capacitor, to show electromotive-force gradually reduce through the circuit, as the capacitor gives off its stored current (when the power source is turned off). 

then, i planned out the arrangement of the components (both *visible* & *invisible*).

![[z_images/IMG_6586.jpg]]

while this started off as a single interaction, prototyping showed me the opportunity to add several more. i then thought through all of my interactions, in time: 

![[z_images/Pasted image 20251006174135.png]]

i also tested material for light-diffusion. realised that [[3d printed material does interesting light diffusion]].  

![[z_images/IMG_6582.mov]]

[[people/phil|phil]] suggested the following materials: 
- polystyrene sheet: 1mm
- white translucent acrylic sheet: 1-3mm
- light pipe from colourless acrylic rod to make leds stay at the bottom but the light to show above.

i will go check these out later. my next step will be to program the electron-leds. 

---
### 251009: 
i needed to program the leds. 

the first problem i run into is that i need to send analog-output to ~30-35 leds. arduino allows me to send analog outputs to 7, and digital to 20. 

![[z_images/IMG_6633.jpg]]

looked at something called a mux or multiplexor. think of it like a motor-driver, but uses 4 pins to give out 16 outputs (based on varying combinations of highs & lows). 

![[z_images/Screenshot 2025-10-09 at 17.19.02.png]]
<figcaption>source: https://www.youtube.com/watch?v=Dco6jo9xgAo</figcaption>

[[people/pedro|pedro]] then told me about the multiplexors that we have in the shop, as consumables. we have the [cd4051be](https://www.alldatasheet.com/datasheet-pdf/view/26882/TI/CD4051BE.html) multiplexors, that do the job that i want. 

![[z_images/Screenshot 2025-10-10 at 17.00.17.png]]
<figcaption>wiring from the datassheet.</figcaption>

![[z_images/Screenshot 2025-10-10 at 17.00.49.png]]
<figcaption>truth tables</figcaption>

[[people/nikolai|nikolai]] helped me understand these. 

then, with [[people/octavio|octavio]], we figured out how to make it work (because my circuit didn't work — i thought the inhibit-pin could do with no signal, but it needed a low-signal). 

![[z_images/IMG_6638.mov]]

once i knew that this configuration worked, i sketched out the schematic too; to save it. 

![[z_images/IMG_6641.jpg]]
<figcaption>working multiplexor schematic.</figcaption>

---
next, i began programming the leds. 

i first began to understand the concept of pointers, in comparison to javascript. 

in javascript, <mark>arrays are objects</mark> (therefore, callable by their name, and having methods (such as .length, et-cetera)). in c, <mark>arrays are blocks of memory</mark>. when i declare an array in c: 

``` cpp
int arr [] = {0,1,2}; s
```

`arr` is a <mark>pointer to the memory address of the first element</mark> in the array, and knows nothing about the array itself (because all the other elements are after it). when we declare an array, cpp automatically decays the array (converts to pointer of the first element). 

i can't believe i have to learn another programming language. argh. 

anyway, this block of code returns the size of an array, when called with an array-name passed into it.

``` cpp
//arrays in c work weirdly. you can't directly call an array, but call the reference of that array. 
//a template is used to define a 'generic' function. see more here: https://www.geeksforgeeks.org/cpp/templates-cpp/

//it accepts a typename, and an unsigned integer for size:
template <typename T, size_t N>
//when i use this, the array is not decayed to a pointer, and n returns the size of it.
int get_array_length (T(&)[N]){
  return N;
}
```

i need this to loop through the array, as i pass values. 

---
started from scratch. cleaned up the circuit that's supposed to stay fixed; with solid-wires.

![[z_images/IMG_6642.jpg]]

wrote simple code to test everything. 

``` cpp
//test mpx. 

int a = 14; 
int b = 15;
int c = 16;

int inh = 17;

void setup() {
  // put your setup code here, to run once:

  pinMode (a, OUTPUT); 
  pinMode (b, OUTPUT); 
  pinMode (c, OUTPUT); 

  pinMode (inh, OUTPUT); 
  digitalWrite (inh, LOW); 

}

void loop() {
turn_on(HIGH, LOW, LOW); 
delay (1000); 
turn_off(); 
delay (1000); 
turn_on(LOW, HIGH, LOW); 
delay (1000); 
turn_off(); 
delay (1000); 
}

void turn_off(){
  digitalWrite (a, LOW); 
  digitalWrite (b, LOW);
  digitalWrite (c, LOW); 
}

void turn_on(int a_val, int b_val, int c_val){
  digitalWrite (a, a_val); 
  digitalWrite (b, b_val);
  digitalWrite (c, c_val); 
}


```

since i'm new to cpp, i'll follow what [[people/mimi yin|mimi yin]] makes students do in [[intro-to-computational-media]] — hard-code values, then begin to abstract.

what follows can be thought of as github commits.

replaced individual pin numbers with an array: 

``` cpp
//multiple leds test.

int input_pins[] = { 14, 15, 16 };
int inh_pin = 17;

// int a = 14;
// int b = 15;
// int c = 16;

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

void setup() {
  //set pin-modes, and default for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
  }
  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  turn_on(HIGH, LOW, LOW);
  delay(1000);
  turn_off();
  delay(1000);
  turn_on(LOW, HIGH, LOW);
  delay(1000);
  turn_off();
  delay(1000);
}

void turn_off() {
  digitalWrite(input_pins[0], LOW);
  digitalWrite(input_pins[1], LOW);
  digitalWrite(input_pins[2], LOW);
}

void turn_on(int a_val, int b_val, int c_val) {
  digitalWrite(input_pins[0], a_val);
  digitalWrite(input_pins[1], b_val);
  digitalWrite(input_pins[2], c_val);
}
```

achieved multiple blinks.

![[z_images/IMG_6643.mov]]

``` cpp
//multiple leds test.

/*
truth table for CD4051B:
[a,b,c] [high || low] = on_channel (source: datasheet)

[LOW, LOW, LOW] = 0;
[HIGH, LOW, LOW] = 1;
[LOW, HIGH, LOW] = 2; 
[HIGH, HIGH, LOW] = 3
[LOW, LOW, HIGH] = 4;
[HIGH, LOW, HIGH] = 5;
[LOW, HIGH, HIGH] = 6;
[HIGH, HIGH, HIGH] = 7; 

INHIBIT == HIGH = NONE;
*/

int input_pins[] = { 14, 15, 16 };
int inh_pin = 17;

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

void setup() {
  //set pin-modes, and default for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
  }
  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  blink(HIGH, LOW, LOW, 1000);
  blink(LOW, HIGH, LOW, 1000);
  blink(HIGH, HIGH, LOW, 1000); 
}



void blink(int a_val, int b_val, int c_val, int time){
  digitalWrite(input_pins[0], a_val);
  digitalWrite(input_pins[1], b_val);
  digitalWrite(input_pins[2], c_val);
  delay (time); 
  digitalWrite(input_pins[0], LOW);
  digitalWrite(input_pins[1], LOW);
  digitalWrite(input_pins[2], LOW);
  delay (time); 
}

// void turn_on(int a_val, int b_val, int c_val) {
//   digitalWrite(input_pins[0], a_val);
//   digitalWrite(input_pins[1], b_val);
//   digitalWrite(input_pins[2], c_val);
// }

// void turn_off() {
//   digitalWrite(input_pins[0], LOW);
//   digitalWrite(input_pins[1], LOW);
//   digitalWrite(input_pins[2], LOW);
// }


```

made blink accept an array, instead of individual values. 

``` cpp
//multiple leds test.

//include a cpp library, that allows functions to accept a list of values.
#include <initializer_list>

/*
truth table for CD4051B:
[a,b,c] [high || low] = on_channel (source: datasheet)

[LOW, LOW, LOW] = 0;
[HIGH, LOW, LOW] = 1;
[LOW, HIGH, LOW] = 2; 
[HIGH, HIGH, LOW] = 3
[LOW, LOW, HIGH] = 4;
[HIGH, LOW, HIGH] = 5;
[LOW, HIGH, HIGH] = 6;
[HIGH, HIGH, HIGH] = 7; 

INHIBIT == HIGH = NONE;
*/

int input_pins[] = { 14, 15, 16 };
int inh_pin = 17;

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

void setup() {
  //set pin-modes, and default for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
  }
  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  blink({ HIGH, LOW, LOW }, 1000);
  blink({ LOW, HIGH, LOW }, 1000);
}

//blink is generated by chat-gpt. i couldn't figure it out.
void blink(std::initializer_list<int> values, int time_ms) {
  int i = 0;
  for (int val : values) {
    if (i >= 3) break;
    digitalWrite(input_pins[i], val);
    i++;
  }

  delay(time_ms);

  for (int j = 0; j < 3; j++) {
    digitalWrite(input_pins[j], LOW);
  }

  delay(time_ms);
}
```

it failed here: 

``` cpp
//multiple leds test.

//include a cpp library, that allows functions to accept a list of values.
#include <initializer_list>

#include <math.h>  // for fmod

/*
truth table for CD4051B:
[a,b,c] [high || low] = on_channel (source: datasheet)

[LOW, LOW, LOW] = 0;
[HIGH, LOW, LOW] = 1;
[LOW, HIGH, LOW] = 2; 
[HIGH, HIGH, LOW] = 3
[LOW, LOW, HIGH] = 4;
[HIGH, LOW, HIGH] = 5;
[LOW, HIGH, HIGH] = 6;
[HIGH, HIGH, HIGH] = 7; 

INHIBIT == HIGH = NONE;
*/

int input_pins[] = { 14, 15, 16 };
int inh_pin = 17;

//helper to return high / low, based on time & frequency:
int squareWaveSignal(float frequency) {
  // Get the time in microseconds
  unsigned long t = micros();

  // Calculate the period in microseconds
  float period_us = 1e6 / frequency;

  // Square wave: toggle every half period
  return (fmod(t, period_us) < (period_us / 2)) ? HIGH : LOW;
}

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

void setup() {
  //set pin-modes, and default for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
  }
  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  blink({ squareWaveSignal(2), LOW, LOW }, 100);
}

//blink is generated by chat-gpt. i couldn't figure it out.
void blink(std::initializer_list<int> values, int time_ms) {
  int i = 0;
  for (int val : values) {
    if (i >= 3) break;
    digitalWrite(input_pins[i], val);
    i++;
  }

  delay(time_ms);

  for (int j = 0; j < 3; j++) {
    digitalWrite(input_pins[j], LOW);
  }


  delay(time_ms);
}
```

this is why i don't like chatgpt. 

i'll start from scratch, and instead of making the code reusable, i'll hard code it — to make it work for my use-case first. then abstract it.

---
[[people/tom|tom]] told me **not** to send analog signals, and just use the arduino to turn the leds on / off. i know that this won't produce the effect that i want, and i wanted to get this concept down properly. 

so, i built a small circuit and took it home with me; to spend a couple of hours in the night programming it. 

![[z_images/IMG_6667.jpg]]

i found some stuff on the arduino's [reference page](https://docs.arduino.cc/micropython/micropython-course/course/analog/) that first re-enforced correct terminologies (w.r.t. digital, analog & pwm; covered in [[intro-to-physical-computing/electrical components|electrical components]]). 

[this video](https://vimeo.com/380180086) by [[people/jeffrey|jeffrey]] made me realise that i could use `tone()` to power up an led too. which then means that i can send pseudo-analog signals using the makeTone() lab that we did a while back. 

i did do that. i think — i think — i can make it dim too. i just need to pass a different frequency over time.

![[z_images/IMG_6668.mov]]

it didn't work. i tried this: 

``` cpp
//send pwm signal to led via a digital output pin.

int led_pin = 9;

void setup() {
  pinMode(led_pin, OUTPUT);
}

void loop() {
  for (int i = 0; i < 200; i+=0.0000005) {
    makeTone(i);
    delay(1000);
  }
}

void makeTone(float frequency) {
  // set the period in microseconds:
  int period = (1 / frequency) * 1000000;
  // int period = (1 / frequency) * 5000000;  //i want this to play over, say, 10 seconds.
  // turn the speaker on:
  digitalWrite(led_pin, HIGH);
  // delay half the period:
  delayMicroseconds(period / 2);
  // turn the speaker off:
  digitalWrite(led_pin, LOW);
  // delay half the period:
  delayMicroseconds(period / 2);
}

```

but, i knew that theoretically this *should* be possible. i tried to use chatgpt — and it gave me code that worked. 

``` cpp
//send pwm signal to led via a digital output pin.

int led_pin = 9;  // Pin connected to the LED

void setup() {
  pinMode(led_pin, OUTPUT);  // Set LED pin as an output
}

void loop() {
  // Fade in the LED from 0 to 255 (off to full brightness)
  for (int brightness = 0; brightness <= 255; brightness++) {
    // Calculate the on time for the LED
    int onTime = (brightness * 10);  // The higher the brightness, the longer it stays on
    int offTime = 2550 - onTime;    // The rest of the period is the off time
    
    // Send PWM signal by adjusting on and off times
    digitalWrite(led_pin, HIGH);   // Turn the LED on
    delayMicroseconds(onTime);     // Delay for the "on" time
    digitalWrite(led_pin, LOW);    // Turn the LED off
    delayMicroseconds(offTime);    // Delay for the "off" time
  }

  // Fade out the LED from 255 to 0 (full brightness to off)
  for (int brightness = 255; brightness >= 0; brightness--) {
    // Calculate the on time for the LED
    int onTime = (brightness * 10);  // The higher the brightness, the longer it stays on
    int offTime = 2550 - onTime;    // The rest of the period is the off time
    
    // Send PWM signal by adjusting on and off times
    digitalWrite(led_pin, HIGH);   // Turn the LED on
    delayMicroseconds(onTime);     // Delay for the "on" time
    digitalWrite(led_pin, LOW);    // Turn the LED off
    delayMicroseconds(offTime);    // Delay for the "off" time
  }
}
```

but that isn't fun. i then asked it to explain what it produced, and i attempted to understand & rewrite it myself. 

so the first thing i understood was this: 

> PWM is a technique where you rapidly turn a device (like an LED) on and off. The duty cycle determines how long the device stays on vs. off. The human eye can’t distinguish the rapid switching, but it sees the average brightness.

which means that i had to essentially increase the duty-cycle over time.

the magic kind of happens here: 

``` cpp
for (int brightness = 0; brightness <= 255; brightness++) {
  // Calculate the on time for the LED
  int onTime = (brightness * 10);  // The higher the brightness, the longer it stays on
  int offTime = 2550 - onTime;    // The rest of the period is the off time
  
  // Send PWM signal by adjusting on and off times
  digitalWrite(led_pin, HIGH);   // Turn the LED on
  delayMicroseconds(onTime);     // Delay for the "on" time
  digitalWrite(led_pin, LOW);    // Turn the LED off
  delayMicroseconds(offTime);    // Delay for the "off" time
}
```

> If brightness = 0, the LED will stay on for 0 * 10 = 0 microseconds (i.e., it won’t be on at all).
> 
> If brightness = 255, the LED will stay on for 255 * 10 = 2550 microseconds.

here's my version of the code, with comments and a video of it working. 

![[z_images/IMG_6669.mov]]

``` cpp
//send pwm signal to led via a digital output pin.

int led_pin = 9;

void setup() {
  Serial.begin(9600); 
  pinMode(led_pin, OUTPUT);
}

const int max_brightness = 255;
const int interval = 30;

void loop() {

  //fade in the led:
  for (int b = 0; b <= 255; b++) {
    int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
    int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

    //send pseudo-pwm signal:
    digitalWrite(led_pin, HIGH);  //turn on.
    delayMicroseconds(on_time);   //for on_time.
    digitalWrite(led_pin, LOW);   //turn off for off_time.
    delayMicroseconds(off_time);  //for off_time.
  }

  //when the above is completed, we fade out the led:

  //fade out the led:
  for (int b = 255; b >= 0; b--) {
    int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
    int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

    //send pseudo-pwm signal:
    digitalWrite(led_pin, HIGH);  //turn on.
    delayMicroseconds(on_time);   //for on_time.
    digitalWrite(led_pin, LOW);   //turn off for off_time.
    delayMicroseconds(off_time);  //for off_time.
  }
}
```

isn't this a way to convert literally all digital pins into analog ones?

good ~~day~~ night. now, i have to figure out how to pass this to the multiplexor. i might even try sending analog-signal to it (but i remember thinking that i needed to do this (pseudo-analog) because the mpx we have does not accept analog signals). but let's see :) 

---
[[people/christina tang|christina tang]] explained a bunch of things about light to me.

![[z_images/IMG_6675.jpg]]

she explained that while the computer sends out signal linearly, the eye doesn't quite perceive it similarly. this is the difference between computation & perception that [[people/mimi yin|mimi yin]] was also referring to; in my [[conversation with mimi]]. 

we spoke about [photopic curves](https://en.wikipedia.org/wiki/Luminous_efficiency_function) too.

![[z_images/IMG_6675 1.jpg]]
<figcaption>top: computer signal (linear), middle: led-processing, bottom: human-perception. a lot of light-engineering is to figure out how to balance the three curves.</figcaption>

we also discussed that my use of tone should perhaps dim the led too. [[people/octavio|octavio]] explained that the problem was with my delays in makeTone(): 

``` cpp
void makeTone(float frequency) {
  // set the period in microseconds:
  int period = (1 / frequency) * 1000000;
  // int period = (1 / frequency) * 5000000;  //i want this to play over, say, 10 seconds.
  // turn the speaker on:
  digitalWrite(led_pin, HIGH);
  // delay half the period:
  delayMicroseconds(period / 2);
  // turn the speaker off:
  digitalWrite(led_pin, LOW);
  // delay half the period:
  delayMicroseconds(period / 2);
}
```

they're on for 50% and off for 50%. 

and that's what i solved with the other function that i wrote. i think i'm going to try a version with makeTone() also, at some point.

---
[[people/christina tang|christina tang]] also gave me programmable leds. but i don't know — i think <mark>i want to go into the weeds of this one</mark>(manual leds), and <mark>fail if i do</mark>. i'm learning far too much and getting more comfortable with the medium. 

i'll resort back to the leds if i cannot get it to work. i have a bunch of ideas right now — what if i pass pwms to a digital multiplexor? [[people/tom|tom]] also shared a [pwm-driver](https://www.adafruit.com/product/815). 

---
while reading [[intro-to-physical-computing/there are no electrons|there are no electrons]], the narrative came to me:

![[z_images/IMG_6685.jpg]]

it would be amazing to show this narrative as the experience happens (via engraved text that is visible with leds underneath). however, this is the most aspirational version of my project. i now know, after 6 weeks, that this may not be what gets produced. i am tightly dependent on what i am able to technically achieve. 

so, i'll park this aspiration for now; and focus on making things work first — and then deciding what i can achieve. 

---
the next thing i tried was to test the mux. can i send a pwm to the multiplexor's input — and does that fade an led? 

so, first i sent a HIGH signal to the multiplexor's communication input from the arduino digital-output-pin, instead of taking 3.3 from the bus. however, the led was dim. 

![[z_images/IMG_6687.mov]]

i also checked voltage-differences between what was being sent and what was being outputted. there isn't a lot; so, i assume it's current.

![[z_images/volt_checker.mov]]

i assume that the current being passed is too little; via the multiplexor. this means that the multiplexor shouldn't be used to power the led, but just control the pulse (i.e, i can pin this to ground). realised i'd have to use transistors for this. that'll be 37 transistors. argh.

now my next hope is to pass a pwm instead of high to the multiplexor's input.

---
it works!!! 

i sent a pseudo-pwm via a digitalWrite pin to fade in an led. this means that i have infinite ports to fade in leds. this is amazing.

![[z_images/IMG_6688.mov]]

``` cpp
//multiple leds test.

/*
truth table for CD4051B:
[a,b,c] [high || low] = on_channel (source: datasheet)

[LOW, LOW, LOW] = 0;
[HIGH, LOW, LOW] = 1;
[LOW, HIGH, LOW] = 2; 
[HIGH, HIGH, LOW] = 3
[LOW, LOW, HIGH] = 4;
[HIGH, LOW, HIGH] = 5;
[LOW, HIGH, HIGH] = 6;
[HIGH, HIGH, HIGH] = 7; 

INHIBIT == HIGH = NONE;
*/

int input_pins[] = { 14, 15, 16 };
int inh_pin = 17;
int ctrl_pin = 18;

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

void setup() {
  //set pin-modes, and default for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
  }
  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  fade_signal(HIGH, LOW, LOW, 30); 
}

void fade_signal(int val1, int val2, int val3, const int interval) {
  const int max_brightness = 255;

  //fade in the led:
  for (int b = 0; b <= 255; b++) {
    int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
    int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

    //send pseudo-pwm signal:
    digitalWrite(input_pins[0], val1);  //turn on.
    digitalWrite(input_pins[1], val2);  //turn on.
    digitalWrite(input_pins[2], val3);  //turn on.
    delayMicroseconds(on_time);         //for on_time.
    digitalWrite(input_pins[0], LOW);  //turn on.
    digitalWrite(input_pins[1], LOW);  //turn on.
    digitalWrite(input_pins[2], LOW);  //turn on.
    delayMicroseconds(off_time);        //for off_time.
  }

  //when the above is completed, we fade out the led:

  //fade out the led:
  for (int b = 255; b >= 0; b--) {
    int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
    int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

    //send pseudo-pwm signal:
    digitalWrite(input_pins[0], val1);  //turn on.
    digitalWrite(input_pins[1], val2);  //turn on.
    digitalWrite(input_pins[2], val3);  //turn on.
    delayMicroseconds(on_time);         //for on_time.
    digitalWrite(input_pins[0], LOW);  //turn on.
    digitalWrite(input_pins[1], LOW);  //turn on.
    digitalWrite(input_pins[2], LOW);  //turn on.
    delayMicroseconds(off_time);        //for off_time.
  }
}



void blink(int a_val, int b_val, int c_val, int time) {
  digitalWrite(input_pins[0], a_val);
  digitalWrite(input_pins[1], b_val);
  digitalWrite(input_pins[2], c_val);
  delay(time);
  digitalWrite(input_pins[0], LOW);
  digitalWrite(input_pins[1], LOW);
  digitalWrite(input_pins[2], LOW);
  delay(time);
}

// void turn_on(int a_val, int b_val, int c_val) {
//   digitalWrite(input_pins[0], a_val);
//   digitalWrite(input_pins[1], b_val);
//   digitalWrite(input_pins[2], c_val);
// }

// void turn_off() {
//   digitalWrite(input_pins[0], LOW);
//   digitalWrite(input_pins[1], LOW);
//   digitalWrite(input_pins[2], LOW);
// }
```

circuit: 

![[z_images/IMG_6689 1.jpg]]

i'll need to clean up the program to make it work for an array of leds (fade in, stay in, fade out). but i think i can do that.

there is one tiny problem: if i reset all the input pins to low, it powers up the 0th-pin. so, i think the downside is that i'll just have to not use the zeroth pin. other than that, the pulsating works fine with the multiplexor across multiple leds. 

i could use the inh pin, but that might complicate everything a little bit. i'll take a call later — my brain is blanking out.

![[z_images/IMG_6691.mov]]

---
now, i'm going to start building my circuit, complete with the fsr; and work on the interactions.

![[z_images/IMG_6766.jpg]]

i figured out the programmatic flow. every loop, all the leds will get brightness values. they can either be fading in, fading out, or be staying. actually, they will almost always pulsate (because the electrons are going at a very slow pace). 

i then thought about different ways to make the led light up, and what i'd prefer. 

![[z_images/IMG_6767.jpg]]

then, i detailed out all the possible states; of both my program & the fsr. 

![[z_images/IMG_6768.jpg]]

made the leds light up in succession.

![[z_images/IMG_6769.mov]]

``` cpp
//interaction test.

/*
truth table for CD4051B:
[a,b,c] [high || low] = on_channel (source: datasheet)

[LOW, LOW, LOW] = 0;
[HIGH, LOW, LOW] = 1;
[LOW, HIGH, LOW] = 2; 
[HIGH, HIGH, LOW] = 3
[LOW, LOW, HIGH] = 4;
[HIGH, LOW, HIGH] = 5;
[LOW, HIGH, HIGH] = 6;
[HIGH, HIGH, HIGH] = 7; 

INHIBIT == HIGH = NONE;
*/

int input_pins[] = { 10, 11, 12 };
int inh_pin = 9;

int fsr_pin = A0;
int fsr_value = 0;
int fsr_prev_val = 0;

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

//helper to get mux-values according to the truth table. chat-gpt found some obscure logic that connects all pin-numbers with simple if-conditions.
int* get_mux_values(int channel) {
  static int vals[3];  // persistent array for return

  if (channel < 0 || channel > 7) {
    vals[0] = vals[1] = vals[2] = LOW;
    return vals;
  }

  // derive logic levels from the channel bits
  vals[0] = (channel & 0b001) ? HIGH : LOW;  // A
  vals[1] = (channel & 0b010) ? HIGH : LOW;  // B
  vals[2] = (channel & 0b100) ? HIGH : LOW;  // C

  return vals;
}


void setup() {

  //set pin-modes, and default value for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
    digitalWrite(input_pins[i], LOW);
  }

  pinMode(fsr_pin, INPUT);

  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  light_up(1, 255, 30);
  delay (100); 
  light_up(2, 255, 30);
  delay (100); 
  light_up(3, 255, 30);
  delay (100); 
  
}

void light_up(int channel, int brightness, int interval) {
  // brightness: 0–255
  // interval: base PWM timing (microseconds per brightness step)
  // hold duration is fixed internally

  int* values = get_mux_values(channel);
  const int max_brightness = 255;
  const int hold_duration = 200;  // <-- fixed hold time (ms)

  digitalWrite(inh_pin, LOW);  // enable MUX

  // --- fade in ---
  for (int b = 0; b <= brightness; b++) {
    int on_time = b * interval;
    int off_time = (max_brightness * interval) - on_time;

    digitalWrite(input_pins[0], values[0]);
    digitalWrite(input_pins[1], values[1]);
    digitalWrite(input_pins[2], values[2]);
    delayMicroseconds(on_time);
    digitalWrite(input_pins[0], LOW);
    digitalWrite(input_pins[1], LOW);
    digitalWrite(input_pins[2], LOW);
    delayMicroseconds(off_time);
  }

  // --- hold steady at chosen brightness ---
  unsigned long start_time = millis();
  while (millis() - start_time < hold_duration) {
    int on_time = brightness * interval;
    int off_time = (max_brightness * interval) - on_time;

    digitalWrite(input_pins[0], values[0]);
    digitalWrite(input_pins[1], values[1]);
    digitalWrite(input_pins[2], values[2]);
    delayMicroseconds(on_time);
    digitalWrite(input_pins[0], LOW);
    digitalWrite(input_pins[1], LOW);
    digitalWrite(input_pins[2], LOW);
    delayMicroseconds(off_time);
  }

  // --- fade out ---
  for (int b = brightness; b >= 0; b--) {
    int on_time = b * interval;
    int off_time = (max_brightness * interval) - on_time;

    digitalWrite(input_pins[0], values[0]);
    digitalWrite(input_pins[1], values[1]);
    digitalWrite(input_pins[2], values[2]);
    delayMicroseconds(on_time);
    digitalWrite(input_pins[0], LOW);
    digitalWrite(input_pins[1], LOW);
    digitalWrite(input_pins[2], LOW);
    delayMicroseconds(off_time);
  }
}



// void light_up(int channel, const int interval) {
//   int* values = get_mux_values(channel);
//   const int max_brightness = 255;

//   //fade in the led:
//   for (int b = 0; b <= max_brightness; b++) {
//     int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
//     int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

//     //send pseudo-pwm signal:
//     digitalWrite(input_pins[0], values[0]);  //turn on.
//     digitalWrite(input_pins[1], values[1]);  //turn on.
//     digitalWrite(input_pins[2], values[2]);  //turn on.
//     delayMicroseconds(on_time);              //for on_time.
//     digitalWrite(input_pins[0], LOW);        //turn on.
//     digitalWrite(input_pins[1], LOW);        //turn on.
//     digitalWrite(input_pins[2], LOW);        //turn on.
//     delayMicroseconds(off_time);             //for off_time.
//   }

//   //stay on for a bit before going:
//   digitalWrite(input_pins[0], values[0]);  //turn on.
//   digitalWrite(input_pins[1], values[1]);  //turn on.
//   digitalWrite(input_pins[2], values[2]);  //turn on.
//   delay(interval / 2);

//   //fade out the led:
//   for (int b = max_brightness; b >= 0; b--) {
//     int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
//     int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

//     //send pseudo-pwm signal:
//     digitalWrite(input_pins[0], values[0]);  //turn on.
//     digitalWrite(input_pins[1], values[1]);  //turn on.
//     digitalWrite(input_pins[2], values[2]);  //turn on.
//     delayMicroseconds(on_time);              //for on_time.
//     digitalWrite(input_pins[0], LOW);        //turn on.
//     digitalWrite(input_pins[1], LOW);        //turn on.
//     digitalWrite(input_pins[2], LOW);        //turn on.
//     delayMicroseconds(off_time);             //for off_time.
//   }
// }

void fade_signal(int val1, int val2, int val3, const int interval) {
  digitalWrite(inh_pin, LOW);
  const int max_brightness = 255;

  //fade in the led:
  for (int b = 0; b <= 255; b++) {
    int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
    int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

    //send pseudo-pwm signal:
    digitalWrite(input_pins[0], val1);  //turn on.
    digitalWrite(input_pins[1], val2);  //turn on.
    digitalWrite(input_pins[2], val3);  //turn on.
    delayMicroseconds(on_time);         //for on_time.
    digitalWrite(input_pins[0], LOW);   //turn on.
    digitalWrite(input_pins[1], LOW);   //turn on.
    digitalWrite(input_pins[2], LOW);   //turn on.
    delayMicroseconds(off_time);        //for off_time.
  }

  //when the above is completed, we fade out the led:

  //fade out the led:
  for (int b = 255; b >= 0; b--) {
    int on_time = b * interval;                            //stay on at this brightness level for an interval of time. at 0 brightness, it won't be on at all.
    int off_time = (max_brightness * interval) - on_time;  //stay off for the remainder of the time.

    //send pseudo-pwm signal:
    digitalWrite(input_pins[0], val1);  //turn on.
    digitalWrite(input_pins[1], val2);  //turn on.
    digitalWrite(input_pins[2], val3);  //turn on.
    delayMicroseconds(on_time);         //for on_time.
    digitalWrite(input_pins[0], LOW);   //turn on.
    digitalWrite(input_pins[1], LOW);   //turn on.
    digitalWrite(input_pins[2], LOW);   //turn on.
    delayMicroseconds(off_time);        //for off_time.
  }
}

```

---
also read [[all technology is assistive, by sarah hendren]]. 

---
put all stages as enums, and cleaned up the program. 

![[z_images/251021_vid.mov]]

``` cpp
//interaction test.

int input_pins[] = { 10, 11, 12 };
int inh_pin = 9;

int fsr_pin = A0;
int fsr_value = 0;
int fsr_prev_val = 0;

int fsr_noise = 20;

enum FSR_Stage {
  LOW_TO_HIGH,
  HIGH_TO_HIGH,
  LOW_TO_LOW,
  HIGH_TO_LOW
};

FSR_Stage current_fsr_stage = LOW_TO_LOW;

enum Circuit_Stage {
  DISPLAYER,
  POWERING,
  POWERED,
  DEPOWER,
  END
};

Circuit_Stage current_circuit_stage = DISPLAYER;

//helper to get array_size, when called during compile:
template<typename T, size_t N>
int get_array_length(T (&)[N]) {
  return N;
}

//helper to get mux-values according to the truth table. chat-gpt found some obscure logic that connects all pin-numbers with simple if-conditions.
int* get_mux_values(int channel) {
  static int vals[3];  // persistent array for return

  if (channel < 0 || channel > 7) {
    vals[0] = vals[1] = vals[2] = LOW;
    return vals;
  }

  // derive logic levels from the channel bits
  vals[0] = (channel & 0b001) ? HIGH : LOW;  // A
  vals[1] = (channel & 0b010) ? HIGH : LOW;  // B
  vals[2] = (channel & 0b100) ? HIGH : LOW;  // C

  return vals;
}


void setup() {

  //set pin-modes, and default value for inhibit.
  int input_pins_length = get_array_length(input_pins);
  for (int i = 0; i < input_pins_length; i++) {
    pinMode(input_pins[i], OUTPUT);
    digitalWrite(input_pins[i], LOW);
  }

  pinMode(fsr_pin, INPUT);

  pinMode(inh_pin, OUTPUT);
  digitalWrite(inh_pin, LOW);
}

void loop() {
  //a bunch of calls to light up.
  fsr_value = analogRead(fsr_pin);

  check_fsr_stage(fsr_value, fsr_prev_val);
  change_circuit_stage(); 

  // light_up(1, 255, 30);
  // delay(100);
  // light_up(2, 255, 30);
  // delay(100);
  // light_up(3, 255, 30);
  // delay(100);

  fsr_prev_val = fsr_value;  //set previous fsr value to be fsr value.
}

void check_fsr_stage(int current_fsr, int last_fsr) {
  if (last_fsr < fsr_noise && current_fsr > fsr_noise) {
    // gone from LOW to HIGH.
    current_fsr_stage = LOW_TO_HIGH;
  } else if (last_fsr > fsr_noise && current_fsr > fsr_noise) {
    // gone from HIGH to HIGH.
    current_fsr_stage = HIGH_TO_HIGH;
  } else if (last_fsr < fsr_noise && current_fsr < fsr_noise) {
    // gone from LOW to LOW.
    current_fsr_stage = LOW_TO_LOW;
  } else if (last_fsr > fsr_noise && current_fsr < fsr_noise) {
    // gone from HIGH to LOW.
    current_fsr_stage = HIGH_TO_LOW;
  }
}

void change_circuit_stage(){
  if (current_fsr_stage==HIGH_TO_HIGH){
    for (int i = 0; i<=3; i++){
      light_up(i, 255, 10); 
    }
  }
    if (current_fsr_stage==LOW_TO_LOW){
    for (int i = 0; i<=3; i++){
      light_up(i, 10, 10); 
    }
  }
}

void light_up(int channel, int brightness, int interval) {
  // brightness: 0–255
  // interval: base PWM timing (microseconds per brightness step)
  // hold duration is fixed internally

  int* values = get_mux_values(channel);
  const int max_brightness = 255;
  const int hold_duration = 100;  // <-- fixed hold time (ms)

  digitalWrite(inh_pin, LOW);  // enable MUX

  // --- fade in ---
  for (int b = 0; b <= brightness; b++) {
    int on_time = b * interval;
    int off_time = (max_brightness * interval) - on_time;

    digitalWrite(input_pins[0], values[0]);
    digitalWrite(input_pins[1], values[1]);
    digitalWrite(input_pins[2], values[2]);
    delayMicroseconds(on_time);
    digitalWrite(input_pins[0], LOW);
    digitalWrite(input_pins[1], LOW);
    digitalWrite(input_pins[2], LOW);
    delayMicroseconds(off_time);
  }

  // --- hold steady at chosen brightness ---
  unsigned long start_time = millis();
  while (millis() - start_time < hold_duration) {
    int on_time = brightness * interval;
    int off_time = (max_brightness * interval) - on_time;

    digitalWrite(input_pins[0], values[0]);
    digitalWrite(input_pins[1], values[1]);
    digitalWrite(input_pins[2], values[2]);
    delayMicroseconds(on_time);
    digitalWrite(input_pins[0], LOW);
    digitalWrite(input_pins[1], LOW);
    digitalWrite(input_pins[2], LOW);
    delayMicroseconds(off_time);
  }

  // --- fade out ---
  for (int b = brightness; b >= 0; b--) {
    int on_time = b * interval;
    int off_time = (max_brightness * interval) - on_time;

    digitalWrite(input_pins[0], values[0]);
    digitalWrite(input_pins[1], values[1]);
    digitalWrite(input_pins[2], values[2]);
    delayMicroseconds(on_time);
    digitalWrite(input_pins[0], LOW);
    digitalWrite(input_pins[1], LOW);
    digitalWrite(input_pins[2], LOW);
    delayMicroseconds(off_time);
  }
}

```

so, now, i have stages and i have pwm through digital output via a multiplexor. now, i just have to put things together :) 

---
# to do: 
learnt this from [[galt]]'s blog; started using it here. 

- [ ] figure out programming
- [ ] material recce & buy 
- [ ] look at led options
- [ ] order leds

---
# acknowledgements: 
[[alanna]] for giving me a coin-cell to test leds.

---

[^1]: veritasium spoke to [multiple physicists around the world](https://www.youtube.com/watch?v=bHIhgxav9LY), and sparked an [online debate](https://www.youtube.com/watch?v=oI_X2cMHNe0). in one of the videos, a professor says: "people think you're pumping electrons, which is so wrong". 

[^2]: global-electricity consumption in 2022, from a wikipedia page: https://en.wikipedia.org/wiki/Electric_energy_consumption
