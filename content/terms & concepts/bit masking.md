---
tags:
  - terms_and_concepts
draft: "false"
---
learnt during [[advent-of-code]] at the [[recurse-center]]. 

you use [[bitwise operations]] to look at a specific section of a binary sequence (i.e: like chop off the ends). 

for example: 

``` txt

data -> 101101

mask -> 

```

the digits you don't want to change you set to 0 and the ones you care about you set to 1 in the mask. 

then you bit shift to perform the operation.

> General way to implement Bitmasking:
> 
> Create the list or array you wish to manipulate with bitmasking.
> Establish the list or array's size to determine how many bits you'll need for the binary representation.
> Check the corresponding bits for each index, then carry out the required operation based on their values. This could entail performing an operation, including or excluding entries from a subset, or both.
> Repeat the above operation in a loop until every element of the list has been checked.
> Utilize the outcomes as necessary for your specific application.