
start = true
started = false
class Pong extends Phaser.Scene {
  player1
  player2
  ball
  ballVelocityX = -200
  ballVelocityY = (Math.random() * 200) - 100
  cursors
  keyW
  keyS
  player1Score
  player2Score
  score1 = 0
  score2 = 0


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
    this.setCollider()
    this.onWorldBoundsListener()



  }


  update() {
    this.handlePlayerControls(this.player1, this.cursors);
    this.handlePlayerControls(this.player2, { up: this.keyW, down: this.keyS });
    this.startgame()
    this.holdPlayersPosition()
    // this.checkWinner()
  }


  // checkWinner() {
  //   if (score1 === 7) {

  //   }
  // }

  gameOver() {
    this.physics.pause();
    setTimeout(() => {
      this.resetGame()
      setTimeout(() => {
        this.startgame()
        this.physics.resume()
      }, 2000);
    }, 2000);
  }
  onWorldBoundsListener() {
    this.physics.world.on('worldbounds', (body, up, down, left, right) => {
      if (right) {
        this.addPoints('player1')
      }
      else if (left) {
        this.addPoints('player2')
      }
    });
  }

  resetGame() {
    // Ballposition zurücksetzen
    this.ball.setPosition(401, 242.5);
    this.ballVelocityX = -200
    this.ballVelocityY = (Math.random() * 200) - 100

    // Spielerpositionen zurücksetzen
    this.player1.setPosition(770, 247);
    this.player2.setPosition(30, 247);

    // Spielzustand zurücksetzen
    start = false;
    started = false;
  }


  addPoints(player) {

    if (player === 'player1')
      this.score2++
    else {

      this.score1++
    }
    this.player1Score.setText('' + this.score1)
    this.player2Score.setText('' + this.score2)
    this.gameOver()
  }


  setCollider() {
    this.physics.add.collider(this.player1, this.ball, this.hitBall, null, this);
    this.physics.add.collider(this.player2, this.ball, this.hitBall, null, this);
  }


  hitBall() {
    if (this.ballVelocityX > 0) {

      this.ballVelocityX = -(Math.abs(this.ballVelocityX)) - 10
      this.ball.setVelocityX(this.ballVelocityX)

    } else if (this.ballVelocityX < 0) {
      console.log(this.ballVelocityX)
      this.ballVelocityX = (Math.abs(this.ballVelocityX)) + 10
      this.ball.setVelocityX(this.ballVelocityX)

    }
  }


  startgame() {
    if (start && !started) {
      this.ball.setVelocityX(this.ballVelocityX)
      this.ball.setVelocityY(this.ballVelocityY)
      started = true
    }
  }

  holdPlayersPosition() {
    this.player1.x = 770
    this.player2.x = 30
  }


  addBall() {
    this.ball = this.physics.add.sprite(401, 242.5, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.body.onWorldBounds = true;
    this.ball.body.collideWorldBounds = true
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


