---
date: 2026-02-23
tags:
  - experiments
noteOrder: "252"
draft: "false"
---
# ask: 
>**option 1:** 
>Build a shader effect that uses custom vertex attributes.
>
>Use three.js and WebGL. You can either use a BufferGeometry and populate all the attribute data for it, or you can use a built-in geometry type, and add an additional BufferAttribute to it. Use whatever makes the most sense for your effect.


>**option 2:**
>Build a post-processing effect that uses a custom shader pass.
>
>Use three.js and WebGL. You can stack many effects in your EffectComposer but at least one of them has to use a custom shader! Use a GUI to control parameters and toggle render passes. 
>
>You can combine both options if you’d like!

---
i didn't have time this week because of the [[haptics/index|haptics]] class this weekend. 

made a random geometry generator. 

``` js
/* eslint-disable no-undef, no-unused-vars */

// three-js template by elie.

import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";
//this could just be three.js file.

import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18.1/dist/lil-gui.esm.min.js";

// Create renderer.
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(255, 255, 255); //rendered as rgb.

// Create camera.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 3;
scene.add(camera);

// load shaders, but as text files. the browser automatically converts them to javascript modules.
async function loadShader(url) {
  const res = await fetch(url);
  return await res.text();
}

//--
const aspect = window.innerWidth / window.innerHeight;

//load geometry, material, mesh + add to scene.
//generate random positions:

//helper for generating random integers.
function rando_int(min = 0, max = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const amount = rando_int(100, 1000);
// console.log(amount);

const positions = make_positions(rando_int(10, 100), 1);

function make_positions(n = 10, range = 2) {
  // n: number of points, range: half-width/height of area (so -range to +range).
  const positions = [];
  for (let i = 0; i < n; i++) {
    const x = (Math.random() * 2 - 1) * range;
    const y = (Math.random() * 2 - 1) * range;
    const z = (Math.random() * 2 - 1) * range;
    positions.push(x, y, z);
  }
  return positions;
}

const vertice_nums = positions.length / 3; //each position has three attributes; so.

function make_uvs() {
  //pass uvs as if nothing has changed.
  const uvs = [];
  for (let i = 0; i < vertice_nums; i++) {
    const u = i / (vertice_nums - 1);
    const v = i / (vertice_nums - 1);
    uvs.push(u, v);
  }
  return uvs;
}

const uvs = make_uvs();

//shuffle the index for the order in which they should be drawn.
const indices = make_shuffled_indices(vertice_nums);

function make_shuffled_indices(v) {
  const indices = [];

  for (let i = 0; i < vertice_nums; i++) {
    indices.push(i);
  }

  for (let i = vertice_nums - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

// Create geometry.
const planeGeo = new THREE.BufferGeometry();
planeGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
planeGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
planeGeo.setIndex(indices);

// Create material.
const frag_shader = await loadShader("./frag.frag");
const vert_shader = await loadShader("./vert.vert");

const planeMat = new THREE.RawShaderMaterial({
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
  uniforms: {
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_time: { value: 0.0 },
  },
});

// Create and add mesh to scene.
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
scene.add(planeMesh);

const clock = new THREE.Clock(); // tracks elapsed time

//animation loop:
const tick = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();

//for resizing:
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);

  // // Update geometry on resize
  // const newAspect = w / h;
  // rectGeo.dispose();
  // boxMesh.geometry = new THREE.PlaneGeometry(2 * newAspect, 2);

  // boxMat.uniforms.u_resolution.value.set(w, h);
});

```







