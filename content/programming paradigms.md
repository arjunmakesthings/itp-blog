---
date: 2026-05-20
tags:
  - reading
noteOrder: "326"
draft: "false"
---
from [[lisp programming languages]]. 

https://www.geeksforgeeks.org/system-design/introduction-of-programming-paradigms/

- imperative: line-by-line
	- procedural: focuses on recipes
	- object-oriented: focuses on data + objects, apply procedures to them. 
- functional -> what to do; not how. like javascript. 
- logic -> prolog. 
- declarative -> what; not how like sql. 

from: https://stackoverflow.com/questions/10925689/functional-programming-vs-declarative-programming-vs-imperative-programming

C, C++, Java, Javascript, BASIC, Python, Ruby, and most other programming languages are imperative. As a rule, if it has explicit loops (for, while, repeat) that change variables with explicit assignment operations at each loop, then it's imperative.

SQL and XSLT are two well-known examples of declarative programming. Markup languages such as HTML and CSS are declarative too, although they are usually not powerful enough to describe arbitrary algorithms.

Here is an example computation (summing the income by gender, from a suitable data source) first written in an imperative language (Javascript) and then in a declarative language (SQL).

Imperative programming
var income_m = 0, income_f = 0;
for (var i = 0; i < income_list.length; i++) {
    if (income_list[i].gender == 'M')
        income_m += income_list[i].income;
    else
        income_f += income_list[i].income;
}
Notice:

explicit initialization of variables that will contain the running totals;
explicit loop over the data, modifying the control variable (i) and the running totals at each iteration;
conditionals (ifs) are only used to choose the code path at each iteration.
Declarative programming
select gender, sum(income)
from income_list
group by gender;
Notice:

memory cells to contain running totals are implied by the output you declare you want;
any loop the CPU will need to perform (eg. over the income_list table) is implied by the output you declare you want and by the structure of the source data;
conditionals (eg. case in SQL) are used in a functional way to specify the output value you want based on the input values, not to choose a code path.