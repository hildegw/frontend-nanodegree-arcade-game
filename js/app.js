// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    //setting enemy position
    this.x = x*101;
    this.y = y*83;
    this.speed = speed;
    this.startX = x;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x/101>-5 && this.x/101<5) this.x = this.x + 101*dt*this.speed;
    else this.x = this.startX;
    detectCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player can move in all directions
var Player = function(x,y){
    this.x = x*101;
    this.y = y*83;
    this.sprite = "images/char-boy.png";
    this.startX = x*101;
    this.startY = y*83;
}

// Reset player position when game is over
Player.prototype.update = function(){
    this.x = this.startX;
    this.y = this.startY;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// react to directional keys within game board
Player.prototype.handleInput = function(key){
    if(key == "up" && this.y/83>0) this.y = this.y - 83;
    else if(key == "down" && this.y/83<4 ) this.y = this.y + 83;
    else if(key == "left" && this.x/101>0 ) this.x = this.x - 101;
    else if(key == "right" && this.x/101<4 ) this.x = this.x + 101;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// make first enemy;
var allEnemies = [];
var firstEnemy = new Enemy(-100,0.7,2);
allEnemies.push(firstEnemy);
var secondEnemy = new Enemy(-200,2.7,2.5);
allEnemies.push(secondEnemy);
var thirdEnemy = new Enemy(-30,1.7,1);
allEnemies.push(thirdEnemy);

// make player
var player = new Player(2,4.9);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});

// Collision detection
var detectCollision = function(){
    allEnemies.forEach(function(enemy){
        //console.log(enemy.x, player.x);
        var distance = Math.sqrt(Math.pow(enemy.x-player.x, 2) + Math.pow(enemy.y-player.y, 2));
        if(distance < 50 && distance > -100) player.update();        
    });
};

