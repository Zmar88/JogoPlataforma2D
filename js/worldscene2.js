class WorldScene2 extends Phaser.Scene {
  constructor() {
    super({ key: "WorldScene2" });
  }

  preload() {
    //Adicionar uma barra de loading ao jogo
    //esta barra terá uma zona interior(progressBar) e exterior(progressBox)
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(480, 300, 320, 50);

    this.load.on("progress", function (value) {
      console.log(value);
    });

    this.load.on("fileprogress", function (file) {
      console.log(file.src);
    });
    this.load.on("complete", function () {
      console.log("complete");
    });

    //texto com info do valor da percentagem carregada
    var percentText = this.make.text({
      x: 1250 / 2,
      y: 600 / 2 + 15,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0, 0);

    var loadingText = this.make.text({
      x: 1250 / 2 + 25,
      y: 600 / 2 - 20,
      text: "A Carregar...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    /////////////////////////////////////////

    //carrega as imagens do jogo
    this.load.image("bg", "assets/ceu.jpg");
    this.load.spritesheet("heroi", "assets/heroi.png", {
      frameWidth: 16,
      frameHeight: 17.5,
    });
    this.load.image("lava", "assets/lava.jpg");
    this.load.image("turbina", "assets/turbinaE.png");
    this.load.image("pergaminho", "assets/pergaminho.png");
    this.load.image("fogo", "assets/fire.png");
    this.load.image("inimigo", "assets/inimigo.png");

    //carrega o mapa em formato tiles
    this.load.image("tiles", "assets/platformPack_tilesheet.png");
    this.load.tilemapTiledJSON("map2", "assets/trabp2.json");

    //carrega os audios do jogo
    this.load.audio("somSalto", "assets/jump_10.wav");
    this.load.audio("somHit", "assets/Hit.wav");
    this.load.audio("somColecta", "assets/coin.wav");
    this.load.audio("somFundo", "assets/Woodland Fantasy.mp3");

    //////////////////////////////////////////////////
    this.load.on("progress", function (value) {
      //Alterar a barra de progresso e o texto consoante a percentagem carregada
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0x669900, 1);
      progressBar.fillRect(490, 310, 300 * value, 30);

      percentText.setText(parseInt(value * 100) + "%");
    });
    //////////////////////////////////////////////////
  }

  create() {
    //adiciona o background
    const backgroundImage = this.add.image(0, 0, "bg").setOrigin(0, 0);
    backgroundImage.setScale(2, 0.5);

    //adiciona o mapa em formato TileMap
    var map2 = this.make.tilemap({ key: "map2" });
    var tileset2 = map2.addTilesetImage("platformPack_tilesheet", "tiles");

    //adiciona os arbustos
    map2.createStaticLayer("adereços", tileset2, 0, 0);

    //adiciona os sons do jogo
    this.somSalto = this.sound.add("somSalto", { volume: 0.5 });
    this.somHit = this.sound.add("somHit");
    this.somColecta = this.sound.add("somColecta", { volume: 2.5 });
    this.somFundo = this.sound.add("somFundo");

    //adicionar o player
    player = this.physics.add.sprite(100, 100, "heroi");
    player.setScale(1.8, 1.8);
    player.setBounce(0.1);

    //WorldBounds
    this.physics.world.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
    player.setCollideWorldBounds(true);

    var platforms = map2.createStaticLayer("Plataformas", tileset2, 0, 0);

    platforms.setCollisionByExclusion(-1, true);
    //colisão do player com as plataformas
    this.physics.add.collider(player, platforms);

    //criar animações
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("heroi", {
        frames: [3, 7, 3, 11],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("heroi", {
        frames: [1, 5, 1, 9],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "heroi", frame: 0 }],
      frameRate: 20,
    });

    //colocar a camera a seguir o player
    this.cameras.main.startFollow(player, true, true);
    this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);

    //adicionar interação com as teclas de cursor
    cursors = this.input.keyboard.createCursorKeys();

    //Turbinas que funcionam como pontuação do jogo
    turbinas = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    var turbinaObjects = map2.getObjectLayer("turbinas")["objects"];
    turbinaObjects.forEach((turbinaObject) => {
      turbina = turbinas
        .create(turbinaObject.x, turbinaObject.y - 45, "turbina")
        .setOrigin(0, 0);
    });

    //colisão entre as turbinas e o player
    this.physics.add.collider(player, turbinas, this.point, null, this);

    //Adicionar as bolas de fogos no jogo
    bolas = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    var bolaObjects = map2.getObjectLayer("aguas")["objects"];
    var i = 0;
    bolaObjects.forEach((bolaObject) => {
      i++;
      bola = bolas
        .create(bolaObject.x, bolaObject.y - 45, "fogo")
        .setOrigin(0, 0);
      bola.body.setSize(20, 30);
      bola.setBounce(1);
      //alterar a velocidade das bolas de fogo dependendo do seu inidice [i]
      if (
        i == 1 ||
        i == 3 ||
        i == 5 ||
        i == 7 ||
        i == 9 ||
        i == 11 ||
        i == 13 ||
        i == 15 ||
        i == 17 ||
        i == 19 ||
        i == 21 ||
        i == 23 ||
        i == 25
      ) {
        bola.setVelocityY(200);
      } else {
        bola.setVelocityY(250);
      }
      bola.setCollideWorldBounds(true);
    });

    //colisão entre as bolas de fogo e o player
    this.physics.add.collider(bolas, platforms);
    this.physics.add.collider(player, bolas, this.hitBolaFogo, null, this);

    //obstaculos de lava estarao disponiveis para colisao
    lavas = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    var lavaObjects = map2.getObjectLayer("aguas")["objects"];
    lavaObjects.forEach((lavaObject) => {
      lava = lavas
        .create(lavaObject.x, lavaObject.y - 40, "lava")
        .setOrigin(0, 0);
      lava.setScale(0.288, 0.5);
    });

    //grupo de Inimigos
    inimigos = this.physics.add.group();
    this.physics.add.collider(inimigos, platforms);
    this.physics.add.collider(player, inimigos, this.hitInimigo, null, this);
    this.makeInimigos();

    //Score Text
    scoreText = this.add.text(16, 70, "Turbinas Capturadas: ", {
      fontSize: "24px",
      fill: "#000",
    });
    scoreText.setScrollFactor(0);

    ////https://phasergames.com/how-to-make-a-health-bar-in-phaser-3/
    //healthBar Text
    var healthBarText = this.add.text(16, 28, "Vida: ", {
      fontSize: "24px",
      fill: "#000",
    });
    healthBarText.setScrollFactor(0);

    //Barra de Vida
    barraVida = this.makeBar(100, 16);
    this.setValue(barraVida, vidaTotal);
    barraVida.setScrollFactor(0);

    this.playSomFundo();
  }

  update() {
    //ver se o player caiu fora do mapa
    if (player.y >= 608) {
      this.setValue(barraVida, 0);
      this.hitBolaFogo();
    }

    //verificar se o player terminou o nivel
    if (player.x >= 3152) {
      this.fimNivel();
    }

    //animações teclas
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.blocked.down) {
      this.playSomSalto();
      player.setVelocityY(-330);
    }
  }

  //fimJogo
  fimJogo() {
    this.game.sound.stopAll();
    scoreTotal = 0;
    //chamar a Scene seguinte e passar um parâmetro para essa cena
    this.scene.start("GameOver");
    player.setX(100);
    player.setY(450);
  }

  //fimNivel
  fimNivel() {
    nivelAtual = 2;
    scoreTotal += score;
    this.game.sound.stopAll();
    //chamar a Scene seguinte
    this.scene.start("GameWin", score);

    player.setX(100);
    player.setY(450);
  }

  //point() - utilizada quando o player colecta uma turbina
  point(player, turbina) {
    this.playSomColecta();
    score += 1;
    turbina.disableBody(true, true);
    scoreText.setText("Turbinas Capturadas: " + score);
  }

  //hitBolaFogo() - utilizada quando uma Bola de Fogo atinge o player
  hitBolaFogo() {
    this.playSomHit();
    this.cameras.main.shake(50);
    this.cameras.main.flash(50);
    vidaTotal -= 33.4;
    this.setValue(barraVida, vidaTotal);
    player.setX(100);
    player.setY(100);

    //Se o player ficar sem vida
    if (vidaTotal <= 0) {
      this.setValue(barraVida, 0);
      //alert("DERROTADO!");
      this.fimJogo();
    }
  }

  //hitInimigo() - utilizada quando um Inimigo atinge o player
  hitInimigo(player, inimigo) {
    this.playSomHit();
    this.cameras.main.shake(50);
    this.cameras.main.flash(50);
    //elimina o enimigo após o contacto
    inimigo.disableBody(true, true);
    vidaTotal -= 33.4;
    this.setValue(barraVida, vidaTotal);
    player.setX(100);
    player.setY(100);

    //Se o player ficar sem vida
    if (vidaTotal <= 0) {
      this.setValue(barraVida, 0);
      //alert("DERROTADO!");
      this.fimJogo();
    }
  }

  //cria a barra de Vida
  makeBar(x, y) {
    //Desenha a barra de vida
    let bar = this.add.graphics();
    bar.fillStyle(0xe74c3c, 1);

    //Define a barra como um retangulo
    bar.fillRect(0, 0, 200, 50);
    //posiciona a barra
    bar.x = x;
    bar.y = y;

    return bar;
  }

  //atualiza o valor da barar de vida
  setValue(bar, percentage) {
    //Altera a barra tendo em conta a percentagem de vida
    bar.scaleX = percentage / 100;
  }

  //makeInimgos()
  makeInimigos() {
    //gerar os inimigos
    while (nInimigos != 6) {
      nInimigos++;
      //sortear a posição dos inimigos
      var x = Phaser.Math.Between(400, 2900);

      var inimigo = inimigos.create(x, 16, "inimigo");
      inimigo.setBounce(1);
      inimigo.setCollideWorldBounds(true);
      inimigo.setVelocity(Phaser.Math.Between(-200, 200), 20);
      inimigo.allowGravity = false;
      inimigo.setScale(0.5, 0.5);
    }
  }

  //playSomHit
  playSomHit() {
    this.somHit.play();
  }

  //playSomSalto
  playSomSalto() {
    this.somSalto.play();
  }

  //playSomColecta
  playSomColecta() {
    this.somColecta.play();
  }

  //playSomFundo
  playSomFundo() {
    this.somFundo.loop = true;
    this.somFundo.play();
  }
}
