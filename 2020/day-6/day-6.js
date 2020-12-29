const fs = require("fs");
const values = fs.readFileSync("../inputs/day-6.txt", "utf8").split(/\n\s*\n/);

const part1 = (groups) => {
  total = 0;

  groups.forEach((group) => {
    const groupAnswers = [];
    const answers = group.split("\n");

    answers.forEach((answer) => {
      answer.split("").forEach((char) => {
        groupAnswers.push(char);
      });
    });

    total = total + [...new Set(groupAnswers)].length;
  });

  return total;
};

const part2 = (groups) => {
  total = 0;

  groups.forEach((group) => {
    const groupAnswers = {};
    const answers = group.split("\n");

    answers.forEach((answer) => {
      answer.split("").forEach((char) => {
        if (typeof groupAnswers[char] === "undefined") {
          groupAnswers[char] = 0;
        }

        groupAnswers[char]++;
      });
    });

    Object.keys(groupAnswers).forEach((key) => {
      if (groupAnswers[key] === answers.length) {
        total++;
      }
    });
  });

  return total;
};

console.time("Part 1 duration");
console.log("Part 1:", part1(values));
console.timeEnd("Part 1 duration");

console.time("Part 2 duration");
console.log("Part 2:", part2(values));
console.timeEnd("Part 2 duration");
