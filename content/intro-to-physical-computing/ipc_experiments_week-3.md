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


