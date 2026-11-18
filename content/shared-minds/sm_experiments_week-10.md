---
date: 2026-11-16
tags:
  - experiments
noteOrder: "584"
draft: "false"
---
# reading: 
had seen inventing on principle before, and had recommended it to [[bairui]] last year (which he based his thesis on :)). 

listened to 30 minutes of the wolfram / friedman podcast. brilliant podcast; covers a lot of themes that interest me.
- ==computational irreducibility==. relates to [[my practice is about emergence]]. finding reducibility. https://en.wikipedia.org/wiki/Computational_irreducibility
- nature as ==observers==
- we are ==constantly being re-written==. 
- computational limitation of ==only being able to experience one thread of reality==

---

# writing: 
> ask:
> 
> How can you best use yourself? What level should you insert yourself? Do you need to get very technical to understand the potential of computation? Will that distract you from identifying bigger handles and levers? Do you need to get down to the metal of a computer to truly understand the new possibilities of computation or are you better off using higher level languages, libraries, or even just talking about it instead of making it? How will vibe coding affect your decisions?
> 
> The key to learning how to code is learning why to code. It is important to motivate you past all the stupid details of computer programming to identify some exciting near term goals and maybe even to identify a north star of what motivates your work. Please use the category “Level”
> 
> The world needs some help. Social Media is a young adolescent, very annoying but with great promise. Write a manifesto about what we can do to improve matters.
> 
> As Shakespeare wrote “There Is Nothing Either Good Or Bad But Thinking Makes It So.” And we have learned that we don’t think like we think we think. Will looking directly at our inner mental life give us opportunities for inventing new forms of media.
> 
> We always build media in the rear view mirror. Instagram and TikTok are not native AI platforms. Let's think of the term social media more generically than focusing on current forms. How can you take advantage of the essence of artificial neural networks to make media more wholesome? With film took a while to learn that introducing cuts was mentally satisfying — what new liberties will you take with computational media?
> 
> What is wholesome for you and for our society (s)?
> 
> It is fun to dig down into the weeds figuring out code and coming up with great designs but it also helps to identify bigger themes that might help you to sustain your path if you are helping more people. Begin a manifesto that you can update (for the rest of your life) that can help you lift yourself out of the details to develop a big picture for yourself. It is okay to be grandiose.

i'd already started this last year, with [[my principles as a creator]]. 

i've definitely noticed a shift in not knowing the medium (programming language), and being able to do less interesting things with it. 

for example, earlier, i would work on programmatic sketches that began with clear thought, but ended in completely different places from before (because of my technical ineptitude, or finding new possibilities because of them). less of that happens when you program with a.i. 

when using it as a tool — to achieve something else — i think it's okay to insert yourself at higher levels of abstraction. but when you're exploring the thing itself — computation — i think more possibilities open up when you're in the weeds. 1-bit computer installation at bitforms; [[nikolai]]'s thesis (froth); et-cetera only ever came to being because they were well versed with the medium to uncover new possibilities. [[process compendium, by casey reas]], takes that further by diving into computation on the philosophical level. the ideas in process compendium could never have occurred to someone vibe-coding — they just wouldn't have the gunpowder to ignite that curiosity. 

i guess it's like control. have you seen expert calligraphers use their pens? the pens follow them, and they work with its restraint; versus if you were to use it: you're its prisoner. i think that's the same thing with code; algorithms; et-cetera. i still think there are fantastic things that happen within a computer: straight from how it does basic bit shifting operations to how you can talk to it in symbolic language at a higher level of abstraction. there is a level of abstraction that you cross when you're not in programmatic land anymore. 

like for me for example: i know i can use javascript expressively. i enjoy that too. but, as i learn [[computer-graphics/index|computer-graphics]], i can't *wield* the power of shaders because i'm its prisoner. if i can think it, a.i. could do it. but i don't even know what all i *could* think. i think that's where deep-diving into lower level works. i had a lot of fun doing that at the [[recurse center]] in the summer — and my understanding of programming languages has become so much better now (because i tried to build one at r.c.), and i can understand weird zones that *could* become interesting (if i explored them for long enough). 

