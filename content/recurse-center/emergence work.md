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

---

fixed scheduling: 

``` js
  /*
  for given age, get a schedule based on the busyness (the older you are, the more busy you get).
  */
  get_schedule(age) {
    let avl_time = Array.from({ length: day_length }, (_, i) => i);
    let schedule = [];

    //calculate available time slots based on age.
    const min = 2;
    const max = 12;
    const peak = 25;
    const sigma = 10; //spread-width.

    const g = Math.exp(-Math.pow(age - peak, 2) / (2 * sigma * sigma));
    const mean_busyness = min + (max - min) * g;

    const spread = 1.25 + (1 - g) * 3.5;

    let busyness = Math.round(randomGaussian(mean_busyness, spread));
    busyness = constrain(busyness, min, max);

    //^ this is the length of our to-be-created schedule array.

    let i = 0;

    while (i < busyness) {
      i = (i + Math.floor(Math.random() * 6)) % avl_time.length;
      let a = avl_time.splice(i, 1)[0],
        b = avl_time.splice(i, 1)[0];
      schedule.push(
        schedule.length ? [schedule[schedule.length - 1][1], a] : [a, b],
      );
    }

    schedule.push([schedule[schedule.length - 1][1], schedule[0][0]]);

    this.get_new_destinations(schedule);

    return schedule;
  }
```

---

