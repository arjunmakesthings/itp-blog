---
date: 2026-10-22
tags:
  - experiments
noteOrder: "550"
draft: "false"
---
# ask: 
didn't get to previous week's readings; so those: 

- https://itp.nyu.edu/classes/undnet/http-and-rest-clients-and-servers/
- http rfc: https://www.w3.org/Protocols/
- intro to http: https://itp.nyu.edu/networks/explanations/a-gentle-introduction-to-http/

> Set up a web server on your host. 
> Set up an HTTPS certificate and a basic home page as well. 
> Examine the access logs after a few days. 
> Internet Organizations Reports groups 1 & 2 will present next week.

readings for next week: 

- understanding rest: https://en.wikipedia.org/wiki/REST
- building web services with rest: https://www.xfront.com/REST-Web-Services.html

---

i first got curious about the itp assignments site, because noticed that we have to log-in to view them, while the rest of the content is accessible. ran this: 

``` 
curl -L https://itp.nyu.edu/classes/undnet/assignments/#Web_Server -v

```

``` zsh
* Ignoring the response-body
* Connection #0 to host itp.nyu.edu left intact
* Issue another request to this URL: 'https://itp.nyu.edu/classes/undnet/wp-login.php?redirect_to=%2Fclasses%2Fundnet%2Fassignments%2F'
* Found bundle for host: 0x104b657c0 [can multiplex]
* Re-using existing connection with host itp.nyu.edu
* [HTTP/2] [3] OPENED stream for https://itp.nyu.edu/classes/undnet/wp-login.php?redirect_to=%2Fclasses%2Fundnet%2Fassignments%2F
* [HTTP/2] [3] [:method: GET]
* [HTTP/2] [3] [:scheme: https]
* [HTTP/2] [3] [:authority: itp.nyu.edu]
* [HTTP/2] [3] [:path: /classes/undnet/wp-login.php?redirect_to=%2Fclasses%2Fundnet%2Fassignments%2F]
* [HTTP/2] [3] [user-agent: curl/8.7.1]
* [HTTP/2] [3] [accept: */*]
> GET /classes/undnet/wp-login.php?redirect_to=%2Fclasses%2Fundnet%2Fassignments%2F HTTP/2
> Host: itp.nyu.edu
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/2 302
< content-type: text/html; charset=UTF-8
< content-length: 0
< date: Mon, 26 Oct 2026 13:20:53 GMT
< x-xss-protection: 1; mode=block
< set-cookie: AWSALB=gco2Zcr32+0TXzYBrMLknJNkSmIXbuFIo0w9p81L3t7RidblHf+LICwu/v4d5i9pRvTKLWZ1bLMrUuJnaoxd5pQFSTZh+n8/zax++uTHqHbEP2uktylPuaukhyR1; Expires=Mon, 02 Nov 2026 13:20:52 GMT; Path=/
< set-cookie: AWSALBCORS=gco2Zcr32+0TXzYBrMLknJNkSmIXbuFIo0w9p81L3t7RidblHf+LICwu/v4d5i9pRvTKLWZ1bLMrUuJnaoxd5pQFSTZh+n8/zax++uTHqHbEP2uktylPuaukhyR1; Expires=Mon, 02 Nov 2026 13:20:52 GMT; Path=/; SameSite=None; Secure
< set-cookie: wordpress_test_cookie=WP%20Cookie%20check; path=/classes/; secure; HttpOnly
< set-cookie: PHPSESSID=9ja7ebnh37fbhe7fmtm7t8hiee; path=/
< server: nginx/1.20.1
< x-powered-by: PHP/8.3.36
< x-frame-options: SAMEORIGIN
< content-security-policy: frame-ancestors 'self';
< referrer-policy: strict-origin-when-cross-origin
< expires: Thu, 19 Nov 1981 08:52:00 GMT
< cache-control: no-store, no-cache, must-revalidate
< pragma: no-cache
< x-redirect-by: WordPress
< location: /auth/login.php?mode=wordpress
< x-content-type-options: nosniff
< x-cache: Miss from cloudfront
< via: 1.1 5c2391b2e9fa5fd698a6b7cdbb3f3646.cloudfront.net (CloudFront)
< x-amz-cf-pop: JFK50-P16
< x-amz-cf-id: BLdNUL2xG4yRPUL6c43ODFYc3R7uTLvSQUTtDu4jsxnGebfKyjlU1Q==
< vary: Origin
<
* Ignoring the response-body
* Connection #0 to host itp.nyu.edu left intact
* Issue another request to this URL: 'https://itp.nyu.edu/auth/login.php?mode=wordpress'

```

---

had a hard time collaborating with people; perhaps because it wasn't as interesting to them.

for my report, since i already worked on some sections earlier, i decided to do some more digging about the structure of an rfc. 

