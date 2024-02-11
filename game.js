

class Pong extends Phaser.Scene {

  player1Score = 0
  player2Score = 0
  scoreText = 'score:0'

  constructor() {
    super()
  }

  preload() {
    this.load.image("ball", "src/assets/Ball.png");
    this.load.image("board", "src/assets/Board.png");
    this.load.image("computer", "src/assets/Computer.png");
    this.load.image("player", "src/assets/Player.png");
    this.load.image("scoreBar", "src/assets/ScoreBar.png");
  }

  create() {
    this.addImages()
    this.addScoreText()
  }


  update() { }




  addScoreText() {
    this.scoreText = this.add.text(501,8, '0',{fontFamily: 'Roboto', fontSize: '32px', fill: '#000' })
    this.scoreText = this.add.text(277,8,'0',{fontFamily: 'Roboto', fontSize: '32px', fill: '#000' })
  }

  addImages() {

    this.add.image(0, 0, "board").setOrigin(0, 0);
    this.add.image(30, 247, "computer");
    this.add.image(770, 247, "player");
    this.add.image(0, 0, "scoreBar").setOrigin(0, 0);
    this.add.image(802, 0, "scoreBar").setOrigin(0, 0).setScale(-1, 1);
    this.add.image(400, 247, "ball");
  }

}
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 802,
  height: 455,
  scene: Pong
};
const game = new Phaser.Game(config);


