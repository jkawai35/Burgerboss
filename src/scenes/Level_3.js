class Level_3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    create() {
        //launch UI scene and add to top
        this.scene.launch('UI');
        this.scene.bringToTop('UI');
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 10});
        this.coin = this.sound.add('sfx_coin', {loop: false, volume: 10});


        this.tomatoCount = 0;

        this.background = this.add.tileSprite(0,0,1750,480, "background").setOrigin(0,0).setTint(0xff3737);

        //create cook
        this.cook = new Cook(this, 40, 80, 'cook', 0, 1);
        this.cook.body.setSize(20, 30);

        //create mustard1
        this.mustard1 = new Mustard(this, 350, game_width / 2, 'mustard', 0);
        this.mustard1.body.setSize(15, 30);

        //create ketchup1
        this.ketchup1 = new Ketchup(this, 1175, game_width / 4, 'ketchup', 0);
        this.ketchup1.body.setSize(15, 30);

        //define keys
        this.keys = this.input.keyboard.createCursorKeys();
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //set camera to follow player
        this.cameras.main.setBounds(0, 0, 1500, 240)
        this.cameras.main.startFollow(this.cook, true, 0.25, 0)
        this.physics.world.setBounds(0, 0, 1500, 240, true, true, true, true);

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

        

        //add buildings to collider group
        buildings = this.add.group([this.building1, this.building2, this.building3,
        this.building4, this.building5]);

        //add buildings to collider group
        enemies = this.add.group([this.mustard1, this.ketchup1]);


        //add first tomato
        this.tomato1 = this.physics.add.sprite(400, game_height / 2, "tomato");
        this.physics.add.collider(this.cook, this.tomato1, (cook, tomato1) => {
            this.tomato1.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })

        //add second tomato
        this.tomato2 = this.physics.add.sprite(630, game_height / 3, "tomato");
        this.physics.add.collider(this.cook, this.tomato2, (cook, tomato2) => {
            this.tomato2.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })
        //add third tomato
        this.tomato3 = this.physics.add.sprite(1175, game_height - 80, "tomato");
        this.physics.add.collider(this.cook, this.tomato3, (cook, tomato3) => {
            this.tomato3.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })

        //add fourth tomato
        this.tomato4 = this.physics.add.sprite(1325, game_height / 3, "tomato");
        this.physics.add.collider(this.cook, this.tomato4, (cook, tomato4) => {
            this.tomato4.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })

        //add victory collider
        this.victory = this.physics.add.sprite(630, game_height / 1.5, "tomato").setTint(0x0fff00).setScale(1.5);
        this.physics.add.collider(this.cook, this.victory, (cook, victory) => {
            levelTracker = 3
            totalScore += score
            this.scene.stop("UI");
            this.scene.start("win");
        })
        // add variable to keep track of color changes to victory collider (this distinguishes the victory collider and makes it easier for the player to recognise)
        this.victoryIterate = 0


        //add colliders
        this.physics.add.collider(this.cook, buildings, (cook, buildings) => {
            collisionBoolean = 1
        })
        this.physics.add.collider(this.mustard1, buildings);
        this.physics.add.collider(this.ketchup1, buildings);

        this.mustardStateTracker = 0
        this.ketchupStateTracker = 0
        this.physics.add.collider(this.cook, enemies, (cook, enemies) => {
            hurtState = 1
        })
        this.physics.add.overlap(this.cook.cookSword, this.ketchup1, (cook, ketchup1) => {
            this.ketchupStateTracker = 1
            this.ketchup1.destroy()
            score += 10;
        })
        this.physics.add.overlap(this.cook.cookSword, this.mustard1, (cook, mustard1) => {
            this.mustardStateTracker = 1
            this.mustard1.destroy()
            score += 10;
        })

        // variables for jump checking
        this.jumpCheck = 0
        this.jumpCheck2 = 0
    }
    update() {
        // state machines
        this.cookFSM.step();
        if (this.ketchupStateTracker == 0) {
            this.ketchupFSM.step();
        }
        if (this.mustardStateTracker == 0) {
            this.mustardFSM.step();
        }

        //check if cook falls between buildings
        //reset position
        if (this.cook.y > 210) {
            this.cook.setPosition(40, 80)
            totalMoved = 0;
            lives -= 1;
        } 
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.blingSound.play();
            this.scene.stop("UI");
            this.scene.start("titleScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            score = 0
            lives = 3
            this.blingSound.play();
            this.scene.stop("UI");
            this.scene.restart()
        }

        //check if player runs out of lives
        if (lives <= 0) {
            this.scene.stop("UI");
            this.scene.start("gameOver");
        }
        
        // Color change for victory orb
        this.victoryIterate += 1
        if (this.victoryIterate == 100) {
            this.victory.setTint(0x004dff)
        }
        else if (this.victoryIterate == 200) {
            this.victory.setTint(0x0fff00)
            this.victoryIterate = 0
        }

        // This code below prevents jumping from the sides of walls
        if (this.cook.body.velocity.y == 0 && this.jumpCheck == 1 && this.jumpCheck2 == 1 && collisionBoolean == 1) {
            jumpBoolean = 1
        }
        if (this.cook.body.velocity.y == 0 && this.jumpCheck == 1) {
            this.jumpCheck2 = 1
        }
        else {
            this.jumpCheck2 = 0
        }
        if (this.cook.body.velocity.y == 0) {
            this.jumpCheck = 1
        }
        else {
            this.jumpCheck = 0
        }

              
    }
}