if you run curl the same rfc from rfc editor — [rfc 2026](https://www.rfc-editor.org/info/rfc2026/) — and from the ietf website — [rfc 2026 @ietf](https://datatracker.ietf.org/doc/rfc2026/), you get different results. 

![[Screenshot 2026-10-26 at 09.38.35.webp]]

one is a minimized file (rfc-editor) — perhaps to save space — while the other is more readable.

i discovered that they use something called nuxt to generate the page: https://nuxt.com/docs/4.x/api/commands/generate

differences in how content is formatted: 

![[Screenshot 2026-10-26 at 09.54.29.png]]

this is why the links on ietf are not clickable for the structure. 

they accept an xml file of the internet-draft: https://datatracker.ietf.org/submit/

rfc structure: 

https://www.rfc-editor.org/authors/rfc-style-guide/

i also discovered a broken link on the rfc editor: https://www.rfc-editor.org/cluster_def.html

from https://www.rfc-editor.org/info/rfc7322/#ref-CLUSTER

rfc editor queue: https://queue.rfc-editor.org

cluster: grouped rfc-s: https://queue.rfc-editor.org/clusters/588

``` txt
3.2.  Punctuation

   *  No overstriking (or underlining) is allowed.

   *  When a sentence ended by a period is immediately followed by
      another sentence, there must be two blank spaces after the period.

   *  A comma is used before the last item of a series, e.g.,

         "TCP service is reliable, ordered, and full duplex"

   *  When quoting literal text, punctuation is placed outside quotation
      marks, e.g.,

         Search for the string "Error Found".

      When quoting general text, such as general text from another RFC,
      punctuation may be included within the quotation marks, e.g.,

         RFC 4844 indicates that "RFCs are available free of charge to
         anyone via the Internet."

      Quotation marks are not necessary when text is formatted as a
      block quotation.

```

from:

> Policies governing the RFC Series as a whole are defined through the following high-level process:
> 
> Proposals must be submitted to, adopted by, and discussed within the RFC Series Working Group (RSWG).
> 
> Proposals must pass a Last Call for comments in the working group and a community call for comments (see Section 3.2.3).
> 
> Proposals must be approved by the RFC Series Approval Board (RSAB).
> 
> Policies under the purview of the RSWG and RSAB might include, but are not limited to, document formats, processes for publication and dissemination of RFCs, and overall management of the RFC Series.
> 
> (The text in the next paragraph is added by Section 1.4.)
> 
> Such policies will not include detailed technical specifications, for example, specific details of text or graphical formats or XML grammar. Such matters will be decided and documented by the RPC along with its other working practices, as discussed in Section 4.2, with community consultation as for other tools and services supported by the IETF LLC [RFC8711].

3.2.2 covers workflow: https://www.rfc-editor.org/info/rfc9920/#section-3

rfc boilerplate: https://www.rfc-editor.org/info/rfc7841

erratas — https://www.rfc-editor.org/series/rfc-errata/

i decided to submit the errata for the broken link: https://errata.rfc-editor.org/search/?rfc_number=7322

the page was damn confusing. 

cluster page: https://authors.ietf.org/rfc-publication-process

![[Screenshot 2026-10-26 at 10.26.28.webp]]



rfcxml files. now using kramdown-rfc: https://rpc-wiki.rfc-editor.org/doku.php?id=pilot_test_kramdown_rfc

policies: 

Policies governing the RFC Series as a whole are defined through the following high-level process:

Proposals must be submitted to, adopted by, and discussed within the RFC Series Working Group (RSWG).

Proposals must pass a Last Call for comments in the working group and a community call for comments (see Section 3.2.3).

Proposals must be approved by the RFC Series Approval Board (RSAB).

from: https://www.rfc-editor.org/info/rfc9920/#section-2

rsab: 

The RFC Series Approval Board (RSAB), which includes representatives of all of the streams, shall act as the approving body for proposals generated within the RSWG, thus providing an appropriate set of checks and balances on the output of the RSWG. The only policy-making role of the RSAB is to review policy proposals generated by the RSWG; it shall have no independent authority to formulate policy on its own. It is expected that the RSAB will respect the rough consensus of the RSWG wherever possible, without ceding its responsibility to review RSWG proposals, as further described in Section 3.2.2.

3.1.2.2. Members
The RSAB consists primarily of the following voting members:

A stream representative for the IETF Stream: either an IESG member or someone appointed by the IESG

A stream representative for the IAB Stream: either an IAB member or someone appointed by the IAB

A stream representative for the IRTF Stream: either the IRTF Chair or someone appointed by the IRTF Chair

A stream representative for the Independent Stream: either the Independent Submissions Editor (ISE) [RFC8730] or someone appointed by the ISE

The RFC Series Consulting Editor (RSCE)

from: https://www.rfc-editor.org/info/rfc9920/#section-2