class Level_2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    create() {
        //launch UI scene and add to top
        this.scene.launch('UI');
        this.scene.bringToTop('UI');
        this.blingSound = this.sound.add('sfx_select', {loop: false, volume: 20});

        this.tomatoCount = 0;

        this.background = this.add.tileSprite(0,0,2000,480, "background").setOrigin(0,0).setTint(0x22e595);

        //create cook
        this.cook = new Cook(this, 100, 80, 'cook', 0, 1);
        this.cook.body.setSize(20, 30);

        //create mustard1
        this.mustard1 = new Mustard(this, 350, game_width / 2, 'mustard', 0);
        this.mustard1.body.setSize(15, 30);

        //create ketchup1
        this.ketchup1 = new Ketchup(this, 1050, game_width / 4, 'ketchup', 0);
        this.ketchup1.body.setSize(15, 30);

        //define keys
        this.keys = this.input.keyboard.createCursorKeys();
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //set camera to follow player
        this.cameras.main.setBounds(0, 0, 1750, 240)
        this.cameras.main.startFollow(this.cook, true, 0.25, 0)
        this.physics.world.setBounds(0, 0, 1750, 240, true, true, true, true);

        //set builidng1 
        this.building1 = this.physics.add.sprite(0, game_height - 120, "blueBuilding").setTint(0x0ffdff);
        this.building1.body.setImmovable(true);
        this.building1.setScale(3)

        //set building2
        this.building2 = this.physics.add.sprite(180, game_height - 30, "greenBuilding").setTint(0x0ffdff)
        this.building2.body.setImmovable(true);

        //set building3
        this.building3 = this.physics.add.sprite(585, game_height - 50, "brownBuilding")
        this.building3.body.setImmovable(true);

        //set building4
        this.building4 = this.physics.add.sprite(360, game_height - 30, "greenBuilding").setTint(0x0ffdff)
        this.building4.body.setImmovable(true);

        //set building5
        this.building5 = this.physics.add.sprite(500, game_height - 50, "brownBuilding")
        this.building5.body.setImmovable(true);

        //set building6
        this.building6 = this.physics.add.sprite(875, game_height - 60, "blueBuilding")
        this.building6.setScale(1.8);
        this.building6.body.setImmovable(true);

        //set building7
        this.building7 = this.physics.add.sprite(1050, game_height - 60, "brownBuilding")
        this.building7.setScale(1.2);
        this.building7.body.setImmovable(true);

        //set building8
        this.building8 = this.physics.add.sprite(1200, game_height - 20, "greenBuilding")
        this.building8.setScale(1);
        this.building8.body.setImmovable(true);

        //set building9
        this.building9 = this.physics.add.sprite(1375, game_height - 60, "brownBuilding")
        this.building9.setScale(1.5);
        this.building9.body.setImmovable(true);

        //set building10
        this.building10 = this.physics.add.sprite(1600, game_height - 20, "greenBuilding")
        this.building10.setScale(1.2);
        this.building10.body.setImmovable(true);

        //add buildings to collider group
        buildings = this.add.group([this.building1, this.building2, this.building3,
        this.building4, this.building5, this.building6, this.building7, this.building8, this.building9, this.building10]);

        //add buildings to collider group
        enemies = this.add.group([this.mustard1, this.ketchup1]);

        this.doubleJumpTip = this.add.text(100, game_height / 2 - 60, "This purple orb allows you " + "\n \n" + "to jump again in mid-air", {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '7px'
        });
    
        //add double jump
        this.doubleJump = this.physics.add.sprite(160, game_height / 2 - 20, "tomato").setTint(0x4705ad).setScale(1.3);
        this.doubleJump.body.setImmovable(true);
        this.physics.add.collider(this.cook, this.doubleJump, (cook, doubleJump) => {
            this.doubleJump.setVisible(false)
            this.doubleJump.setPosition(300, game_height / 2 - 100)
            this.time.delayedCall(350, () => {
                jumpBoolean = 1
            }, null, this);
            this.time.delayedCall(1500, () => {
                this.doubleJump.setVisible(true)
                this.doubleJump.setPosition(160, game_height / 2 - 20)
            }, null, this);
        })

