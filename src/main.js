// Burgerboss
// Bob's Burgers - Season 2, Episode 4
// Jaren Kawai, Jay Kumar
// Time to complete: Roughly 30 hours
// Sources used:
// - Running scenes in parallel: https://phaser.discourse.group/t/problem-with-two-parallel-scenes/7578
// - Select sound: mixkit.co

// Below are the major Phaser components used in this project:
// - Physics systems to check for collisions
// - Cameras to follow player movement and to indicate when the level border has been reached
// - Particle effects that occur upon completing a level
// - Text objects that appear in several scenes
// - Animation manager that is responsible for player running/jumping/attacking animation, along with enemy movement animation
// - Timers, specifically delayed time calls for instances such as the double jump delay, scene switching after reaching the victory tomato, jump state, etc.

// Polish and Style:
// - The original footage of this game doesn't show too much in terms of the platforming aspect, so we decided to go above and beyond when it came to platformer mechanics.
// - To vary each of the stages, we opted for features such as a double jump mechanic and a jump power-up mechanic to make each stage feel more unique.
// - To distinguish the above features, we also chose to introduce a color tint change to the cook to indicate that a significant change has been made.
//   - Examples of this include:
//      - Temporary red color tint to the cook upon taking damage (running into an enemy)
//      - Temporary blue color tint to the cook upon interacting with a double jump onion to indicate that there is a brief delay before you can jump again in the air
//          - It's also important to note that this blue color tint doesn't happen upon hitting double jump onions in the third level because this brief delay is absent in level 3, meaning that you can jump again immediately after touching the onion.
//      - A flashing blue-green color change to the cook that occurs upon interacting with the jump power-up in level 3. This is to ensure the player knows that something significant has occurred.

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
    scene: [ Load, Title, Instructions, Credits, UI, Level_1, Level_2, Level_3, GameOver, Win, HighScore ]
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

let jumpBoolean = 1
let jumpBoost = 0
let swingBoolean = 0
let collisionBoolean = 0

let totalMoved = 0
let hurtState = 0

let moveDirection = new Phaser.Math.Vector2(0, 0)
let mustardMD = new Phaser.Math.Vector2(0, 0)
let ketchupMD = new Phaser.Math.Vector2(0, 0)


let keyS;
let keyESC;
let keyENTER;
let keyC;
let keyR;
let keyI;

let levelTracker = 0

let score = 0;
let lives = 3;
let totalScore = 0;

let globalAliveVar = 0