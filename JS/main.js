// DOM & GOLBAL VARIABLES
let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameOverButtonNode = document.querySelector("#game-over-btn");
let gameBoxSoundtrackNode = document.querySelector("#vicViper");
let shotSoundNode = document.createElement("audio");
shotSoundNode.volume = 0.7;
shotSoundNode.src = "./extra/sounds/shoot.wav";
let enemyDeadSound = document.createElement("audio");
enemyDeadSound.volume = 0.6;
enemyDeadSound.src = "/extra/sounds/hurt.ogg";
let gameObject;
let projectyleObject;
// STATE MANAGEMENT FUNCTIONS
const enemyDyingSound = () => {
  enemyDeadSound.currentTime = 0;
  enemyDeadSound.play();
};
const playShotSound = () => {
  shotSoundNode.currentTime = 0;
  shotSoundNode.play();
};
const startGame = () => {
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameBoxSoundtrackNode.play();
  gameObject = new Game();
  gameObject.gameLoop();
  gameObject.score = 0;
};

const resetGame = () => {
  gameOverScreenNode.style.display = "none";
  splashScreenNode.style.display = "flex";
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
