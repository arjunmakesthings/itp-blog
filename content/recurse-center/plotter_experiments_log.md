---
date: 2026-06-09
tags:
  - experiments
noteOrder: "349"
draft: "false"
---
# resources: 
- plotter tools -> https://github.com/wesleyac/plotter-tools
- rc (pvt) wiki instructions -> https://github.com/recursecenter/wiki/wiki/Plotter-(HP7440A)
- jagi's repo -> 

---

# 260809:

[[jagi]] & i figured out how to get the pen-plotter at [[recurse-center]] to work. 

we have an hp7440a (1980) which uses hpgl code via serial to operate. the buffer is only 60bytes, so [[jagi]] programmed a script that streams longer commands by checking back & forth with the plotter. 

