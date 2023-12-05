class HighScore extends Phaser.Scene {
    constructor() {
        super("HighScore");
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 20});

        this.add.text(game_width / 5.5, game_height / 12, 'HIGH SCORE', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '20px',
            color: 'red'
        })
        this.add.text(game_width / 12, game_height / 4, 'RANK  SCORE  NAME', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '16px',
            color: 'white'
        })
        this.add.text(game_width / 8, game_height / 3, '1st      317,000    BOBSUX', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '10px',
            color: 'yellow'
        })
        this.add.text(game_width / 8, game_height / 2.5, '2st      99,550     JMC', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '10px',
            color: 'red'
        })
        this.add.text(game_width / 8, game_height / 2.1, '3rd      95,200     FJF', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '10px',
            color: 'red'
        })
        this.add.text(game_width / 8, game_height / 1.8, '4th      90,520     BOB1', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '10px',
            color: 'red'
        })
        this.add.text(game_width / 11, game_height - 50, 'This is a fake high score screen', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px'
        })
        this.add.text(game_width / 5, game_height - 30, 'Press Enter to Continue', {
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
            this.scene.start("titleScene");
        }
    }
}