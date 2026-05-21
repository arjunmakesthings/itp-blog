---
date: 2026-05-20
tags:
  - talks
noteOrder: "325"
draft: "false"
---
[[raf]] took this. 

learnt about [[lisp programming languages]]. 

javascript was initially meant to be a lisp. 

---

clojure is essentially a general-purpose programming language, but works as a lisp. 

therefore, to add two numbers, you don't define a function: 

``` js
function add (n1, n2){
return n1 + n2; 
}

add (2+4)
```
 
 instead, you write expressions where everything returns a value. expressions have functions (predefined in the language / definable by you) or macros (which i believe are like (i don't know yet. should ask raf)). 

``` lisp
(+ 2 4) -> 3
```

clojure also has a repl, which [[raf]] explained to me. 

a repl runs an instance of a program in the background, so that all expressions in an editor are simply passed to it to be evaluated. therefore, the code doesn't need to 'compile' per se (the background instance compiles & runs all the functions & macros). everything that you write is simply on top of that. 

strudel is a repl; so is tidalcycles. bairui's recho ([[bairui's talk on recho]]) is also a repl for javascript. 
