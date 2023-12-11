class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 20});

        //add text for Credits
        this.add.text(game_width / 4, game_height / 9, 'Idk', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px',
            color: 'white'
        })

        this.add.text(game_width / 7, game_height / 2, 'Press ESC to return to menu', {
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