// DOM & GOLBAL VARIABLES

let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameOverButtonNode = document.querySelector("#game-over-btn");
let gameBoxSoundtrackNode = document.querySelector("#vicViper");
let gameOverSoundtrackNode = document.createElement("audio");
gameOverSoundtrackNode.src = "./extra/soundtracks/game-over-ost.mp3";
let shotSoundNode = document.createElement("audio");
shotSoundNode.volume = 0.7;
shotSoundNode.src = "./extra/sounds/shoot.wav";
let enemyDeadSound = document.createElement("audio");
enemyDeadSound.volume = 0.6;
enemyDeadSound.src = "./extra/sounds/pum.wav";
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

const stopGameMusic = () => {
  gameBoxSoundtrackNode.pause();
  gameBoxSoundtrackNode.currentTime = 0;
  gameOverSoundtrackNode.play();
};

const stopGameOverMusic = () => {
  gameOverSoundtrackNode.pause();
  gameOverSoundtrackNode.currentTime = 0;
};

const startGame = () => {
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObject = new Game();
  gameBoxSoundtrackNode.play();
  gameObject.gameLoop();
  gameObject.score = 0;
};

const resetGame = () => {
  gameOverScreenNode.style.display = "none";
  splashScreenNode.style.display = "flex";
  gameObject.scoreNode.innerText = "SCORE : 0";
  stopGameOverMusic();
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

/*
- funciones de movimiento de player en gameloop
- addeventlisteners de keyup y keydown cambian valor de booleano
- quitar funcion de addeventlisteners
*/

// movimientos del player
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    gameObject.player.playerMovingUp = true;
  } else if (event.code === "ArrowDown") {
    gameObject.player.playerMovingDown = true;
  } else if (event.code === "ArrowLeft") {
    gameObject.player.playerMovingLeft = true;
  } else if (event.code === "ArrowRight") {
    gameObject.player.playerMovingRight = true;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowUp") {
    gameObject.player.playerMovingUp = false;
  } else if (event.code === "ArrowDown") {
    gameObject.player.playerMovingDown = false;
  } else if (event.code === "ArrowLeft") {
    gameObject.player.playerMovingLeft = false;
  } else if (event.code === "ArrowRight") {
    gameObject.player.playerMovingRight = false;
  }
});
