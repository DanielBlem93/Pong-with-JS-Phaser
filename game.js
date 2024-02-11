start = true
class Pong extends Phaser.Scene {
  player1
  player2
  ball
  ballVelocityX = 200
  ballVelocityY = (Math.random() *200) -100
  cursors
  keyW
  keyS
  player1Score = 0
  player2Score = 0
  scoreText = 'score:0'


  constructor() {
    super()
  }


  preload() {
    console.log(this)
    this.changeWorldBounds()
    this.preloadImages()

  }


  create() {
    this.addImages()
    this.addScoreText()
    this.addPlayers()
    this.addControls()
    this.addBall()

  }


  update() {
    this.handlePlayerControls(this.player1, this.cursors);
    this.handlePlayerControls(this.player2, { up: this.keyW, down: this.keyS });
    this.startgame()
  }

  startgame() {

    this.ball.setVelocityX(this.ballVelocityX)
    this.ball.setVelocityY(this.ballVelocityY)

  }

  addBall() {
    this.ball = this.physics.add.sprite(401, 242.5, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
  }

  changeWorldBounds() {
    this.physics.world.setBounds(0, 48, 802, 407);
  }


  preloadImages() {
    this.load.image("board", "src/assets/Board.png");
    this.load.image("scoreBar", "src/assets/ScoreBar.png");
    this.load.spritesheet("player", "src/assets/Player.png", {
      frameWidth: 17,
      frameHeight: 120,
    });
    this.load.spritesheet("player2", "src/assets/Computer.png", {
      frameWidth: 17,
      frameHeight: 120,
    });
    this.load.spritesheet("ball", "src/assets/Ball.png", {
      frameWidth: 30,
      frameHeight: 30,
    });
  }


  addImages() {

    this.add.image(0, 0, "board").setOrigin(0, 0);
    this.add.image(0, 0, "scoreBar").setOrigin(0, 0);
    this.add.image(802, 0, "scoreBar").setOrigin(0, 0).setScale(-1, 1);
  }


  addScoreText() {
    this.player1Score = this.add.text(501, 8, '0', { fontFamily: 'Roboto', fontSize: '32px', fill: '#000' })
    this.player2Score = this.add.text(277, 8, '0', { fontFamily: 'Roboto', fontSize: '32px', fill: '#000' })
  }


  addPlayers() {

    this.player1 = this.addPlayer(770, 247, "player");
    this.player2 = this.addPlayer(30, 247, "player2");
  }


  addPlayer(xPos, yPos, playerImage) {
    let player = this.physics.add.sprite(xPos, yPos, playerImage);
    player.setCollideWorldBounds(true);
    player.setBounce(0.5);
    return player;
  }


  addControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  }


  handlePlayerControls(player, controls) {
    if (controls.down.isDown) {
      player.setVelocityY(300);
    } else if (controls.up.isDown) {
      player.setVelocityY(-300);
    } else {
      player.setVelocityY(0);
    }
  }



}
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 802,
  height: 455,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: Pong

};
const game = new Phaser.Game(config);


