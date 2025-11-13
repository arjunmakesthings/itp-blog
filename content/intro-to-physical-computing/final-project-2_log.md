---
date: 2025-11-07
tags:
  - ideas
noteOrder: "169"
draft: "false"
---
after my [[intro-to-physical-computing/midterm-log|midterm-log]], and doing the serial labs, i realised that the beauty of this course for me lied in the electricity. again: 

> we frequently interact with electricity, but its magic is too quick to comprehend. there is a lot that we *still* don't understand, but that doesn't stop us from consuming 24,398,000,000,000,000 watt-hours of electrical-energy every year. 

this time, instead of seeing the things we can't, i wanted to focus on hearing the things we can't (electrically). as i did my [[intro-to-physical-computing/midterm reflection|midterm reflection]], i also realised that i wanted to make something that produces immediate feedback, and that feedback is unexpected. 

so, for my final project (see original attempt at [[intro-to-physical-computing/final-project-1_log|final-project-1_log]]), i want to build a portable, hackable synthesizer, without a microcontroller, that simply uses electricity to generate sound (that i could then orchestrate musically). 

---

> But on the other hand, if you think about the “laptop music” style of performance which is currently in vogue, you might notice that there could be a problem, even if the music sounds good, with watching a person sitting in front of a computer and operating the mouse and keyboard. It is just too depressingly similar to what hundreds of millions of workers have to do from nine to five at the office. 
> 
> When evening comes and we go to the concert, we might like to experience something different, something visceral, something that is a direct result of muscular energy. We might like the relief of something zany and crazy.
> 
> As Antonin Artaud said, there are plenty of people in the real world with two arms and two legs; in the theater we would like to see creatures with three.
> 
> from [[handmade electronic music, by nicolas collins]]. 

---
# ethos: 
every time i open this page to update, i want to remind myself this: 

> the point of this project is to <mark>experiment</mark>, and to <mark>further my understanding</mark> of how electricity moves (and produces sound). 

---
### 251109: 
[[prisha]] responded to my request of 555-timer-ics, after [[people/david rios|david rios]]'s recommendations of using them. she shared the book: *handmade electronic music*, by nicolas collins.

i tried wrapping my head around 555-timer-ics, but it was too complicated to understand. so, i began with the book; and made a speaker pulsate first. 

![[z_images/raw-speaker.mp4]]

i then made this, a 555 metronome (via [this](https://www.electronics-tutorials.ws/waveforms/555_oscillator.html) tutorial): 

![[z_images/analog-synth_1.mp4]]

if i reversed the polarity of the speaker, this is produced: 

![[z_images/reversed polarity.mp4]]

scratching: 

![[z_images/IMG_6900.mp4]]

photoresistor instead of a 0.01-uf capacitor. 

![[z_images/IMG_6901.mp4]]

---
### 251113: 
i realised that my main tool was the 555-timer-ic (even though other fancier chips exist). i decided to spend some time understanding it. 

[[people/david rios|david rios]] shared this video: https://www.youtube.com/watch?v=ABWU7FlM1T0

these are my notes: 
- can be used as a timer, oscillator, or flip-flop. 
- monolithic timing circuit. 
- drive ttl logic (logic-gates).

![[z_images/Screenshot 2025-11-13 at 11.01.05.webp]]
<figcaption>pins.</figcaption>

inside the ic, 3 resistors create a voltage-divide. two comparators compare voltage across the positive & negative end of themselves, and output a digital signal of high & low.

basically, by changing threshold & trigger, i can change what is sent out (high or low). 

![[z_images/Screenshot 2025-11-13 at 11.02.57.webp]]

but these are then inverted and sent to a flip-flop. i don't know why they're inverted, but ok. 





---
# references: 
[[people/david rios|david rios]] shared these: 
- https://www.electronics-tutorials.ws/waveforms/555_oscillator.html
- https://www.instructables.com/Schmitt-Trigger-Synthesizer/



