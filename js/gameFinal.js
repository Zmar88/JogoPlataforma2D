class GameFinal extends Phaser.Scene {
  constructor() {
    super({ key: "GameFinal" });
  }

  preload() {
    //Carregar audio e o background
    this.load.audio("somVitoria", "assets/Won!.wav");
    this.load.image("gameFinalScene", "assets/finalScene.png");
  }
  create() {
    this.add.image(0, 0, "gameFinalScene").setOrigin(0, 0);
    //adicionar interação com as teclas de cursor
    cursors = this.input.keyboard.createCursorKeys();

    //som Menu
    this.somVitoria = this.sound.add("somVitoria");
    this.somVitoria.play();

    if (scoreTotal != 1) {
      this.add.text(
        300,
        270,
        "Capturou um total de " + scoreTotal + " turbinas",
        {
          fontSize: "40px",
          fill: "#ffffff",
        }
      );
      this.add.text(
        250,
        310,
        "E ajudou a tornar a região mais autossustentável",
        {
          fontSize: "30px",
          fill: "#ffffff",
        }
      );
    } else {
      this.add.text(450, 270, "Capturou: " + scoreTotal + " turbina", {
        fontSize: "40px",
        fill: "#ffffff",
      });
      this.add.text(
        250,
        310,
        "E ajudou a tornar a região mais autossustentável",
        {
          fontSize: "30px",
          fill: "#ffffff",
        }
      );
    }
  }

  update() {
    if (cursors.down.isDown) {
      this.nextScene();
    }
  }

  nextScene() {
    //passa para o menu inicial
    nInimigos = 0;
    vidaTotal = 100;
    score = scoreTotal = 0;

    this.game.sound.stopAll();
    nivelAtual = 0;
    this.scene.start("MenuInicial");
  }
}
