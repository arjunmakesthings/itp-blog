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

wrote a small algorithm distribute points in space — somewhat randomly — but with a minimum distance between them. 

was inspired by the [poisson-disk-sampling algorithm](https://www.jasondavies.com/poisson-disc/). 

![[Screen Recording 2026-07-09 at 13.28.15.mp4]]

but mine is simpler. 

``` js
/*
select hotspots away from each other, recursively, by drawing circles. 
*/

function setup() {
  createCanvas(800, 800);
  background(255);

  // let spots = find_spots(width, height, 5, 20);
  let spots = find_spots(width, height, 5, 100);

  // console.log(spots);
}

/*
for a canvas of width w & height h, and a min-radius specified between points, 
return tuples of x, y coordinates such that; 
coordinates are away by min-radius, 
and are somewhat uniformally distributed across space. 
*/
function find_spots(w, h, n, min_spacing) {
  let posis = Array.from({ length: n }, () => []);
  let size = min_spacing;
  //check if co-centric circles min_spacing apart can fit onto the space:
  const can_fit = Math.floor(Math.min(w, h) / min_spacing) >= n;

  //we now do two branches:
  const origin = createVector(width / 2, height / 2);
  if (can_fit) {
    //randomly plot them on the circles (they will always be at-least min-spacing apart).
    for (let i = 0; i < n; i++) {
      let theta = random(TWO_PI);
      let x = origin.x + (size / 2) * cos(theta);
      let y = origin.y + (size / 2) * sin(theta);
      noFill();
      stroke(0);
      strokeWeight(0.5);
      // circle(origin.x, origin.y, size);
      strokeWeight(10);
      stroke(255, 0, 0);
      point(x, y);
      size += min_spacing;
    }
  } else {
    let circle_count = 0;
    while (origin.x + size / 2 < w && origin.y + size / 2 < h) {
      noFill();
      stroke(0);
      strokeWeight(0.5);
      circle(origin.x, origin.y, size);
      size += min_spacing;
      circle_count++;
    }

    let spots_on_each = Math.ceil(n / circle_count);
    //reset size:
    size = min_spacing;

    let drawn = 0;

    for (let i = 0; i < circle_count; i++) {
      //draw the original circle:
      noFill();
      stroke(0);
      strokeWeight(0.5);
      // circle(origin.x, origin.y, size);

      let start_theta = random(TWO_PI);
      let inc = TWO_PI / circle_count;
      let theta = start_theta;

      for (let j = 0; j < spots_on_each && drawn < n; j++) {
        let x = origin.x + (size / 2) * cos(theta);
        let y = origin.y + (size / 2) * sin(theta);
        stroke(255, 0, 0);
        strokeWeight(10);
        point(x, y);
        theta += inc;

        drawn++;
      }

      size += min_spacing;
    }
  }

  return posis;
}


```

explanation: 

``` txt

given a 2-d surface of dimensions {w,h}, 

we draw cocentric circles from an origin, w units apart (w == min spacing required between points) until: 

a) # of concentric circles == n (number of points we want)
b) cocentric circle x + r >= width or height of surface. 

in case (a): 

	we select a random theta, and draw a point for each of the circles so that: 
		x = origin + size/2 * cos(theta)
		y = origin + size/2 * sin(theta)

in case (b)*
	for each co-centric circle, we draw multiple points d degrees apart such that: 
		d == n (number of points we wanted) / # of cocentric circles. 
		

* in case b, it is not possible (with this approach) to have n points w units apart. so, we do the best we can.
```

