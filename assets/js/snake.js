const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const collisionSound = document.getElementById('collisionSound');
const eatingSound = document.getElementById('eatingSound');

let gameRunning = false;
let gamePaused = false;
let grid = 16;
let count = 0;
let score = 0;
let gemEaten = false;

let snake = {
    x: 160,
    y: 160, 
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let gem = {
    x: 320,
    y: 320
};

// Animation frame
let animationFrame;

// Select UI elements
let startButton = document.querySelector('.start-button');
let gameOverScreen = document.querySelector('.game-over');
let scoreDisplay = document.querySelector('.score-display');

// Function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Start game event listener
if (startButton) {
    startButton.addEventListener('click', startGame);
}
if (gameOverScreen) {
    gameOverScreen.querySelector('.start-button').addEventListener('click', startGame);
}

// Event listener for keyboard controls
document.addEventListener('keydown', function (e) {
    if (!gameRunning) {
        return;
    }

    // 37=left, 38=up, 39=right, 40=down, 32=spacebar
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }

    // Pause game on spacebar
    if (e.which === 32) {
        gamePaused = !gamePaused;
        context.fillStyle = '#fff';
        context.font = 'bold 30px Arial';
        if (gamePaused) {
            context.fillText('Game Paused', canvas.width / 2 - 100, canvas.height / 2);
        } else {
            animationFrame = requestAnimationFrame(loop);
        }
    }
});

// Main game loop
function loop() {
    if (!gameRunning || gamePaused) {
        return;
    }

    animationFrame = requestAnimationFrame(loop);

    if (++count < 10) {
        return;
    }
    count = 0;

    // Clear canvas before rendering
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Move snake
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Wrap around walls (if applicable)
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Add new position to the front of the snake array
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Remove extra cells if snake length exceeds maxCells
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Draw gem
    context.fillStyle = "#fff";
    context.fillRect(gem.x, gem.y, grid - 1, grid - 1);
    context.shadowColor = 'rgba(0,0,0,0.5)';
    context.shadowBlur = 5;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    // Draw snake
    context.fillStyle = "#00FF00";
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // Snake eats gem
        if (cell.x === gem.x && cell.y === gem.y) {
            snake.maxCells++;
            score++;
            scoreDisplay.textContent = score;
            eatingSound.play();

            // Generate new random gem position
            gem.x = getRandomInt(0, 25) * grid;
            gem.y = getRandomInt(0, 25) * grid;
        }

        // Check for self-collision
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                endGame();
            }
        }
    });
}

// Start game function
function startGame() {
    if (gameRunning) {
        return;
    }

    gameRunning = true;
    gamePaused = false;
    score = 0;
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    gem.x = getRandomInt(0, 25) * grid;
    gem.y = getRandomInt(0, 25) * grid;

    startButton.style.display = 'none';
    gameOverScreen.style.display = 'none';
    scoreDisplay.textContent = score;

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(loop);
}

// End game function
function endGame() {
    gameRunning = false;
    gamePaused = true;
    gameOverScreen.style.display = 'block';

    document.querySelector('.game-over .score-display').textContent = score;

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
}
