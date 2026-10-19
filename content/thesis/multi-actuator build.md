---
date: 2026-10-16
tags:
  - experiments
noteOrder: "537"
draft: "false"
---
after [[discussion with aram & ryan]] & writing [[taking stock]], [[aram]]'s words stayed in my head: 

> what's the simplest prototype you can build that shows this thing that you want to communicate? 

i looked at all the actuators i had — servos, haptic-motors & solenoids, and realized that all i needed to do was program 2-dimensional automata (see [[making 2-d automata]]), and actuate things in the real world to be able to feel the differences between seeing something on the screen versus perceiving it in another way.

threw on a quick circuit together that is modular — i.e i can plug any output actuation device, and the code & circuit should run with minimal changes. 

![[IMG_8612-1.webp|497]]

multi-servo test sketch:

![[IMG_8610.mp4]]

[[aram]] kindly complemented me by saying that this was the fastest he's seen anyone put up a circuit. 

later, went back & cleaned it up. 

![[IMG_8611.webp|490]]

being around [[aram]] has made me better at thinking about a neat system from the get-go, so that prototyping doesn't go through this messy -> cleaning up process. i think — inspired by him — i strive for clarity of final form.

---

achieved with [[making 2-d automata]]. 

![[IMG_8618.mp4]]

