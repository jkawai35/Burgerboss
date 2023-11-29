class Level_2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    create() {
        this.background = this.add.image(0,0,640,480, "background").setOrigin(0,0);
    }
}