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

the s/r flip flip has two inputs: 

s(et) and r(eset), and output is q or !q. 

![[z_images/Screenshot 2025-11-13 at 11.38.58.webp]]

![[z_images/Screenshot 2025-11-13 at 11.39.45.webp]]
<figcaption>truth table for threshold / trigger and !q output.</figcaption>

!q is fed through an inverter, meaning that the !q output actually results in q output when going out from pin-3. 

control-pin on pin-5 connects directly to comparator negative. so, basically, the comparator voltage does not need to be 2/3rds of vcc all the time.

if reset is set to off, the flip-flop turns off and resets the timer. 

value of capacitor connection on discharge pin can be used to set value of timing on the 555.

modes of the 555 (control output pulses via triggers): 

![[z_images/Screenshot 2025-11-13 at 11.45.30.webp]]

![[z_images/Screenshot 2025-11-13 at 11.48.47.webp]]

---
### 25114: 
i watched a lot of videos to understand the 555-timer. struggled. i need to understand it to be able to extract the most from it. 

i made many, many circuits, and used the oscilloscope. nothing was substantial. then, i found this tutorial: https://www.youtube.com/watch?v=7PxkpQSsJ3E

![[Screenshot 2025-11-14 at 21.23.33.png]]

i understood how to make a voltage controlled oscillator using voltage dividers.  

![[z_images/vco_251114.mp4]]

high-frequency pitch bender: 

![[z_images/IMG_6925.mp4]]

i can use this to change pitch by adding a fsr between the resistors. circuit for the future: 

![[z_images/IMG_6926.webp]]

this circuit also worked like a metronome, but the ic got really hot. i still don't know why. i built this circuit myself. 

![[z_images/IMG_6927.webp]]

the next approach that i'm going to take is to build a bunch of circuits, and have them all separated on a big breadboard. that way, i can plug circuits in & out, and see what kinds of sounds i can produce (and layer). i know that the output of some 555 has to be the control of another, and that way it can on / off to produce alternating sound. 

eventually, i can pick-choose the circuits i'm going to keep. let's see. 

---
### 251115: 
my oscilloscope readings were all over the place. i don't know why the signal isn't clean, and why it pauses every time it takes a few readings. i then decided to change the duty-cycle, to be able to actually see what was happening ([[people/ivan|ivan]] suggested that this might be the case). 

watched this: https://www.youtube.com/watch?v=Q5tcf1pYZRc

hell yeah!

![[z_images/IMG_6933.mp4]]

![[z_images/IMG_6935.mp4]]

i realised quickly that the pretty bit about this is the tangibility & the fact that you can mess around with it. i'm going to have two types of wires on my thing — one will be flat / solid (people don't seem to want to take that out), and jumper wires (with a sign that says "mess around with any jumper wire"). 

![[z_images/IMG_6934.mp4]]

in the above circuit, i have no idea what i did. theoretically, i think by plugging in the output of the first circuit into the control voltage does something to the signal (distort it by multiplying), and then the resistance + capacitance value changes the timing. since it is related to (but not the same as) the first circuit, they have a little bit of a delay in between them. 

actually, i don't know. this is fun. 

---
this is weirddddd! what is this: 

for context: there is no photoresistor here, but current flows as my hand is on top. 

![[z_images/ghost mode hq.mp4]]

---
# references: 
[[people/david rios|david rios]] shared these: 
- https://www.electronics-tutorials.ws/waveforms/555_oscillator.html
- https://www.instructables.com/Schmitt-Trigger-Synthesizer/
- forrest cookbooks: https://research.ebsco.com/c/srayvq/ebook-viewer/pdf/w2c446nmsr/page/pp_19

et-cetera: 
- https://www.youtube.com/shorts/KxDpLPrmXL4
- [[people/shloka|shloka]] shared this: https://www.youtube.com/watch?v=Xbl1xwFR3eg


