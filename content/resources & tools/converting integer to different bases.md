---
tags:
  - tools
  - javascript
draft: "false"
---
to convert a number to another representation, one can use `toString(base)`. 

for example: 

``` js
> a.toString(16);
'4'
> a.toString(2);
'100'
> a.toString(8);
'4'
> a.toString(2).padStart(8);
'     100'
> a.toString(2).padStart(8,0);
'00000100'
>
```

say for example to have a base 2 number represented as 8 digits (a byte), one can use `.padStart(desired_length, fill character)`. 

