class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        //load audio files
        this.load.audio('sfx_music', './assets/main_music.wav');
        this.load.audio("sfx_select", "./assets/mixkit-arcade-mechanical-bling-210.wav");

        //load assets
        this.load.image("titleCharacter", "./assets/TitleCharacter.png");
        this.load.image("brownBuilding", "./assets/BrownBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuilding.png");
        this.load.image("greenBuilding", "./assets/GreenBuilding.png");
        this.load.image("blueBuilding", "./assets/BlueBuildig.png");
        this.load.image("tomato", "./assets/tomato.png");

        //load spritesheets for characters
        this.load.spritesheet('mustard', './assets/mustard.png', {
            frameWidth: 30,
            frameHeight: 30,
        });
        this.load.spritesheet('ketchup', './assets/ketchup.png', {
            frameWidth: 30,
            frameHeight: 30,
        });
        this.load.spritesheet('cook', './assets/Burgerboss.png', {
            frameWidth: 30,
            frameHeight: 30,
        });

        //load background image
        this.load.image("background", "./assets/Background.png");
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys()

        //create animations for all characters
        this.anims.create({
            key: 'idle-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('cook', { start: 0, end: 0 }),
        })
        this.anims.create({
            key: 'idle-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('cook', { start: 2, end: 2 }),
        })
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

        //mustard anims
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

        //ketchup anims
        this.anims.create({
            key: 'kwalk-right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('ketchup', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'kwalk-left',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('ketchup', { start: 2, end: 3 }),
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