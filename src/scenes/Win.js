class Win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 20});

        // this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);

        //add text for screen
        this.add.text(game_width / 7, game_height / 5, 'YOU WIN', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '32px'
        })
        this.add.text(game_width / 12, game_height / 2.15, ' Level Score: ' + score + "\n\n" + 'Overall Score: ' + totalScore, {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '16px'
        })
        this.add.text(game_width / 24, game_height / 1.2, 'Press Enter to Continue to Next Level', {
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
            if (levelTracker == 1) {
                this.scene.start("level2")
            }
            else if (levelTracker == 2) {
                this.scene.start("level3")
            }
            else if (levelTracker == 3) {
                levelTracker = 0
                this.scene.start("HighScore");
            }
        }
    }
}