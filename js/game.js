var config = {
  type: Phaser.AUTO,
  width: 1250,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [
    MenuInicial,
    Instrucoes,
    WorldScene,
    WorldScene2,
    WorldScene3,
    GameOver,
    GameWin,
    GameFinal,
  ],
};

var game = new Phaser.Game(config);
var player;
var cursors;
//score de cada nivel e do jogo na sua totalidade
var score = 0,
  scoreTotal = 0;
var scoreText;
//lavas do jogo
var lavas, lava;
//turbinas do jogo
var turbinas, turbina;
//variaveis dos inimigos
var bolas,
  bola,
  inimigos,
  nInimigos = 0;
var winText, winText2, winImage;
//vida do player
var barraVida,
  vidaTotal = 100;
//defenição do nivel em que o player se encontra(usado para trocar de scenes)
var nivelAtual = 0;
