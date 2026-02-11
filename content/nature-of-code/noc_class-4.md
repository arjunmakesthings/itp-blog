---
date: 2026-02-11
tags:
  - lectures
noteOrder: "236"
draft: "false"
---
learnt about writing better helper functions (by handling different variations of properties that could be passed): 

``` js
class Shape {
  static vector(x0, y0, x1, y1){
    
      if(x1 === undefined && y1 == undefined){
        if(isNaN(x0)) {
          if(y0 === undefined) {
            return Shape.vector(0, 0, x0.x, x0.y);
          }
          return Shape.vector(x0.x, x0.y, y0.x, y0.y);
        }
        return Shape.vector(0, 0, x0, y0);
      }
  
    push();
    translate(x0, y0);
    
    let vect = createVector(x1, y1);
    vect.sub(x0, y0);
    rotate(vect.heading()); 
    
    let r = vect.mag();
    line(0, 0, r, 0);
    line(r, 0, 0.9 * r, -4);
    line(r, 0, 0.9 * r, +4);
    pop();
    
  } 
}
```

so you can call it in many ways: 

``` js
  let vect = createVector(46, 100);
  let vect2 = createVector(90, 50);
  
  Shape.vector(100, 100, 80, 210);
  
  Shape.vector(50,50);
  
  Shape.vector(vect);
  Shape.vector(vect, vect2);
```

i was trying to write static methods for each case instead, but perhaps the above is more friendly with errors. 

``` js
class better_vec {
	  static from_coords(x0, y0, x1, y1, show) {
	    if (show == true) {
	      //draw:
	      push();
	      translate(x0, y0);
	      let curr_vec = createVector(x1, y1).sub(x0, y0);
	      rotate(curr_vec.heading());
	
	      stroke(255, 0, 0);
	
	      line(0, 0, curr_vec.mag(), 0);
	
	      fill(255, 0, 0);
	
	      beginShape(TRIANGLES);
	      vertex(curr_vec.mag(), 0);
	      vertex(curr_vec.mag() - 10, 5);
	      vertex(curr_vec.mag() - 10, -5);
	      endShape();
	
	      pop();
	    }
	    return createVector(x1, y1).sub(x0, y0);
	  }
  }
```

---

in classes, you can make *getters*; 

``` js
class whatever {
	get radius (){
	//whatever
	}
}
```

now you can call `this.radius` and that will run the function. 