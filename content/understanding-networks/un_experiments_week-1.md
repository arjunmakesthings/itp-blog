---
date: 2026-09-12
tags:
  - experiments
noteOrder: "465"
draft: "false"
---
# reading: 
notes from various readings: 

https://blog.cloudflare.com/why-google-went-offline-today-and-a-bit-about/:

- google has a public dns server: 8.8.8.8
- looked at `dig`. it basically does a lookup from dns. so i can give an ip (or a web address), and it should resolve the dns and send it to me. 

interestingly, if you query the name: 

``` bash
a@10-20-81-185 ~ % dig https://dns.google

; <<>> DiG 9.10.6 <<>> https://dns.google
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 4017
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1220
;; QUESTION SECTION:
;https://dns.google.		IN	A

;; AUTHORITY SECTION:
google.			300	IN	SOA	ns-tld1.charlestonroadregistry.com. cloud-dns-hostmaster.google.com. 1 21600 3600 259200 900

;; Query time: 51 msec
;; SERVER: 128.122.0.11#53(128.122.0.11)
;; WHEN: Sat Sep 12 11:45:42 EDT 2026
;; MSG SIZE  rcvd: 145

a@10-20-81-185 ~ %

```

you get 145 bytes (i believe). 

but if you query the address: 

``` bash
a@10-20-81-185 ~ % dig 8.8.8.8

; <<>> DiG 9.10.6 <<>> 8.8.8.8
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 15637
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1220
;; QUESTION SECTION:
;8.8.8.8.			IN	A

;; AUTHORITY SECTION:
.			189	IN	SOA	a.root-servers.net. nstld.verisign-grs.com. 2026091200 1800 900 604800 86400

;; Query time: 10 msec
;; SERVER: 128.122.0.11#53(128.122.0.11)
;; WHEN: Sat Sep 12 11:39:49 EDT 2026
;; MSG SIZE  rcvd: 111

```

you get 111 bytes. but actually i'm querying the same server `128.122.0.11#53(128.122.0.11)`. i assume # is port. i don't know. 

and if i query the exact address that the server is on: 

``` bash
a@10-20-81-185 ~ % dig 128.122.0.11

; <<>> DiG 9.10.6 <<>> 128.122.0.11
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 15930
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1220
;; QUESTION SECTION:
;128.122.0.11.			IN	A

;; AUTHORITY SECTION:
.			46	IN	SOA	a.root-servers.net. nstld.verisign-grs.com. 2026091200 1800 900 604800 86400

;; Query time: 7 msec
;; SERVER: 128.122.0.11#53(128.122.0.11)
;; WHEN: Sat Sep 12 11:46:34 EDT 2026
;; MSG SIZE  rcvd: 116

```

i then looked into dig and realized i was stupid. dig does a lookup of a domain basically. and you can specify the domain name and where it needs to do the lookup. 

so, like for my domain: 

``` bash
a@10-20-81-185 ~ % dig @8.8.8.8 arjunmakesthings.github.io

; <<>> DiG 9.10.6 <<>> @8.8.8.8 arjunmakesthings.github.io
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5998
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;arjunmakesthings.github.io.	IN	A

;; ANSWER SECTION:
arjunmakesthings.github.io. 3600 IN	A	185.199.108.153
arjunmakesthings.github.io. 3600 IN	A	185.199.110.153
arjunmakesthings.github.io. 3600 IN	A	185.199.111.153
arjunmakesthings.github.io. 3600 IN	A	185.199.109.153

;; Query time: 141 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Sat Sep 12 11:48:46 EDT 2026
;; MSG SIZE  rcvd: 119

```

all of those ips were owned by github.com, but did not serve my website. so, i tried with tom's. 

so, ==all of these ips that are provided with the dns lookup are not reachable by the browser for some reason.== i don't know why. 

but this `dig`command is helpful to figure out where something is hosted. for example, for [[cody]]'s website, i can tell it's hosted on amazon by looking at this (and i can confirm because i know he uses aws). 

