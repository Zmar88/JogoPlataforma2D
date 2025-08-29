class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  preload() {
    //imagem Game Over
    this.load.image("gameOver", "assets/GameOverScene.png");

    //musica Game Over
    this.load.audio("gameOverSound", "assets/player_die.wav");
  }

  create() {
    this.add.image(0, 0, "gameOver").setOrigin(0, 0);

    //adicionar interação com as teclas de cursor
    cursors = this.input.keyboard.createCursorKeys();

    //som GameOver
    this.somGameOver = this.sound.add("gameOverSound");
    this.somGameOver.play();
  }

  update() {
    if (cursors.down.isDown) {
      this.menuJogo();
    }
    if (cursors.up.isDown) {
      this.jogarNovamente();
    }
  }

  menuJogo() {
    //a musica do GameOver pára ao entrar no jogo
    this.game.sound.stopAll();
    //passa para o menu inicial
    this.scene.start("MenuInicial");
  }

  //recomeca o jogo todo de novo
  jogarNovamente() {
    //a musica do GameOver pára ao entrar no jogo
    this.game.sound.stopAll();
    this.scene.start("WorldScene");
    nInimigos = 0;
    vidaTotal = 100;
    score = 0;
    scoreTotal = 0;
  }
}
