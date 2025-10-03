---
date: 2025-09-02
tags:
  - lectures
  - reading
noteOrder: "4"
draft: "false"
---
a list of electrical components, and what they do; as learnt in [[intro to physical computing]]. 

# resistor: 
a resistor essentially takes electricity as input, and limits the output. the resistance (see [[intro-to-physical-computing/electricity]]) used must be appropriate for the output, and is usually understood by the type of band that is present on the resistor. 

![[z_images/Screenshot 2025-09-02 at 23.05.35.png]]
<figcaption>image from <a href = "https://resistorcolorcodecalc.com/">resistor color code calculator</a>.</figcaption>

there are different types of resistors; some are variable (change resistance based on data such as light or force). 

![[z_images/Screenshot 2025-09-03 at 18.14.18.png]]

video used: https://www.youtube.com/watch?v=QHk8vS5c1iE
two main types that i see in the shop: 

![[z_images/Screenshot 2025-09-06 at 13.06.07.png]]

left is carbon-based, and the right is metal-based. higher resistance (ohm-values) have more 'grooves', for the current to bounce around more (and lose heat). 

![[z_images/Screenshot 2025-09-06 at 13.07.14.png]]

then saw this: https://www.youtube.com/watch?v=O2hFh6w0FRw

understood that the resistance is calculated like so: 

```
r = (v(source) - v(load)) / i (current)
```


---
# microcontrollers: 
simple computers designed to take input and give output; essentially a fancy voltage-manipulator. arduino is a type of microcontroller, and [[people/tom]] co-founded it. 

here is a diagram for the nano-33, which we use in class: 

![[z_images/Pasted image 20250903235131.png]]

---
# multimeters: 
played around with in [[intro-to-physical-computing/ipc_experiments_week-1|ipc_experiments_week-1]]. 

these measure voltage, resistance and amperage; and are good tools to check circuits and different components. 

![[z_images/Screenshot 2025-09-04 at 18.07.43.png]]

---
# voltage regulators:
change fluctuating voltage to consistent voltage. 

![[z_images/Pasted image 20250904180858.png]]
the pins are easy to remember: 

![[z_images/Screenshot 2025-09-04 at 18.10.01.png]]

---
# capacitors: 
store energy when energy comes in, and then releases it when the energy stops. 

![[z_images/Pasted image 20250906115657.png]]

---
# diodes
permit voltage to flow in one direction, and block it in another. leds are a type of diodes. 

---
# transistors: 
act as electronic switches. when a small voltage is put to the base and emitter, it allows a larger current and voltage to flow from the collector to the emitter. 

![[z_images/Pasted image 20250911093921.png]]

look very similar to voltage regulators. 

explained by [[people/christina tang|christina tang]] in [[intro-to-physical-computing/ipc_experiments_week-4|ipc_experiments_week-4]]: 

> essentially, transistors are of two types: npn or pnp, meaning that npn (negative positive negative) closes the switch to allow current to pass through it (when the switch or base receives voltage), whereas pnp opens the gate (not allowing current to pass). every transistor falls within these two types. 

![[z_images/IMG_6376.jpg]]

---
# microcontrollerS: 
a simple processor (see below for definition) that can do only one task, like listening to sensors. 

> Other devices, like light, heat, or motion sensors, motors, lights, our sound devices, are attached to these pins to allow the microcontroller to be sensitive to the world and to express itself.
> 
> from the [itp-physcomp-page](https://itp.nyu.edu/physcomp/lessons/microcontrollers-the-basics/).


Generally, the term microcontroller refers to [[terms & concepts/firmware|firmware]]-only processor. 

from: https://itp.nyu.edu/physcomp/lessons/microcontrollers-the-basics/

---
# computer  / processor: 
anything that can run a program. 

---
# development boards: 

a processor needs a bunch of other components, which is pre-packaged into a development board. 

> A processor, whether microcontroller or multimedia processor, can’t operate alone. It needs support components. For a microcontoller, you need at least a voltage regulator and usually an external clock called a crystal. You might also add circuitry to protect it in case it’s powered wrong, or in case the wrong voltage and current are plugged into the IO pins. You might include communications interfaces as well. This extra circuitry determines the base cost of a development board like the Arduino (Figure 5) or the Raspberry Pi (Figure 6).

![[z_images/Screenshot 2025-09-11 at 10.23.43.png]]

---
# activity boards: 
Activity boards contain a pre-programmed microcontroller and some sensors and actuators along with a communications interface and a communications protocol so that you can interface the board and its sensors and actuators with software running on your personal computer. Boards like the MaKey MaKey (Figure 7) or the PicoBoard (Figure 8, now retired) are activity boards. Activity boards generally can’t operate on their own without being connected to a personal computer, while development boards can.

![[z_images/Pasted image 20250911102609.png]]

https://itp.nyu.edu/physcomp/lessons/microcontrollers-the-basics/

---
# servo motors: 
Servomotors are motors with a combination of gears and an embedded potentiometer (variable resistor) that allows you to set their position fairly precisely within a 180-degree range. They’re very common in toys and other small mechanical devices. They have three wires:

- power (usually 5v)
- ground
- control

![[z_images/Pasted image 20250930132754.png]]
<figcaption>source: https://www.sparkfun.com/servos</figcaption>

---
# semiconductors: 
got from [[intro-to-physical-computing/practical electronics for inventors|practical electronics for inventors]]. 

difference between insulators & conductors. 

![[z_images/Pasted image 20251002104646.png]]
<figcaption>source: https://www.youtube.com/watch?v=gUmDVe6C-BU</figcaption>

but, this gap in an insulator can be lowered with heat, making it conductive: 

![[z_images/Pasted image 20251002104812.png]]

but that'd destroy the original material. 

![[z_images/Pasted image 20251002104838.png]]

so, they <mark>print transistors using photolithography</mark> (capable of making a piece of insulated material (such as silicon) conductive, by passing an electrical charge into it). therefore, a semiconductor can turn on / off (and, therefore, send many different kinds of signals). 

![[z_images/Pasted image 20251002105013.png]]

---
# actuator: 
any device that converts electrical energy into mechanical energy (motors, servos, linear, rotary), et-cetera. 

---
more parts to read about are here: https://itp.nyu.edu/physcomp/labs/components/