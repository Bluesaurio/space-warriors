class Game {
  constructor() {
    this.timer = 0;
    this.isGameOn = true;
    this.player = new Player();
    this.score = 0;
    this.enemyArr = [];
    this.projectyleArr = [];
  }

  collisionCheckPlayerEnemy = () => {
    this.enemyArr.forEach((eachEnemy) => {
      if (
        eachEnemy.x < this.player.x + this.player.w - 35 &&
        eachEnemy.x + eachEnemy.w > this.player.x &&
        eachEnemy.y < this.player.y + this.player.h &&
        eachEnemy.y + eachEnemy.h > this.player.y
      ) {
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
          }
        }
      }
    }

    this.score + 100;
  };

  playerShooting = () => {
    if (this.projectyleArr.length < 2) {
      let newProjectyle = new Projectyle(this.player.x, this.player.y);
      this.projectyleArr.push(newProjectyle);
      playShotSound();
    }

    //console.log("disparo", this.player.y);
  };
  enemySpawnFirstWave = () => {
    if (this.timer % 45 === 0 && this.timer > 60 && this.timer < 360) {
      let newEnemyWave1 = new Enemy(100, 850, "right");
      this.enemyArr.push(newEnemyWave1);
    }
  };
  enemySpawnSecondWave = () => {
    if (this.timer % 45 === 0 && this.timer > 240 && this.timer < 540) {
      let newEnemyWave2 = new Enemy(450, 850, "right");
      this.enemyArr.push(newEnemyWave2);
    }
  };
  enemySpawnThirdWave = () => {
    if (this.timer % 45 === 0 && this.timer > 420 && this.timer < 720) {
      let newEnemyWave3 = new Enemy(350, 850, "right");
      this.enemyArr.push(newEnemyWave3);
    }
  };
  enemySpawnFourthWave = () => {
    if (this.timer % 45 === 0 && this.timer > 240 && this.timer < 540) {
      let newEnemyWave2 = new Enemy(200, -50, "left");
      this.enemyArr.push(newEnemyWave2);
    }
  };
  enemySpawnFifthWave = () => {
    if (this.timer % 45 === 0 && this.timer > 420 && this.timer < 720) {
      let newEnemyWave2 = new Enemy(450, -50, "left");
      this.enemyArr.push(newEnemyWave2);
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
    this.enemyArr = [];
    this.player.node.remove();
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  };

  gameLoop = () => {
    this.enemySpawnFirstWave();
    this.enemySpawnSecondWave();
    this.enemySpawnThirdWave();
    this.enemySpawnFourthWave();
    this.enemySpawnFifthWave();
    this.enemyArr.forEach((eachEnemy) => {
      eachEnemy.autoMovement();
    });
    this.projectyleArr.forEach((eachProjectyle) => {
      eachProjectyle.movement();
    });
    this.shotDisappear();
    this.enemyDisappear();
    this.collisionCheckEnemyShot();
    this.collisionCheckPlayerEnemy();
    this.timer++;
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
      //console.log(score);
    }
  };
}
