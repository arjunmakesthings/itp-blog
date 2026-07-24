---
date: 2026-07-23
tags:
  - experiments
noteOrder: "406"
draft: "false"
---
[[william west]] organized a programmable-cad meetup and i learnt about openscad — a programming language to generate stl files for 3d renders. 

looked at [[understanding a .stl file]]. 

---

[[jenny xing]] & i programmed this in openscad: 

![[IMG_8192.webp|245]]

``` 
/*
programmable cad test; 260723. following autodesk inventor practice part drawing p. 2.
*/

//set segments globally: 
 $fn = 100; 

/*
openscad doesn't define units. you can do so in your slicer. these positions are simply relative to each other.
*/

translate([0,0,0]){
    difference(){
    union(){
        cylinder(h=30, d = 30); 
        translate([0,-15,0]){
            cube([18,30,30]);  
        }
    }
    cylinder(h=30, d=15); 
    }
     linear_extrude(height = 9){
    polygon([[18,15], [51,15], [60,6], [60,-6], [51,-15], [18, -15]]); 
     }
    
     translate([0,3.5,0]){
     rotate([90,0, 0]){
     linear_extrude(height=7){
    polygon([[18,9], [60,9], [18,30]]);
     }
 }
 }
} 

```

learnt a bunch. this has some notes: 

``` 
/*
programmable cad test; 260723. following autodesk inventor practice part drawing p. 2.
*/

//set segments: 
 $fn = 100; 

/*
openscad doesn't define units. you can do so in your slicer. these positions are simply relative to each other.
*/


// for livecode demo on monday:
gap = 20; 

//primitives; left:

/*
translate([0,0,0]){
    cylinder(30,15,15); 
}

translate([0,0,gap * 2]){
    cylinder(30,7.5,7.5); 
}

translate([gap,-30/2,0]){
    cube([18,30,30]); 
}
*/

//combined:

/*
translate([0,0,0]){
    difference(){
    union(){
        cylinder(h=30, d = 30); 
        translate([0,-15,0]){
            cube([18,30,30]);  
        }
    }
    cylinder(h=30, d=15); 
    }
}
*/

//weird polygon:

/*
translate([0, 0, 0]){
    linear_extrude(9){
    polygon([[18,15], [51,15], [60,6], [60,-6], [51,-15], [18, -15]]); 
    }
}

     translate([0,3.5,0]){
     rotate([90,0, 0]){
     linear_extrude(height=7){
    polygon([[18,9], [60,9], [18,30]]);
     }
 }
 }
*/

//actual code:
translate([0,0,0]){
    difference(){
    union(){
        cylinder(h=30, d = 30); 
        translate([0,-15,0]){
            cube([18,30,30]);  
        }
    }
    cylinder(h=30, d=15); 
    }
     linear_extrude(height = 9){
    polygon([[18,15], [51,15], [60,6], [60,-6], [51,-15], [18, -15]]); 
     }
    
     translate([0,3.5,0]){
     rotate([90,0, 0]){
     linear_extrude(height=7){
    polygon([[18,9], [60,9], [18,30]]);
     }
 }
 }
} 
```

