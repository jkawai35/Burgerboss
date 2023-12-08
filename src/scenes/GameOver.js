class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    create() {
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //add texts for game over screen
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
        this.add.text((game_width / 8) - 20, game_height / 2.1, 'GAME OVER', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '32px'
        })
        this.add.text((game_width / 8) - 30, game_height / 1.5, 'Press S to restart / ESC to go to Menu', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px'
        })
    }
    update() {
        //check key inputs to navagte scenes
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            lives = 3
            score = 0
            this.scene.start("level1");
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            lives = 3
            score = 0
            this.scene.stop("UI");
            this.scene.start("titleScene");
        }
    }
}