---
date: 2026-09-05
tags:
  - experiments
noteOrder: "448"
draft: "false"
---
# reading: 
read ch. 3 thought, from *a world appears: a journey into consciousness.*

- ==what consciousness conjures up is weakly communicated via words== (it conjures up feelings, images, sensations, et-cetera): 
	- > "mentation—are preverbal, often showing
	  up as images, sensations, or concepts, with words trailing behind as a kind
	  of afterthought. "
- abstraction leaves out nuances; but abstraction is essential to be communicable. 
- > "Hurlburt’s antipathy toward theory is key to understanding what he’s attempting to do, and why he was so gruff when I told him I was writing a book on consciousness. (“Good luck with that,” he grumbled.) He treats theory as something you might catch, and he strives to keep it out of his research—indeed, out of his mind—lest it infect his sampling process. Because that involves closely questioning volunteers about their inner experiences, the ==slightest theoretical taint to his questions could easily contaminate the reports of his volunteers and ruin their empirical value.=="
- on the book —  *one boys day*: "The other problem was that it took a whole book to write about one person on one day."
- > "the act of recalling and describing an experience is bound to alter it"
- > "I’ll point out that there are at least two different modes of experiencing: one that’s before the footlights of consciousness and one that is happening more or less on autopilot, or backstage."
- > "I didn’t realize there was a third option: “unsymbolized thoughts,” or complete thoughts made up of neither words nor images. In fact, many subjects are unaware of the phenomenon and assume they’re failing at the task if they can’t attach words or images to their beeps."
- 

---

# writing: 
> **ask:** How do you think? What is your stream of consciousness like? Do you feel like you are aware and in control of your thoughts? Do you decide to think your thoughts or do they just occur to you. Are you generally aware that you are thinking or are you usually "lost in thought?" Are your thoughts delivered as voices. Do your thoughts repeat? Are your thoughts mostly positive or negative? Do you think one thought at a time? Are you the same person over time? What makes one thought follow another? Do you always feel like there are many candidates for a connecting to a following thought? How can you better get to know how you think?


---

# making:
> **ask:** Abraham Lincoln was quoted as saying “ Give me six hours to chop down a tree and I will spend the first four sharpening the ax.”. As much as we love the p5 web editor because it is simple and cloud based, you might consider editing your code in a more powerful environment. An environment is basically the text editor for your code but these days they also do stuff like formatting, running, sharing and even writing your code for you. Eventually upgrading your environment will help you tie into the bigger ecosystem of machine learning.
> 
> Within that environment, see if you can make a vanilla javascript canvas that records your stream of consciousness. If you can just get my examples working in your new environment, that would be great. But maybe try having the text field that creates thoughts that bounce around the screen like the might bounce around your head. Maybe have them grow if you click on them and decay if you don't. Maybe try getting AI to add a button for you? If this is all easy for you think about other input like voice or body.

the first hurdle was to figure out an environment. i usually use vim for scripting, and vscode for large codebases. at [[recurse-center/index|recurse-center]], i messed around with a few open-source, locally-hosted a.i. agents; and realized that they produced garbage (and that too slowly (see [[ai assistant explorations]])). 

the obvious step is to use external compute power — which usually comes with costs. i know that claude-code is the industry standard. [[jagi]] used it well. that's 20$ a month.

[[dan-o]]'s recommendation was to have an ide with an agent built in, so that you can see changes that an agent makes. [[nikolai]] suggested that i use an agent to design the perfect environment for myself. 

the no-brainer for models & agents is claude. the question then is the ide. 

i decided to work with claude & neovim — simply to avoid clunk. 

first, i uninstalled everything that i originally had — opencode, ollama, et-cetera. 

the first thing i noticed was that claude-code ran `caffeinate` by itself, and that made me uncomfortable that it can run processes in the background. so i dived into that:

![[Screenshot 2026-09-06 at 20.23.43.webp|512]]

