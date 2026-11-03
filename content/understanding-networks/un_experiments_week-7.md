---
date: 2026-10-31
tags:
  - experiments
noteOrder: "561"
draft: "false"
---
# ask: 
> set up node.js on site: 
> configure it for microservices: https://itp.nyu.edu/networks/setting-up-restful-web-services-with-nginx/
> 
> pending readings: 
> 
> - https://itp.nyu.edu/classes/undnet/http-and-rest-clients-and-servers/
- http rfc: https://www.w3.org/Protocols/
- intro to http: https://itp.nyu.edu/networks/explanations/a-gentle-introduction-to-http/
- understanding rest: https://en.wikipedia.org/wiki/REST
- building web services with rest: https://www.xfront.com/REST-Web-Services.html

---

first did not understand what a location block is [here](https://itp.nyu.edu/networks/setting-up-restful-web-services-with-nginx/) (but did so later). 

good explanation on what 'rest' is (versus the wikpedia page): https://www.youtube.com/watch?v=hlsxmp9kc0o

you essentially use the same methods as a 'crud' operation when working with databases + url + header + parameters -> package it into a request and send it to the server.

i first noticed what request i send when fetching a page: 

``` zsh
a@Mac ~ % curl -L 167.99.147.44 -v
*   Trying 167.99.147.44:80...
* Connected to 167.99.147.44 (167.99.147.44) port 80
> GET / HTTP/1.1
> Host: 167.99.147.44
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< Server: nginx/1.24.0 (Ubuntu)
< Date: Tue, 03 Nov 2026 04:31:06 GMT
< Content-Type: text/html
< Content-Length: 442
< Last-Modified: Tue, 20 Oct 2026 20:29:04 GMT
< Connection: keep-alive
< ETag: "6ad7cf10-1ba"
< Accept-Ranges: bytes
```

after those two, i understood that nginx serves static sites; but node — i assume — runs on your server looking at requests. 

> For all requests beginning with /garden nginx will make a localhost HTTP request to port 8080. node.js, listening on that port, will respond, and then nginx will take the response and send it to the client via HTTPS.

start and stop nginx server: 

``` zsh

sudo systemctl stop nginx

```

found [[tom-igoe]]'s node examples: https://github.com/tigoe/NodeExamples

configured server to handle a get request with: 

``` js
var express = require('express');
var server = express();
var body_parser = require('body-parser');
var proxy_location = '/request';

//runs when server starts:
function server_start(){
        var port = this.address().port;
        console.log('server on: ' + port);
}

function handle_get(request, response){
        console.log("received a get request: " + request);
        response.send("this is a get request.");
        response.end;
}

//start:
server.listen(8080, server_start);
server.get(proxy_location, handle_get);

```

p5 sketch as homepage (root address), and 'get' handler for root/request. 

![[Screen Recording 2026-11-03 at 00.16.35.mp4]]

and to keep that running, one would use something like pm2; like i did in [[sm_experiments_week-5]] (see: https://youtu.be/WnDCD_vxZhM?si=Hvb3CoR3P_xWAR6Z). 