it's like saying: everyone can do graphic design. sure, but your graphic design is likely to be worse than a trained eye. even more so, if  you're trying to design a typeface. you just don't have the eye for that. very few people in the world do. 

through this class, i'm actually getting less excited about the potential of a.i. yes, it's fascinating how it works & all that, but at the end it's just a more sophisticated number crunching machine. i actually don't know if it can do much to improve the social state of the world. or if it can help me augment my thinking. or better it. it can show me a million connections that could have been, but i'm not sure that's aiding my thinking. 

i'm glad i'm at this state. i took my time to explore all of these 'amazing' things that artificial-intelligence can do, but i'm just not moved. perhaps because it isn't an artistic medium? because it's too cold? i don't know. 

really: how can it help humans? i kept trying to make up cases where it could, but i don't think i'm so certain anymore. 

i guess the most enjoyable thing in life wasn't the outcome, but the process of arriving at that outcome. that's where all the excitement used to be: "how the hell did you manage that" was what people exclaimed in icm a year ago. have you seen them now? no one cares. hell, we don't — in shared-minds. we can make outcomes after outcomes, we don't care. making is demystified, and we never cared about the outcome anyway (and now we don't care about the process too). 

maybe i'm defeated. i came into this program because i got tired of trying to make things for other people; i was fighting to make the world a tiny bit 'better' for less privileged people in the country. now, in this class, i'm asked to make things for other people again. at this point in time, i don't think i want to. 

maybe i'm just a crybaby. or i'm lazy. or i run away. or i've given up. 

maybe it's like this because this week i deep-dived into how a.i. models work, and was disappointed to see that all of this sophisticated intelligence is just a bunch of bytes placed next to each other. 

---

# making:
> ask: just to experience python notebooks. 

python notebooks essentially gives you a virtual machine. 

![[Screenshot 2026-11-16 at 21.34.52.webp]]

one can connect to a cpu or cpu + gpu. 

once you load a model onto a variable (straightforward stuff): 

``` python
pipe is: 
 StableDiffusionXLPipeline {
  "_class_name": "StableDiffusionXLPipeline",
  "_diffusers_version": "0.42.1",
  "_name_or_path": "Lykon/dreamshaper-xl-v2-turbo",
  "feature_extractor": [
    null,
    null
  ],
  "force_zeros_for_empty_prompt": true,
  "image_encoder": [
    null,
    null
  ],
  "scheduler": [
    "diffusers",
    "EulerDiscreteScheduler"
  ],
  "text_encoder": [
    "transformers",
    "CLIPTextModel"
  ],
  "text_encoder_2": [
    "transformers",
    "CLIPTextModelWithProjection"
  ],
  "tokenizer": [
    "transformers",
    "CLIPTokenizer"
  ],
  "tokenizer_2": [
    "transformers",
    "CLIPTokenizer"
  ],
  "unet": [
    "diffusers",
    "UNet2DConditionModel"
  ],
  "vae": [
    "diffusers",
    "AutoencoderKL"
  ]
}

```

apparently, the object is also callable (which doesn't show itself in print) — gosh, i always hated python (declaring variables is also absurd). 

[[dan-o]]'s writing made it a bit clearer: 

> Use the pipeline 
> 
> Now put the pipeline inito action by calling it as a function. You can find the documentation for using the pipelines in the diffuser library on huggingface. You have to give at least the prompt parameter but there are many others you can give. The pipe can give back multiple images but you only asked for one so [0] takes the first one. Finally “image” by itself on the line is like saying print imaage and you will see the results in the console below.


![[Screenshot 2026-11-16 at 21.50.58.webp|476]]

---

the python stuff i understood, and knew that i could work with it if need be. so, i decided to operate on the general premise of 'level', and decided to poke around at the insides of a model.

![[Screenshot 2026-11-16 at 22.07.36.webp]]
data set of pythia: https://huggingface.co/datasets/monology/pile-uncopyrighted
![[Screenshot 2026-11-16 at 22.18.30.webp]]

after training data, you have a bunch of sub files (.bias & .weight) files: 

![[Screenshot 2026-11-16 at 22.27.40.webp]]
structure of that file:

![[Screenshot 2026-11-16 at 22.30.00.webp]]

