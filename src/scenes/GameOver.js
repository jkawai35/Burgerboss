class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    create() {
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //add texts for game over screen
        this.add.text((game_width / 8) - 20, game_height / 2.5, 'GAME OVER', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '32px'
        })
        this.add.text(game_width / 12, game_height / 1.5, '   Press S to restart' + '\n\n' + 'Press ESC to go to Menu', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '12px'
        })
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 20});

    }
    update() {
        //check key inputs to navagte scenes
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            this.blingSound.play();
            lives = 3
            score = 0
            this.scene.start("level" + (levelTracker + 1));
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.blingSound.play();
            lives = 3
            score = 0
            this.scene.stop("UI");
            this.scene.start("titleScene");
        }
    }
}