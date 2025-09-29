---
date: 2025-09-25
tags:
  - experiments
noteOrder: "90"
draft: "false"
---
began with a bunch of unconnected thoughts, and a conversation with [[tom]]. 

![[z_images/IMG_6445.jpg]]

i then began to do [[intro-to-physical-computing/research|research]]. i was primarily inspired by [programmable droplets](https://tangible.media.mit.edu/project/programmable-droplets/). i remember seeing this a couple of years ago, when i was thinking of responsive graphic design (which didn't quite pan out). 

the idea of physical objects moving programmatically (not robots) was exciting to me. the simplest way for me to make this was to use [[intro-to-physical-computing/electromagnetism]], and make a panel with a grid of electromagnets that i could, then, control programatically. 

![[z_images/IMG_6446.jpg]]

---
then, i attempted to make a couple of electromagnets, to programmatically move an object between them. 

![[z_images/IMG_6368 1.jpg]]

![[z_images/IMG_6369 1.jpg]]

![[z_images/IMG_6370 1.jpg]]

![[z_images/IMG_6372.jpg]]

that didn't work. [[people/christina tang|christina tang]] & i later spoke about electromagnets (perhaps less current was flowing through it), and she explained transistors to me. 

![[z_images/IMG_6376.jpg]]

essentially, transistors are of two types: npn or pnp, meaning that npn (negative positive negative) closes the switch to allow current to pass through it (when the switch or base receives voltage), whereas pnp opens the gate (not allowing current to pass). every transistor falls within these two types. 

i then made and tested many more self-made-electromagnets. 

![[z_images/IMG_6439.jpg]]

![[z_images/IMG_6444.jpg]]

none of them worked. current passed through them, and i removed the arduino to pass 12v too. but nothing happened. 

someone then suggested that i talk to [[people/nikolai|nikolai]]. he gave me a magnetically-operated switch (which was very cool), to test whether the electromagnets were generating even the slightest bit of magnetism. 

![[z_images/IMG_6441.mov]]

![[z_images/IMG_6443.mov]]

none of them did. i also studied a bunch of electromagnet-math: 

$$
F = (Fm)2 μ0 A / (2 g2) 
$$

and

$$
F = (N*I)2 μ0 A / (2 g2),
$$
where:

μ0 = 4π*10power-7

F is the force in Newtons

N is the number of turns

A is the area in length units squared

I is the current in Amps

g is the length of the gap between the solenoid and a piece of metal.

https://www.instructables.com/POWERFUL-ELECTROMAGNET-5KG-LIFTING/

---

watched a little bit of [sensor-interfacing](https://itp.nyu.edu/physcomp/videos/videos-sensors/#Sensor_Interfacing), as part of the lab. 

i'm going to come in tomorrow and just mess around with sensors, reading data, and making small, fun things instead of trying to get this massive project to work. 

---


