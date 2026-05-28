---
date: 2026-05-21
tags:
  - experiments
noteOrder: "330"
draft: "false"
---
this is a log of my work on painting-algorithms during recurse center; summer-2026. 

read more on the [git repo](https://github.com/arjunmakesthings/painting-algorithms). to understand what the project is about. 

---
# 260521: 
i spent time understanding [glslviewer](https://github.com/patriciogonzalezvivo/glslViewer), and getting it set-up for me to use. 

this allows me to write shaders on my machine, and render them to a console window — thereby removing the overhead of a browser, javascript, and so on. 

i don't need to rely on any library or environment, or anything. it is just me, and the shader, in the terminal. 

wrote the first bit of shader code, as a test template. 

![[Screen Recording 2026-05-21 at 12.50.04.mp4]]

flipped uv coordinates so that 0,0 is top left (to make drawing make more sense later). 

![[Screen Recording 2026-05-21 at 17.34.48.mp4]]

---

# 260528: 
discovered step and smoothstep in glsl, instead of writing if else statements. also discovered how combinatorial logic can also result in gates. 

for example: 

```glsl
	if (mod(pos.x / size, 2.0)<1.0 && mod(pos.y / size, 2.0)<1.0){
		color = vec3(1.0);
	}
	else{
		color = vec3(0.0);
	}
```

is the same as: 

``` glsl
	float x = step(1.0, mod(pos.x / size, 2.0));
	float y = step(1.0, mod(pos.y / size, 2.0));

	float xy = x * y;

	color = vec3(xy);

```

step evaluates to 0.0 or 1.0 depending on the bound set. 

a shorter version would be: 

``` glsl
          vec2 col = step(1.0, mod(pos / size, 2.0))
          color = vec3(col.x * col.y);
```

