class Mustard extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //set variables for Mustard
        this.mVelocity = 10;
        this.mDirection = 'right'
        this.changeDirection = false;
        this.startPos = this.x;
        this.totalMoved = 0;
        this.setGravityY(750);
        this.setCollideWorldBounds(true);

        scene.mustardFSM = new StateMachine('move',{
            move: new mMoveState(),
        }, [scene, this])
    }
}
class mMoveState extends State {
    execute(scene, mustard) {
        // use destructuring to make a local copy of the keyboard object
        this.totalMoved = 0;
        mustard.mDirection = 'right';
        mustard.anims.play(`mwalk-${mustard.mDirection}`, true);
        while (this.totalMoved <= 100){
            mustardMD.x = 1;
            this.totalMoved += mustard.mVelocity;
            mustard.setVelocityX(mustard.mVelocity * mustardMD.x);
        }
        mustard.anims.stop();
        this.totalMoved = 0;
        mustardMD.x = -1;
        mustard.mDirection = 'left';
        mustard.anims.play(`mwalk-${mustard.mDirection}`, true);
        while (this.totalMoved >= -100){
            this.totalMoved -= mustard.mVelocity;
        }
        mustard.anims.stop();
        this.totalMoved = 0;

        /*
        while (!this.changeDirection){
            mustardMD.x = 1;
            this.totalMoved += mustard.mVelocity;
            mustard.anims.play(`mwalk-${mustard.mDirection}`, true);
            mustard.setVelocityX(mustard.mVelocity * mustardMD.x);
        }
        */
        /*
        while (!this.changeDirection){
            mustardMD.x = -1;
            this.totalMoved -= mVelocity;
            mustard.anims.play(`mwalk-${mustard.mDirection}`, true);
            if (this.totalMoved <= -100){
                this.totalMoved = 0;
                mustardMD.x = -1;
                mDirection = 'right'
                this.changeDirection = false
                break;
            }
            mustard.setVelocityX(mustard.mVelocity * mustardMD.x);
        }
        */


    }
}
