class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys = this.input.keyboard.createCursorKeys()

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("level1");
        }
    }
}