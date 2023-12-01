class Level_1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    create() {
        this.background = this.add.tileSprite(0,0,640,480, "background").setOrigin(0,0);
    }
}