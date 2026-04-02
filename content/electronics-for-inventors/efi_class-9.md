---
date: 2026-04-01
tags:
  - lectures
noteOrder: "288"
draft: "false"
---
spoke about motors. 

[[pedro]]'s definition of an actuator: 
- three types : pneumatic (gas), hydraulic (liquid), electric; operated with:
	- control signal + energy source => movement. 

saw windshield wiper motors, servos, dc, etc. learnt about how each one of them works. 

https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one/all

> As the windings are energized, they attract to the magnets located around the motor. This rotates the motor until the brushes make contact with a new set of commutator contacts. This new contact energizes a new set of windings and starts the process again. To reverse the direction of the motor, simply reverse the polarity on the motor contacts. Sparks inside a brush motor are produced by the brush jumping to the next contact. Each wire of a coil is connected to the two closest commutator contacts.

![[260401_dc-motor.png]]

![[260401_dc-inside.webp]]

==brushless motors have more power==. they operate a bit differently. 

![[brushless_diagram.webp]]

---

the way to control a motor is: 

control -> driver -> motor. 

spoke about generating pulse-width-modulation to tell a servo angle to rotate to. servos expect a pulse every 20ms or so. ==just by changing the duty cycle, you can tell a servo what angle to rotate to.==

![[260401_servos.webp]]

this is an example of a ==closed-loop circuit== where the motor speaks back to the control. the control keeps asking: did you get there => if not, keep moving. 

this can be done by adding a ==position potentiometer== to tell the microcontroller its current position. most servos have this, and a chip (a mictrocontroller). 

then spoke about steppers. ==steppers need current to stay in position==. they are usually ==power hungry==, and ==move in steps==. 

==to check the coils, one can do continuity.== the wires that have continuity belong to the same coil. 



