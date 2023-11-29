class Level_3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    create() {
        this.background = this.add.image(0,0,640,480, "background").setOrigin(0,0);

    }
}