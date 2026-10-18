---
date: 2026-10-18
tags:
  - research
noteOrder: "542"
draft: "false"
---
did research on what rfc editor is for the internet-organizations report. 

from: https://www.youtube.com/watch?v=8IXLpoN8Xj0
tcp -> rfc 793
ip -> rfc 791

---

from the [first rfc](https://www.rfc-editor.org/info/rfc1/) by steve crocker: 
> There emerged from these meetings a working group of three, Steve Carr from Utah, Jeff Rulifson from SRI, and Steve Crocker of UCLA, who met during the fall and winter.  The most recent meeting was in the last week of March in Utah.  Also present was Bill Duvall of SRI who has recently started working with Jeff Rulifson.
> 
> Somewhat independently, Gerard DeLoche of UCLA has been working on the HOST-IMP interface.

in 1966, bob taylor initated arpanet: to enable resource sharing between remote computers [^1]. dr. larry roberts made the key decisions about the request for proposal to build the network [^2]. 

> The first computers were connected in 1969 and the Network Control Program was implemented in 1970, development of which was led by Steve Crocker at UCLA and other graduate students, including Jon Postel.[10][11][12]

for example, the host / host protocol developed by arpa network working group between '69 - '71 is available here: https://www.rfc-editor.org/info/rfc6529/

from the abstract: 

> It describes a protocol used to manage communication between processes residing on independent Hosts.  It addresses issues of multiplexing multiple streams of communication (including addressing, flow control, connection establishment/disestablishment, and other signaling) over a single hardware interface.  It was the official protocol of the
   ARPA Network from January 1972 until the switch to TCP/IP in January 1983.  It is offered as an RFC at this late date to help complete the  historical record available through the RFC series.

arpanet access points 1970s: 


![[arpanet-access-points-1970s.png|503]]

other notes from various sources: : 

from https://www.nytimes.com/2018/12/30/obituaries/lawrence-g-roberts-dies-at-81.html: 

roberts worked with ivan sutherland for sketchpad!

> “‘Larry’s Route’ soon became commonly known as the fastest distance between any two Pentagon points,” Dr. Crocker said.

> Hundreds of drawings later, he chose a distributed network, rather than a centralized or star configuration, to serve as the backbone of the Arpanet.

> But even as he focused on the overall architecture, he remained committed to finding practical uses for the nascent network.
> 
> Email, an application that ARPA-sponsored researchers had spent a great deal of time developing, quickly became one of the most popular applications on the Arpanet. When asked about that at a technical conference in 1986, Dr. Roberts said he was not surprised.
> 
> The ARPA director “decided it was a great thing, and he made everybody in ARPA use it,” Dr. Roberts said. “So all these managers of ballistic missile technology, who didn’t know what a computer was, had to start using electronic mail.”
> 
> Dr. Roberts added that he had received a note years earlier from Paul Baran, another networking pioneer, warning against personal use of email.
> 
> “It said, ‘==One thing you ought to watch out for is you can’t send out personal message stuff, that’s illegal. That’s against the postal laws and you’ll be in jail in no time==.’” Mr. Baran’s warning notwithstanding, there was no stopping the personal messages. “==But we didn’t happen to go to jail==,” Dr. Roberts told the audience.

found a presentation on the rfc & rfc editor from mit: https://web.mit.edu/rfc/rfc-editor/tutorial.latest.pdf

in 1969, there was the arpanet: a research network by arpa that connected computers between ucla, sri, uc santa barbara, and the university of utah so that resources were shared [^1] (researcher at one physical location could use resources at another), and to see whether a network like this would even work.

from [rfc1000](https://www.rfc-editor.org/rfc/rfc1000.txt): 
> This RFC is a reference guide for the Internet community which
   summarizes of all the Request for Comments issued between April 1969
   and March 1987.

> the design of the protocols and the creation of the RFCs was largely accidental

>    The procurement of the ARPANET was initiated in the summer of 1968 --
   Remember Vietnam, flower children, etc?  There had been prior
   experiments at various ARPA sites to link together computer systems,
   but this was the first version to explore packet-switching on a grand
   scale.  ("ARPA" didn't become "DARPA" until 1972.)  Unlike most of
   the ARPA/IPTO procurements of the day, this was a competitive
   procurement. The contract called for four IMPs to be delivered to
   UCLA, SRI, UCSB and The University of Utah.  These sites were running
   a Sigma 7 with the SEX operating system, an SDS 940 with the Genie
   operating system, an IBM 360/75 with OS/MVT (or perhaps OS/MFT), and
   a DEC PDP-10 with the Tenex operating system.  Options existed for
   additional nodes if the first experiments were successful.  BBN won
   the procurement in December 1968

> Part of the reason for selecting these four sites was these were
   existing ARPA computer science research contractors.  The precise
   usage of the ARPANET was not spelled out in advance, and the research
   community could be counted on to take some initiative.

> That first meeting was seminal.  We had lots of questions -- how IMPs and hosts would be connected, what hosts would say to each other, and what applications would be supported.  No one had any answers, but the prospects seemed exciting.  We found ourselves imagining all kinds of possibilities -- interactive graphics, cooperating processes, automatic data base query, electronic mail -- but no one knew where to begin.  We weren't sure whether there was really room to think hard about these problems; surely someone from the east would be along by and by to bring the word.  But we did come to one conclusion: We ought to meet again.

> we found ourselves talking to people whose first
   concern was how to get bits to flow quickly and reliably but hadn't
   -- of course -- spent any time considering the thirty or forty layers
   of protocol above the link level.

> And while BBN didn't take over the protocol design process, we kept expecting that an official protocol design team would announce itself.
> 
>    A month later, after a particularly delightful meeting in Utah, it became clear to us that we had better start writing down our    discussions.

> We had accumulated a few notes on the design of DEL (decoding-encoding-language) and
   other matters, and we decided to put them together in a set of notes.
   I remember having great fear that we would offend whomever the
   official protocol designers were, and I spent a sleepless night
   composing humble words for our notes.  The basic ground rules were
   that anyone could say anything and that nothing was official.  And to
   emphasize the point, I labeled the notes "Request for Comments."  I
   never dreamed these notes would distributed through the very medium
   we were discussing in these notes.  Talk about Sorcerer's Apprentice!

> Over the next few months we
   designed a symmetric host-host protocol, and we defined an abstract
   implementation of the protocol known as the Network Control Program.
   ("NCP" later came to be used as the name for the protocol, but it
   originally meant the program within the operating system that managed
   connections.

>  The rapid growth of the network and the working group also led to a
   large pile of RFCs.  When the 100th RFC was in sight, Peggy Karp took
   on the task of indexing them.  That seemed like a large task then,
   and we could have hardly anticipated seeing more than a 1000 RFCs
   several years later.

all the thousand rfs are indexed in that one document. 

> We weren't sure whether there was really room
   to think hard about these problems; surely someone from the east
   would be along by and by to bring the word.

---

wrote origins draft on [shared document](https://docs.google.com/document/d/1J8u5oWiHi9bKhDAi6mZAYXRDgqxkxgR-nybV9K-KvxY/edit?tab=t.0#heading=h.v1q1eqvgniag): 

origin: 
written by arjun; 261018:

for anyone familiar with a little bit of networks-history, it is no mystery that the internet didn’t just appear overnight.

the foundations can be traced back to the ‘arpanet’ — a project by the advanced-research-projects-agency (now darpa), in 1966, to share computational-resources between four universities on the west-coast via a network. 

stephen crocker writes in rfc-1000 about the first meeting: 

“That first meeting was seminal.  We had lots of questions ... No one had any answers, but the prospects seemed exciting.  We found ourselves imagining all kinds of possibilities ... but no one knew where to begin.  We weren't sure whether there was really room to think hard about these problems; surely someone from the east (coast) would be along by and by to bring the word.  But we did come to one conclusion: We ought to meet again.”

and writes about further meetings: 

“The BBN folks, led by Frank Heart, Bob Kahn, Severo Ornstein and Will Crowther, found themselves talking to a crew of graduate students they hadn't anticipated.  And we found ourselves talking to people whose first concern was how to get bits to flow quickly and reliably but hadn't ... spent any time considering the thirty or forty layers of protocol above the link level.  And while BBN didn't take over the protocol design process, we kept expecting that an official protocol design team would announce itself.

A month later, after a particularly delightful meeting in Utah, it became clear to us that we had better start writing down our discussions.  We had accumulated a few notes on the design of DEL and other matters, and we decided to put them together in a set of notes. I remember having great fear that we would offend whomever the official protocol designers were, and I spent a sleepless night composing humble words for our notes.  The basic ground rules were that anyone could say anything and that nothing was official.  And to emphasize the point, I labeled the notes "Request for Comments."”

thus began the ‘request for comments’ — essentially documents that summarized collective-thought about the implementation of protocols for the arpanet; so that when the (non-existent) protocol-designers showed up,  the arpa-network-working-group would be able to share their thoughts succinctly. 

little did stephen crocker know that the request-for-comments or rfc-s would become a technical-record that archived the work (implemented or not) of different working groups that contribute to the internet.  

---

---
footnotes: 

[^1]: https://archive.nytimes.com/www.nytimes.com/library/tech/99/12/biztech/articles/122099outlook-bobb.html

[^2]: https://www.nytimes.com/2018/12/30/obituaries/lawrence-g-roberts-dies-at-81.html
