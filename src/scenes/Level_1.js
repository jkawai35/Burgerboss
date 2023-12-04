class Level_1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    create() {
        console.log("LEVEL1")
        this.scene.launch('UI');
        this.scene.bringToTop('UI');
        this.background = this.add.tileSprite(0,0,1250,480, "background").setOrigin(0,0);

        //create cook
        this.cook = new Cook(this, 40, 80, 'cook', 0, 1);
        this.cook.body.setSize(20, 30);

        //create mustard1
        this.mustard1 = new Mustard(this, 400, game_width / 2, 'mustard', 0);
        this.mustard1.body.setSize(15, 30);
        enemies = this.add.group([this.mustard1]);

        //define keys
        this.keys = this.input.keyboard.createCursorKeys();
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        this.cameras.main.setBounds(0, 0, 1000, 240)
        this.cameras.main.startFollow(this.cook, true, 0.25, 0)
        this.physics.world.setBounds(0, 0, 1000, 240, true, true, true, true);

        //set builidng1 
        this.building1 = this.physics.add.sprite(40, game_height - 50, "brownBuilding");
        this.building1.body.setImmovable(true);

        //set building2
        this.building2 = this.physics.add.sprite(130, game_height - 60, "blueBuilding")
        this.building2.setScale(1.5);
        this.building2.body.setImmovable(true);

        //set building3
        this.building3 = this.physics.add.sprite(225, game_height - 50, "brownBuilding")
        this.building3.body.setImmovable(true);

        //set building4
        this.building4 = this.physics.add.sprite(360, game_height - 30, "greenBuilding")
        this.building4.body.setImmovable(true);

        //set building5
        this.building5 = this.physics.add.sprite(500, game_height - 50, "brownBuilding")
        this.building5.body.setImmovable(true);

        //set building6
        this.building6 = this.physics.add.sprite(650, game_height - 50, "blueBuilding")
        this.building6.setScale(1.5);
        this.building6.body.setImmovable(true);

        //set building6
        this.building7 = this.physics.add.sprite(800, game_height - 50, "blueBuilding")
        this.building7.setScale(1.5);
        this.building7.body.setImmovable(true);
        this.building7.setTint(0xffff00)

        //set building7
        this.building8 = this.physics.add.sprite(950, game_height - 60, "blueBuilding")
        this.building8.setScale(1.5);
        this.building8.body.setImmovable(true);

        buildings = this.add.group([this.building1, this.building2, this.building3,
        this.building4, this.building5, this.building6, this.building7, this.building8]);

        this.tomato1 = this.physics.add.sprite(400, game_height / 2, "tomato");
        this.physics.add.collider(this.cook, this.tomato1, (cook, tomato1) => {
            this.tomato1.destroy();
            score += 10;
        })

        this.tomato2 = this.physics.add.sprite(630, game_height / 3, "tomato");
        this.physics.add.collider(this.cook, this.tomato2, (cook, tomato2) => {
            this.tomato2.destroy();
            score += 10;
        })

        //add colliders
        this.physics.add.collider(this.cook, buildings, (cook, buildings) => {
            jumpBoolean = 1
        })
        this.physics.add.collider(this.mustard1, buildings);

        this.physics.add.collider(this.cook, enemies, (cook, enemies) => {
            this.scene.restart();
            lives -= 1;
        })

        this.ESCisDown = 0
        this.ESCText = 0
    }
    update() {
        this.cookFSM.step();

        if (this.cook.y > 210) {
            this.scene.restart();
            lives -= 1;
        } 
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.sendToBack("UI");
            this.scene.start("titleScene");
        }
        if (lives <= 0) {
            this.scene.sendToBack("UI");
            this.scene.start("gameOver");
        }
              
    }
}