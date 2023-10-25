class Player {
  constructor() {
    // nodos

    this.node = document.createElement("img");
    this.node.src = "./extra/images/nave1.png";
    gameBoxNode.append(this.node);

    // dimensiones y variables

    this.h = 70;
    this.w = 100;
    this.x = 150;
    this.y = 260;

    this.playerMovingUp = false;
    this.playerMovingDown = false;
    this.playerMovingRight = false;
    this.playerMovingLeft = false;

    // valores del dom

    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    // velocidad de la nave

    this.movementSpeed = 12;
  }

  // movimiento de la nave

  playerMovementUp = () => {
    if (this.playerMovingUp === true && this.y > this.movementSpeed) {
      this.y -= this.movementSpeed;
      this.node.style.top = `${this.y}px`;
    }
  };
  playerMovementDown = () => {
    if (this.playerMovingDown === true && this.y < 510) {
      this.y += this.movementSpeed;
      this.node.style.top = `${this.y}px`;
    }
  };
  playerMovementLeft = () => {
    if (this.playerMovingLeft === true && this.x > this.movementSpeed) {
      this.x -= this.movementSpeed;
      this.node.style.left = `${this.x}px`;
    }
  };

  playerMovementRight = () => {
    if (this.playerMovingRight === true && this.x < 700) {
      this.x += this.movementSpeed;
      this.node.style.left = `${this.x}px`;
    }
  };

  //
}
