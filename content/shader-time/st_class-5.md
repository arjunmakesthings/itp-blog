---
date: 2026-02-18
tags:
  - lectures
noteOrder: "245"
draft: "false"
---
add an attribute in the cpu-computing to pass something once to each vertex. 

==all things from cpu are read-only. ==

raycasting: 

cast a ray into the computer to see if something touches a vertex. called ==raycasting==. 

### post-processing: 

==ping-pong buffers.==

have two buffers, apply one the destination becomes source, change destination; keep ping-ponging between them. 

raw shader goes through shader-passes. you can make a shader and add it to an empty pass too., you need `tDiffuse` for that — that's previous uv stuff. 