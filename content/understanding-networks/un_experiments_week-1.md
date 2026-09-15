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

i didn't successfully make one in the first time. my ssh authentication was not working. [[james]] & i tried using the verbose mode to figure out what was happening, but we couldn't. so i just did the whole thing again. 

got it the second time. you can also make it ssh using keys that are not in the `~/.ssh/`directory with `ssh -i <filepath ~>`. 

==when i locked my root password, i realized that user didn't have access to sudo controls.== 

so, i had to log-in as root from the webconsole, and run this: 

``` bash
sudo usermod -aG sudo <username>
```

then i was able to sudo with my non-root id. 

got firewall: 

``` bash
non-root@arjun-und-net:~$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup

```

need to read this: https://itp.nyu.edu/networks/setting-up-a-firewall-on-an-embedded-linux-device/

watched this: https://vimeo.com/457083868 for firewall log detection. 

- ssh runs on port 22
- web server operates on 80 & 443. 


these are my firewall logs: 

``` bash
2026-09-13T01:20:00.517334+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=176.65.134.24 DST=167.99.147.44 LEN=76 TOS=0x00 PREC=0x00 TTL=246 ID=54321 PROTO=UDP SPT=43838 DPT=123 LEN=56
2026-09-13T01:20:14.724817+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=74.82.47.19 DST=167.99.147.44 LEN=40 TOS=0x00 PREC=0x00 TTL=242 ID=54321 PROTO=TCP SPT=40551 DPT=81 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:20:14.805176+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=77.239.124.128 DST=167.99.147.44 LEN=40 TOS=0x00 PREC=0x00 TTL=247 ID=54321 PROTO=TCP SPT=55840 DPT=8088 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:20:15.905984+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=85.217.140.52 DST=167.99.147.44 LEN=52 TOS=0x00 PREC=0x00 TTL=52 ID=58354 PROTO=TCP SPT=33004 DPT=18144 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:20:21.153937+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=176.65.134.52 DST=167.99.147.44 LEN=44 TOS=0x00 PREC=0x00 TTL=245 ID=27347 PROTO=TCP SPT=61000 DPT=25567 WINDOW=1025 RES=0x00 SYN URGP=0
2026-09-13T01:20:23.427965+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=45.33.46.249 DST=167.99.147.44 LEN=40 TOS=0x00 PREC=0x00 TTL=240 ID=54321 PROTO=TCP SPT=41173 DPT=53 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:20:24.931985+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=85.217.149.71 DST=167.99.147.44 LEN=52 TOS=0x00 PREC=0x00 TTL=53 ID=1586 PROTO=TCP SPT=55598 DPT=16279 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:20:34.624916+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=136.60.47.95 DST=167.99.147.44 LEN=64 TOS=0x00 PREC=0x00 TTL=53 ID=0 DF PROTO=TCP SPT=50782 DPT=56495 WINDOW=8192 RES=0x00 SYN URGP=0
2026-09-13T01:20:35.380316+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=198.235.24.197 DST=167.99.147.44 LEN=44 TOS=0x00 PREC=0x00 TTL=249 ID=54321 PROTO=TCP SPT=55421 DPT=20121 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:20:35.625660+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=136.60.47.95 DST=167.99.147.44 LEN=64 TOS=0x00 PREC=0x00 TTL=53 ID=0 DF PROTO=TCP SPT=50782 DPT=56495 WINDOW=8192 RES=0x00 SYN URGP=0
2026-09-13T01:20:36.547685+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=136.60.47.95 DST=167.99.147.44 LEN=64 TOS=0x00 PREC=0x00 TTL=53 ID=0 DF PROTO=TCP SPT=50788 DPT=56495 WINDOW=8192 RES=0x00 SYN URGP=0
2026-09-13T01:20:48.147294+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=147.185.132.42 DST=167.99.147.44 LEN=44 TOS=0x00 PREC=0x00 TTL=247 ID=54321 PROTO=TCP SPT=53989 DPT=7170 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:21:00.826067+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=37.221.195.225 DST=167.99.147.44 LEN=60 TOS=0x00 PREC=0x00 TTL=56 ID=30446 DF PROTO=TCP SPT=64204 DPT=8443 WINDOW=42340 RES=0x00 SYN URGP=0
2026-09-13T01:21:22.337694+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=20.150.197.110 DST=167.99.147.44 LEN=52 TOS=0x00 PREC=0x00 TTL=44 ID=44356 PROTO=TCP SPT=33020 DPT=8040 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:21:40.616923+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=66.132.186.246 DST=167.99.147.44 LEN=60 TOS=0x00 PREC=0x00 TTL=57 ID=24343 PROTO=TCP SPT=37261 DPT=22822 WINDOW=42340 RES=0x00 SYN URGP=0
2026-09-13T01:22:10.791473+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=172.94.9.39 DST=167.99.147.44 LEN=44 TOS=0x00 PREC=0x00 TTL=247 ID=59516 PROTO=TCP SPT=56207 DPT=3355 WINDOW=1025 RES=0x00 SYN URGP=0
2026-09-13T01:22:24.117265+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=162.216.149.103 DST=167.99.147.44 LEN=44 TOS=0x00 PREC=0x00 TTL=247 ID=54321 PROTO=TCP SPT=52137 DPT=9859 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:22:41.191256+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=77.239.124.128 DST=167.99.147.44 LEN=40 TOS=0x00 PREC=0x00 TTL=247 ID=54321 PROTO=TCP SPT=39602 DPT=8088 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:23:09.955026+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=194.187.176.111 DST=167.99.147.44 LEN=44 TOS=0x08 PREC=0x20 TTL=241 ID=16533 DF PROTO=TCP SPT=63826 DPT=8991 WINDOW=8192 RES=0x00 SYN URGP=0
2026-09-13T01:23:22.934838+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=66.132.172.114 DST=167.99.147.44 LEN=60 TOS=0x00 PREC=0x00 TTL=56 ID=16930 PROTO=TCP SPT=58358 DPT=17988 WINDOW=42340 RES=0x00 SYN URGP=0
2026-09-13T01:23:41.827432+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=31.220.3.165 DST=167.99.147.44 LEN=40 TOS=0x08 PREC=0x20 TTL=53 ID=27587 PROTO=TCP SPT=35842 DPT=23 WINDOW=41258 RES=0x00 SYN URGP=0
2026-09-13T01:24:01.163027+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=64.89.163.83 DST=167.99.147.44 LEN=44 TOS=0x08 PREC=0x20 TTL=241 ID=28808 PROTO=TCP SPT=42459 DPT=5432 WINDOW=1025 RES=0x00 SYN URGP=0
2026-09-13T01:24:26.549486+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=185.139.214.221 DST=167.99.147.44 LEN=40 TOS=0x08 PREC=0x20 TTL=241 ID=59463 PROTO=TCP SPT=58626 DPT=21 WINDOW=1024 RES=0x00 SYN URGP=0
2026-09-13T01:24:42.058411+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=69.12.71.34 DST=167.99.147.44 LEN=40 TOS=0x08 PREC=0x40 TTL=241 ID=54321 PROTO=TCP SPT=38104 DPT=9200 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:25:14.649801+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=167.94.146.76 DST=167.99.147.44 LEN=60 TOS=0x08 PREC=0x40 TTL=50 ID=5228 PROTO=TCP SPT=59772 DPT=61793 WINDOW=42340 RES=0x00 SYN URGP=0
2026-09-13T01:25:24.206819+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=85.217.140.2 DST=167.99.147.44 LEN=52 TOS=0x00 PREC=0x00 TTL=51 ID=50766 PROTO=TCP SPT=58502 DPT=7080 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:25:47.433371+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=45.79.67.140 DST=167.99.147.44 LEN=40 TOS=0x00 PREC=0x00 TTL=240 ID=54321 PROTO=TCP SPT=52590 DPT=3128 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:26:03.710187+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=91.231.89.66 DST=167.99.147.44 LEN=60 TOS=0x00 PREC=0x00 TTL=52 ID=37825 DF PROTO=TCP SPT=46319 DPT=7673 WINDOW=5840 RES=0x00 SYN URGP=0
2026-09-13T01:26:22.412939+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=116.98.50.77 DST=167.99.147.44 LEN=60 TOS=0x00 PREC=0x00 TTL=47 ID=24590 DF PROTO=TCP SPT=55110 DPT=23 WINDOW=65340 RES=0x00 SYN URGP=0
2026-09-13T01:26:49.803901+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=185.73.23.133 DST=167.99.147.44 LEN=52 TOS=0x00 PREC=0x00 TTL=49 ID=31434 PROTO=TCP SPT=47292 DPT=1883 WINDOW=65535 RES=0x00 SYN URGP=0
2026-09-13T01:27:00.546389+00:00 arjun-und-net kernel: [UFW BLOCK] IN=eth0 OUT= MAC=16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00 SRC=85.217.149.70 DST=167.99.147.44 LEN=52 TOS=0x00 PREC=0x00 TTL=53 ID=25051 PROTO=TCP SPT=35690 DPT=27742 WINDOW=65535 RES=0x00 SYN URGP=0
```

