---
date: 2026-06-11
tags:
  - lectures
noteOrder: "350"
draft: "false"
---
  think of a data-structure as the following: 
  - i have data. i want to perform a certain set of operations on the data (this is called the interface). i think of it as affordances — a set of things that is possible on this data (you define it; you *specify* it (or create the requirement, if you may)). 
  - how you do the operations is the data-structure. 

some interesting things about standard lists: 
- get / set / length (operations) are constant time. because get and set uses indices, while length is a static integer. therefore, in big o notation, this is o(i) where i is constant time. 
- iterating or building an array is linear time or o(n) because i need to go over every single unit to build or iterate. therefore, this will grow with size. 

linked lists are interesting. if an array is a continuous sequence of memory, a linked list item is an array of size 2 where: 
- `arr[0]` is the data
- `arr[1]`is the address or 'pointer'. 

this is useful because if you want to insert_at an index, you don't need to shift the contents of the whole array; you can add it in an arbitrary position in memory. 

==even if you add to the end of an array, you are still shifting (in memory because the computer may have stored something in the next chunk of memory)==. 

but in linked lists, get / set requires you to iterate over the array (using the pointers). you can insert at the beginning in constant time (change pointer of head to new element). 

==static arrays great for static operations.==

---

# dynamic arrays:
dynamic arrays don't care about memory management. each array is: 

$$
length(n) > a[i]
$$

where `a[i]` is length of the array and length is greater by some constant factor `k` . you store metadata about the array in another array: 

- head
- length
- size

when `length(n) = size`, allocate new array of `k * size` where `k`is some constant factor.

resize time  / cost is linear because you increment double of previous. 

$$
2^{k+1} - 1
$$


![[Screenshot 2026-06-11 at 13.30.01.webp]]

