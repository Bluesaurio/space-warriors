class Game {
  constructor() {
    this.timer = 0;
    this.isGameOn = true;
    this.player = new Player();

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
            console.log("chocando");
            this.enemyArr[i].node.remove();
            this.projectyleArr[j].node.remove();
            this.projectyleArr.splice(j, 1);
            this.enemyArr.splice(i, 1);
          }
        }
      }
    }
  };

  playerShooting = () => {
    let newProjectyle = new Projectyle(this.player.x, this.player.y);
    this.projectyleArr.push(newProjectyle);

    console.log("disparo", this.player.y);
  };
  enemySpawnFirstWave = () => {
    if (this.timer % 45 === 0 && this.timer > 60 && this.timer < 360) {
      let newEnemyWave1 = new Enemy(100);
      this.enemyArr.push(newEnemyWave1);
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
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  };

  gameLoop = () => {
    this.enemySpawnFirstWave();
    this.enemyArr.forEach((eachEnemy) => {
      eachEnemy.autoMovement();
    });
    this.projectyleArr.forEach((eachProjectyle) => {
      eachProjectyle.movement();
    });

    this.enemyDisappear();
    this.collisionCheckEnemyShot();
    this.collisionCheckPlayerEnemy();
    this.timer++;
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
