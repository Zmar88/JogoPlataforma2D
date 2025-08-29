class GameWin extends Phaser.Scene {
  constructor() {
    super({ key: "GameWin" });
  }

  preload() {
    //Carregar audio
    this.load.audio("somVitoria", "assets/Won!.wav");
  }
  create() {
    //adicionar interação com as teclas de cursor
    cursors = this.input.keyboard.createCursorKeys();

    //som Menu
    this.somVitoria = this.sound.add("somVitoria");
    this.somVitoria.play();
  }

  init() {
    winImage = this.add.image(350, 50, "pergaminho").setOrigin(0, 0);
    winImage.setScrollFactor(0);
    winText = this.add.text(440, 200, "Terminou o nível!", {
      fontSize: "35px",
      fill: "#FF6347",
    });
    winText.setScrollFactor(0);
    if (score != 1) {
      winText2 = this.add.text(490, 270, "Capturou: " + score + " turbinas", {
        fontSize: "20px",
        fill: "#222422",
      });
    } else {
      winText2 = this.add.text(490, 270, "Capturou: " + score + " turbina", {
        fontSize: "20px",
        fill: "#222422",
      });
    }
    winText2.setScrollFactor(0);
    this.add.text(440, 400, "Pressione a tecla seta para baixo ", {
      fontSize: "18px",
      fill: "#222422",
    });
    if (nivelAtual == 1 || nivelAtual == 2) {
      this.add.text(460, 420, " para jogar o próximo Nível", {
        fontSize: "20px",
        fill: "#222422",
      });
    } else {
      this.add.text(510, 420, " para continuar", {
        fontSize: "20px",
        fill: "#222422",
      });
    }
  }

  update() {
    if (cursors.down.isDown) {
      this.nextScene();
    }
  }

  nextScene() {
    //passa para a proxima cena
    nInimigos = 0;
    vidaTotal = 100;
    score = 0;
    //se o nivelAtual for 1 passa para o nivel 2
    if (nivelAtual == 1) {
      this.game.sound.stopAll();
      this.scene.start("WorldScene2");
    } //se o nivelAtual for 2 passa para o nivel 3
    else if (nivelAtual == 2) {
      this.game.sound.stopAll();
      this.scene.start("WorldScene3");
    } //se não passa para a Scene final
    else {
      this.game.sound.stopAll();
      nivelAtual = 0;
      this.scene.start("GameFinal");
    }
  }
}
