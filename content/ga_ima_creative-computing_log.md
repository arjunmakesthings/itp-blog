---
date: 2026-09-11
tags:
  - teaching
noteOrder: "459"
draft: "false"
---
log of things for [course](https://github.com/shiffman/Creative-Computing-F26) taught with [[daniel shiffman]] in fall-2026. 

---
# 260911: 

basics of electricity workshop. follow [[working principles to deal with electricity]]. 

- for any kind of electricity, we need power. 
	- for this class, we will only talk about sources that we can hold in our hands. no wall outlets. 
	- ask about signs on a battery. 
	- ==show battery and signs.==

- the best way to understand about electricity is that beings want to move from one side to the other.

conductive vs insular. 

- voltage & current. 

 

- talk about beings wanting to move to the other side. 
- 

- tiny little beings that are on the '+' side of a power source. 

---

# 26105: 

manual lerp: 

``` txt

a * amt + b (1-amt); 

```

using double as a data type for long floats. 

changing data-type here gives us a different map function: 

``` txt

long map(long x, long in_min, long in_max, long out_min, long out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

double d_map(double x, double in_min, double in_max, double out_min, double out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



```

running average: 

``` txt

take previous & new, and take a running average: 

how far along am i from previous & new value.

using lerp (val, val, amt). 

```


---

# 261108: 
i wrote this email to dan after looking at a couple of mid-term projects. 

``` txt

dear dan, 

sharing some thoughts: 

i think students need to be able to critically examine what they're producing. i don't think we make the space for them to do so in the class, and all of their projects become explorations with a given technology. considering that the midterm is a good marker of technical-progress — "you now know the basics", i think it's a good opportunity for them to start thinking about what they might choose to make. 

a good starting point would be to get them to reflect on their projects, or for other students to give critical feedback (instead of saying "this was so cool"). i've found that forcing students to articulate good & bad things allows them to uncover what is often buried under the veil of politeness. 

i don't know if you have space for this sort of work in this class, but i think it's important. if we're teaching them how to build anything, we should also help them articulate what they want to build & why. 

i did a session on similar lines last year in physical-computing, in an attempt to get students to articulate what a 'good' project is to them. i believe something — something before they hop on to thinking about their final — along these lines would be helpful. 

sorry; unorganized, rambling thoughts. 

best, 
arjun. 

```

---

for good project session: 

- what skills do you have now — what can you do comfortably? 
- what projects have you seen — what about them makes it 'good'? 

borrowed from [[shobhan]]'s staging an experience: 
- what do you want to say (concept)
- what do you want to use (effect)
- what do you want people to feel (affect). 

what is the simplest version of this project? bring that to class. 

---

# workshop: 

# what we're doing: 
students are now familiar with the basics of computer-programming & electronics; and have managed to put the two together in their mid-term projects. the final project challenges them to go further: demonstrate the intentional use of programming and / or electronics. 

since most of them are new to art, it is difficult for them to articulate (and subsequently defend) their intention. this workshop is designed to aid that. 

---

notes: 
- each student must partake in this workshop individually, even if they wish to pair up later. 
- we will do this whole workshop on paper, which the instructors will bring with them. 

---
# prework: 
this week, your assignment is simply to *collect*. 

throughout the week, research & build a 'repository' of work that you find inspiring or interesting. these can be images, videos, music, performances, et-cetera. you must collect atleast 9 pieces of work, out of which atleast 4 must be directly related to 'creative-computing'. you are encouraged collect as many as you can. 

towards the end of the week, put an image from each piece of work on this sheet, and fill out the details. 

![[Screenshot 2026-11-15 at 20.37.40.webp]]

you will bring a printout of this sheet to the next class. please cut out each individual image before class on monday.

---

# in class: 
- **introduction + goal framing (10m):**
	- discuss midterms. can they be something more than just a submission? 
	- introduce why we're doing this workshop. 
	- make these sections on the paper: 
	  ![[Screenshot 2026-11-15 at 21.02.44.webp|263]]
	- goal frame: what do you want from this project? i carve out that it's not *just* about submitting, but that students may have other goals. we start with "i want to" statements. 
	- quick sharing: you can choose to speak or not, if you're not comfortable. (2m)
- **projects that inspire you & why (15m):**
	- for each project, paste the image. 
	- then, outwards, make branches for why that piece makes you feel interested. each project can have multiple branches. 
	- dan & arjun will walk around to probe students to go deeper ("it was interesting" -> but what about it was interesting? and why is that interesting to you?)
	- quick sharing: you can choose to speak or not, if you're not comfortable. describe the project, and share the branch that you think is most interesting. 
- **rapid concept generation buckets (15m):**
	- we now work on the bottom three sections. in each one, we take 5m to write whatever word comes into our heads. 
	- 1: things i want to talk about (these will later translate into *concepts*)
	- 2: technology that i want to explore (this will later translate into *effect*)
	- 3: things i want people to feel (this will later translate into *affect*)
	- show them the three buckets: 
	- ![[staging-experience_shobhan.webp|429]]
- **find connections (7m):**
	- each student looks at the different sections, and makes connections between them. 
- **swap connections (7m)**:
	- take someone else's sheet and draw connections that they may have missed. 

---

kyle mcdonald weird intelligence talk. 

---

corpora for json files. 