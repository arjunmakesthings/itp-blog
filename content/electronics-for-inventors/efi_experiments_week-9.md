---
date: 2026-03-24
tags:
  - experiments
noteOrder: "297"
draft: "false"
---
redid the shift register stuff from [[efi_class-6]]. 

---
first understood the shift-register. 

the 74HC595 series works better for me than the 16 series. i believe the 16 series is for inputs, and not outputs. 

in the 595-series, there are a few things to remember: 
- ser: data in (this is the 1/ 0 you are sending). 
- ser can only be inputted (whether 1 or 0) with each clock pulse. this is a rising-edge-triggering setup (only a low -> high pushes data into the shift register). 
- so, with a ser & clock to high, you input data into the shift-register. 
- now, to shift it out of the register, i.e to outputs, you use rclk or latch or storage-clock. 
- output enabled needs to be high. usually this is a ! pin, meaning that it has to be inverse (low). same for srclr. 

pushing a 1 -> shifting it -> shifting 0s to the rest. 

![[shift register normal.mp4]]

same button controls shift-register & storage clock. 

![[same clocks.mp4]]