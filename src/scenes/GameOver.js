class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    create() {
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
        this.add.text(game_width / 2.45, game_height / 2.1, 'GAME OVER', {
            fontFamily: 'Press Start 2P, Papyrus',
            fontSize: '48px'
        })
        this.add.text(game_width / 4, game_height / 1.8, 'Press S to restart / ESC to go to Menu', {
            fontFamily: 'Press Start 2P, Papyrus',
            fontSize: '48px'
        })
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            lives = 3
            score = 0
            this.scene.start("level1");
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            lives = 3
            score = 0
            this.scene.start("titleScene");
        }
    }
}