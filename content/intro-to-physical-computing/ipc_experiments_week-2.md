---
date: 2025-09-11
tags:
  - experiments
noteOrder: "48"
draft: "false"
---
did a [quiz](https://docs.google.com/forms/d/e/1FAIpQLScOWv02U7W2SZxD4D7G2M8BT7Mv19QAHfcYzpDkbH6iOzU8Gg/viewform) to solidify basic concepts. here are my responses: 

![[z_images/quiz.pdf]]

---

read about microcontrollers. liked this: 

> Other devices, like light, heat, or motion sensors, motors, lights, our sound devices, are attached to these pins to allow the microcontroller to be **sensitive to the world and to express itself.** 

got interested in differences between a microcontroller and a computer. 

asked [[people/tom igoe|tom igoe]] this: 

> i'm not sure i understand the difference here: 
> 
> *Computer and processor are generic terms for the anything that can run a program, basically. Controller or microcontroller is usually reserved for a simple processor that does only one task, like listening to sensors.*
> 
> but a microcontroller can do many tasks: 
> 	listen to a sensor
> 	compute input
> 	send output
> 	sense input through another sensor 
>
> so, what are the differences really? is it just that a computer or processor is a very powerful microcontroller? 

his response was this: 

> You've got the basics right. I think of "computer" as the most generic term. "Microcontroller" is an industry term used to distinguish a more limited computer, usually used for physical interfaces: sensor devices, tangible control devices, machine monitors, and so forth. Microcontrollers generally have less processing power and memory than, say, a laptop or desktop CPU. As a result, microcontrollers generally one program that does one task at a time, rather than swapping between tasks each processing cycle. 

> The CPU in a laptop or desktop, or even your phone, is optimized for running multiple programming tasks at more or less the same time (that's what an operating system does), and for communication with other devices. They are also more capable of managing larger amounts of memory, and are usually connected to external storage, like a disk drive or SD card. 

> In addition, microcontrollers often have sub-circuits which are optimized for physical input and output, like analog-to-digital converters (ADCs) or digital-to-analog converters (DACs). Microcontrollers' architecture is optimized for that physical input and output. 

> As an example, a computer mouse runs a microcontroller. That controller reads the mouse's sensors (optical sensors on the bottom, these days), converts those changes to a direction of movement, and communicates  via USB or Bluetooth to a computer running an operating system. The processor in that computer has more computational capability, and more memory than the microcontroller, and therefore manages a number of tasks (the apps you swap between), manages the attached storage drives, the WiFi, the Bluetooth, all at the same time.  

then i have more questions, so booked office hours with him. 

---

attempted to, but failed to understand [level shifting](https://itp.nyu.edu/physcomp/lessons/electronics/level-shifting/). 

---


