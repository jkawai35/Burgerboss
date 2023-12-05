class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.audio('sfx_music', './assets/main_music.wav');
        this.load.audio('LaserTinyShot', './assets/LaserTinyShot.wav');

        this.load.image("brownBuilding", "./assets/BrownBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuilding.png");
        this.load.image("greenBuilding", "./assets/GreenBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuildig.png");
        this.load.image("tomato", "./assets/tomato.png");
        this.load.spritesheet('mustard', './assets/mustard.png', {
            frameWidth: 30,
            frameHeight: 30,
        });
        this.load.spritesheet('cook', './assets/Burgerboss.png', {
            frameWidth: 30,
            frameHeight: 30,
        });
        this.load.image("background", "./assets/Background.png");
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys()
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cook', { start: 2, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
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
        this.anims.create({
            key: 'jump-left',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cook', { start: 3, end: 3 }),
        })
        this.anims.create({
            key: 'jump-right',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cook', { start: 1, end: 1 }),
        })
        this.anims.create({
            key: 'mwalk-right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mustard', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'mwalk-left',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mustard', { start: 2, end: 3 }),
        })

        // MUSIC
        this.soundtrack = this.sound.add('sfx_music', {loop: true, volume: 20});
        this.soundtrack.play('');

        let currentScene = this
        window.WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: function() {
                console.log('Web fonts loaded');
                currentScene.scene.start('titleScene')
            }
        });

    }
}