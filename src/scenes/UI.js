class UI extends Phaser.Scene {
    constructor() {
        super("UI");
    }

    create() {
        //add score to UI
        this.scoreLeft = this.add.text(game_width / 32, game_height / 24, score, scoreConfig);
        this.livesRight = this.add.text(game_width - 85, 10, lives, livesConfig);
        this.ESCPause = this.add.text(game_width / 25, 225, "ESC: Menu                  R: Restart", {
            fontFamily: '"Press Start 2P", Papyrus',
            fontSize: '8px',
        });
    }

    update() {
        this.scoreLeft.text = "Score: " + score + "  ";
        this.livesRight.text = "Lives: " + lives + "  ";
    }
}