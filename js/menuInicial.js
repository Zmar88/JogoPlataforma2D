class MenuInicial extends Phaser.Scene {
  constructor() {
    super({ key: "MenuInicial" });
  }

  preload() {
    //imagem do menu
    this.load.image("menu", "assets/menuInicial.png");

    //musica do menu
    this.load.audio("somMenu", "assets/musicaMenu.wav");
  }
  create() {
    this.add.image(0, 0, "menu").setOrigin(0, 0);

    //adicionar interação com as teclas de cursor
    cursors = this.input.keyboard.createCursorKeys();

    //som Menu
    this.somMenu = this.sound.add("somMenu");
    this.somMenu.play();

    //Texto com identificação do autor
    this.add.text(1080, 560, "João Miranda nº23416", {
      fontSize: "12px",
      fill: "#000",
    });
  }

  update() {
    if (cursors.up.isDown) {
      this.iniciaJogo();
    }
    if (cursors.down.isDown) {
      this.iniciaInstrucoes();
    }
  }

  //entrar no jogo/nivel 1
  iniciaJogo() {
    //a musica do menu pára ao entrar no jogo
    this.game.sound.stopAll();
    this.scene.start("WorldScene");
    nInimigos = 0;
    vidaTotal = 100;
    score = 0;
    scoreTotal = 0;
  }

  iniciaInstrucoes() {
    //scene de instruções
    this.scene.start("Instrucoes");
  }
}
