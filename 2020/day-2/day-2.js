const fs = require("fs");
const values = fs
  .readFileSync("../inputs/day-2.txt", "utf8")
  .split("\n")
  .filter((item) => item.length > 0)
  .map((item) => {
    const parts = item.split(" ");
    let params = parts[0].split("-");
    let needle = parts[1].replace(":", "");

    return {
      needle,
      haystack: parts[2],
      min: params[0],
      max: params[1],
    };
  });

const part1 = (values) => {
  return values.filter((item) => {
    const reg = new RegExp(item.needle, "g");
    const count = (item.haystack.match(reg) || []).length;

    return count >= item.min && count <= item.max;
  }).length;
};

const part2 = (values) => {
  return values.filter((item) => {
    const haystack = item.haystack.split("");
    const minMatch = haystack[item.min - 1] === item.needle;
    const maxMatch = haystack[item.max - 1] === item.needle;

    return (minMatch || maxMatch) && !(minMatch && maxMatch);
  }).length;
};

console.time("Part 1 duration");
console.log("Part 1:", part1(values));
console.timeEnd("Part 1 duration");

console.time("Part 2 duration");
console.log("Part 2:", part2(values));
console.timeEnd("Part 2 duration");
