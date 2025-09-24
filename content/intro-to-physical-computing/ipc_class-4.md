---
date: 2025-09-23
tags:
  - lectures
noteOrder: "83"
draft: "false"
---
discussed the use of transistors to boost speaker volume. 

![[z_images/IMG_6353.jpg]]

corrected my circuit: 

![[z_images/IMG_6352.jpg]]

in doing so, i realised that the arduino <mark>output pins are not meant to serve power</mark>. they are meant to <mark>give little voltage spikes</mark> to register changes (and then to do something based on those switches (such as recognising a switch turning on & off)). 

we discussed my strange case of the servo motor, and [[people/tom|tom]] explained that this was perhaps because the motor did not have enough electricity to <mark>overcome inertia</mark>. we explored the use of a capacitor (to make sure that the <mark>current through the circuit is consistent</mark>), and giving the servo more voltage to begin with (5v instead of 3v). 

![[z_images/IMG_6349.jpg]]

it worked. 

---
we also discussed that the output pins give as little as 1.5amps. 

---
[[people/tom|tom]] asked me to look at [[programmable resistors]] and [[digital potentiometers]]. 

---
we also had a base-level discussion about <mark>making 'right' assumptions as a designer</mark>, <mark>where people need autonomy and where it's beneficial for machines to have it</mark>. 

i do feel a little discontent with the class — the discussions are not as fruitful or critical as i expected them to be, because a bunch of people don't speak out or complete the reading. they don't share their thoughts, and that way our thought (as a group) does not have enough inertia to move in a different direction (that is impossible to do ourselves). 

