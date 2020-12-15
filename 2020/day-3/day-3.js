const fs = require("fs");
const values = fs
  .readFileSync("../inputs/day-3.txt", "utf8")
  .split("\n")
  .filter((item) => item.length > 0);

const part1 = (values, x_step, y_step) => {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < values.length) {
    let row = values[y].split("");
    x = x > row.length - 1 ? x - row.length : x;
    trees = row[x] === "#" ? ++trees : trees;
    x += x_step;
    y += y_step;
  }

  return trees;
};

const part2 = (values) => {
  return (
    part1(values, 1, 1) *
    part1(values, 3, 1) *
    part1(values, 5, 1) *
    part1(values, 7, 1) *
    part1(values, 1, 2)
  );
};

console.time("Part 1 duration");
console.log("Part 1:", part1(values, 3, 1));
console.timeEnd("Part 1 duration");

console.time("Part 2 duration");
console.log("Part 2:", part2(values));
console.timeEnd("Part 2 duration");
