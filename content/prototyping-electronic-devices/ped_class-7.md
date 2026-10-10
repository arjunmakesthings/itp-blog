---
date: 2026-10-09
tags:
  - lectures
noteOrder: "513"
draft: "false"
---
``` c
void setup() {
  pinMode(12, OUTPUT);
  pinMode(11, INPUT);

  pinMode(14, OUTPUT);
  pinMode(15, OUTPUT);
}

void loop() {
  digitalWrite(14, HIGH);
  digitalWrite(15, HIGH);
  pinMode(12, OUTPUT);
  pinMode(11, INPUT);
  delay(100);

  digitalWrite(15, HIGH);
  digitalWrite(14, LOW);
  pinMode(12, INPUT);
  pinMode(11, OUTPUT);
  delay(100);
}

```


more complex: 

``` cpp
int cathodes[2] = { 12, 11 };
int anodes[4] = { 14, 15, 10, 9 };

int del = 100;

void setup() {

  for (int i = 0; i < 4; i++) {
    pinMode(anodes[i], OUTPUT);
  }
}

void loop() {
  // digitalWrite(anodes[0], HIGH);
  // digitalWrite(anodes[1], HIGH);
  // digitalWrite(anodes[2], HIGH);

  // pinMode(cathodes[0], OUTPUT);
  // pinMode(cathodes[1], INPUT);
  // delay(500);

  // reset();

  // digitalWrite(anodes[2], HIGH);

  // pinMode(cathodes[1], OUTPUT);
  // pinMode(cathodes[0], INPUT);
  // delay(500);

  digitalWrite(anodes[0], HIGH);
  pinMode(cathodes[0], INPUT);
  pinMode(cathodes[1], OUTPUT);

  delay(del);

  reset(); 

  digitalWrite(anodes[1], HIGH);
  digitalWrite(anodes[3], HIGH);
  pinMode(cathodes[1], INPUT);
  pinMode(cathodes[0], OUTPUT);

  delay(del);
  reset(); 

  digitalWrite(anodes[2], HIGH);
  pinMode(cathodes[0], INPUT);
  pinMode(cathodes[1], OUTPUT);

  delay(del);
  reset(); 

  digitalWrite(anodes[2], HIGH);
  digitalWrite(anodes[0], HIGH);
  pinMode(cathodes[1], INPUT);
  pinMode(cathodes[0], OUTPUT);

  delay (del); 
  reset(); 
}

void light_up_top(int arr){
  Serial.println(arr); 
}

//helper to reset:
void reset() {
  for (int i = 0; i < 4; i++) {
    digitalWrite(anodes[i], LOW);
  }
}
```



``` cpp
const int cathodes[] = { 12, 11 };
const int anodes[] = { 14, 15, 10, 9 };

const int num_cathodes = sizeof(cathodes) / sizeof(cathodes[0]);
const int num_anodes = sizeof(anodes) / sizeof(anodes[0]);

// cathode row indices
const int top = 0;
const int bottom = 1;

int del = 100;

void setup() {
  for (int i = 0; i < num_anodes; i++) {
    pinMode(anodes[i], OUTPUT);
  }
  reset();
}

void loop() {
  int top_pins[] = { anodes[0] };
  light_up(top_pins, 1, top);

  int bottom_pins[] = { anodes[2] };
  light_up(bottom_pins, 1, bottom);
}

// helpers:

// light any number of anodes against one cathode row
void light_up(const int pins[], int count, int row) {
  select_row(row);

  for (int i = 0; i < count; i++) {
    digitalWrite(pins[i], HIGH);
  }

  delay(del);
  reset();
}

// active cathode sinks current (output low), the rest float (input)
void select_row(int row) {
  for (int i = 0; i < num_cathodes; i++) {
    if (i == row) {
      pinMode(cathodes[i], OUTPUT);
      digitalWrite(cathodes[i], LOW);
    } else {
      pinMode(cathodes[i], INPUT);
    }
  }
}

// all anodes low, all cathodes floating
void reset() {
  for (int i = 0; i < num_anodes; i++) {
    digitalWrite(anodes[i], LOW);
  }
  for (int i = 0; i < num_cathodes; i++) {
    pinMode(cathodes[i], INPUT);
  }
}

```

