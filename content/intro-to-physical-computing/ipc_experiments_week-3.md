---
date: 2025-09-18
tags:
  - experiments
noteOrder: "71"
draft: "false"
---
i worked for a bit on a circuit, and spent double that time debugging it; only to realise that a row on my breadboard wasn't working. that irritated me, so i went to micro-center to buy my own components. 

![[z_images/IMG_6288.webp]]

![[z_images/IMG_6289.webp]]

---
i also soldered a force-sensing-resistor (fsr). 

![[z_images/IMG_6283.webp]]

[[people/audrey|audrey]] later taught me to use heat-shrink tubes. 

![[z_images/IMG_6292.webp]]

---
i borrwed fsr-s for a bunch of ideas that i have. i needed them flat on a counter, and, since they're borrowed, i couldn't solder them. 

[[people/b(ethany)]] & [[people/audrey|audrey]] showed me how to use (i forgot the name) this tool: 

![[z_images/IMG_6290.webp]]

![[z_images/IMG_6291.webp]]

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

the perfect example of this is [[projects-by-other-people/durell bishop's answering machine]]. the marbles can be manipulated in far too many ways — i may choose to have different shelves, i may choose to discard them in a dustbin, i may choose to keep them in plates, carry them around, listen to them on the toilet, and what-not. 

---
don't know if this is the correct answer for this question: 

> q: Draw and upload a circuit for connecting a pushbutton as a digital input to a microcontroller. Connect it so that the digital input pin goes HIGH when the button is pushed. (PNG or JPG only).
> 
> ![[z_images/IMG_6312.webp]]

even this: 

> Draw and upload the circuit that goes with the program that you wrote for the last question (PNG or JPG only).
> 
> ![[z_images/IMG_6313.webp]]

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

![[z_images/IMG_6314.webp]]

---
helped [[people/summer|summer]] with [analog output](https://itp.nyu.edu/physcomp/videos/videos-digital-and-analog-input-and-output/#Analog_Output) and understood it better myself. 

i ran into a weird bug. every time i plug the arduino into a breadboard that has a servo, it fails to connect. but if i unplug it, it works fine. 

![[z_images/Screenshot 2025-09-19 at 2150.47.webp]]

every time i upload code with a servo motor on the circuit, it just doesn't work. it keep showing uploading, and then crashes. 

![[z_images/Screenshot 2025-09-19 at 22.11.56.webp]]

---

my servo doesn't get enough power. it brr-s (like a machine when you listen to it closely), but does not have enough power to perform actions. 

![[z_images/IMG_6316.mov]]


![[z_images/IMG_6318.webp]]

by debugging (and using other people's motors / a smaller motor), i realised that the problem *may* be in my jump wires / loose connections. 

---

i also opened the servo to see what was inside there. i believe the left side motor is a dc motion? and there's a microcontroller that determines the angle (maybe it calculates torque to produce a given angle or something). 

![[z_images/IMG_6321.webp]]

---
this is the circuit: 

![[z_images/IMG_6324.webp]]

this is the code: 

``` cpp
//servo tests; september 2025. 

#include <Servo.h>

Servo servo; 

int servo_pin = 9; 

void setup() {
  Serial.begin(9600); 
  servo.attach(servo_pin); 
}

void loop() { 
servo.write(90); 
delay (1000); 
servo.write(90); 
delay (1000); 
}

```

nothing happens. <mark>need to ask this in class.</mark>

i thought the library isn't included. but it reads servo.read.

![[z_images/Screenshot 2025-09-20 at 13.46.02.webp]]

---

i then went to [[people/fabri|fabri]] at the shop. my hunch was either a damaged port (on my computer) or the wire. we tested each component, checked it on his computer and it was, indeed, the stupid usb-wire. 

![[z_images/IMG_6325.webp]]

and here's the thing: my wire is not bad. here's proof: 

![[z_images/IMG_6331.mov]]

but whenever i connect a servo, it fails to communicate with it. i am so confused (and irritated, because i wanted to do things with the servo). i checked out a wire from the shop too, but it did not work. 

---

also helped [[people/summer|summer]] with understanding this piece of code: 

``` cpp
int speakerPin = 8;

float f = 0;

void setup() {
  // nothing to do here
  Serial.begin(9600);
  pinMode(speakerPin, OUTPUT);
  // pinMode(speakerPin, HIGH);
}

void loop() {
  // get a sensor reading:
  // int sensorReading = analogRead(A0);
  // Serial.println(sensorReading);
  // // map the results from the sensor reading's range
  // // to the desired pitch range:
  //  float frequency = map(sensorReading, 10, 900, 100, 1000);
  // // change the pitch, play for 10 ms:
  int millisec = millis();
  int seconds = millisec / 1000;

  if (seconds % 5 == 0) {
    f = random(260.00, 1000.00);
  }

  Serial.println(f);
  makeTone(f);

  // tone(speakerPin, f, 1000);
}

void makeTone(float frequency) {
  // set the period in microseconds:
  int period = (1 / frequency) * 1000000;
  // turn the speaker on:,
  digitalWrite(speakerPin, HIGH);
  // delay half the period:
  delayMicroseconds(period / 2);
  // turn the speaker off:
  digitalWrite(speakerPin, LOW);
  // delay half the period:
  delayMicroseconds(period / 2);
}
```

in the process, i understood frequency & periods a little bit better.

---

i <mark>did not understand this at all</mark>, and failed to replicate it too.

![[z_images/Pasted image 20250921160303.webp]]


---

i'm also confused about the what the arduino sends from the 5v port. internet research says 5v (then why do i have to power my breadboard with 5v?). 

okay, i resolved this. 

![[z_images/Pasted image 20250921162511.webp]]

without sending power out, my led still lights up. i assume this is through 5v. 

![[z_images/IMG_6331 1.mov]]

---

i then moved to some play. 

i wanted to make an led light up to the bounce of a ball. 

circuit: 

![[z_images/IMG_6334.webp]]

code: 

``` cpp
//bouncing ball led; september, 2025.

// want to bounce a ball, and reflect the bouncing (height-reduction) via an led. i don't know why.

int led_pin = A1;
int potentio_pin = A0;

void setup() {
  Serial.begin(9600);

  pinMode(potentio_pin, INPUT);
  pinMode(led_pin, OUTPUT);

  // test();  //always test everything on the breadboard.
}

void loop() {
  //read the potentiometer:
  int potentio_val = analogRead(potentio_pin);

  //remap to brightness:
  int p_val_mapped = map(potentio_val, 0, 1023, 0, 255);

  int val_to_pass = constrain(p_val_mapped, 0, 200);

  //pass values to led:
  analogWrite(led_pin, val_to_pass);
}

void test() {
  //led-blink:
  digitalWrite(led_pin, HIGH);
  delay(1000);
  digitalWrite(led_pin, LOW);
}
```


output: 

![[z_images/IMG_6335.mov]]

realised that a ball bounces on & off pressure too fast for the led to pass signal. so, i'm going to change this to digital output. 

i also fixed the bug of the potentio-meter having values due to electric noise with a state-change check. to avoid more, we might have to add three conditions checks, instead of the current two. 

![[z_images/IMG_6337 2.mov]]

``` cpp
//bouncing ball led; september, 2025.

// want to bounce a ball, and reflect the bouncing (height-reduction) via an led. i don't know why.

int led_pin = 9;
int potentio_pin = A0;
int last_potentio_val = 0; 

void setup() {
  Serial.begin(9600);

  pinMode(potentio_pin, INPUT);
  pinMode(led_pin, OUTPUT);

  // test();  //always test everything on the breadboard.
}

void loop() {
  //read the potentiometer:
  int potentio_val = analogRead(potentio_pin);

  // //remap to brightness:
  // int p_val_mapped = map(potentio_val, 0, 1023, 0, 255);

  // int val_to_pass = constrain(p_val_mapped, 0, 200);

  //you pass this value to the led: 
  if (last_potentio_val > 10 && potentio_val > 10){
    digitalWrite (led_pin, HIGH); 
  }else{
    digitalWrite (led_pin, LOW); 
  }

    last_potentio_val = potentio_val; 



  // //pass values to led:
  // analogWrite(led_pin, val_to_pass);
}

void test() {
  //led-blink:
  digitalWrite(led_pin, HIGH);
  delay(1000);
  digitalWrite(led_pin, LOW);
}

```

i think there's some sort of potential with <mark>a switch that can move</mark>. this goes more with my line of thought that [[tangibility makes data more manipulative]]. this is (also) the bedrock of flat tangible interfaces, like so: 

![[z_images/Pasted image 20250921171330.webp]]

---

also read [[intro-to-physical-computing/the design of implicit interactions, wendy ju & larry leifer|the design of implicit interactions, wendy ju & larry leifer]] (<- click this for notes). 

---
### 250922_2244: 
this class feels like a symphony rising up to a grand crescendo. there are so many ideas that [[people/tom|tom]] has been sharing in class, pulling us to think of interaction in different ways. 

we first looked at interaction; gathered collective vocabulary; touched the surface(s) of 'good' tool-making, 'invisible' design, and implicit machine interaction. 

then there are other courses that pull you in directions of 'magic', 'tool-making', and play. <mark>i can feel things boil</mark>, and i know the <mark>broth is exciting</mark>; but perhaps too pungent for me to handle this first semester. but i'll let it play out; i'll trust everyone who said "<mark>trust the process</mark>", and people's faith in my ability (largely [[people/shobhan|shobhan]] & [[people/prachi|prachi]]). 

![[z_images/IMG_6347.webp]]