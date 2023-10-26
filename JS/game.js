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
    this.bossAttackArr = [];
    this.bossWaveArr = [];
    this.boss = null;
  }

  // FALLOS EN DEPLOY:
  // - bossAttack no parpadea
  // - bossWave no parpadea
  // - boss no cambia imagen cuando pierde vidas
  // - no se actualiza el cambio de velocidad ni de tempo en las bossWave (fase 3)

  blinkWaveAnimation = () => {
    if (this.bossWaveArr.length !== 0) {
      if (this.timer % 3 === 0) {
        this.bossWaveArr[0].node.style.display = "none";
      } else {
        this.bossWaveArr[0].node.style.display = "block";
      }
    }
  };
  blinkAttackAnimation = () => {
    if (this.bossAttackArr.length !== 0) {
      if (this.timer % 3 === 0) {
        if (this.bossAttackArr.length === 3) {
          this.bossAttackArr[2].node.style.display = "none";
          this.bossAttackArr[1].node.style.display = "none";
          this.bossAttackArr[0].node.style.display = "none";
        } else if (this.bossAttackArr.length === 2) {
          this.bossAttackArr[1].node.style.display = "none";
          this.bossAttackArr[0].node.style.display = "none";
        } else if (this.bossAttackArr.length === 1) {
          this.bossAttackArr[0].node.style.display = "none";
        }
      } else {
        if (this.bossAttackArr.length === 3) {
          this.bossAttackArr[2].node.style.display = "block";
          this.bossAttackArr[1].node.style.display = "block";
          this.bossAttackArr[0].node.style.display = "block";
        } else if (this.bossAttackArr.length === 2) {
          this.bossAttackArr[1].node.style.display = "block";
          this.bossAttackArr[0].node.style.display = "block";
        } else if (this.bossAttackArr.length === 1) {
          this.bossAttackArr[0].node.style.display = "block";
        }
      }
    }
  };
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
          this.projectyleArr[i].x < this.boss.x + this.boss.w &&
          this.projectyleArr[i].x + this.projectyleArr[i].w > this.boss.x &&
          this.projectyleArr[i].y < this.boss.y + this.boss.h &&
          this.projectyleArr[i].y + this.projectyleArr[i].h > this.boss.y
        ) {
          this.projectyleArr[i].node.remove();
          this.boss.lifes -= 1;
          this.bossLifesCheck();
          //console.log(this.boss.lifes);

          if (this.boss.lifes <= 0) {
            this.gameWin();
            this.boss.node.remove();
            this.boss = null;
            this.score += 3000;
            this.scoreNode.innerText = `SCORE : ${this.score}`;
            this.finalScoreNode.innerText = `SCORE : ${this.score}`;
          }
        }
      }
    }
  };
  collisionCheckPlayerBossAttack = () => {
    for (let i = 0; i < this.bossAttackArr.length; i++) {
      if (
        this.bossAttackArr[i].x < this.player.x + this.player.w - 35 &&
        this.bossAttackArr[i].x + this.bossAttackArr[i].w > this.player.x &&
        this.bossAttackArr[i].y < this.player.y + this.player.h + 10 &&
        this.bossAttackArr[i].y + this.bossAttackArr[i].h > this.player.y
      ) {
        this.deadScoreNode.innerText = `SCORE : ${this.score}`;
        this.boss.soundtrackNode.pause();
        this.boss.soundtrackNode.currentTime = 0;
        this.boss.node.remove();
        this.boss = null;
        this.gameOver();
      }
    }
  };
  collisionCheckPlayerBossWave = () => {
    for (let i = 0; i < this.bossWaveArr.length; i++) {
      if (
        this.bossWaveArr[i].x < this.player.x + this.player.w - 40 &&
        this.bossWaveArr[i].x + this.bossWaveArr[i].w > this.player.x &&
        this.bossWaveArr[i].y < this.player.y + this.player.h &&
        this.bossWaveArr[i].y + this.bossWaveArr[i].h > this.player.y
      ) {
        this.deadScoreNode.innerText = `SCORE : ${this.score}`;
        this.boss.soundtrackNode.pause();
        this.boss.soundtrackNode.currentTime = 0;
        this.boss.node.remove();
        this.boss = null;
        this.gameOver();
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
  bossAttack = () => {
    if (
      this.boss !== null &&
      this.timer % 30 === 0 &&
      this.bossAttackArr < 3 &&
      this.boss.direction !== "right"
    ) {
      let newBossAttack1 = new BossAttack(this.boss.x, this.boss.y - 30);
      this.bossAttackArr.push(newBossAttack1);
      let newBossAttack2 = new BossAttack(this.boss.x, this.boss.y + 140);
      this.bossAttackArr.push(newBossAttack2);
      let newBossAttack3 = new BossAttack(this.boss.x, this.boss.y + 310);
      this.bossAttackArr.push(newBossAttack3);

      playBossAttackSound();
    }
  };

  bossWave = () => {
    if (this.boss.lifes > 300) {
      if (
        this.boss !== null &&
        this.timer % 240 === 0 &&
        this.bossWaveArr < 1 &&
        this.boss.direction !== "right"
      ) {
        let newBossWave = new BossWave(this.boss.x, this.boss.y + 130);
        this.bossWaveArr.push(newBossWave);

        playBossWaveSound();
      }
    } else if (this.boss.lifes <= 300 && this.boss.lifes > 150) {
      if (
        this.boss !== null &&
        this.timer % 120 === 0 &&
        this.bossWaveArr < 1 &&
        this.boss.direction !== "right"
      ) {
        let newBossWave = new BossWave(this.boss.x, this.boss.y + 130);
        this.bossWaveArr.push(newBossWave);
        this.bossWaveArr[0].speed = 9;
        playBossWaveSound();
      }
    } else if (this.boss.lifes >= 150) {
      if (
        this.boss !== null &&
        this.timer % 90 === 0 &&
        this.bossWaveArr < 1 &&
        this.boss.direction !== "right"
      ) {
        let newBossWave = new BossWave(this.boss.x, this.boss.y + 130);
        this.bossWaveArr.push(newBossWave);
        this.bossWaveArr[0].speed = 11;
        playBossWaveSound();
      }
    }
  };
  bossLifesCheck = () => {
    if (
      this.boss !== null &&
      this.boss.lifes <= 300 &&
      this.boss.lifes > 100 &&
      this.boss.stage === 1
    ) {
      this.boss.stage = 2;
      this.boss.node.src = "./extra/images/boss-50.png";
    } else if (
      this.boss !== null &&
      this.boss.lifes < 150 &&
      this.boss.stage === 2
    ) {
      this.boss.node.src = "./extra/images/boss-10.png";
      this.boss.stage = 3;
    }
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
  bossAttackDisappear = () => {
    if (this.bossAttackArr.length !== 0 && this.bossAttackArr[0].x < -30) {
      this.bossAttackArr[0].node.remove();
      this.bossAttackArr.shift();
    }
  };
  bossWaveDisappear = () => {
    if (this.bossWaveArr.length !== 0 && this.bossWaveArr[0].x < -250) {
      this.bossWaveArr[0].node.remove();
      this.bossWaveArr.shift();
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
    for (let k = 0; k < this.bossAttackArr.length; k++) {
      this.bossAttackArr[k].node.remove();
    }
    for (let l = 0; l < this.bossWaveArr.length; l++) {
      this.bossWaveArr[l].node.remove();
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
    for (let k = 0; k < this.bossAttackArr.length; k++) {
      this.bossAttackArr[k].node.remove();
    }
    for (let l = 0; l < this.bossWaveArr.length; l++) {
      this.bossWaveArr[l].node.remove();
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
      this.bossAttack();
      this.bossWave();
      this.blinkWaveAnimation();
      this.blinkAttackAnimation();
      if (this.bossAttackArr.length !== 0) {
        this.bossAttackArr.forEach((eachBossAttack) => {
          eachBossAttack.movement();
        });
      }
      if (this.bossWaveArr.length !== 0) {
        this.bossWaveArr.forEach((eachWave) => {
          eachWave.movement();
        });
      }
      this.collisionCheckPlayerBossAttack();
      this.collisionCheckPlayerBossWave();
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
    this.bossAttackDisappear();
    this.bossWaveDisappear();
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
