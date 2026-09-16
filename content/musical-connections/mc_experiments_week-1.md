---
date: 2026-09-16
tags:
  - experiments
noteOrder: "471"
draft: "false"
---
started working with the lidar sensor — vl53ldk. couldn't find official datasheet; adafruit vl53x library just works. 

``` cpp
#include "Adafruit_VL53L0X.h"

Adafruit_VL53L0X lox = Adafruit_VL53L0X();

void setup() {
  Serial.begin(115200);

  // wait until serial port opens for native USB devices
  while (!Serial) {
    delay(1);
  }

  Serial.println("Adafruit VL53L0X test.");
  if (!lox.begin()) {
    Serial.println(F("Failed to boot VL53L0X"));
    while (1)
      ;
  }
  // power
  Serial.println(F("VL53L0X API Continuous Ranging example\n\n"));

  // start continuous ranging
  lox.startRangeContinuous();

  pinMode(12, OUTPUT);
}

void loop() {
  if (lox.isRangeComplete()) {
    Serial.print("Distance in mm: ");
    Serial.println(lox.readRange());
  }
  int val = map(lox.readRange(), 40, 8190, 500, 2000);

  tone(12, val, 10);
}

```

![[IMG_8441.mp4]]

