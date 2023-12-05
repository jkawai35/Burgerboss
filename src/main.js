// Burgerboss
// Bob's Burgers - Season 2, Episode 4
// Jaren Kawai, Jay Kumar
// Time to complete:
// Sources used:
// Running scenes in parallel: https://phaser.discourse.group/t/problem-with-two-parallel-scenes/7578

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Title, UI, Level_1, Level_2, Level_3, GameOver ]
}

let scoreConfig = {
    fontFamily: 'Press Start 2P, Courier',
    fontSize: '20px',
    backgroundColor: '#F3B141',
    color: '#000000',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 50
}

// define game
const game = new Phaser.Game(config)

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let game_width = game.config.width;
let game_height = game.config.height;

let buildings;
let enemies;
let jumpBoolean = 1;

let totalMoved = 0

let moveDirection = new Phaser.Math.Vector2(0, 0)
let mustardMD = new Phaser.Math.Vector2(0, 0)

let keyS;
let keyESC;

let score = 0;
let lives = 3;