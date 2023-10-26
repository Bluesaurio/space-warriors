class BossWave {
  constructor(xPosition, yPosition) {
    // nodos
    this.node = document.createElement("img");
    this.node.src = "./extra/images/wave-attack.png";
    this.node.style.opacity = "85%";
    gameBoxNode.append(this.node);

    // dimensiones
    this.h = 90;
    this.w = 220;
    this.x = xPosition - 50;
    this.y = yPosition;
    this.speed = 8;
    // DOM
    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  // metodos
  movement = () => {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  };
}
