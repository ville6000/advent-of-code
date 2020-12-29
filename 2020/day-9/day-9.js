const fs = require("fs");
const values = fs
  .readFileSync("../inputs/day-9.txt", "utf8")
  .split("\n")
  .filter((a) => a.length)
  .map(Number);

const part1 = (values) => {
  const inValid = [];
  let start = 0;
  let end = 25;

  for (let i = end; i < values.length; i++) {
    if (!isValidValue(values[i], values, start, end)) {
      inValid.push(values[i]);
    }

    start++;
    end++;
  }

  if (inValid.length) {
    return inValid[0];
  }

  return false;
};

const isValidValue = (val, values, start, end) => {
  for (let i = start; i < end; i++) {
    for (let j = start; j < end; j++) {
      if (values[i] !== values[j] && val === values[i] + values[j]) {
        return true;
      }
    }
  }

  return false;
};

const part2 = (values, target) => {
  let found = false;
  let start = 0;
  let end = 2;

  while (!found) {
    const nums = values.slice(start, end);
    const total = nums.reduce((a, b) => a + b, 0);

    if (total > target) {
      start++;
      end = start + 2;
    } else if (total < target) {
      end++;
    } else if (total === target) {
      return Math.min(...nums) + Math.max(...nums);
    }
  }
};

console.time("Part 1 duration");
console.log("Part 1:", part1(values));
console.timeEnd("Part 1 duration");

console.time("Part 2 duration");
console.log("Part 2:", part2(values, part1(values)));
console.timeEnd("Part 2 duration");
