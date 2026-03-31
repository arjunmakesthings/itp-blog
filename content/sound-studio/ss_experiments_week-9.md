---
date: 2026-03-25
tags:
  - experiments
noteOrder: "289"
draft: "false"
---
tried to practice stuff learnt in [[ss_class-9]]. 

---
i first tried to figure out a software that would work for me in the long run. i used pure data, but it was very difficult to get a hang of it especially since it has no autocomplete. i even tried an extension, but it didn't work. 

perhaps this is why max charges money. 

---
then, [[jesse simpson]] suggested [plugdata](https://plugdata.org) to me.  i didn't like the interface. 

---

wrote this on tidal cycles: 

``` haskell
-- ikeda inspired.

-- after luke's example of a synth in max in sound-studio, i wanted to make something on tidal cycles that was similar.

d1
$ fast 32
$ s "supersaw"
    # freq "840"

-- ^ you play a frequency via a synth. 

-- synths live inside the supercollider folder in Application Support. 

-- like so: 

{-
// a moog-inspired sawtooth synth; slightly detuned saws with triangle harmonics, filter frequency modulated by LFO
// "voice" controls a relative phase and detune amount
(
	SynthDef(\supersaw, {|out, rate=1, decay=0, sustain=1, pan, accelerate, freq,
		voice=0.5, semitone=12, resonance=0.2, lfo=1, pitch1=1, speed=1|
		var env = EnvGen.ar(Env.pairs([[0,0],[0.05,1],[0.2,1-decay],[0.95,1-decay],[1,0]], -3), timeScale:sustain, doneAction:2);
		var basefreq = freq * DirtFreqScale.kr(speed, accelerate, sustain);
		var basefreq2 = basefreq * (2**(semitone/12));
		var lfof1 = min(basefreq*10*pitch1, 22000);
		var lfof2 = min(lfof1 * (lfo + 1), 22000);
		var sound = MoogFF.ar(
			(0.5 * Mix.arFill(3, {|i|  SawDPW.ar(basefreq * ((i-1)*voice/50+1), 0)})) + (0.5 * LFTri.ar(basefreq2, voice)),
			LFTri.ar(basefreq/64*rate, 0.5).range(lfof1,lfof2),
			resonance*4);
		sound = sound.tanh*2;
		Out.ar(out, DirtPan.ar(sound, ~dirt.numChannels, pan, env));
	}).add
);
-}

d1
-- $ echo 16 0.5 0.5
$ fast 16
$ s "supersaw"
    # freq (stack [
        range 0 840 $ slow 16 tri,
        range 0 640 $ slow 16 tri,
        range 0 340 $ slow 16 tri,
        range 0 540 $ slow 16 tri
        ])
--   # freq ([range 0 840 $ slow 16 tri])
  # gain 0.75
  # lpf 900
  # delay (range 0 0.5 sine)
  # delayfeedback 0.2
  # hpf 1500
  # gain 0.8

  d2 
--   $ fast 2
  $ stack [
    n "bd bd bd bd"
    # s "808bd" 
    # gain 1.2
    # delay "0.2"
    # lpf 800 
  ]

  d3 
  $ stack [
    -- s "hh hh"
    s "hh*4",
    (s "sd*2" # lpf (range 1000 3000 sine))
    -- (s "ho" # hpf "10000" # echo 16 0.1 0.5)
  ]

  d4 
  $ echo 24 (-0.25) 0.75
  $ s "ho"
  # hpf 12000

d5 
$ freq "<40 50 40 30>"
-- $ n "0 3 5"
    # s "superfm"
    # attack 0.2
    # hold 1.5
    # rel 0.2*2
    # gain 1




```

---

i had an idea to use someone else's voice to play a certain song. when i looked at [[luke dubois]]'s patch & recording, it was too much to handle. 

so, instead, i just used this time to practice some composition. 

---

tried to get the autocomplete to work in pure data. failed. 

![[Screenshot 2026-03-30 at 23.17.48.png]]

figured out simple signal generators; called it a day. 

![[Screenshot 2026-03-31 at 00.06.17.png]]

at the end of the day, max or pure data are both simply programming languages. just like tidal-cycles is too. 

at the end of the day, this class is about exploring sound. i think i've done enough: 
- i ==learnt how to use analog-synthesizers==, via work i did in the audio-lab. 
- learnt more about ==the electronics & theory of how sound is composed.==
- ==explored how to make sound electrically, programmatically & with a visual software.==
- built two analog instruments for my midterm. 

so, now, it's about the final project. there are a few ways i can think about this: 
- one is to think about it as a project. that way, my synth wall is probably the best thing i have at the moment. it: 
	- gives me a big physical project. 
	- allows me to continue exploring electronics. 
	- actually make a shareable project about sound. 
- second is to think about it as a way to explore composition. i understand more about myself sonically, by choosing a program and sticking with it (perhaps tidalcycles or pure-data). 