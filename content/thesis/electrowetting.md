---
date: 2026-09-11
tags:
  - experiments
noteOrder: "457"
draft: "false"
---
tried in-house electrowetting with a ribbon cable, and 30v. it didn't work. 

spoke with [[deqing-sun]] about it. he recommended i get a boost-converter, and try it with a copper pcb. 

milled a small set of electrodes; checked that they weren't shorting. ordered the converter & teflon-plumbers-tape to act as a hydrophobic surface. 

got boost converter to work: 

![[IMG_8425.webp|258]]

with teflon tape, the water sparked because of micro-holes. 

![[260916_electrowetting.mp4]]

![[260916_2.mp4]]

got it to work! more voltage, cling wrap & olive oil as dielectric layers. 

![[electrowet_260917.mp4]]

---

# conversation with [[matt-griffin]] (260918): 
discussed dielectric layers, and possibilities to get a smooth finish on the bottom layer. he recommended kapton tape (which i later got from phil), mineral spirits or mineral oil (to suspend liquid in; and kindly gave me a petri dish too), glycerin, baby shampoo. and brain slides — although expensive — might be a good dielectric layer (and very regular surface). 

---
# understanding electrowetting: 
watched this lecture by iit-kharagpur: https://www.youtube.com/watch?v=eCxPy8wI_lk

![[Screenshot 2026-09-18 at 13.17.19.webp]]

my notes (i think i understood enough to not have to write it down again): 

![[IMG_8450.webp]]

limitations: 
- if you break the dielectric layer, and current passes, then the ewod is gone (i wonder if that'll destroy my circuit too). ==might have to add a fuse==. 
- 

---

spoke with [[phil]]; who also introduced me to [[greg-shakar]]. 

phil worked with me to break down my build. for the first prototype, we discussed buying a solid copper rod, cutting it & then putting it on tiny pedestals (either 3-d printed or resin-printed). 

- micromark to buy copper. 
- lens coat material / thor labs. he told me to think of the dielectric layer as a coating rather than something i paste (like a spray or something). 

spoke about using the roller or laminator in the design lab. 

---

# 260923: 
failed with all of these settings:

![[IMG_8481.webp|535]]

---

# 260925: 
found [this](https://cmosedu.com/jbaker/papers/2014/A_Fast_Fabricating_Electro_Wetting_Platform_to_Implement_Large_Droplet_Manipulation.pdf) paper, which shows actuation with saran wrap, peanut oil & a 20-30ul droplet. tried finding peanut oil near 370 jay; no luck. i assume i can do the same with olive (that we have in the kitchen). 

burnt my 253v boost converter because i was trying to rush through the experiment. 

![[IMG_8486.webp|367]]

---

# 261007: 
got actuation; 253v; 20ul. used copper sheet, salt-water, olive-oil, cling-film wrap. 

rough setup (except that gaps were the thickness of a utility knife): 

![[Screenshot 2026-10-07 at 23.43.11.png]]


![[IMG_8531 2.mp4]]


![[IMG_8531.mp4]]

