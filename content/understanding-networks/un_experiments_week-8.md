---
date: 2026-11-07
tags:
  - experiments
noteOrder: "571"
draft: "false"
---
# ask: 
> set up node.js on your host. You can confirm whether or not from the command line by typing which node. The host should respond with the directory path to node.js. If not, it’s not installed. If you prefer a graphic approach to server programming, try setting up node-red on your host.
> 
> Configure your host for microservices. Experiment with a simple service, like sending the time from the server, or a randomly generated text. Document the API for your service and explain how to access it. In the next assignment, one of your classmates will access your site via your REST API.
> 
> Do a basic test of your API in advance with a client, using fetch.

i was interested in having something on the floor, and people being able to access that; instead of hosting on digital ocean. 

i set up ubuntu (as a cli) on my raspberry, and configured it as a basic web-server. 

set all unused ports to reject, with ufw:

![[IMG_8693.webp|483]]

set up web-server and was able to access it:

![[IMG_8694.webp|486]]

if you are not on an nyu network, however, you cannot access this site (since my device does not have a public ip). 



