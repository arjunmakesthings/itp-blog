---
date: 2025-09-18
tags:
  - experiments
noteOrder: "71"
draft: "false"
---
i worked for a bit on a circuit, and spent double that time debugging it; only to realise that a row on my breadboard wasn't working. that irritated me, so i went to micro-center to buy my own components. 

![[z_images/IMG_6288.jpg]]

![[z_images/IMG_6289.jpg]]

---
i also soldered a force-sensing-resistor (fsr). 

![[z_images/IMG_6283.jpg]]

[[people/audrey|audrey]] later taught me to use heat-shrink tubes. 

![[z_images/IMG_6292.jpg]]

---
i borrwed fsr-s for a bunch of ideas that i have. i need them flat on a counter, and, since they're borrowed, i can't solder them. 

[[b]] & audrey showed me how to use (i forgot the name) this tool: 

![[z_images/IMG_6290.jpg]]

![[z_images/IMG_6291.jpg]]

i then tested my fsr. realised that since it senses force, i can make <mark>playful switches</mark>. 

![[z_images/IMG_6293.mov]]

``` cpp
/*
modified from tom's analog input sketch. 
*/

int sensorPin = A1;   // select the input pin for the potentiometer
int ledPin = A2;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor

void setup() {
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);
}

void loop() {
   // read the sensor on analog pin 0:
  int sensorValue = analogRead(sensorPin);

  //convert analog reading to a brightness value: 
  float send = constrain(map(sensorValue, 0, 1023, 0, 255), 10, 255); //the digitalWrite sends a pulse signal between 0 (off)-255 (high). but, the sensor always has noise, so we constrain it. 

  analogWrite(ledPin, send); //send this to the led. 
}
```

---
i had a bunch of experiences this week, that solidified my understanding of [[intro-to-physical-computing/no to noui, by timo arnall (against invisible design)|no to noui, by timo arnall (against invisible design)]]. 

it is not merely about making everything visible, but <mark>tangible</mark>, because [[tangibility makes magic more plausible]] & <mark>tangible objects  can be manipulated in infinite humanly-imaginable ways</mark> (that software just can't — because software assumes strong pre-determination about the course of actions a person will take).

but, and owing to my past work with behaviour-design, i know that people are irrational (and will use objects in the strangest of ways to make it do the task they want). 

the perfect example of this is [[durell bishop's answering machine]]. the marbles can be manipulated in far too many ways — i may choose to have different shelves, i may choose to discard them in a dustbin, i may choose to keep them in plates, carry them around, listen to them on the toilet, and what-not. 

---
don't know if this is the correct answer for this question: 

> q: Draw and upload a circuit for connecting a pushbutton as a digital input to a microcontroller. Connect it so that the digital input pin goes HIGH when the button is pushed. (PNG or JPG only).
> 
> ![[z_images/IMG_6312.jpg]]

even this: 

> Draw and upload the circuit that goes with the program that you wrote for the last question (PNG or JPG only).
> 
> ![[z_images/IMG_6313.jpg]]

filled the quiz: 

![[z_images/quiz-2.pdf]]

---

> The Arduino and other digital microcontrollers generally can’t produce a varying voltage, they can only produce a high voltage or low voltage. Instead, you <mark>“fake” an analog voltage by producing a series of voltage pulses at regular intervals</mark>, and varying the width of the pulses. This is called pulse width modulation (PWM). The resulting average voltage is sometimes called a pseudo-analog voltage.

> The time the pin is high (called the pulsewidth) is about half the total time it takes to go from low to high to low again. This ratio is called the duty cycle and the total time from off through on to off again is the period. 
> 
> duty is a value from 0 – 255. 0 corresponds to 0 volts, and 255 corresponds to 5 volts. Every change of one point changes the pseudo-analog output voltage by 5/255, or  0.0196 volts.

if you <mark>decrease the pulse-width (make it communicate more), then the effective voltage reduces</mark>. 

---
> To pulse the servo, you generally give it a 5-volt, positive pulse between 1 and 2 milliseconds (ms) long, repeated about 50 times per second (i.e. 20 milliseconds between pulses).

got alligator clips, and got a stable voltage of 5.2v. 

![[z_images/IMG_6314.jpg]]



---
helped [[people/summer|summer]] with [analog output](https://itp.nyu.edu/physcomp/videos/videos-digital-and-analog-input-and-output/#Analog_Output) and understood it better myself. 

i ran into a weird bug. every time i plug the arduino into a breadboard that has a servo, it fails to connect. but if i unplug it, it works fine. 

![[z_images/Screenshot 2025-09-19 at 21.50.47.png]]

every time i upload code with a servo motor on the circuit, it just doesn't work. it keep showing uploading, and then crashes. 

![[z_images/Screenshot 2025-09-19 at 22.11.56.png]]

---

my servo doesn't get enough power. it brr-s (like a machine when you listen to it closely), but does not have enough power to perform actions. 

![[z_images/IMG_6316.mov]]


![[z_images/IMG_6318.jpg]]

by debugging (and using other people's motors), i realised that the problem *may* be in my jump wires / loose connections. 

---

i also opened the servo to see what was inside there. i believe the left side motor is a dc motion? and there's a microcontroller that determines the angle (maybe it calculates torque to produce a given angle or something). 

![[z_images/IMG_6321.jpg]]

---
