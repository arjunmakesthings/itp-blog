---
date: 2026-11-12
tags:
  - experiments
noteOrder: "577"
draft: "false"
---
# ask: 
> Make any fixes or improvements needed to your site
> Learn how to use one or more of the HTTP clients shown, for next week’s in-class exercise. Try either: JavaScript Fetch in a client-side example or Get a microcontroller connected to the sandbox 370 network. Try connecting using a microcontroller HTTP client.

after the incident last week (see the ending of [[un_experiments_week-8]]), i decided to account for the possibility of disruptive actors; even though i hadn't planned on having to worry about that at itp. 

i made my github repo private (so as to not reveal the source code); decided not to include code changes as code-blocks in this blog-post (so as to hide the api-endpoints unless you do the challenge (i hate this, but i'm forced to)); disallowed the ability to send non alpha-numeric characters (with a special response that tells you why); and included specific responses if one tries to demean me with my name (like done earlier ([[un_experiments_week-8]])). 

i see the joy — of being able to break someone's system (i did so in [[applications/index|applications]] myself last year), but i also see the drudgery that someone else has to go through to fix what you break. i also, i think, experienced, first-hand, the kind of online 'trolling' that people are subject to, because it's so easy to not reveal your identity. i hadn't understood that sentiment before this. it's so much easier to post whatever you want when it's not associated with your name. 

i think this was a phenomenal learning experience, and something that i now carry in future projects. 

  ~~especially in a networked project~~ ==in any project, always== ~~account for assholes~~ ==consider disrupt==~~ors~~==ions.==

---

after this, i decided to play around with classmates' api: 

[[jia]]: 
didn't understand what the ip being shown was. her site showed the ip as: `216.165.95.xxx`, but my traceroute didn't reveal that at all: 

![[Screenshot 2026-11-14 at 12.01.22.webp]]

[this](http://jiasundernet.space/api/requests) had no documentation. so i didn't know what to do. 

[[brian]]'s what just a chatbot that repeats back whatever you send if it has a question mark.

![[Screenshot 2026-11-14 at 12.07.47.webp|488]]

[[gabriel]]'s only accounted for get requests. 

[[cody]]'s had nothing. i don't know what that site was supposed to do. 

with [[alua]]'s, i was able to figure out her address & phone-number and stuff because of how she registered her domain. 

![[Screenshot 2026-11-14 at 12.28.51.webp]]

sent an email to her warning her about this. 

hers also had a bug where if i click all the time, it just stores values: 

``` js
    { red: '', blue: '', green: '', x: 304, y: 307 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 173, y: 44 },
    { red: '', blue: '', green: '', x: 170, y: 77 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 }

```

i was trying to programmatically add to her json, and it also accepts any kind of input: 

``` js
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { red: '', blue: '', green: '', x: 170, y: 70 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }

```

i couldn't figure out why the color values weren't being posted. 

figured it out (while her display reads "red", "green", etc, her source code (accessed via chrome -> source) actually posts it as 'r:', 'g:', etc). so the keys were wrong. once i figured that out, i could curl to her json. 

``` js
    { red: '127', blue: '127', green: '127', x: 'arjun', y: 70 }

```

then, i wrote a simple scaffold in js to send data to (and view data from) alua's sketch: 

``` js
//for alua's sketch:
const url = "https://letmesleeponthursdays.online/color-data";

async function send_data(r,g,b,x,y) {
  const data = {r: r, g: g, b: b, x: x, y: y}
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log(response.status);
  console.log(await response.text());
}

send_data(127, 127, 127, 0, 0); 

//to view:
async function get_data() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.dir(result, { maxArrayLength: null });
  } catch (error) {
    console.error(error.message);
  }
}

get_data(); 


```

then sent a circle by looping over x & y coordinates (cos(a) * r & sin(a) * r): 

![[Screenshot 2026-11-14 at 14.27.55.webp|496]]

then i thought: 

why not make it move over time?

bad attempt (messed up math):

![[Screenshot 2026-11-14 at 14.32.28.webp|509]]

good attempt, reloading really quickly: 

![[Screen Recording 2026-11-14 at 14.34.46.mp4]]

^ used the scaffold and sent data for a circle which gets modified with a sine wave:

``` js
const base_x = 300; 
const radius = 50; 
const amplitude = 150;

for (let ty = 0; ty < 1080; ty += radius * 1.5) {
  // the center sways left/right as ty grows -> a wave down the page
  const cx = base_x + amplitude * Math.sin(ty * 0.01);

  for (let a = 0; a < Math.PI * 2; a += 0.1) {
    const x = Math.round(cx + radius * Math.cos(a)); // circle shape, unchanged
    const y = Math.round(ty + radius * Math.sin(a));
    await send_data(255, 0, 0, x, y);
  }
}
```

sent her this email afterwards: 

> also, please remove my recent json entries from your json file if you feel like it's disruptive (i recorded a video of making a red circle move with your api).

she chose to keep it. 

[[jasmine-chou]]'s is interesting, because she chooses to let me edit previous messages. and i can figure that out, because the id of each message is exposed in the response: 

``` zsh
{"id":6,"name":"tester","message":"testing sentence","time":"2026-11-14T17:43:30.950Z"}%

```

so, before me, [[tom-igoe]] had posted: 

``` txt
My uncle is sick, but the highway is green.

```

his id would've been 5. 

so, i modified his query: 

![[Screenshot 2026-11-14 at 13.40.02.webp]]
because [[jasmine-chou]] doesn't account for the fact that someone else's query could be modified by someone else, the name of the sentence poster is a false source of truth. 

i could also tell that this wasn't handwritten, and was, likely, generated by an llm; because it auto added this line: 

``` txt
Names are limited to 50 characters and sentences to 280.

```

so, i wonder: why didn't the the llm catch the bug (since this is a big flaw)?

sent her an email too. 

---

just want to point out that this is — as far as i can tell — is an example of a good actor. if you're decently-versed with programming or networks, you have the ability to uplift the collective. we can spend time testing each other's projects; giving them feedback on where it might possibly break (technically or conceptually), and helping them figure out solutions; instead of trying to overwrite their work or destroy it just to show-off. 

even in [[alua]]'s case (which i consider the most disruptive action), i first verified how she was storing her data. she was smarter than me (i'd just kept a long array running; so as to not bother with reading from & writing to the file-system) — and had chosen to keep a separate .json file. so, she had the power to edit it afterwards (which is why i emailed her to remove my json entries (although she chose to keep them)). 

---

api-s are fun. and people must do a lot of work to prevent abuse.

---

the only thing i didn't do was to register a domain and pursue a ssl certificate. i glanced over the process, and it looked straightforward enough. i didn't want to pay for & register under my name a silly domain. unless i would've missed out on a key learning or collaboration opportunity; which it didn't seem like i did.

i also think there was something pretty about having to enter an ip. we're so used to writing in words, that we forget that internet addresses ~~can be~~ actually are numbers. 

---

also realized, while doing [[computer-graphics/index|computer-graphics]] homework, that js calls actually use the same rest protocol to fetch internal files that are needed. 
![[Screenshot 2026-11-14 at 21.08.51.webp]]
in the above, i load 4 scripts (and an image as texture that can't be seen in this log). the browser must make a GET request 