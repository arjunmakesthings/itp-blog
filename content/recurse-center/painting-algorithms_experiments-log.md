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

---

# 260604: 
i realized that trying to compute all of this in the shader was sort of stupid. 

``` glsl
//auto brush moving; june, 2026.

#ifdef GL_ES
	precision mediump float; 
#endif

//uniforms: 
uniform vec2 u_resolution;
uniform vec2 u_time; 
uniform int u_frame; 

uniform sampler2D u_doubleBuffer0; 

//helpers:
float flip(float n){
	return 1.0 - n; 
}

//random:
float random(float n){
	float multiplier = 1000.0;
	return(fract(sin(n)*multiplier));
}

//noise:
float rand(vec2 p){
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

//velocity:
vec2 velocity(vec2 p){
    float n1 = noise(p * 2.0);
    float n2 = noise(p * 2.0 + 10.0);

    vec2 v = vec2(n1, n2) * 2.0 - 1.0;
    return v;
}

void main(){

	//common across passes:
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;

	//flip:
	//flip(uv.y);

	float col = 0.0; 
	float size = 0.005; 

#ifdef DOUBLE_BUFFER_0
	//compute:
	vec4 prev = texture2D(u_doubleBuffer0, uv).rgba; 
	vec2 brush_pos = prev.gb; 
	col = prev.r;

	brush_pos = (u_frame==0)
		? vec2 (0.5) 
		: brush_pos + velocity(brush_pos + noise(brush_pos + vec2(u_time)))*0.05;

	if (col!=1.0){
		//check if it's near the brush. 
		float d = distance(brush_pos, uv);
		col = step(d,size); 
	}


	gl_FragColor = vec4(col, vec2(brush_pos), 1.0); 

#else
	//shader two: read the r value from the previous run, and use that to paint.
	col = texture2D(u_doubleBuffer0, uv).r; 
	gl_FragColor = vec4(vec3(col), 0.5); 

#endif
	//output:
//	gl_FragColor = vec4(r,g,b,a); 
}


```

for starters: 

glsl does not preserve memory. it simply changes the color of each single pixel via a function that runs constantly. therefore, to preserve a state (or to remember), you use uniforms. 

---

# 260608: 
this past weekend, i fell sick. that was a good thing. 

i rethought what i was doing, and how i was spending my time at r.c. 