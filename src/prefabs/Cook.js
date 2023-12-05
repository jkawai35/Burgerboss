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
        // console.log("IDLE STATE")

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
        // console.log("IDLE STATE 2")
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, space} = scene.keys;

        // transition to swing if pressing space
        if(space.isDown) {
            this.stateMachine.transition('swing');
            return;
        }

        // hurt state
        /*if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return;
        }*/

        // move depending on key pressed
        if(left.isDown || right.isDown || up.isDown) {
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

        // hurt state
        /*if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt');
            return;
        }*/

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || (up.isDown && jumpBoolean == 1))) {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        // let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown && jumpBoolean == 1) {
            moveDirection.y = -1;
            jumpBoolean = 0
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
        // normalize movement vector, update cook position, and play proper animation
        // moveDirection.normalize();
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
    execute(scene, cook) {
        // console.log("JUMP STATE")
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, space} = scene.keys;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return;
        }

        /*if(up.isDown){
            moveDirection.y = -1;
            cook.direction = 'up';
        }*/

        scene.time.delayedCall(250, () => {
            this.stateMachine.transition('idle')
            jumpBoolean = 0
        }, null, scene);
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
        // moveDirection.normalize();
        cook.setVelocity(cook.cookVelocity * moveDirection.x, 175 * moveDirection.y);
        cook.anims.play(`jump-${cook.direction}`);
        // hurt state
        /*if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return;
        }*/
    }
}

class SwingState extends State {
    enter(scene, cook) {
        const { left, right, up, space} = scene.keys;
        swingBoolean = 1
        cook.anims.play(`swing-${cook.direction}`);
        cook.once('animationcomplete', () => {
            scene.time.delayedCall(250, () => {
                this.stateMachine.transition('move');
                swingBoolean = 0
            }, null, scene);
        })
    }
}

class HurtState extends State {
    enter(scene, cook) {
        cook.setVelocity(0);
        cook.anims.play(`walk-${cook.direction}`);
        cook.anims.stop();
        cook.setTint(0xFF0000);

        switch(cook.direction) {
            case 'up':
                cook.setVelocityY(cook.cookVelocity*2);
                break;
            case 'left':
                cook.setVelocityX(cook.cookVelocity*2);
                break;
            case 'right':
                cook.setVelocityX(-cook.cookVelocity*2);
                break;
        }

        // set recovery timer
        scene.time.delayedCall(cook.hurtTimer, () => {
            cook.clearTint();
            this.stateMachine.transition('idle');
        })
    }
}