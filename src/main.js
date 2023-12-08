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
    scene: [ Load, Title, Instructions, UI, Level_1, Level_2, Level_3, GameOver, Win, HighScore ]
}

let scoreConfig = {
    fontFamily: '"Press Start 2P", Courier',
    fontSize: '8px',
    backgroundColor: "#000000",
    color: '#FFFFFF',
    align: 'center',
    /*
    padding: {
        top: 5,
        bottom: 5,
    },
    */
    fixedWidth: 100
}

let livesConfig = {
    fontFamily: '"Press Start 2P", Courier',
    fontSize: '8px',
    backgroundColor: "#000000",
    color: '#FFFFFF',
    align: 'center',
    fixedWidth: 70
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
let swingBoolean = 0

let totalMoved = 0
let KillsWho = 0

let moveDirection = new Phaser.Math.Vector2(0, 0)
let mustardMD = new Phaser.Math.Vector2(0, 0)

let keyS;
let keyESC;
let keyENTER;
let keyC;

let score = 0;
let lives = 3;