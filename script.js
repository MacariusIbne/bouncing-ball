const ball = document.getElementById("ball");
const obstacle = document.getElementById("obstacle");
const container = document.querySelector(".game-container");

let ballX = 100;
let ballY = 100;
let velocityX = 2;
let velocityY = 2;

const ballSize = 30;

function detectCollision(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function update() {
  // Move ball
  ballX += velocityX;
  ballY += velocityY;

  // Get container bounds
  const containerRect = container.getBoundingClientRect();
  const maxX = container.clientWidth - ballSize;
  const maxY = container.clientHeight - ballSize;

  // Wall collisions
  if (ballX <= 0 || ballX >= maxX) velocityX *= -1;
  if (ballY <= 0 || ballY >= maxY) velocityY *= -1;

  // Update ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Collision with obstacle
  const ballRect = ball.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  const containerOffset = containerRect;

  // Convert global coords to local relative to container
  const adjustedBallRect = {
    top: ballRect.top - containerOffset.top,
    bottom: ballRect.bottom - containerOffset.top,
    left: ballRect.left - containerOffset.left,
    right: ballRect.right - containerOffset.left
  };

  const adjustedObstacleRect = {
    top: obstacle.offsetTop,
    bottom: obstacle.offsetTop + obstacle.offsetHeight,
    left: obstacle.offsetLeft,
    right: obstacle.offsetLeft + obstacle.offsetWidth
  };

  if (detectCollision(adjustedBallRect, adjustedObstacleRect)) {
    velocityY *= -1;
  }

  requestAnimationFrame(update);
}

update();
ball.style.width = `${ballSize}px`;
ball.style.height = `${ballSize}px`;

