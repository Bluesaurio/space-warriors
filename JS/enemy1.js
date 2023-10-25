class Enemy {
  constructor(yPosition, xPosition, direction) {
    // añado type por si hago más de un tipo de enemigo en el bonus

    // nodos

    this.node = document.createElement("img");
    this.node.src = "./extra/images/enemy-img.png";
    gameBoxNode.append(this.node);

    // dimensiones

    this.h = 30;
    this.w = 60;
    this.x = xPosition;
    this.y = yPosition;
    this.direction = direction;

    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    // velocidad

    this.speed = 3.5;
  }

  // movimiento

  autoMovement = () => {
    if (this.direction === "right") {
      this.x -= this.speed;
      this.node.style.left = `${this.x}px`;
    } else if (this.direction === "left") {
      this.x += this.speed;
      this.node.style.left = `${this.x}px`;
    }
    if (this.direction === "top") {
      this.y += this.speed;
      this.node.style.top = `${this.y}px`;
    }
    if (this.direction === "bottom") {
      this.y -= this.speed;
      this.node.style.top = `${this.y}px`;
    }
  };
}
