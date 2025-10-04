---
date: 2025-10-02
tags:
  - experiments
noteOrder: "104"
draft: "false"
---
started a [[intro-to-physical-computing/midterm-log|midterm-log]], reflected on the ask. 

---
learnt about relays. realised that i was using a relay all along; which [[people/nikolai|nikolai]] gave me: 

![[z_images/IMG_6497.jpg]]

relays make use of the fact that electric current produces a magnetic field (see [[intro-to-physical-computing/electromagnetism|electromagnetism]]), and allow two metal pieces to connect together, when voltage is passed through a source (much like a transistor). relays do this mechanically, while transistors do this electronically (a switch). 

---

i got a relay from the shop. no one had the pins for it though, and the negative-ends of the jump wires don't fit. 

![[z_images/IMG_6498.jpg]]

i went to [[david rios]] wondering whether he had the pins for these. he didn't, but he was kind enough to give me two of his relays. 

![[z_images/IMG_6500.jpg]]

---
understood different types of actuators: 

https://vimeo.com/380174619

worked with a linear actuator. realised that i need to <mark>reverse the polarity</mark> to make it go backwards. that was interesting to me. 

![[z_images/IMG_6504.mov]]

i'm going to try and build a circuit that performs sort of drawing. 

---
i first thought about how i could alternate current. i figured that i could do this with two transistors, but then later read about h-bridges. 






![[z_images/IMG_6505.jpg]]

motor drivers have logic gates inside them, that open or close based on certain conditions. 

![[z_images/Screenshot 2025-10-02 at 21.11.34.png]]

that's fucking beautiful. 

![[z_images/Screenshot 2025-10-02 at 21.12.41.png]]

source: https://cdn.sparkfun.com/assets/0/1/b/b/3/TB6612FNG.pdf


![[z_images/Pasted image 20251002211322.png]]

source: https://knowledge.ni.com/KnowledgeArticleDetails?id=kA03q000000YHvvCAG&l=en-US

---
i made a circuit, and realised that 'low' does not mean off. 

![[z_images/IMG_6508.jpg]]

i made a linear actuator move with a manual h-bridge. 

![[z_images/IMG_6511.mov]]

![[z_images/IMG_6512.jpg]]

now, i'm going to attach a servo on this, so that people can draw. i will first test it, and then clean up the wiring. 

decided to use a stepper instead, so that i understand that more. 