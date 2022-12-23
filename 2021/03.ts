import fs = require("fs");

function getInput(): Array<Array<number>> {
  const input = fs
    .readFileSync("./03.txt", "utf8")
    .split("\n")
    .filter((item: string) => item.length)
    .map((item: string) =>
      item
        .trim()
        .split("")
        .map((item) => Number(item))
    );

  const grid = [];

  for (let col = 0; col < input[0].length; col++) {
    grid.push(input.map((item: number[]) => item[col]));
  }

  return grid;
}

function part1() {
  const grid = getInput();
  const gammaBits = grid.map((row) => {
    const ones = row.filter((num) => num === 1).length;
    return ones > row.length / 2 ? 1 : 0;
  });

  const epsilon = gammaBits.map((num) => (num === 1 ? 0 : 1)).join("");

  return parseInt(gammaBits.join(""), 2) * parseInt(epsilon, 2);
}

console.log("Part 1", part1());
