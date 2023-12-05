class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' })
    }

    create() {
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys = this.input.keyboard.createCursorKeys();

        this.add.text(game_width / 10, game_height / 4, 'BURGER BOSS', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '24px'
        })
        this.add.text(game_width / 9, game_height / 2, 'Press S to start', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '16px'
        })
        this.add.text(game_width / 24, game_height / 1.5, 'Collect all tomatoes to win', {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '11px'
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            lives = 3
            score = 0
            this.scene.start("level1");
        }
    }
}