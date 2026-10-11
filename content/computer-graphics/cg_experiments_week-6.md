---
date: 2026-10-11
tags:
  - experiments
noteOrder: "524"
draft: "false"
---
ken's derivation of noise (received via email): 

``` txt
It's pretty simple:

1 For any integer vertex I,j,k, find a hash function that converts those three integers into a pseudo-random direction vector.
 
2 as I briefly went over in class, at each of the eight cube corners, do the following 

2a evaluate the hash function at that corner of the unit cube to get a slope.

2b define a product of two functions : 1 a linear function with that pseudo hashed slope and whose value is zero at that corner point and 2 a smooth dropoff function centered on the corner point which drops off smoothly to zero after one unit in each direction.

2c evaluate the above function at your point and add it into the total value 

Your drop-off function can be very simple. It can be a product of three drop-off functions, one in each dimension, each of which is a cubic curve that rises smoothly from zero up to one and then drops back down smoothly from one down to zero. I sometimes use 3t^2 - 2t^3

```

