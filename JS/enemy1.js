class Enemy {
  constructor(yPosition) {
    // añado type por si hago más de un tipo de enemigo en el bonus

    // nodos

    this.node = document.createElement("img");
    this.node.src = "./extra/images/enemy-img.png";
    gameBoxNode.append(this.node);

    // dimensiones

    this.h = 30;
    this.w = 60;
    this.x = 850;
    this.y = yPosition;

    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    // velocidad

    this.speed = 1.4;
  }

  // movimiento

  autoMovement = () => {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  };
}
