const fs = require("fs");
const input = fs
  .readFileSync("03.txt", "utf8")
  .split("\n")
  .filter((l) => l.length);

const part1 = () => {
  const grid = input.map((line) => line.split(""));
  const numbers = findNumbers(input);
  let sum = 0;

  for (const number of numbers) {
    if (hasAdjecentSymbol(grid, number)) {
      sum += number.num;
    }
  }

  return sum;
};

const hasAdjecentSymbol = (grid, number) => {
  const rows = [number.row - 1, number.row, number.row + 1];

  for (const row of rows) {
    if (!grid[row]) {
      continue;
    }

    for (let i = number.col - 1; i <= number.col + number.length; i++) {
      if (grid[row][i] && isSymbol(grid[row][i])) {
        return true;
      }
    }
  }

  return false;
}

const isSymbol = (char) => {
  if (char === '.' || !isNaN(parseInt(char))) {
    return false;
  }

  return true;
}

const findNumbers = (input) => {
  const numbers = [];
  let row = 0;

  for (const line of input) {
    const regex = /\d+/g;
    let match = [...line.matchAll(regex)];

    if (match !== null) {
      match.forEach((number) => {
        numbers.push({
          num: parseInt(number[0], 10),
          row,
          col: number.index,
          length: number[0].length,
        });
      });
    }

    row++;
  }

  return numbers;
}

console.time("part1");
console.log(part1());
console.timeEnd("part1");
