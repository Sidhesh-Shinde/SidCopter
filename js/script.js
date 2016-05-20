var can = document.getElementById('canvas');
var canvasContext = can.getContext('2d');

var score = 0;

var bgImage = new Image();
bgImage.src = "img/bg.png";

var copterImg = new Image();
copterImg.src = "img/copter.png"

var coin = new Image();
coin.src = "img/coin.png"

var bird = new Image();
bird.src = "img/bird.png";

var acceleration = false;

var running = true;

//Background movement
function update(){

	if(running){
		updateBackground();
		updateCopter();
		updateCoin();
		updateBirds();
		requestAnimationFrame(update);
	}
}

function drawFinal(){
	drawBackground();
	drawCopter();
	drawCoin();
	drawBirds() ;
	drawScore();
	requestAnimationFrame(drawFinal);
}
drawFinal();
update();

//Background update
var bgX = 0;
var bgY = 0;
function updateBackground(){
	bgX = bgX - 2;
	
	if(bgX <= -856){
		bgX = 0;
	}
}

//Background Draw
function drawBackground(){
	canvasContext.drawImage(bgImage, bgX, bgY);
	canvasContext.drawImage(bgImage, bgX + 856, bgY);
}

//copter
var copterX = 30;
var copterY = 200;
var copterWidth = 131;
var copterHeight = 34;
var frameIndex = 0;
var dy = 0;

function updateCopter(){
	
	frameIndex++;
	if(frameIndex > 2){
		frameIndex = 0;
	}
	
	if(acceleration){
		dy = dy - 0.5;
	}else{
		dy = dy + 0.5;
	}
	
	//limit the acceleration
	if(dy > 14){
		dy = 14;
	}
	if(dy < -14){
		dy = -14;
	}
	
	
	copterY = copterY + dy;
	
	if(copterY < 0){
		dy = 0;
		copterY = 0;
	}
	
	if(copterY + copterHeight > 480){
		running = false;
	}
	
}

function drawCopter(){
	canvasContext.drawImage(copterImg,copterWidth * frameIndex, 0, copterWidth, copterHeight, copterX, copterY, copterWidth, copterHeight);
}

//COINS
var coinWidth = 31;
var coinHeight = 46;

var coins = [];

var m = 0;

function addCoin() {
    var randomNumber = Math.floor(Math.random() * (450 - 10)) + 10; //random number is generated for y axis

    coins.push(860);												//push 860 for x co-ordinate should be greater than the background width
    coins.push(randomNumber);										//random number is used for y axis
    coins.push(0);													//push 0 to set initial frameIndex to 0
}

function drawCoin() {
    var i = 0;
    while (coins!= undefined && i < coins.length) {
        canvasContext.drawImage(coin, 0, coins[i + 2] * coinHeight, coinWidth, coinHeight, coins[i], coins[i + 1], coinWidth, coinHeight);
        i = i + 3;
    }
}

var d = new Date();
var d1 = d.getTime();

