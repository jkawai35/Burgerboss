class Cook extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //set variables for cook
        this.direction = direction;
        this.cookVelocity = 100;
        this.hurtTimer = 250;

        //create state machine
        scene.cookFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            hurt: new HurtState(),
        }, [scene, this])  

    }
}

class IdleState extends State {
    enter(scene, cook) {
        cook.setVelocity(0);
        cook.anims.play(`walk-${cook.direction}`);
        cook.anims.stop();
    }

    execute(scene, cook) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, space} = scene.keys;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return;
        }

        // hurt state
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return;
        }

        // move depending on key pressed
        if(left.isDown || right.isDown || up.isDown) {
            this.stateMachine.transition('move')
            return;
        }
    }
}

class MoveState extends State {
    execute(scene, hero) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space} = scene.keys

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return
        }

        // hurt state
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt');
            return;
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || up.isDown)) {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            moveDirection.y = -1;
            cook.direction = 'up';
        } else if(down.isDown) {
            moveDirection.y = 1;
            cook.direction = 'down';
        }
        if(left.isDown) {
            moveDirection.x = -1;
            cook.direction = 'left';
        } else if(right.isDown) {
            moveDirection.x = 1;
            cook.direction = 'right';
        }
        // normalize movement vector, update hero position, and play proper animation
        moveDirection.normalize();
        hero.setVelocity(cook.cookVelocity * moveDirection.x, cook.cookVelocity * moveDirection.y);
        hero.anims.play(`walk-${cook.direction}`, true);
    }
}

class SwingState extends State {
    enter(scene, cook) {
        cook.setVelocity(0);
        cook.anims.play(`swing-${hero.direction}`);
        cook.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        })
    }
}

class HurtState extends State {
    enter(scene, cook) {
        cook.setVelocity(0);
        cook.anims.play(`walk-${hero.direction}`);
        cook.anims.stop();
        cook.setTint(0xFF0000);

        switch(hero.direction) {
            case 'up':
                cook.setVelocityY(hero.heroVelocity*2);
                break;
            case 'down':
                cook.setVelocityY(-hero.heroVelocity*2);
                break;
            case 'left':
                cook.setVelocityX(hero.heroVelocity*2);
                break;
            case 'right':
                cook.setVelocityX(-hero.heroVelocity*2);
                break;
        }

        // set recovery timer
        scene.time.delayedCall(cook.hurtTimer, () => {
            cook.clearTint();
            this.stateMachine.transition('idle');
        })
    }
}