---
date: 2026-07-07
tags:
  - lectures
noteOrder: "381"
draft: "false"
---
imagine that your data was really big; say size k so that k > m (memory size). 

what you could do is put the data through a hash-table (see [[ita_lecture-4_hashing]]), so that random-access-memory (r) contains another set / array of items (i) that are hashed, and you can go through them in linear time.

so, to search would be constant time + time it takes to linear search through the sub-array.

---

if you have an array, how many permutations are there for all elements to be sorted? 

``` txt
|A| = n (size of array is n)

...

first item can be anywhere on the list; so n.

second can be n-1 (because the first one was n)

...

therefore, n!. 

```

---

storing a number bigger than 1 digit: 

``` txt

number => (a,b) keys

so: 

a = k // n (int divide)
b = k % n 

therefore, k = a*n + b. 

```

![[Screenshot 2026-07-07 at 11.20.09.webp]]

discussed tuple sort. 

say you have a list: 

`42, 22, 24, 32, 03`

and you represent it as tuples: 

`(4,2). (2,2), (2,4), (3,2), (0,3)`

does it make sense to sort by most significant (n or tenths) or least significant (i or ones)? 

least significant. because if you start with most significant and then sort by least significant, it wipes out your earlier work. 

![[Screenshot 2026-07-07 at 11.32.08.webp]]

but even with least-significant, you want a stable sorting algorithm (maintain state of previous comparison). 


to avoid collision where (n) is == n + r == key, store a chain in that particular key. that's counting sort. 

radix sort: 

break up integers (max size u) into a base-n tuple.

---

