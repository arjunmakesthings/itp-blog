---
date: 2026-06-25
tags:
  - lectures
noteOrder: "366"
draft: "false"
---
think of a set as an unordered list of unique items. 

if you don't sort the set, oeprations take linear time => o(n). 

however, if you sort the set, finding an object can take log^n time. 

![[IMG_8112.webp|258]]

==if every step is divided by a constant factor, that's log(n).==

![[Screenshot 2026-06-25 at 12.17.38.webp]]

---

tried implementing a merge-sort algorithm. failed in the first attempt, even though i understood it; but failed to translate it into code.

---

watched a video to understand how this worked, and stumbled upon the call stack: https://www.youtube.com/watch?v=aCPkszeKRa4&t=131s

![[Screenshot 2026-06-25 at 18.26.55.webp]]

so, essentially, in a factorial algorithm: 

``` js
//a factorial function.

function factorial(n){
    if (n<=1) return n;
    
    return (n*(factorial(n-1))); 
}

console.log(factorial(4)); 
```

the first call is dependent on the outcome of the second call ... nth call where n=1, then n is returned as itself (`1*1 = 1`), but then when we go up the stack, it keeps computing (because it was put on hold till the thing it was dependent on returned a value). 

this is what it means when the computer says 'maximum call stack exceeded'. i ran a simple script to figure out the max call stack for my environment (node.js): 

``` js
// Source - https://stackoverflow.com/a/7828803
// Posted by josh3736, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-25, License - CC BY-SA 4.0

var i = 0;
function inc() {
  i++;
  inc();
}

try {
  inc();
} catch (e) {
  // The StackOverflow sandbox adds one frame that is not being counted by this code
  // Incrementing once manually
  i++;
  console.log("Maximum stack size is", i, "in your current browser");
}

```


``` bash
a@as 260625_merge-sort % node call-stack-test.js
Maximum stack size is 10408 in your current browser
a@as 260625_merge-sort % 
```



