//board
let board;
let boardwidth = 500;
let boardheight = 500;
let context;


let playerwidth = 10;
let playerheight = 50;
let playervelocityY = 0;

let player1 = {
    x : 10,
    y : boardheight/2,
    width : playerwidth,
    height : playerheight,
    velocityY : playervelocityY
}

let player2 = {
    x : boardwidth - playerwidth - 10,
    y : boardheight/2,
    width : playerwidth,
    height : playerheight,
    velocityY : playervelocityY
}

//ball
let ballwidth = 10;
let ballheight = 10;
let ball = {
    x : boardwidth/2,
    y : boardheight/2,
    width : ballwidth,
    height : ballheight,
    velocityX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;


//window.onload function we can use this function perform some task as soon as the pag finished loading.
window.onload = function(){
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    //getContext function that you use to get access to the canvas tag 2D drawing function
    context = board.getContext("2d");


    //draw initial player1
    context.fillStyle = "red";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", moveplayer)
}

function update(){
    requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height)

    // player1
    context.fillStyle = "skyblue";
    //player1.y += player1.velocityY
    let nextPlayer1Y = player1.y + player1.velocityY;
    if(!outofBounds(nextPlayer1Y)){
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //player2
    //player2.y += player2.velocityY; 
    let nextPlayer2Y = player2.y + player2.velocityY;
    if(!outofBounds(nextPlayer2Y)){
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.height, ball.width);

    //if ball touches top or bottom of canvas
    if(ball.y <= 0 || (ball.y + ball.height >= boardheight)){
        ball.velocityY *= -1;//reverse direction.
    }


    //bounce the ball back
    if(detectCollision(ball, player1)){
        if(ball.x <= player1.x + player1.width){
            //left side ball touches right side of player1
            ball.velocityX *= -1 // flip x direction
        }
    }
    else if(detectCollision(ball, player2)){
        if(ball.x + ballwidth >= player2.x){
            //right side of ball touches left side of player2
            ball.velocityX *= -1//flip x direction
        }
    }


    //game over
    if(ball.x < 0){
        player2Score++;
        resetGame(1);
    }else if(ball.x + ballwidth >boardwidth){
        player1Score++;
        resetGame(-1);
    }

    //score.
    context.font = "45px sans-serif";
    context.fillText(player1Score,boardwidth/5, 50);
    context.fillText(player2Score, boardwidth*4/5 -45, 50);

        //draw dotted line down the middle

    for(let i = 10; i < board.height; i += 25){
        //i =starting y position, draw a square every 25 pixels down
        //(x position = half of boardwidth -10), i=y position, width = 5, height = 5
        context.fillRect(board.width/2 - 10 , i, 5, 5);
    }
}


function outofBounds(yPosition){
    return(yPosition < 0 || yPosition + playerheight > boardheight)
}

function moveplayer(e){
    //player1
    if(e.code == "ArrowLeft"){
        player1.velocityY = -3;
    }
    else if(e.code == "ArrowRight"){
        player1.velocityY = 3;
    }


    //plyer2
    if(e.code == "ArrowUp"){
        player2.velocityY = -3
    }else if(e.code == "ArrowDown"){
        player2.velocityY = 3
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width && //a's top left corneer doesn;t reach b's top right corner
           a.x + a.width > b.x && //a's top right corner passes b's top left corner
           a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y; // a's bottom left corner  passes b's top left corner
}   


function resetGame(direction){
    
    ball = {
        x : boardwidth/2,
        y : boardheight/2,
        width : ballwidth,
        height : ballheight,
        velocityX : 1,
        velocityY : 2
    }
}