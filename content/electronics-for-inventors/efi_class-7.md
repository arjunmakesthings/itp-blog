---
date: 2026-03-19
tags:
  - lectures
noteOrder: "284"
draft: "false"
---
spoke about voltage regulators. anything with a 78xx is a regulator. the 'xx' determines voltage. 

7805 > 5v; 7303 -> 3v, etc. 

always add decoupling to a voltage regulator. 

![[IMG_7672-1.webp|457]]

two types of power supplies: 

- linear -> has a transformer; is, therefore, big. 
- switch -> uses pwm; non-stable; has noise; small. 

- use some kind of adhesive to secure components on pcb (like hot glue, epoxy, silicone). 

- sometimes ==through-hole > smds for heat-dissipation.==

- ==voltage -> you decide; current -> the load decides.== 

- always ensure that: 

`i (supply) > i(circuit) && v(supply) == v(circuit)`

- ac -> ac (regulate voltage) via a transformer. 
- ac -> dc (bridge rectifier)
- dc -> dc (voltage regulator)

![[IMG_7673.webp]]



