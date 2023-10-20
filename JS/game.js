class Game {
  constructor() {
    this.timer = 0;
    this.isGameOn = true;
    this.player = new Player();
  }

  gameLoop = () => {
    this.timer++;
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
