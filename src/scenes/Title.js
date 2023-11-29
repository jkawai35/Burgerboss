class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {
        this.background = this.add.image(0,0,640,480, "background").setOrigin(0,0);
    }
}