// GLOBAL METHODS
var GlobalGameMethods = function() {}

GlobalGameMethods.prototype.setXlocation = function(x) {
    return (x * 101) - 101;
}

GlobalGameMethods.prototype.setYlocation = function(y) {
    return -110 + (83 * y)
}

//////////////////////

// GLOBAL GameSettings

var GameSettings = function (props) {
    this.fieldWidth = props.fieldWidth * 101;
    this.fieldHight = props.fieldHight * 101;
}

var gameProps = new GameSettings({
    fieldWidth: 7,
    fieldHight: 7
});

///////////////////////////

//  ENEMY CLASS
var Enemy = function(x, y, s) {
    this.x = this.setXlocation(x);
    this.y = this.setYlocation(y);
    this.speed = s;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(GlobalGameMethods.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed)
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//////////////////////////

// PLAYER CLASS
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = this.setXlocation(4);
    this.y = this.setYlocation(7);
}

Player.prototype = Object.create(GlobalGameMethods.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt, move) {
    if (move === 'up') {
        this.y -= 83
        console.log(this.y)
        console.log(this.x)
    }
    if (move === 'right') {
        this.x += 101
        console.log(this.y)
        console.log(this.x)
    }
    if (move === 'left') {
        this.x -= 101
        console.log(this.y)
        console.log(this.x)
    }
    if (move === 'down') {
        this.y += 83
        console.log(this.y)
        console.log(this.x)
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.update(0, key)
};

////////////////////////////


var enemy1 = new Enemy(3, 2, 30);
var enemy2 = new Enemy(1, 3, 50);
var enemy3 = new Enemy(1, 4, 40);
var enemy4 = new Enemy(1, 5, 60);

var allEnemies = [enemy1, enemy2, enemy3, enemy4]; // [enemy1]

var player = new Player();


document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
