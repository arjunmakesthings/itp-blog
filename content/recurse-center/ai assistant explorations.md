---
date: 2026-07-16
tags:
  - experiments
noteOrder: "400"
draft: "false"
---
at [[recurse-center]], i've seen many people use a.i. efficiently. it doesn't harm their learning; they're careful about how they use it; and they're perfect examples for learning how to leverage it. 

---

i don't want to pay for a claude code subscription. i know it's powerful; but i don't like the idea of control over my computer being available over the internet. 

i'm going to do a little bit of digging to see if there are things i can run locally, and what a good workflow there would look like.

---

the most ideal way i found was to find a model (or models) on ollama, and use it using the cli. the way to customize outputs is to make a modelfile (https://docs.ollama.com/modelfile). 

in `SYSTEM`, you define a 'role' and give it more specifications.

---

i set up three kinds of model-files; 

-> code assistant: 

-> thinker: 

-> dialectic thinker:

make a new mode with: 

`ollama create {name} -f {modelfile location}`

then run with: 

`ollama run {name}`

