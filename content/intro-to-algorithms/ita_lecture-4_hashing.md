---
date: 2026-06-30
tags:
  - lectures
noteOrder: "373"
draft: "false"
---
# binary tree / decision tree: 
comparison model of computation, where: 
- to find a key (value), it has to use a comparison (<, =, >, etc.). 

there have to be >= n+1 leaves, and the height of the binary tree will be `log(n)`. so, running time of any comparison sort will be omega log (n), meaning that the lower bound will be at least log(n). 

# direct access table / array: 
key corresponds to place in the array; so in layman-language this is the index. so, fetching is constant time. stores one item.

``` txt
u => largest key.
n => item finding.

but if n<<u, then this is not optimal in terms of space.
```

so then,:

``` txt
map larger space into smaller space, by hashing, and storing hash-table index in the direct access array.
```

https://www.geeksforgeeks.org/javascript/hashing-in-javascript/

---
# hashing:
a function `h(k)` for `{0 ... u-1}` returns `{0 ... n-1}` in such a way (usually) where: 
- deterministic
- fixed length output
- irreversible.

a good hash function would not have collisions. for example: `something%0` would be a bad hash function because for different values of something, `h(something)==0`. 

but making a deterministic hash function avoiding collision is difficult (even [sha 256](https://en.wikipedia.org/wiki/SHA-2) has some chances). so what you do is you use a set of hash functions (therefore, dynamically decide a hash function based on input or even randomly). universal hash functions: 

$$
hab(k) = (((ak + b) mod p) mod m)
$$

where: 

• Hash Family H(p, m) = {hab | a, b ∈{0,...,p − 1} and a 6= 0}.
• Parameterized by a fixed prime p>u, with a and b chosen from range {0,...,p − 1}.

---

on hashing: 

https://www.youtube.com/watch?v=pMM9cIAFAug

https://en.wikipedia.org/wiki/SHA-2