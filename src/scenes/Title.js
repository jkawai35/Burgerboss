class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' })
    }

    create() {
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        this.keys = this.input.keyboard.createCursorKeys();

        //add character for title screen
        this.characterPic = this.add.image(game_width / 2.7, game_height / 2.7, "titleCharacter").setOrigin(0,0).setScale(3);

        //add sound for button selection
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 10});

        //add title screen text
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
        this.add.text(game_width / 3.8, game_height - 50, 'PRESS S TO START', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'white'
        })
        this.add.text(game_width / 7, game_height - 33, 'PRESS I FOR INSTRUCTIONS', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'white'
        })
        this.add.text(game_width / 4.6, game_height - 16, 'PRESS C FOR CREDITS', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '9px',
            color: 'white'
        })
    }

    update() {

        //check if player selects start or instructions
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            lives = 3
            score = 0
            totalScore = 0
            this.blingSound.play();
            this.scene.start("level1");
        }
        if (Phaser.Input.Keyboard.JustDown(keyI)){
            this.blingSound.play();
            this.scene.start("Instructions");
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)){
            this.blingSound.play();
            this.scene.start("Credits");
        }
    }
}