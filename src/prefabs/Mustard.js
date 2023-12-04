class Mustard extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //set variables for Mustard
        this.mVelocity = 2;
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
    execute(mustard) {
        // use destructuring to make a local copy of the keyboard object

        //mustard.anims.play(`mwalk-right`, true);
        mustardMD.x = 1;
        //mustard.setVelocityX(mustard.mVelocity * mustardMD.x);

    }
}
