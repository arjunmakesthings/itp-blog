---
date: 2025-09-04
tags:
  - experiments
noteOrder: "23"
draft: "false"
---
# testing multimeter: 
couldn't get multimeter to beep, as said here: https://itp.nyu.edu/physcomp/labs/electronics/

tried two multimeters. but i know they're working, because [[people/matt | matt]] & i tested it on an active circuit. 

i asked [[people/tom igoe|tom igoe]], and he told me that i was using the wrong mode. the dials on the multimeter select different modes. for continuity, you want to put the dial on continuity. 

![[z_images/IMG_6113.jpg]]

---
# what's inside a jumper wire: 
broke a jump wire. became curious about what's inside a jumper wire. 

![[z_images/IMG_6114.jpg]]

https://en.wikipedia.org/wiki/Jump_wire

it seems like it's made from some kind of metal inside, and an insular layer outside. there is a fragile pin, that is then used to connect to breadboards. 

---
# checking for continuity on a breadboard: 
i wanted to see if i could check continuity on a breadboard. 

![[z_images/IMG_6115.jpg]]

however this didn't beep as it was supposed to. i can't figure out why, and will ask the p-comp help-desk today. 
### update: 250904+1539: 
[[octavio]] & [[audrey]] helped me understand why this was happening. the positive & the negative never meet (although i assumed that they meet in the multimeter). i still don't fully understand this, and will ask tom in class. 


---
# checking power supply from a dc outlet: 
used a multimeter to test power-supply from a dc-power-supply. 

![[z_images/IMG_6117.jpg]]

---

# powering an led with just dc power supply: 
realised that we aren't really using the arduino right now. so, used dc-supply direct to power an led. 

![[z_images/IMG_6119 1.jpg]]

that led stopped working. always use a resistor. 

---
# understanding resistors: 
looked at [[intro-to-physical-computing/ohm's law|ohm's law]], and the fact that [[intro-to-physical-computing/you can conduct electricity through so many materials|you can conduct electricity through so many materials]]. 

---
# conducting electricity outside the breadboard: 
i made a floating led, because i realised that i can conduct *outside* the breadboard. 

![[z_images/IMG_6121.jpg]]

i tried conducting electricity through water, but did not succeed. i do not know why, since the electrical-circuit remains the same. 

![[z_images/IMG_6122.jpg]]

[[people/octavio|octavio]] made me see that the led was probably lighting, but the water wasn't conductive enough. so, i added salt to the water to make it more conductive.

![[z_images/IMG_6126.jpg]]

![[z_images/IMG_6125.jpg]]

![[z_images/IMG_6128.jpg]]

the water also made bubbles, which i thought were very cool. this is perhaps because salt & electricity are reacting in some way. 

![[z_images/IMG_6127.mov]]

---
# understanding  transistors: 


