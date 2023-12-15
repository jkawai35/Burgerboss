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
        this.jump = this.sound.add('sfx_jump', {loop: false, volume: 4});
        this.sword = this.sound.add('sfx_sword', {loop: false, volume: 6});
        this.alive = true;



        this.tomatoCount = 0;

        this.background = this.add.tileSprite(0,0,1850,480, "background").setOrigin(0,0).setTint(0xdc6826);

        //create cook
        this.cook = new Cook(this, 40, 140, 'cook', 0, 1);
        this.cook.body.setSize(20, 30);

        //create mustard1
        this.mustard1 = new Mustard(this, 300, game_width / 2 - 200, 'mustard', 0)
        this.mustard1.body.setSize(15, 30);

        //create ketchup1
        this.ketchup1 = new Ketchup(this, 1500, game_width / 4, 'ketchup', 0);
        this.ketchup1.body.setSize(15, 30);

        //define keys
        this.keys = this.input.keyboard.createCursorKeys();
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //set camera to follow player
        this.cameras.main.setBounds(0, 0, 1600, 240)
        this.cameras.main.startFollow(this.cook, true, 0.25, 0)
        this.physics.world.setBounds(0, 0, 1600, 240, true, true, true, true);

        //set builidng1 
        this.building1 = this.physics.add.sprite(40, game_height - 30, "brownBuilding").setTint(0xdc7b26);
        this.building1.body.setImmovable(true);

        //set building2
        this.building2 = this.physics.add.sprite(130, game_height - 20, "blueBuilding").setTint(0xdc2626)
        this.building2.setScale(1.5);
        this.building2.body.setImmovable(true);

        //set building3
        this.building3 = this.physics.add.sprite(300, game_height - 55, "blueBuilding").setTint(0xdc2626).setScale(2)
        this.building3.body.setImmovable(true);

        //set building4
        this.building4 = this.physics.add.sprite(500, game_height - 50, "brownBuilding").setTint(0xdc9f26)
        this.building4.body.setImmovable(true);

        //set building5
        this.building5 = this.physics.add.sprite(600, game_height - 50, "brownBuilding").setTint(0xdc7b26)
        this.building5.body.setImmovable(true);

        //add double jump, same process as from level 2
        this.doubleJump = this.physics.add.sprite(750, game_height / 2 - 30, "tomato").setTint(0x5422c9).setScale(1.3);
        this.doubleJump.body.setImmovable(true);
        this.physics.add.overlap(this.cook, this.doubleJump, (cook, doubleJump) => {
            this.doubleJump.setPosition(300, game_height / 2 - 100)
            this.doubleJump.setVisible(false)
            jumpBoolean = 1
            this.time.delayedCall(1500, () => {
                this.doubleJump.setVisible(true)
                this.doubleJump.setPosition(750, game_height / 2 - 30)
            }, null, this);
        })

        //add double jump 2, same process as above
        this.doubleJump2 = this.physics.add.sprite(875, game_height / 2 - 10, "tomato").setTint(0x5422c9).setScale(1.3);
        this.doubleJump2.body.setImmovable(true);
        this.physics.add.overlap(this.cook, this.doubleJump2, (cook, doubleJump2) => {
            this.doubleJump2.setPosition(300, game_height / 2 - 100)
            this.doubleJump2.setVisible(false)
            jumpBoolean = 1
            this.time.delayedCall(1500, () => {
                this.doubleJump2.setVisible(true)
                this.doubleJump2.setPosition(875, game_height / 2 + 10)
            }, null, this);
        })

        //set building6
        this.building6 = this.physics.add.sprite(1000, game_height - 50, "brownBuilding").setTint(0xdc7b26)
        this.building6.body.setImmovable(true);

        //set building7
        this.building7 = this.physics.add.sprite(1150, game_height - 50, "brownBuilding").setTint(0xdc7b26).setScale(1.3)
        this.building7.body.setImmovable(true);

        //set building8
        this.building8 = this.physics.add.sprite(1350, game_height - 75, "brownBuilding").setTint(0xdc7b26).setScale(1.5)
        this.building8.body.setImmovable(true);

        //set building9
        this.building9 = this.physics.add.sprite(1500, game_height - 35, "greenBuilding").setTint(0xdc2626)
        this.building9.body.setImmovable(true);


        //add buildings to collider group
        buildings = this.add.group([this.building1, this.building2, this.building3,
        this.building4, this.building5, this.building6, this.building7, this.building8, this.building9]);

        //add buildings to collider group
        enemies = this.add.group([this.mustard1, this.ketchup1]);


        //add first tomato
        this.tomato1 = this.physics.add.sprite(400, game_height / 2 - 85, "tomato");
        this.physics.add.overlap(this.cook, this.tomato1, (cook, tomato1) => {
            this.tomato1.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })

        //add second tomato
        this.tomato2 = this.physics.add.sprite(630, game_height / 3 - 50, "tomato");
        this.physics.add.overlap(this.cook, this.tomato2, (cook, tomato2) => {
            this.tomato2.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })
        //add third tomato
        this.tomato3 = this.physics.add.sprite(1150, game_height - 175, "tomato");
        this.physics.add.overlap(this.cook, this.tomato3, (cook, tomato3) => {
            this.tomato3.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })

        //add fourth tomato
        this.tomato4 = this.physics.add.sprite(1325, game_height - 165, "tomato");
        this.physics.add.overlap(this.cook, this.tomato4, (cook, tomato4) => {
            this.tomato4.destroy();
            this.tomatoCount += 1;
            score += 10;
            this.coin.play('');
        })

        // Barrier around the victory tomato to prevent "cheesing" the level, barrier disappears once the jump power-up is collected and should re-appear if you die and lose the jump power-up
        this.victoryBarrier = this.physics.add.sprite(35, game_height / 1.5 - 95).setTint(0x5422c9).setScale(3, 0.25);
        this.victoryBarrier.body.setImmovable(true);
        this.physics.add.collider(this.cook, this.victoryBarrier)

        // second barrier around victory tomaro, same rules as above
        this.victoryBarrier2 = this.physics.add.sprite(90, game_height / 1.5 - 125).setTint(0x5422c9).setScale(0.25, 2);
        this.victoryBarrier2.body.setImmovable(true);
        this.physics.add.collider(this.cook, this.victoryBarrier2)

        // add jump powerup, this allows the player to reach the victory tomato and beat the level
        this.jumpPowerup = this.physics.add.sprite(1540, game_height / 1.5 - 5, "tomato").setTint(0x5422c9).setScale(1.5);
        this.jumpPowerup.body.setImmovable(true);
        this.physics.add.overlap(this.cook, this.jumpPowerup, (cook, jumpPowerup) => {
            jumpBoost = 50
            this.jumpPowerup.setPosition(1900, game_height - 10);
            this.victoryBarrier.setPosition(100, -50)
            this.victoryBarrier2.setPosition(200, -50)
            this.blingSound.play('')
        })

        //add victory collider
        this.victory = this.physics.add.sprite(35, game_height / 1.5 - 125, "tomato").setTint(0x0fff00).setScale(1.5).setImmovable(true);
        this.physics.add.collider(this.cook, this.victory, (cook, victory) => {
            this.alive = false;
            levelTracker = 3
            totalScore += score
            jumpBoost = 0
            this.blingSound.play();

            let rParticles = this.add.particles("blood");
            let confetti = rParticles.createEmitter({
            alpha: {start: 1, end: 0},
            scale: {start: .75, end: 0},
            speed: {min: -150, max: 150},
            lifespan: 4000,
            blendMode: "ADD"
        });

        let cookBounds = cook.getBounds();
        confetti.setEmitZone({
            source: new Phaser.Geom.Rectangle(cookBounds.x, cookBounds.y, cookBounds.width, cookBounds.height),
            type: "edge",
            quantity: 500
        });

        confetti.explode(100);

        this.time.delayedCall(1000, () => {
            this.scene.stop("UI");
            this.scene.start("win");
        })
        
        })
        // add variable to keep track of color changes to victory collider (this distinguishes the victory collider and makes it easier for the player to recognise)
        this.victoryIterate = 0
        
        // Tutorial tip to indicate the endgoal
        this.doubleJumpTip = this.add.text(5, game_height / 2 - 70, " ENDGOAL", {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '7px'
        });

        // Tutorial tip to indicate the jump powerup
        this.doubleJumpTip = this.add.text(1470, game_height / 1.5 - 70, "    JUMP POWERUP\n\n\n     Use it to\n\nreach the ENDGOAL!", {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '7px'
        });


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
        if (this.alive){
            this.cookFSM.step();
        }
        if (this.ketchupStateTracker == 0) {
            this.ketchupFSM.step();
        }
        if (this.mustardStateTracker == 0) {
            this.mustardFSM.step();
        }

        //check if cook falls between buildings
        //reset position
        if (this.cook.y > 210) {
            this.cook.setPosition(40, 140)
            jumpBoost = 0
            this.cook.setTint(0xffffff);
            this.jumpPowerup.setPosition(1540, game_height / 1.5 - 5);
            this.victoryBarrier.setPosition(35, game_height / 1.5 - 95)
            this.victoryBarrier2.setPosition(90, game_height / 1.5 - 125)
            totalMoved = 0;
            this.mustard1.setPosition(300, game_width / 2 - 200)
            lives -= 1;
        } 
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.blingSound.play();
            jumpBoost = 0
            this.scene.stop("UI");
            this.scene.start("titleScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            score = 0
            lives = 3
            this.blingSound.play();
            jumpBoost = 0
            this.scene.stop("UI");
            totalMoved = 0
            this.scene.restart()
        }

        //check if player runs out of lives
        if (lives <= 0) {
            jumpBoost = 0
            this.scene.stop("UI");
            this.scene.start("gameOver");
        }
        
        // Color change for victory orb
        this.victoryIterate += 1
        if (this.victoryIterate == 100) {
            this.victory.setTint(0x004dff)
            this.victory.setScale(2)
            // Color change for cook if jump powerup is acquired
            if (jumpBoost == 50) {
                this.cook.setTint(0x004dff)
            }
        }
        else if (this.victoryIterate == 200) {
            this.victory.setTint(0x0fff00)
            this.victory.setScale(1.5)
            this.victoryIterate = 0
            // Color change for cook if jump powerup is acquired
            if (jumpBoost == 50) {
                this.cook.setTint(0x0fff00)
            }
        }

        // This code below prevents jumping from the sides of walls
        if (this.alive && this.cook.body.velocity.y == 0 && this.jumpCheck == 1 && this.jumpCheck2 == 1 && collisionBoolean == 1) {
            jumpBoolean = 1
        }
        if (this.alive && this.cook.body.velocity.y == 0 && this.jumpCheck == 1) {
            this.jumpCheck2 = 1
        }
        else {
            this.jumpCheck2 = 0
        }
        if (this.alive && this.cook.body.velocity.y == 0) {
            this.jumpCheck = 1
        }
        else {
            this.jumpCheck = 0
        }

              
    }
}