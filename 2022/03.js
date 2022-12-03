const fs = require("fs");

function getInputLinesAsArrays() {
  return fs
    .readFileSync("03.txt", "utf8")
    .split("\n")
    .map((row) => row.split(""));
}

function getCharPriority(char) {
  let modifier = char === char.toUpperCase() ? 38 : 96;

  return char.charCodeAt() - modifier;
}

function part1() {
  const lines = getInputLinesAsArrays();

  return lines
    .map((chars) => {
      const half = Math.ceil(chars.length / 2);

      return [chars.slice(0, half), chars.slice(half)];
    })
    .map((compartments) => {
      const common = compartments[0].filter((value) =>
        compartments[1].includes(value)
      );
      return common.filter((v, i, a) => a.indexOf(v) === i);
    })
    .map((uniques) => {
      return uniques.map(getCharPriority).reduce((acc, num) => acc + num, 0);
    })
    .reduce((acc, num) => acc + num, 0);
}

function part2() {
  const lines = getInputLinesAsArrays();
  const groups = [];

  while (lines.length > 0) {
    groups.push(lines.splice(0, 3));
  }

  return groups
    .map((bags) => {
      const common = bags[0].filter(
        (value) => bags[1].includes(value) && bags[2].includes(value)
      );
      return common.filter((v, i, a) => a.indexOf(v) === i);
    })
    .map((uniques) => {
      return uniques.map(getCharPriority).reduce((acc, num) => acc + num, 0);
    })
    .reduce((acc, num) => acc + num, 0);
}

console.log("Part 1", part1());
console.log("Part 2", part2());
