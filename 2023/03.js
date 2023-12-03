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

const part2 = () => {
  const numbers = findNumbers(input);
  const gears = findGears(input, numbers);
  let total = 0;

  for (const gear of gears) {
    const found = numbers.filter((number) => inRange(number, gear));

    if (found.length > 1) {
      total += eval(found.map((n) => n.num).join("*"));
    }
  }

  return total;
};

const inRange = (number, gear) => {
  const rows = [gear.row - 1, gear.row, gear.row + 1];

  if (!rows.includes(number.row)) {
    return false;
  }

  const min = number.col > 0 ? number.col - 1 : number.col;
  const max = number.col + number.length;

  return gear.col >= min && gear.col <= max;
};

const findGears = (input) => {
  let row = 0;
  const gears = [];

  for (const line of input) {
    const regex = /\*/g;
    let match = [...line.matchAll(regex)];

    if (match !== null) {
      match.forEach((gear) => {
        gears.push({ row, col: gear.index });
      });
    }

    row++;
  }

  return gears;
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
};

const isSymbol = (char) => {
  return char !== "." && Number.isNaN(parseInt(char));
};

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
};

console.time("part1");
console.log(part1());
console.timeEnd("part1");

console.time("part2");
console.log(part2());
console.timeEnd("part2");
