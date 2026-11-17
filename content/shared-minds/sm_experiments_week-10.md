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

