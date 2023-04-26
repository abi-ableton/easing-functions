let startTime;
// NOTE! If this value is under 1000 it starts to act weird, probably beause the floating point isn't precise enough
const dur = 1500; 

let startX, nextX, endX, prevX; 
let startY, nextY, endY, prevY;

let animating = false;

function setup() {
  createCanvas(800, 400);
  startX = nextX = prevX = endX = width / 2;
  startY = nextY = prevY = endY = height / 2;
  
  startTime = millis();
  
}

function draw() {
  background(240);
  noStroke();
  // Calculate the elapsed time since the animation started
  const elapsedTime = millis() - startTime;
  
  // Calculate the progress of the animation as a value between 0 and 1
  const progress = min(elapsedTime / dur, 1);
  
  if (animating) {
    // Calculate the next X and Y positions using the easing function for each coordinate like this:
    // next = lerp(prev, end, easingFunctionName(progress));

    // (see transferFunctions.js for a list of function names, or go to easings.net to test them out)
    // NOTE: Using different functions for X and Y can produce some really wild results, try it out! :)
    
    nextX = lerp(prevX, endX, easeInOutBounce(progress));
    nextY = lerp(prevY, endY, easeInQuad(progress));
  }

  // Draw the circles at the current and next positions
  fill(200);
  circle(endX, endY, 50);
  fill(50);
  circle(nextX, nextY, 50);
  
  // If the animation is complete, reset the start time and positions
  if (progress === 1 && animating) {
    startTime = millis();
    prevX = endX;
    endX = nextX;
    prevY = endY;
    endY = nextY;
    animating = false;
  }
}

function mouseClicked() {
  if (!animating) {
    endY = mouseY;
    endX = mouseX;
    animating = true;
  }
}