function updateCoin() {
    var f = new Date();
    diff = (f.getTime() - d1) / 1000; 						//calculate the diff between current time and initial time d1

    if (diff > 4) { 										// as soon as the diff in more than 4, add a new coin
        var temp = new Date();
        d1 = temp.getTime(); 									//reset the timer so that after every 4 seconds a new coin is added to the screen
        addCoin();
    }

    var i = 0;
    while (coins!= undefined && i < coins.length) { 		//loop to upoadte all the coins
        if (m % 3 == 0) {
            coins[i + 2] = coins[i + 2] + 1;				//frameIndex is incremented
            coins[i + 2] = coins[i + 2] % 8;				//frameIndex is limited to 8
            m = 0;
            
        }
        
        coins[i] = coins[i] - 2;							// coins are being moved back with speed of the background
        
     
        if(coins[i] <= -10){
            var tempCount = i;
            var temp1 = coins[i]; 
            var temp2 = coins[i+1];
            var temp3 = coins[i+2];
            
            while(tempCount < coins.length){
                coins[tempCount] = coins[tempCount+3];
                coins[tempCount+1] = coins[tempCount+4];
                coins[tempCount+2] = coins[tempCount+5];
                tempCount = tempCount + 3;
            }												//move the coin to the end of the array
            coins.pop();
            coins.pop();
            coins.pop();									// remove the coin from the array
        }
        
        if (copterX < coins[i] + coinWidth &&				//check if copters and coins rectangle intersect each other
            copterX + copterWidth > coins[i] &&
            copterY < coins[i+1] + coinHeight &&
            copterHeight + copterY > coins[i+1]) {
                var tempCount = i;
                var temp1 = coins[i]; 
                var temp2 = coins[i+1];
                var temp3 = coins[i+2];

                while(tempCount < coins.length){			//loop if the the coin & copter intersect den move the coin the end of the array
                    coins[tempCount] = coins[tempCount+3];
                    coins[tempCount+1] = coins[tempCount+4];
                    coins[tempCount+2] = coins[tempCount+5];
                    tempCount = tempCount + 3;
                }
            
                score++;
                
                coins.pop();								//remove the intersected coins which are at the end of the array
                coins.pop();
                coins.pop();
            }
        
        i = i + 3;											// increment the counter by 3
      
    }
    
    m++;
}

//BIRDS
var birdWidth = 101;
var birdHeight = 110;

var birds = [];

function addBirds() {
    var randomNumber = Math.floor(Math.random() * (450 - 10)) + 10;

    birds.push(860);
    birds.push(randomNumber);
    birds.push(0);
}

function drawBirds() {
    var i = 0;
    while (birds != undefined && i < birds.length) {
        canvasContext.drawImage(bird, 0, birds[i + 2] * birdHeight, birdWidth, birdHeight, birds[i], birds[i + 1], birdWidth, birdHeight);
        i = i + 3;
    }
}

var db = new Date();
var db1 = db.getTime();

var co = 0;

function updateBirds() {
    var f = new Date();
    
    //time difference in seconds
    diff = (f.getTime() - db1) / 1000;  

    if (diff > 8) { 					// as soon as the timer goes over 8 seconds a bird is added and timer is reset
        var temp = new Date();
        db1 = temp.getTime();
        addBirds();
    }

    var i = 0;
    while (birds != undefined && i < birds.length) {
        if (co % 7 == 0) {
            birds[i + 2] = birds[i + 2] + 1;
            birds[i + 2] = birds[i + 2] % 4;
            co = 0;
        }
        
        birds[i] = birds[i] - 4;
        
     
        if(birds[i] <= -10){				//remove the birds from the array
            var tempCount = i;
            var temp1 = birds[i]; 
            var temp2 = birds[i+1];
            var temp3 = birds[i+2];
            
            while(tempCount < birds.length){
                birds[tempCount] = birds[tempCount+3];
                birds[tempCount+1] = birds[tempCount+4];
                birds[tempCount+2] = birds[tempCount+5];
                tempCount = tempCount + 3;
            }
            
            birds.pop();
            birds.pop();
            birds.pop();
        }
        
       
        
        if (copterX < birds[i] + birdWidth &&
            copterX + copterWidth > birds[i] &&
            copterY < birds[i+1] + birdHeight &&
            copterHeight + copterY > birds[i+1]) {
                
                running = false;
                
            }
        
        i = i + 3;
      
    }
    
    co++;
}



//DRAW SCORE
function drawScore(){
    canvasContext.font="25px Georgia";
    canvasContext.textAlign="right"; 
    canvasContext.fillText("Score : " + score, 846, 25);
}

//USER INPUT
document.onkeydown = function(event){
	if(event.keyCode == 32){
		acceleration = true;
	}
}

document.onkeyup = function(event){
	if(event.keyCode == 32){
		acceleration = false;
	}
}