all of them are actually from this mac address: 

``` bash
16:c2:4a:12:1c:49:fe:00:00:00:01:01:08:00
```

no assignment was found for this mac address. 

from unix intro: 

file tells the type of encoding for a file;

``` zsh
a@Mac class-2 % file scene1.html
scene1.html: HTML document text, ASCII text
a@Mac class-2 % file webgl.js
webgl.js: ASCII text
a@Mac class-2 %

```

three ways to chain programs: 

``` txt

pipes (|): take output of one feed it to the other — read l-> r. 

read (<): feed something with something else -> someprogram < input.txt

overwrite (>): change something in something else -> $ echo hello > output.txt
$ cat output.txt
hello

append with (>>): not overwrite; but add to the end. 
```

[[ryan]] showed me about headers that get sent. so, when i do dig for tigoe.net: 

``` bash
; <<>> DiG 9.10.6 <<>> @8.8.8.8 tigoe.net
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 3071
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;tigoe.net.			IN	A

;; ANSWER SECTION:
tigoe.net.		3600	IN	A	104.236.102.241

;; Query time: 135 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Tue Sep 15 09:56:04 EDT 2026
;; MSG SIZE  rcvd: 54
```

here, the returned ip is: 

``` zsh
104.236.102.241

```

now this cannot be opened on the web-browser. because, when i send tigoe.net over the web, certain headers get attached to it which are handled by that ip-address:

