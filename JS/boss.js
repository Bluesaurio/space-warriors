class Boss {
  constructor(direction) {
    // nodos
    this.node = document.createElement("img");
    this.node.src = "./extra/images/phantoon-img.png";
    gameBoxNode.append(this.node);
    //this.soundtrackNode = document.createElement("audio");
    // this.soundtrackNode.src = "./extra/soundtracks/ridley-ost.mp3";
    this.direction = direction;
    // dimensiones y variables
    this.h = 200;
    this.w = 125;
    this.x = 650;
    this.y = 200;
    // valores de DOM
    this.node.style.width = `${this.w}px`;
    this.node.style.heigth = `${this.h}px`;
    this.node.style.position = `absolute`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    // velocidad
    this.speed = 2;
  }

  // métodos
  movement = () => {
    // if (this.direction === "right") {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
    // }
    /*if (this.direction === "bottom" && this.y >= 10) {
      this.y -= this.speed;
      this.node.style.top = `${this.y}px`;
      if (this.y === 10) {
        this.direction = "top";
      }
    }
    if (this.direction === "top" && this.y <= 600) {
      this.y += this.speed;
      this.node.style.top = `${this.y}px`;
      if (this.y === 600) {
        this.direction = "bottom";
      }
    };*/
  };
}