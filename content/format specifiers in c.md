---
date: 2026-06-29
tags:
  - learning
  - c-language
noteOrder: "372"
draft: "false"
---
in c, i believe because types are important (statically typed), you need to tell the compiler what type of data you're going to be printing with `printf()`. 

for example: 

``` c
int main(){
	int message = "hello";
	
	printf("%s\n", message); 
	return 0;
}

```

will tell the compiler to print the string. 

format specifiers are here: https://www.geeksforgeeks.org/c/format-specifiers-in-c/