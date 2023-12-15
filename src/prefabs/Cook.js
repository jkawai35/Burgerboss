class Cook extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //set variables for cook
        this.direction = 'right';
        this.cookVelocity = 150;
        this.hurtTimer = 250;
        this.setGravityY(750);
        this.setCollideWorldBounds(true);

        this.cookSword = scene.physics.add.sprite(40, 80, "");
        this.cookSword.body.setSize(20, 10);
        this.cookSword.setVisible(false);

        this.jump = scene.sound.add('sfx_jump', {loop: false, volume: 4});
        this.sword = scene.sound.add('sfx_sword', {loop: false, volume: 6});


        //create state machine
        scene.cookFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            swing: new SwingState(),
            hurt: new HurtState(),
        }, [scene, this])  
    }
}

class IdleState extends State {
    enter(scene, cook) {
        if (jumpBoolean == 0) {
            cook.anims.play(`jump-${cook.direction}`);
            cook.anims.stop();
        }
        else {
            cook.anims.play(`walk-${cook.direction}`, true);
            cook.anims.stop();
        }
    }

    execute(scene, cook) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, space} = scene.keys;

        // transition to swing if pressing space
        if(space.isDown && !this.isHurt) {
            this.stateMachine.transition('swing');
            return;
        }
        else {
            cook.cookSword.setPosition(40, 80)
        }
        if (hurtState == 1) {
            hurtState = 0
            this.stateMachine.transition('hurt')
        }

        // move depending on key pressed
        if((left.isDown || right.isDown || up.isDown)) {
            this.stateMachine.transition('move')
            return;
        }
        if (up.isDown && jumpBoolean == 1) {
            this.stateMachine.transition('jump')
            return;
        }

        cook.anims.play(`walk-${cook.direction}`, true);
        cook.anims.stop();
        cook.setVelocityX(0)
    }
}

class MoveState extends State {
    execute(scene, cook) {
        // console.log("MOVE STATE")
        moveDirection.y = 0

        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, space} = scene.keys

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return
        }
        else {
            cook.cookSword.setPosition(40, 80)
        }
        if (hurtState == 1) {
            hurtState = 0
            this.stateMachine.transition('hurt')
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || (up.isDown && jumpBoolean == 1))) {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        if(up.isDown && jumpBoolean == 1) {
            moveDirection.y = -1;
            this.stateMachine.transition('jump');
        }
        if(left.isDown) {
            moveDirection.x = -1;
            cook.direction = 'left';
        } else if(right.isDown) {
            moveDirection.x = 1;
            cook.direction = 'right';
        }
        else {
            moveDirection.x = 0
        }
        cook.setVelocityX(cook.cookVelocity * moveDirection.x);
        if (jumpBoolean == 0) {
            cook.anims.play(`jump-${cook.direction}`);
            cook.anims.stop();
        }
        else {
            cook.anims.play(`walk-${cook.direction}`, true);
        }
    }
}

class JumpState extends State {
    enter (scene, cook) {
        scene.jump.play('')
    }
    execute(scene, cook) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, space} = scene.keys;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return;
        }
        if (hurtState == 1) {
            hurtState = 0
            this.stateMachine.transition('hurt')
        }

        // Stay in jump state for a split second to keep upward velocity going, and then switch to idle to allow gravity to slowly pull the player back down
        scene.time.delayedCall(250, () => {
            this.stateMachine.transition('idle')
        }, null, scene);
        jumpBoolean = 0
        if(left.isDown) {
            moveDirection.x = -1;
            cook.direction = 'left';
        } else if(right.isDown) {
            moveDirection.x = 1;    
            cook.direction = 'right';
        }
        else {
            moveDirection.x = 0
        }
        cook.setVelocity(cook.cookVelocity * moveDirection.x, (175+jumpBoost) * moveDirection.y);
        cook.anims.play(`jump-${cook.direction}`);
    }
}

class SwingState extends State {
    enter(scene, cook) {
        scene.sword.play('')
        const { left, right, up, space} = scene.keys;
        swingBoolean = 1
        cook.anims.play(`swing-${cook.direction}`);
        cook.once('animationcomplete', () => {
            swingBoolean = 0
            cook.cookSword.setPosition(40, 80)
            this.stateMachine.transition('move');
        })
    }
    execute(scene, cook) {
        //check arrow key input and set move direction
        const { left, right, up, space} = scene.keys;
        if(left.isDown) {
            moveDirection.x = -1;
            cook.direction = 'left';
        } else if(right.isDown) {
            moveDirection.x = 1;    
            cook.direction = 'right';
        }
        else {
            moveDirection.x = 0
        }
        if(up.isDown && jumpBoolean == 1) {
            moveDirection.y = -1;
            swingBoolean = 0
            cook.cookSword.setPosition(40, 80)
            this.stateMachine.transition('jump');
        }
        if (cook.direction == 'left') {
            cook.cookSword.setPosition(scene.cook.x - 15, scene.cook.y - 3)
        }
        else if (cook.direction == 'right') {
            cook.cookSword.setPosition(scene.cook.x + 15, scene.cook.y - 3)
        }
        cook.setVelocityX(cook.cookVelocity * moveDirection.x);
    }
}

class HurtState extends State {
    enter(scene, cook) {
        //set tint and move character back for knockback effect
        cook.setTint(0xFF0000);
        switch(cook.direction) {
            case 'up':
                cook.y -= 50
                break;
            case 'left':
                cook.y -= 50
                cook.x += 75
                cook.anims.play(`idle-${cook.direction}`);
                break;
            case 'right':
                cook.y -= 50
                cook.x -= 75
                cook.anims.play(`idle-${cook.direction}`);
                break;
        }
        lives -= 1
        // set recovery timer
        scene.time.delayedCall(cook.hurtTimer, () => {
            cook.clearTint();
            hurtState = 0
            this.stateMachine.transition('idle');
        })
    }
}