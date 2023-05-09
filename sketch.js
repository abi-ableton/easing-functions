let startTime;
// NOTE! If this value is under 1000 it starts to act weird, probably beause the floating point isn't precise enough
const durX = 1500.0; 
const durY = 1000.0; 
const durHalo = 800;
const ballDiam = 50;
let startX, nextX, endX, prevX; 
let startY, nextY, endY, prevY;
let haloMin = ballDiam;
let haloMax = ballDiam * 2;
let haloNext, haloPrev;

let animating = false;
let haloAnimating = false;

function setup() {
  createCanvas(800, 400);
  startX = nextX = prevX = endX = width / 2;
  startY = nextY = prevY = endY = height / 2;
  haloNext = haloPrev = 50;
  
  startTime = millis();
  
}

function draw() {
  background(240);
  noStroke();
  // Calculate the elapsed time since the animation started
  const elapsedTime = millis() - startTime;
  
  // Calculate the progress of the animation as a value between 0 and 1
  let progressX = min(elapsedTime / durX, 1);
  let progressY = min(elapsedTime / durY, 1);
  // let progressHalo = min(elapsedTime / durHalo, 1);
  
  if (animating) {
    // Calculate the next X and Y positions using the easing function for each coordinate like this:
    // next = lerp(prev, end, easingFunctionName(progress));

    // (see transferFunctions.js for a list of function names, or go to easings.net to test them out)
    // NOTE: Using different functions for X and Y can produce some really wild results, try it out! :)
    
    nextX = lerp(prevX, endX, easeInOutBounce(progressX));
    nextY = lerp(prevY, endY, easeInOutElastic(progressY));
    
  }

  // Draw the circles at the current and next positions
  fill(200);
  circle(endX, endY, ballDiam);
  // fill(100);
  // circle(nextX, nextY, haloNext);
  fill(50);
  circle(nextX, nextY, ballDiam);
  
  // If the animation is complete, reset the start time and positions
  if (progressX == 1 && animating) {
    if (progressY == 1 && animating) {

      startTime = millis();
      prevX = endX;
      endX = nextX;
      prevY = endY;
      endY = nextY;
      animating = false;
    }
  }

  prevX = nextX;
  prevY = nextY;
}

function mouseClicked() {
  if (!animating) {
    endY = mouseY;
    endX = mouseX;
    animating = true;
    startTime = millis();
  }
}