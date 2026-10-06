---
date: 2026-09-11
tags:
  - teaching
noteOrder: "459"
draft: "false"
---
log of things for [course](https://github.com/shiffman/Creative-Computing-F26) taught with [[daniel shiffman]] in fall-2026. 

---
# 260911: 

basics of electricity workshop. follow [[working principles to deal with electricity]]. 

- for any kind of electricity, we need power. 
	- for this class, we will only talk about sources that we can hold in our hands. no wall outlets. 
	- ask about signs on a battery. 
	- ==show battery and signs.==

- the best way to understand about electricity is that beings want to move from one side to the other.

conductive vs insular. 

- voltage & current. 

 

- talk about beings wanting to move to the other side. 
- 

- tiny little beings that are on the '+' side of a power source. 

---

# 26105: 

manual lerp: 

``` txt

a * amt + b (1-amt); 

```

using double as a data type for long floats. 

changing data-type here gives us a different map function: 

``` txt

long map(long x, long in_min, long in_max, long out_min, long out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

double d_map(double x, double in_min, double in_max, double out_min, double out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



```

running average: 

``` txt

take previous & new, and take a running average: 

how far along am i from previous & new value.

using lerp (val, val, amt). 

```



