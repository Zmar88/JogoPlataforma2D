class Instrucoes extends Phaser.Scene {
  constructor() {
    super({ key: "Instrucoes" });
  }

  preload() {
    //Imagem Instruções
    this.load.image("instrucoes", "assets/Instrucoes.png");
  }
  create() {
    this.add.image(0, 0, "instrucoes").setOrigin(0, 0);

    //adicionar interação com as teclas de cursor
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (cursors.down.isDown) {
      this.menuJogo();
    }
  }

  //voltar ao menu inicial
  menuJogo() {
    this.game.sound.stopAll();
    this.scene.start("MenuInicial");
  }
}
