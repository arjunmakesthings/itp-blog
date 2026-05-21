---
date: 2026-05-19
tags:
  - learning
noteOrder: "324"
draft: "false"
---
# why: 
i saw [[nikolai]] preferring vim over any other code-editor. i also know that vim is much more powerful to use via keyboards than vscode. and, it just feels more pure. 

---

followed this: https://www.youtube.com/playlist?list=PLT98CRl2KxKHy4A5N70jMRYAROzzC2a6x

---

a few modes: 
- normal mode (view / inspect) — this is what it opens with.
- insert mode (type i or shift + a to enter end of current line)

commands: 
- `:w` writes the file.
- `:wq` saves and quits. 
- `u` in normal mode undoes changes. 
- `0` is beginning of current line & `$` jumps to end of line.
- `h j k l` in normal mode moves the cursor.

motions: 
- an operator — like a key — followed by a motion: another key.
	- delete (`d` + ):
		- w: until start of next word, excluding first character. 
		- e: end of current word, including last character. 
		- $ to end of line, including last character.
	- count (number + ):
		- w, e, etc. 

undo, redo: 
- `u` undos a change. 
- `U` returns a line to its original state (before undos). 
- `CTRL + r` redoes things. 

`dd` cuts and p pastes it. 

`r` is replace.

we write things in buffers. an empty or existing file is a buffer unless we write the buffer into the file.

---

took me a bit, but i customized vim to make it decent to look at (else it's horrendously ugly). i installed the nord arctic theme; moved to iterm; and changed the iterm default colours to nord. 

![[Screenshot 2026-05-21 at 00.32.08.webp]]