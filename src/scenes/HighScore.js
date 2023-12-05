class HighScore extends Phaser.Scene {
    constructor() {
        super("HighScore");
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(game_width / 7, game_height / 2.1, 'HIGH SCORE', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '20px',
            color: 'yellow'
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
            this.scene.stop("UI");
            this.scene.start("titleScene");
        }
    }
}