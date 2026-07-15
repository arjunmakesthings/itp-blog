---
date: 2026-07-15
tags:
  - lectures
noteOrder: "389"
draft: "false"
---
an efficient data structure. 

a binary tree consists of nodes & edges, and has the following terminology: 

![[binary-tree.webp|571]]

subtree (x) -> all descendants of x. 
depth (x)  -> # of edges from x to root. 
height (x) -> # edges in longest downward path or max depth of x's subtree. 
height of root is height of tree. 

can traverse & represent by essentially storing the tree via a recursive algorithm: 

``` txt
iter (x):
	iter (x.left)
	output x
	iter(x.right)

```

therefore you get the following: 

![[Screenshot 2026-07-15 at 13.03.21.webp]]

efficient because finding is log(n) time. (half the items get discarded). 

![[Screenshot 2026-07-15 at 13.13.59.webp]]

even though data is stored in a tree, you might think that they preserve 'connections' (for example a is connected to both b & c, and so on). but that doesn't really matter — this is just an abstract way to store data — the connections are just for us to visualize them. 

so in the case of deleting something, we actually change the order in which things were stored: 

![[Screenshot 2026-07-15 at 13.39.29.webp]]

