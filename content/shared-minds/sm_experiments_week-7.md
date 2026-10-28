---
date: 2026-10-22
tags:
  - experiments
noteOrder: "552"
draft: "false"
---
# reading: 
watch: [moonwalking with einstein](https://www.ted.com/talks/joshua_foer_feats_of_memory_anyone_can_do) & [brief history of intelligence](https://www.youtube.com/watch?v=Gt386yZZx5I). 

---

# writing: 
> ask:
> 
> It is time to return to earth’s orbit. We have been exploring the high dimensional character of your’s (and other’s) “inner space”, as captured by the embedding space of machine learning networks. Now let’s render this in a way that your humble primate body that believes in and is focused on time and space can understand using your laptop's 2D laptop screen. At the intersection of your inner space and outer space is computer interface. Will spatial metaphors allow you to create more powerful interfaces?
> 
> Distilling many dimensions to a few (and back) is a great challenge of computer interface and visualization tools. More generally the culling from the overall possibilities of thought to the important few is the main challenge of communication in general with words putting simple labels on the complex world. Going from many things to fewer things is the great offering of machine learning models. We will be considering rendering high dimensions in few dimensions for the next two weeks.
> 
> Does 3D space help you think? Would more spatial metaphor in computer interface help you organize and inspire your thoughts? Does placing items in a particular place help you remember and be able to recall it. Do the spatial affordances help to you in an activity. Does spatial metaphor feel more real and thus become more deeply convincing. Is there a part of your body that will only accept things as real if the are presented in a spatial form?
> 
> Can you square the two meanings of space, the common sense space that appears before us and the mathematical space of possibility. Can we get the best of both worlds, you ancient "nematode" desire to understand the world through 3 dimensions and your modern minds ability to connect symbolic things across hundreds of dimensions? One possible way to do this is not invite travel through a space but rather the conjuring or creation of a space that emerges from you. This connects with the idea of navigation by creation. Cinema does this by cutting to the next thing to think about regardless of its time and space but virtual reality usually makes you slave to following the dimension of time space. Which do you like better? Can you dynamically map new meaning to convention degrees of freedom (dimensions) in a 3D computer interface?
> 
> Importantly for this class can you make different locations in space bring you in contact with other people. You may have heard of the multiverse theory in Physics of parallel universes that in superimposition which can seem a little hard to swallow. But it is easy to imaging 8 billion parallel universes, one for the internal life of each inhabitant of earth. Can you building a interface that conjures the superimpositions of all those people.

as i wrote in [[sm_experiments_week-6]], all work is dimension reduction.

![[IMG_8621.webp|356]]

therefore, since an interface is a space, dimension-reduction (and, therefore, loss) is inevitable. 

i also once heard that navigating more than 3-dimensions feels unnatural (therefore only mathematicians can comprehend that). but we exist in many dimensions — we just never needed to represent them in space. 

if you separate the inner world of the mind, and the physical world that we live in, the body is the interface between the two worlds. on one side, we have incomprehensible space — one that we, perhaps, can never map in our time as human-beings; on the other, we have perfectly navigable 3-dimensional space. and then we have time — one that we have zero control over, but we live across it. 

wandering in the brain is amazing, because we don't need to retrace the steps of how we got there. we also don't need to survey the extent of that space, but we need to do so for the physical space. 

i realized i wasn't going anywhere with all of what i wrote above. 

i don't know — the idea of dimensional-spaces is exciting. i don't think the question is whether these spaces need to be navigated how bodies do (and therefore are restricted to 3-axes-of-freedom). i think an entirely new modality to navigate higher-dimensional spaces must be looked at. what that is — i don't currently know. 

---

# making:
> ask: 
> 
> Introduce 3D into beyond your 2D HMTL interfaces we have been using.
> 
> You can try implementing one of your previous projects in 3D. Or you can start over and wake up in 3D. Imagine you are a baby (or a nematode) trying to make sense of the world within and outside your body. How can space help. Maybe experiment with a photograph as background. You can use your phone or a camera from the ER for Video. Maybe try rotating Camera to tell a story. Try adding text, image or shapes, maybe getting the “bouncing ball” happening in 3D, Maybe try changing the primitive shape. for starters. Now that you have space as an amenity of your thinking, try to locate your thoughts in a 3D world.
> 
> Can you get Models to create the world for you. Actual world models like Google's Genie or Runway gwm might be too expensive but maybe you have an LLM write buiild a world for you out of three.js primitives or have Replicate create 3D models for you via the proxy.
> 
> Investigating Gaussian Splats,where you build 3D world from just a few images, would also be appropriate this week.Splats
> 
> Car Commercial 1 and 2,
> Inception 

showing 3-d on a computer screen was not exciting enough for me. 

i was excited by the idea of 'space', and wanted to re-explore the idea of [[total pixel space, by jacob adler]]. 

i explain what i did in this video: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/FZNw20aMkZg?si=wnstOjaNC41Ib-6C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

the math: 

``` txt

a 100x100 image has 30,000 channel values (r, g, b for each of 10,000 pixels), so there are about 10^72,247 possible images. the room is a 2-d grid of cells, one cell per step. every cell is a fixed address in that space and holds exactly one image. the same cell always shows the same image, and in practice no two cells share one.

the images are scrambled across the grid, so neighboring cells hold unrelated images. almost all of them look like static. a recognizable picture exists somewhere in the space, but it is astronomically far from any cell you could walk to.

```

to do so, i first thought about this whole thing: 

![[IMG_8647.webp|523]]

calibrated the sensors, and worked with them (code files are [here](https://github.com/arjunmakesthings/shared-minds_f26/tree/main/week-7)), and then made this simple prototype. 

i think it's more meaningful to explore a 4-dimensional space (r,g,b,a) by translating real-world movement (x, y, z, time). and i think a more 1:1 translation would be more effective. 

also, you can think of people walking across space as pixels. therefore, movement by people can also be expressed as r, g, b, a transformations. anyhow, this is definitely a larger idea — and i just didn't have enough time to explore that this week. 