![[Screenshot 2026-09-15 at 09.56.58.webp]]

so if i was to send my query with these headers to that ip, i would get tigoe.net. i don't know how to do that right now.

i was doing some stuff for shared-minds ([[sm_experiments_week-2]]), and i saw that an a.i. agent used `curl` to get a webpage. tried that: 

``` bash
a@Mac week-2 % curl https://itp-ima-replicate-proxy.web.app
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.8/firebase-database-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.8/firebase-auth-compat.js"></script>
    <!-- Markdown rendering libs -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
    <title>Proxy For Replicate API</title>
</head>

<body>
    <link rel="stylesheet" href="style.css">
    <header id="siteHeader" class="site-header">
        <div class="header-left">
            <a href="/" class="header-title">Replicate Proxy</a>
            <nav class="header-nav">
                <a href="examples.html">Examples</a>
                <a href="examples_all.html">All Examples</a>
            </nav>
        </div>
        <div class="header-right">
            <a href="#settings" id="headerSettings" class="header-link">Settings</a>
        </div>
    </header>
    <main id="mainContent" class="main-content">
        <div id="docs" style="max-width:900px; padding:16px"></div>
    </main>
    <footer id="authFooter">
        <hr>
        <h3>Authentication</h3>
        <div id="headerAuth"></div>
    </footer>
    <script src="main.js"></script>
    <script>
        // Load docs.md and render as HTML below the header
        fetch('docs.md').then(r => r.text()).then(md => {
            const raw = marked.parse(md, { mangle: false, headerIds: false });
            const clean = DOMPurify.sanitize(raw);
            document.getElementById('docs').innerHTML = clean;
        }).catch(() => {
            document.getElementById('docs').innerHTML = '<em>Docs not found (docs.md)</em>';
        });
    </script>
</body>

</html>%

```

just specifying host is not enough: 

``` bash
a@Mac week-2 % curl -H "Host: tigoe.net" http://104.236.102.241/
<html>
<head><title>301 Moved Permanently</title></head>
<body>
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx/1.24.0 (Ubuntu)</center>
</body>
</html>
```

ahhhh, if you do https:// on the ip, you go to the ip. 

https://104.236.102.241/ -> tigoe.net. 

not sure why — maybe the server needs https in the query? 



