---
date: 2026-06-25
tags:
  - lectures
noteOrder: "366"
draft: "false"
---
think of a set as an unordered list of unique items. 

if you don't sort the set, operations take linear time => o(n). 

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
```

here's my merge sort: 

<details>
<summary>code:</summary>

``` js
//merge sort function.

/*
given an array where length % 2 == 0:
- recursively divide array into smallest parts.
- sort between pairs. 
- return new sorted array.

we assume that this implementation of merge-sorting only does things in ascending order.

*/

function merge_sort(arr) {
  if (arr.length <= 1) return arr;

  let half = Math.floor(arr.length / 2);

  let left = merge_sort(arr.slice(0, half));
  let right = merge_sort(arr.slice(half));

  return merge(left, right);
}

//helper:
function merge(l, r) {
  let result = [];

  let i = 0;
  let j = 0;

  while (i < l.length && j < r.length) {
    if (l[i] <= r[j]) {
      result.push(l[i]);
      i++;
    } else {
      result.push(r[j]);
      j++;
    }
    while (i < l.length) {
      result.push(l[i]);
      i++;
    }

    while (j < r.length) {
      result.push(r[j]);
      j++;
    }
  }
  return result;
}

//we want to return a sorted list.
let org_arr = [6, 4, 7, 8, 2, 9];
let sorted_arr = merge_sort(org_arr);
console.log(
  "original array was: " + org_arr + "\n" + "new array is: " + sorted_arr,
);

```

</details>

---

also found the 'try, catch, finally' statements of javascript: https://www.youtube.com/watch?v=cFTFtuEQ-10

