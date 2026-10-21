---
date: 2026-10-15
tags:
  - experiments
noteOrder: "534"
draft: "false"
---
# reading: 
> [case against reality](https://www.ted.com/talks/donald_hoffman_do_we_see_reality_as_it_is)
> 
> [interface theory of perception](https://sites.socsci.uci.edu/~ddhoff/interface.pdf)
> 
> [water umvelt](https://www.youtube.com/watch?v=xoblutORPNA)
> 
> [romance of reality](https://www.youtube.com/watch?v=THNVAZEx9UM) ([book](https://www.amazon.com/Romance-Reality-Organizes-Consciousness-Complexity-ebook/dp/B09GW3G45J/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=))
> 
> [beyond biocentrism](https://www.youtube.com/playlist?list=PL6tZnayumJCWhB8oa8t-oHyl_MSr5aIdn)
> 
> [ascent of information](https://www.youtube.com/watch?v=L2ermurFFYQ) ([book](https://www.amazon.com/Ascent-Information-Machines-Unending-Algorithm-ebook/dp/B08LR88H92/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=))
> 
> [feynman latent spaces](https://medium.com/@thiago.hirano/latent-spaces-the-bridge-between-minds-and-machines-2bea981c4215)
> 
> [curvature of spacetime](https://medium.com/data-science-collective/the-spacetime-of-large-language-models-6677c74a0fc3)

from case against reality: 
> “I think that tastes, odors, colors, and so on . . . reside in consciousness. Hence if the living creature were removed, all these qualities would be wiped away and annihilated.”

> vision is 1/3rd of the brain.

speaks about gestalt showing how the brain 'constructs' reality. was an interesting premise; but i wasn't particularly convinced. 

---

# writing: 
> ask:
> 
> Add relevant movies for next week.
> 
> Everything can be doubted except that it feels like something to think. Then could it be that consciousness the primary thing and time and space are an illusion? What is there when you close your eyes and existing in the present moments outside of space and time. Does the hallucination start when you open your eyes? Can you make an interface the inner experience that you have when you close your eyes. Should interfaces mimic that you see in front of you when you open your eyes as a virtual reality headset does or should we aim at something more fundamental outside of time and space? Is the outside world way more complicated than we think and believing in time an space at all hold us back. Does the content of subsequent thoughts usually have a time or location relationship to the previous thought, do your thoughts have much do do with location or chronology at all? Will spatial interfaces like VR interfaces so firmly anchored in continuous 3D space with continuously flowing time serve to depict your thoughts. Hoffman says time and space are just simplifying interface (ITP, Interface Theory of Perception) for a more complicated reality. Should we make our interfaces address that more complicated reality directly instead of making and interface to an interface?
> 
> Why are neural networks talked about as spaces. Watch this short to see if it helps you think that way Total Pixel Space
> 
> This week we will start working with Machine Learning. As we will learn, it is able to capture hyper-dimensional spaces that might do a better job of depicting our thoughts related along more than 4 dimensions. How could that make people be kinder to each other and enjoy each other more?
> 
> Do the many correlations of machine learning give you a new tool for more nuanced connections between people? Can you depict more connection than a linear feed? Will they allow our pluralistic societies have less binary choices in finding bonds with other people.
> 
> What should you put adjacent to what? How will depict 1000 dimensions on using your two dimensional phone or laptop?

i think thinking about dimensionality was interesting (as proved by my drawing below), and so was hoffman's case. the example of the beetle is an astute observation. 

i guess the problem is that we can't really find out. we can't really find out what reality is, if not for the one we perceive (i.e through the interface that our existence affords us). 

however multidimensional our thinking may be, i still think it must be reduced (and i use that word carefully) to navigable space, to be able to be communicated with the larger world. the wiki on [dimensions](https://en.wikipedia.org/wiki/Dimension) discusses that. 

i am actually at a loss for how one may represent a navigable higher-dimensional space. the maximum that i could achieve was 4-d (with the fourth dimension being time). i think it must be one of the great interface-design problems. while pondering about this, it occurs to me that maybe a whole new device must be invented for people to navigate higher-dimensional spaces. i wonder if such movement would be disorienting — however. fascinating; fascinating challenge. 

in another line of thought (see [[diagrams to understand & explain]]), i argued that all work is translation (and that it leads to loss and what-not). i think, connecting my thesis-enquiries with this & [[sapolsky's lectures]], i think all human (thought)work is dimension-reduction. actually, it's all reductive. 

![[IMG_8621.webp|356]]

funnily enough, i'm reminded of [[prachi]] saying: "everything is divergence, convergence ... that's it — there's nothing more to it".  

---

# making:
> When everyone is a producer (social media) search becomes king. How can your computer interface expose more dimensions of search than swipe up ,down left right for finding content, in particular user created content? Can you do a better job than the polarizing, bubble creating, immiserating social media that Haidt talks about?
> 
> Try to make a social network where people can find each other. Because you don’t yet have thousand of users, Generative AI is useful for creating enough different expressions to make this interesting, so try making a “God” button to generate words or pictures or both and then get an embedding for each. (Never try to pass these off as real users to other people.)
> 
> Try using UMAP to depict the your multidimensional embedding space within the 2D or 3D limitations of your laptop.
> 
> Try develop a interface for "navigation by creation" where as a person changes their picture or text they move in the vast space of the neural net to see other people are making

i got interested in dimensionality. made this first: 

![[on-dimensionality.webp]]

then had an idea from [[total pixel space, by jacob adler]]. programmed by hand. 

``` js
/*
an exploration of pixel space. 

think of an image as a 2-d grid of pixels. now, think of each pixel within that grid as a walker in 3-dimensional-space (rgb). each dimension is finite, meaning that the space ranges from 0 - 255. 

the origin position of the walker at px[a] is (r,g,b) of px[a]. 

given a point in time t, in t + 1 the walker moves in one of 3 possible directions: move forward (increment); move backward (decrement) or stay (neither). then, the walker has 27 possible positions for each t + 1. 
*/

let img;
let px_space = [];

function preload() {
  img = loadImage("./test-image.jpg");
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  noStroke();

  img.resize(0, width);
  //image(img, 0, 0);

  let px = img.pixels;
  console.log(px);
}

function draw() {
  //for each pixel, we go over their values and update them.
  img.loadPixels();
  //image pixels are stored as [r,g,b,a].
  for (let i = 0; i < img.pixels.length; i++) {
    if (i % 4 === 3) continue; //skip alpha.

    let p = Math.random();

    if (p < 1 / 3) {
      img.pixels[i] = (img.pixels[i] - 1 + 256) % 256;
    } else if (p < 2 / 3) {
      continue;
    } else {
      img.pixels[i] = (img.pixels[i] + 1) % 256;
    }
  }
  img.updatePixels();

  image(img, 0, 0);
}


```


![[Screen Recording 2026-10-20 at 15.18.12.mp4]]

i also tried to implement the noise stuff i did for [[cg_experiments_week-6 | computer-graphics_week-6]], but failed. 

for my next making task, i decided to simply 'vibe' with claude-code. i wondered: what happens if i think of complex ideas, and the code is merely the tool for me to realize it?

my idea came when [[dan-o]] said that opposing people still relate to someone in some dimensions. i wondered how lovely it would be for a person to come to a website, enter the names of two people that they think have drastically opposing views (say a democrat & a republican), and a model gets all the data they have on them (quotes & such), and show in what ways they might be similar. each dimension can be thought of as grounds for separation or similarity. 

from here on, i refer to claude-code & myself as we: 

first, we checked what a navigable multidimensional space would look like on a computer: what is the 'n' that it can handle? 

these got extremely complicated for a person to handle:
![[Screenshot 2026-10-20 at 23.03.28.webp]]
i decided to reduce dimensions. it's easy for us to view something in 3-dimensions. therefore, even in an n-dimensional comparison, one can see their n-dimensional similarity; but that doesn't tell you anything. 

think of each parameter as a number line. therefore, the max you can see in one go — atleast that is navigable — is three. so, i'll work with that constraint. 

after that, we spent a long time thinking about the architecture of this thing: must results be fetched by a model, or should it be scraped? if scraped, from where? how recent must the data be? should we cache or not? and so on. 

then, while claude programmed, i wrote the poetic anchors: 

``` txt

if two people seem different, how different are they really? 

---

this webpage allows you to view popular us-politicians as vectors in multidimensional space. each 'dimension' is a topic that they've both spoken about, and therefore can be assessed for the polarity of stance that they take. dimensions are selectable & represented live; stances are extracted from linked sources (wikiquote, ontheissues.org, the american presidency project); polarity or similarity is assessed by averaging analyses by two different popular large-language-models. 

--- 

discarded stuff: 

on this webpage, you can view two people as vectors in multidimensional space. seeing them in all n-dimensions at once might show you difference 


think of two people
on earth
as vectors
in multidimensional space. 

of-course, they seem dissimilar & separated. 

if you reduce dimensions, however, you may find that the same two people might actually agree on a few things.

this project displays that; for the following people: 


```

in response to a question that [[joy]] asked me (and it was mentioned in class too), i realized that ==shared-minds is a good way to explore what code as a tool (as opposed to a medium (see [[notes from light exhibition by zach lieberman]])) looks like.==

review files for each pair: 

![[Screenshot 2026-10-21 at 00.55.54.webp]]

video demo: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/FOynoBpITP8?si=1q5XW8yPDFJFytpE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

url: https://arjunmakesthings.github.io/shared-minds_f26/week-6/how-similar-are/