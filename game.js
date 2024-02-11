const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 802,
    height: 455,
    backgroundColor: "#000",
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("ball", "src/assets/Ball.png");
    this.load.image("board", "src/assets/Board.png");
    this.load.image("computer", "src/assets/Computer.png");
    this.load.image("player", "src/assets/Player.png");
    this.load.image("scoreBar", "src/assets/ScoreBar.png");
  }

  function create() {
    //game mid is on 247px
    this.add.image(0, 0, "board").setOrigin(0, 0);
    this.add.image(30, 247, "computer");
    this.add.image(770, 247, "player");
    this.add.image(0, 0, "scoreBar").setOrigin(0, 0);
    this.add.image(802, 0, "scoreBar").setOrigin(0, 0).setScale(-1,1);
    this.add.image(400, 247, "ball");
  }

  function update() {}