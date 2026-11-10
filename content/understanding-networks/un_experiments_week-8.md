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

---

tldr: i made a game. if you want to play it, follow this: 

![[api-game.webp|306]]

or see [this](https://youtu.be/2sEAa2K-9N8) video where [[guy]] kindly plays my game at 10 in the night. 

---

i was interested in having something on the floor, and people being able to access that; instead of hosting on digital ocean. 

i set up ubuntu (as a cli) on my raspberry, and configured it as a basic web-server. 

set all unused ports to reject, with ufw:

![[IMG_8693.webp|483]]

set up web-server and was able to access it:

![[IMG_8694.webp|486]]

if you are not on an nyu network, however, you cannot access this site (since my device does not have a public ip). 

---

i found a [youtube-tutorial](https://www.youtube.com/watch?v=-MTSQjw5DrM) that sets up a rest api with express, and i found the code to be more similar (in terms of syntax) to express examples (such as using arrow functions (although i hate them, because they make code difficult to parse)). 

everything available in the request object: https://expressjs.com/en/api/request/

i then exposed all request parameters and stored it into a text file: 

``` js
app.get('/api/debug', (req, res) => {
	//store debug info; this exposes all request parameters that we can use:
	const dump = util.inspect(req, {depth:null}); 
	fs.writeFileSync(path.join(__dirname, 'req-params.txt'), dump); 
	res.send('finished writing txt file.'); 
}); 
```

realized that a bunch of things are getters (pointing to functions). such as the ip. 

ssh is blocked by the following: 

``` bash
sudo systemctl disable --now ssh

```

and denying 22/tcp connections on the ufw firewall. 

achieved post requests, and adding it to a temporary database (an array): 

``` js
const express = require ('express'); 
const path = require ('path'); 

//for storing into file:
const fs = require('fs'); 
const util = require('util'); 

const app = express(); 
const port = 8080;

let messages = ["checker message 1", "checker message 2"]; 


app.listen(port, () => {
	console.log("listening on port: " + port); 
})

/*
app.get('/api/debug', (req, res) => {
	//store debug info; this exposes all request parameters that we can use:
	const dump = util.inspect(req, {depth:null}); 
	fs.writeFileSync(path.join(__dirname, 'req-params.txt'), dump); 
	res.send('finished writing txt file.'); 
});
*/

//on the root of api, we send a static file containing the api-documentation.
app.get('/api', (req, res) => {
	console.log("got get request at /api from: " + req.ip); 
	res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.get('/api/view', (req, res) => {
	res.send(messages); 
});

app.post('/api/:message', (req, res) => {
	console.log("person posted: ", req.params.message); 
	messages.push(req.params.message); 
	res.send("added your message."); 
}); 
```

i wanted to make a game, because i thought it was so interesting that i could communicate with a server via messages (by adding parameters) to my id. since this website is hosted on my raspberry-pi on the floor, i decided to make it an api-game where a person had to discover where i'd hidden this server on the floor. 

wrote all the code over a day. took me a while, understanding node, express, and nginx. 

with [[ryan]] & [[matt]], i discovered that you could redirect a person with: 

![[IMG_8700.webp|575]]

took a while to add git to the pi, so that i could upload my code files. 

server code: 

``` js
const express = require ('express'); 
const path = require ('path'); 

//for storing into file:
const fs = require('fs'); 
const util = require('util'); 

const app = express(); 
const port = 8080;

let winners = []; 

app.use(express.text()); 

app.listen(port, () => {
	console.log("listening on port: " + port); 
})

/*
app.get('/api/debug', (req, res) => {
	//store debug info; this exposes all request parameters that we can use:
	const dump = util.inspect(req, {depth:null}); 
	fs.writeFileSync(path.join(__dirname, 'req-params.txt'), dump); 
	res.send('finished writing txt file.'); 
});
*/

//on the root of api, we send a static file containing the api-documentation.
app.get('/api', (req, res) => {
	console.log("got get request at /api from: " + req.ip); 
	res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.get('/api/i-am-worthy', (req, res) => {
	res.send(`
cool! happy to see you get started.

for the next clue, go to the big tv in red-square. there is a name written on a piece of orange tape. when you find it, send a POST request like so:

curl -X POST http://<ip>/api/<name>

from your terminal. if the name is correct, you'll get your next clue.`); 
});

app.post('/api/:name', (req, res) => {
	console.log(req.params.name);

	if (req.params.name === "lily"){
		res.send(`
that is correct! who knew, right? the next one: 

did you know that the itp-pillars have numbers? (the grey things that the ladders stand up against). 

they are numbered between 1-15. behind one of them is a piece of blue-tape that says "this is correct". to validate that you've found the right pillar, you must send a PUT request like so: 

curl -X PUT http://<ip>/api -H "Content-Type: text/plain" -d '<pillar-number>'
			`); 
	}else{
		res.send("nope. wrong response."); 
	}
});

app.put('/api', (req, res) => {
	let resp = req.body; 
	console.log("received put request with: ", resp);

	if (resp!=='14'){
		res.send("close; but not quite. only a few pillars have number-stickers. the one i picked has a number-sticker."); 
	}else{
		res.send(`
good find!

the pi is now nearby. look up: 

i've always found it strange that so many wires live on this metal-frame. it makes for a good spot to hide things. follow the wires till you see two hanging out of the grid. the pi lives there.   
			`)
	}
}); 

app.post('/api/i-have-won/:name', (req, res) => {
	winners.push({
		name: req.params.name, 
		time: new Date().toLocaleTimeString()
	})

	res.send(`
view winners on a browser at http://<ip>/api/winners 
		`); 
}); 

app.get('/api/winners', (req, res) => {
	res.send(`
<h3>all winners: </h3>

<ol>
${winners.map(w => `
<li>${w.name} - ${w.time}</li>
`).join('')}
</ol>
`); 
}); 


```

put this advert on the floor: 

![[IMG_8703.webp|354]]

used pm2 to keep it running, and left for the night.

---

i came back today to find out that there were no winners. i can check the log to see if anyone accessed it, but i doubt so. 

right when i was about to be dejected, [[antonia]] came up to me and said: "i've been doing your puzzle thing since the morning". she also wanted no hints, and wanted to do it herself. she said: "i love doing these things". that was wonderful. 

it's okay — many people at itp are busy. it was nice to see one person curious. i see her walking around the pillars now — she missed the clue, but it's okay. 

then i became more shameless and emailed everyone with a link to play it. i included the line:

``` txt
this email is sent to people on the floor that i think may be interested in networks. 
```

to try and spark some competitiveness. now i shall wait & see. 

photos of people trying to find it: 

![[IMG_8711.webp|376]]


![[IMG_8714.webp|382]]

![[IMG_8725.webp|385]]

![[IMG_8727.webp|379]]

![[IMG_8728.webp|378]]

![[IMG_8729.webp|376]]

winners: 

![[Screenshot 2026-11-10 at 15.15.36.webp]]

---

thanks to: [[guy]]; [[daniel shiffman]]; [[nikolai]]; [[phil]]; [[tom-igoe]]; [[antonia]]; [[gabriel]]. [[ryan]] & [[matt]] for helping me.