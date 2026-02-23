---
date: 2026-02-21
tags:
  - experiments
noteOrder: "248"
draft: "false"
---
wiring similar to that of a d.c. motor. 

![[IMG_7519.webp]]

different voltage levels control intensity of pulses. 

also made a three -finger motor driver to test for sensory funneling illusion. i dislike that i have to use the arduino for this, but know that i could perhaps link each motor to a different 555 in astable mode and change the timing quicker. the circuits would also be much neater. 

![[IMG_7521.jpg]]


![[IMG_7520.mp4]]

frankly, we didn't have enough time to experience how it 'feels' like on different parts of the body. 

---

code to make three motors vibrate: 

``` cpp
int motors[3] = {10,11,12}; 

void setup() {
  // put your setup code here, to run once:

  for (int i = 0; i<3; i++){
    pinMode(motors[i], OUTPUT); 
  }

}

void loop() {
  // put your main code here, to run repeatedly:

    for (int i = 0; i<3; i++){
    analogWrite(motors[i], 100); 
    delay(500); 
    analogWrite(motors[i], 0); 
  }


}

```

better: 

``` cpp
//3 motors.

int motors[3] = { 10, 11, 12 };

int strength = 250;
unsigned long pulse_dur = 50;
unsigned long rest = 1000;

unsigned long prev_millis = 0;

int curr_motor = 0;
bool motor_state = false;  // false is resting; true is pulsing.

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(motors[i], OUTPUT);
  }
}

void loop() {
  unsigned long curr_millis = millis();

  if (motor_state) {
    //means pulsing. 
    if (curr_millis - prev_millis >= pulse_dur) {
      //turn off. 
      analogWrite(motors[curr_motor], 0);
      motor_state = false;
      prev_millis = curr_millis;
    }
  } else {
    //means resting. 
    if (curr_millis - prev_millis >= rest) {
      analogWrite(motors[curr_motor], strength); 
      motor_state = true;
      prev_millis = curr_millis;

      curr_motor++;
      if (curr_motor >= 3) {
        curr_motor = 0;
      }
    }
  }
}

```