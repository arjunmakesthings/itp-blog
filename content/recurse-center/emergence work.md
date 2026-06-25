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

---

# 260625:
got these getters right: 

``` js
get_mass() {
    //for a given current age, calculate mass.

    //mass is an asymptotic-exponential-growth graph.

    const a = 10; //max.
    const b = 18; //in how many steps is max achieved.

    return (a * (1 - Math.exp(-5 * (this.curr_age / b)))) / (1 - Math.exp(-5));
  }
  get_energy() {
    //energy is like a bell curve.

    /*
    https://www.desmos.com/calculator/3iioyvma2l

    f(x) = y = e^(-((x-a)^2) / b).
    */

    const m = 10;

    return (
      (1 / (1 + Math.exp(-(this.curr_age - 18) / 2))) *
      (1 / (1 + Math.exp((this.curr_age - 35) / 5))) *
      m
    );
  }
```

the simulation works well. need to refactor a little bit to clean it up, and make things more variable to have a basic simulation going. 