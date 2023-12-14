class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 10});

        //add text for Credits
        this.add.text(game_width / 3 + 20, game_height / 12, 'Credits', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px',
            color: 'white'
        })
        this.add.text(game_width / 6 + 20, game_height / 6, 'Assets: Jaren Kawai', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px',
            color: 'white'
        })
        this.add.text(game_width / 12, game_height / 4, 'Levels: Jaren Kawai & Jay Kumar', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px',
            color: 'white'
        })
        this.add.text(game_width / 4, game_height / 3, 'Sounds: mixkit.co', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px',
            color: 'white'
        })
        this.add.text(game_width / 36, game_height / 2.4, 'Background Music: Wizard101 Disco Khan Theme', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '7px',
            color: 'white'
        })

        this.add.text(game_width / 7, game_height - 30, 'Press ESC to return to menu', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px'
        })
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.blingSound.play();
            this.scene.start("titleScene");
        }
    }
}