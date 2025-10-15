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
