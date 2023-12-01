class Level_1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    create() {
        console.log("LEVEL1")
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
        this.cook = new Cook(this, 160, 160, 'cook', 0, 1)
        this.keys = this.input.keyboard.createCursorKeys()

    }
    update() {
        this.cookFSM.step();
    }
}