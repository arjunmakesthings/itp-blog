---
date: 2026-09-19
tags:
  - experiments
noteOrder: "481"
draft: "false"
---
# asks: 
> **reading**: 
> Paul Baran, On Distributed Communications: I. ==Introduction to Distributed Communications Networks (1964)==. This essay is one of the foundational documents of the internet, and network theory that led to its development. It’s part of On Distributed Communications series from the Rand corporation if you’d like to read more on it.
> 
> David Isenberg on ==Stupid Networks== (1998). This describes the difference between single-owner, circuit-switched networks and modern distributed, packet-switched networks. It helped communications industry professionals understand the digital networks that were emerging at that time.
> 
> **doing:**
> Use ==traceroute== to explore the paths of your network transactions (here’s an additional introduction to traceroute).  Try to get a sense of ==where the routers and servers on which you rely are physically located, and what networks they traverse==. (try Visual Traceroute too).
> 
> Start by tracing a few of the sites that you visit regularly:  Facebook, gmail, bank, school, Zoom, etc. Trace your last few online purchases or meetings. Alternately, download your browsing history from Google (if you use Chrome) from takeout.google.com.  You’re not recording the activities, you’re collecting data about the paths over which those activities occurred, after the fact.
> 
> Trace the paths from  ==all of the locations you regularly connect from==: home, school, any public places from which you connect. You can even trace from and to your mobile phone, if you know its IP address.  Save the traces in files, and make maps of the routes.
> 
> See if you can figure out where your ==most common sites are using IP geolocation==.  Use a site like ipinfo.io to make a list of where those IPs are located. ==Make a map== of  your results. How accurate do you think this map is, geographically? You might ==try a few different geoIP solutions== to find where each IP address is located, and see how the results differ:
> 
> Use the various command line tools we cover to extract the ten or twenty domains you visit the most.
> 
> Review your traceroute data to see what ==common hosts and autonomous systems (AS)== your traffic goes through. You can look up AS registrants on ARIN.net or any of the other Regional Internet Registries (RIRs).
> 
> Using the various Autonomous Systems you found, ==summarize the most common network providers== in your activities.  Identify who the major network providers are in your life, particularly those that your school, work, or home ISP get their services from. Figure out ==whose hands the data about your life goes through on a regular basis.== Look for patterns from your network-browsing habits through analysis and graphing of your network traces.
> 
> A few useful tools:
> 
> - Maxmind
> - IP2Location
> - IPdata.co
> - WhatismyIP.com
> - IPstack.com
>   
>   Feel free to obfuscate the endpoints if you don’t want us to know what sites you visit. Write a summary of your work and findings on your blog. We’ll compare notes on each others traces in class.

commands from previous class: 

``` txt
ping — is a host alive and can I contact it?
nslookup — what’s this host’s name?
whois — who owns this host?
traceroute — how do I get to this host?
arp — address resolution protocol: what MAC address is linked to what IP address?
curl icanhazip.com — quick lookup of the public address of your network
GeoIP: iplocation.io and others.
```

---
# reading: 

---
# doing: 






