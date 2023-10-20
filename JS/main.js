// DOM & GOLBAL VARIABLES
let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameOverButtonNode = document.querySelector("#game-over-btn");
let gameObject;

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObject = new Game();
  gameObject.gameLoop();
};
// EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);
document.addEventListener("keydown", () => {
  if (event.code === "ArrowUp") {
    gameObject.player.playerMovingUp = true;
    gameObject.player.playerMovementUp();
  }
});
document.addEventListener("keydown", () => {
  if (event.code === "ArrowDown") {
    gameObject.player.playerMovingDown = true;
    gameObject.player.playerMovementDown();
  }
});
document.addEventListener("keydown", () => {
  if (event.code === "ArrowLeft") {
    gameObject.player.playerMovingLeft = true;
    gameObject.player.playerMovementLeft();
  }
});
document.addEventListener("keydown", () => {
  gameObject.player.playerMovingRight = true;
  if (event.code === "ArrowRight") {
    gameObject.player.playerMovementRight();
  }
});
