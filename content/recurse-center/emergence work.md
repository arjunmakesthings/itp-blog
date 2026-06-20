---
date: 2026-06-19
tags:
  - experiments
noteOrder: "361"
draft: "false"
---
# 260619: 
mass had to grow with age, but then slow down. tried logarithmic growth, but that wasn't proper (as growth needs to have a ceiling). could have used constrain, but that's unnecessary computation. 

found this: https://math.stackexchange.com/questions/2821035/exponential-something-what-is-the-name-of-that-asymptotic-exponential-functi (thanks to [[jagi]]). 

![[asymp_graph.webp]]

equation: 

$$
f(x) = a . (1-e^{-x / b})
$$

which can be implemented like so: 

``` js
    const a = 100; //max. 
    const b = 50; //how quickly max is achieved.
    const base = 50; //to ensure base of graph doesn't shift.

    y = base + a * (1 - Math.exp(-(x - base) / b));
```

plotted like this:

![[Screenshot 2026-06-19 at 17.40.14.webp]]

