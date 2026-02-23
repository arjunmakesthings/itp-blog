---
date: 2026-02-22
tags:
  - experiments
noteOrder: "250"
draft: "false"
---
learnt about [[electromyographic sensors]], that record electrical activity produced by skeletal muscles. [[kate hartman]] also showed her [kinetic wearables toolkit](https://github.com/socialbodylab/KineticWearablesToolkit). 

---

haptic motors also have specific motor drivers such as [these](https://www.adafruit.com/product/2305) that allow a person to send out pre-programmed effects. 

![[Screenshot 2026-02-22 at 19.19.07.png]]

this wasn't particularly of interest to me — it's just turning intensity into an envelope like sound does with amplitude. 

---

made this: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/7duMe4eKfMk?si=SGkgtL6fTfxnB-L6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

![[IMG_7536.webp]]

code: 

``` cpp

//used chat-gpt to build parts of my sketch because there wasn't enough time.

int number_fsr   = A0;
int operation    = A1;
int result_seek  = A2;

int result_motor = 10;

int number_prev    = 0;
int operation_prev = 0;
int result_prev    = 0;

int threshold = 70;   // raised for stability (0–1023 range)

// calculator variables
int num1 = 0;
int num2 = 0;
int result = 0;

int tap_count = 0;
unsigned long last_tap_time = 0;
unsigned long tap_timeout = 600;

bool operation_selected = false;

void setup() {
  Serial.begin(9600);

  analogReadResolution(10);   // important for Nano 33 IoT (0–1023)
  analogWriteResolution(8);   // standard PWM range 0–255

  pinMode(result_motor, OUTPUT);
}

void loop() {
  read_number_fsr();
  read_operation_fsr();
  read_result_seek();

  // analogWrite(result_motor, 200); 
  // delay (1000); 
}

void read_number_fsr() {

  int curr = analogRead(number_fsr);

  // rising edge detection
  if (number_prev < threshold && curr >= threshold) {
    tap_count++;
    last_tap_time = millis();
    Serial.print("tap detected: ");
    Serial.println(tap_count);
    delay(150);  // small debounce
  }

  // finalize number after timeout
  if (tap_count > 0 && millis() - last_tap_time > tap_timeout) {

    if (!operation_selected) {
      num1 = tap_count;
      Serial.print("num1 set to: ");
      Serial.println(num1);
    } else {
      num2 = tap_count;
      Serial.print("num2 set to: ");
      Serial.println(num2);
    }

    tap_count = 0;
  }

  number_prev = curr;
}

void read_operation_fsr() {

  int curr = analogRead(operation);

  if (operation_prev < threshold && curr >= threshold) {

    if (!operation_selected && tap_count > 0) {
      num1 = tap_count;
      tap_count = 0;
      Serial.print("num1 finalized as: ");
      Serial.println(num1);
    }

    if (num1 == 0) {
      Serial.println("cannot select operation. num1 not set.");
    } else {
      operation_selected = true;
      Serial.println("operation selected: +");
      Serial.println("enter num2...");
    }

    delay(200);  // debounce
  }

  operation_prev = curr;
}

void read_result_seek() {

  int curr = analogRead(result_seek);

  // rising edge detection
  if (result_prev < threshold && curr >= threshold) {

    if (num1 == 0 || num2 == 0) {
      Serial.println("cannot calculate. missing number.");
    } else {
      calculate_result();
      vibrate_motor(result);
    }

    // reset state
    num1 = 0;
    num2 = 0;
    result = 0;
    operation_selected = false;

    Serial.println("system reset");
    Serial.println("------------------");
  }

  result_prev = curr;
}

void calculate_result() {

  result = num1 + num2;

  Serial.print("calculating: ");
  Serial.print(num1);
  Serial.print(" + ");
  Serial.print(num2);
  Serial.print(" = ");
  Serial.println(result);
}

void vibrate_motor(int times) {

  if (times <= 0) {
    Serial.println("result zero. no vibration.");
    return;
  }

  Serial.print("vibrating ");
  Serial.print(times);
  Serial.println(" times");

  for (int i = 0; i < times; i++) {

    analogWrite(result_motor, 253);  // full power
    delay(500);                      // longer pulse so motor spins up
    analogWrite(result_motor, 0);
    delay(500);
  }
}
```

learnt (still not 100% sure) that different transistors have different levels of frequency by which they can send signals to open & close the gate. 

the circuit worked with a tip-102, but not a 2n3904. 

that can't be possible, because the smaller transistors work fine for audio signals, which oscillate at higher rates (i assume). 

---

