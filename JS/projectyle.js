class Projectyle {
  constructor() {
    // nodos
    this.node = document.createElement("img");
    this.node.src = "./extra/images/shot.png";
    gameBoxNode.append(this.node);
    // dimensiones y variables

    isPlayerShooting = false;
    isProjectyleAlly = true;

    this.h = 4;
    this.w = 6;
    if (isProjectyleAlly === true) {
      this.x = player.x + 105;
    }
    this.y = player.y;

    // valores DOM

    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    // velocidad del disparo
    if (isProjectyleAlly === true) {
      this.speed = 100;
    }
  }

  playerShooting = () => {
    if (isPlayerShooting === true) {
      this.x -= this.speed;
      this.node.style.left = `${this.x}px`;
    }
  };
}
