---
date: 2026-04-13
tags:
  - experiments
noteOrder: "312"
draft: "false"
---
the idea was to use my mtdna -> put it in another organism -> see how it affects the organism / how it mutates over time. 

---

i met with [[ellen d. jorgensen]] at the biotech-without-borders lab, and we made up a plan. 

![[260414_ba_plan.webp]]


we synthesized this sequence: 

``` txt
GATCTCGATCCCGCGAAATTAATACGACTCACTATAGGGGAATTGTGAGCGGATAACAATTCCCCTCTAGAAATAATTTTGTTTAACTTTAAGAAGGAGATATACCATGGGCAGCAGCCATCATCATCATCATCACAGCAGCGGCCTGGTGCCGCGCGGCAGCCATATGGCTAGCATGACTGGTGGACAGCAAATGGGTCGCGGATCCATGTGGGGAAGCAGATTTGGGTACCACCCAAGTATTGACTCACCCATCAACAACCGCTATGTATTTCGTACATTACTGCCAGCCACCATGAATATTGTACAGTACCATAAATACTTGACCACCTGTAGTGCAGACCCCTATCTGAGGGGGGTCATCCATGGGGACGAGAAGGGATTTGACTGTAATGTGCTATGTACGGTAAATGGCTTTATGTACTATGTACTGTTAAGGGTGGGTAGGTTTGTTGGTATCCTAGTGGGTGAGGGGTGGCTTTGGAGTTGCAGTGTTGGTATCCTAGTGATGGTGAGCAAAGGCGAAGAACTGTTTACCGGCGTGGTGCCGATTCTGGTGGAACTGGATGGCGATGTGAACGGCCATAAATTTAGCGTGAGCGGCGAAGGCGAAGGCGATGCGACCTATGGCAAACTGACCCTGAAATTTATTTGCACCACCGGCAAACTGCCGGTGCCGTGGCCGACCCTGGTGACCACCCTGACCTATGGCGTGCAGTGCTTTAGCCGCTATCCGGATCATATGAAACAGCATGATTTTTTTAAAAGCGCGATGCCGGAAGGCTATGTGCAGGAACGCACCATTTTTTTTAAAGATGATGGCAACTATAAAACCCGCGCGGAAGTGAAATTTGAAGGCGATACCCTGGTGAACCGCATTGAACTGAAAGGCATTGATTTTAAAGAAGATGGCAACATTCTGGGCCATAAACTGGAATATAACTATAACAGCCATAACGTGTATATTATGGCGGATAAACAGAAAAACGGCATTAAAGTGAACTTTAAAATTCGCCATAACATTGAAGATGGCAGCGTGCAGCTGGCGGATCATTATCAGCAGAACACCCCGATTGGCGATGGCCCGGTGCTGCTGCCGGATAACCATTATCTGAGCACCCAGAGCGCGCTGAGCAAAGATCCGAACGAAAAACGCGATCATATGGTGCT
```

annotated version: 

![[mtdna-plasmid_annotated-seq.pdf]]

[[tenni]] helped me see e. coli. bacteria under a light-microscope. i also broke some of their cover slides while trying to rush through the procedure; ==reminder to slow down.==

![[IMG_7752.mp4]]

i then wrote an email to professors who had access to a microscope. email: 

> dear prof. x,
> 
> my name is arjun, and i'm a graduate-student at nyu in the interactive-telecommunications-programme (itp). i've been working on a small project for dr. heather-dewey-hagborg's class — bioart-as-biopolitics — with dr. ellen d. jorgensen.
> 
> the idea is to take my mtdna sequence, couple it with a gfp, add it to e. coli. cells using plasmids, and see what changes it does to the bacteria. the microscope dr. ellen has at biotech-wthout-borders can only go up to 40x, and has no imaging options (unless i make a camera-mount for that microscope).
> 
> i was wondering if you could please help us with access to a microscope that goes beyond 40x and has imaging capabilities, so that i can record a film of the e. coli. cells over time. we'll have all the samples ready, and just need access to the microscope. any time between next-to-next week and the end of the month would work. 
> 
> best,
> arjun.

i heard back from a few places. 

---

# day 2 at the lab: 
[[ellen d. jorgensen]] recommended that i get started with converting the circular pet-283a into a linear strand, to be able to add my dna to it later. 

pet-28a is an [[expression vector]]: 

![[pet28a_diagram.webp]]

