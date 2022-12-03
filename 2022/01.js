const fs = require("fs");
const values = fs.readFileSync("01.txt", "utf8").split("\n");

const groups = [];
let group = [];

values.forEach((val) => {
  if (val.length === 0) {
    groups.push(group.reduce((num, current) => num + current, 0));
    group = [];
  } else {
    group.push(Number(val));
  }
});

console.log("Part 1:", Math.max(...groups));

const sorted = groups.sort().reverse();
let topThree = 0;
for (let i = 0; i < 3; i++) {
  topThree += sorted[i];
}

console.log("Part 2:", topThree);
