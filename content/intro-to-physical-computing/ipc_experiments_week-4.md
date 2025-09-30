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

# 250929_1411: 
i wanted to make a servo work first. 

i knew i needed more current, to give it enough inertia. i grabbed 3 components, all from the transistor rack and read their data-sheets. one turned out to be a voltage regulator. 

![[z_images/IMG_6453 1.jpg]]

tip102 is an npn transistor. i chose to use that, because i understand how they work. 

in this case, the idea is that the servo has voltage coming in via the transistor. in hindsight, i may not understand how transistors work. 

![[z_images/IMG_6454.jpg]]

great; so, this doesn't work. 

![[z_images/IMG_6456.jpg]]

i'm going to figure out why. my first guess is that the motor is not receiving enough current. 

second test: 
the idea is to use a transistor to amplify the voltage given to the servo. 

![[z_images/IMG_6457.jpg]]

i also tried this, since the problem last time was the current not being regulated. 

![[z_images/IMG_6458.jpg]]

i then bugged [[people/nikolai|nikolai]] for help. we discussed how transistors are used, and how i may use a different power source to power the servo. he also suggested using an oscilloscope to debug my circuit. 

![[z_images/IMG_6459 1.jpg]]

i decided to do this, and have two different circuits. 

![[z_images/IMG_6460.jpg]]

this worked. 

![[z_images/IMG_6461.mov]]

i then started to look at the oscilloscope. 

this is the pulse my arduino sends via the digital output pin. 

![[z_images/IMG_6462.mov]]

voltage through the circuit, without & with a capacitor. 

![[z_images/IMG_6465.mov]]

![[z_images/IMG_6470.mov]]

another without: 

![[z_images/IMG_6466.mov]]

<mark>even if nothing was plugged in, the voltage was still fluctuating</mark> exactly like when i last measured it, even if i clicked the 'auto' button. that was weird. 

![[z_images/IMG_6471.mov]]

at this point, i only know how to see the pulse width modulation via an oscilloscope. i realised that the pulse width was too little. maybe that is what needs to be amplified via the transistor.

i then tried this. essentially, 3.3v (and whatever current) comes in through the arduino into the transistor. since digital-output sends less current, the <mark>transistor should amplify this current to the motor; thereby sending it more current to move</mark>. 

![[z_images/IMG_6473.jpg]]

that didn't work, and i'm not quite sure why. it should just connect 1 & 3. 

![[z_images/IMG_6475.jpg]]

i don't get it. <mark>what is wrong?  this should essentially boost the pulse</mark> going into the arduino. 

![[z_images/IMG_6476.jpg]]

but, when i measure with an oscilloscope, there *is* an increased voltage being passed via the transistor. 

![[z_images/IMG_6478.mov]]

to verify this, i plugged in another scope to measure the 'in' and 'out' via the transistor. 

![[z_images/IMG_6479.jpg]]

and, as expected, the voltage out from the transistor is much higher. why, then, does it not affect the servo motor? 

![[z_images/IMG_6480.mov]]

why, then, does this not work? 

![[z_images/IMG_6481.mov]]

but, i understood transistors a lot more in this week. i might come in tomorrow and work a bit on trying to make a beat-maker of sorts, with fsr-s as the interface. 

---