the procedure: 
- 28ul circular dna plasmid (pet-28a)
- 5ul cut-smart (this cuts it)
- 2ul enzyme (to tell it where to cut it)
- 15ul water (to make it to 50ul — i quite don't know why)

we then wanted to check the concentration of the dna. so, we performed gel electrophoresis: 

![[IMG_7829.webp|549]]


![[260421_gelt-electrophoresis.webp|488]]


![[IMG_7821.webp|448]]

sliced the bands out: 

![[IMG_7823 2.webp|453]]


![[IMG_7825.webp|457]]


![[IMG_7827.webp|462]]

then purified it with a kit. 

![[IMG_7826.webp|462]]

later, i'll do a process called [[ligation]].

---

made a presentation to explain what i'm doing in class. slides are here: https://arjunmakesthings.github.io/presentations/slides/260424_bioart-final.html#1

i'm happy with how clearly i articulated things there. 

[[gwen]] suggested looking at the cost of this: what is lost in the bacteria without my dna. [[heather dewey-hagborg]] recommended looking at the artifact as something that i could preserve & take care of — like a tamagotchi. 

biobricks — little modules of dna you can put into a plasmid. 

slime molds to generate paths (computational approach to fast routing). 

who wrote the book of life book referenced by [[heather dewey-hagborg]]. 

brave new world, shared by [[jua]]. listening to prozac — peter d. kramer.

microdosing: 
- https://www.microdosebros.com/microdosing-and-silicon-valley-how-a-life-hack-turned-into-more-than-a-lifestyle/ 
- https://www.gq-magazine.co.uk/lifestyle/article/microdosing-lsd

tim hawkinson — emoter: https://www.youtube.com/watch?v=MiqYBSk-fxo

pink chicken: https://pinkchickenproject.com

---

this is the dna we received: 

![[IMG_7844.webp|402]]

for the ligation, i had to cut the dna at specific points: 

![[IMG_7874.webp|446]]

i then had to do a bacteria transformation with bl 21 (a particular strand of e. coli. that [[ellen d. jorgensen]] got for me from her lab). 

the liquid bacteria we then put in a solution of lb and let it mix in the incubator + shaker.

the transformation process is standard, but time consuming. 

![[IMG_7873.webp|454]]

![[IMG_7856.webp|497]]

i also poured agar plates. the protocol is: 
- lb agar + water (some gram per ml conversion that i forgot)
- mix & autoclave (like pressure cook)
- let it cool
- add the antibiotic (i used kanamycin). 
- pour plates — plates should be as sterile as possible. 
- wait for them to cool / solidify. 
- innoculate with bacteria. 

for the proteins to be expressed, i also had to add 100ul of iptg (the activator that uses the t7 promoter). 

![[IMG_7852.webp|401]]

![[IMG_7850.webp|399]]

![[IMG_7851.webp|406]]

i also independently did pcrs & dna purification. pcr: 

![[IMG_7855.webp|410]]

purification protocol is usually on the kit, but here are my notes: 
- binding buffer — centrifuge & dispose (dna gets stuck to the filter)
- wash 2 times — centrifuge & dispose.
- elute buffer and that gives you pure dna at the bottom. 

---

when i went back the next day, after incubating at 37 degrees, i didn't get expected results. 

![[IMG_7872.webp|435]]

![[IMG_7869.webp|439]]

![[IMG_7871.webp|438]]

![[IMG_7868.webp|443]]

![[IMG_7870.webp|440]]

[[ellen d. jorgensen]] hypothesized that maybe my mtdna was killing the bacteria because it grew without iptg, but not with it. 

to confirm, i streaked more plates. 

---

with those plates, i wrote to may others to let me get microscopic images. didn't hear back from anyone but biobus in harlem. 

i went to harlem, and was told that the bulbs are broken — and that i can't get any images. 

---

i remembered how [[tenni]] showed me fluorescent microscopy, and i did the microscopy myself. 

---

in the meantime, the narrative was poetic to me so i wrote a description based on the hypothesis: 

# the cost of trying to hold on: 
mitochondrial-dna (or mtdna) in human-beings is inherited by a child exclusively from their mother. therefore, as a single male child, my mother's mtdna is fatefully destined to die with me. 

as an offspring with little to no tangible inheritance, learning about this instinctually made me want to  preserve & keep this dna alive, and see it passed it down to future generations. through genetic-engineering with dr. ellen d. jorgensen at biotech-without-borders, we addressed this desire, and successfully managed to express some of my mtdna into e. coli. bacteria cells — a commonly used organism in many biotech-labs. 

however, the moment we did so, we killed them. millions of them — living peacefully in small colonies on a petri dish — wiped out by a human-desire to preserve a piece of maternal inheritance. analogous to a world where people increasingly preserve more — data; objects; spaces; genomes — i wonder how many such organisms will bear the price for the human inability to let go. 

### acknowledgements: 
dr. heather dewey hagborg; dr. ellen d. jorgensen; biotech without borders; bioart-as-biopolitics cohort spring-2026. 

### links: 
- project log: https://arjunmakesthings.github.io/itp-blog/bioart-as-biopolitics/ba_final-log
- initial proposal: https://arjunmakesthings.github.io/presentations/slides/260424_bioart-final#1


plasmid (red-fluorescent-protein) + e. coli. (bl. 21) + iptg (activator for bacteria to use plasmid)

plasmid (green-fluorescent-protein + my mitochondrial-dna + pet28a) + e. coli. (bl. 21)

plasmid (green-fluorescent-protein + my mitochondrial-dna + pet28a) + e. coli. (bl. 21) + iptg (activator for bacteria to use plasmid)

---

final media: 

![[IMG_7905.webp|399]]

![[IMG_7904.webp|401]]

![[IMG_7906.webp|406]]

![[IMG_7903.webp|412]]

![[vidloop_ba_bact.mp4]]

i presented it like so: 

---

i enjoyed working in the lab. biotech is expensive — very, very expensive, and is a very delicate process (in contrast to electricity & code where you can 'hack' things together relatively quickly). 

making something substantial demands a long enquiry, and many resources. i don't know if — given the current state of the world — i'll have access to that during my time as a student (or beyond). 

[[ellen d. jorgensen]] said i do better lab work (and am more confident) than some of her bio-grad-assistants. that was pleasant to hear. 