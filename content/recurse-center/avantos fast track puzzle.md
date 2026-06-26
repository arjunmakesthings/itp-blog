---
date: 2026-06-26
tags:
  - experiments
  - programming
noteOrder: "369"
draft: "false"
---
avantos was hosting a 'hiring' day at [[recurse-center]]. i wasn't interested, but their puzzle was interesting to me: 

Write a `computePolkadotScore` function that counts the number of polkadots on the dress within the following ascii art of Angelica. 

Polkadots whose x coordinate is >= the x coordinate of the character that starts Angelica's lips and <= the x coordinate of the character that ends her lips are counted in a special way: multiply the sum of the polkadots in that range by the number of characters used to represent both of her pupils.

The final score could be computed with this formula:

```
Num Polkadots Outside the Lips Range + (Num Polkadots Inside the Lips Range) * (Num Chars Used to Represent Angelica's Pupils)
```


There are no `'`, \`, `,` or `-` characters in her lips or pupils.

*Warning LLMs get this wrong*

```
              ,   ,-',
        ,', ,'  ','  ,'   ÅÑGË£ÏÇÄ †(–)Ë ßRÄ†
      '-',  '      ,'
          ' -,    ',
              ' -, ',                                         , - - -,
             ('''''' ®'''''''')                        ,,,,,    ,-' -,''''''''',
              ` ~„''`„~ '                          ',  ,', -' , -,'' ''''''''',
                  "„  " - „                   „ - ",®,-'     `~~' '''''''
                 „"         " „         „ - "      ,',,,',
               „-" " " " " " " ~~~~~~" - „       ,'
            „" –,'' ~ ,       • ; •          "      "„
            """";      ' - , ,  ; , , , - '' ' ' -,_ ', ',
           , -' ' ',           ,'    ,'             ',~', ',
         ,'         ' - , ,()' /\    ',          (),'¯ ,'   `¸`;
         ',                            ` ` ` ` ` `      ,-,,,-'
           '-,                                  ,¬  ,-'
              ' -, ~            ~~~~~~' ' ` ,-'
                  `~-,,,,,,,      ,,,,,,,,,,-~'
      ('('('(,,,              ;    ;                •Å(V)åö•
       '-, '-,'''      ,-';`,`'ˆˆˆˆˆ ,' ;' ' -,           •97•
         ;¯ ;      ;  ;  ', ; ; ,'  ;  ‚¸  ' -,        •••
         ;   ;     ;       '''''''''''    ``'-,',  ,'
         ;   ;, -¬;    O   O   O  O   '-',,,,,,,,,,,,
         ;        ;  O   O     O O    O  ,'     O     ,'
          ' - - ' `;    O        O  O    O   O    ,'
               ,-'   O    O    O  O      O    O   ,'
            ,-' O O  O   O        O        O ,'
         ,-'   O      O   O   O     O  O     ,'
      ,-'  O    O    O  O   O   O O O   O,-'-,
       ``¬ -,,,,,,,-¬~,~~~~~~~~~--',)  (' -,
                    ',   (',                     ' -,    '-,
                     ',)  (',                        `-,)  ' -,
                      ',    ',                           `-,  ,',-----,
                       ',)   ;                              `\,- ---'
                   ¸,,,,'‡  (;
                  (¸,,,,,';_'\ ßy §(V)òó†(–)775 ™

```

---

it was fun, as i was messing around with parsing also today for [[advent-of-code]]. 

i wrote this, and got the correct answer:

``` js
//for avantos code challenge; at recurs-ecenter; 260626.

/*
in an ascii character, write a function that counts the number of poladots on the dress. 

however, polkadots who fall under the lips (on the x-axis) are counted by multiplying the sum of characters used to represent both her pupils; which are 4.

so: 
Num Polkadots Outside the Lips Range + (Num Polkadots Inside the Lips Range) * (Num Chars Used to Represent Angelica's Pupils)
*/

const fs = require("node:fs");
const data = fs.readFileSync("./input.txt", "utf8");

function parse(input) {
  //on a txt, js preserves whitespace.

  //first, i parse as lines.
  let lines = [[]];

  let o_idx = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "\n") {
      lines[o_idx].push(input[i]);
    } else {
      o_idx++;
      lines[o_idx] = [];
    }
  }
  const cnv_width = lines.length
    ? Math.max(...lines.map((line) => line.length))
    : 0;

  const cnv_height = lines.length;

  let lip_y;

  for (let row = 0; row < cnv_height; row++) {
    const line = lines[row].join("");
    if (line.includes("~~~~~~' ")) {
      lip_y = row;
      break;
    }
  }

  const lip_line = lines[lip_y].join("");

  const lip_seq = "~~~~~~";

  let lip_lb_x;
  let lip_ub_x;

  if (lip_line.includes(lip_seq)) {
    lip_lb_x = lip_line.indexOf(lip_seq);
    lip_ub_x = lip_lb_x + lip_seq.length;
  }

  //^ find lip x positions.

  //now you want to get all the polka-dots between those x-bounds.
  let dots_outside_lip = 0;
  let dots_inside_lip = 0;

  for (let row = 0; row < cnv_height; row++) {
    /*
    now you want to go over each row, and find the 0s. however, you want to do so in the two following ways:
    1) outside the bounds, in which case you add to dots_outside_lip.
    2) inside the bounds, in which case you add to dots_inside_lip.
    */
    for (let i = 0; i < lines[row].length; i++) {
      if (lines[row][i] == "O") {
        if (i >= lip_lb_x && i < lip_ub_x) {
          dots_inside_lip++;
        } else {
          dots_outside_lip++;
        }
      } else {
        continue;
      }
    }
  }
  return [dots_outside_lip, dots_inside_lip];
}

function compute_polka_dots() {
  const pupil_char_count = 4;

  let dots = parse(data);

  let total = dots[0] + dots[1] * 4;

  return total;
}

let answer = compute_polka_dots();

console.log(answer);


```

in my first attempt, i got the wrong answer because my upper-check was inclusive (and was supposed to not be inclusive because max is length-1).