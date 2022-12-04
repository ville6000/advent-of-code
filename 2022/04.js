const fs = require("fs");

function getInput() {
  return (values = fs
    .readFileSync("04.txt", "utf8")
    .split("\n")
    .filter((item) => item.length)
    .map((row) => {
      return row.split(",").map((item) => {
        const [start, end] = item.split("-").map(Number);

        return {
          start,
          end,
        };
      });
    }));
}

function part1() {
  return getInput().filter((pair) => {
    const [first, second] = pair;

    if (first.end < second.start || second.end < first.start) {
      return false;
    }

    return (
      (first.start <= second.start && first.end >= second.end) ||
      (first.start >= second.start && first.end <= second.end)
    );
  }).length;
}

function part2() {
  return getInput().filter((pair) => {
    const [first, second] = pair;

    return (
      (first.start <= second.start && first.end >= second.start) ||
      (second.start <= first.start && second.end >= first.start)
    );
  }).length;
}

console.log("Part1:", part1());
console.log("Part2:", part2());
