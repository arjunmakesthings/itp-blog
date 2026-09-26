---
date: 2026-09-23
tags:
  - experiments
noteOrder: "488"
draft: "false"
---
# reading: 
from [internet as a public utility](https://itp.nyu.edu/networks/explanations/internet-as-a-public-utility/): 

looked at sukanya's work. [[liquid router, by sukanya aneja, nick gregg & emma rae norton]] was neat.

> One would make a data call to an Internet Service Provider (ISP) to get connected.

> This type of connection employed a circuit-switching paradigm, where point-to-point connections were made over a fixed path — a telephone conversation would establish a connection between the caller and receiver, that would remain connected until the caller hung up. 

> dsl ... allowing one to simultaneously use the same connection for internet and telephone calls ...

> DSL employed a packet switching paradigm, where instead of creating a fixed point-to-point connection, data was broken up into packets that specified their destination.

> data travels at the speed of light. (fiber optics).

> Facebook – is capitalizing on weak infrastructure in developing countries by rolling out their own zero-rated internet, known as free basics. As of 2019, it has been rolled out in 65 countries (source). It has been referred to as an "African Dictator’s Dream” (source) by creating a way of controlling the internet, and has put little emphasis on local content. The image below highlights a search on Free Basics in Ghana, where the government’s website cannot be accessed. (source)

> “Facebook is not introducing people to open internet where you can learn, create and build things,” said Ellery Biddle, advocacy director of Global Voices.“It’s building this little web that turns the user into a mostly passive consumer of mostly western corporate content. That’s digital colonialism.”

> The prioritization of private interest and profit set the US apart from countries like Estonia and Sweden, where nation-wide access and coverage are priorities, dictated by ambitious coverage plans. By viewing internet access as a utility rather than a luxury, these countries have excelled in connecting their populations, and avoiding digital divides within their borders.The prioritization of private interests leads to digital divides not just in terms of connectivity, but also information, through practices such as zero-rating; as well as privacy issues resulting from data-retention policies. Efforts such as Facebook’s Free Basics serve the interests of local telecom companies by reducing their financial burden to create infrastructure, while creating further information divides and fueling a form of digital colonialism.

> [contract for the web](https://contractfortheweb.org), by tim berners lee. 

from what we should about dns:

> ITP is using a server which has the IP address 128.122.157.181. In addition, ITP has a few domain names like itp.nyu.edu and tisch.nyu.edu/itp(This is including a directory). The DNS associates the numerical IP address(128.122.157.181) with memorable domain name.

> The Domain Name System(DNS) is composed of the root servers which are managing TLD(Top Level Domain ex: .com, .edu, .net, .org etc) and name servers

> There are 13 root servers(A~M). a.root-servers.net manages root zone and other servers are mirrors of A

was confused about this. watched [this](https://www.youtube.com/watch?v=mpQZVYPuDGU) instead.  

the basic idea is this: 

![[IMG_8483.webp|616]]

there are 13 root servers, managed by 12 organisations. if all of them go down, no domain would be resolved (unless it was stored in cache somewhere). 

you can query the root servers for a `.com`domain: 

``` bash
; <<>> DiG 9.10.6 <<>> @a.root-servers.net com
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 42565
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 13, ADDITIONAL: 27
;; WARNING: recursion requested but not available

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;com.				IN	A

;; AUTHORITY SECTION:
com.			172800	IN	NS	l.gtld-servers.net.
com.			172800	IN	NS	j.gtld-servers.net.
com.			172800	IN	NS	h.gtld-servers.net.
com.			172800	IN	NS	d.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	f.gtld-servers.net.
com.			172800	IN	NS	k.gtld-servers.net.
com.			172800	IN	NS	m.gtld-servers.net.
com.			172800	IN	NS	i.gtld-servers.net.
com.			172800	IN	NS	g.gtld-servers.net.
com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
com.			172800	IN	NS	e.gtld-servers.net.

;; ADDITIONAL SECTION:
l.gtld-servers.net.	172800	IN	A	192.41.162.30
l.gtld-servers.net.	172800	IN	AAAA	2001:500:d937::30
j.gtld-servers.net.	172800	IN	A	192.48.79.30
j.gtld-servers.net.	172800	IN	AAAA	2001:502:7094::30
h.gtld-servers.net.	172800	IN	A	192.54.112.30
h.gtld-servers.net.	172800	IN	AAAA	2001:502:8cc::30
d.gtld-servers.net.	172800	IN	A	192.31.80.30
d.gtld-servers.net.	172800	IN	AAAA	2001:500:856e::30
b.gtld-servers.net.	172800	IN	A	192.33.14.30
b.gtld-servers.net.	172800	IN	AAAA	2001:503:231d::2:30
f.gtld-servers.net.	172800	IN	A	192.35.51.30
f.gtld-servers.net.	172800	IN	AAAA	2001:503:d414::30
k.gtld-servers.net.	172800	IN	A	192.52.178.30
k.gtld-servers.net.	172800	IN	AAAA	2001:503:d2d::30
m.gtld-servers.net.	172800	IN	A	192.55.83.30
m.gtld-servers.net.	172800	IN	AAAA	2001:501:b1f9::30
i.gtld-servers.net.	172800	IN	A	192.43.172.30
i.gtld-servers.net.	172800	IN	AAAA	2001:503:39c1::30
g.gtld-servers.net.	172800	IN	A	192.42.93.30
g.gtld-servers.net.	172800	IN	AAAA	2001:503:eea3::30
a.gtld-servers.net.	172800	IN	A	192.5.6.30
a.gtld-servers.net.	172800	IN	AAAA	2001:503:a83e::2:30
c.gtld-servers.net.	172800	IN	A	192.26.92.30
c.gtld-servers.net.	172800	IN	AAAA	2001:503:83eb::30
e.gtld-servers.net.	172800	IN	A	192.12.94.30
e.gtld-servers.net.	172800	IN	AAAA	2001:502:1ca1::30

;; Query time: 13 msec
;; SERVER: 198.41.0.4#53(198.41.0.4)
;; WHEN: Sat Sep 26 10:51:18 EDT 2026
;; MSG SIZE  rcvd: 828

```

these are the 13 nameservers with their mac-addresses: 

``` bash
l.gtld-servers.net.	172800	IN	A	192.41.162.30
l.gtld-servers.net.	172800	IN	AAAA	2001:500:d937::30
j.gtld-servers.net.	172800	IN	A	192.48.79.30
j.gtld-servers.net.	172800	IN	AAAA	2001:502:7094::30
h.gtld-servers.net.	172800	IN	A	192.54.112.30
h.gtld-servers.net.	172800	IN	AAAA	2001:502:8cc::30
d.gtld-servers.net.	172800	IN	A	192.31.80.30
d.gtld-servers.net.	172800	IN	AAAA	2001:500:856e::30
b.gtld-servers.net.	172800	IN	A	192.33.14.30
b.gtld-servers.net.	172800	IN	AAAA	2001:503:231d::2:30
f.gtld-servers.net.	172800	IN	A	192.35.51.30
f.gtld-servers.net.	172800	IN	AAAA	2001:503:d414::30
k.gtld-servers.net.	172800	IN	A	192.52.178.30
k.gtld-servers.net.	172800	IN	AAAA	2001:503:d2d::30
m.gtld-servers.net.	172800	IN	A	192.55.83.30
m.gtld-servers.net.	172800	IN	AAAA	2001:501:b1f9::30
i.gtld-servers.net.	172800	IN	A	192.43.172.30
i.gtld-servers.net.	172800	IN	AAAA	2001:503:39c1::30
g.gtld-servers.net.	172800	IN	A	192.42.93.30
g.gtld-servers.net.	172800	IN	AAAA	2001:503:eea3::30
a.gtld-servers.net.	172800	IN	A	192.5.6.30
a.gtld-servers.net.	172800	IN	AAAA	2001:503:a83e::2:30
c.gtld-servers.net.	172800	IN	A	192.26.92.30
c.gtld-servers.net.	172800	IN	AAAA	2001:503:83eb::30
e.gtld-servers.net.	172800	IN	A	192.12.94.30
e.gtld-servers.net.	172800	IN	AAAA	2001:502:1ca1::30

```

i can query these: 

``` bash
; <<>> DiG 9.10.6 <<>> @192.41.162.30 google.com
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 24288
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 4, ADDITIONAL: 9
;; WARNING: recursion requested but not available

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;google.com.			IN	A

;; AUTHORITY SECTION:
google.com.		172800	IN	NS	ns2.google.com.
google.com.		172800	IN	NS	ns1.google.com.
google.com.		172800	IN	NS	ns3.google.com.
google.com.		172800	IN	NS	ns4.google.com.

;; ADDITIONAL SECTION:
ns2.google.com.		172800	IN	AAAA	2001:4860:4802:34::a
ns2.google.com.		172800	IN	A	216.239.34.10
ns1.google.com.		172800	IN	AAAA	2001:4860:4802:32::a
ns1.google.com.		172800	IN	A	216.239.32.10
ns3.google.com.		172800	IN	AAAA	2001:4860:4802:36::a
ns3.google.com.		172800	IN	A	216.239.36.10
ns4.google.com.		172800	IN	AAAA	2001:4860:4802:38::a
ns4.google.com.		172800	IN	A	216.239.38.10

;; Query time: 81 msec
;; SERVER: 192.41.162.30#53(192.41.162.30)
;; WHEN: Sat Sep 26 11:16:41 EDT 2026
;; MSG SIZE  rcvd: 287

```

these are all google name servers: 

``` bash
ns2.google.com.		172800	IN	AAAA	2001:4860:4802:34::a
ns2.google.com.		172800	IN	A	216.239.34.10
ns1.google.com.		172800	IN	AAAA	2001:4860:4802:32::a
ns1.google.com.		172800	IN	A	216.239.32.10
ns3.google.com.		172800	IN	AAAA	2001:4860:4802:36::a
ns3.google.com.		172800	IN	A	216.239.36.10
ns4.google.com.		172800	IN	AAAA	2001:4860:4802:38::a
ns4.google.com.		172800	IN	A	216.239.38.10

```

i bet if we try something smaller, we'd get lesser nameservers. so, tigoe.net is served by 3 digitalocean nameservers: 

``` bash
tigoe.net.		172800	IN	NS	ns1.digitalocean.com.
tigoe.net.		172800	IN	NS	ns2.digitalocean.com.
tigoe.net.		172800	IN	NS	ns3.digitalocean.com.

```

tigoe.net is also, perhaps, not owned by tom; but registered to nyu broadway:

``` bash
OrgName:        New York University
OrgId:          NYU-Z
Address:        726 Broadway, 8th Floor - ITS
City:           New York
StateProv:      NY
PostalCode:     10003
Country:        US
RegDate:        2023-05-15
Updated:        2023-05-15
Ref:            https://rdap.arin.net/registry/entity/NYU-Z

```

==name resolution happens via udp packets.==

i wonder:

if i know the destination location for a packet (let's say i have a computer connected to nyu's webserver, and i can get its ip). i could cut into an ethernet cable that runs in the building, and just send packets? maybe i could force packets? there has to be some sort of handshake protocol to test whether packets from a certain host are meant to be read or not. don't know. 

didn't know facebook made ogp. 

>  The Open Graph Protocol(OGP) protocol. The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook. 

![[image-23.webp]]

interesting. i can grab open-graph details like so: 

``` bash
a@10-20-81-185 ~ % curl -L setwrite.in | grep "og:"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   167  100   167    0     0    335      0 --:--:-- --:--:-- --:--:--   335
100  2823  100  2823    0     0   5317      0 --:--:-- --:--:-- --:--:--  5317
      <meta property="og:type" content="website" />
      <meta property="og:title" content="home">
      <meta property="og:description" content="">
      <meta property="og:url" content="https://setwrite.in/">
      <meta property="og:image" content="https://setwrite.in/assets/media/activities/201409%20london/201510%20shobhan,%20out-of-the-box.jpg" /><meta property="og:site_name" content="shobhan s">
a@10-20-81-185 ~ %
      
```

this must be how google & stuff gets title & description & author exposed on search pages. wow, i can actually make a search engine by running semantic similarities on domains (because i believe you should be able to fetch all registered domains somehow if they all live on a tld-server). 

> So far in my understanding, Facebook gathers IP address, OGP meta information, redirect path, Canonical URL, and probably security information which security companies published. I guess they don’t open but, they collect data from Facebook users.

i wonder if facebook has a graph of the internet (it could literally see what page is connected to what, via the ogp tags). i wondered if wikipedia had the same. 

the url parameters on wikipedia are easy to manipulate. for example, a search for apple is: 

``` txt
https://en.wikipedia.org/wiki/Apple

```

banana would be: 

``` txt
https://en.wikipedia.org/wiki/Banana

```

and it gets case-resolved. 

damn they use open graph too!

``` bash
a@10-20-81-185 ~ % curl -L wikipedia.com/wiki/Apple | grep "og:"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   162  100   162    0     0   4549      0 --:--:-- --:--:-- --:--:--  4628
100   162  100   162    0     0   1921      0 --:--:-- --:--:-- --:--:--  1921
100   283  100   283    0     0   2179      0 --:--:-- --:--:-- --:--:--  2179
  1  883k    1  9308    0     0  48830      0  0:00:18 --:--:--  0:00:18 48830<meta property="og:image" content="https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/1280px-Pink_lady_and_cross_section.jpg?utm_source=en.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="407">
<meta property="og:title" content="Apple - Wikipedia">
<meta property="og:type" content="website">
100  883k  100  883k    0     0  3253k      0 --:--:-- --:--:-- --:--:-- 10.5M
a@10-20-81-185 ~ %

```

they also use links in an interesting way. each 'wiki' link has this property: 

``` bash
<li><a rel="mw:WikiLink" href="https://en.wikipedia.org/wiki/Airlie_Red_Flesh" title="Airlie Red Flesh">Airlie Red Flesh</a></li>
```

so, from any given page, you could fetch all the links; like so (i also piped it into a txt file):

``` zsh
curl -L wikipedia.com/wiki/Apple | grep "mw:WikiLink" >> wikilinks.txt
```

the first set of td-s is the right side table:

![[Screenshot 2026-09-26 at 11.45.55.webp]]

from the [domain name system](https://docs.google.com/presentation/d/1KO1dSpZYLi0zEpL8_52Fq7xReEYqhg-WKPaYjI5nn3Q/edit?pli=1&slide=id.gaf715d160_1_2#slide=id.gaf715d160_1_2):

the application videos for tlds were amusing.

<iframe width="560" height="315" src="https://www.youtube.com/embed/usZAjW40QeA?si=Mp0d_npfORbDS2Jl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

damn google bought .app & .eat ... ugh. funnily they bought .mov which is apple's standard file format. 

verisign handle .com root-servers: 

``` zsh
a@10-20-81-185 ~ % whois .com
% IANA WHOIS server
% for more information on IANA, visit http://www.iana.org
% This query returned 1 object

domain:       COM

organisation: VeriSign Global Registry Services
address:      12061 Bluemont Way
address:      Reston VA 20190
address:      United States of America (the)

contact:      administrative
name:         Registry Customer Service
organisation: VeriSign Global Registry Services
address:      12061 Bluemont Way
address:      Reston VA 20190
address:      United States of America (the)
phone:        +1 703 925-6999
fax-no:       +1 703 948 3978
e-mail:       info@verisign-grs.com

contact:      technical
name:         Registry Customer Service
organisation: VeriSign Global Registry Services
address:      12061 Bluemont Way
address:      Reston VA 20190
address:      United States of America (the)
phone:        +1 703 925-6999
fax-no:       +1 703 948 3978
e-mail:       info@verisign-grs.com

nserver:      A.GTLD-SERVERS.NET 192.5.6.30 2001:503:a83e:0:0:0:2:30
nserver:      B.GTLD-SERVERS.NET 192.33.14.30 2001:503:231d:0:0:0:2:30
nserver:      C.GTLD-SERVERS.NET 192.26.92.30 2001:503:83eb:0:0:0:0:30
nserver:      D.GTLD-SERVERS.NET 192.31.80.30 2001:500:856e:0:0:0:0:30
nserver:      E.GTLD-SERVERS.NET 192.12.94.30 2001:502:1ca1:0:0:0:0:30
nserver:      F.GTLD-SERVERS.NET 192.35.51.30 2001:503:d414:0:0:0:0:30
nserver:      G.GTLD-SERVERS.NET 192.42.93.30 2001:503:eea3:0:0:0:0:30
nserver:      H.GTLD-SERVERS.NET 192.54.112.30 2001:502:8cc:0:0:0:0:30
nserver:      I.GTLD-SERVERS.NET 192.43.172.30 2001:503:39c1:0:0:0:0:30
nserver:      J.GTLD-SERVERS.NET 192.48.79.30 2001:502:7094:0:0:0:0:30
nserver:      K.GTLD-SERVERS.NET 192.52.178.30 2001:503:d2d:0:0:0:0:30
nserver:      L.GTLD-SERVERS.NET 192.41.162.30 2001:500:d937:0:0:0:0:30
nserver:      M.GTLD-SERVERS.NET 192.55.83.30 2001:501:b1f9:0:0:0:0:30
ds-rdata:     19718 13 2 8acbb0cd28f41250a80a491389424d341522d946b0da0c0291f2d3d771d7805a

```

yep; they say so on their website too: https://www.verisign.com/what-we-do/root-zone-maintainer/

---

# making: 
formatted my raspberry pi and installed ubuntu server on it so that i can have a digitalocean droplet like computer with me. 

ping + tcpdump from mac to raspberry pi: 

![[IMG_8484.mp4]]

i can also ssh into this. 

when i ran my tcpdump for a while, i noticed someone was querying who-has and my thing was responding also; idk what that was!

![[IMG_8485.webp]]

``` zsh
13:42:14.331889 IP 10.23.10.89.43385 > 91.189.91.112.123: NTPv4, Client, length 188
13:42:14.350885 IP 91.189.91.112.123 > 10.23.10.89.43385: NTPv4, Server, length 188
13:42:15.290393 IP 10.23.10.89.41726 > 91.189.91.113.123: NTPv4, Client, length 188
13:42:15.305294 IP 91.189.91.113.123 > 10.23.10.89.41726: NTPv4, Server, length 188
13:42:15.837729 IP 10.23.10.89.53866 > 185.125.190.121.123: NTPv4, Client, length 188
13:42:15.915247 IP 185.125.190.121.123 > 10.23.10.89.53866: NTPv4, Server, length 188
13:42:17.165856 IP 10.23.10.89.38892 > 185.125.190.123.123: NTPv4, Client, length 188
13:42:17.239400 IP 185.125.190.123.123 > 10.23.10.89.38892: NTPv4, Server, length 188
13:42:18.519136 IP 10.23.10.89.37242 > 185.125.190.122.123: NTPv4, Client, length 188
13:42:18.595517 IP 185.125.190.122.123 > 10.23.10.89.37242: NTPv4, Server, length 188
13:42:19.371483 ARP, Request who-has 10.23.8.1 tell 10.23.10.89, length 28
13:42:19.380956 ARP, Reply 10.23.8.1 is-at 00:00:5e:00:01:32, length 46
13:42:41.413737 IP 10.20.81.185 > 10.23.10.89: ICMP echo request, id 45080, seq 0, length 64
13:42:41.413907 IP 10.23.10.89 > 10.20.81.185: ICMP echo reply, id 45080, seq 0, length 64
```

ntpv4 synchronizes the computer's clock with the time server: https://www.rfc-editor.org/info/rfc5905/

a curl request: 

``` zsh
14:10:08.216238 IP 10.20.81.185.52587 > 10.23.10.89.80: Flags [SEW], seq 1349362391, win 65535, options [mss 1250,nop,wscale 6,nop,nop,TS val 2595837968 ecr 0,sackOK,eol], length 0
14:10:08.216454 IP 10.23.10.89.80 > 10.20.81.185.52587: Flags [R.], seq 0, ack 1349362392, win 0, length 0
14:10:11.396926 IP 10.23.10.89.37852 > 185.125.190.123.123: NTPv4, Client, length 188
14:10:11.473958 IP 185.125.190.123.123 > 10.23.10.89.37852: NTPv4, Server, length 188
14:10:13.611514 ARP, Request who-has 10.23.8.1 tell 10.23.10.89, length 28
14:10:13.620241 ARP, Reply 10.23.8.1 is-at 00:00:5e:00:01:32, length 46
14:10:20.710505 IP 10.20.81.185.52588 > 10.23.10.89.80: Flags [SEW], seq 4283543510, win 65535, options [mss 1250,nop,wscale 6,nop,nop,TS val 2733511286 ecr 0,sackOK,eol], length 0
14:10:20.710673 IP 10.23.10.89.80 > 10.20.81.185.52588: Flags [R.], seq 0, ack 4283543511, win 0, length 0
```

using pcap online viewer:

![[Screenshot 2026-09-26 at 14.20.42.webp]]

