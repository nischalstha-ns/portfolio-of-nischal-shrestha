const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const collisionSound = document.getElementById('collisionSound');
const eatingSound = document.getElementById('eatingSound');

let gameRunnning = false;
let gamePused = false;
let grid = 16;
let count = 0;
let score = 0;
let gemEaten = false;
let allowanceCounter = 0;

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
let startButton = document.querySelector('.start-button');
let gameOverScreen = document.querySelector('.game-over');
let scoreDisplay = document.querySelector('.score-display');

// Function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Start game event listener
startButton.addEventListener('click', function() {
    // console.log("Button is clicked");

    startgame();
});
//game over
gameOverScreen.querySelector('.start-button').addEventListener('click', function() {
    startgame();
});

// Event listener for keyboard controls
document.addEventListener('keydown', function(e) {
    if (!gameRunnning) {
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
        gamePused = !gamePused;
        context.fillStyle = '#fff';
        context.font = 'bold 30px Arial';
        if (gamePused) {
            context.fillText('Game Paused', canvas.width / 2 - 100, canvas.height / 2);
        } else {
            animationFrame = requestAnimationFrame(loop);
        }
    }
});

// Main game loop
function loop() {
    if (!gameRunnning || gamePused) {
        return;
    }

    // Game logic will go here...

    animationFrame = requestAnimationFrame(loop);
}

// Start game function
function startgame() {
    if (gameRunnning) {
        return;
    }

    gameRunnning = true;
    gamePused = false;
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
    scoreDisplay.style.display = 'none';
    scoreDisplay.textContent = score;

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(loop);
}

// End game function
function endGame() {
    gameRunnning = false;
    gamePused = true;
    gameOverScreen.style.display = 'block';

    document.querySelector('.game-over .score-display').textContent = score;

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
}
