// Enemies our player must avoid
var Enemy = function(x, y, stepSize) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.stepSize = stepSize;
};

/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 * "2*dt" is used instead of just increasing stepSize
 * to show that on future versions speed could increase
 * each level attained without changing step stepSize */
Enemy.prototype.update = function(dt) {
    if (this.x > 475) {
        this.x = -100;
    } else {
        this.x += this.stepSize * (2 * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.row = 0;
};

// Update player's x and y coordinates based on key pressed
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === "left" && this.x > 0) {
        this.x -= 100;
    } else if (keyPressed === "right" && this.x < 400) {
        this.x += 100;
    } else if (keyPressed === "up" && this.y > 0) {
        this.y -= 85;
    } else if (keyPressed === "down" && this.y < 400) {
        this.y += 85;
    }
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // Check for collisions between player and enemies
    for (const enemy of allEnemies) {
        if ((enemy.x >= this.x - 50) && (enemy.x <= this.x + 50)) {
            if ((enemy.y >= 0) && (enemy.y <= 83)) {
                if ((this.y >= 0) && (this.y <= 83)) {
                    (this.x = 200) * dt;
                    (this.y = 400) * dt;
                }
            } else if ((enemy.y >= 84) && (enemy.y <= 166)) {
                if ((this.y >= 84) && (this.y <= 166)) {
                    (this.x = 200) * dt;
                    (this.y = 400) * dt;
                }
            } else if ((enemy.y >= 167) && (enemy.y <= 249)) {
                if ((this.y >= 167) && (this.y <= 249)) {
                    (this.x = 200) * dt;
                    (this.y = 400) * dt;
                }
            }
        }
    };
    // See if player crossed and if so reset player position
    if (this.y < 50) {
        (this.y = 400) * dt;
        (this.x = 200) * dt;
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Instantiate player and enenemies and place enemies in an array called
 * allEnemies. Directions specified to create enemies nd place them in
 * the array as oppoesed to creating an array with the enemies in it. */
const player = new Player();
const enemy1 = new Enemy(150, 220, 200);
const enemy2 = new Enemy(300, 135, 150);
const enemy3 = new Enemy(0, 50, 100);
const allEnemies = [enemy1, enemy2, enemy3];

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
});
