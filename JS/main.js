// DOM & GOLBAL VARIABLES
let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameOverButtonNode = document.querySelector("#game-over-btn");
let gameObject;
let projectyleObject;
// STATE MANAGEMENT FUNCTIONS

const startGame = () => {
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObject = new Game();
  gameObject.gameLoop();
};
// problemas con el reset, no borra la partida anterior (cosa del DOM?)
const resetGame = () => {
  gameOverScreenNode.style.display = "none";
  splashScreenNode.style.display = "flex";
  delete gameObject;
  delete gameObject.player.node.style.top;
  delete gameObject.player.node.style.left;
  delete gameObject.player.node.style.width;
  delete gameObject.player.node.style.height; // probar más cosas
};
// EVENT LISTENERS

//start game
startBtnNode.addEventListener("click", startGame);

//re-start game
gameOverButtonNode.addEventListener("click", resetGame);

// player shot
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyZ") {
    gameObject.playerShooting();
  }
});

// movimientos del player
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    gameObject.player.playerMovingUp = true;
    gameObject.player.playerMovementUp();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowDown") {
    gameObject.player.playerMovingDown = true;
    gameObject.player.playerMovementDown();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    gameObject.player.playerMovingLeft = true;
    gameObject.player.playerMovementLeft();
  }
});
document.addEventListener("keydown", (event) => {
  gameObject.player.playerMovingRight = true;
  if (event.code === "ArrowRight") {
    gameObject.player.playerMovementRight();
  }
});
