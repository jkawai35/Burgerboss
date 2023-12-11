class Ketchup extends Phaser.Physics.Arcade.Sprite{
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

        scene.ketchupFSM = new StateMachine('move',{
            move: new kMoveState(),
        }, [scene, this])
    }
}
class kMoveState extends State {
    execute(scene, ketchup) {
        // use destructuring to make a local copy of the keyboard object

        // GOING RIGHT
        if (totalMoved <= 7500){
            ketchup.mDirection = 'right';
            ketchup.anims.play(`kwalk-${ketchup.mDirection}`, true);
            ketchupMD.x = 1;
            totalMoved += ketchup.mVelocity;
            ketchup.setVelocityX(ketchup.mVelocity * ketchupMD.x);
        }

        // GOING LEFT
        if (totalMoved > 7500){
            ketchup.mDirection = 'left';
            ketchup.anims.play(`kwalk-${ketchup.mDirection}`, true);
            ketchupMD.x = -1;
            totalMoved += ketchup.mVelocity;
            ketchup.setVelocityX(ketchup.mVelocity * ketchupMD.x);        
        }

        // RESET
        if (totalMoved > 15000) {
            totalMoved = 0
        }
    }
}
