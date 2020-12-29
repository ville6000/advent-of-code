const fs = require("fs");
const values = fs.readFileSync("../inputs/day-5.txt", "utf8").split("\n");

const part1 = (values) => {
  const ids = [];

  values.forEach((val) => {
    let rowPos = { min: 0, max: 127 };
    let colPos = { min: 0, max: 7 };

    val.split("").forEach((char) => {
      if (char === "F") {
        rowPos = lowerHalf(rowPos);
      }

      if (char === "B") {
        rowPos = upperHalf(rowPos);
      }

      if (char === "R") {
        colPos = upperHalf(colPos);
      }

      if (char === "L") {
        colPos = lowerHalf(colPos);
      }
    });

    ids.push(rowPos.min * 8 + colPos.min);
  });

  return Math.max(...ids);
};

const lowerHalf = (pos) => {
  return {
    min: pos.min,
    max: pos.max - Math.ceil((pos.max - pos.min) / 2),
  };
};

const upperHalf = (pos) => {
  return {
    min: pos.min + Math.ceil((pos.max - pos.min) / 2),
    max: pos.max,
  };
};

const part2 = (values) => {
  const seats = [];
  const ids = [];

  for (let i = 0; i < 128; i++) {
    seats[i] = [];
    for (let j = 0; j < 8; j++) {
      seats[i][j] = false;
    }
  }

  values.forEach((val) => {
    let rowPos = { min: 0, max: 127 };
    let colPos = { min: 0, max: 7 };

    val.split("").forEach((char) => {
      if (char === "F") {
        rowPos = lowerHalf(rowPos);
      }

      if (char === "B") {
        rowPos = upperHalf(rowPos);
      }

      if (char === "R") {
        colPos = upperHalf(colPos);
      }

      if (char === "L") {
        colPos = lowerHalf(colPos);
      }
    });

    ids.push(rowPos.min * 8 + colPos.min);
    seats[rowPos.min][colPos.min] = rowPos.min * 8 + colPos.min;
  });

  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      if (
        seats[i][j] === false &&
        seats[i][j - 1] !== false &&
        seats[i][j + 1] !== false
      ) {
        return seats[i][j - 1] + 1;
      }
    }
  }
};

console.time("Part 1 duration");
console.log("Part 1:", part1(values));
console.timeEnd("Part 1 duration");

console.time("Part 2 duration");
console.log("Part 2:", part2(values));
console.timeEnd("Part 2 duration");
