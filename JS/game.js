class Game {
  constructor() {
    this.timer = 0;
    this.isGameOn = true;
    this.player = new Player();
    this.enemyArr = [];
    this.projectyleArr = [];
    this.isPlayerShooting = false;
  }

  collisionCheckPlayerEnemy = () => {
    this.enemyArr.forEach((eachEnemy) => {
      if (
        eachEnemy.x - 40 < this.player.x - 40 + this.player.w &&
        eachEnemy.x - 40 + eachEnemy.w > this.player.x - 40 &&
        eachEnemy.y < this.player.y + this.player.h &&
        eachEnemy.y + eachEnemy.h > this.player.y
      ) {
        this.gameOver();
      }
    });
  };
  playerShooting = () => {
    if (this.isPlayerShooting === true) {
      let newProjectyle = new Projectyle();
      this.projectyleArr.push(newProjectyle);
    }
  };
  enemySpawnFirstWave = () => {
    if (this.timer % 45 === 0 && this.timer > 60 && this.timer < 360) {
      let newEnemyWave1 = new Enemy(100);
      this.enemyArr.push(newEnemyWave1);
    }
  };

  enemyDisappear = () => {
    if (this.enemyArr[0].x < -100) {
      this.enemyArr[0].node.remove();
      this.enemyArr.shift();
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

    //this.enemyDisappear();  algo da problemas con esta funcion
    this.collisionCheckPlayerEnemy();
    this.timer++;
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
