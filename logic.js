        //Data variables
        let canvas;
        let canvasContext;
        let ballX = 10;
        let ballSpeedX = 5;
        let ballY = 10;
        let ballSpeedY = 5;
        

        var player1Score = 0;
        var player2Score = 0;
        const winGame = 10;
        let showWinnerScreen = false;

        var paddle1Y = 300;
        var paddle2Y = 300;
        const paddle_height = 50;
        const paddle_thickness = 10;
    
        //Player controls functionality
        function playerMovementAndPosition(evt){
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            return {
                x:mouseX,
                y:mouseY
            };

        }

    // This function listens for the mouse click when the game is over.
    function handleMouseClick(evt){
        if (showWinnerScreen){
            player1Score = 0;
            player2Score = 0;
            showWinnerScreen = false;
        }
    }


    //When the window has loaded a anonymous function is called
    window.onload = function(){

        //Message printed to the console when the window has loaded.
        console.log('Welcome to the tennis game made by Patrick from his Udemy course.');

        //Canvas is found using the document.getElementById method with the Id Tennis.
        canvas = document.getElementById('Tennis');

        //Draws a 2d game on the canvas
        canvasContext = canvas.getContext('2d');

        //function called and Speed of the ball movement
        let framesPerSecond = 30;
        setInterval(callToAction, 1000/framesPerSecond);

        //Event listener that listens for when the user clicking on the mouse and calls uses the handleMouseCLick function.
        canvas.addEventListener('mousedown', handleMouseClick);
        
        //Calls the function playerMovementAndPosition and executes when the mouse is moved.
        canvas.addEventListener('mousemove',
            function(evt) {
                var mousePos = playerMovementAndPosition(evt);
                    paddle1Y = mousePos.y - (paddle_height/2);
        });
    }

    //Function that calls both the draw and movement functions
    function callToAction(){
        drawEverything();
        moveElements();
    }

    //Ball resets function
    function  ballReset(){
        if(player1Score >= winGame || player2Score >= winGame){
            showWinnerScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
    }

    //Computer player movement
    function AIpaddle(){
         var paddle2YCenter = paddle2Y + (paddle_height/2); 
         if (paddle2YCenter < ballY -35){
             paddle2Y += 6;}
         else if (paddle2YCenter > ballY +35)
                 { paddle2Y -= 6;}
    }

    //Movement function
    function moveElements(){

        //Check to see if game is won by a player.
        if(showWinnerScreen){
            return;
        }

        //Computer paddle function is called to action.
        AIpaddle();

        ballX += ballSpeedX;
        ballY += ballSpeedY;

      //PLayer1 screen and Paddle collisions
        if(ballX <= 10) {
            if(ballY > paddle1Y &&
                ballY < paddle1Y + paddle_height)
                { ballSpeedX = -ballSpeedX
                  var deltaY = ballY-(paddle1Y + paddle_height/2);
                  ballSpeedY = deltaY * 0.35;
                } 
            else{
                 if(ballX < 0){
                 player2Score ++;   //Must be before ballreset();
                 ballReset();
                }
            }

        }
        //PLayer2 screen and Paddle collisions
        if(ballX > canvas.width)
        {
            if(ballY > paddle2Y &&
                ballY < paddle2Y + paddle_height){
                     ballSpeedX = -ballSpeedX
                     var deltaY = ballY-(paddle2Y + paddle_height/2);
                  ballSpeedY = deltaY * 0.35;
            } else{
                     player1Score ++; //Must be before ballreset();
                     ballReset();
                     
            }
        }
         //Code that stops ball leaving screen to the top
        if(ballY < 0)
        {
            ballSpeedY = -ballSpeedY;
        }
        //Code that stops ball leaving screen to the bottom
        if(ballY > canvas.height)
        {
            ballSpeedY = -ballSpeedY;
        }
    }

    function drawNet(){
        for(var i = 0; i < canvas.height; i += 40){
            colorRect(canvas.width/2 - 1, i, 2, 20, 'white');
            }
    }


    //Draw to canvas function
    function drawEverything(){

        //Black square drawn as background
        colorRect(0,0,canvas.width, canvas.height, 'black');

        //Check to see if game is won and draw text on black canvas.
        if(showWinnerScreen){
            
            canvasContext.fillStyle = 'white';

            if(player1Score >= winGame){
                canvasContext.fillText("Red Wins!", 400, 350);}

                else if(player2Score >= winGame){
                    canvasContext.fillText("Green Wins!", 400, 350);
            }
            canvasContext.fillText("Click to continue", 400, 300);
            return;
        }
        //Draw the net funtion is called here.
        drawNet();

        //Red paddle drawn on black square
        colorRect(0, paddle1Y, paddle_thickness, paddle_height, 'red');

        //Green paddle drawn on black square
        colorRect(canvas.width - paddle_thickness, paddle2Y, paddle_thickness, paddle_height, 'green');

        //Ball is drawn on black background
        colorCircle(ballX, ballY, 5, 'white');

        //Player scores
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width-100, 100);
    }

    //Function used to create the Ball
    function colorCircle(centerX, centerY, radius, drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
        canvasContext.fill();

    }

    //Parent template for the canvas elements
    function colorRect(leftX ,topY ,width ,height ,drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);

    }
