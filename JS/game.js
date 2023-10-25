class Game {
  constructor() {
    this.timer = 0;
    this.isGameOn = true;
    this.player = new Player();
    this.score = 0;
    this.scoreNode = document.querySelector("#score");
    this.finalScoreNode = document.querySelector("#score-h5");
    this.deadScoreNode = document.querySelector("#deadScore-h5");

    this.enemyArr = [];
    this.projectyleArr = [];
    this.boss = null;
  }
  // NOTA IMPORTANTE: METER BOSS AL SEGUNDO 40!!
  collisionCheckPlayerBoss = () => {
    if (
      this.boss !== null &&
      this.boss.x < this.player.x + this.player.w &&
      this.boss.x + this.boss.w > this.player.x &&
      this.boss.y < this.player.y + this.player.h &&
      this.boss.y + this.boss.h > this.player.y
    ) {
      this.boss.soundtrackNode.pause();
      this.boss.soundtrackNode.currentTime = 0;
      this.boss.node.remove();
      this.deadScoreNode.innerText = `SCORE : ${this.score}`;
      this.gameOver();
    }
  };
  collisionCheckPlayerEnemy = () => {
    this.enemyArr.forEach((eachEnemy) => {
      if (
        eachEnemy.x < this.player.x + this.player.w - 35 &&
        eachEnemy.x + eachEnemy.w > this.player.x &&
        eachEnemy.y < this.player.y + this.player.h &&
        eachEnemy.y + eachEnemy.h > this.player.y
      ) {
        this.deadScoreNode.innerText = `SCORE : ${this.score}`;
        this.gameOver();
      }
    });
  };
  collisionCheckEnemyShot = () => {
    if (this.enemyArr.length !== 0 && this.projectyleArr.length !== 0) {
      for (let i = 0; i < this.enemyArr.length; i++) {
        for (let j = 0; j < this.projectyleArr.length; j++) {
          if (
            this.enemyArr[i].x <
              this.projectyleArr[j].x + this.projectyleArr[j].w &&
            this.enemyArr[i].x + this.enemyArr[i].w > this.projectyleArr[j].x &&
            this.enemyArr[i].y <
              this.projectyleArr[j].y + this.projectyleArr[j].h &&
            this.enemyArr[i].y + this.enemyArr[i].h + 10 >
              this.projectyleArr[j].y
          ) {
            //console.log("chocando");
            this.enemyArr[i].node.remove();
            this.projectyleArr[j].node.remove();
            this.projectyleArr.splice(j, 1);
            this.enemyArr.splice(i, 1);
            enemyDyingSound();
            this.score += 100;
            this.scoreNode.innerText = `SCORE : ${this.score}`;
          }
        }
      }
    }

    this.score + 100;
  };
  collisionCheckShotBoss = () => {
    if (this.boss !== null && this.projectyleArr.length !== 0) {
      for (let i = 0; i < this.projectyleArr.length; i++) {
        if (
          this.projectyleArr[i].x < this.boss.x + this.boss.w - 35 &&
          this.projectyleArr[i].x + this.projectyleArr[i].w > this.boss.x &&
          this.projectyleArr[i].y < this.boss.y + this.boss.h &&
          this.projectyleArr[i].y + this.projectyleArr[i].h > this.boss.y
        ) {
          this.projectyleArr[i].node.remove();
          this.boss.lifes -= 1;
          console.log(this.boss.lifes);

          if (this.boss.lifes <= 0) {
            this.gameWin();
            this.boss.node.remove();
            this.boss = null;
            this.score += 3000;
            this.scoreNode.innerText = `SCORE : ${this.score}`;
            this.finalScoreNode.innerText = `SCORE : ${this.score}`;
            // insertar funcion pantalla victoria
          }
        }
      }
    }
  };
  playerShooting = () => {
    if (this.projectyleArr.length < 2 && this.isGameOn === true) {
      let newProjectyle = new Projectyle(this.player.x, this.player.y);
      this.projectyleArr.push(newProjectyle);
      playShotSound();
    }

    //console.log("disparo", this.player.y);
  };
  enemySpawnFirstWave = () => {
    if (this.timer % 30 === 0 && this.timer > 60 && this.timer < 240) {
      let newEnemyWave = new Enemy(100, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnSecondWave = () => {
    if (this.timer % 30 === 0 && this.timer > 300 && this.timer < 480) {
      let newEnemyWave = new Enemy(500, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnThirdWave = () => {
    if (this.timer % 30 === 0 && this.timer > 540 && this.timer < 720) {
      let newEnemyWave = new Enemy(250, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnFourthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 540 && this.timer < 720) {
      let newEnemyWave = new Enemy(130, -50, "left");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnFifthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 540 && this.timer < 720) {
      let newEnemyWave = new Enemy(370, -50, "left");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnSixthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 840 && this.timer < 1020) {
      let newEnemyWave = new Enemy(-50, 150, "top");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnSeventhWave = () => {
    if (this.timer % 30 === 0 && this.timer > 900 && this.timer < 1080) {
      let newEnemyWave = new Enemy(750, 350, "bottom");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnEighthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 960 && this.timer < 1140) {
      let newEnemyWave = new Enemy(-50, 500, "top");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnNinethWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1260 && this.timer < 1380) {
      let newEnemyWave = new Enemy(100, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnTenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1290 && this.timer < 1410) {
      let newEnemyWave = new Enemy(200, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnEleventhWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1320 && this.timer < 1440) {
      let newEnemyWave = new Enemy(300, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnTwelvethWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1350 && this.timer < 1470) {
      let newEnemyWave = new Enemy(400, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnThirteenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1590 && this.timer < 1770) {
      let newEnemyWave = new Enemy(-50, 100, "top");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnFourteenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1590 && this.timer < 1770) {
      let newEnemyWave = new Enemy(750, 200, "bottom");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnFifteenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1620 && this.timer < 1800) {
      let newEnemyWave = new Enemy(-50, 300, "top");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnSixteenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1620 && this.timer < 1800) {
      let newEnemyWave = new Enemy(750, 400, "bottom");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnSeventeenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1920 && this.timer < 2040) {
      let newEnemyWave = new Enemy(100, -50, "left");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnEighteenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1920 && this.timer < 2040) {
      let newEnemyWave = new Enemy(500, -50, "left");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnNineteenthWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1950 && this.timer < 2070) {
      let newEnemyWave = new Enemy(200, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnTwentythWave = () => {
    if (this.timer % 30 === 0 && this.timer > 1950 && this.timer < 2070) {
      let newEnemyWave = new Enemy(400, 850, "right");
      this.enemyArr.push(newEnemyWave);
    }
  };
  enemySpawnTwentyfirstWave = () => {
    if (this.timer % 30 === 0 && this.timer > 2010 && this.timer < 2130) {
      let newEnemyWave = new Enemy(300, -50, "left");
      this.enemyArr.push(newEnemyWave);
    }
  };
  bossSpawn = () => {
    if (this.timer === 2400) {
      this.boss = new Boss("right");
      this.boss.soundtrackNode.play();
    }
  };
  enemyDisappear = () => {
    if (this.enemyArr.length !== 0 && this.enemyArr[0].x < -100) {
      this.enemyArr[0].node.remove();
      this.enemyArr.shift();
    }
  };
  shotDisappear = () => {
    if (this.projectyleArr.length !== 0 && this.projectyleArr[0].x > 1100) {
      this.projectyleArr[0].node.remove();
      this.projectyleArr.shift();
    }
  };
  gameOver = () => {
    this.isGameOn = false;
    for (let i = 0; i < this.enemyArr.length; i++) {
      this.enemyArr[i].node.remove();
    }
    for (let j = 0; j < this.projectyleArr.length; j++) {
      this.projectyleArr[j].node.remove();
    }

    this.enemyArr = [];
    this.projectyleArr = [];
    this.player.node.remove();
    stopGameMusic();
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  };

  gameWin = () => {
    this.isGameOn = false;
    for (let i = 0; i < this.enemyArr.length; i++) {
      this.enemyArr[i].node.remove();
    }
    for (let j = 0; j < this.projectyleArr.length; j++) {
      this.projectyleArr[j].node.remove();
    }

    this.enemyArr = [];
    this.projectyleArr = [];
    this.player.node.remove();
    this.boss.soundtrackNode.pause();
    this.boss.soundtrackNode.currentTime = 0;
    gameScreenNode.style.display = "none";
    victoryScreenNode.style.display = "flex";

    victoryOstPlay();
  };

  gameLoop = () => {
    //control+k+C => comentar seccion
    //control+k+u => descomentar seccion
    this.enemySpawnFirstWave();
    this.enemySpawnSecondWave();
    this.enemySpawnThirdWave();
    this.enemySpawnFourthWave();
    this.enemySpawnFifthWave();
    this.enemySpawnSixthWave();
    this.enemySpawnSeventhWave();
    this.enemySpawnEighthWave();
    this.enemySpawnNinethWave();
    this.enemySpawnTenthWave();
    this.enemySpawnEleventhWave();
    this.enemySpawnTwelvethWave();
    this.enemySpawnThirteenthWave();
    this.enemySpawnFourteenthWave();
    this.enemySpawnFifteenthWave();
    this.enemySpawnSixteenthWave();
    this.enemySpawnSeventeenthWave();
    this.enemySpawnEighteenthWave();
    this.enemySpawnNineteenthWave();
    this.enemySpawnTwentythWave();
    this.enemySpawnTwentyfirstWave();
    this.bossSpawn();
    if (this.boss !== null) {
      this.boss.movement();
    }
    this.enemyArr.forEach((eachEnemy) => {
      eachEnemy.autoMovement();
    });
    this.projectyleArr.forEach((eachProjectyle) => {
      eachProjectyle.movement();
    });

    this.player.playerMovementUp();
    this.player.playerMovementDown();
    this.player.playerMovementLeft();
    this.player.playerMovementRight();
    this.shotDisappear();
    this.enemyDisappear();
    this.collisionCheckEnemyShot();
    this.collisionCheckPlayerEnemy();
    this.collisionCheckShotBoss();
    this.collisionCheckPlayerBoss();
    this.timer++;
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
      //console.log(score);
    }
  };
}
