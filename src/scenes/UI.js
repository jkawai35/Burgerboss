class UI extends Phaser.Scene {
    constructor() {
        super("UI");
    }

    create() {
        this.scoreLeft = this.add.text(game_width / 32, game_height / 24, score, scoreConfig);
        this.livesRight = this.add.text(game_width - 60, 10, lives, scoreConfig);
        this.ESCPause = this.add.text(game_width / 128, 225, "Press ESC to go to Menu", {
            fontFamily: 'Press Start 2P, Papyrus',
            fontSize: '48px',
        });
    }

    update() {
        this.scoreLeft.text = "Score: " + score + "  ";
        this.livesRight.text = "Lives: " + lives + "  ";
    }
}