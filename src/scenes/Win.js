class Win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    create() {
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
        this.add.text(game_width / 7, game_height / 2.1, 'YOU WIN', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '32px'
        })
        this.add.text(game_width / 5, game_height / 1.5, 'Press Enter to Continue', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px'
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
            this.scene.stop("UI");
            this.scene.start("titleScene");
        }
    }
}