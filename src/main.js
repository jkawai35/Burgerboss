// Burgerboss
// Bob's Burgers - Season 2, Episode 4
// Jaren Kawai, Jay Kumar
// Time to complete:
// Sources used: 

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [Load, Title, Level_1, Level_2, Level_3, GameOver]
}

// define game
const game = new Phaser.Game(config)

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let game_width = game.config.width;
let game_height = game.config.height;