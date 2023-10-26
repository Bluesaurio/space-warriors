// DOM & GOLBAL VARIABLES

let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let gameOverScreenNode = document.querySelector("#game-over-screen");
let gameOverButtonNode = document.querySelector("#game-over-btn");
let victoryScreenNode = document.querySelector("#victory-screen");
let victoryButtonNode = document.querySelector("#victory-btn");
let victorySoundtrackNode = document.createElement("audio");
victorySoundtrackNode.src = "./extra/soundtracks/victory-ost.mp3";
victorySoundtrackNode.volume = 0.5;
let gameBoxSoundtrackNode = document.querySelector("#vicViper");
let gameOverSoundtrackNode = document.createElement("audio");
gameBoxSoundtrackNode.volume = 0.5;
gameOverSoundtrackNode.src = "./extra/soundtracks/game-over-ost.mp3";
gameOverSoundtrackNode.volume = 0.5;
let shotSoundNode = document.createElement("audio");
shotSoundNode.volume = 0.3;
shotSoundNode.src = "./extra/sounds/shoot.wav";
let enemyDeadSound = document.createElement("audio");
enemyDeadSound.volume = 0.2;
enemyDeadSound.src = "./extra/sounds/pum.wav";
bossAttackSoundNode = document.createElement("audio");
bossAttackSoundNode.src = "./extra/sounds/hit.ogg";
bossAttackSoundNode.volume = 0.1;
bossWaveAttackNode = document.createElement("audio");
bossWaveAttackNode.src = "./extra/sounds/wave-laser.wav";
bossWaveAttackNode.volume = 0.2;
let gameObject;
let projectyleObject;

// STATE MANAGEMENT FUNCTIONS
const victoryOstPlay = () => {
  victorySoundtrackNode.currentTime = 0;
  victorySoundtrackNode.play();
};
const stopVictoryOst = () => {
  victorySoundtrackNode.pause();
  victorySoundtrackNode.currentTime = 0;
};
const enemyDyingSound = () => {
  enemyDeadSound.currentTime = 0;
  enemyDeadSound.play();
};

const playShotSound = () => {
  shotSoundNode.currentTime = 0;
  shotSoundNode.play();
};
const playBossAttackSound = () => {
  bossAttackSoundNode.currentTime = 0;
  bossAttackSoundNode.play();
};
const playBossWaveSound = () => {
  bossWaveAttackNode.currentTime = 0;
  bossWaveAttackNode.play();
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

const playAgain = () => {
  victoryScreenNode.style.display = "none";
  splashScreenNode.style.display = "flex";
  gameObject.scoreNode.innerText = "SCORE : 0";
  stopVictoryOst();
};
// EVENT LISTENERS

//start game

startBtnNode.addEventListener("click", startGame);

//re-start game

gameOverButtonNode.addEventListener("click", resetGame);
victoryButtonNode.addEventListener("click", playAgain);

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
