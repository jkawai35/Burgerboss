class Level_1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    create() {
        this.background = this.add.image(0,0,640,480, "background").setOrigin(0,0);
    }
}