``` bash
a@10-20-81-185 ~ % dig https://www.ccfrost.com

; <<>> DiG 9.10.6 <<>> https://www.ccfrost.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 11060
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1220
;; QUESTION SECTION:
;https://www.ccfrost.com.	IN	A

;; AUTHORITY SECTION:
ccfrost.com.		300	IN	SOA	ns-27.awsdns-03.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400

;; Query time: 49 msec
;; SERVER: 128.122.0.11#53(128.122.0.11)
;; WHEN: Sat Sep 12 11:54:11 EDT 2026
;; MSG SIZE  rcvd: 129

a@10-20-81-185 ~ %

```

actually, aws doesn't even give me an ip for some reason. 

ah that was because i used https.  i just need to search for the domain. when i did that, i got: 

``` bash
a@10-20-81-185 ~ % dig ccfrost.com

; <<>> DiG 9.10.6 <<>> ccfrost.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36187
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1220
;; QUESTION SECTION:
;ccfrost.com.			IN	A

;; ANSWER SECTION:
ccfrost.com.		60	IN	A	13.33.67.7
ccfrost.com.		60	IN	A	13.33.67.12
ccfrost.com.		60	IN	A	13.33.67.71
ccfrost.com.		60	IN	A	13.33.67.82

;; Query time: 21 msec
;; SERVER: 128.122.0.11#53(128.122.0.11)
;; WHEN: Sat Sep 12 11:55:49 EDT 2026
;; MSG SIZE  rcvd: 104

```

then, if i ping his domain, i can tell which one serves the webpages publicly: 

``` bash
ccfrost.com.		60	IN	A	13.33.67.7
ccfrost.com.		60	IN	A	13.33.67.12
ccfrost.com.		60	IN	A	13.33.67.71
ccfrost.com.		60	IN	A	13.33.67.82

;; Query time: 21 msec
;; SERVER: 128.122.0.11#53(128.122.0.11)
;; WHEN: Sat Sep 12 11:55:49 EDT 2026
;; MSG SIZE  rcvd: 104

a@10-20-81-185 ~ % ping ccfrost.com
PING ccfrost.com (13.33.67.12): 56 data bytes
64 bytes from 13.33.67.12: icmp_seq=0 ttl=242 time=6.966 ms
64 bytes from 13.33.67.12: icmp_seq=1 ttl=242 time=10.408 ms
64 bytes from 13.33.67.12: icmp_seq=2 ttl=242 time=23.395 ms
64 bytes from 13.33.67.12: icmp_seq=3 ttl=242 time=60.249 ms
64 bytes from 13.33.67.12: icmp_seq=4 ttl=242 time=101.177 ms
^C
--- ccfrost.com ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 6.966/40.439/101.177/35.761 ms
a@10-20-81-185 ~ %

```

so, it was: `13.33.67.12`. but if i go to that ip, i get nothing. 
![[Screenshot 2026-09-12 at 11.58.07.webp]]

anyway; more notes from the reading: 

- each network has a unique number 'as' number. 

i tried finding the as number that i was a part of, but couldn't. it showed no matches. 

then, i realized that the mac does something interesting. ==for each network, you can choose between a fixed (random) mac address or a rotating one (perhaps to prevent being spoofed). ==

![[Screenshot 2026-09-12 at 12.12.49.webp|558]]

i realized this because my ifconfig for one network was something, and another for something else. 

on my raspberry-pi, however, my address remains the same. 

anyways: 

- each network has an as number. 
- as-s are connected by bgp (border gateway protocol) — ip -> ip -> ip and telling what ip is what network. 
- if anyone in the bgp says hey i'm this ip (which is in another as), the bgp trusts it and sends it to the as. 

the other readings were short & put things into perspective. i don't have many notes about that. 

---
# ask: 


---
# thought: 

---
# outputs: 






