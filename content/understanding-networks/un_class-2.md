---
date: 2026-09-15
tags:
  - lectures
noteOrder: "469"
draft: "false"
---
- public vs private ip: public ip is accessible by outside people from the network. have to be unique. private can be within network. 
- gateway is a type of ip on the edge of the border. 
- virtual machines: separate 'computing' devices, run off on one bare-metal device. 
- dhcp: when a mac-address connects, an ip is assigned. 

traceroute:

![[Screenshot 2026-09-15 at 16.19.10.webp|560]]

traceroute sends a sequence of pings. then decrements by 1 to get addresses of everyone from the route. 

- networks of new-york -> book.

someone in class & [[james]] shared how they did `whois` for the i.p. that connected: 

![[Screenshot 2026-09-15 at 16.41.46.webp|451]]

that was interesting. i tried to look for mac-addresses, and not ip-addresses. 

curl requests: 

![[Screenshot 2026-09-15 at 17.08.58.webp|488]]

- ==user agent is the browser:==
- ip2location.io

curl stuff to go to links: 

``` bash
a@10-20-81-185 ~ % curl -v -L tigoe.net
* Host tigoe.net:80 was resolved.
* IPv6: (none)
* IPv4: 104.236.102.241
*   Trying 104.236.102.241:80...
* Connected to tigoe.net (104.236.102.241) port 80
> GET / HTTP/1.1
> Host: tigoe.net
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 301 Moved Permanently
< Server: nginx/1.24.0 (Ubuntu)
< Date: Tue, 15 Sep 2026 21:21:44 GMT
< Content-Type: text/html
< Content-Length: 178
< Connection: keep-alive
< Location: https://tigoe.net/
<
* Ignoring the response-body
* Connection #0 to host tigoe.net left intact
* Clear auth, redirects to port from 80 to 443
* Issue another request to this URL: 'https://tigoe.net/'
* Host tigoe.net:443 was resolved.
* IPv6: (none)
* IPv4: 104.236.102.241
*   Trying 104.236.102.241:443...
* Connected to tigoe.net (104.236.102.241) port 443
* ALPN: curl offers h2,http/1.1
* (304) (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/cert.pem
*  CApath: none
* (304) (IN), TLS handshake, Server hello (2):
* (304) (IN), TLS handshake, Unknown (8):
* (304) (IN), TLS handshake, Certificate (11):
* (304) (IN), TLS handshake, CERT verify (15):
* (304) (IN), TLS handshake, Finished (20):
* (304) (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / AEAD-CHACHA20-POLY1305-SHA256 / [blank] / UNDEF
* ALPN: server accepted http/1.1
* Server certificate:
*  subject: CN=tigoe.net
*  start date: Jul 22 20:16:11 2026 GMT
*  expire date: Oct 20 20:16:10 2026 GMT
*  subjectAltName: host "tigoe.net" matched cert's "tigoe.net"
*  issuer: C=US; O=Let's Encrypt; CN=YR1
*  SSL certificate verify ok.
* using HTTP/1.x
> GET / HTTP/1.1
> Host: tigoe.net
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< Server: nginx/1.24.0 (Ubuntu)
< Date: Tue, 15 Sep 2026 21:21:44 GMT
< Content-Type: text/html
< Content-Length: 132
< Last-Modified: Mon, 29 Jul 2024 16:01:08 GMT
< Connection: keep-alive
< ETag: "66a7bcc4-84"
< Access-Control-Allow-Origin: *
< Accept-Ranges: bytes
<
<html>
    <head>
        <title>Welcome to tigoe.net</title>
    </head>
    <body>
        <h1>tigoe.net</h1>
    </body>
</html>
* Connection #1 to host tigoe.net left intact

```

