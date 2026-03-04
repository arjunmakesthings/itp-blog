---
date: 2026-03-01
tags:
  - experiments
noteOrder: "267"
draft: "false"
---
# ask: 
think of additions for the midterm: 

> We are going to build a collective instrument, in which each “key” triggers a sound via an object you have designed. Each student in the class will be assigned two of 32 possible keys. You will install your two sound producing objects in the IDM gallery at 370 Jay Street, and they will be playable using a keyboard controller installed in the space.

---
# thought: 
### instrument 1: you are the instrument
a circuit that zaps you as you play, so that you make the sound. 
zapper circuit reference: https://medium.com/@shubhanshu.sensai/how-to-make-a-harmless-electric-shocker-a72e391b0b4c

read that it wasn't safe: https://forum.arduino.cc/t/how-to-build-a-safe-shocker-party-zapper/586864

so, i walked around and found an old keyboard on the itp-junk-shelf. in the first class, someone recorded the sound of a keyboard tapping. i thought it would be interesting if the keyboard is live destroyed with a key from a keyboard. 
### instrument 2: vco + shiftregister + feedback mechanism
this is a complex circuit with a few parts. 

first, a vco. 

the voltage is controlled by different resistors at the end of the shift register. when a person hits the key, it should send out the output through the resistors into the vco — that should change the frequency. 

the speaker faces a mic which forms a feedback loop for some time (based on rc constant). the longer you hold, the more feedback it should produce. 

---
# outputs: 

---
made this. 

![[IMG_7576.mp4]]






