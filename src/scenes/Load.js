class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.image("brownBuilding", "./assets/BrownBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuilding.png");
        this.load.image("greenBuilding", "./assets/GreenBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuildig.png");
        this.load.spritesheet('cook', 'Burgerboss.png', {
            frameWidth: 30,
            frameHeight: 30,
        });
        this.load.image("background", "./assets/Background.png");


    }

    create() {
        this.anims.create({
            key: 'walk-left',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cook', { start: 2, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cook', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'swing-right',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('cook', { start: 4, end: 4 }),
        })
        this.anims.create({
            key: 'swing-left',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('cook', { start: 5, end: 5 }),
        })

        this.scene.start('titleScene');
    }
}