---
tags:
  - terms_and_concepts
draft: "false"
---
The factorial of a non-negative integer $n$, denoted by $n!$, is the product of all positive integers less than or equal to $n$.

The factorial of $n$ also equals the product of $n$ with the next smaller factorial:

$$
n! = n \times (n - 1) \times (n - 2) \times \cdots \times 3 \times 2 \times 1
$$

$$
n! =
\begin{cases}
1, & \text{if } n = 0 \\
n \times (n - 1)!, & \text{if } n \geq 1
\end{cases}
$$

Example:

$$
5! = 5 \times 4! = 5 \times 4 \times 3 \times 2 \times 1 = 120
$$

The value of $0!$ is defined as $1$ (empty product convention).

https://en.wikipedia.org/wiki/Factorial

useful for calculating total number of distinct combinations (3 letter code) 3!. 