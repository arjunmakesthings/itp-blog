---
date: 2025-10-01
tags:
  - experiments
noteOrder: "97"
draft: "false"
---
# ask: 
> Create an enclosure surrounding something. 
> 
> 	Look at things like:
> 		Small electronics
> 		Buttons
> 		Batteries
> 		Switches
> 	The box should be intricate and refined

however, [[people/phil|phil]] & i spoke, about this: 

> in general, i'm finding it hard to 'think through' things. i usually morph whatever idea i started with as & how the material + machine behaves. i don't think that's good.
> 
>  i'm also generally struggling with this course — i was told in my first year that i'm unable to think in three-dimensions. my solution then was to resort to more two-dimensional work, and i don't want to do that here. please let me know what i should change in my approach. 

he then gave me a revised ask: 

> replicate a volumetric object exactly as is. start with the object, and break it down to the point where they're flat panels, then build them up.

---

i chose this cup. [[people/phil|phil]] had recommended a conical shape.

![[z_images/IMG_6517.webp]]

![[z_images/IMG_6518.webp]]

i then taped all surfaces: 

![[z_images/IMG_6519.webp]]

and opened them up. 

![[z_images/IMG_6520.webp]]

realised that because the top is bigger, they actually don't meet edge-to-edge when laid flat out. i wonder what the math is.  

the whole shape when opened looks like so: 

![[z_images/IMG_6521.webp]]

figured this out: 
> to calculate the diameter of a larger circle in a circular cone, you can use the formula d=2r, where r is the radius of the base of the cone.

---
realised that when two parallel surfaces of a curved surface lie flat, they'll have some distance between them. i can see this visually, although i still don't understand how. 

![[z_images/IMG_6553.webp]]

![[z_images/IMG_6552.webp]]

maybe i can't think volumetrically. 

---
next, i tried to figure out the joints. 

![[z_images/IMG_6554.webp]]

![[z_images/IMG_6555.webp]]

then, i carefully sketched the components out. 

![[z_images/Screenshot 2025-10-04 at 15\.15\.26.webp]]

realised i did the math wrong for each panel. 

![[z_images/Screenshot 2025-10-04 at 15\.16\.07.webp]]

width has to be:
$$
w = c / n
$$

where c = circumference. 

height has to be 
$$
l=\sqrt{r2+h2}
$$

where r is the radius of the base. 

i then made the compounded-shape. 

![[z_images/Screenshot 2025-10-04 at 16\.04\.41.webp]]

laser cut it. 

![[z_images/IMG_6556.webp]]

and realised that i used the wrong circle as the base. 

![[z_images/IMG_6557.webp]]

then i used the smaller circle and i forgot the kerf lines, and it didn't bend. even if i forced it, the ends didn't meet. 

![[z_images/IMG_6559.webp]]

then i scaled everything down, to have more joints. then it broke. 

![[z_images/IMG_6558.webp]]

then i saw this: 

![[z_images/Pasted image 20251004170814.webp]]

tried one more approach. failed. 

---
[[people/cody|cody]] helped me see why my earlier prototypes failed. 

![[z_images/IMG_6561.webp]]

i then got a piece of paper (as per his suggestion), wrapped it around the container and cut it out with a scissor. that made me see the general shape i should've gotten.

![[z_images/IMG_6562.webp]]

i then found this: 

![[z_images/Pasted image 20251005122733.webp]]
<figcaption>source: https://www.cmrp.com/cone-calculator</figcaption>

![[z_images/Pasted image 20251005123610.webp]]
<figcaption>source: https://www.cmrp.com/cone-calculator</figcaption>

![[z_images/Screenshot 2025-10-05 at 12\.29\.31.webp]]

i then tried — really tried — to get the shape right. 

![[z_images/Screenshot 2025-10-05 at 21\.26\.05.webp]]

printed it out on paper to test: 

![[z_images/IMG_6563.webp]]

![[z_images/IMG_6564.webp]]

![[z_images/Screenshot 2025-10-05 at 18\.48\.50.webp]]

laser-printed this: 

![[z_images/Screenshot 2025-10-05 at 21\.28\.13.webp]]

it was a mess. 

![[z_images/IMG_6566.webp]]

everything broke. i hate it. i hate this. 

i laser-cut this on a thinner material. 

![[z_images/IMG_6567.webp]]

did not include the kerf-lines, because that fucked things up last time. but then the material wouldn't bend. i decided to make the kerf-lines by myself (half-cuts with a cutter) to make it bend. 

it's 2140. i've spent more than 10 hours on this. i hate this. 

---
this is what i was left with. 

![[z_images/IMG_6571.webp]]


![[z_images/IMG_6570.webp]]


![[z_images/IMG_6569.webp]]

---
# reflect: 
it was good to fail — i haven't done that in a while. i now know that i'm not great at fabrication, and working in the course with that realisation eases the general pressure (see [[the pressure to do big things]]) i have. 





