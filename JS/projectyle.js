class Projectyle {
  constructor(naveX, naveY) {
    // nodos
    this.node = document.createElement("img");
    this.node.src = "./extra/images/shot.png";
    gameBoxNode.append(this.node);
    // dimensiones y variables

    this.h = 20;
    this.w = 40;

    this.x = naveX + 70;

    this.y = naveY + 28;

    // valores DOM

    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    // velocidad del disparo

    this.speed = 30;
  }

  movement = () => {
    this.x += this.speed;
    this.node.style.left = `${this.x}px`;
  };
}