        //add double jump 2
        this.doubleJump2 = this.physics.add.sprite(660, game_height / 2 - 30, "tomato").setTint(0x4705ad).setScale(1.3);
        this.doubleJump2.body.setImmovable(true);
        this.physics.add.collider(this.cook, this.doubleJump2, (cook, doubleJump2) => {
            this.doubleJump2.setVisible(false)
            this.doubleJump2.setPosition(300, game_height / 2 - 100)
            this.time.delayedCall(400, () => {
                jumpBoolean = 1
            }, null, this);
            this.time.delayedCall(1500, () => {
                this.doubleJump2.setVisible(true)
                this.doubleJump2.setPosition(660, game_height / 2 - 30)
            }, null, this);
        })

        //add double jump 3
        this.doubleJump3 = this.physics.add.sprite(1300, game_height / 2 + 10, "tomato").setTint(0x4705ad).setScale(1.3);
        this.doubleJump3.body.setImmovable(true);
        this.physics.add.collider(this.cook, this.doubleJump3, (cook, doubleJump3) => {
            this.doubleJump3.setVisible(false)
            this.doubleJump3.setPosition(300, game_height / 2 - 100)
            this.time.delayedCall(400, () => {
                jumpBoolean = 1
            }, null, this);
            this.time.delayedCall(1500, () => {
                this.doubleJump3.setVisible(true)
                this.doubleJump3.setPosition(1300, game_height / 2 + 10)
            }, null, this);
        })

        //add first tomato
        this.tomato1 = this.physics.add.sprite(140, game_height / 2 - 80, "tomato");
        this.physics.add.collider(this.cook, this.tomato1, (cook, tomato1) => {
            this.tomato1.destroy();
            this.tomatoCount += 1;
            score += 10;
        })

        //add second tomato
        this.tomato2 = this.physics.add.sprite(750, game_height / 2, "tomato");
        this.physics.add.collider(this.cook, this.tomato2, (cook, tomato2) => {
            this.tomato2.destroy();
            this.tomatoCount += 1;
            score += 10;
        })
        //add third tomato
        this.tomato3 = this.physics.add.sprite(1175, game_height - 200, "tomato");
        this.physics.add.collider(this.cook, this.tomato3, (cook, tomato3) => {
            this.tomato3.destroy();
            this.tomatoCount += 1;
            score += 10;
        })

        //add fourth tomato
        this.tomato4 = this.physics.add.sprite(1465, game_height - 20, "tomato");
        this.physics.add.collider(this.cook, this.tomato4, (cook, tomato4) => {
            this.tomato4.destroy();
            this.tomatoCount += 1;
            score += 10;
        })

        //add victory collider
        this.victory = this.physics.add.sprite(1700, game_height / 1.5, "tomato").setTint(0x0fff00).setScale(1.5);
        this.physics.add.collider(this.cook, this.victory, (cook, victory) => {
            levelTracker = 2
            totalScore += score
            this.scene.stop("UI");
            this.scene.start("win");
        })


        //add colliders
        this.physics.add.collider(this.cook, buildings, (cook, buildings) => {
            collisionBoolean = 1
        })
        this.physics.add.collider(this.mustard1, buildings);
        this.physics.add.collider(this.ketchup1, buildings);

        this.physics.add.collider(this.cook, enemies, (cook, enemies) => {
            KillsWho = 1
        })

        this.ESCisDown = 0
        this.ESCText = 0

        this.victoryIterate = 0

        this.jumpCheck = 0
        this.jumpCheck2 = 0
    }
    update() {
        this.cookFSM.step();
        this.mustardFSM.step();
        this.ketchupFSM.step();

        //check attack on enemy
        if (KillsWho == 1) {
            if (swingBoolean == 1) {
                this.mustard1.setVisible(false)
                this.mustard1.setPosition(150,400)
                score += 10;
                swingBoolean == 0
            }
        }
        KillsWho = 0

        //check if cook falls between buildings
        //reset position
        if (this.cook.y > 210) {
            this.cook.setPosition(100, 80)
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
            this.scene.sendToBack("UI");
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