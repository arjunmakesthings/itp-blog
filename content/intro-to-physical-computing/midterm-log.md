---
date: 2025-10-02
tags:
  - writings
  - experiments
noteOrder: "105"
draft: "false"
---
# ask: 
> show that you can make a simple <mark>interactive system with physical controls</mark>, and that you can <mark>keep a <strike>user</strike> person engaged</mark> with your system. 
> 
> **sub asks:** 
> On a technical level, though, your project should show that you <mark>understand digital input and output, analog input and output, serial communication, and good physical interaction design principles</mark>. On a conceptual level, your project should <mark>help people to enjoy</mark> whatever setting it is designed for.
> 
> source: https://itp.nyu.edu/physcomp/syllabus/assignments/#Midterm_Project

---
# thought: 
> dahiya tore-down my burgeoning prejudice against recent forms of first word art: when i tried to criticise AR/VR, he cut me off, pointed at a light-switch, and wondered how <mark>‘flicking a mechanical switch to fire electrons that illuminate a bulb far away’ is no less crazy than ‘wearing a virtual-reality headset’</mark>.
> 
> from [stockholm:life, by shobhan](https://www.setwrite.in/activities/201907-stockholm-life.html)

we frequently interact with electricity, but its magic is too quick to comprehend. there is a lot that we *still* don't understand [^1], but that doesn't stop us from consuming 24,398,000,000,000,000 watt-hours of electrical-energy every year[^2] . 

the idea was to communicate this magic — borrowed from dahiya's humility, coupled with my own curiosity — by showing how much laborious work electrons do, to turn on a simple led. 

| ![[z_images/IMG_6445.jpg]] | ![[z_images/IMG_6489.jpg]] |
| -------------------------- | -------------------------- |
|                            |                            |
<figcaption>thought-maps to arrive at this line of thought. </figcaption>

---
# study: 
this line of enquiry originally began with reading [[intro-to-physical-computing/practical electronics for inventors|practical electronics for inventors]], as i realised that electrons flow opposite to the direction of conventional current flow. 

i then saw more videos, this one being one the clearest ones about the topic: https://www.youtube.com/watch?v=3KePcASD0NQ

---
# thinking-through + prototyping:
i wanted to do this project well. [[intro-to-fabrication]] taught me the importance of spending more time thinking through the thing i'm making than making it. so, i applied that:

on <mark>first glance</mark>, it was meant to look <mark>simple & neat</mark>. the person should <mark>know how to interact with it</mark>. via said interaction, a person should be able to <mark>leave with a sense of appreciation</mark> for all the electrical-hardwork around them. 

i first thought about the components & their layout. i've now grown up to understand that tiny choices compound to bigger outcomes. 

![[z_images/IMG_6576.jpg]]

![[z_images/IMG_6577.jpg]]

i chose to lay out components straight, as opposed to the conventional circle to communicate flow, since the 'electrons' have to be pushed into the next component. i also added the capacitor, to show electromotive-force gradually reduce through the circuit, as the capacitor gives off its stored current (when the power source is turned off). 

then, i planned out the arrangement of the components (both *visible* & *invisible*).

![[z_images/IMG_6586.jpg]]

while this started off as a single interaction, prototyping showed me the opportunity to add several more. i then thought through all of my interactions, in time: 

![[z_images/Pasted image 20251006174135.png]]

i also tested material for light-diffusion. realised that [[3d printed material does interesting light diffusion]].  

![[z_images/IMG_6582.mov]]

[[people/phil|phil]] suggested the following materials: 
- polystyrene sheet: 1mm
- white translucent acrylic sheet: 1-3mm
- light pipe from colourless acrylic rod to make leds stay at the bottom but the light to show above.

i will go check these out later. my next step will be to program the electron-leds. 

---
### 251009: 
i needed to program the leds. 

the first problem i run into is that i need to send analog-output to ~30-35 leds. arduino allows me to send analog outputs to 7, and digital to 20. 

![[z_images/IMG_6633.jpg]]

looked at something called a mux or multiplexor. think of it like a motor-driver, but uses 4 pins to give out 16 outputs (based on varying combinations of highs & lows). 

![[z_images/Screenshot 2025-10-09 at 17.19.02.png]]
<figcaption>source: https://www.youtube.com/watch?v=Dco6jo9xgAo</figcaption>

[[people/pedro|pedro]] then told me about the multiplexors that we have in the shop, as consumables. we have the [cd4051be](https://www.alldatasheet.com/datasheet-pdf/view/26882/TI/CD4051BE.html) multiplexors, that do the job that i want. 

---

# to do: 
learnt this from [[galt]]'s blog; started using it here. 

- [ ] figure out programming
- [ ] material recce & buy 
- [ ] look at led options
- [ ] order leds

---
# acknowledgements: 
[[alanna]] for giving me a coin-cell to test leds.

---

[^1]: veritasium spoke to [multiple physicists around the world](https://www.youtube.com/watch?v=bHIhgxav9LY), and sparked an [online debate](https://www.youtube.com/watch?v=oI_X2cMHNe0). in one of the videos, a professor says: "people think you're pumping electrons, which is so wrong". 

[^2]: global-electricity consumption in 2022, from a wikipedia page: https://en.wikipedia.org/wiki/Electric_energy_consumption
