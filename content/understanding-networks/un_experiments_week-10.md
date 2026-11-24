---
date: 2026-11-23
tags:
  - experiments
noteOrder: "590"
draft: "false"
---
# readings: 
stellar readings this week. although i had to read through them quickly. 

with [this](https://abcnews.com/US/smart-home-device-alerts-mexico-authorities-alleged-assault/story?id=48470912), i kept wondering about what [[shobhan]] used to say to me: "never try to make a machine predict what a person is going to do", when i was working on an advanced [search bar](https://arjunmakesthings.github.io/projects/2025_vusearchbar/page.html) for a product. in this case, the by-product was helpful; but there are so many cases where the by-product is annoying. for example, if you have alexa in your house, and, say, a video says the same word, the device gets activated. 

from this: https://www.theguardian.com/technology/2017/jun/06/internet-of-things-smart-home-smart-city

this was amusing (albeit seems truthful): 

> Most are given female names, voices and personalities, presumably based on research indicating that users of all genders prefer to interact with women. 

> The truth is that ==data is easily skewed, depending on how it is collected==. Different values for air pollution in a given location can be produced by varying the height at which a sensor is mounted by a few metres. Perceptions of risk in a neighbourhood can be transformed by slightly altering the taxonomy used to classify reported crimes. And anyone who has ever worked in opinion polling knows how sensitive the results are to the precise wording of a survey.
> 
> The ==bold claim of “perfect” knowledge appears incompatible with the messy reality of all known information-processing systems, the human individuals and institutions that make use of them and, more broadly, with the world as we experience it==. In fact, it is astonishing that any experienced engineer would ever be so unwary as to claim perfection on behalf of any computational system, no matter how powerful.

from this: https://www.rfidjournal.com/expert-views/that-internet-of-things-thing/73881/

> Nearly all of the ==roughly 50 petabytes (a petabyte is 1,024 terabytes) of data available on the Internet were first captured and created by human beings==—by typing, pressing a record button ... 

> Conventional diagrams of the Internet include servers and routers and so on, but they ==leave out the most numerous and important routers of all: people==. 

> If we had computers that knew everything there was to know about things—using data they gathered without any help from us—we would be able to track and count everything, and greatly reduce waste, loss and cost. We would know when things needed replacing, repairing or recalling, and whether they were fresh or past their best.

this view ^, however, can only be one of an optimistic engineer. as said in the previous article: "==bold claim of “perfect” knowledge appears incompatible with the messy reality of all known information-processing systems, the human individuals and institutions that make use of them and, more broadly, with the world as we experience it==. In fact, it is astonishing that any experienced engineer would ever be so unwary as to claim perfection on behalf of any computational system, no matter how powerful."

from: https://medium.com/@anildash/the-web-we-lost-1afe8b898455

> In 2003, if you introduced a single-sign-in service that was run by a company, even if you documented the protocol and encouraged others to clone the service, you'd be described as introducing a tracking system worthy of the PATRIOT act.

from: https://moxie.org/2022/01/07/web3-first-impressions.html

> If there’s one thing I hope we’ve learned about the world, it’s that people do not want to run their own servers.

---
# post reading thoughts: 
the readings this week made me ponder about the internet, and build on opinions i shared in [[sm_experiments_week-5]]: 

> maybe the goal isn't to have a beautiful web of interconnected nodes — all of us living in grand harmony. 
> 
> ![[3.1.webp|691]]
> 
> maybe apes had it smarter: maybe it's better to have fragmented distributed communities — each with their own definitions of 'good' & pursuits of 'better', but in the optimistic view that many such views are allowed to coexist. 
> 
> also, if you look at it historically, we all seem to think more corroborates to better. that's just not true. we perhaps didn't need this big web unison; i value the intimate, deeper connections far more. yes, i have the opportunity to reach out to someone living off the west coast of japan doing interesting work, but is that ability necessarily better?
> 
> i'd argue not. 

a few years ago, the whole world was moving towards more interconnectedness. the hope was that if everything was connected to everything else, we would all be better connected to each other. 

> If we had computers that knew everything there was to know about things—using data they gathered without any help from us—we would be able to track and count everything, and greatly reduce waste, loss and cost. We would know when things needed replacing, repairing or recalling, and whether they were fresh or past their best.

i think engineers make for terrible predictors of human-experience. the world's definition of connection is predicated by the view of many engineers — connect more devices to each other & we'll all live in global harmony. it's really amusing. 

i don't have any grand, world-changing thought yet. 

the readings simply made me wonder about scale. 

mqtt seems like a hyper-specific design: use it for this one thing only. the internet of things seems like a grander design: everything connected to everything else. so does web3: a whole new paradigm for the web. 

and there are pros & cons for either. hyper-specific internet, or more general-use? 

---

# ask: 
> Check out the MQTT Client Examples. try one or two on one of the demo sites.

i don't have a nano with a working antennae, so i connected an esp32-s3 to the sandbox network. 

![[Screenshot 2026-11-23 at 17.20.31.webp|352]]

i'd helped [[alua]] a couple of nights before on a 'get' example, but we were unable to get https responses. so, i focused on that. 

from my [reading](https://randomnerdtutorials.com/esp32-https-requests/), it seems like trusted ssl certificates must be uploaded to the board before you make an https request. when i'd originally said this while working with [[alua]], [[gabriel]] said this wasn't the case. i now think his request actually got forwarded as an http request, and wasn't actually an https request. 

![[Screenshot 2026-11-23 at 17.42.57.webp]]

maybe i'm wrong. don't know.

in case of alua's thing, she sends a 114kb file into memory. which somehow wasn't being printed. so, i asked an llm and it did a smart thing. you create a pointer to where the stream is ... and keep reading (and printing) from there as data is coming in ... 

to limit it to a few entries, we stop that at 500 characters. that's this block of code: 

``` cpp
      WiFiClient* stream = http.getStreamPtr();

      Serial.println("json from here: ");

      int count = 0;

      while (http.connected() && count < 500) {

        while (stream->available() && count < 500) {
          Serial.write(stream->read());
          count++;
        }

        delay(1);
```

after that, i moved on to mqtt. 

---

read [[liyan]]'s [introduction to mqtt](https://itp.nyu.edu/networks/explanations/an-introduction-to-mqtt/). 

it is essentially a more restrictive way to send & receive data. senders (publishers) can't subscribe, and vice-versa. communication between the two happens via a broker. 

in this way, both clients can have reduced energy & computational power (because they either send or receive to the broker, and not worry about other things). 





