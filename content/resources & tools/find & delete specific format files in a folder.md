---
tags:
  - resources
  - shell-stuff
draft: "false"
---
find and delete a specific format extension in a shell: 

`find . -name "*.CR3" -delete`

find outputs stdout, so it can't be piped into echo like this: 

`find . -name "*.CR3" | echo`

instead, piping into wc will allow you to view what it returns (an integer) of found objects that match the pattern. 

`find . -name "*.CR3" | wc -l`