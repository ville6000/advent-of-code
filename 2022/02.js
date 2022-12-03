const fs = require("fs");
const values = fs
  .readFileSync("02.txt", "utf8")
  .split("\n")
  .map((row) => row.split(" "));

const choiseScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

const resultScores = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,
};

const draws = [
  ["A", "X"],
  ["B", "Y"],
  ["C", "Z"],
];

const isDraw = (elf, player) => {
  for (let i = 0; i < draws.length; i++) {
    if (draws[i][0] === elf && draws[i][1] === player) {
      return true;
    }
  }

  return false;
};

const gameScore = (elf, player) => {
  if (isDraw(elf, player)) {
    return resultScores.DRAW;
  } else if (elf === "A" && player === "Y") {
    return resultScores.WIN;
  } else if (elf === "B" && player === "Z") {
    return resultScores.WIN;
  } else if (elf === "C" && player === "X") {
    return resultScores.WIN;
  }

  return resultScores.LOSS;
};

let total = 0;
values.forEach((game) => {
  total += choiseScores[game[1]];
  total += gameScore(game[0], game[1]);
});

console.log("Part 1:", total);

const getExpectedMove = (result, opponentMove) => {
  const playerChoices = ["X", "Y", "Z"];

  for (let i = 0; i < playerChoices.length; i++) {
    if (result === gameScore(opponentMove, playerChoices[i])) {
      return playerChoices[i];
    }
  }

  return null;
};

total = 0;
values.forEach((game) => {
  let resultScore;

  if (game[1] === "X") {
    resultScore = resultScores.LOSS;
  } else if (game[1] === "Y") {
    resultScore = resultScores.DRAW;
  } else if (game[1] === "Z") {
    resultScore = resultScores.WIN;
  }

  game[1] = getExpectedMove(resultScore, game[0]);

  total += choiseScores[game[1]];
  total += gameScore(game[0], game[1]);
});

console.log("Part 2:", total);
