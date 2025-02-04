document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const collisionSound = document.getElementById('collisionSound');
    const eatingSound = document.getElementById('eatingSound');

    let gameRunning = false;
    let gamePaused = false;
    let grid = 16;
    let count = 0;
    let score = 0;

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

    let animationFrame;

    let startButton = document.querySelector('.start-button');
    let gameOverScreen = document.querySelector('.game-over');
    let scoreDisplay = document.querySelector('.score-display');

    // Mobile control buttons
    let upButton = document.getElementById('up-btn');
    let downButton = document.getElementById('down-btn');
    let leftButton = document.getElementById('left-btn');
    let rightButton = document.getElementById('right-btn');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    if (startButton) {
        startButton.addEventListener('click', startGame);
    }

    if (gameOverScreen) {
        gameOverScreen.querySelector('.start-button').addEventListener('click', startGame);
    }

    document.addEventListener('keydown', function (e) {
        if (!gameRunning) return;

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

        if (e.which === 32) {
            gamePaused = !gamePaused;
            if (gamePaused) {
                context.fillStyle = '#fff';
                context.font = 'bold 30px Arial';
                context.fillText('Game Paused', canvas.width / 2 - 100, canvas.height / 2);
            } else {
                animationFrame = requestAnimationFrame(loop);
            }
        }
    });

    // **Fix: Ensure buttons exist before adding listeners**
    if (upButton && downButton && leftButton && rightButton) {
        function moveUp(event) {
            event.preventDefault();
            if (snake.dy === 0) {
                snake.dx = 0;
                snake.dy = -grid;
            }
        }

        function moveDown(event) {
            event.preventDefault();
            if (snake.dy === 0) {
                snake.dx = 0;
                snake.dy = grid;
            }
        }

        function moveLeft(event) {
            event.preventDefault();
            if (snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            }
        }

        function moveRight(event) {
            event.preventDefault();
            if (snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            }
        }

        // **Apply both `touchstart` and `click` for compatibility**
        upButton.addEventListener('touchstart', moveUp);
        upButton.addEventListener('click', moveUp);

        downButton.addEventListener('touchstart', moveDown);
        downButton.addEventListener('click', moveDown);

        leftButton.addEventListener('touchstart', moveLeft);
        leftButton.addEventListener('click', moveLeft);

        rightButton.addEventListener('touchstart', moveRight);
        rightButton.addEventListener('click', moveRight);
    }

    function loop() {
        if (!gameRunning || gamePaused) return;

        animationFrame = requestAnimationFrame(loop);

        if (++count < 10) return;
        count = 0;

        context.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += snake.dx;
        snake.y += snake.dy;

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

        snake.cells.unshift({ x: snake.x, y: snake.y });

        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        context.fillStyle = "#fff";
        context.fillRect(gem.x, gem.y, grid - 1, grid - 1);

        context.fillStyle = "#00FF00";
        snake.cells.forEach(function (cell, index) {
            context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

            if (cell.x === gem.x && cell.y === gem.y) {
                snake.maxCells++;
                score++;
                scoreDisplay.textContent = score;
                eatingSound.play();

                gem.x = getRandomInt(0, 25) * grid;
                gem.y = getRandomInt(0, 25) * grid;
            }

            for (let i = index + 1; i < snake.cells.length; i++) {
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    endGame();
                    collisionSound.play();
                }
            }
        });
    }

    function startGame() {
        if (gameRunning) return;

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

    function endGame() {
        gameRunning = false;
        gamePaused = true;
        gameOverScreen.style.display = 'block';

        document.querySelector('.game-over .score-display').textContent = score;

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    }
});
