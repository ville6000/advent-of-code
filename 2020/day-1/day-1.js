const fs = require("fs");
const values = fs
  .readFileSync("../inputs/day-1.txt", "utf8")
  .split("\n")
  .map((item) => parseInt(item));

const part1 = (values) => {
  const TARGET = 2020;

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      if (i !== j && TARGET === values[i] + values[j]) {
        return values[i] * values[j];
      }
    }
  }

  return false;
};

const part2 = (values) => {
  const TARGET = 2020;

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      for (let k = 0; k < values.length; k++) {
        if (i !== k && j !== k && i !== j) {
          let sum = values[i] + values[j] + values[k];

          if (sum === TARGET) {
            return values[i] * values[j] * values[k];
          }
        }
      }
    }
  }

  return false;
};

console.time();
console.log("Part 1", part1(values));
console.timeEnd();

console.time();
console.log("Part 2", part2(values));
console.timeEnd();
