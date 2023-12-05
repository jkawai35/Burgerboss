class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' })
    }

    create() {
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.keys = this.input.keyboard.createCursorKeys();

        this.add.text(game_width / 5.5, game_height / 3.5, 'BURGERBOSS', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '20px'
        })
        this.add.text(game_width / 4, game_height / 9.5, 'HIGH SCORE 99,550', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'red'
        })
        this.add.text(game_width / 3, game_height / 6, 'INSERT COIN', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'red'
        })
        this.add.text(game_width / 3.8, game_height - 47, 'PRESS S TO START', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'white'
        })
        this.add.text(game_width / 7, game_height - 30, 'PRESS C FOR INSTRUCTIONS', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'white'
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            lives = 3
            score = 0
            this.scene.start("level1");
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("Instructions");
        }
    }
}