var GlobalGameMethods = function() {}

GlobalGameMethods.prototype.setXlocation = function(x) {
    return x * 101 - 101;
}

GlobalGameMethods.prototype.setYlocation = function(y) {
    return this.fieldHight - 150 - (83 * y)
}


var GameSettings = function (props) {
    this.fieldWidth = props.fieldWidth * 101;
    this.fieldHight = props.fieldHight * 101;
}

GameSettings.prototype = Object.create(GlobalGameMethods.prototype);
GameSettings.prototype.constructor = GameSettings;

var gameProps = new GameSettings({
    fieldWidth: 7,
    fieldHight: 7
});

gameProps.playerXLocation = gameProps.setXlocation(4);
gameProps.playerYLocation = gameProps.setYlocation(1);

var Enemy = function(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed)

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = gameProps.playerXLocation;
    this.y = gameProps.playerYLocation;
}

Player.prototype = Object.create(GlobalGameMethods.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt, move) {
    if (move === 'up') {
        this.y -= 90
    }
    if (move === 'right') {
        this.x += 90
    }
    if (move === 'left') {
        this.x -= 90
    }
    if (move === 'down') {
        this.y += 80
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    console.log(key)
    this.update(0, key)
};


var enemy1 = new Enemy(0, 300, 32);
var enemy2 = new Enemy(55, 30, 200);
var enemy3 = new Enemy(55, 120, 200);
var enemy4 = new Enemy(155, 120, 200);
var enemy5 = new Enemy(555, 20, 200);
var allEnemies = [enemy1];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
