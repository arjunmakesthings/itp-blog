---
date: 2026-01-28
tags:
  - experiments
noteOrder: "219"
draft: "false"
---
# ask: 
Assignment 2: The Idea of Jay St
Part 1: Listen to the following audio collages:
[John Cage - Williams Mix](https://www.youtube.com/watch?v=aryHMPH7Kcc)
[Bebe and Louis Barron - Forbidden Planet soundtrack](https://www.youtube.com/watch?v=9ql4Ophbt7k)

Part 2: ==Go out and record the soundscape of the Tandon campus and its surrounding area==, collecting at ==5 minutes of audio==, organized either into separate files or a single file. 

Consider the classification of sounds noted in R Murray Schafer’s text “The Soundscape” (page 139) – what kind of sounds are ==representative of the Tandon-area== soundscape?

Part 3: Design a ==playback system== in Max that creates a ==generative collage== of the sounds you recorded.

Some things to consider when assembling your patch:

How are your sounds sequenced? Is there a specific order or is it random?
Do sounds overlap each other? If so, how do they sound when they are layered?
Do your sounds load automatically?
Does your composition have a start and end or does it loop forever?
Upload all your audio and your Max patch into this Google Drive folder before class on February 3rd.

---

listened to john cage's stuff: 

forbidden planet: https://www.youtube.com/watch?v=aryHMPH7Kcc

there are clear differences between the two. 

john cage's is ==more random==, plays with ==less frequently occurring elements vs frequently occurring elements==. 

the other is more layered, symphonized, ==has more structure==, has more ==space==, ==moving through space==. 

has ==clear builds and falls==. like a wave. 

i like structure. 

---
from the readings: 

> Now I will do nothing but listen ... I hear ==all sounds running together, combined, fused or following,== Sounds of the city and sounds out of the city, sounds of the day and night. ..

> Noises are the sounds we have learned to ignore.

# classification structures: 
- physical characteristics: 

![[Screenshot 2026-01-28 at 16.11.47.webp|460x536]]

- referential aspects: 
	- what it relates to in the real word: god awakening, going to sleep, ghost, et-cetera. 

> Moozak industry does not hesitate to make decisions about what kinds of music the public is most likely to tolerate, nor did the aviation industry consult the public before it entered on the development of the supersonic-boom-producing aircraft.

> Acoustic engineers have also succeeded in introducing increasing amounts of white noise into modem buildings and have invoked aesthetics in the process, by referring to the results as acoustic perfume.

- aesthetic qualities: 
	- Reduced to its simplest form, aesthetics is concerned with the contrast between the beautiful and the ugly, so a good place to begin might be by simply asking people to list their most favorite and least favorite sounds. 

![[Screenshot 2026-01-28 at 16.36.38.webp|560x697]]

![[Screenshot 2026-01-28 at 16.37.57.webp|527x758]]


---
the idea was to record the sound of jay street when no student is present — i.e. at night. 

![[IMG_7408.webp|419x559]]

but when i went out in the night, there was ==no actor to create sound==. 

all i heard was the wind. 

so, i came back, and it struck me. i started recording sounds of the things that remain on the itp floor, when everyone is gone. the ==soundscape is about the sounds that are there when no one is on the floor. ==

![[IMG_7410.mp4]]

i stood behind all the machines that remain on — on the floor, and on the kitchen. usually i got a lot of fans running sounds. 

![[IMG_7409.webp|432x575]]

---
max was so fucking frustrating to work with. it bugged out so many times. 

also, turns out if i have multiple dacs, it refuses to work (it syncs up all of them). 

![[Screenshot 2026-02-01 at 22.34.46.webp]]

---
[[craig fahner]] & i spoke. he explained how `read` maintains the parameters from what it was originally set to (even if you change the file). 

![[Screenshot 2026-02-02 at 14.38.32.webp]]

learnt how to debug via the `print` object. also realized that the ==float / int specification is very strict.==

---
now i can't select any of the files that i could select earlier. i don't understand this software at all. it is so, so buggy. 

![[Screenshot 2026-02-02 at 20.44.12.webp]]

---
# 260203: 
aaaaha! i realized all my mistakes 20 minutes before class. 

[[gabriel]] showed me that replace accepted a file parameter. so, i had to make sure that the names of the files were without spaces, and enter that in the replace. 