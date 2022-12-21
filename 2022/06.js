const fs = require("fs");

function getInput() {
  return fs.readFileSync("06.txt", "utf8").trim();
}

function part1() {
  const chars = getInput();
  const chunkSize = 4;

  for (let i = 0; i <= chars.length - chunkSize; i++) {
    if (new Set(chars.slice(i, i + chunkSize)).size === chunkSize) {
      return i + chunkSize;
    }
  }

  return false;
}

function part2() {
  const chars = getInput();
  const chunkSize = 14;

  for (let i = 0; i <= chars.length - chunkSize; i++) {
    if (new Set(chars.slice(i, i + chunkSize)).size === chunkSize) {
      return i + chunkSize;
    }
  }

  return false;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
