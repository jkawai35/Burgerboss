class Mustard extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //set variables for Mustard
        this.mVelocity = 30;
        this.mDirection = 'right'
        this.changeDirection = false;
        this.startPos = this.x;
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

        // GOING RIGHT
        if (totalMoved <= 7500){
            mustard.mDirection = 'right';
            mustard.anims.play(`mwalk-${mustard.mDirection}`, true);
            mustardMD.x = 1;
            totalMoved += mustard.mVelocity;
            mustard.setVelocityX(mustard.mVelocity * mustardMD.x);
        }

        // GOING LEFT
        if (totalMoved > 7500){
            mustard.mDirection = 'left';
            mustard.anims.play(`mwalk-${mustard.mDirection}`, true);
            mustardMD.x = -1;
            totalMoved += mustard.mVelocity;
            mustard.setVelocityX(mustard.mVelocity * mustardMD.x);        
        }

        // RESET
        if (totalMoved > 15000) {
            totalMoved = 0
        }
    }
}
