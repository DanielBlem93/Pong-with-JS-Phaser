
start = true
started = false
class Pong extends Phaser.Scene {
  player1
  player2
  ball
  ballVelocityX = Math.random() <= 0.5 ? -200 : 200;
  // ballVelocityY = (Math.random() * 200) - 100
  ballVelocityY = 0
  cursors
  keyW
  keyS
  player1Score
  player2Score
  score1 = 0
  score2 = 0
  p1Wins
  p2Wins

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

    this.checkWinner()
  }




  gameOver() {

    this.physics.pause();

    setTimeout(() => {
      this.resetGame()
    }, 2000);
    setTimeout(() => {
      this.startgame()
    }, 3000);

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
    this.ballVelocityX = Math.random() <= 0.5 ? -200 : 200;
    this.ballVelocityY = (Math.random() * 200) - 100


    // Spielerpositionen zurücksetzen
    this.player1.setPosition(780, 247);
    this.player2.setPosition(20, 247);

    // Spielzustand zurücksetzen
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


  hitBall(paddle, ball) {

    let deltaY = ball.y - paddle.y;
    let normalizedDeltaY = deltaY / (paddle.displayHeight / 2);
    let incidentAngle = normalizedDeltaY * Math.PI / 4; // Justiere den Winkel hier nach Bedarf
    let speed = ball.body.velocity.length();
    let newVelocityX = Math.cos(incidentAngle) * speed;
    let newVelocityY = Math.sin(incidentAngle) * speed;

    if (ball.body.velocity.x < 0) {
      ball.setVelocityX(-newVelocityX - 20);
    } else {
      ball.setVelocityX(newVelocityX + 20);
    }
    ball.setVelocityY(newVelocityY);
  }


  startgame() {
    if (start && !started) {
      this.ball.setVelocityX(this.ballVelocityX)
      this.ball.setVelocityY(this.ballVelocityY)
      started = true
      this.physics.resume()
    }
  }




  addBall() {
    this.ball = this.physics.add.sprite(401, 242.5, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setCircle(15)
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


  checkWinner() {
    if (this.score2 === 7) {
      this.addWinText('player2');
    } else if (this.score1 === 7) {
      this.addWinText('player1');
    }
    if (this.score2 === 7 || this.score1 === 7) {
      this.endGame();
    }
  }

  addWinText(winner) {
    const xPosition = winner === 'player2' ? 441 : 101;
    const winText = winner === 'player2' ? 'Player2 Wins !' : 'Player1 Wins !';
    this.add.text(xPosition, 247, winText, { fontFamily: 'Roboto', fontSize: '46px', fill: '#fff' });
  }

  endGame() {
    this.physics.pause();
    start = false
    started = false
  }


  addPlayers() {

    this.player1 = this.addPlayer(780, 247, "player");
    this.player1.setImmovable(true)
    this.player2 = this.addPlayer(20, 247, "player2");
    this.player2.setImmovable(true)

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


