class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    prelaod() {
        this.load.image("brownBuilding", "./assets/BrownBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuildig.png");

    }

    create() {

    }
}