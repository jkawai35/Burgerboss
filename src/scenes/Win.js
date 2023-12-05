class Win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 20});

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
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){
            lives = 3
            score = 0
            this.blingSound.play();
            this.scene.stop("UI");
            this.scene.start("HighScore");
        }
    }
}