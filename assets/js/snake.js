const canvas=document.getElementById('game');
const context=canvas.getContext('2d');
const collisionSound=document.getElementById('collisionSound')
const eatingSound=document.getElementById('eatingSound')

let gameRunnning=false;
let gamePused=false;
let grid=16;
let count=0;
let score=0;
let gemEaten=false;
let allowanceCounter=0;
let snake={
    x:160,
    y:160, 
    dx:graid,
    dy:0,
    cells:[],
    maxCells:4
};
let gem={
    x:320,
    y:320
};
// making into loop
let animationFrame;
let startButton=document.querySelector('.start-button');
let gameOverScreen=document.querySelector('.game-over');
let scoreDisplay=document.querySelector('.score-display');
// main function
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}


//event listener for computer version
document.addEventListener('keydown',functon(e){
    is(!gameRunnning){
        return;

    }
    // 37=left,38 upkey,39right,40 downkey,32 for spacebar
    if (e.which==37 && snake.dx==0){
        snake.dx=-grid;
        snake.dy=0;
    }
    if (e.which==38 && snake.dx==0){
        snake.dy=-grid;
        snake.dx=0;
    }if (e.which==39 && snake.dx==0){
        snake.dx=grid;
        snake.dy=0;
    }if (e.which==40 && snake.dx==0){
        snake.dy=grid;
        snake.dx=0;
    }

})