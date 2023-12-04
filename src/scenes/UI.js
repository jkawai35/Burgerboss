class UI extends Phaser.Scene {
    constructor() {
        super("UI");
    }

    create() {
        this.scoreLeft = this.add.text(game_width / 32, game_height / 24, score, scoreConfig);
        this.livesRight = this.add.text(game_width - 60, 10, lives, scoreConfig);
    }

    update() {
        this.scoreLeft.text = score;
        this.livesRight.text = lives;
    }
}